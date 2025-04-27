import { UserInterface } from '@/domain/interfaces/users.interface';
import { DatabaseConnection } from '../database/connection';
import { ContentAccess, PrismaClient } from '@prisma/client';
import { SubjectAccess } from '@/domain/interfaces/subject-access.interface';

export class UserRepository {
  private db: PrismaClient;

  constructor() {
    this.db = DatabaseConnection.getInstance().getClient();
  }

  async save({
    name,
    email,
    password,
    googleId,
    roleId
  }: UserInterface): Promise<UserInterface> {
    try {
      const user = await this.db.user.create({
        data: {
          name,
          email,
          password,
          googleId,
          roleId
        }
      });
      return {
        id: user.id,
        name,
        email,
        password,
        googleId,
        roleId
      };
    } catch (error) {
      throw new Error('Error saving user to database: ' + error);
    }
  }

  async findByEmail(email: string): Promise<UserInterface | null> {
    try {
      const user = await this.db.user.findUnique({
        where: { email },
        select: {
          id: true,
          name: true,
          email: true,
          password: true
        }
      });
      return user;
    } catch (error) {
      throw new Error('Error finding user by email: ' + error);
    }
  }

  async getById(id: string): Promise<UserInterface | null> {
    try {
      const user = await this.db.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          roleId: true,
          googleId: true,
          createdAt: true,
          updatedAt: true,
          lastAppAccess: true,
          role: {
            select: {
              id: true,
              name: true
            }
          }
        }
      });
      return user;
    } catch (error) {
      throw new Error('Error getting user by id: ' + error);
    }
  }

  async listAll(): Promise<UserInterface[]> {
    try {
      const users = await this.db.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          roleId: true,
          googleId: true,
          createdAt: true,
          updatedAt: true,
          lastAppAccess: true,
          role: {
            select: {
              id: true,
              name: true
            }
          }
        }
      });
      return users;
    } catch (error) {
      throw new Error('Error listing all users: ' + error);
    }
  }

  async update({ name, email, password, id }: UserInterface) {
    try {
      const user = await this.db.user.update({
        where: { id },
        data: {
          name,
          email,
          password,
          updatedAt: new Date()
        }
      });
      return user;
    } catch (error) {
      throw new Error('Error updating user: ' + error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.db.user.delete({
        where: { id }
      });
    } catch (error) {
      throw new Error('Error deleting user: ' + error);
    }
  }

  async listLastContentsAccess(userId: string): Promise<ContentAccess[]> {
    try {
      const contentsAccess = await this.db.contentAccess.findMany({
        where: { userId },
        orderBy: { lastAccess: 'desc' },
        select: {
          userId: true,
          contentId: true,
          lastAccess: true
        }
      });
      return contentsAccess;
    } catch (error) {
      throw new Error('Error listing last contents access: ' + error);
    }
  }

  async listLastSubjectsAccess(userId: string): Promise<SubjectAccess[]> {
    try {
      const subjectsAccess = await this.db.subjectAccess.findMany({
        where: { userId },
        orderBy: { lastAccess: 'desc' },
        select: {
          userId: true,
          subjectId: true,
          lastAccess: true
        }
      });
      return subjectsAccess;
    } catch (error) {
      throw new Error('Error listing last subjects access: ' + error);
    }
  }
}

export default new UserRepository();
