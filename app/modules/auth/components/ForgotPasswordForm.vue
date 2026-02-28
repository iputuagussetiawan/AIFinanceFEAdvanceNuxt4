<script setup lang="ts">
import { type HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup } from '@/components/ui/field';
import { useForm } from 'vee-validate';
import UiInput from '~/components/shared/UiInput.vue';
import {
    ForgotPasswordSchema,
    LoginSchema,
    type ForgotPasswordInput,
    type LoginInput,
} from '../auth.validation';
import { useMutation } from '@tanstack/vue-query';
import { authService } from '../auth.service';
import { Loader2 } from 'lucide-vue-next';

const props = defineProps<{
    class?: HTMLAttributes['class'];
}>();

// 2. Initialize Form
const { handleSubmit } = useForm<ForgotPasswordInput>({
    validationSchema: ForgotPasswordSchema,
});

const { mutate, isPending, error } = useMutation({
    mutationFn: (email: ForgotPasswordInput) =>
        authService.forgotPassword(email),
    onSuccess: async () => {
        console.log('Forgot password successful');
        // 3. Redirect to dashboard
        await navigateTo('/reset-password');
    },
    onError: (err: any) => {
        console.error(
            'Forgot password failed:',
            err.response?._data || err.message
        );
    },
});

// 3. Handle Submit
const onSubmit = handleSubmit((values: ForgotPasswordInput) => {
    mutate(values);
});
</script>

<template>
    <form :class="cn('flex flex-col gap-6', props.class)" @submit="onSubmit">
        <FieldGroup>
            <div class="flex flex-col items-center gap-1 text-center">
                <h1 class="text-2xl font-bold">Forgot Password?</h1>
                <p class="text-muted-foreground text-sm text-balance">
                    Enter your email address and we'll send you a link to reset
                    your password.
                </p>
            </div>

            <UiInput
                name="email"
                label="Email"
                placeholder="name@example.com"
                :disabled="isPending"
            />

            <p
                v-if="error"
                class="text-destructive text-sm text-center font-medium"
            >
                {{
                    (error as any).data?.message ||
                    'Something went wrong. Please try again.'
                }}
            </p>

            <Field>
                <Button type="submit" class="w-full" :disabled="isPending">
                    <template v-if="isPending">
                        <Loader2 class="size-4 animate-spin mr-2" />
                        Sending link...
                    </template>
                    <template v-else>Send Reset Link</template>
                </Button>
            </Field>

            <div class="flex flex-col gap-4 mt-2 text-center text-sm">
                <div>
                    Remember your password?
                    <NuxtLink
                        to="/signin"
                        class="underline underline-offset-4 hover:text-primary transition-colors font-medium"
                    >
                        Back to Login
                    </NuxtLink>
                </div>

                <div class="text-muted-foreground">
                    Don't have an account?
                    <NuxtLink
                        to="/signup"
                        class="underline underline-offset-4 hover:text-primary transition-colors"
                    >
                        Sign up
                    </NuxtLink>
                </div>
            </div>
        </FieldGroup>
    </form>
</template>
