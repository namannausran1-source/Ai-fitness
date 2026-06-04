export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid request: messages array required' });
    }

    // Verify Firebase token (optional but recommended)
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: Valid Firebase token required' });
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey) {
      console.error('GEMINI_API_KEY not configured');
      return res.status(500).json({ error: 'Server misconfiguration' });
    }

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: messages }]
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', errorData);
      return res.status(response.status).json({ 
        error: `Gemini API error: ${response.statusText}`,
        details: errorData 
      });
    }

    const data = await response.json();

    // Transform Gemini response to match client expectations
    // Client expects: data.content = [{text: "..."}]
    // Gemini returns: {candidates: [{content: {parts: [{text: "..."}]}}]}
    if (data.candidates && data.candidates[0]?.content?.parts) {
      return res.status(200).json({
        content: data.candidates[0].content.parts
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Meal plan endpoint error:', error);
    return res.status(500).json({ 
      error: error.message,
      type: error.name 
    });
  }
}
