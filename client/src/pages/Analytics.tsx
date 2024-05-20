import { useState } from "react";
import Header from "../components/header/header";
import Table from "../components/table/Table";
import { GroupByYearData, SecondTableData } from "@/types/TableProps";
import useFetch from "@/hooks/use-fetch";
import LineChart from "@/components/chart/LineChart";
import ChatApp from "@/components/chat/ChatApp";
const prodUrl = "https://floqer-assignment-1.onrender.com";
// const devUrl = "http://localhost:8000";

const AnalyticsPage = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2020);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { data: fetchedData } = useFetch<SecondTableData>(
    `${prodUrl}/${selectedYear}/${pageNumber}`,
  );

  const { data, loading, error } = useFetch<GroupByYearData>(`${prodUrl}/`);

  function handleNextPageChange() {
    if (pageNumber === fetchedData[0].totalPages) {
      setPageNumber(fetchedData[0].totalPages);
    } else {
      setPageNumber((prev) => prev + 1);
    }
  }

  function handlePrevPageChange() {
    if (pageNumber < 2) {
      setPageNumber(1);
    } else {
      setPageNumber((prev) => prev - 1);
    }
  }

  function handleSelectedYear(year: GroupByYearData) {
    setSelectedYear(year._id);
    setPageNumber(1);
  }

  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <>
      <div className="bg-white text-black h-screen w-screen relative">
        <Header />
        <div className="w-full flex flex-row justify-around">
          <div className="w-1/3">
            <Table
              heading_data={[
                { name: "Year", field: "_id" },
                { name: "Total Jobs", field: "totalJobs" },
                { name: "Average Salary", field: "averageSalary" },
              ]}
              data={data}
              handleSelectedYear={handleSelectedYear}
              selector={true}
              pagination={false}
            />
            {fetchedData[0] && (
              <Table
                heading_data={[
                  { name: "Title", field: "_id" },
                  { name: "Total Jobs", field: "totalJobs" },
                ]}
                data={fetchedData[0].jobTitles}
                selector={false}
                pagination={true}
                handleNextPageChange={handleNextPageChange}
                handlePrevPageChange={handlePrevPageChange}
              />
            )}
          </div>
          <LineChart data={data} />
          <ChatApp />
        </div>
      </div>
    </>
  );
};

export default AnalyticsPage;
