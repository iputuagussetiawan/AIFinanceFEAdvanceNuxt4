<script setup lang="ts">
const { loader, loaderFill, loaderBackdrop, showLoader, hideLoader } =
    useLoader();

definePageMeta({
    pageTransition: {
        name: 'loader-transition',
        mode: 'out-in',
        onBeforeLeave: () => {
            showLoader();
        },
        onAfterEnter: () => {
            hideLoader();
        },
    },
});
onMounted(() => {
    // To test it:
    showLoader()?.then(() => {
        setTimeout(() => hideLoader(), 1);
    });
});
</script>

<template>
    <div class="auth-layout">
        <div ref="loader" class="loader">
            <div ref="loaderBackdrop" class="loader__backdrop"></div>
            <div ref="loaderFill" class="loader__fill"></div>
        </div>
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.auth-layout {
    background: #515947;
}

.loader {
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100vh;
    z-index: 999;
    overflow: hidden;

    &__backdrop {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        background: rgba(0, 0, 0, 0.5);
    }

    &__fill {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fff;
    }
}
</style>
