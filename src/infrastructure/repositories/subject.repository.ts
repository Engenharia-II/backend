import { DatabaseConnection } from '../database/connection';
import { PrismaClient } from '@prisma/client';
import {
  RawSubjectProgressRow,
  RawSubjectWithStatsRow,
  SubjectInterface
} from '@/domain/interfaces/subjects.interface';

export class SubjectRepository {
  private db: PrismaClient;

  constructor() {
    this.db = DatabaseConnection.getInstance().getClient();
  }

  async save({
    name,
    description
  }: SubjectInterface): Promise<SubjectInterface> {
    try {
      const subject = await this.db.subject.create({
        data: {
          name,
          description
        }
      });
      return {
        id: subject.id,
        name,
        description
      };
    } catch (error) {
      throw new Error('Error saving subject to database: ' + error);
    }
  }

  async getById(id: string): Promise<SubjectInterface | null> {
    try {
      const subject = await this.db.subject.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          description: true,
          createdAt: true,
          updatedAt: true,
          topics: {
            select: {
              id: true,
              name: true,
              description: true,
              position: true,
              createdAt: true,
              updatedAt: true
            }
          }
        }
      });
      return subject;
    } catch (error) {
      throw new Error('Error finding subject by id: ' + error);
    }
  }

  async getDetailsById(
    id: string,
    userId: string
  ): Promise<RawSubjectWithStatsRow | null> {
    try {
      const result = await this.db.$queryRaw<RawSubjectWithStatsRow[]>`
        SELECT
          s.id           AS subject_id,
          s.name         AS name,
          s.description  AS description,
          s.created_at   AS created_at,
          s.updated_at   AS updated_at,
          COALESCE(
            (SELECT json_agg(js) FROM (
                SELECT
                  t.id           AS id,
                  t.name         AS name,
                  t.description  AS description,
                  t.position     AS position,
                  t.created_at   AS "createdAt",
                  t.updated_at   AS "updatedAt",
                  COUNT(c.id)    AS "contentCount",
                  COALESCE(SUM(c.duration), 0) AS duration,
                  (MAX(CASE WHEN ts.status = 'completed' THEN 1 ELSE 0 END) = 1) AS completed
                FROM topics t
                LEFT JOIN contents c
                  ON c.topic_id = t.id
                LEFT JOIN topic_study ts
                  ON ts.topic_id = t.id
                AND ts.user_id   = ${userId}
                AND ts.status    = 'completed'
                WHERE t.subject_id = s.id
                GROUP BY t.id, t.name, t.description, t.position, t.created_at, t.updated_at
                ORDER BY t.position
            ) AS js),
            '[]'
          ) AS topics,
          COUNT(DISTINCT t_all.id) AS total_topics,
          COUNT(DISTINCT ts_all.topic_id) FILTER (WHERE ts_all.status = 'completed') AS completed_topics,
          CASE
            WHEN COUNT(DISTINCT t_all.id) > 0
            THEN ROUND(
              (COUNT(DISTINCT ts_all.topic_id) FILTER (WHERE ts_all.status = 'completed')::decimal
                / COUNT(DISTINCT t_all.id))::numeric,
              4
            )
            ELSE 0
          END AS subject_progress,
          COALESCE(SUM(c_all.duration), 0) AS subject_duration
        FROM subjects s
        LEFT JOIN topics t_all
          ON t_all.subject_id = s.id
        LEFT JOIN contents c_all
          ON c_all.topic_id = t_all.id
        LEFT JOIN topic_study ts_all
          ON ts_all.topic_id = t_all.id
          AND ts_all.user_id   = ${userId}
          AND ts_all.status    = 'completed'
        WHERE s.id = ${id}
        GROUP BY
          s.id, s.name, s.description, s.created_at, s.updated_at;
      `;

      return result[0] || null;
    } catch (error) {
      throw new Error('Error finding subject by id: ' + error);
    }
  }

  async listAll(): Promise<SubjectInterface[]> {
    try {
      const subjects = await this.db.subject.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          createdAt: true,
          updatedAt: true
        }
      });
      return subjects;
    } catch (error) {
      throw new Error('Error listing all subjects: ' + error);
    }
  }

  async update({
    id,
    name,
    description
  }: SubjectInterface): Promise<SubjectInterface> {
    try {
      const subject = await this.db.subject.update({
        where: { id },
        data: {
          name,
          description,
          updatedAt: new Date()
        }
      });
      return subject;
    } catch (error) {
      throw new Error('Error updating subject: ' + error);
    }
  }

  async delete(id: string): Promise<SubjectInterface | null> {
    try {
      const subject = await this.db.subject.delete({
        where: { id },
        select: {
          id: true,
          name: true,
          description: true,
          createdAt: true,
          updatedAt: true
        }
      });
      return subject;
    } catch (error) {
      throw new Error('Error deleting subject: ' + error);
    }
  }

  async listAllWithProgress(userId: string) {
    try {
      const rows = await this.db.$queryRaw<RawSubjectProgressRow[]>`
      SELECT 
        s.id              AS subject_id,
        s.name            AS name,
        COUNT(t.id)       AS total_topics,
        COUNT(ts.*)       AS completed_topics,
        ss.status         AS study_status
      FROM subjects s
      LEFT JOIN topics t 
        ON t.subject_id = s.id
      LEFT JOIN topic_study ts 
        ON ts.topic_id = t.id 
        AND ts.user_id = ${userId} 
        AND ts.status = 'completed'
      LEFT JOIN subject_study ss
        ON ss.subject_id = s.id
        AND ss.user_id = ${userId}
      GROUP BY s.id, s.name, ss.status
      ORDER BY 
        -- First subjects with 'in_progress' status
        CASE WHEN ss.status = 'in_progress' THEN 0
             WHEN ss.status = 'completed' THEN 1
             ELSE 2
        END,
        -- Then by progress percentage (descending)
        CASE WHEN COUNT(t.id) > 0 
             THEN CAST(COUNT(ts.*) AS FLOAT) / COUNT(t.id)
             ELSE 0 
        END DESC;
    `;
      return rows;
    } catch (error) {
      throw new Error('Error listing limited subjects with topics: ' + error);
    }
  }
}

export default new SubjectRepository();
