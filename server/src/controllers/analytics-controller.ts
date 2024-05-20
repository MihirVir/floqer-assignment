import { Request, Response } from "express";
import Salary from "../models/salary-schema";
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
  } catch (err) {
    console.log("error", err);
    res.status(500).send("Internal server error");
  }
};

export const getAggregatedJobTitles = async (req: Request, res: Response) => {
  const { year, page } = req.params;
  const PAGE_SIZE = 5;
  const skip = (parseInt(page) - 1) * PAGE_SIZE;

  try {
    const jobTitlesCount = await Salary.aggregate([
      { $match: { work_year: parseInt(year) } },
      {
        $group: {
          _id: "$job_title",
          totalJobs: { $sum: 1 },
        },
      },
      {
        $count: "totalJobTitles",
      },
    ]);

    const totalJobTitles = jobTitlesCount[0]?.totalJobTitles || 0;
    const totalPages = Math.ceil(totalJobTitles / PAGE_SIZE);

    const jobTitles = await Salary.aggregate([
      { $match: { work_year: parseInt(year) } },
      {
        $group: {
          _id: "$job_title",
          totalJobs: { $sum: 1 },
        },
      },
      { $sort: { totalJobs: -1 } },
      { $skip: skip },
      { $limit: PAGE_SIZE },
    ]);

    res.send([{ jobTitles, totalPages }]);
  } catch (err) {
    console.log("error", err);
    res.status(500).send("Internal server error");
  }
};
