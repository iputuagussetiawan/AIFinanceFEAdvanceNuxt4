import { toast } from 'vue-sonner';

export interface IUser {
    _id: string;
    name: string;
    email: string;
    profilePicture: string | null;
    isEmailVerified: boolean;
    isActive: boolean;
    lastLogin: string | null; // null if the user hasn't logged in since tracking started
    createdAt: string; // ISO Date string
    updatedAt: string; // ISO Date string
    __v: number;
}

export interface IUserResponse {
    message: string;
    user: IUser;
}

export const useAuth = () => {
    const user = useState<IUserResponse | null>('user', () => null);
    const token = useCookie('accessToken');
    const loading = ref(false);
    const { $api } = useNuxtApp();

    // 1. Initial Fetch
    const { data, pending } = useAsyncData(
        'authUser',
        async () => {
            if (!token.value) return null;
            // Fetch the raw response from the service
            return await $api.user.getProfile();
            // Return ONLY the user part. This is what 'data' will hold.
        },
        {
            immediate: !!token.value,
            // We removed 'transform' here because we are already
            // unwrapping 'res.user' in the async function above.
            server: true,
        }
    );

    // 2. Manual Fetch (used for profile updates or re-auth)
    const fetchUser = async () => {
        if (!token.value) return;
        loading.value = true;
        try {
            const res = await $api.user.getProfile();
            user.value = res.user;
        } catch (err) {
            user.value = null;
            token.value = null;
        } finally {
            loading.value = false;
        }
    };

    // 3. Sync initial data
    // We watch 'data' to ensure the global 'user' state stays updated.
    // When logout happens, data becomes null, and user.value follows.
    watch(
        data,
        (newUser) => {
            if (newUser) user.value = newUser;
        },
        { immediate: true }
    );

    const isLoggedIn = computed(() => !!user.value);

    // 4. Logout
    const logout = async () => {
        try {
            // Clear Nuxt cache so a new login doesn't show old user data
            clearNuxtData('authUser');
            await $api.auth.logout();
            toast.success('Success Logout');
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            // Clear local reactive states
            user.value = null;
            token.value = null;

            // Redirect and clear history stack
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
