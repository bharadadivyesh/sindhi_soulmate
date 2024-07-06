import React, { useContext, useEffect } from "react";
import Popup from "reactjs-popup";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { useForm } from "react-hook-form";
import { IoEyeOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TicketSupportContext from "views/admin/TicketSupport/components/TicketSupportContext";
import { useNavigate } from "react-router-dom";

const ViewRoles = () => {
  const value = useContext(TicketSupportContext)
  const { setViewRole } = value
  const navigate = useNavigate()
  const [editItem, setEditItem] = useState(null);
  const [couponTitleTOggle, setCouponTitleToggle] = useState(false);
  const [roles,setRoles] = useState([])
  const [reRenderComponent,setRerenderComponent] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setViewRole(data)
    navigate("/admin/create-roles");
    // if(editItem){
    //   await axios.put(`http://localhost:3005/update-Roles/${editItem.role}`,data).then((res)=>{
    //     setRerenderComponent(!reRenderComponent)
    //   })
    // }
    // else{
    //   await axios
    //     .post("http://localhost:3005/create-Roles", data)
    //     .then((res) => {
    //       if (res.status === 200) {
    //         toast.success(res.data.message);
    //         reset();
    //         setRerenderComponent(!reRenderComponent);
    //         setEditItem(null);
    //       }
    //     });
    // }
    
  };
  useEffect(()=>{
    axios.get("http://localhost:3005/get-Roles").then((res)=>{
      setRoles(res.data)
    })
  },[reRenderComponent])
  console.log(roles);
  const handleViewBtnClick = async (item) =>{
    setViewRole(item)
    navigate("/admin/create-roles");

  }

  const handleEditBtnClick = async (item) =>{
    // setCouponTitleToggle(true)
    // setEditItem(item)
    // setValue("role",item.role)
    setViewRole(item)
    navigate("/admin/create-roles")
   
  }
  const handleDeleteBtnClick = async (item) => {
    await axios.delete(`http://localhost:3005/delete-Roles/${item.role}`).then((res)=>{
      toast.success(res.data.message)
      setRerenderComponent(!reRenderComponent)
    })
  }

  return (
    <>
      <div className="flex justify-end">
        <Popup
          open={!!editItem}
          trigger={
            <button
              type="button"
              className="mb-2 flex items-center gap-4 rounded-lg bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 px-5 py-2.5 text-center text-sm font-medium text-white me-2"
            >
              <GoPlus />
              Create Roles
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
                {couponTitleTOggle === true ? "Update Role" : "Create Role"}
              </h2>
              <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                  <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-white">
                    Role
                  </label>
                  <input
                    type="text"
                    {...register("role", { required: true })}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Enter Role"
                  />
                  {errors.role && (
                    <span className="text-red-600 ">Enter Role</span>
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
      <div className="relative overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3 text-xs font-bold tracking-wide text-gray-600">
                Role Name
              </th>
              <th className="flex justify-center py-3 pl-80 text-xs font-bold tracking-wide text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {roles?.map((items, index) => {
              return (
                <tr
                  className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={index}
                >
                  <td className="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
                    {items?.role}
                  </td>
                  <td className="flex justify-center py-7 pl-80 text-sm font-bold text-navy-700 dark:text-white">
                    <span className="flex gap-4">
                      <IoEyeOutline className="cursor-pointer" onClick={()=>handleViewBtnClick(items)} />
                      <MdEdit
                        className="cursor-pointer"
                        onClick={() => handleEditBtnClick(items)}
                      />
                      <MdDelete
                        className="cursor-pointer"
                        onClick={() => handleDeleteBtnClick(items)}
                      />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <ToastContainer />
      </div>
    </>
  );
};
export default ViewRoles;