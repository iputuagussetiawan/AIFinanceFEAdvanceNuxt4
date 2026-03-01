<script setup lang="ts">
import 'vue-sonner/style.css';
import { useColorMode } from '@vueuse/core';
import { Toaster as Sonner } from 'vue-sonner';

const colorMode = useColorMode();

const theme = computed(() => {
    if (colorMode.value === 'auto') return 'system';
    return colorMode.value as 'light' | 'dark';
});
</script>

<template>
    <Sonner
        class="toaster group"
        theme="dark"
        :toast-options="{
            classes: {
                toast: 'group shadow-lg rounded-xl border',
                // Define specific colors for each type
                error: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:text-red-400 dark:border-red-900',
                success:
                    'bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:text-green-400 dark:border-green-900',
            },
        }"
    />
</template>
