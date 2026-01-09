// app/api/auth/route.js - API route to proxy auth requests
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const authApiUrl = process.env.NEXT_PUBLIC_AUTH_API_URL || process.env.AUTH_API_URL || 'http://localhost:8001';

    // Determine the correct endpoint based on the request
    const url = new URL(request.url);
    const path = url.pathname.split('/api/auth')[1] || '/login';
    const targetUrl = `${authApiUrl}/auth${path}`;

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: 'Proxy error', details: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const authApiUrl = process.env.NEXT_PUBLIC_AUTH_API_URL || process.env.AUTH_API_URL || 'http://localhost:8001';

    // Determine the correct endpoint based on the request
    const url = new URL(request.url);
    const path = url.pathname.split('/api/auth')[1] || '';
    const targetUrl = `${authApiUrl}/auth${path}`;

    const response = await fetch(targetUrl);
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: 'Proxy error', details: error.message }, { status: 500 });
  }
}