import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Icon from "../../../../assets/svg/icon.svg";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { useForm } from "react-hook-form";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { toast } from "react-toastify";
import { getAuthToken } from "../../../../utils/auth";
const RequestedUser = () => {
  const token = getAuthToken();
  const [registrationData, setRegistrationData] = useState([]);
  const [updateState, setUpdateState] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [status, setStatus] = useState();
  const [userData, setUserData] = useState();
  const tableRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    userData.remarks = data.remarks
    let allData = {...userData, status };
    axios
      .put("http://localhost:3005/put-Registration-remarks", allData)
      .then(() => {
        setUpdateState(!updateState);
      })
      .catch((error) => {
        toast.error("Not Update record");
      });
  };
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
  let activeUsers = registrationData.filter(
    (items) => items.status === "Pending"
  );
  let newData = activeUsers?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const handleChange = (listing, e) => {
    const updatedStatus = e.target.value;
    if (updatedStatus === "Rejected" || updatedStatus === "Terminated") {
      setStatus(updatedStatus);
      setEditItem(listing);
      setUserData(listing);
    } else if (updatedStatus === "Active") {
      const updatedListing = { ...listing, status: updatedStatus };
      axios
        .put("http://localhost:3005/put-Registration", updatedListing)
        .then(() => {
          setUpdateState(!updateState);
        });
    }
  };
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
    <div className="relative overflow-x-auto">
      <div className="flex justify-end">
        <Popup open={!!editItem} modal nested>
          {(close) => (
            <div className="w-full rounded-lg bg-white p-4 shadow-lg">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
                onClick={close}
              >
                &times;
              </button>
              <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                  <label className="mb-2 block text-sm font-extrabold text-gray-900 dark:text-white">
                    Enter Remarks
                    <span className="font-medium">
                      {status === "Rejected"
                        ? `(This Remarks show to the user)`
                        : `(This remarks show only Admin)`}
                    </span>
                  </label>
                  <textarea
                    type="text"
                    {...register("remarks", { required: true })}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                    placeholder="Enter Remarks"
                  />
                  {errors.remarks && (
                    <span className="text-red-600 ">Enter Remarks</span>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white sm:w-auto"
                >
                  Submit
                </button>
              </form>
            </div>
          )}
        </Popup>
      </div>
      {token.permissions.find((p) => p.name === "Requested User")?.permissions
        .fullAccess && (
        <div className="flex justify-end">
          <DownloadTableExcel
            filename="Requested Users"
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
      )}
      <table
        className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400"
        ref={tableRef}
      >
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3 text-xs font-bold tracking-wide text-gray-600">
              No.
            </th>
            <th className="px-6 py-3 text-xs font-bold tracking-wide text-gray-600">
              Date
            </th>
            <th className="px-6 py-3 text-xs font-bold tracking-wide text-gray-600">
              FirstName
            </th>
            <th className="px-6 py-3 text-xs font-bold tracking-wide text-gray-600">
              LastName
            </th>
            <th className="px-6 py-3 text-xs font-bold tracking-wide text-gray-600">
              Email
            </th>
            <th className="px-6 py-3 text-xs font-bold tracking-wide text-gray-600">
              Phone
            </th>
            <th className="px-6 py-3 text-xs font-bold tracking-wide text-gray-600">
              Status
            </th>
            {token.permissions.find((p) => p.name === "Requested User")
              ?.permissions.fullAccess && (
              <th className="px-6 py-3 text-xs font-bold tracking-wide text-gray-600">
                Action
              </th>
            )}
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
              <td className="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">{items.firstName}</td>
              <td className="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">{items.lastName}</td>
              <td className="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">{items.email}</td>
              <td className="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">{items.mobileNumber}</td>
              <td className="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">{items.status}</td>
              {token.permissions.find((p) => p.name === "Requested User")?.permissions.fullAccess && (
                <td className="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
                  <select value={items.status}onChange={(e) => handleChange(items, e)}>
                    <option value="">Select Option</option>
                    <option value="Active">Active</option>
                    <option value="Rejected">Reject</option>
                    <option value="Terminated">Terminate</option>
                  </select>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-10 flex justify-center">
        {currentPage > 1 && (
          <button
            onClick={previousPage}
            className="mb-2 rounded-lg border bg-white px-5 py-2.5 text-sm font-medium me-2 hover:bg-gray-100"
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
export default RequestedUser;
