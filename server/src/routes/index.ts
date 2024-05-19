import express, { Request, Response } from "express";
import { aggregateByYear } from "../controllers/analytics-controller";

const router = express.Router();

router.get("/", aggregateByYear);

export { router as dashboardRouter };
