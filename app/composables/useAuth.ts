import { toast } from 'vue-sonner';

export interface IUser {
    _id: string;
    name: string;
    email: string;
    bio: string;
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
    // 1. Keep the state as the FULL response object
    const user = useState<IUserResponse | null>('user', () => null);
    const token = useCookie('accessToken');
    const loading = ref(false);
    const { $api } = useNuxtApp();

    const { data, pending, refresh } = useAsyncData(
        'authUser',
        async () => {
            if (!token.value) return null;
            return await $api.user.getProfile(); // Returns { message, user }
        },
        { immediate: !!token.value, server: true }
    );

    // 2. Manual Fetch - FIX: Save the WHOLE response, not just res.user
    const fetchUser = async () => {
        loading.value = true;
        try {
            const res = await $api.user.getProfile();
            user.value = res; // FIX: Keep the structure consistent
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
        (newData) => {
            if (newData) user.value = newData;
        },
        { immediate: true }
    );

    // 4. Helper Computed for easy template use
    // This lets you use 'currentUser.name' instead of 'user.user.name'
    const currentUser = computed(() => user.value?.user || null);
    const isLoggedIn = computed(() => !!user.value?.user);

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
        currentUser,
        isLoggedIn,
        isLoading: computed(() => pending.value || loading.value),
        fetchUser,
        logout,
    };
};
