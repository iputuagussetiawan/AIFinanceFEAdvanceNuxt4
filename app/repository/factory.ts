// File: repository/factory.ts

import { defu } from 'defu';
import {
    useCookie,
    useRequestHeaders,
    useRuntimeConfig,
    type UseFetchOptions,
} from 'nuxt/app';
import { toValue, type MaybeRefOrGetter } from 'vue';

class FetchFactory<T> {
    async call(
        url: MaybeRefOrGetter<string>,
        options: UseFetchOptions<T> = {}
    ): Promise<T> {
        const clientCookies = useRequestHeaders(['cookie']);
        const config = useRuntimeConfig();
        const appBaseUrl = config.public.appBaseUrl;

        const headers: any = {
            Accept: 'application/json',
            Origin: appBaseUrl,
            ...clientCookies,
        };

        const ACCESS_TOKEN = useCookie('accessToken');

        if (ACCESS_TOKEN.value) {
            headers['Authorization'] = `Bearer ${ACCESS_TOKEN.value}`;
        }

        const defaults: UseFetchOptions<T> = {
            key: toValue(url),
            headers,
        };

        const params = defu(options, defaults);

        try {
            // Use $fetch for server-side and client-side requests
            return await $fetch<T>(url, params);
        } catch (error) {
            throw error;
        }
    }
}

export default FetchFactory;
