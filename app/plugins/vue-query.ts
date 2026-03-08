import {
    VueQueryPlugin,
    QueryClient,
    hydrate,
    dehydrate,
} from '@tanstack/vue-query';

export default defineNuxtPlugin((nuxtApp) => {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { staleTime: 5000 } },
    });

    nuxtApp.vueApp.use(VueQueryPlugin, { queryClient });

    if (import.meta.server) {
        nuxtApp.hooks.hook('app:rendered', () => {
            nuxtApp.payload.queryClientState = dehydrate(queryClient);
        });
    }

    if (import.meta.client) {
        nuxtApp.hooks.hook('app:created', () => {
            hydrate(queryClient, nuxtApp.payload.queryClientState);
        });
    }
});
