<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next';

interface Props {
    type?: 'button' | 'submit' | 'reset';
    loading?: boolean;
    disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    type: 'submit',
    loading: false,
    disabled: false,
});

const emit = defineEmits(['click']);
</script>

<template>
    <button
        :type="props.type"
        class="custom-button"
        :disabled="props.disabled || props.loading"
        @click="emit('click')"
    >
        <div v-if="props.loading" class="custom-button__loading">
            <Loader2 class="size-4 animate-spin mr-2" />
            <slot name="loadingText">Processing...</slot>
        </div>

        <span v-else class="custom-button__text">
            <slot />
        </span>
    </button>
</template>

<style lang="scss" scoped>
.custom-button {
    height: 50px;
    width: 100%; // Standard for mobile-first/form layouts
    border-radius: 6px;
    background-color: #404145;
    color: white;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    font-family: 'Barlow', sans-serif;
    padding: 0 30px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 0;
    margin-top: 15px;
    text-align: center;
    transition: opacity 0.3s ease;

    &:disabled {
        cursor: not-allowed;
        opacity: 0.7;
    }

    &::after {
        content: '';
        position: absolute;
        height: 3px;
        width: calc(100% - 6px);
        border-radius: 4px;
        background-color: #1c1c1e;
        bottom: 3px;
        left: 3px;
        transition: all 0.4s ease;
        opacity: 0.8;
    }

    &__text,
    &__loading {
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
        width: 100%;
    }

    &:hover:not(:disabled)::after {
        height: calc(100% - 6px);
    }
}
</style>
