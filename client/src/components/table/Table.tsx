import React, { useState, useEffect } from "react";
import {
  Props,
  GroupByYearData,
  SelectedYearDataType,
} from "@/types/TableProps";

const Table: React.FC<Props> = ({
  heading_data,
  data,
  handleSelectedYear,
  selector,
  pagination,
  handleNextPageChange,
  handlePrevPageChange,
}) => {
  const [sortState, setSortState] = useState<{
    [key: string]: "asc" | "desc" | null;
  }>({});
  const [sortedData, setSortedData] = useState<
    (GroupByYearData | SelectedYearDataType)[]
  >([]);

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  const handleSortByHeading = (heading: string) => {
    const currentSortState = sortState[heading];
    const isAscending = currentSortState !== "asc";

    const sorted = [...sortedData].sort((a, b) => {
      if (a[heading] < b[heading]) return isAscending ? -1 : 1;
      if (a[heading] > b[heading]) return isAscending ? 1 : -1;
      return 0;
    });

    setSortState({
      ...sortState,
      [heading]: isAscending ? "asc" : "desc",
    });

    setSortedData(sorted);
  };

  return (
    <div className="my-6 w-full pl-4 overflow-y-auto">
      <table className="w-full">
        <thead>
          <tr className="m-0 rounder-lg p-0 even:bg-muted">
            {heading_data.map((heading) => (
              <th
                key={heading.name}
                className="border  px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
                onClick={() => handleSortByHeading(heading.field)}
                style={{ cursor: "pointer" }}
              >
                {heading.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr
              key={item._id}
              className="m-0 border-t p-0 hover:bg-slate-900 hover:text-white cursor-pointer"
            >
              {Object.values(item).map((i, index) => (
                <td
                  key={index}
                  onClick={
                    selector && "averageSalary" in item
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
