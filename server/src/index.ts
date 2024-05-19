import express from "express";
import "express-async-errors";

const app = express();

app.listen(8000, () => {
  console.log("hello");
});
