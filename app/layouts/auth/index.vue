<script setup lang="ts">
import AppLogo from '~/components/shared/AppLogo.vue';
import { cn } from '~/lib/utils';
</script>

<template>
    <!-- <div>
        <div class="grid min-h-svh lg:grid-cols-2">
            <div class="flex flex-col gap-4 p-6 md:p-10">
                <div class="flex justify-center gap-2 md:justify-start">
                    <AppLogo />
                </div>
                <div class="flex flex-1 items-center justify-center">
                    <div class="w-full max-w-xs">
                        <slot />
                    </div>
                </div>
            </div>
            <div class="relative hidden bg-muted lg:block">
                <NuxtImg
                    src="/images/page/signup/sign-up.jpg"
                    alt="Finance Background"
                    loading="lazy"
                    class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    </div> -->
    <div
        class="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10"
    >
        <div class="w-full max-w-sm md:max-w-4xl">
            <slot />
        </div>
    </div>
</template>

<style scoped>
/* Ensure smooth transitions between auth pages */
</style>
