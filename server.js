const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, status: 'healthy' });
});

app.post('/api/chat', async (req, res) => {
  const text = String(req.body?.message || '').trim();

  if (!text) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  if (!GEMINI_API_KEY) {
    return res.status(500).json({
      error: 'Missing GEMINI_API_KEY. Add it to your .env file before starting the app.'
    });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            role: 'user',
            parts: [{ text }]
          }]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data?.error?.message || 'Gemini API request failed.';
      return res.status(response.status).json({ error: errorMessage });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || '')
        .join('') || 'Sorry, I could not generate a response.';

    return res.json({ reply });
  } catch (error) {
    console.error('Gemini request failed:', error);
    return res.status(500).json({ error: 'Something went wrong while contacting Gemini.' });
  }
});

app.use(express.static(path.join(__dirname)));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
