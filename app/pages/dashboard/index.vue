<script setup lang="ts">
import SecuritySettings from '~/modules/session/components/SecuritySettings.vue';
const { user, logout } = useAuth();
definePageMeta({
    layout: 'dashboard',
});
</script>

<template>
    <div>
        <SecuritySettings />
    </div>
</template>
