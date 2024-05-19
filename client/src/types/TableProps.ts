export type GroupByYearData = {
  _id: number;
  totalJobs: number;
  averageSalary: number;
};

export interface Props {
  heading_data: string[];
  data: GroupByYearData[] | SelectedYearDataType[];
  handleSelectedYear?: (year: GroupByYearData) => void;
  selector: boolean;
}

export type SelectedYearDataType = {
  _id: string;
  totalJobs: number;
};
