import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function parseOrderPrompt(promptText) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo", // or "gpt-4o" or "gpt-4-turbo"
    messages: [
      { role: "system", content: "You are a helpful assistant that converts roofing order instructions into structured JSON." },
      { role: "user", content: promptText }
    ],
    temperature: 0.2,
  });

  return response.choices[0].message.content;
}
