import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

export const registerObject = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(10, 'Password must be at least 10 characters'),
});

export type RegisterInput = z.infer<typeof registerObject>;
export const RegisterSchema = toTypedSchema(registerObject);

export const loginObject = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Please enter a valid email'),
    password: z
        .string()
        .min(1, 'Password is required')
        // Usually, login doesn't need min length (that's for register),
        // but it helps catch empty submissions.
        .min(6, 'Password must be at least 6 characters'),
});

export type LoginInput = z.infer<typeof loginObject>;
export const LoginSchema = toTypedSchema(loginObject);
