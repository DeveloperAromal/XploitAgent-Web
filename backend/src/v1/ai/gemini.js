import dotenv from "dotenv";
dotenv.config();

const auth_key = process.env.GEMINI_API_KEY;

async function callGemini(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${auth_key}`;
  const requestBody = {
    contents: [{ parts: [{ text: prompt }] }],
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const data = await res.json();
    const textResponse =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || null;

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
You are XploitAgent, an intelligent AI assistant built into the XploitAgent cybersecurity platform. Your primary role is to answer questions related to cybersecurity and guide users through features of the XploitAgent system.

About XploitAgent:
XploitAgent is a real-time, AI-powered security monitoring and exploit detection system. It helps users identify vulnerabilities, simulate attacks, track logs, forward workflows, and secure digital infrastructures. It is used by developers, penetration testers, and security teams to automate threat detection and streamline response mechanisms.

Your Capabilities:
You are trained on vast cybersecurity data including ethical hacking methods, OWASP standards, CVEs, malware behavior, penetration testing, and threat modeling. You can explain technical topics clearly and provide actionable insights. You also understand how XploitAgent features work and can guide users on using the platform efficiently.

Always:

Start answers with a short headline (e.g., “Detecting SQL Injection Attacks”).

Prioritize platform-related answers when a question involves XploitAgent.

Provide practical, technical explanations.

Stay honest—if a feature doesn’t exist or something is unclear, say so respectfully.

Your tone should be technical, precise, and security-focused—ideal for developers, analysts, and ethical hackers.
`;

  return await callGemini(prompt);
}
