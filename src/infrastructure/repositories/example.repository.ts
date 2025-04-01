import { UserInterface } from '@/domain/interfaces/users.interface';

class ExampleRepository {
  constructor() {
    // this.db = db
  }

  async save({ name, email }: UserInterface): Promise<UserInterface | void> {
    console.log('Saving user to database');
    return {
      name,
      email
    };
  }

  async findOne(payload: string): Promise<UserInterface | void> {
    return console.log('Finding user in database');
  }
}

export default new ExampleRepository();
