<script setup lang="ts">
// const { loader, loaderFill, loaderBackdrop, showLoader, hideLoader } =
//     useLoader();

// definePageMeta({
//     pageTransition: {
//         name: 'loader-transition',
//         mode: 'out-in',
//         onBeforeLeave: () => {
//             showLoader();
//         },
//         onAfterEnter: () => {
//             hideLoader();
//         },
//     },
// });
// onMounted(() => {
//     // To test it:
//     showLoader()?.then(() => {
//         setTimeout(() => hideLoader(), 5000);
//     });
// });
</script>

<template>
    <div class="auth-layout">
        <!-- <div ref="loader" class="loader">
            <div ref="loaderBackdrop" class="loader__backdrop"></div>
            <div ref="loaderFill" class="loader__fill"></div>
        </div> -->
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.auth-layout {
    background: #515947;
}
</style>
