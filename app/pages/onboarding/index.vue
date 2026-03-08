<script setup lang="ts">
import { ref } from 'vue';
import { Briefcase, User, ArrowRight, Check } from 'lucide-vue-next';
import OnboardingCard from '~/modules/onboarding/components/OnboardingCard.vue';

const props = defineProps<{
    onSelect?: (role: string) => void;
}>();

const emit = defineEmits(['select']);
const selected = ref<string | null>(null);

const roles = [
    {
        id: 'jobseeker',
        title: 'Job Seeker',
        description: 'Find your dream job and build your career.',
        icon: User,
        features: [
            'Browse thousands of jobs',
            'AI-powered matching',
            'Track applications',
        ],
    },
    {
        id: 'employer',
        title: 'Employer',
        description: 'Hire top talent and grow your team.',
        icon: Briefcase,
        features: [
            'Post unlimited jobs',
            'Smart candidate filtering',
            'Analytics dashboard',
        ],
    },
];

const handleRoleSelect = (id: string) => {
    selected.value = id;
};

const handleContinue = async () => {
    if (selected.value) {
        // 1. Emit events and run props for parent components
        emit('select', selected.value);
        if (props.onSelect) props.onSelect(selected.value);

        // 2. Navigate to the specific onboarding page
        // This will go to /onboarding/jobseeker or /onboarding/employer
        await navigateTo(`/onboarding/${selected.value}`);
    }
};
</script>

<template>
    <div
        class="min-h-screen flex items-center justify-center bg-background p-4 antialiased"
    >
        <div class="w-full max-w-2xl">
            <div class="text-center mb-10">
                <h1
                    class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
                >
                    How will you use our platform?
                </h1>
                <p class="mt-2 text-muted-foreground text-lg">
                    Select your primary role to customize your experience.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <OnboardingCard
                    v-for="role in roles"
                    :key="role.id"
                    :role="role"
                    :is-selected="selected === role.id"
                    @select="handleRoleSelect"
                />
            </div>

            <div class="mt-8 flex flex-col items-center gap-4">
                <button
                    @click="handleContinue"
                    :disabled="!selected"
                    class="inline-flex items-center justify-center rounded-md bg-primary px-8 py-2.5 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 w-full sm:w-auto"
                >
                    Continue
                    <ArrowRight class="ml-2 h-4 w-4" />
                </button>

                <p class="text-xs text-muted-foreground">
                    You can change this later in your profile settings.
                </p>
            </div>
        </div>
    </div>
</template>
