export default defineNuxtRouteMiddleware(async (to) => {
    const { user, fetchUser } = useAuth();

    // Only fetch if we don't have the user yet
    if (!user.value) {
        await fetchUser();
    }

    // Define public routes
    const isPublic = ['/signin', '/signup'].includes(to.path);

    if (!user.value && !isPublic) {
        return navigateTo('/signin');
    }

    if (user.value && isPublic) {
        return navigateTo('/dashboard');
    }
});
