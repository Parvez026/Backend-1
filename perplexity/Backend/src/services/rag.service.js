import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import { splitTextIntoChunks } from "./chunk.service.js";
import { randomUUID } from "node:crypto";

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME);

const embeddings = new MistralAIEmbeddings({
  model: "mistral-embed",
  apiKey: process.env.MISTRAL_API_KEY,
});

const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
  pineconeIndex,
});

export { vectorStore };


export async function storePdfChunks(text, metadata = {}) {
  const chunks = await splitTextIntoChunks(text);
  const documentId = randomUUID();

  const documents = chunks.map((chunk, index) => ({
    pageContent: chunk,
    metadata: {
      ...metadata,
      documentId,
      chunkIndex: index,
    },
  }));

  await vectorStore.addDocuments(documents);

  console.log("Stored PDF documentId:", documentId);
  console.log(`Stored ${documents.length} chunks in Pinecone`);

  return {
    totalChunks: documents.length,
    documentId,
  };
}





export async function searchPdfChunks(query, userId, documentId) {
  console.log("PDF search query:", query);
  console.log("Searching documentId:", documentId);

  if (!documentId) {
    console.log("No PDF attached to this message.");
    return [];
  }

  const results = await vectorStore.similaritySearch(query, 3, {
    filter: {
      documentId: { $eq: documentId },
      userId: { $eq: String(userId) },
    },
  });

  console.log("Retrieved PDF chunks:", results.length);
  console.log(
    "Retrieved content:",
    results.map((doc) => doc.pageContent)
  );

  return results;
}


