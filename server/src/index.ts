import express from "express";
import "express-async-errors";
import { dashboardRouter } from "./routes";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";

const app = express();

app.use(dashboardRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
