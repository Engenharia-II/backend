import { z } from 'zod';

export const subjectSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória')
});

export const subjectIdSchema = z.object({
  id: z.string().uuid('ID inválido').min(1, 'ID é obrigatório')
});

export const idSubjectSchema = z.object({
  subjectId: z.string().uuid('ID inválido').min(1, 'ID é obrigatório')
});
