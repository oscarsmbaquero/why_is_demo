const fetch = require('node-fetch');

const N8N_BASE_URL = 'https://abolitionary-verline-erethismic.ngrok-free.dev/api/v1';
const N8N_API_KEY = process.env.N8N_API_KEY;

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Content-Type, X-N8N-API-KEY');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { endpoint } = req.query;

    if (!endpoint || !['workflows', 'executions'].includes(endpoint)) {
      return res.status(400).json({ error: 'Endpoint no válido' });
    }

    const apiKey = N8N_API_KEY || req.headers['x-n8n-api-key'];
    if (!apiKey) {
      return res.status(401).json({ error: 'API key no configurada' });
    }

    const response = await fetch(`${N8N_BASE_URL}/${endpoint}?limit=100`, {
      headers: {
        'X-N8N-API-KEY': apiKey,
        'ngrok-skip-browser-warning': 'true',
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `Error de n8n: ${response.statusText}` });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error proxy n8n:', error);
    return res.status(500).json({ error: 'Error al conectar con n8n' });
  }
};
