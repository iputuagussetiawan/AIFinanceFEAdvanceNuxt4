<script lang="ts" setup>
const { user, logout } = useAuth();
</script>
<template>
    <pre>{{ user }}</pre>
    <h1>From Dashboard</h1>
    <div v-if="user">
        <h1>Welcome back, {{ user.name }}</h1>
        <p>Role: {{ user.role }}</p>

        <Button @click="logout">Sign Out</Button>
    </div>
</template>
<style lang="scss" scoped></style>
