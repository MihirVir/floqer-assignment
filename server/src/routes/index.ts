import express, { Request, Response } from "express";
import {
  aggregateByYear,
  getAggregatedJobTitles,
} from "../controllers/analytics-controller";

const router = express.Router();

router.get("/", aggregateByYear);
router.get("/:year", getAggregatedJobTitles);

export { router as dashboardRouter };
