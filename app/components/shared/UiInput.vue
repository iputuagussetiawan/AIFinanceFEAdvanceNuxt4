<script setup lang="ts">
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// 1. Union type for restricted input types
type InputType = 'text' | 'password' | 'email';

// 2. Define interface for props
interface Props {
    name: string;
    label?: string;
    placeholder?: string;
    type?: InputType;
    disabled?: boolean;
}

// 3. Use withDefaults and assign to 'props'
const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    placeholder: '',
    disabled: false,
});
</script>

<template>
    <FormField v-slot="{ componentField }" :name="props.name">
        <FormItem>
            <FormLabel>{{ props.label }}</FormLabel>
            <FormControl>
                <Input
                    :type="props.type"
                    :placeholder="props.placeholder"
                    v-bind="componentField"
                    :disabled="props.disabled"
                />
            </FormControl>
            <FormMessage />
        </FormItem>
    </FormField>
</template>
