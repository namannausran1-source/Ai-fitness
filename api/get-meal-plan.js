module.exports.config = {
  runtime: 'edge',
};

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // ── Firebase token verification ─────────────────────────────────────────
  // Verifies the Firebase ID token sent by the client (already sent from your HTML).
  // Requires FIREBASE_PROJECT_ID in your Vercel environment variables.
  const authHeader = req.headers['authorization'] || '';
  const idToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  if (!idToken) {
    return res.status(401).json({ error: 'Missing auth token' });
  }

  try {
    const projectId = process.env.FIREBASE_PROJECT_ID; // e.g. "bulk-c417d"
    // Decode JWT payload (edge-compatible, no Admin SDK needed)
    const [, payloadB64] = idToken.split('.');
    const payload = JSON.parse(atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/')));
    const now = Math.floor(Date.now() / 1000);
    if (!payload.sub || payload.exp < now || payload.aud !== projectId) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    // payload.sub is the Firebase UID — only real logged-in users get past here
  } catch (e) {
    return res.status(401).json({ error: 'Token verification failed' });
  }
  // ───────────────────────────────────────────────────────────────────────

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

  try {
    const body = req.body;
    const finalPrompt = body.messages.map(m => m.content).join('\n');

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: finalPrompt }] }]
        })
      }
    );

    const data = await response.json();
    const textOutput = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!textOutput) {
      return res.status(500).json({ error: 'Empty response', raw: data });
    }

    return res.status(200).json({
      text: textOutput,
      textOutput: textOutput,
      content: [{ type: 'text', text: textOutput }]
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
