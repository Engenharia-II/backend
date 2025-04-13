import { UserInterface } from './users.interface';

export interface ResponseLoginInteface {
  message: string;
  token: string;
  data: UserInterface;
}
