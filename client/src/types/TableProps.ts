export type SelectedYearDataType = {
  _id: string;
  totalJobs: number;
};

export interface SecondTableData {
  jobTitles: SelectedYearDataType[];
  totalPages: number;
}

export type GroupByYearData = {
  _id: number;
  totalJobs: number;
  averageSalary: number;
};

interface HeadingDataType {
  name: string;
  field: string;
}

export interface Props {
  heading_data: HeadingDataType[];
  data: GroupByYearData[] | SelectedYearDataType[];
  handleSelectedYear?: (year: GroupByYearData) => void;
  selector: boolean;
  pagination: boolean;
  handleNextPageChange?: () => void;
  handlePrevPageChange?: () => void;
}
