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
    <section class="login open">
        <div class="login__wrapper">
            <div class="login__container">
                <div class="login__left">
                    <img
                        class="login__left-art"
                        src="/images/page/signup/sign-up-art.png"
                        alt="sign up art"
                    />
                    <div class="login__left-bg-container">
                        <img
                            class="login__left-bg"
                            src="/images/page/signup/sign-up-bg.png"
                            alt="sign up bg"
                        />
                    </div>
                </div>

                <div class="login__right">
                    <div class="login__right-inner">
                        <div>
                            <div class="flex flex-col gap-1 font-barlow mb-8">
                                <h1 class="text-2xl font-bold uppercase">
                                    Create your account
                                </h1>
                                <p
                                    class="text-muted-foreground text-sm text-balance"
                                >
                                    Fill in the form below to create your
                                    account
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
                                            <Loader2
                                                class="size-4 animate-spin mr-2"
                                            />
                                            Creating Account...
                                        </template>
                                        <template v-else
                                            >Create Account</template
                                        >
                                    </UiButtonCustom>
                                </div>

                                <FieldSeparator class="mt-8 mb-4"
                                    >Or continue with</FieldSeparator
                                >

                                <UiButtonSocial
                                    label="Sign up with Google"
                                    @click="handleGoogleRegister"
                                >
                                    <template #icon>
                                        <GoogleIcon class="size-4" />
                                    </template>
                                </UiButtonSocial>

                                <p
                                    v-if="error"
                                    class="text-destructive text-xs text-center mt-4"
                                >
                                    {{
                                        (error as any).data?.message ||
                                        'An error occurred during registration'
                                    }}
                                </p>

                                <div
                                    class="px-6 text-center text-sm text-muted-foreground mt-6"
                                >
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
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.custom-button {
    height: 50px;
    border-radius: 6px;
    background-color: #404145;
    color: white;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    font-family: 'Barlow', sans-serif;
    padding: 0 30px;
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    border: 0;
    margin-top: 15px;
    text-align: center;

    &::after {
        content: '';
        position: absolute;
        height: 3px;
        width: calc(100% - 6px);
        border-radius: 4px;
        background-color: #1c1c1e;
        bottom: 3px;
        left: 3px;
        -webkit-transition: all 0.4s ease;
        transition: all 0.4s ease;
        opacity: 0.8;
    }

    &__text {
        display: block;
        z-index: 1;
        width: 100%;
    }

    &:hover::after {
        height: calc(100% - 6px);
    }
}
.login {
    width: 100%;
    height: 100%;
    position: relative;
    background: transparent;
    overflow-x: hidden;
    display: none;
    transition: all 0.4s 0.2s ease;
    z-index: 2;
    opacity: 0;
    background: #515947;
    height: 100vh;
    min-height: 550px;

    &__bg-container {
        top: 0px;
        left: 0px;
        position: absolute;
        width: 100%;
        height: 100%;
    }

    &__bg {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &.open {
        display: grid;
        opacity: 1;
        transition: all 0.4s 0.2s ease;
    }
    &__wrapper {
        padding: 60px 24px;
        max-width: 1320px;
        width: 100%;
        margin: auto;
        animation: modal-in 1.6s ease both;

        @media only screen and (max-width: 1399.98px) {
            max-width: 1120px;
        }

        &:after {
            display: none;
            content: '';
            position: absolute;
            height: 100%;
            width: 100vw;
            background-color: #404145;
            grid-column-start: 6;
            grid-column-end: 100;
            top: 0;
            animation: modal-in 1.6s ease both;
            animation-delay: 0.2s;
        }
    }
    &__container {
        background: transparent;
        margin: auto;
        height: auto;
        min-height: 550px;
        width: 100%;
        display: grid;
        grid-column-start: 1;
        grid-column-end: 13;
        grid-template-columns: repeat(12, 1fr);
        z-index: 2;
        position: relative;
        @media only screen and (max-width: 1399.98px) {
            min-height: 480px;
        }
    }

    &__left {
        position: relative;
        grid-column-start: 1;
        grid-column-end: 7;
        grid-row: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        border-radius: 30px 0px 0px 30px;
        background-color: #f5f5f5;
        box-sizing: border-box;
        animation: modal-in 1.6s ease both;
        animation-delay: 0.2s;
    }

    &__left-bg-container {
        border-radius: 30px 0px 0px 30px;
        overflow: hidden;
        height: 100%;
        width: 100%;

        @media only screen and (max-width: 1399.98px) {
            height: 550px;
        }
    }

    &__left-bg {
        height: 100%;
        width: 100%;
    }

    &__left-art {
        position: absolute;
        left: -23%;
        bottom: -0.7%;
        max-width: 500px;
    }

    &__right {
        grid-column-start: 6;
        grid-column-end: 13;
        grid-row: 1;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        height: 100%;
        padding: 80px 0;
        border-radius: 0px 30px 30px 0px;
        background-color: #fff;
        box-sizing: border-box;
        overflow: hidden;
        animation: modal-in 1.6s ease both;
        border-radius: 30px;
    }

    &__right-inner {
        grid-column-start: 2;
        grid-column-end: 7;
    }

    &__subtitle {
        font-weight: bold;
        font-size: 24px;
        line-height: 29px;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        margin-bottom: 40px;
    }
}

@keyframes modal-out {
    100% {
        transform: translateX(130%);
    }

    0% {
        transform: translateX(0%);
    }
}

@keyframes modal-in {
    0% {
        transform: translateX(130%);
    }

    100% {
        transform: translateX(0%);
    }
}
</style>
