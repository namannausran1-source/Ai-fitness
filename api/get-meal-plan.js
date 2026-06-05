module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

  try {
    const body = req.body;
    const finalPrompt = body.messages.map(m => m.content).join('\n');

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://getbulkup.vercel.app',
        'X-Title': 'BulkUp Meal Planner'
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.3-70b-instruct:free',
        messages: [{ role: 'user', content: finalPrompt }]
      })
    });

    const data = await response.json();
    const textOutput = data.choices?.[0]?.message?.content || '';

    if (!textOutput) {
      return res.status(500).json({ error: 'Empty response', raw: data });
    }

    return res.status(200).json({
      content: [{ type: 'text', text: textOutput }]
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
