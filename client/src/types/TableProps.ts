export type GroupByYearData = {
  _id: number;
  totalJobs: number;
  averageSalary: number;
};

export interface Props {
  heading_data: string[];
  data: GroupByYearData[];
}
