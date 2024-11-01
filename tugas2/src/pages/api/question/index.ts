import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

// Konfigurasi OpenAI API dengan API key dari environment
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "User message is required" });
  }

  try {
    // Menggunakan OpenAIApi untuk membuat permintaan ke API ChatGPT
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      max_tokens: 1000,
      messages: [{ role: "user", content: question }],
    });

    const answer = completion.data.choices[0].message?.content;
    return res.status(200).json({ answer });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Failed to fetch response from OpenAI API",
      details: error,
    });
  }
}
