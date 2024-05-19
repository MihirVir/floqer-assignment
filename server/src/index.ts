import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import "express-async-errors";
import { dashboardRouter } from "./routes";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import cors from "cors";
import { json } from "body-parser";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import Salary from "./models/salary-schema";
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
    console.log(process.env.MONGO_URI as string);
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("connected to mongodb");
  } catch (err) {
    console.error(err);
  }

  app.listen(process.env.PORT || 4000, () =>
    console.log("App is running on port", process.env.PORT || 4000),
  );
};

start();
