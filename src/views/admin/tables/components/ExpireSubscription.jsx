import React from "react";
import Icon from "../../../../assets/svg/icon.svg";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { useRef } from "react";
import { useState } from "react";
const ExpireSubscription = () => {
  const tableRef = useRef(null);
// pagination
// const [currentPage, setCurrentPage] = useState(1);
// const itemsPerPage = 1;
// const totalItems = newData?.length;
// const totalPages = Math.ceil(totalItems / itemsPerPage);
// let startIndex, endIndex;
// if (typeof totalItems === "number" && !isNaN(totalItems)) {
//   startIndex = (currentPage - 1) * itemsPerPage;
//   endIndex = Math.min(startIndex + itemsPerPage, totalItems);
// } else {
//   startIndex = 0;
//   endIndex = 0;
// }
// const currentItems = newData?.slice(startIndex, endIndex);
// const generatePageButtons = () => {
//   const buttons = [];
//   for (let i = 1; i <= totalPages; i++) {
//     buttons.push(
//       <button
//         key={i}
//         onClick={() => setCurrentPage(i)}
//         style={{
//           height: "45px",
//           width: "45px",
//           borderRadius: "8px",
//           border: "1px solid #e4e9ee",
//           boxSizing: "border-box",
//           cursor: "pointer",
//           backgroundColor: i === currentPage ? "#f9f9f9" : "#ffffff",
//         }}
//       >
//         {i}
//       </button>
//     );
//   }
//   return buttons;
// };
// const previousPage = () => {
//   if (currentPage > 1) {
//     setCurrentPage(currentPage - 1);
//   }
// };
// const nextPage = () => {
//   if (currentPage < totalPages) {
//     setCurrentPage(currentPage + 1);
//   }
// };
  return (
    <div class="relative overflow-x-auto">
      <div className="flex justify-end">
      <DownloadTableExcel
          filename="Subscription Expired User"
          sheet="users"
          currentTableRef={tableRef.current}
        >
          <button
            type="button"
            className="mb-2 flex items-center rounded-lg bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 px-5 py-2.5 text-center text-sm font-medium text-white me-2 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800"
          >
            <img src={Icon} alt="" className="mr-2 h-4 w-4" />
            Export
          </button>
        </DownloadTableExcel>
      </div>
      <table class="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400" ref={tableRef}>
        <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-xs font-bold tracking-wide text-gray-600"
            >
              No.
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-xs font-bold tracking-wide text-gray-600"
            >
              Date
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-xs font-bold tracking-wide text-gray-600"
            >
              FirstName
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-xs font-bold tracking-wide text-gray-600"
            >
              LastName
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-xs font-bold tracking-wide text-gray-600"
            >
              Email
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-xs font-bold tracking-wide text-gray-600"
            >
              Phone
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-xs font-bold tracking-wide text-gray-600"
            >
              Expire Date
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
            <td class="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
              1
            </td>
            <th
              scope="row"
              class="whitespace-nowrap px-6 py-4 text-sm font-bold text-navy-700 dark:text-white"
            >
             12-02-2004
            </th>
            <td class="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
              Divyesh
            </td>
            <td class="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
              Bharada
            </td>
            <td class="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
              Divyesh@gmail.com
            </td>
            <td class="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
              9632587410
            </td>
            <td class="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
              12-10-2024
            </td>
          </tr>
        </tbody>
      </table>
      {/* <div className="mt-10 flex justify-center">
          {currentPage > 1 && (
            <button
              onClick={previousPage}
              className="mb-2 rounded-lg border bg-white px-5 py-2.5 text-sm
          font-medium me-2 hover:bg-gray-100 "
            >
              Previous
            </button>
          )}
          {generatePageButtons()}
          {currentPage < totalPages && (
            <button
              onClick={nextPage}
              className="mb-2 rounded-lg border bg-white px-5 py-2.5 text-sm font-medium me-2 hover:bg-gray-100 "
            >
              Next
            </button>
          )}
        </div> */}
    </div>
  );
};

export default ExpireSubscription;
