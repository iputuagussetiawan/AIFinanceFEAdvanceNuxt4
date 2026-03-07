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
import { Loader2 } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import UiInput2 from '~/components/shared/UiInput2.vue';
import UiButtonCustom from '~/components/shared/UiButtonCustom.vue';
import UiButtonSocial from '~/components/shared/UiButtonSocial.vue';
const config = useRuntimeConfig();

const { user } = useAuth();

const { $api } = useNuxtApp();
const props = defineProps<{
    class?: HTMLAttributes['class'];
}>();

// 2. Initialize Form
const { handleSubmit } = useForm<LoginInput>({
    validationSchema: LoginSchema,
});

const { mutate, isPending, error } = useMutation({
    mutationFn: (credentials: LoginInput) => $api.auth.login(credentials),

    onSuccess: async (data) => {
        console.log('Login successful');

        // 1. Set the cookie
        const token = useCookie('accessToken');
        token.value = data.access_token;

        // 2. Update global user state
        const userLoginData = {
            message: 'User fetch successfully',
            user: data.user,
        };
        user.value = userLoginData;
        toast.success('Login Success');
        // 3. Redirect to dashboard
        await navigateTo('/dashboard');
    },

    onError: (err: any) => {
        /**
         * Handle different types of errors:
         * 1. Validation errors (400/422)
         * 2. Unauthorized (401)
         * 3. Server errors (500)
         */
        console.error('Login failed:', err.response?._data || err.message);

        // Ensure state is clean on failure
        user.value = null;
        const token = useCookie('accessToken');
        token.value = null;
        toast.error({
            title: 'Error!',
            message: 'Login failed. Please try again.',
        });

        // Optional: Trigger a toast notification here
        // toast.error(err.response?._data?.message || 'Login failed. Please try again.');
    },
});

// 3. Handle Submit
const onSubmit = handleSubmit((values: LoginInput) => {
    mutate(values);
});

const showToast = () => {
    toast.warning('Error');
};

const handleGoogleLogin = () => {
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
        <form @submit.prevent="onSubmit">
            <FieldGroup>
                <div class="grid gap-8">
                    <UiInput2
                        name="email"
                        label="Email"
                        placeholder="Enter your email"
                        :disabled="isPending"
                    />

                    <UiInput2
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        :disabled="isPending"
                    />
                </div>

                <p
                    v-if="error"
                    class="text-destructive text-sm text-center font-medium"
                >
                    {{
                        (error as any).data?.message ||
                        'Invalid email or password'
                    }}
                </p>

                <Field>
                    <UiButtonCustom :loading="isPending">
                        <template v-if="isPending">
                            <Loader2 class="size-4 animate-spin mr-2" />
                            Logging in...
                        </template>
                        <template v-else>Login</template>
                    </UiButtonCustom>
                </Field>

                <FieldSeparator>Or continue with</FieldSeparator>

                <Field>
                    <UiButtonSocial
                        label="Sign up with Google"
                        @click="handleGoogleLogin"
                    >
                        <template #icon>
                            <GoogleIcon class="size-4" />
                        </template>
                    </UiButtonSocial>

                    <div class="px-6 text-center mt-4 text-sm">
                        Don't have an account?
                        <NuxtLink
                            to="/signup"
                            class="underline underline-offset-4 hover:text-primary transition-colors font-medium"
                        >
                            Sign up
                        </NuxtLink>
                    </div>
                </Field>
            </FieldGroup>
        </form>
    </div>
</template>
