<script setup lang="ts">
import {
    Stepper,
    StepperDescription,
    StepperIndicator,
    StepperItem,
    StepperTitle,
    StepperTrigger,
} from '@/components/ui/stepper';
import type { Component } from 'vue';

interface Step {
    step: number;
    title: string;
    description: string;
    icon: Component;
}

defineProps<{
    steps: Step[];
    currentStep: number; // This is our currentStep
}>();

defineEmits(['update:currentStep']);
</script>

<template>
    <Stepper
        :model-value="currentStep"
        @update:model-value="$emit('update:currentStep', $event)"
        class="flex w-full items-start gap-2 mb-12"
    >
        <StepperItem
            v-for="item in steps"
            :key="item.step"
            :step="item.step"
            class="relative flex w-full flex-col items-center justify-center group"
        >
            <StepperTrigger class="cursor-default outline-none">
                <StepperIndicator
                    class="transition-all duration-500 z-10"
                    :class="[
                        currentStep >= item.step
                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                            : 'bg-muted text-muted-foreground',
                    ]"
                >
                    <component :is="item.icon" class="w-5 h-5" />
                </StepperIndicator>
            </StepperTrigger>

            <div
                v-if="item.step !== steps.length"
                class="absolute left-[calc(50%+20px)] right-[calc(-50%+20px)] top-5 h-0.5 bg-muted rounded-full overflow-hidden"
            >
                <div
                    class="h-full bg-primary transition-all duration-500 ease-in-out"
                    :style="{
                        width: currentStep > item.step ? '100%' : '0%',
                    }"
                />
            </div>

            <div class="mt-3 flex flex-col items-center text-center">
                <StepperTitle
                    class="text-sm font-semibold transition-colors duration-300"
                    :class="
                        currentStep >= item.step
                            ? 'text-primary'
                            : 'text-muted-foreground'
                    "
                >
                    {{ item.title }}
                </StepperTitle>
                <StepperDescription
                    class="text-xs text-muted-foreground hidden sm:block"
                >
                    {{ item.description }}
                </StepperDescription>
            </div>
        </StepperItem>
    </Stepper>
</template>
