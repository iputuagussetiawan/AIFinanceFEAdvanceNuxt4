// File: app/api/[...path]/route.ts
import { NextRequest, NextResponse } from 'next/server';

async function handleProxy(request: NextRequest) {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    // 1. Extract the path from the URL
    // Next.js provides the path via params or the URL object
    const { pathname, search } = new URL(request.url);
    const targetPath = pathname.replace(/^\/api/, '');

    // 2. Combine with Base URL
    const targetUrl = `${apiBaseUrl}${targetPath}${search}`;

    // 3. Prepare headers (forwarding auth and content-type)
    const headers = new Headers(request.headers);
    headers.set('host', new URL(apiBaseUrl!).host); // Important for some APIs

    try {
        const response = await fetch(targetUrl, {
            method: request.method,
            headers: headers,
            body: request.method !== 'GET' ? await request.blob() : undefined,
            cache: 'no-store', // Usually you don't want to cache proxy requests
        });

        // 4. Return the response back to the client
        const data = await response.blob();
        return new NextResponse(data, {
            status: response.status,
            headers: response.headers,
        });
    } catch (error) {
        console.error('Proxy error:', error);
        return NextResponse.json({ error: 'Proxy failed' }, { status: 500 });
    }
}

// Export for all HTTP methods
export const GET = handleProxy;
export const POST = handleProxy;
export const PUT = handleProxy;
export const DELETE = handleProxy;
export const PATCH = handleProxy;
