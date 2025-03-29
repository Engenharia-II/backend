import ExampleRepository from '@/infrastructure/repositories/example.repository';

export const createUser = async (name: string, email: string) => {
  return ExampleRepository.save({
    name,
    email
  });
};
