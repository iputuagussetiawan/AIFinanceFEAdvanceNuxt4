<script lang="ts" setup>
import { Check } from 'lucide-vue-next';
import type { Component } from 'vue';

interface Role {
    id: string;
    title: string;
    description: string;
    icon: Component;
    features: string[];
}

const props = defineProps<{
    role: Role;
    isSelected: boolean;
}>();

const emit = defineEmits<{
    (e: 'select', id: string): void;
}>();

// --- Function to handle the click ---
const handleSelect = () => {
    // You can add extra logic here (e.g., GSAP click animations)
    emit('select', props.role.id);
};
</script>

<template>
    <div
        @click="handleSelect"
        role="radio"
        :aria-checked="isSelected"
        :class="[
            'relative flex flex-col cursor-pointer rounded-xl border-2 p-6 transition-all h-full outline-none focus-visible:ring-2 focus-visible:ring-primary',
            isSelected
                ? 'border-primary bg-primary/5 ring-1 ring-primary'
                : 'border-muted bg-card hover:border-muted-foreground/50',
        ]"
    >
        <div
            v-if="isSelected"
            class="absolute top-4 right-4 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground"
        >
            <Check class="h-3 w-3 stroke-3" />
        </div>

        <div
            class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border bg-background shadow-sm"
        >
            <component :is="role.icon" class="h-5 w-5 text-foreground" />
        </div>

        <div class="space-y-1 mb-4">
            <h3 class="font-semibold leading-none tracking-tight text-lg">
                {{ role.title }}
            </h3>
            <p class="text-sm text-muted-foreground leading-relaxed">
                {{ role.description }}
            </p>
        </div>

        <ul class="mt-auto space-y-2">
            <li
                v-for="(feature, i) in role.features"
                :key="i"
                class="flex items-center gap-2 text-sm text-muted-foreground"
            >
                <div
                    class="h-1 w-1 rounded-full bg-muted-foreground/40 shrink-0"
                />
                {{ feature }}
            </li>
        </ul>
    </div>
</template>
