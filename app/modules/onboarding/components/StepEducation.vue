<script setup lang="ts">
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// No props needed - FormField automatically syncs with useForm in the parent
</script>

<template>
    <div class="space-y-6">
        <div>
            <h2 class="text-2xl font-bold tracking-tight">Education</h2>
            <p class="text-sm text-muted-foreground">
                Tell us about your academic background.
            </p>
        </div>

        <div
            class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 items-start"
        >
            <FormField v-slot="{ componentField }" name="university">
                <FormItem>
                    <FormLabel>University</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="e.g. Stanford University"
                            v-bind="componentField"
                        />
                    </FormControl>
                    <div class="min-h-5 py-1">
                        <FormMessage />
                    </div>
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="degree">
                <FormItem>
                    <FormLabel>Degree</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="e.g. Bachelor of Science"
                            v-bind="componentField"
                        />
                    </FormControl>
                    <div class="min-h-5 py-1">
                        <FormMessage />
                    </div>
                </FormItem>
            </FormField>
        </div>
    </div>
</template>
