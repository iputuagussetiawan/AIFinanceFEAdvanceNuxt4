<script setup lang="ts">
import { useSortable } from '@dnd-kit-vue/sortable';
import { GripVertical } from 'lucide-vue-next';
import { computed } from 'vue';

const props = defineProps<{
    id: string;
}>();

const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: props.id });

// 🗝️ This style is what makes the element actually move on screen
const style = computed(() => ({
    transform: transform.value
        ? `translate3d(${transform.value.x}px, ${transform.value.y}px, 0)`
        : undefined,
    transition: transition.value,
    zIndex: isDragging.value ? 10 : 1,
    opacity: isDragging.value ? 0.5 : 1,
}));
</script>

<template>
    <div
        ref="setNodeRef"
        :style="style"
        class="relative border rounded-xl p-6 bg-card group shadow-sm"
    >
        <div
            v-bind="{ ...attributes, ...listeners }"
            class="cursor-grab active:cursor-grabbing p-1 text-muted-foreground hover:text-foreground absolute left-2 top-6"
        >
            <GripVertical class="w-5 h-5" />
        </div>

        <slot />
    </div>
</template>
