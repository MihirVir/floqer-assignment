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
  pagination: boolean;
  handleNextPageChange?: () => void;
  handlePrevPageChange?: () => void;
}

export type SelectedYearDataType = {
  _id: string;
  totalJobs: number;
};
