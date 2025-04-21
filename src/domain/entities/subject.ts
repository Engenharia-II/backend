import { SubjectInterface } from '../interfaces/subjects.interface';

export const subjectEntities = (data: SubjectInterface) => {
  return {
    id: data.id,
    name: data.name,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  };
};
