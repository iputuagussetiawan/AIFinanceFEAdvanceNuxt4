<script lang="ts" setup>
import Sessions from './Sessions.vue';
const { user: currentUser } = useAuth();
</script>
<template>
    <div class="flex flex-col min-h-screen">
        <div class="mx-auto w-full max-w-3xl px-6 py-10 md:max-w-5xl">
            <h1 class="text-3xl tracking-tight text-foreground sm:text-4xl">
                Setup security and sessions
            </h1>
            <p class="mt-2 text-sm text-muted-foreground">
                Welcome back,
                <span class="font-medium text-foreground">{{
                    currentUser?.user?.name
                }}</span
                >. Follow the steps to activate using AI Finance Assistance.
            </p>
        </div>

        <div class="relative mx-auto w-full max-w-3xl px-6 md:max-w-5xl">
            <div
                class="absolute left-6 top-0 bottom-0 w-px bg-linear-to-b from-primary/50 via-border to-transparent dark:from-primary/30"
            />

            <div class="flex flex-col gap-12">
                <!-- <section class="relative pl-10 group">
                            <div
                                class="absolute -left-2.5 top-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-background border border-border group-hover:border-primary transition-colors"
                            >
                                <div
                                    class="absolute inset-0 rounded-full bg-primary opacity-0 group-hover:animate-ping group-hover:opacity-40"
                                ></div>

                                <div
                                    class="relative h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]"
                                ></div>
                            </div>

                            <div class="space-y-4">
                                <h3 class="text-lg font-semibold">
                                    Multi-Factor Authentication
                                </h3>
                            </div>
                        </section> -->

                <section class="relative pl-10 group">
                    <div
                        class="absolute -left-2.5 top-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-background border border-border group-hover:border-primary transition-colors"
                    >
                        <div
                            class="absolute inset-0 rounded-full bg-primary opacity-0 group-hover:animate-ping group-hover:opacity-40"
                        ></div>

                        <div
                            class="relative h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]"
                        ></div>
                    </div>

                    <div class="space-y-4">
                        <h3 class="text-lg font-semibold">Active Sessions</h3>
                        <Sessions />
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped></style>
