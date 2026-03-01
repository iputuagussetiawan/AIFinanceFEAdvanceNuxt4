export const useApi = () => {
    return $fetch.create({
        onRequest({ options }) {
            const token = useCookie('accessToken');
            const headers = new Headers(options.headers);

            // 1. Add the Bearer Token
            if (token.value) {
                headers.set('Authorization', `Bearer ${token.value}`);
            }

            // 2. IMPORTANT: If in SSR, forward the browser cookies
            if (import.meta.server) {
                const reqHeaders = useRequestHeaders(['cookie']);
                if (reqHeaders.cookie) {
                    headers.set('cookie', reqHeaders.cookie);
                }
            }

            options.headers = headers;
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
