<script setup lang="ts">
import { useColorMode } from '@vueuse/core';
import { Toaster } from 'vue-sonner';
import 'vue-sonner/style.css';
const colorMode = useColorMode();

// 2. Create a computed property to map Nuxt modes to Sonner modes
const currentTheme = computed(() => {
    // Nuxt uses 'auto', but Sonner expects 'system'
    if (colorMode.value === 'auto') return 'system';

    // Return 'light' or 'dark'
    return colorMode.value as 'light' | 'dark';
});
</script>

<template>
    <div>
        <ClientOnly>
            <Toaster
                :theme="currentTheme"
                position="bottom-center"
                richColors
            />
        </ClientOnly>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
