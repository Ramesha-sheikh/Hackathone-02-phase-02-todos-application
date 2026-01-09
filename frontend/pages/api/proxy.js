// pages/api/proxy.js - API route to proxy requests to backend services
export default async function handler(req, res) {
  // Get the target service from the query parameters
  const { service, path } = req.query;
  
  let targetUrl;
  if (service === 'auth') {
    targetUrl = `${process.env.AUTH_API_URL || 'http://localhost:8001'}/${path}`;
  } else if (service === 'todo') {
    targetUrl = `${process.env.TODO_API_URL || 'http://localhost:8000'}/api/${path}`;
  } else {
    return res.status(400).json({ error: 'Invalid service' });
  }
  
  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        ...req.headers,
        'Content-Type': 'application/json',
      },
      body: req.body ? JSON.stringify(req.body) : undefined,
    });
    
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy error', details: error.message });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}