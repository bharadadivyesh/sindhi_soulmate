import React, { useEffect } from "react";
import Popup from "reactjs-popup";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
const ViewMembers = () => {
    const [editItem, setEditItem] = useState(null);
    const [couponTitleTOggle, setCouponTitleToggle] = useState(false);
    const [userRolesData, setUserRoleData] = useState([]);
    const [renderComponent, setRenderComponent] = useState(false);
    const {
      register,
      handleSubmit,
      setValue,
      reset,
      formState: { errors },
    } = useForm();
    const onSubmit = async (data) => {
      if (editItem) {
        await axios.put(`http://localhost:3005/update-Member/${data.email}`, data).then((res) => {
            toast.success(res.data.message);
            setRenderComponent(!renderComponent);
          });
      } else {
        await axios.post("http://localhost:3005/create-Member", data).then((res) => {
            toast.success(res.data.message);
            reset();
            setRenderComponent(!renderComponent);
          }).catch(() => {
            toast.error("Enter valid Email");
          });
      }
    };
    const handleEditBtnClick = (item) => {
      setCouponTitleToggle(true);
      setEditItem(item);
      setValue("firstName", item.firstName);
      setValue("lastName", item.lastName);
      setValue("email", item.email);
      setValue("password",item.password);
      setValue("role", item.role);
    };
    const handleDeleteBtnClick = async (item) => {
      await axios.delete(`http://localhost:3005/delete-Member/${item.email}`).then((res) => {
          toast.success(res.data.message);
          setRenderComponent(!renderComponent);
        });
    };
    useEffect(() => {
      axios.get("http://localhost:3005/get-Members").then((res) => {
        setUserRoleData(res.data);
      });
    }, [renderComponent]);
  return (
    <div className="relative overflow-x-auto">
      <div className="flex justify-end">
        <Popup
          open={!!editItem}
          trigger={
            <button
              type="button"
              className="mb-2 flex items-center gap-4 rounded-lg bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 px-5 py-2.5 text-center text-sm font-medium text-white me-2 "
            >
              <GoPlus />
              Create Member
            </button>
          }
          modal
          nested
        >
          {(close) => (
            <div className="w-full rounded-lg bg-white p-4 shadow-lg">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
                onClick={close}
              >
                &times;
              </button>
              <h2 className="text-center text-4xl dark:text-white">
                {couponTitleTOggle === true ? "Update Member" : "Create Member"}
              </h2>
              <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                  <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-white ">
                    Enter FirstName
                  </label>
                  <input
                    type="text"
                    {...register("firstName", { required: true })}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Enter FirstName"
                  />
                  {errors.fname && (
                    <span className="text-red-600 ">Enter FirstName</span>
                  )}
                </div>
                <div className="mb-5">
                  <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-white">
                    Enter LastName
                  </label>
                  <input
                    type="text"
                    {...register("lastName", { required: true })}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Enter LastName"
                  />
                  {errors.lname && (
                    <span className="text-red-600 ">Enter LastName</span>
                  )}
                </div>
                <div className="mb-5">
                  <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-white">
                    Enter Email
                  </label>
                  <input
                    type="text"
                    {...register("email", { required: true })}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Enter Email"
                  />
                  {errors.email && (
                    <span className="text-red-600 ">Enter Email</span>
                  )}
                </div>
                <div className="mb-5">
                  <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-white">
                    Enter Password
                  </label>
                  <input
                    type="password"
                    {...register("password", { required: true })}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Enter Password"
                  />
                  {errors.password && (
                    <span className="text-red-600 ">Enter Password</span>
                  )}
                </div>
                <div className="mb-5">
                  <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-white">
                    Role
                  </label>
                  <select
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                    {...register("role", { required: true })}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Sub-Admin">Sub-Admin</option>
                  </select>
                  {errors.status && (
                    <span className="text-red-600 ">Select Status</span>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
                >
                  Submit
                </button>
              </form>
            </div>
          )}
        </Popup>
      </div>
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="select-none px-6 py-3 text-xs font-bold tracking-wide text-gray-600">
              FirstName
            </th>
            <th className="select-none px-6 py-3 text-xs font-bold tracking-wide text-gray-600">
              LastName
            </th>
            <th className="select-none px-6 py-3 text-xs font-bold tracking-wide text-gray-600">
              Email
            </th>
            <th className="select-none px-6 py-3 text-xs font-bold tracking-wide text-gray-600">
              Role
            </th>
            <th className="select-none px-6 py-3 text-xs font-bold tracking-wide text-gray-600">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {userRolesData.map((items, index) => {
            return (
              <tr
                className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                key={index}
              >
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
                  {items.role}
                </td>
                <td className="flex cursor-pointer gap-4 px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
                  <MdEdit onClick={() => handleEditBtnClick(items)} />
                  <MdDelete onClick={() => handleDeleteBtnClick(items)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}
export default ViewMembers