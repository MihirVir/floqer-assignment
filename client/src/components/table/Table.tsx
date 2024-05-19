import React from "react";
import { Props, GroupByYearData } from "@/types/TableProps";

const Table: React.FC<Props> = ({
  heading_data,
  data,
  handleSelectedYear,
  selector,
  pagination,
  handleNextPageChange,
  handlePrevPageChange,
}) => {
  return (
    <div className="my-6 w-full pl-4 overflow-y-auto">
      <table className="w-full">
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
          {data.map((item) => (
            <tr
              key={item._id}
              className="m-0 border-t p-0 hover:bg-slate-100 cursor-pointer"
            >
              {Object.values(item).map((i, index) => (
                <td
                  key={index}
                  onClick={
                    selector
                      ? () => handleSelectedYear?.(item as GroupByYearData)
                      : undefined
                  }
                  className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
                >
                  {typeof i === "number" ? i.toFixed(0) : String(i)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {pagination && (
        <div className="mt-4 flex justify-center gap-2">
          <button
            onClick={handlePrevPageChange}
            className="mr-2 py-2 w-24  bg-slate-50 text-gray-600 border-2 border-black rounded-lg transition-all duration-150 disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-black hover:text-white"
          >
            Previous
          </button>
          <button
            onClick={handleNextPageChange}
            className="w-24  py-2 bg-slate-50 text-gray-600 border-2 border-black  rounded-lg transition-all duration-150 disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-black hover:text-white"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
