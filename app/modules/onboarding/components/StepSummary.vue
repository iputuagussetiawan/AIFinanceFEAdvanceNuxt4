<script setup lang="ts">
import { Rocket } from 'lucide-vue-next';

interface FormData {
    firstName: string;
    lastName: string;
    university: string;
    degree: string;
    company: string;
    role: string;
}
//In TypeScript, Partial<T> is a utility type that takes an existing interface and makes all of its properties optional.
defineProps<{
    formData: Partial<FormData>;
}>();
</script>

<template>
    <div class="space-y-6">
        <div class="text-center mb-8">
            <div
                class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 animate-bounce-slow"
            >
                <Rocket class="w-8 h-8" />
            </div>
            <h2 class="text-2xl font-bold tracking-tight">Ready to Launch!</h2>
            <p class="text-sm text-muted-foreground">
                Please review your details before finishing.
            </p>
        </div>

        <div
            class="grid grid-cols-1 gap-1 border rounded-lg p-5 bg-muted/30 backdrop-blur-sm"
        >
            <div
                class="flex justify-between border-b border-muted/50 pb-4 pt-1"
            >
                <span class="text-sm font-medium text-muted-foreground"
                    >Full Name</span
                >
                <span class="text-sm font-semibold">
                    {{ formData.firstName || '—' }}
                    {{ formData.lastName || '—' }}
                </span>
            </div>

            <div class="flex justify-between border-b border-muted/50 py-4">
                <span class="text-sm font-medium text-muted-foreground"
                    >Education</span
                >
                <div class="text-right">
                    <p class="text-sm font-semibold">
                        {{ formData.degree || '—' }}
                    </p>
                    <p class="text-xs text-muted-foreground">
                        at {{ formData.university || '—' }}
                    </p>
                </div>
            </div>

            <div class="flex justify-between py-4">
                <span class="text-sm font-medium text-muted-foreground"
                    >Latest Experience</span
                >
                <div class="text-right">
                    <p class="text-sm font-semibold">
                        {{ formData.role || '—' }}
                    </p>
                    <p class="text-xs text-muted-foreground">
                        @ {{ formData.company || '—' }}
                    </p>
                </div>
            </div>
        </div>

        <div class="p-4 rounded-md bg-primary/5 border border-primary/20">
            <p
                class="text-xs text-center text-muted-foreground leading-relaxed"
            >
                By clicking finish, your profile will be made visible to
                potential employers. You can always edit these details later in
                your profile settings.
            </p>
        </div>
    </div>
</template>

<style scoped>
@keyframes bounce-slow {
    0%,
    100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-8px);
    }
}
.animate-bounce-slow {
    animation: bounce-slow 3s ease-in-out infinite;
}
</style>
