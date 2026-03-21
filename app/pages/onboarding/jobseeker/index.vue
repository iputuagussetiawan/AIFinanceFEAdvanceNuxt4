<script setup lang="ts">
import { ref } from 'vue';
import { UserCircle, GraduationCap, Briefcase, Rocket } from 'lucide-vue-next';
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import OnboardingStepper from '~/modules/onboarding/components/OnboardingStepper.vue';
import StepPersonalInfo from '~/modules/onboarding/components/StepPersonalInfo.vue';
import StepEducation from '~/modules/onboarding/components/StepEducation.vue';
import StepExperience from '~/modules/onboarding/components/StepExperience.vue';
import StepSummary from '~/modules/onboarding/components/StepSummary.vue';
import StepNavigation from '~/modules/onboarding/components/StepNavigation.vue';
import { useForm } from 'vee-validate';

// 1. Define Schemas
const stepSchemas = [
    z.object({
        firstName: z.string().min(2, 'First name is too short').max(50),
        lastName: z.string().min(2, 'Last name is too short').max(50),
    }),
    z.object({
        university: z.string().min(3, 'University name is required'),
        degree: z.string().min(3, 'Degree is required'),
    }),
    z.object({
        company: z.string().min(2, 'Company name is required'),
        role: z.string().min(2, 'Role is required'),
    }),
    z.object({}), // Final step
];

const currentStep = ref(1);
const isSubmitting = ref(false);

// 2. Setup Vee-Validate with Computed Schema
const validationSchema = computed(() => {
    const schema = stepSchemas[currentStep.value - 1];
    return toTypedSchema(schema || z.object({}));
});

const { values, errors, validate } = useForm({
    validationSchema,
    initialValues: {
        firstName: '',
        lastName: '',
        university: '',
        degree: '',
        company: '',
        role: '',
    },
    keepValuesOnUnmount: true,
});

// 3. Navigation Logic
const nextStep = async () => {
    const result = await validate();

    if (result.valid) {
        if (currentStep.value < steps.length) {
            currentStep.value++;
        } else {
            handleFinalSubmit();
        }
    }
};

const prevStep = () => {
    if (currentStep.value > 1) currentStep.value--;
};

// Real-time check for the navigation button state
const isStepComplete = computed(() => {
    const schema = stepSchemas[currentStep.value - 1];
    if (!schema) return true;
    // safeParse against the current Vee-Validate values
    return schema.safeParse(values).success;
});

// const handleFinalSubmit = async () => {
//     isSubmitting.value = true;
//     // Simulate API Call
//     console.log('Final Data:', values);
//     setTimeout(() => {
//         isSubmitting.value = false;
//     }, 2000);
// };

const handleFinalSubmit = async () => {
    isSubmitting.value = true;
    try {
        console.log('Executing Final Trade with Data:', values);
        // await $api.onboarding.submit(values);

        // Simulate delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // router.push('/dashboard');
    } catch (err) {
        console.error('Final Submit Failed:', err);
    } finally {
        isSubmitting.value = false;
    }
};

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

const onSubmit = async () => {
    // Validate the current step's schema
    const result = await validate();

    if (!result.valid) return;

    if (currentStep.value < steps.length) {
        // Move to next step if not at the end
        currentStep.value++;
    } else {
        // Final submission logic
        await handleFinalSubmit();
    }
};
</script>

<template>
    <div class="max-w-4xl mx-auto py-10 px-4">
        <OnboardingStepper v-model:currentStep="currentStep" :steps="steps" />
        <form
            @submit.prevent="onSubmit"
            class="bg-card border rounded-xl p-8 shadow-sm min-h-100 flex flex-col transition-all duration-300"
        >
            <div class="grow">
                <Transition name="fade" mode="out-in">
                    <div :key="currentStep">
                        <StepPersonalInfo v-if="currentStep === 1" />
                        <StepEducation v-else-if="currentStep === 2" />
                        <StepExperience v-else-if="currentStep === 3" />
                        <StepSummary
                            v-else-if="currentStep === 4"
                            :form-data="values"
                        />
                    </div>
                </Transition>
            </div>

            <StepNavigation
                :current-step="currentStep"
                :total-steps="steps.length"
                :is-step-complete="isStepComplete"
                :is-loading="isSubmitting"
                @next="nextStep"
                @back="prevStep"
            />
        </form>
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
