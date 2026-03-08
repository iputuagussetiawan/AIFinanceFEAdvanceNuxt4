// stores/auth.ts
import { useAuth } from '~/composables/useAuth'; // The logic we wrote earlier

export const useAuthStore = defineStore('auth', () => {
    // Use the TanStack-powered composable inside the store
    const {
        user,
        isLoggedIn,
        isLoading,
        fetchUser,
        logout: apiLogout,
    } = useAuth();

    // Actions
    const logout = async () => {
        // Clear any other local Pinia state here
        await apiLogout();
    };

    return {
        // State/Getters from TanStack
        user,
        isLoggedIn,
        isLoading,
        // Methods
        fetchUser,
        logout,
    };
});
