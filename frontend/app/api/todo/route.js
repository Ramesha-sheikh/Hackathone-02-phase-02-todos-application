// app/api/todo/route.js - API route to proxy todo requests
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const todoApiUrl = process.env.NEXT_PUBLIC_TODO_API_URL || process.env.TODO_API_URL || 'http://localhost:8000';

    // Determine the correct endpoint based on the request
    const url = new URL(request.url);
    const path = url.pathname.split('/api/todo')[1] || '';
    const targetUrl = `${todoApiUrl}/api${path}`;

    const authHeader = request.headers.get('authorization');
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Authorization': authHeader || '',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: 'Proxy error', details: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const todoApiUrl = process.env.NEXT_PUBLIC_TODO_API_URL || process.env.TODO_API_URL || 'http://localhost:8000';

    // Determine the correct endpoint based on the request
    const url = new URL(request.url);
    const path = url.pathname.split('/api/todo')[1] || '';
    const targetUrl = `${todoApiUrl}/api${path}`;

    const body = await request.json();
    const authHeader = request.headers.get('authorization');
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Authorization': authHeader || '',
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

export async function PUT(request) {
  try {
    const todoApiUrl = process.env.NEXT_PUBLIC_TODO_API_URL || process.env.TODO_API_URL || 'http://localhost:8000';

    // Determine the correct endpoint based on the request
    const url = new URL(request.url);
    const path = url.pathname.split('/api/todo')[1] || '';
    const targetUrl = `${todoApiUrl}/api${path}`;

    const body = await request.json();
    const authHeader = request.headers.get('authorization');
    const response = await fetch(targetUrl, {
      method: 'PUT',
      headers: {
        'Authorization': authHeader || '',
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

export async function DELETE(request) {
  try {
    const todoApiUrl = process.env.NEXT_PUBLIC_TODO_API_URL || process.env.TODO_API_URL || 'http://localhost:8000';

    // Determine the correct endpoint based on the request
    const url = new URL(request.url);
    const path = url.pathname.split('/api/todo')[1] || '';
    const targetUrl = `${todoApiUrl}/api${path}`;

    const authHeader = request.headers.get('authorization');
    const response = await fetch(targetUrl, {
      method: 'DELETE',
      headers: {
        'Authorization': authHeader || '',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: 'Proxy error', details: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const todoApiUrl = process.env.NEXT_PUBLIC_TODO_API_URL || process.env.TODO_API_URL || 'http://localhost:8000';

    // Determine the correct endpoint based on the request
    const url = new URL(request.url);
    const path = url.pathname.split('/api/todo')[1] || '';
    const targetUrl = `${todoApiUrl}/api${path}`;

    const authHeader = request.headers.get('authorization');
    const response = await fetch(targetUrl, {
      method: 'PATCH',
      headers: {
        'Authorization': authHeader || '',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: 'Proxy error', details: error.message }, { status: 500 });
  }
}