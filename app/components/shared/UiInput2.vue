<script setup lang="ts">
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

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

const isFocused = ref(false);
</script>

<template>
    <FormField v-slot="{ componentField, errorMessage }" :name="props.name">
        <FormItem>
            <FormLabel v-if="props.label">
                <span
                    :class="
                        cn(
                            'block w-full pl-1.25 font-medium text-[14px] leading-4.25 tracking-[0.07em] uppercase transition-colors duration-300 font-barlow',
                            errorMessage ? 'text-destructive' : 'text-[#404145]'
                        )
                    "
                >
                    {{ props.label }}
                </span>
            </FormLabel>
            <FormControl>
                <div
                    :class="[
                        'input-wrapper',
                        { active: isFocused, 'has-error': !!errorMessage },
                    ]"
                >
                    <Input
                        :type="props.type"
                        :placeholder="props.placeholder"
                        v-bind="componentField"
                        :disabled="props.disabled"
                        :readonly="props.readonly"
                        @focus="isFocused = true"
                        @blur="isFocused = false"
                        :class="
                            cn(
                                /* Base State: No borders, no rounds, no shadow */
                                'form-input w-full bg-transparent border-0 h-7.5 font-normal text-[16px] leading-4.75 tracking-[0.07em] text-[#9c9c9c] font-barlow pt-0 pr-0 pb-2.5 pl-1.25 box-border ',
                                'bg-transparent focus:bg-transparent',

                                /* Active State: Bottom Border Only */
                                'focus:outline-none',
                                'focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-none', // Kill default Shadcn ring
                                'focus-visible:border-b-2 focus-visible:border-primary', // Replace with bottom border

                                props.readonly && [
                                    'bg-secondary/50',
                                    'focus-visible:border-none', // Disable active border if readonly
                                    'cursor-default',
                                    'font-medium text-foreground/90',
                                ]
                            )
                        "
                    />
                </div>
            </FormControl>
            <FormMessage />
        </FormItem>
    </FormField>
</template>

<style lang="scss" scoped>
.input-wrapper {
    position: relative;
    &::before {
        content: '';
        position: absolute;
        width: 100%;
        background-color: #d2d2d2;
        height: 2px;
        border-radius: 2px;
        bottom: 0;
        -webkit-transition: all 0.4s ease;
        transition: all 0.4s ease;
        right: 0;
    }

    &::after {
        content: '';
        position: absolute;
        width: 0px;
        background-color: #d2d2d2;
        height: 2px;
        border-radius: 2px;
        bottom: 0;
        transition: all 0.4s ease;
        right: 0;
    }

    &.active::after {
        width: 100%;
        left: 0;
        background-color: #9c9c9c;
    }

    &.has-error {
        &::before {
            background-color: red;
        }
        &::after {
            width: 100%; /* Show the line fully if there is an error */
            background-color: red;
        }
    }
}
</style>
