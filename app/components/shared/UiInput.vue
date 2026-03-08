<script setup lang="ts">
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils'; // Assuming you have the standard Shadcn cn utility

type InputType = 'text' | 'password' | 'email' | 'number';

interface Props {
    name: string;
    label?: string;
    placeholder?: string;
    type?: InputType;
    disabled?: boolean;
    readonly?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    placeholder: '',
    disabled: false,
    readonly: false,
});
</script>

<template>
    <FormField v-slot="{ componentField }" :name="props.name">
        <FormItem>
            <FormLabel v-if="props.label" class="text-muted-foreground/80">
                {{ props.label }}
            </FormLabel>
            <FormControl>
                <Input
                    :type="props.type"
                    :placeholder="props.placeholder"
                    v-bind="componentField"
                    :disabled="props.disabled"
                    :readonly="props.readonly"
                    :class="
                        cn(
                            'transition-all duration-200',
                            props.readonly && [
                                'bg-secondary/50', // Subtle background
                                'border-transparent', // Remove the 'input' look
                                'focus-visible:ring-0', // No blue ring on click
                                'cursor-default', // Normal arrow, not text beam
                                'shadow-none', // Flat look
                                'font-medium text-foreground/90', // Make text stand out
                            ]
                        )
                    "
                />
            </FormControl>
            <FormMessage />
        </FormItem>
    </FormField>
</template>
