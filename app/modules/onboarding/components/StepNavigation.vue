<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next';

defineProps<{
    currentStep: number;
    totalSteps: number;
    isStepComplete: boolean;
    isLoading?: boolean;
}>();

defineEmits(['next', 'back']);
</script>

<template>
    <div class="flex justify-between mt-10 pt-6 border-t border-muted/50">
        <button
            type="button"
            @click="$emit('back')"
            :disabled="currentStep === 1 || isLoading"
            class="px-5 py-2 text-sm font-medium border rounded-md hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
        >
            Back
        </button>

        <button
            type="button"
            @click="$emit('next')"
            :disabled="!isStepComplete || isLoading"
            class="inline-flex items-center justify-center px-6 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 min-w-30"
        >
            <template v-if="isLoading">
                <Loader2 class="w-4 h-4 mr-2 animate-spin" />
                Processing...
            </template>
            <template v-else>
                {{ currentStep === totalSteps ? 'Finish' : 'Next Step' }}
            </template>
        </button>
    </div>
</template>
