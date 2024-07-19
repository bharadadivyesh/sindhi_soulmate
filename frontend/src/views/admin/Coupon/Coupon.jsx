import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { IoIosPause } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { IoPlay } from "react-icons/io5";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { getAuthToken } from "../../../utils/auth";
const Coupon = () => {
  const [couponData, setCouponData] = useState([]);
  const [renderComponent, setRenderComponent] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [couponTitleTOggle, setCouponTitleToggle] = useState(false);
  const { register,handleSubmit,setValue,reset,watch,formState: { errors }} = useForm();
  const startDate = watch("startDate");
  useEffect(() => {
    axios.get("http://localhost:3005/get-coupon").then((res) => {
      setCouponData(res.data);
    });
  }, [renderComponent]);
  const onSubmit = (data) => {
    if (editItem) {
      axios.put(`http://localhost:3005/update-coupon/${editItem.code}`, data).then((res) => {
          toast.success(res.data.message);
          setEditItem(null);
          setRenderComponent(!renderComponent);
          reset();
        }).catch(() => {
          toast.error("Failed to update coupon");
        });
      } else {
        axios.post("http://localhost:3005/create-coupon", data).then((res) => {
          toast.success(res.data.message);
          setRenderComponent(!renderComponent);
          reset();
        }).catch(() => {
          toast.error("Failed to create coupon");
        });
      }
    };
    const discountType = watch("discountType");
  const handleDeleteBtnClick = (item) => {
    axios.delete(`http://localhost:3005/delete-coupon/${item.code}`).then((res) => {
        toast.success(res.data.message);
        setRenderComponent(!renderComponent);
      }).catch(() => {
        toast.error("Failed to delete coupon");
      });
  };
  const handlePlyPusBtnClick = (item) => {
    const newStatus = item.status === "Active" ? "Inactive" : "Active";
    axios.put(`http://localhost:3005/update-coupon/${item.code}`, {status: newStatus}).then((res) => {
        toast.success(res.data.message);
        setRenderComponent(!renderComponent);
      }).catch(() => {
        toast.error("Failed to update coupon status");
      });
  };
  const handleEditBtnClick = (item) => {
    setCouponTitleToggle(true);
    setEditItem(item);
    setValue("code", item.code);
    setValue("subscriptionType", item.subscriptionType);
    setValue("discountType", item.discountType);
    setValue("discountValue", item.discountValue);
    setValue("startDate", item.startDate.split("T")[0]);
    setValue("expireDate", item.expireDate.split("T")[0]);
    setValue("status", item.status);
  };
  let token = getAuthToken()
  return (
    <div className=" top-4 overflow-x-auto">
      {token.permissions.find((p) => p.name === "Coupon")?.permissions
        .fullAccess &&
           <div className="flex justify-end">
        <Popup
          open={!!editItem}
          trigger={
            <button
              type="button"
              className="mb-2 flex items-center gap-4 rounded-lg bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 px-5 py-2.5 text-center text-sm font-medium text-white me-2 my-11"
            >
              <GoPlus />
              Create Coupon
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
                {couponTitleTOggle === true ? "Update Coupon" : "Create Coupon"}
              </h2>
              <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                  <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Enter Coupon Code
                  </label>
                  <input
                    type="text"
                    {...register("code", { required: true })}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                    placeholder="Enter Coupon Code"
                  />
                  {errors.code && (
                    <span className="text-red-600 ">Enter Coupon code</span>
                  )}
                </div>
                <div className="mb-5">
                  <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Select Subscription Type
                  </label>
                  <select
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 "
                    {...register("subscriptionType", { required: true })}
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                    <option value="Both">Both</option>
                  </select>
                  {errors.subscriptionType && (
                    <span className="text-red-600 ">
                      Select Subscription Type
                    </span>
                  )}
                </div>
                <div className="mb-5">
                  <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Select Discount Type
                  </label>
                  <select
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 "
                    {...register("discountType", { required: true })}
                  >
                    <option>Percentage</option>
                    <option>Absolute</option>
                  </select>
                  {errors.discountType && (
                    <span className="text-red-600 ">Select Discount Type</span>
                  )}
                </div>
                <div className="mb-5">
                  <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Discount Value
                  </label>
                  <input
                    type="number"
                    {...register("discountValue", {
                      required: "Discount is required",
                      validate: (value) => {
                        if (discountType == "Percentage") {
                          return (
                            (value >= 0 && value <= 99) ||
                            "Percentage must be between 0  and 99"
                          );
                        }
                        return true;
                      },
                    })}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 "
                    placeholder="Enter Discount Value % or ₹"
                  />
                  {errors.discountValue && (
                    <span className="text-red-600 ">
                      {errors.discountValue.message}
                    </span>
                  )}
                </div>
                <div className="mb-5">
                  <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Start Date
                  </label>
                  <input
                    type="Date"
                    {...register("startDate", { required: true })}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                  />
                  {errors.startDate && (
                    <span className="text-red-600 ">Select Start Date</span>
                  )}
                </div>
                <div className="mb-5">
                  <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Expire Date
                  </label>
                  <input
                    type="Date"
                    {...register("expireDate", {
                      required: true,
                      validate: {
                        notSame: (value) =>
                          value !== startDate ||
                          "Expire Date cannot be the same as Start Date",
                        notBeforeStart: (value) =>
                          !startDate ||
                          value > startDate ||
                          "Expire Date cannot be before Start Date",
                      },
                    })}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                  />
                  {errors.expireDate && (<span className="text-red-600 ">{errors.expireDate.message}</span>)}
                </div>
                <div className="mb-5">
                  <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Status</label>
                  <select
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                    {...register("status", { required: true })}
                  >
                    <option value="Active">Active</option>
                    <option value="Deactive">Deactive</option>
                  </select>
                  {errors.status && ( <span className="text-red-600 ">Select Status</span>)}
                </div>
                <button type="submit" className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white">Submit</button>
              </form>
            </div>
          )}
        </Popup>
      </div> 
        }
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3 text-xs font-bold tracking-wide text-gray-600">No.</th>
            <th className="px-6 py-3 text-xs font-bold tracking-wide text-gray-600">Coupon Code</th>
            <th className="px-6 py-3 text-xs font-bold tracking-wide text-gray-600">Subscription Type</th>
            <th className="px-6 py-3 text-xs font-bold tracking-wide text-gray-600">Discount Type</th>
            <th className="px-6 py-3 text-xs font-bold tracking-wide text-gray-600">Discount Value</th>
            <th className="px-6 py-3 text-xs font-bold tracking-wide text-gray-600">Start Date</th>
            <th className="px-6 py-3 text-xs font-bold tracking-wide text-gray-600">Expire Date</th>
            <th className="px-6 py-3 text-xs font-bold tracking-wide text-gray-600">Status</th>
            {token.permissions.find((p) => p.name === "Coupon")?.permissions.fullAccess && (<th className="px-6 py-3 text-xs font-bold tracking-wide text-gray-600">Action</th>)}
          </tr>
        </thead>
        <tbody>
          {couponData.map((items, index) => {
            return (
              <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"key={index}>
                <th className="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">{index + 1}</th>
                <td className="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">{items.code}</td>
                <td className="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">{items.subscriptionType}</td>
                <td className="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">{items.discountType}</td>
                <td className="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">{items.discountType === "Absolute"? `₹ ${items.discountValue}`: `${items.discountValue} %`}</td>
                <td className="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">{items.startDate.split("T")[0].split("-").reverse().join("/")}</td>
                <td className="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">{items.expireDate.split("T")[0].split("-").reverse().join("/")}</td>
                <td className="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">{items.status}</td>
                {token.permissions.find((p) => p.name === "Coupon")?.permissions
                  .fullAccess && (
                  <td className="flex gap-2 px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
                    <MdModeEdit
                      onClick={() => handleEditBtnClick(items)}
                      className="cursor-pointer"
                    />
                    <MdDelete
                      onClick={() => handleDeleteBtnClick(items)}
                      className="cursor-pointer"
                    />
                    {items.status === "Active" ? (
                      <IoIosPause onClick={() => handlePlyPusBtnClick(items)} />
                    ) : (
                      <IoPlay
                        onClick={() => handlePlyPusBtnClick(items)}
                        className="cursor-pointer"
                      />
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};
export default Coupon;