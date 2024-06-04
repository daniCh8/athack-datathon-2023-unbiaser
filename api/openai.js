import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    try {
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: question },
        ],
        model: "gpt-4o",
        max_tokens: 400,
        n: 1,
        temperature: 0.4,
      });

      res.status(200).json(completion.choices[0]);
    } catch (error) {
      console.error("Error querying the GPT model:", error);
      res.status(500).json({ error: "Error querying the GPT model" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
