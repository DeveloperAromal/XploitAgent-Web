import dotenv from "dotenv";
dotenv.config();

const auth_key = process.env.GEMINI_API_KEY;

export async function generateVulnerabilityJsonModel(
  report,
  attack_id,
  client_id
) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${auth_key}`;

  const prompt = `You will be given a markdown-formatted vulnerability report, attack ID and client ID. Extract the data and respond with a well-structured, valid JSON object only — no extra text.

attack_id: ${attack_id}
client_id: ${client_id}

report:
"""markdown
${report}
"""

Output a JSON object with the following fields:
- client_id (string)
- attack_id (string)
- attack_name (string)
- description (string)
- severity ("Low" | "Medium" | "High" | "Critical")
- target (URL or path)
- tags (array of strings)
- cvss_score (number, 0–10)
- exploitability_score (number, 0–10)
- estimated_fix_time (string, e.g., "2 hours")
- affected_param (string)
- remediation (string)
- references (array of URLs)
- poc_links (array of file paths or URLs)
- created_at (ISO 8601 timestamp like "2025-07-12T14:20:00Z")

Return only the raw JSON object — no markdown, no explanation.`;

  const requestBody = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await res.json();
    console.log(data);
    const textResponse =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || null;

    if (!textResponse) {
      console.error("Gemini response is missing expected content:", data);
      return null;
    }

    const cleaned = textResponse.replace(/```json|```/g, "").trim();

    console.log("Cleaned JSON output:\n", cleaned);

    try {
      return JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("JSON parse failed:", parseErr);
      return null;
    }
  } catch (err) {
    console.error("Error fetching from Gemini API:", err);
    return null;
  }
}
