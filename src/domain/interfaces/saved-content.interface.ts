import { ContentInterface } from './contents.interface';
import { UserInterface } from './users.interface';

export interface SavedContentInterface {
  userId: string;
  contentId: string;
  savedAt: Date;

  content?: ContentInterface;
  user?: UserInterface;
}
