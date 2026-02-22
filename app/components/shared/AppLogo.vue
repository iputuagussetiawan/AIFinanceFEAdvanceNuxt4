<script setup lang="ts">
import { ChartLineIcon } from 'lucide-vue-next'; // Or your specific icon library

interface Props {
    to?: string;
    showText?: boolean;
}

withDefaults(defineProps<Props>(), {
    to: '/',
    showText: true,
});
</script>

<template>
    <NuxtLink
        :to="to"
        class="flex items-center gap-2 font-medium transition-opacity hover:opacity-90"
    >
        <div
            class="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md"
        >
            <ChartLineIcon class="size-4" />
        </div>

        <span v-if="showText"> AI Finance Assistant </span>
    </NuxtLink>
</template>
