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
import Salary from "./models/salaries-schema";
import fs from "fs";
import path from "path";
import csvParser from "csv-parser";

const app = express();

app.use(json());
app.use(cors());

app.use(dashboardRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

async function readAndDump() {
  try {
    fs.createReadStream(path.join(__dirname, "data", "salaries.csv"))
      .pipe(csvParser())
      .on("data", async (data) => {
        try {
          await Salary.create({
            work_year: parseInt(data.work_year),
            experience_level: data.experience_level,
            employment_type: data.employment_type,
            job_title: data.job_title,
            salary: parseInt(data.salary),
            salary_currency: data.salary_currency,
            salary_in_usd: parseInt(data.salary_in_usd),
            employee_residence: data.employee_residence,
            remote_ratio: parseInt(data.remote_ratio),
            company_location: data.company_location,
            company_size: data.company_size,
          });
        } catch (err) {
          console.error("Error inserting document:", err);
        }
      })
      .on("end", () => {
        console.log("CSV data successfully dumped into MongoDB");
      });
  } catch (err) {
    console.error("Error dumping CSV data into MongoDB:", err);
  }
}

const start = async () => {
  try {
    console.log(process.env.MONGO_URI as string);
    await mongoose.connect(process.env.MONGO_URI as string);
    // call the below function to dump all the data to mongo
    // I will try to provide my mongodb url
    // await readAndDump()
    console.log("connected to mongodb");
  } catch (err) {
    console.error(err);
  }

  app.listen(8000, () => console.log("App is running on port 8000!"));
};

start();
