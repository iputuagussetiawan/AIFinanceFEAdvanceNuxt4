<script setup lang="ts">
interface Props {
    label?: string;
    loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    label: 'Continue with Google',
    loading: false,
});

const emit = defineEmits(['click']);
</script>

<template>
    <button class="social-button" :disabled="loading" @click="emit('click')">
        <div class="social-button__icon">
            <slot name="icon" />
        </div>

        <span class="social-button__text">
            {{ loading ? 'Connecting...' : label }}
        </span>
    </button>
</template>

<style lang="scss" scoped>
.social-button {
    width: 100%; // Ensures it fills the container like your other inputs
    border: 1px solid #ebf1ef;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    justify-content: center; // Centers content
    border-radius: 8px;
    transition: all 0.4s ease;
    background-color: #fff;
    font-family: 'Barlow', sans-serif;
    font-weight: 500;
    color: #404145;

    &:hover {
        border-color: #367651;
        cursor: pointer;
        background-color: #f9fbf9;
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    &__icon {
        display: flex;
        align-items: center;
        margin-right: 12px; // Your mr-2 equivalent
    }

    &__text {
        font-size: 14px;
        letter-spacing: 0.02em;
    }
}
</style>
