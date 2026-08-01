export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text, type } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured.' });
    }

    const prompt = `Analyze the following terms of service or agreement text for hidden fees, fine print, sneaky subscription charges, or extra costs.
Return your response ONLY as valid JSON in this exact structure without markdown backticks:
{
  "riskLevel": "Low",
  "summary": "Brief overall assessment",
  "findings": [
    {
      "category": "Fee",
      "title": "Short title",
      "description": "Clear explanation",
      "severity": "Low"
    }
  ],
  "actionItems": ["Practical recommendation 1", "Practical recommendation 2"]
}

Text to analyze:
${text}`;

    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    const rawText = data.candidates[0].content.parts[0].text;
    const cleanJson = rawText.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(cleanJson);

    return res.status(200).json(parsed);
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Failed to analyze text' });
  }
}
