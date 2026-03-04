import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

/**
 * 1. Define the base object
 */
export const profileObject = z.object({
    name: z.string().min(2, 'Name is required').max(100),
    email: z.string().email('Invalid email address'),
    bio: z.string().max(160, 'Bio must be under 160 characters').optional(),
    // Add the image/avatar field
    profilePicture: z
        .instanceof(File)
        .refine((file) => file.size <= 2 * 1024 * 1024, 'Max image size is 2MB')
        .refine(
            (file) =>
                ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
            'Only .jpg, .png, and .webp formats are supported'
        )
        .optional(),
});

/**
 * 2. Create the Partial Schema for updates
 * We call .partial() here so it's a stable ZodObject
 */
const partialProfileObject = profileObject.partial();

/**
 * 3. Export Types
 * TProfileInput: All fields required (except bio which is optional)
 * TProfileUpdate: All fields optional (for PATCH requests)
 */
export type TProfileInput = z.infer<typeof profileObject>;
export type TProfileUpdate = z.infer<typeof partialProfileObject>;

/**
 * 4. Export Vee-Validate Schemas
 */
// Use this for the full Create/Edit form
export const ProfileSchema = toTypedSchema(profileObject);

// Use this for "Auto-save" or partial update forms
export const ProfileUpdateSchema = toTypedSchema(partialProfileObject);
