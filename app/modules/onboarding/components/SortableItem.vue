<script setup lang="ts">
import { useTemplateRef } from 'vue';
import { makeDraggable } from '@vue-dnd-kit/core';

const props = defineProps<{ index: number; items: string[] }>();
const el = useTemplateRef<HTMLElement>('el');
const { isDragging } = makeDraggable(el, {}, () => [props.index, props.items]);
</script>

<template>
    <div ref="el" :style="{ opacity: isDragging ? 0 : 1 }">
        <slot />
    </div>
</template>
