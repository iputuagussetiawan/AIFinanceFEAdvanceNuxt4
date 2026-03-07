<script setup lang="ts">
import SignupForm from '~/modules/auth/components/SignupForm.vue';

definePageMeta({
    layout: 'auth',
    pageTransition: {
        name: 'auth-transition',
        mode: 'out-in',
        // Triggered when entering
        onBeforeEnter: (el) => {
            el.classList.add('open');
            el.classList.remove('close'); // Safety: clear exit state
        },
        // Triggered when leaving
        onBeforeLeave: (el) => {
            el.classList.remove('open');
            el.classList.add('close');
        },
        // Cleanup: Remove classes after the transition is totally done
        onAfterEnter: (el) => {
            // If you want the 'open' style to stay, keep this.
            // If it's just for the animation, you can remove it here.
        },
    },
});
</script>

<template>
    <div class="auth-page-content">
        <SignupForm />
    </div>
</template>

<style lang="scss" scoped></style>
