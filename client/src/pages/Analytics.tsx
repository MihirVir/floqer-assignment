import { useState } from "react";
import Header from "../components/header/header";
import Table from "../components/table/Table";
import { GroupByYearData, SelectedYearDataType } from "@/types/TableProps";
import useFetch from "@/hooks/use-fetch";

const AnalyticsPage = () => {
  const [selectedYear, setSelectedYear] = useState<number>(0);
  const { data: fetchedData } = useFetch<SelectedYearDataType>(
    `http://localhost:8000/${selectedYear}`,
  );
  const { data, loading, error } = useFetch<GroupByYearData>(
    "http://localhost:8000/",
  );

  function handleSelectedYear(year: GroupByYearData) {
    console.log(year);
    setSelectedYear(year._id);
  }

  if (loading) return <h1> Loading </h1>;
  if (error) return <h1> {error} </h1>;

  return (
    <>
      <div className="p-2 text-black h-screen w-screen">
        <Header />
        <Table
          heading_data={["year", "Total Jobs", "Average Salary"]}
          data={data}
          handleSelectedYear={handleSelectedYear}
          selector={true}
        />
        {selectedYear >= 2020 && selectedYear <= 2024 && (
          <>
            <Table
              heading_data={["year", "totalJobs"]}
              data={fetchedData}
              selector={false}
            />
          </>
        )}
      </div>
    </>
  );
};

export default AnalyticsPage;
