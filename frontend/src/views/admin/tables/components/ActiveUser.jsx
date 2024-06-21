import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Icon from "../../../../assets/svg/icon.svg";
import { DownloadTableExcel } from "react-export-table-to-excel";
const ActiveUser = () => {
  const [registrationData, setRegistrationData] = useState([]);
  const [updateState, setUpdateState] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const tableRef = useRef(null);
  useEffect(() => {
    axios.get("http://localhost:3005/get-formData").then((res) => {
      setRegistrationData(res.data);
    });
  }, []);
  useEffect(() => {
    axios.get("http://localhost:3005/get-formData").then((res) => {
      setRegistrationData(res.data);
    });
  }, [updateState]);
  const activeUsers = registrationData.filter(
    (items) => items.status === "Active"
  );
  const handleSort = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    setRegistrationData((prevData) => {
      return [...prevData].sort((a, b) => {
        const dateA = new Date(a.expirationDate);
        const dateB = new Date(b.expirationDate);
        return newSortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
    });
  };
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const totalItems = activeUsers?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  let startIndex, endIndex;
  if (typeof totalItems === "number" && !isNaN(totalItems)) {
    startIndex = (currentPage - 1) * itemsPerPage;
    endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  } else {
    startIndex = 0;
    endIndex = 0;
  }
  const currentItems = activeUsers?.slice(startIndex, endIndex);
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
  const handleChange = (listing, e) => {
    const updatedStatus = e.target.value;
    if (updatedStatus !== "") {
      const updatedListing = { ...listing, status: updatedStatus };
      axios
        .put("http://localhost:3005/put-Registration", updatedListing)
        .then(() => {
          setUpdateState(!updateState);
        });
    }
  };
  return (
    <div className="relative overflow-x-auto">
      <div className="flex justify-end">
        <DownloadTableExcel
          filename="Active User"
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
      <table
        className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400"
        ref={tableRef}
      >
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-bold tracking-wide text-gray-600 select-none"
            >
              No.
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-bold tracking-wide text-gray-600 select-none"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-bold tracking-wide text-gray-600 select-none"
            >
              FirstName
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-bold tracking-wide text-gray-600 select-none"
            >
              LastName
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-bold tracking-wide text-gray-600 select-none"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-bold tracking-wide text-gray-600 select-none"
            >
              Phone
            </th>
            <th
              scope="col"
              className="cursor-pointer px-6 py-3 text-xs font-bold tracking-wide text-gray-600 select-none"
              onClick={handleSort}
            >
              Subscription Ex.
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-bold tracking-wide text-gray-600 select-none"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-bold tracking-wide text-gray-600 select-none"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems?.map((items, index) => (
            <tr
              className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
              key={index}
            >
              <td className="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
                {index + 1}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
                {new Date(
                  new Date(items.createdAt).getTime() + 5.5 * 60 * 60 * 1000
                ).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
              </td>
              <td className="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
                {items.firstName}
              </td>
              <td className="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
                {items.lastName}
              </td>
              <td className="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
                {items.email}
              </td>
              <td className="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
                {items.mobileNumber}
              </td>
              <td className="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
                {items.expirationDate
                  .split("T")[0]
                  .split("-")
                  .reverse()
                  .join("/")}
              </td>
              <td className="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
                {items.status}
              </td>
              <td className="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
                <select onChange={(e) => handleChange(items, e)}>
                  <option value="">Select Option</option>
                  <option value="Deactivated">Deactivate</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <div className="mt-10 flex justify-center">
          {currentPage > 1 && (
            <button
              onClick={previousPage}
              className="mb-2 rounded-lg border bg-white px-5 py-2.5 text-sm font-medium me-2 hover:bg-gray-100 "
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
    </div>
  );
};
export default ActiveUser;