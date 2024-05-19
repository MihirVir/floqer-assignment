import { Request, Response } from "express";
import Salary from "../models/salaries-schema";
import { NotFoundError } from "../errors/not-found-error";

type AggregateData = {
  _id: number;
  totalJobs: number;
  averageSalary: number;
};

export const aggregateByYear = async (req: Request, res: Response) => {
  try {
    const aggregatedData: AggregateData[] = await Salary.aggregate([
      {
        $group: {
          _id: "$work_year",
          totalJobs: { $sum: 1 },
          averageSalary: { $avg: "$salary_in_usd" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.send(aggregatedData);
  } catch (err) {}
};

export const getAggregatedJobTitles = async (req: Request, res: Response) => {
  const { year } = req.params;
  try {
    const jobTitles = await Salary.aggregate([
      { $match: { work_year: parseInt(year) } },
      {
        $group: {
          _id: "$job_title",
          totalJobs: { $sum: 1 },
        },
      },
      { $sort: { totalJobs: -1 } },
    ]);

    if (!jobTitles) {
      throw new NotFoundError();
    }

    res.send(jobTitles);
  } catch (err) {
    console.log("error", err);
  }
};
