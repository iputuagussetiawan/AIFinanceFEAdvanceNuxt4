<script setup lang="ts">
const { logout } = useAuth();
const authStore = useAuthStore();

// You can use these directly in the template
const { user, isLoading } = storeToRefs(authStore);
import {
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    CreditCard,
    LogOut,
    Sparkles,
} from 'lucide-vue-next';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { getInitials } from '~/lib/text-formater';

const props = defineProps<{
    user: {
        name: string;
        email: string;
        avatar: string;
    };
}>();

const { isMobile } = useSidebar();
</script>

<template>
    <SidebarMenu>
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <SidebarMenuButton
                        size="lg"
                        class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                        <Avatar
                            class="h-8 w-8 rounded-full shrink-0 overflow-hidden"
                        >
                            <AvatarImage
                                :src="user?.user.profilePicture || ''"
                                :alt="user?.user.name || 'User Avatar'"
                                class="aspect-square h-full w-full object-cover"
                            />
                            <AvatarFallback class="rounded-lg">
                                {{ getInitials(user?.user.name) }}
                            </AvatarFallback>
                        </Avatar>
                        <div
                            class="grid flex-1 text-left text-sm leading-tight"
                        >
                            <span class="truncate font-medium">{{
                                user?.user.name
                            }}</span>
                            <span class="truncate text-xs">{{
                                user?.user.email
                            }}</span>
                        </div>
                        <ChevronsUpDown class="ml-auto size-4" />
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                    :side="isMobile ? 'bottom' : 'right'"
                    align="end"
                    :side-offset="4"
                >
                    <DropdownMenuLabel class="p-0 font-normal">
                        <div
                            class="flex items-center gap-2 px-1 py-1.5 text-left text-sm"
                        >
                            <Avatar
                                class="h-8 w-8 rounded-full shrink-0 overflow-hidden"
                            >
                                <AvatarImage
                                    :src="user?.user.profilePicture || ''"
                                    :alt="user?.user.name || 'User Avatar'"
                                    class="aspect-square h-full w-full object-cover"
                                />
                                <AvatarFallback class="rounded-lg">
                                    {{ getInitials(user?.user.name) }}
                                </AvatarFallback>
                            </Avatar>
                            <div
                                class="grid flex-1 text-left text-sm leading-tight"
                            >
                                <span class="truncate font-semibold">{{
                                    user?.user.name
                                }}</span>
                                <span class="truncate text-xs">{{
                                    user?.user.email
                                }}</span>
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Sparkles />
                            Upgrade to Pro
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem as-child>
                            <NuxtLink
                                to="/dashboard/profile"
                                class="flex w-full items-center"
                            >
                                <BadgeCheck />
                                Profile
                            </NuxtLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <CreditCard />
                            Billing
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Bell />
                            Notifications
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem @click="logout">
                        <LogOut />
                        Log out 2
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    </SidebarMenu>
</template>
