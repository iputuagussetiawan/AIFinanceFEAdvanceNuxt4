<script setup lang="ts">
import { ref } from 'vue';
import { UserCircle, GraduationCap, Briefcase, Rocket } from 'lucide-vue-next';
import {
    Stepper,
    StepperDescription,
    StepperIndicator,
    StepperItem,
    StepperSeparator,
    StepperTitle,
    StepperTrigger,
} from '@/components/ui/stepper';

// Current step state
const currentStep = ref(1);

const steps = [
    {
        step: 1,
        title: 'Personal Info',
        description: 'Basic details',
        icon: UserCircle,
    },
    {
        step: 2,
        title: 'Education',
        description: 'Academic background',
        icon: GraduationCap,
    },
    {
        step: 3,
        title: 'Experience',
        description: 'Work history',
        icon: Briefcase,
    },
    {
        step: 4,
        title: 'Complete',
        description: 'Ready to launch',
        icon: Rocket,
    },
];

const nextStep = () => {
    if (currentStep.value < steps.length) currentStep.value++;
};
const prevStep = () => {
    if (currentStep.value > 1) currentStep.value--;
};
</script>

<template>
    <div class="max-w-4xl mx-auto py-10 px-4">
        <Stepper
            v-model="currentStep"
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

        <div
            class="bg-card border rounded-xl p-8 shadow-sm min-h-100 flex flex-col transition-all duration-300"
        >
            <div class="grow">
                <Transition name="fade" mode="out-in">
                    <div :key="currentStep">
                        <div v-if="currentStep === 1">
                            <h2 class="text-2xl font-bold mb-4">
                                Personal Info
                            </h2>
                        </div>
                        <div v-if="currentStep === 2">
                            <h2 class="text-2xl font-bold mb-4">Education</h2>
                        </div>
                    </div>
                </Transition>
            </div>

            <div class="flex justify-between mt-10 pt-6 border-t">
                <button
                    @click="prevStep"
                    :disabled="currentStep === 1"
                    class="px-4 py-2 text-sm font-medium border rounded-md hover:bg-muted disabled:opacity-50 transition-all"
                >
                    Back
                </button>
                <button
                    @click="nextStep"
                    class="px-6 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:brightness-110 active:scale-95 transition-all"
                >
                    {{ currentStep === steps.length ? 'Finish' : 'Next Step' }}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition:
        opacity 0.2s ease,
        transform 0.2s ease;
}

.fade-enter-from {
    opacity: 0;
    transform: translateX(10px);
}

.fade-leave-to {
    opacity: 0;
    transform: translateX(-10px);
}
</style>
