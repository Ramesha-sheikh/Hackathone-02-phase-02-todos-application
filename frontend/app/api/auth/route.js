// app/api/auth/route.js - API route to proxy auth requests
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const authApiUrl = process.env.NEXT_PUBLIC_AUTH_API_URL || process.env.AUTH_API_URL || 'http://localhost:8001';

    // Validate that authApiUrl is set
    if (!authApiUrl || authApiUrl.includes('your-')) {
      return NextResponse.json({
        error: 'Backend service not configured',
        details: 'Please set the NEXT_PUBLIC_AUTH_API_URL environment variable'
      }, { status: 503 });
    }

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

    // Forward the response as-is
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Auth API proxy error:', error);
    return NextResponse.json({
      error: 'Proxy error',
      details: error.message,
      message: 'Unable to connect to authentication service'
    }, { status: 503 });
  }
}

export async function GET(request) {
  try {
    const authApiUrl = process.env.NEXT_PUBLIC_AUTH_API_URL || process.env.AUTH_API_URL || 'http://localhost:8001';

    // Validate that authApiUrl is set
    if (!authApiUrl || authApiUrl.includes('your-')) {
      return NextResponse.json({
        error: 'Backend service not configured',
        details: 'Please set the NEXT_PUBLIC_AUTH_API_URL environment variable'
      }, { status: 503 });
    }

    // Determine the correct endpoint based on the request
    const url = new URL(request.url);
    const path = url.pathname.split('/api/auth')[1] || '';
    const targetUrl = `${authApiUrl}/auth${path}`;

    const response = await fetch(targetUrl);
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Auth API proxy error:', error);
    return NextResponse.json({
      error: 'Proxy error',
      details: error.message,
      message: 'Unable to connect to authentication service'
    }, { status: 503 });
  }
}