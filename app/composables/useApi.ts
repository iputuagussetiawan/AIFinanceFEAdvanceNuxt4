export const useApi = () => {
    return $fetch.create({
        onRequest({ options }) {
            const token = useCookie('accessToken');

            // Membuat instance Headers baru jika belum ada
            const headers = new Headers(options.headers);

            if (token.value) {
                headers.set('Authorization', `Bearer ${token.value}`);
            }

            // Masukkan kembali ke options
            options.headers = headers;
            options.credentials = 'include';
        },

        onResponseError({ response }) {
            if (response.status === 401) {
                // Opsional: Logout otomatis jika token expired
                const { logout } = useAuth();
                logout();
            }
        },
    });
};
