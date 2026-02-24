import { useQuery } from '@tanstack/vue-query';
import { userService } from '~/modules/user/user.service';

export const useAuth = () => {
    const user = useState<any | null>('user', () => null);
    const token = useCookie('accessToken');

    // 1. Define the Query
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['authUser'],
        queryFn: () => userService.getUser(),
        enabled: !!token.value, // Only run if token exists
        refetchOnWindowFocus: false,
        retry: 1,
    });

    // 2. Sync Query data with global state
    watch(
        data,
        (newUser) => {
            if (newUser) user.value = newUser;
        },
        { immediate: true }
    );

    // 3. Handle Errors
    watch(isError, (failed) => {
        if (failed) {
            user.value = null;
            token.value = null;
        }
    });

    /** * 4. RE-ADD THE MISSING PROPERTY
     * This computes the login status based on the global user state
     */
    const isLoggedIn = computed(() => !!user.value);

    // 5. Ensure everything is returned here
    return {
        user,
        isLoggedIn, // <--- Make sure this is here!
        isLoading,
        fetchUser: refetch,
        logout: async () => {
            // ... your logout logic
        },
    };
};
