<script lang="ts" setup>
import {
    Monitor,
    Smartphone,
    Globe,
    Trash2,
    Loader2,
    Laptop,
    TabletIcon,
} from 'lucide-vue-next';
import { computed } from 'vue';

const props = defineProps<{
    session: {
        _id: string;
        userAgent: string;
        createdAt: string;
        isCurrent: boolean;
    };
    loading?: boolean;
}>();

defineEmits(['delete']);

// 1. Advanced User Agent Parser
const parsedDetails = computed(() => {
    const ua = props.session.userAgent;
    let browser = 'Unknown Browser';
    let os = 'Unknown OS';
    let Icon = Monitor;

    // 1. Detect Browser - ORDER MATTERS!
    // Check for Edge/Apidog FIRST because they also contain the word "Chrome"
    if (ua.includes('Edg/')) browser = 'Microsoft Edge';
    else if (ua.includes('Apidog')) browser = 'Apidog Client';
    else if (ua.includes('Chrome')) browser = 'Google Chrome';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Safari') && !ua.includes('Chrome'))
        browser = 'Safari';

    // 2. Detect OS & Icon
    if (ua.includes('Windows NT')) {
        os = 'Windows';
        Icon = Monitor;
    } else if (ua.includes('Macintosh')) {
        os = 'macOS';
        Icon = Laptop;
    } else if (ua.includes('iPhone')) {
        os = 'iPhone';
        Icon = Smartphone;
    } else if (ua.includes('Android')) {
        os = 'Android';
        Icon = Smartphone;
    }

    return { browser, os, Icon };
});

// 2. Relative Time Formatter
const timeAgo = computed(() => {
    const date = new Date(props.session.createdAt);
    const diff = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
});
</script>

<template>
    <div class="group flex w-full items-center py-3">
        <div
            class="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/20 text-muted-foreground hover:cursor-pointer hover:bg-primary/5 hover:text-primary transition-all duration-300"
            :class="{
                'border-green-500/30 dark:bg-primary/10 text-primary dark:text-primary':
                    session.isCurrent,
            }"
        >
            <component :is="parsedDetails.Icon" class="size-6" />
        </div>

        <div class="flex flex-1 items-center justify-between gap-4">
            <div class="flex-1 min-w-0">
                <h5
                    class="truncate text-sm font-bold leading-tight text-foreground flex items-center gap-2"
                >
                    {{ parsedDetails.browser }} on {{ parsedDetails.os }}
                </h5>

                <div class="mt-1.5 flex items-center gap-2">
                    <div
                        v-if="session.isCurrent"
                        class="inline-flex items-center rounded-md bg-green-500/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter text-green-600 dark:text-green-400 border border-green-500/20"
                    >
                        This Device
                    </div>

                    <span
                        class="text-xs text-muted-foreground flex items-center gap-1"
                    >
                        <Globe class="size-3" />
                        {{ timeAgo }}
                    </span>
                </div>
            </div>

            <Button
                v-if="!session.isCurrent"
                variant="ghost"
                size="icon"
                class="size-9 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors rounded-full"
                :disabled="loading"
                @click="$emit('delete', session._id)"
            >
                <Loader2 v-if="loading" class="size-4 animate-spin" />
                <Trash2 v-else class="size-4" />
            </Button>
        </div>
    </div>
</template>
