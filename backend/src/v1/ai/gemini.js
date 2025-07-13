import dotenv from "dotenv";
dotenv.config();

const auth_key = process.env.GEMINI_API_KEY;

async function callGemini(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${auth_key}`;
  const requestBody = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const data = await res.json();
    const textResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || null;

    console.log("Gemini response:", textResponse);

    return textResponse || "No response from Gemini.";
  } catch (err) {
    console.error("Error fetching from Gemini API:", err);
    return "Error calling Gemini.";
  }
}

export async function askGemini(message) {
  return await callGemini(message);
}

export async function summarizeTestResultsWithGemini(testResults) {
  const prompt = `
You are a security assistant. Given the following technical test results, generate a summary highlighting:
- Key findings
- Potential risks
- Recommended next steps

Respond with a short, clear paragraph.

Test results:
""" 
${testResults}
"""
`;

  return await callGemini(prompt);
}
