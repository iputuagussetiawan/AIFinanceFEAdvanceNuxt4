<script setup lang="ts">
import AppLogo from '~/components/shared/AppLogo.vue';
</script>

<template>
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
            <img
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2022&auto=format&fit=crop"
                alt="Finance Background"
                class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
        </div>
    </div>
</template>

<style scoped>
/* Ensure smooth transitions between auth pages */
.page-enter-active,
.page-leave-active {
    transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(0.5rem);
}
</style>
