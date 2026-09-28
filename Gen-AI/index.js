import { configDotenv } from "dotenv";
import { ChatMistralAI } from "@langchain/mistralai";

configDotenv()
const model = new ChatMistralAI({
model: "mistral-small-latest",
temperature: 0
});

await model.invoke("Hello, world!")