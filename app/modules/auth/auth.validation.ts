import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

export const registerObject = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(10, 'Password must be at least 10 characters'),
});

//Fungsi z.infer digunakan untuk mencuri atau mengambil struktur data dari skema Zod Anda dan mengubahnya menjadi Tipe TypeScript (type) secara otomatis.
export type RegisterInput = z.infer<typeof registerObject>;

//(toTypedSchema): Fungsi ini bertindak sebagai "jembatan" (adapter).
// Ia mengubah objek Zod menjadi format yang dimengerti 100% oleh Vee-Validate.
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

export const forgotPasswordObject = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Please enter a valid email address'),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordObject>;
export const ForgotPasswordSchema = toTypedSchema(forgotPasswordObject);

const resetPasswordShape = z.object({
    password: z.string().min(10, 'Password must be at least 10 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    verificationCode: z.string().min(1, 'Verification code is required'),
});

export const ResetPasswordSchema = toTypedSchema(
    resetPasswordShape
        .omit({ verificationCode: true })
        .refine((data) => data.password === data.confirmPassword, {
            message: "Passwords don't match",
            path: ['confirmPassword'],
        })
);
export type ResetPasswordInput = z.infer<
    ReturnType<typeof resetPasswordShape.omit<{ verificationCode: true }>>
> & { confirmPassword: string };

export const resetPasswordPayloadSchema = resetPasswordShape.pick({
    password: true,
    verificationCode: true,
});
export type ResetPasswordPayload = z.infer<typeof resetPasswordPayloadSchema>;
