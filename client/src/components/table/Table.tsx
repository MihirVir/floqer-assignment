import React from "react";
import { GroupByYearData, Props } from "../../types/TableProps";

const Table: React.FC<Props> = ({ heading_data, data }) => {
  return (
    <div className="relative mt-5 pl-5">
      <table className="w-max text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-slate-900 dark:text-gray-400">
          <tr>
            {heading_data.map((heading: string, idx: number) => (
              <th key={idx} scope="col" className="px-6 py-3">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item: GroupByYearData, idx: number) => (
            <tr
              key={idx}
              className="cursor-pointer bg-gray-800 border-b-gray-900 border-b-2"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item._id}
              </th>
              <td className="px-6 py-4">{item.totalJobs}</td>
              <td className="px-6 py-4">${item.averageSalary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
