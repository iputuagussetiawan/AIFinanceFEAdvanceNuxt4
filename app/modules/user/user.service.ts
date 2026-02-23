export const userService = {
    async getUser() {
        const api = useApi();
        // Panggil useApi() untuk mendapatkan instance $fetch yang sudah kita kustomisasi
        // Headers Authorization dan credentials sudah dihandle otomatis oleh useApi
        return await api('/api/user/current');
    },
};
