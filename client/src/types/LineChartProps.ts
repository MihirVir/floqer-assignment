import { GroupByYearData } from "./TableProps";

export type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill: boolean;
    borderColor: string;
    tension: number;
    point?: boolean;
  }[];
};

export interface LineChartProps {
  data: GroupByYearData[];
}
