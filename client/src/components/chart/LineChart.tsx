import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import { LineChartProps, ChartData } from "@/types/LineChartProps";

ChartJS.register(LineElement, LinearScale, CategoryScale, Tooltip, Legend);
ChartJS.register(PointElement);

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setChartData({
        labels: data.map((item) => item._id.toString()),
        datasets: [
          {
            label: "Total Jobs",
            data: data.map((i) => i.totalJobs),
            fill: true,
            borderColor: "#000",
            tension: 0.1,
            point: true,
          },
        ],
      });
    }
  }, [data]);

  return (
    <div className="mt-5 w-1/2">
      <h2>Total Jobs Over Years</h2>
      <Line data={chartData} />
    </div>
  );
};

export default LineChart;
