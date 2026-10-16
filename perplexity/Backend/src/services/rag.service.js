
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import { splitTextIntoChunks } from "./chunk.service.js";

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const pineconeIndex = pinecone.Index(
  process.env.PINECONE_INDEX_NAME,
);

const embeddings = new MistralAIEmbeddings({
  model: "mistral-embed",
  apiKey: process.env.MISTRAL_API_KEY,
});

const vectorStore =await PineconeStore.fromExistingIndex(embeddings, {
  pineconeIndex,
});


export { vectorStore };


export async function storePdfChunks(text, metadata = {}) {
  const chunks = await splitTextIntoChunks(text);

  const documents = chunks.map((chunk, index) => ({
    pageContent: chunk,
    metadata: {
      ...metadata,
      chunkIndex: index,
    },
  }));

  await vectorStore.addDocuments(documents);
  console.log(`Stored ${documents.length} chunks in Pinecone`);

  return {
    totalChunks: documents.length,
  };
}