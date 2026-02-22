<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// Import the Form components required for the template
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';
import { Field, FieldGroup, FieldSeparator } from '@/components/ui/field';
import { useForm } from 'vee-validate';
import GoogleIcon from '~/components/shared/icons/GoogleIcon.vue';

import { useMutation } from '@tanstack/vue-query';
import { authService } from '~/modules/auth/auth.service';
import {
    RegisterSchema,
    type RegisterInput,
} from '~/modules/auth/auth.validation';

const props = defineProps<{
    class?: HTMLAttributes['class'];
}>();

// 1. Setup Form
const { handleSubmit, resetForm } = useForm<RegisterInput>({
    validationSchema: RegisterSchema,
});

// 2. Setup Mutation
const { mutate, isPending, error } = useMutation({
    mutationFn: (newUser: RegisterInput) => authService.register(newUser),
    onSuccess: () => {
        resetForm();
        navigateTo('/signin');
    },
});

const onSubmit = handleSubmit((values: RegisterInput) => {
    mutate(values);
});
</script>

<template>
    <form :class="cn('flex flex-col gap-6', props.class)" @submit="onSubmit">
        <FieldGroup>
            <div class="flex flex-col items-center gap-1 text-center">
                <h1 class="text-2xl font-bold">Create your account</h1>
                <p class="text-muted-foreground text-sm text-balance">
                    Fill in the form below to create your account
                </p>
            </div>

            <FormField v-slot="{ componentField }" name="name">
                <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                        <Input
                            type="text"
                            placeholder="Full Name"
                            v-bind="componentField"
                            :disabled="isPending"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="email">
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input
                            type="email"
                            placeholder="m@example.com"
                            v-bind="componentField"
                            :disabled="isPending"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="password">
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input
                            type="password"
                            v-bind="componentField"
                            :disabled="isPending"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <Field>
                <Button type="submit" class="w-full" :disabled="isPending">
                    <template v-if="isPending">Creating account...</template>
                    <template v-else>Create Account</template>
                </Button>
            </Field>

            <FieldSeparator>Or continue with</FieldSeparator>

            <Field>
                <Button
                    variant="outline"
                    type="button"
                    class="w-full"
                    :disabled="isPending"
                >
                    <GoogleIcon class="mr-2 size-4" />
                    Sign up with Google
                </Button>

                <p
                    v-if="error"
                    class="text-destructive text-xs text-center mt-2"
                >
                    {{
                        (error as any).data?.message ||
                        'An error occurred during registration'
                    }}
                </p>

                <div
                    class="px-6 text-center text-sm text-muted-foreground mt-4"
                >
                    Already have an account?
                    <NuxtLink
                        to="/signin"
                        class="underline underline-offset-4 hover:text-primary transition-colors"
                    >
                        Sign in
                    </NuxtLink>
                </div>
            </Field>
        </FieldGroup>
    </form>
</template>
