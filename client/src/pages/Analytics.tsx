import Header from "../components/header/header";
import Table from "../components/table/Table";
import { GroupByYearData } from "@/types/TableProps";
import useFetch from "@/hooks/use-fetch";
const AnalyticsPage = () => {
  const { data, loading, error } = useFetch<GroupByYearData>(
    "http://localhost:8000/",
  );

  if (loading) return <h1> Loading </h1>;
  if (error) return <h1> {error} </h1>;

  return (
    <>
      <div className="p-2 text-black h-screen w-screen">
        <Header />
        <Table
          heading_data={["year", "Total Jobs", "Average Salary"]}
          data={data}
        />
      </div>
    </>
  );
};

export default AnalyticsPage;
