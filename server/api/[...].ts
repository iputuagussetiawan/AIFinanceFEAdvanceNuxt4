// File: server/api/[...].ts

import { joinURL } from 'ufo';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBaseUrl;

    // Get the path from the request and remove the leading '/api/'
    const path = event.path.replace(/^\/api\//, '');

    // Combine the base URL with the new path
    const target = joinURL(apiBaseUrl, path);

    // Forward the original request to the target URL
    return proxyRequest(event, target, {
        headers: {
            'Accept-Encoding': 'gzip, deflate, br',
        },
    });
});
