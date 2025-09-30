import OpenAI from "openai";

const MAX_RETRIES = 3;
const TIMEOUT = 120000;
const RETRY_DELAY = 1000;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function makeAIRequest(prompt) {
  let attempts = 0;

  while (attempts < MAX_RETRIES) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

      /* Using OpenAI's official Node.js SDK
      const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are generating content for a SaaS web page that provides an online co-working space." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        top_p: 0.9,
      });

      clearTimeout(timeoutId);

      console.log(response.choices[0].message.content);

      return response.choices[0].message.content;
      */

      //Example of using a local LLM server
       const response = await fetch('http://localhost:11434/api/generate', {
                method: 'POST',
                signal: controller.signal,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: "llama3:8b",
                    prompt: prompt,
                    stream: false,
                    oprions: {
                        temperature: 0.7,
                        top_p: 0.9,
                        repeat_penalty: 1.1,
                    }
                })
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`AI request failed: ${response.statusText}`);
            }

            const data = await response.json();
            console.log(data);
            return data.response;
        

    } catch (error) {
      attempts++;
      console.error(`Attempt ${attempts} failed: ${error.message}`);

      if (attempts === MAX_RETRIES) {
        throw new Error(
          `Failed after ${MAX_RETRIES} attempts: ${error.message}`
        );
      }

      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
    }
  }
}