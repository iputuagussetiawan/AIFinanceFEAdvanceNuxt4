<script setup lang="ts">
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { ref, useTemplateRef } from 'vue';
import { DnDProvider, makeDroppable } from '@vue-dnd-kit/core';
import SortableItem from './SortableItem.vue';

const items = ref(['One', 'Two', 'Three', 'Four']);
const zoneRef = useTemplateRef<HTMLElement>('zone');

makeDroppable(
    zoneRef,
    {
        events: {
            onDrop(e) {
                const r = e.helpers.suggestSort('vertical');
                if (r) items.value = r.targetItems as string[];
            },
        },
    },
    () => items.value
);
</script>

<template>
    <div class="space-y-6">
        <div>
            <h2 class="text-2xl font-bold tracking-tight text-foreground">
                Work Experience
            </h2>
            <p class="text-sm text-muted-foreground">
                Tell us about your most recent professional role.
            </p>
        </div>

        <div
            class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 items-start"
        >
            <FormField v-slot="{ componentField }" name="company">
                <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="e.g. Google"
                            v-bind="componentField"
                        />
                    </FormControl>
                    <div class="min-h-5 py-1">
                        <FormMessage />
                    </div>
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="role">
                <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="e.g. Senior Designer"
                            v-bind="componentField"
                        />
                    </FormControl>
                    <div class="min-h-5 py-1">
                        <FormMessage />
                    </div>
                </FormItem>
            </FormField>
        </div>
        <DnDProvider>
            <div ref="zone" class="list">
                <SortableItem
                    v-for="(item, i) in items"
                    :key="item"
                    :index="i"
                    :items="items"
                >
                    {{ item }}
                </SortableItem>
            </div>
        </DnDProvider>
    </div>
</template>
