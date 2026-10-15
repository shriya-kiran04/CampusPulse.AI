import { GoogleGenAI } from '@google/genai';

let ai;
function getClient() {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return ai;
}

// Tried in order. If a name here gives a "model not found" error, just delete it.
const MODELS = ['gemini-3.6-flash', 'gemini-flash-latest'];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function generate(prompt) {
  let lastError;
  for (const model of MODELS) {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const response = await getClient().models.generateContent({
          model,
          contents: prompt,
        });
        return response.text;
      } catch (err) {
        lastError = err;
        const busy = err.status === 503 || err.status === 429;
        if (!busy) break; // a different error: move on to the next model
        await sleep(1500 * (attempt + 1)); // wait 1.5s, then 3s, then 4.5s
      }
    }
  }
  throw lastError;
}

export async function explainChange(oldNotice, newNotice) {
  const prompt = `A college notice was updated. Explain in 2-3 short sentences what changed and what the student needs to do. Be direct and clear, like a helpful assistant, not formal.

Original notice: ${oldNotice.description}
Updated notice: ${newNotice.description}
Action required: ${newNotice.action_text || 'None'}`;

  return generate(prompt);
}

export async function askAboutNotices(question, notices) {
  const noticesText = notices
    .map((n) => `- [${n.priority}] ${n.title}: ${n.description}${n.action_text ? ` (Action: ${n.action_text})` : ''}`)
    .join('\n');

  const prompt = `You are CampusPulse, a college assistant. Answer the student's question using ONLY the notices below. If the answer isn't in the notices, say so clearly. Be concise.

Notices:
${noticesText}

Student's question: ${question}`;

  return generate(prompt);
}