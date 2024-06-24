import { useState, useEffect,useRef } from "react";
import axios from "axios";
import Icon from "../../../../assets/svg/icon.svg";
import { DownloadTableExcel } from "react-export-table-to-excel";

const PendingPayment = () => {
  const [registrationData, setRegistrationData] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:3005/get-formData").then((res) => {
      setRegistrationData(res.data);
    });
  }, []);
  let activeUsers = registrationData.filter(
    (items) => items.step < 8
  );
  let newData = activeUsers?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const totalItems = newData?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  let startIndex, endIndex;
  if (typeof totalItems === "number" && !isNaN(totalItems)) {
    startIndex = (currentPage - 1) * itemsPerPage;
    endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  } else {
    startIndex = 0;
    endIndex = 0;
  }
  const currentItems = newData?.slice(startIndex, endIndex);
  const generatePageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          style={{
            height: "45px",
            width: "45px",
            borderRadius: "8px",
            border: "1px solid #e4e9ee",
            boxSizing: "border-box",
            cursor: "pointer",
            backgroundColor: i === currentPage ? "#f9f9f9" : "#ffffff",
          }}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div class="relative overflow-x-auto">
      <div className="flex justify-end">
      <DownloadTableExcel
          filename="Pending Payment"
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
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems?.map((items, index) => {
            return (
              <tr
                class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                key={index}
              >
                <td class="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
                  {index + 1}
                </td>
                <th
                  scope="row"
                  class="whitespace-nowrap px-6 py-4 text-sm font-bold text-navy-700 dark:text-white"
                >
                  {new Date(
                    new Date(items.createdAt).getTime() + 5.5 * 60 * 60 * 1000
                  ).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
                </th>
                <td class="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
                  {items.firstName}
                </td>
                <td class="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
                  {items.lastName}
                </td>
                <td class="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
                  {items.email}
                </td>
                <td class="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
                  {items.mobileNumber}
                </td>
                <td class="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
                  {items.status}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-10 flex justify-center">
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
        </div>
    </div>
  );
};

export default PendingPayment;
