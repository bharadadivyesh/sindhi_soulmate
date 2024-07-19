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
import { getAuthToken } from "../../../../utils/auth"
const ViewRoles = () => {
  const value = useContext(TicketSupportContext)
  const { setViewRole, setViewBtnState } = value;
  const token = getAuthToken()
  const navigate = useNavigate()
  const [editItem, setEditItem] = useState(null);
  // const [couponTitleTOggle, setCouponTitleToggle] = useState(false);
  const [roles,setRoles] = useState([])
  const [reRenderComponent,setRerenderComponent] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setViewRole(data)
    navigate("/admin/create-roles");
  };
  useEffect(()=>{
    axios.get("http://localhost:3005/get-Roles").then((res)=>{
      setRoles(res.data)
    })
  },[reRenderComponent])
  const handleViewBtnClick = async (item) =>{
    setViewRole(item)
    setViewBtnState(true)
    navigate("/admin/create-roles");

  }
  const handleEditBtnClick = async (item) =>{
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
      {token.permissions.find((p) => p.name === "Roles")?.permissions
        .fullAccess && (
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
                  Create Role
                </h2>
                <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-5">
                    <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-white">
                      Role
                    </label>
                    <input
                      type="text"
                      {...register("role", {
                        required: "Role is required",
                        validate: (value) =>
                          /^[^\d]*$/.test(value) || "Digits not Allow",
                      })}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                      placeholder="Enter Role"
                    />
                    {errors.role && (
                      <span className="text-red-600 ">
                        {errors.role.message}
                      </span>
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
      )}
      <div className="relative overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3 text-xs font-bold tracking-wide text-gray-600">
                Role Name
              </th>
              {token.permissions.find((p) => p.name === "Roles")?.permissions
                .fullAccess && (
                <th className="flex justify-center py-3 pl-80 text-xs font-bold tracking-wide text-gray-600">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {roles?.map((items, index) => {
              return (
                <tr
                  className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={index}
                >
                  <td className="px-6 py-5 text-sm font-bold text-navy-700 dark:text-white">
                    {items?.role}
                  </td>
                  {token.permissions.find((p) => p.name === "Roles")
                    ?.permissions.fullAccess && (
                    <td className="flex justify-center py-5 pl-80 text-sm font-bold text-navy-700 dark:text-white">
                      <span className="flex gap-4">
                        <IoEyeOutline
                          className="cursor-pointer"
                          onClick={() => handleViewBtnClick(items)}
                        />
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
                  )}
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