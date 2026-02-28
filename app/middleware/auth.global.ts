export default defineNuxtRouteMiddleware(async (to) => {
    const { user, fetchUser } = useAuth();

    /**
     * If user state is empty, attempt to fetch user data from the API.
     * This relies on the 'accessToken' cookie being present and valid.
     * If the token is invalid/expired, fetchUser will handle clearing the state.
     */
    if (!user.value) {
        await fetchUser();
    }

    /**
     * Define routes that do not require authentication.
     * In this example, we consider '/signin' and '/signup' as public routes. you can adjust this list based on your actual route structure.
     */
    const isPublic = [
        '/signin',
        '/signup',
        '/forgot-password',
        '/reset-password',
    ].includes(to.path);

    /**
     * Case 1: User is NOT authenticated and tries to access a protected route.
     * Redirect to the sign-in page.
     */
    if (!user.value && !isPublic) {
        return navigateTo('/signin');
    }

    /**
     * Case 2: User IS authenticated and tries to access guest-only pages (like Sign In).
     * Redirect them to the dashboard.
     */
    if (user.value && isPublic) {
        return navigateTo('/dashboard');
    }
});
