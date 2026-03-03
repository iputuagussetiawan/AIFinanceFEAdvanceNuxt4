<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldSeparator } from '@/components/ui/field';
import { useForm } from 'vee-validate';
import GoogleIcon from '~/components/shared/icons/GoogleIcon.vue';
import { useMutation } from '@tanstack/vue-query';
import { authService } from '~/modules/auth/auth.service';
import {
    RegisterSchema,
    type RegisterInput,
} from '~/modules/auth/auth.validation';

import { Loader2 } from 'lucide-vue-next';
import UiInput from '~/components/shared/UiInput.vue';
const config = useRuntimeConfig();

const { $api } = useNuxtApp();
const props = defineProps<{
    class?: HTMLAttributes['class'];
}>();

// 1. Setup Form
const { handleSubmit, resetForm } = useForm<RegisterInput>({
    validationSchema: RegisterSchema,
});

// 2. Setup Mutation
const { mutate, isPending, error } = useMutation({
    mutationFn: (newUser: RegisterInput) => $api.auth.register(newUser),
    onSuccess: () => {
        resetForm();
        navigateTo('/signin');
    },
});

const onSubmit = handleSubmit((values: RegisterInput) => {
    mutate(values);
});

const handleGoogleRegister = () => {
    // 1. Get your backend base URL from Nuxt config
    const appBase = config.public.apiBaseUrl || 'http://localhost:8000';
    const authUrl = `${appBase}/api/auth/google`;
    // 2. Redirect the entire window to your Express route
    // This triggers the Passport.js logic on the server
    window.open(authUrl, '_blank');
};
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
            <UiInput
                name="name"
                label="Full Name"
                placeholder="Enter your name"
                :disabled="isPending"
            />
            <UiInput
                name="email"
                label="Email"
                placeholder="Enter your email"
                :disabled="isPending"
            />
            <UiInput
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                :disabled="isPending"
            />
            <Field>
                <Button type="submit" class="w-full" :disabled="isPending">
                    <template v-if="isPending"
                        ><Loader2
                            v-if="isPending"
                            class="size-4 animate-spin"
                        />
                        Create Account...</template
                    >
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
                    @click="handleGoogleRegister"
                >
                    <GoogleIcon class="size-4" />
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
