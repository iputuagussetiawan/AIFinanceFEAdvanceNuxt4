<script lang="ts">
// These are static exports, they stay in a normal script block
export const description = 'A sidebar that collapses to icons.';
export const iframeHeight = '800px';
export const containerClass = 'w-full h-full';
</script>

<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import Sessions from './components/Sessions.vue';
import ModeToggle from '~/components/ModeToggle.vue';

// Move composable here for proper reactivity
const { user, logout } = useAuth();
</script>

<template>
    <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
            <header
                class="sticky top-0 z-50 bg-background/60 backdrop-blur-md border-b flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
            >
                <div
                    class="flex items-center justify-between gap-2 px-4 w-full"
                >
                    <div class="flex items-center">
                        <SidebarTrigger class="-ml-1" />
                        <Separator
                            orientation="vertical"
                            class="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem class="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        Building Your Application
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator class="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage
                                        >Security & Sessions</BreadcrumbPage
                                    >
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    <ModeToggle />
                </div>
            </header>

            <div class="flex flex-col min-h-screen">
                <div class="mx-auto w-full max-w-3xl px-6 py-10 md:max-w-5xl">
                    <h1
                        class="text-3xl tracking-tight text-foreground sm:text-4xl"
                    >
                        Setup security and sessions
                    </h1>
                    <p class="mt-2 text-sm text-muted-foreground">
                        Welcome back,
                        <span class="font-medium text-foreground">I Putu</span>.
                        Follow the steps to activate using Squeezy.
                    </p>
                </div>

                <div
                    class="relative mx-auto w-full max-w-3xl px-6 md:max-w-5xl"
                >
                    <div
                        class="absolute left-6 top-0 bottom-0 w-px bg-linear-to-b from-primary/50 via-border to-transparent dark:from-primary/30"
                    />

                    <div class="flex flex-col gap-12">
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
                                <h3 class="text-lg font-semibold">
                                    Multi-Factor Authentication
                                </h3>
                            </div>
                        </section>

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
                                <h3 class="text-lg font-semibold">
                                    Active Sessions
                                </h3>
                                <Sessions />
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </SidebarInset>
    </SidebarProvider>
</template>
