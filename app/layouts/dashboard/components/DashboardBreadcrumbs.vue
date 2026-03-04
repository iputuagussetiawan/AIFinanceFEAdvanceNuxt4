<script setup lang="ts">
const route = useRoute();

const breadcrumbs = computed(() => {
    const pathNodes = route.path.split('/').filter((node) => node !== '');

    return pathNodes.map((node, index) => {
        const href = '/' + pathNodes.slice(0, index + 1).join('/');

        // Improved Label: Handles dashes (e.g., "user-profile" -> "User Profile")
        const label = node
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (l) => l.toUpperCase());

        return {
            label,
            href,
            isLast: index === pathNodes.length - 1,
        };
    });
});
</script>

<template>
    <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem class="hidden md:block">
                <BreadcrumbLink as-child>
                    <NuxtLink to="/">Home</NuxtLink>
                </BreadcrumbLink>
            </BreadcrumbItem>

            <template v-for="crumb in breadcrumbs" :key="crumb.href">
                <BreadcrumbSeparator class="hidden md:block" />

                <BreadcrumbItem>
                    <BreadcrumbPage v-if="crumb.isLast">
                        {{ crumb.label }}
                    </BreadcrumbPage>

                    <BreadcrumbLink v-else as-child class="hidden md:block">
                        <NuxtLink :to="crumb.href">
                            {{ crumb.label }}
                        </NuxtLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </template>
        </BreadcrumbList>
    </Breadcrumb>
</template>
