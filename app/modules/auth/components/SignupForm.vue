<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

import { FieldSeparator } from '@/components/ui/field';
import { useForm } from 'vee-validate';
import GoogleIcon from '~/components/shared/icons/GoogleIcon.vue';
import { useMutation } from '@tanstack/vue-query';
import UiInput2 from '~/components/shared/UiInput2.vue';
import UiButtonSocial from '~/components/shared/UiButtonSocial.vue';
import {
    RegisterSchema,
    type RegisterInput,
} from '~/modules/auth/auth.validation';

import { Loader2 } from 'lucide-vue-next';
import UiInput from '~/components/shared/UiInput.vue';
import UiButtonCustom from '~/components/shared/UiButtonCustom.vue';
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
    const authUrl = `${appBase}/auth/google`;
    // 2. Redirect the entire window to your Express route
    // This triggers the Passport.js logic on the server
    window.open(authUrl, '_blank');
};
</script>

<template>
    <div>
        <div class="flex flex-col gap-1 font-barlow mb-8">
            <h1 class="text-2xl font-bold uppercase">Create your account</h1>
            <p class="text-muted-foreground text-sm text-balance">
                Fill in the form below to create your account
            </p>
        </div>

        <form @submit="onSubmit">
            <div class="grid gap-8">
                <UiInput2
                    name="name"
                    label="Full Name"
                    placeholder="Enter your name"
                />

                <UiInput2
                    name="email"
                    label="Your Email"
                    type="email"
                    placeholder="Enter your email"
                />

                <UiInput2
                    name="password"
                    label="Your Password"
                    type="password"
                    placeholder="Enter your password"
                />

                <UiButtonCustom :loading="isPending">
                    <template v-if="isPending">
                        <Loader2 class="size-4 animate-spin mr-2" />
                        Creating Account...
                    </template>
                    <template v-else>Create Account</template>
                </UiButtonCustom>
            </div>

            <FieldSeparator class="mt-8 mb-4">Or continue with</FieldSeparator>

            <UiButtonSocial
                label="Sign up with Google"
                @click="handleGoogleRegister"
            >
                <template #icon>
                    <GoogleIcon class="size-4" />
                </template>
            </UiButtonSocial>

            <p v-if="error" class="text-destructive text-xs text-center mt-4">
                {{
                    (error as any).data?.message ||
                    'An error occurred during registration'
                }}
            </p>

            <div class="px-6 text-center text-sm text-muted-foreground mt-6">
                Already have an account?
                <NuxtLink
                    to="/signin"
                    class="underline underline-offset-4 hover:text-primary transition-colors"
                >
                    Sign in
                </NuxtLink>
            </div>
        </form>
    </div>
</template>
