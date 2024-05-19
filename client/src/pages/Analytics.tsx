import Header from "../components/header/header";
import Table from "../components/table/Table";
const AnalyticsPage = () => {
  return (
    <>
      <div className="bg-black text-white h-screen w-screen">
        <Header />
        <Table
          heading_data={["year", "Total Jobs", "Average Salary"]}
          data={[
            { _id: 2020, totalJobs: 20, averageSalary: 4 },
            { _id: 2021, totalJobs: 22, averageSalary: 4120 },
          ]}
        />
      </div>
    </>
  );
};

export default AnalyticsPage;
