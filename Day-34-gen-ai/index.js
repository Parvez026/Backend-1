import "dotenv/config";
import readline from "readline/promises";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "langchain";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const model = new ChatGoogleGenerativeAI({
  model: "gemini-3.8-flash",
  temperature: 0.7,
});

const message = [];

while (true) {
 const userInput = await rl.question("\x1b[32mYou:\x1b[0m ")

  message.push(new HumanMessage(userInput));

  const response = await model.invoke(message);

  message.push(response);

  console.log("AI:" + response.content);
}

rl.close();
