import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import { OpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import path from "path";

async function retrieve(query: string, db: FaissStore) {
  try {
    const similar_data = await db.similaritySearch(query, 3);
    const content = similar_data.map((d) => d.pageContent);

    return content;
  } catch (err) {
    console.error("Error in retrieve function:", err);
    throw err;
  }
}

const openai = new OpenAI({
  model: "gpt-3.5-turbo",
  callbacks: [
    {
      handleLLMEnd(output) {
        console.log(JSON.stringify(output, null, 2));
      },
    },
  ],
});

export async function generateResponse(message: string, db: FaissStore) {
  try {
    const bestPrac = await retrieve(message, db);

    const inputWithBestPrac = `${message}\n${bestPrac.join("\n")}`;

    const response = await openai.invoke(inputWithBestPrac);
    return response;
  } catch (err) {
    console.log(err);
  }
}
