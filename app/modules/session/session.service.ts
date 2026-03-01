export const sessionService = {
    async getAll() {
        const api = useApi();
        return await api('/api/session/all', {
            method: 'GET',
        });
    },
};
