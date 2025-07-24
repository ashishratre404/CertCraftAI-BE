import { openai } from "./openai.js";

export async function modifyCertificateHTML({ html, instruction }) {
  const messages = [
    {
      role: "system",
      content:
        "You are an expert in HTML and CSS layout. Your job is to modify the given certificate HTML according to the user's instruction. Do not include markdown code blocks. Just return valid HTML.",
    },
    {
      role: "user",
      content: `Here is the original HTML:\n\n${html}`,
    },
    {
      role: "user",
      content: `Instruction:\n\n${instruction}`,
    },
  ];

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages,
    temperature: 0.4,
  });

  const updatedHTML = completion.choices[0].message.content.trim();
  return updatedHTML;
}
