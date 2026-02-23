<script setup lang="ts">
import { type HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldSeparator } from '@/components/ui/field';
import { useForm } from 'vee-validate';
import GoogleIcon from '~/components/shared/icons/GoogleIcon.vue';
import UiInput from '~/components/shared/UiInput.vue';
import { LoginSchema, type LoginInput } from '../auth.validation';
import { useMutation } from '@tanstack/vue-query';
import { authService } from '../auth.service';
import { Loader2 } from 'lucide-vue-next';
const { user } = useAuth();

const props = defineProps<{
    class?: HTMLAttributes['class'];
}>();

// 2. Initialize Form
const { handleSubmit } = useForm<LoginInput>({
    validationSchema: LoginSchema,
});

const { mutate, isPending, error } = useMutation({
    mutationFn: (credentials: LoginInput) => authService.login(credentials),
    onSuccess: async (data) => {
        console.log('Login successful', data);

        const token = useCookie('accessToken');
        token.value = data.access_token;

        user.value = data.user;

        await navigateTo('/dashboard');
    },
});

// 3. Handle Submit
const onSubmit = handleSubmit((values: LoginInput) => {
    console.log('Form Submitted:', values);
    mutate(values);
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

            <p
                v-if="error"
                class="text-destructive text-sm text-center font-medium"
            >
                {{
                    (error as any).data?.message || 'Invalid email or password'
                }}
            </p>

            <Field>
                <Button type="submit" class="w-full" :disabled="isPending">
                    <template v-if="isPending">
                        <Loader2 v-if="isPending" class="size-4 animate-spin" />
                        Logging in...
                    </template>
                    <template v-else>Login</template>
                </Button>
            </Field>

            <FieldSeparator>Or continue with</FieldSeparator>

            <Field>
                <Button variant="outline" type="button" class="w-full">
                    <GoogleIcon class="size-4" />
                    Login with Google
                </Button>

                <div class="px-6 text-center mt-4">
                    Don't have an account?
                    <NuxtLink
                        to="/signup"
                        class="underline underline-offset-4 hover:text-primary transition-colors"
                    >
                        Sign up
                    </NuxtLink>
                </div>
            </Field>
        </FieldGroup>
    </form>
</template>
