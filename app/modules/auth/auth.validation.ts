import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

// 1. Define the raw Zod object
export const registerObject = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(10, 'Password must be at least 10 characters'),
});

// 2. Export the TypeScript Type
export type RegisterInput = z.infer<typeof registerObject>;

// 3. Export the Vee-Validate Schema
export const RegisterSchema = toTypedSchema(registerObject);
