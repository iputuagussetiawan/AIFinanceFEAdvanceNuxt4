<script setup lang="ts">
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// No props needed! FormField connects to useForm automatically.
</script>

<template>
    <div class="space-y-6">
        <div>
            <h2 class="text-2xl font-bold tracking-tight text-foreground">
                Personal Information
            </h2>
            <p class="text-sm text-muted-foreground">
                Please provide your legal name.
            </p>
        </div>

        <div
            class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 items-start"
        >
            <FormField v-slot="{ componentField }" name="firstName">
                <FormItem class="flex flex-col space-y-2">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                        <Input placeholder="John" v-bind="componentField" />
                    </FormControl>
                    <div class="min-h-[20px]">
                        <FormMessage class="text-xs text-destructive" />
                    </div>
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="lastName">
                <FormItem class="flex flex-col space-y-2">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Doe" v-bind="componentField" />
                    </FormControl>
                    <div class="min-h-[20px]">
                        <FormMessage class="text-xs text-destructive" />
                    </div>
                </FormItem>
            </FormField>
        </div>
    </div>
</template>
