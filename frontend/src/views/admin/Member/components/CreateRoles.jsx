import React,{ useContext, useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import routes from "../../../../routes";
import TicketSupportContext from "views/admin/TicketSupport/components/TicketSupportContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
const CreateRoles = () => {
  const value = useContext(TicketSupportContext)
  const {viewRole} = value
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async(data) =>{
    console.log(data);
    await axios.post("http://localhost:3005/create-Roles",data).then((res)=>{
      if(res.status === 200){
        toast.success(res.data.message)
        reset()
      }
    })
  }
  useEffect(()=>{
    if(viewRole){
      setValue("role",viewRole.role);
    }
  },[])
    const [dropdownStates, setDropdownStates] = useState(
      routes.reduce((acc, route) => {
        acc[route.name] = false;
        return acc;
      }, {})
    );
    const handleCategoryClick = (categoryName) => {
      setDropdownStates((prevState) => ({
        ...prevState,
        [categoryName]: !prevState[categoryName],
      }));
    };
    const handleCloseBtnClick = () =>{
      reset()
      navigate("/admin/view-roles")
    }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <div className="mb-4 flex items-center">
            <label className="leading-1 ml-60 flex font-medium text-gray-600"> Role Name: </label>
            <input
              type="text"
              {...register("role", { required: true })}
              className="ml-6 block w-1/3 rounded-lg border bg-gray-50 p-2 text-sm text-gray-600 "
            />
          </div>
          <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3 text-xs font-bold tracking-wide text-gray-600"> Module </th>
                <th className="px-6 py-3 text-xs font-bold tracking-wide text-gray-600"> Read </th>
                <th className="px-6 py-3 text-xs font-bold tracking-wide text-gray-600">Full Access </th>
              </tr>
            </thead>
            <tbody>
              {routes?.map((route, index) => (
                <React.Fragment key={index}>
                  <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                    <td className="py-4">
                      <label onClick={() => handleCategoryClick(route.name)}className={`flex cursor-pointer select-none pl-6 font-medium ${dropdownStates[route.name]? "text-brand-500": "text-gray-600"}`}>
                        <span className="flex">
                          {route.name}
                          <span className="pt-1 pl-5">
                            {dropdownStates[route.name] ? (<FaChevronUp />) : (<FaChevronDown />)}</span>
                        </span>
                      </label>
                    </td>
                    <td className="px-6 py-4">
                      <input type="checkbox" value={route.name} {...register("read")} />
                    </td>
                    <td className="px-6 py-4">
                      <input type="checkbox" value={route.name} {...register("fullAccess")} />
                    </td>
                  </tr>
                  {dropdownStates[route.name] &&
                    route.optionNames &&
                    route.optionNames.map((option, optionIndex) => (
                      <tr key={optionIndex} className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                        <td className="px-6 py-4 pl-9">{option}</td>
                        <td className="px-6 py-4">
                          <input type="checkbox" name={option} {...register(`${option}`)} />
                        </td>
                        <td className="px-6 py-4">
                          <input type="checkbox" value={`${option}`} />
                        </td>
                      </tr>
                    ))}
                </React.Fragment>
              ))}
            </tbody>
            <button type="submit" className="mt-2 rounded-lg border border-gray-300 bg-white px-8 py-2.5 text-sm font-medium text-gray-900 me-2">Save</button>
            <button type="button" className="mt-2 rounded-lg border border-gray-300 bg-white px-8 py-2.5 text-sm font-medium text-gray-900 me-2"onClick={handleCloseBtnClick}>Close</button>
          </table>
          <ToastContainer />
        </div>
      </form>
    </>
  );
};
export default CreateRoles; 