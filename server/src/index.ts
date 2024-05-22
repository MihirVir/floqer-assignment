import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import { OpenAIEmbeddings } from "@langchain/openai";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import "express-async-errors";
import { dashboardRouter } from "./routes";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import cors from "cors";
import { generateResponse } from "./controllers/chat-controller";
import { json } from "body-parser";
import mongoose from "mongoose";
import path from "path";
import { Server as WebSocketServer } from "ws";
const app = express();

app.use(json());
app.use(cors());

app.use(dashboardRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected to MongoDB");

    const loader = new CSVLoader(path.join(__dirname, "data", "salaries.csv"));
    const docs = await loader.load();

    const embeddings = new OpenAIEmbeddings({
      batchSize: 512,
      model: "text-embedding-3-large",
    });
    const db = await FaissStore.fromDocuments(docs, embeddings);

    console.log("FaissStore initialized");

    const server = app.listen(process.env.PORT || 4000, () => {
      console.log("server is up and running");
    });

    const wss = new WebSocketServer({ server });

    wss.on("connection", (ws) => {
      console.log("Connection established");

      ws.on("message", async (msg) => {
        try {
          const response = await generateResponse(msg.toString(), db);

          ws.send(JSON.stringify({ response, user: "server" }));
        } catch (err) {
          console.log(err);
          ws.send("Error generating response");
        }
      });

      ws.on("close", () => {
        console.log("Connection Closed");
      });

      ws.on("error", (err) => {
        console.error("Something went wrong", err);
      });
    });
  } catch (err) {
    console.error("Error in start function:", err);
  }
};

start();
