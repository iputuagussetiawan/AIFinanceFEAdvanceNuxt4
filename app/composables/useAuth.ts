import { authService } from '~/modules/auth/auth.service';
import { userService } from '~/modules/user/user.service';

export const useAuth = () => {
    const user = useState<any | null>('user', () => null);
    const token = useCookie('accessToken');
    const loading = ref(false);

    // 1. Initial Fetch
    const { data, refresh, pending } = useAsyncData(
        'authUser',
        async () => {
            // Check if token exists inside the fetcher to prevent unnecessary calls
            if (!token.value) return null;
            return await userService.getUser();
        },
        {
            immediate: !!token.value,
            // Remove watch: [token] here to prevent it from auto-firing
            // when we clear the token during logout.
            server: true,
        }
    );

    // 2. Manual Fetch
    const fetchUser = async () => {
        if (!token.value) return;
        loading.value = true;
        try {
            const res = await userService.getUser();
            user.value = res;
        } catch (err) {
            user.value = null;
            token.value = null;
        } finally {
            loading.value = false;
        }
    };

    // 3. Sync initial data
    watch(
        data,
        (newUser) => {
            // Only update if newUser is actually an object, not null from a failed refresh
            if (newUser) user.value = newUser;
        },
        { immediate: true }
    );

    const isLoggedIn = computed(() => !!user.value);

    // 4. Fixed Logout
    const logout = async () => {
        try {
            // Stop further reactive triggers by clearing data cache first
            clearNuxtData('authUser');

            // Call API
            await authService.logout();
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            // 5. Order of operations matters:
            // First, clear the state
            user.value = null;
            token.value = null;

            // Use 'replace: true' to ensure the user can't click "Back"
            // and trigger a re-auth attempt
            await navigateTo('/signin', { replace: true });
        }
    };

    return {
        user,
        isLoggedIn,
        isLoading: computed(() => pending.value || loading.value),
        fetchUser,
        logout,
    };
};
