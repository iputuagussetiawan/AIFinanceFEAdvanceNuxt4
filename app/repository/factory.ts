// File: repository/factory.ts

import { defu } from 'defu';
import { useRequestHeaders, useRuntimeConfig } from 'nuxt/app';
import { toValue, type MaybeRefOrGetter } from 'vue';
// 1. Import NitroFetchOptions instead of UseFetchOptions
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack';

class FetchFactory<T> {
    async API(
        url: MaybeRefOrGetter<string>,
        // 2. Update the type here
        options: NitroFetchOptions<NitroFetchRequest> = {}
    ): Promise<T> {
        const config = useRuntimeConfig();
        const appBaseUrl = config.public.appBaseUrl;
        const serverSideCookies = useRequestHeaders(['cookie']);

        const defaults: NitroFetchOptions<NitroFetchRequest> = {
            baseURL: appBaseUrl,
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                ...serverSideCookies,
            },
        };

        // 3. Merge with defu
        const params = defu(options, defaults);

        try {
            return await $fetch<T>(toValue(url), params);
        } catch (error: any) {
            throw error;
        }
    }
}

export default FetchFactory;
