import React from "react";
import { GroupByYearData, Props } from "../../types/TableProps";

const Table: React.FC<Props> = ({ heading_data, data }) => {
  return (
    <div className="my-6 overflow-y-auto">
      <table className="w-68">
        <thead>
          <tr className="m-0 border-t p-0 even:bg-muted">
            {heading_data.map((heading) => (
              <th
                key={heading}
                className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item: GroupByYearData) => (
            <tr
              key={item._id}
              className="m-0 border-t p-0 hover:bg-slate-100 cursor-pointer"
            >
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {item._id}
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {item.totalJobs}
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {item.averageSalary.toFixed(0)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
