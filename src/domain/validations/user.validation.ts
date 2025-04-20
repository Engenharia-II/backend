import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
  name: z.string().min(1, 'Nome é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória'),
  googleId: z.string().optional()
});

export const updateUserSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
  name: z.string().min(1, 'Nome é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória'),
  confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória')
});
