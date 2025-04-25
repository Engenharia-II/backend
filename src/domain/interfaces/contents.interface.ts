export interface ContentInterface {
  id?: string;
  topicId: string;
  name: string;
  description: string;
  url: string;
  type: ContentType;
  publicationDate: Date;
  duration: number;
  tumbnailUrl?: string | null;
  isFree: boolean;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export enum ContentType {
  VIDEO = 'video',
  BOOK = 'book',
  ARTICLE = 'article',
  COURSE = 'course',
  PODCAST = 'podcast'
}
