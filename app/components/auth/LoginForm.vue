<script setup lang="ts">
import { type HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

// Validation Imports
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

const props = defineProps<{
    class?: HTMLAttributes['class'];
}>();

// 1. Define Zod Schema
const formSchema = toTypedSchema(
    z.object({
        email: z
            .string()
            .min(1, 'Email is required')
            .email('Please enter a valid email'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
    })
);

// 2. Initialize Form
const { handleSubmit, errors, defineField } = useForm({
    validationSchema: formSchema,
});

const [email, emailProps] = defineField('email');
const [password, passwordProps] = defineField('password');

// 3. Handle Submit
const onSubmit = handleSubmit((values) => {
    console.log('Form Submitted:', values);
    // Add your login logic here
});
</script>

<template>
    <form :class="cn('flex flex-col gap-6', props.class)" @submit="onSubmit">
        <FieldGroup>
            <div class="flex flex-col items-center gap-1 text-center">
                <h1 class="text-2xl font-bold">Login to your account</h1>
                <p class="text-muted-foreground text-sm text-balance">
                    Enter your email below to login to your account
                </p>
            </div>

            <FormField v-slot="{ componentField }" name="email">
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input
                            type="email"
                            placeholder="m@example.com"
                            v-bind="componentField"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="password">
                <FormItem>
                    <div class="flex items-center">
                        <FormLabel>Password</FormLabel>
                        <NuxtLink
                            to="/forgot-password"
                            class="ml-auto text-sm underline underline-offset-4 hover:text-primary transition-colors"
                        >
                            Forgot your password?
                        </NuxtLink>
                    </div>
                    <FormControl>
                        <Input type="password" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <Field>
                <Button type="submit" class="w-full"> Login </Button>
            </Field>

            <FieldSeparator>Or continue with</FieldSeparator>

            <Field>
                <Button variant="outline" type="button" class="w-full">
                    Login with Google
                </Button>

                <FieldDescription class="px-6 text-center mt-4">
                    Don't have an account?
                    <NuxtLink
                        to="/signup"
                        class="underline underline-offset-4 hover:text-primary transition-colors"
                    >
                        Sign up
                    </NuxtLink>
                </FieldDescription>
            </Field>
        </FieldGroup>
    </form>
</template>
