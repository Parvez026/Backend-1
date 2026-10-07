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

export async function* generateResponse(messages) {
  const stream = await agent.stream(
    {
      messages: messages.map((msg) => {
        if (msg.role === "user") {
          return new HumanMessage(msg.content);
        } else if (msg.role === "ai") {
          return new AIMessage(msg.content);
        }
      }),
    },
    {
      streamMode: "messages",
    },
  );

  for await (const [message] of stream) {
    if (message.getType() === "ai" && message.content) {
      yield message.content;
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
