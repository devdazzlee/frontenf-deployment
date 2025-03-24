// src/app/api/login/route.js
import { NextResponse } from "next/server";

/**
 * This route proxies the request to your external server at
 * https://test-cookies-server.vercel.app/login
 * and then passes back the response (including cookies) to the browser.
 */

export async function POST(request) {
    try {
        // 1. Parse the body from the incoming request
        const { email, password } = await request.json();

        // 2. Forward the request to the external server
        const serverResponse = await fetch("https://test-cookies-server.vercel.app/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
            // We do NOT use 'credentials' here because we are just forwarding.
            // The important part is capturing the 'Set-Cookie' header below.
        });

        // 3. If the external server responds with an error, pass it back
        if (!serverResponse.ok) {
            const errorData = await serverResponse.json();
            return NextResponse.json(errorData, { status: serverResponse.status });
        }

        // 4. Extract the data (JSON) from the external server
        const data = await serverResponse.json();

        // 5. Capture the 'Set-Cookie' header from the external server
        const setCookieHeader = serverResponse.headers.get("set-cookie");

        // 6. Create a NextResponse to send back to the client
        //    and attach the same Set-Cookie header (so it becomes first-party).
        const response = NextResponse.json(data);

        if (setCookieHeader) {
            // Pass the cookie header through so the browser sees it as coming
            // from your own domain (frontenf-deployment.vercel.app).
            response.headers.set("Set-Cookie", setCookieHeader);
        }

        return response;
    } catch (err) {
        console.error("Proxy error:", err);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
