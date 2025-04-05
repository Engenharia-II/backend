import { UserInterface } from '@/domain/interfaces/users.interface';
import { DatabaseConnection } from '../database/connection';
import { PrismaClient } from '@prisma/client';

export class ExampleRepository {
  private db: PrismaClient;

  constructor() {
    this.db = DatabaseConnection.getInstance().getClient();
  }

  async save({ name, email }: UserInterface): Promise<UserInterface | void> {
    try {
      await this.db.user.create({
        data: {
          name,
          email
        }
      });
      return {
        name,
        email
      };
    } catch (error) {
      throw new Error('Error saving user to database: ' + error);
    }
  }

  async findAll() {
    try {
      const users = await this.db.user.findMany();
      return users;
    } catch (error) {
      throw new Error('Error finding users in database: ' + error);
    }
  }

  async findById(id: string) {
    try {
      const user = await this.db.user.findUnique({
        where: { id }
      });
      return user;
    } catch (error) {
      throw new Error('Error finding user by id in database: ' + error);
    }
  }
}

export default new ExampleRepository();
