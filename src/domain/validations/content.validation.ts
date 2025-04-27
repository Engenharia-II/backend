import { z } from 'zod';

export const contentSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  topicId: z.string().uuid('ID inválido').min(1, 'ID do tópico é obrigatório'),
  duration: z.number().min(1, 'Duração é obrigatória'),
  isFree: z.boolean(),
  publicationDate: z.string().datetime('Data inválida'),
  type: z.enum(['video', 'book', 'article', 'course', 'podcast'], {
    required_error: 'Tipo é obrigatório'
  }),
  url: z.string().url('URL inválida'),
  tumbnailUrl: z.string().url('URL inválida')
});

export const contentIdSchema = z.object({
  id: z.string().uuid('ID inválido').min(1, 'ID é obrigatório')
});

export const idContentSchema = z.object({
  contentId: z.string().uuid('ID inválido').min(1, 'ID é obrigatório')
});
