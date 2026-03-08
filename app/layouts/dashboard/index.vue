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
import ModeToggle from '~/components/ModeToggle.vue';
import DashboardBreadcrumbs from './components/DashboardBreadcrumbs.vue';
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
                        <DashboardBreadcrumbs />
                    </div>

                    <div class="flex items-center gap-4">
                        <ModeToggle />
                    </div>
                </div>
            </header>

            <main class="flex flex-1 flex-col gap-4 p-4 pt-0">
                <slot />
            </main>
        </SidebarInset>
    </SidebarProvider>
</template>
