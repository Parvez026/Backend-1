import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import {
  HumanMessage,
  SystemMessage,
  AIMessage,
  tool,
  createAgent,
} from "langchain";
import * as z from "zod";
import { searchInternet } from "./internet.service.js";
import { searchPdfChunks } from "./rag.service.js";

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
});

const mistralModel = new ChatMistralAI({
  model: "mistral-tiny",
  apiKey: process.env.MISTRAL_API_KEY,
});

const searchInternetTool = tool(searchInternet, {
  name: "searchInternet",
  description: "Use this tool to get the latest information from the internet",
  schema: z.object({
    query: z
      .string()
      .describe("The search query to find information on the internet"),
  }),
});

const agent = createAgent({
  model: geminiModel,
  tools: [searchInternetTool],
});

export async function* generateResponse(messages, userId, documentId) {
  const lastUserMessage = [...messages]
    .reverse()
    .find((msg) => msg.role === "user");

  let pdfContext = "";

  if (lastUserMessage) {
    try {
      const chunks = await searchPdfChunks(
        lastUserMessage.content,
        userId,
        documentId,
      );

      pdfContext = chunks.map((chunk) => chunk.pageContent).join("\n\n");

      console.log("PDF context found:", pdfContext.length > 0);
      console.log("PDF context length:", pdfContext.length);
    } catch (error) {
      console.error("PDF search error:", error);
    }
  }

  const inputMessages = messages
    .map((msg) => {
      if (msg.role === "user") return new HumanMessage(msg.content);
      if (msg.role === "ai") return new AIMessage(msg.content);
      return null;
    })
    .filter(Boolean);

  const instructions = pdfContext
    ? `You are ZentraAI. Answer the user's question using the uploaded PDF context whenever the question relates to it.
Do not invent information. If the answer is not in the context, clearly say it was not found in the PDF.
For unrelated general questions, answer normally.

PDF CONTEXT:
${pdfContext}`
    : `You are ZentraAI, a helpful assistant. Answer general questions normally. If the user asks about a PDF but no PDF context is available, explain that you could not retrieve its content.`;

  inputMessages.unshift(new SystemMessage(instructions));

  const stream = await agent.stream(
    { messages: inputMessages },
    { streamMode: "messages" },
  );

  for await (const [message] of stream) {
    if (message.getType() === "ai" && message.content) {
      if (typeof message.content === "string") {
        yield message.content;
      } else if (Array.isArray(message.content)) {
        for (const part of message.content) {
          if (part.type === "text" && part.text) {
            yield part.text;
          }
        }
      }
    }
  }
}

export async function generateChatTitle(message) {
  const response = await mistralModel.invoke([
    new SystemMessage(
      `you  a helpful assistant that generates a title for a chat based on the conversation. Please provide a concise and relevant title for the following conversation:`,
    ),

    new HumanMessage(
      `Generate a short and relevant title for this conversation.

   User message: "${message}"

Rules:
- Only ONE line
- Maximum 5 words
- 2 to 5 words preferred
- Clearly describe the user's topic
- No quotes
- No punctuation
- Don't use generic titles like "New Chat" or "Conversation"
- Return only the title
`,
    ),
  ]);

  return response.text;
}
