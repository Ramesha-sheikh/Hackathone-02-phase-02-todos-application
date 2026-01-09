/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', '0.0.0.0'],
  },
  // For API routes, we'll handle them separately in Vercel
  // The API calls will go directly to deployed backends
  env: {
    NEXT_PUBLIC_AUTH_API_URL: process.env.NEXT_PUBLIC_AUTH_API_URL || 'http://localhost:8001',
    NEXT_PUBLIC_TODO_API_URL: process.env.NEXT_PUBLIC_TODO_API_URL || 'http://localhost:8000',
  },
  async redirects() {
    return [
      // Redirect API calls to external backend in production
      // This won't work for client-side calls, so we'll rely on environment variables
    ]
  },
}

module.exports = nextConfig