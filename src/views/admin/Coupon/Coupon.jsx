import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { IoIosPause } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { IoPlay } from "react-icons/io5";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
const Coupon = () => {
  const [couponData, setCouponData] = useState([]);
  const [renderComponent,setRenderComponent] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    axios.get("http://localhost:3005/get-coupon").then((res) => {
      setCouponData(res.data);
    });
  }, [renderComponent]);
  useEffect(() => {
    axios.get("http://localhost:3005/get-coupon")
  }, []);
  const onSubmit = (data) =>{
    axios.post('http://localhost:3005/create-coupon',data).then((res)=>{
      toast.success(res.data.message)
      setRenderComponent(!renderComponent)
    })
  }
  const handleDeleteBtnClick = (item) =>{
    axios.delete(`http://localhost:3005/delete-coupon/${item.code}`).then((res)=>{
      toast.success(res.data.message);
      setRenderComponent(!renderComponent)
    })
  }
  const handlePlyPusBtnClick = (item) =>{
    axios.put(`http://localhost:3005/update-coupon/${item.code}`).then((res)=>{
      toast.success(res.data.message)
      setRenderComponent(!renderComponent)
    })
  }
  return (
    <div class="relative top-4 overflow-x-auto">
      <div className="flex justify-end">
        <Popup
          trigger={
            <button
              type="button"
              className="mb-2 flex items-center gap-4 rounded-lg bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 px-5 py-2.5 text-center text-sm font-medium text-white me-2 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800"
            >
              <GoPlus />
              Create Coupon
            </button>
          }
        >
          <form class="mx-auto max-w-sm" onSubmit={handleSubmit(onSubmit)}>
            <div class="mb-5">
              <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Enter Coupon Code
              </label>
              <input
                type="text"
                {...register("code", { required: true })}
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Enter Coupon Code"
              />
            </div>
            <div class="mb-5">
              <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Select Subscription Type
              </label>
              <select
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...register("subscriptionType", { required: true })}
              >
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
                <option value="All">All</option>
              </select>
            </div>
            <div class="mb-5">
              <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Select Discount Type
              </label>
              <select
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...register("discountType", { required: true })}
              >
                <option>Percentage</option>
                <option>Absolute</option>
              </select>
            </div>
            <div class="mb-5">
              <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Discount Value
              </label>
              <input
                type="number"
                {...register("discountValue", { required: true })}
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Enter Discount Value % or ₹"
              />
            </div>
            <div class="mb-5">
              <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Start Date
              </label>
              <input
                type="Date"
                {...register("startDate", { required: true })}
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Enter Coupon Code"
              />
            </div>
            <div class="mb-5">
              <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Expire Date
              </label>
              <input
                type="Date"
                {...register("expireDate", { required: true })}
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Enter Coupon Code"
              />
            </div>
            <div class="mb-5">
              <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Status
              </label>
              <select
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...register("status", { required: true })}
              >
                <option value="Active">Active</option>
                <option value="Deactive">Deactive</option>
              </select>
            </div>
            <button
              type="submit"
              class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
            >
              Submit
            </button>
          </form>
        </Popup>
      </div>
      <table class="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              No.
            </th>
            <th scope="col" class="px-6 py-3">
              Coupon Code
            </th>
            <th scope="col" class="px-6 py-3">
              Duration
            </th>
            <th scope="col" class="px-6 py-3">
              Discount Type
            </th>
            <th scope="col" class="px-6 py-3">
              Discount Value
            </th>
            <th scope="col" class="px-6 py-3">
              Start Date
            </th>
            <th scope="col" class="px-6 py-3">
              Expire Date
            </th>
            <th scope="col" class="px-6 py-3">
              Status
            </th>
            <th scope="col" class="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {couponData.map((items, index) => {
            return (
              <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                <th
                  scope="row"
                  class="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white"
                >
                  {index + 1}
                </th>
                <td class="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
                  {items.code}
                </td>
                <td class="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
                  {items.subscriptionType}
                </td>
                <td class="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
                  {items.discountType}
                </td>
                <td class="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
                  {items.discountType == "Absolute"
                    ? `₹ ${items.discountValue}`
                    : `${items.discountValue} %`}
                </td>
                {console.log(items)}
                <td class="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
                  {items.startDate.split('T')[0]}
                </td>
                <td class="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
                  {items.expireDate.split("T")[0]}
                </td>
                <td class="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
                  {items.status}
                </td>
                <td class="flex gap-2 px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
                  <MdModeEdit /> <MdDelete onClick={()=>handleDeleteBtnClick(items)}/> 
                    {items.status == "Active" ?
                    <IoIosPause onClick={()=>handlePlyPusBtnClick(items)}/> : <IoPlay onClick={()=>handlePlyPusBtnClick(items)}/> }
                </td>
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
