import { useState } from "react";
import Header from "../components/header/header";
import Table from "../components/table/Table";
import { GroupByYearData, SelectedYearDataType } from "@/types/TableProps";
import useFetch from "@/hooks/use-fetch";
import LineChart from "@/components/chart/LineChart";

const AnalyticsPage = () => {
  const [selectedYear, setSelectedYear] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { data: fetchedData } = useFetch<SelectedYearDataType>(
    `http://localhost:8000/${selectedYear}/${pageNumber}`,
  );
  const { data, loading, error } = useFetch<GroupByYearData>(
    "http://localhost:8000/",
  );

  function handleNextPageChange() {
    setPageNumber((prev) => prev + 1);
  }

  function handlePrevPageChange() {
    setPageNumber((prev) => prev - 1);
  }

  function handleSelectedYear(year: GroupByYearData) {
    console.log(year);
    setSelectedYear(year._id);
  }

  if (loading) return <h1> Loading </h1>;
  if (error) return <h1> {error} </h1>;

  return (
    <>
      <div className="text-black h-screen w-screen">
        <Header />
        <div className="w-full flex flex-row justify-around">
          <div className="w-1/3">
            <Table
              heading_data={["year", "Total Jobs", "Average Salary"]}
              data={data}
              handleSelectedYear={handleSelectedYear}
              selector={true}
              pagination={false}
            />
            {selectedYear >= 2020 && selectedYear <= 2024 && (
              <>
                <Table
                  heading_data={["Title", "Total Jobs"]}
                  data={fetchedData}
                  selector={false}
                  pagination={true}
                  handleNextPageChange={handleNextPageChange}
                  handlePrevPageChange={handlePrevPageChange}
                />
              </>
            )}
          </div>
          <LineChart data={data} />
        </div>
      </div>
    </>
  );
};

export default AnalyticsPage;
