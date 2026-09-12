import { GoogleGenAI } from '@google/genai';

let ai;
function getClient() {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return ai;
}

export async function explainChange(oldNotice, newNotice) {
  const prompt = `A college notice was updated. Explain in 2-3 short sentences what changed and what the student needs to do. Be direct and clear, like a helpful assistant, not formal.

Original notice: ${oldNotice.description}
Updated notice: ${newNotice.description}
Action required: ${newNotice.action_text || 'None'}`;

  const response = await getClient().models.generateContent({
    model: 'gemini-3.6-flash',
    contents: prompt,
  });

  return response.text;
}

export async function askAboutNotices(question, notices) {
  const noticesText = notices
    .map((n) => `- [${n.priority}] ${n.title}: ${n.description}${n.action_text ? ` (Action: ${n.action_text})` : ''}`)
    .join('\n');

  const prompt = `You are CampusPulse, a college assistant. Answer the student's question using ONLY the notices below. If the answer isn't in the notices, say so clearly. Be concise.

Notices:
${noticesText}

Student's question: ${question}`;

  const response = await getClient().models.generateContent({
    model: 'gemini-3.6-flash',
    contents: prompt,
  });

  return response.text;
}