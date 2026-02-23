import { authService } from '~/modules/auth/auth.service';
import { userService } from '~/modules/user/user.service';

export const useAuth = () => {
    // Global state untuk data user
    const user = useState<any | null>('user', () => null);

    // Ambil cookie accessToken
    const token = useCookie('accessToken');

    const isLoggedIn = computed(() => !!user.value);

    // Di dalam composables/useAuth.ts
    const fetchUser = async () => {
        // Jika tidak ada token di cookie, tidak perlu memanggil API
        if (!token.value) return;
        try {
            // userService.getUser() sudah menggunakan useApi() secara internal
            const data = await userService.getUser();
            // Simpan data user ke state
            user.value = data;
        } catch (err) {
            // Jika gagal (misal: token expired/401), bersihkan state
            user.value = null;
            token.value = null;
            console.error('Failed to fetch user:', err);
        }
    };

    const logout = async () => {
        try {
            // Memanggil fungsi yang sudah kita pindahkan ke service
            await authService.logout();
        } catch (error) {
            // Kita log error-nya saja, tapi tetap lanjut ke proses cleanup
            console.error('Logout error from server:', error);
        } finally {
            // Selalu bersihkan state di frontend
            user.value = null;
            token.value = null;

            // Redirect ke halaman login
            await navigateTo('/signin');
        }
    };

    return { user, isLoggedIn, fetchUser, logout };
};
