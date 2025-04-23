import { z } from 'zod';

export const topicSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  position: z.number().min(1, 'Posição é obrigatória'),
  subjectId: z
    .string()
    .uuid('ID inválido')
    .min(1, 'ID do assunto é obrigatório')
});

export const topicIdSchema = z.object({
  id: z.string().uuid('ID inválido').min(1, 'ID é obrigatório')
});
