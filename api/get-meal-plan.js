module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const body = req.body;
    const finalPrompt = body.messages.map(m => m.content).join('\n');

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
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
      return res.status(500).json({ error: 'Empty response from Gemini' });
    }

    return res.status(200).json({
      content: [{ type: 'text', text: textOutput }]
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
