import React, { useContext, useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import routes from "../../../../routes";
import TicketSupportContext from "views/admin/TicketSupport/components/TicketSupportContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { getAuthToken } from "../../../../utils/auth";

const CreateRoles = () => {
  const value = useContext(TicketSupportContext);
  const { viewBtnState, viewRole } = value;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();
  let token = getAuthToken();

  // Initialize dropdown states
  const initialDropdownStates = routes.reduce((acc, route) => {
    acc[route.name] = false;
    return acc;
  }, {});
  const [dropdownStates, setDropdownStates] = useState(initialDropdownStates);

  // Initialize access states
  const initializeAccessStates = () => {
    return routes.reduce((acc, route) => {
      acc[route.name] = { read: false, fullAccess: false };
      if (route.optionNames) {
        route.optionNames.forEach((option) => {
          acc[option] = { read: false, fullAccess: false };
        });
      }
      if (route.optionName) {
        route.optionName.forEach((option) => {
          acc[option] = { read: false, fullAccess: false };
        });
      }
      if (route.optionNameRoleMenagement) {
        route.optionNameRoleMenagement.forEach((option) => {
          acc[option] = { read: false, fullAccess: false };
        });
      }
      return acc;
    }, {});
  };
  const [accessStates, setAccessStates] = useState(initializeAccessStates());
  const formatViewRolePermissions = (permissions) => {
    const formattedPermissions = initializeAccessStates();
    permissions?.forEach((permission) => {
      if (formattedPermissions[permission.name]) {
        formattedPermissions[permission.name] = {
          read: permission.permissions.read,
          fullAccess: permission.permissions.fullAccess,
        };
      }
    });
    return formattedPermissions;
  };

  useEffect(() => {
    if (viewRole) {
      setValue("role", viewRole.role);
      const formattedPermissions = formatViewRolePermissions(
        viewRole.permissions
      );
      setAccessStates(formattedPermissions);
    }
  }, [viewRole, setValue]);

  const formatAccessStates = () => {
    const formattedPermissions = Object.entries(accessStates).reduce(
      (acc, [key, value]) => {
        if (value.read || value.fullAccess) {
          acc.push({ name: key, permissions: value });
        }
        return acc;
      },
      []
    );
    return formattedPermissions;
  };

  const onSubmit = async (data) => {
    try {
        const rolesData = {
          role: data.role,
          permissions: formatAccessStates(),
        };
        if (viewRole._id) {
          const response = await axios.put(`http://localhost:3005/update-Roles/${viewRole.role}`,rolesData);
          if (response.status === 200) {
            toast.success(response.data.message);
            reset();
          }
        } 
        else{
           const res = await axios.post(
             "http://localhost:3005/create-Roles",
             rolesData,
             { headers: { Authorization: `Bearer ${token}` } }
           );
           if (res.status === 200) {
             toast.success(res.data.message);
             reset();
           }
        }
     
    } catch (error) {
      toast.error("Failed to create roles.");
    }
  };

  const handleCategoryClick = (categoryName) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [categoryName]: !prevState[categoryName],
    }));
  };

  const handleCheckboxChange = (name, type) => {
    setAccessStates((prevState) => {
      const updatedState = {
        ...prevState,
        [name]: {
          ...prevState[name],
          [type]: !prevState[name][type],
        },
      };
      // If Full Access is checked, automatically check Read
      if (type === "fullAccess" && !prevState[name][type]) {
        updatedState[name].read = true;
      }
      // Handle sub-options if they exist
      const route = routes.find((route) => route.name === name);
      if (route) {
        if (route.optionNames) {
          route.optionNames.forEach((option) => {
            if (type === "fullAccess" && !prevState[option]?.[type]) {
              updatedState[option] = {
                read: true,
                fullAccess: true,
              };
            } else if (type === "read" && !prevState[option]?.[type]) {
              updatedState[option] = {
                ...updatedState[option],
                read: true,
              };
            } else if (type === "fullAccess" && prevState[name][type]) {
              updatedState[option] = {
                ...updatedState[option],
                fullAccess: false,
              };
            }
          });
        }
        if (route.optionName) {
          route.optionName.forEach((option) => {
            if (type === "fullAccess" && !prevState[option]?.[type]) {
              updatedState[option] = {
                read: true,
                fullAccess: true,
              };
            } else if (type === "read" && !prevState[option]?.[type]) {
              updatedState[option] = {
                ...updatedState[option],
                read: true,
              };
            } else if (type === "fullAccess" && prevState[name][type]) {
              updatedState[option] = {
                ...updatedState[option],
                fullAccess: false,
              };
            }
          });
        }
        if (route.optionNameRoleMenagement) {
          route.optionNameRoleMenagement.forEach((option) => {
            if (type === "fullAccess" && !prevState[option]?.[type]) {
              updatedState[option] = {
                read: true,
                fullAccess: true,
              };
            } else if (type === "read" && !prevState[option]?.[type]) {
              updatedState[option] = {
                ...updatedState[option],
                read: true,
              };
            } else if (type === "fullAccess" && prevState[name][type]) {
              updatedState[option] = {
                ...updatedState[option],
                fullAccess: false,
              };
            }
          });
        }
      }
      return updatedState;
    });
  };

  const handleCloseBtnClick = () => {
    reset();
    navigate("/admin/view-roles");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <div className="mb-4 flex items-center">
            <label className="leading-1 ml-60 flex font-medium text-gray-600">
              Role Name:
            </label>
            <input
              type="text"
              {...register("role", { required: true })}
              className="ml-6 block w-1/3 rounded-lg border bg-gray-50 p-2 text-sm text-gray-600 "
            />
          </div>
          {errors.role && (
            <span className="pl-80 text-red-500">Role is Required</span>
          )}
          <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3 text-xs font-bold tracking-wide text-gray-600">
                  Module
                </th>
                <th className="px-6 py-3 text-xs font-bold tracking-wide text-gray-600">
                  Read
                </th>
                <th className="px-6 py-3 text-xs font-bold tracking-wide text-gray-600">
                  Full Access
                </th>
              </tr>
            </thead>
            <tbody>
              {routes.map((route, index) => (
                <React.Fragment key={index}>
                  <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                    <td className="py-4">
                      <label
                        onClick={() => handleCategoryClick(route.name)}
                        className={`flex cursor-pointer select-none pl-6 font-medium ${
                          dropdownStates[route.name]
                            ? "text-brand-500"
                            : "text-gray-600"
                        }`}
                      >
                        <span className="flex">
                          {route.name}
                          <span className="pt-1 pl-5">
                            {dropdownStates[route.name] ? (
                              <FaChevronUp />
                            ) : (
                              <FaChevronDown />
                            )}
                          </span>
                        </span>
                      </label>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={accessStates[route.name]?.read || false}
                        onChange={() =>
                          handleCheckboxChange(route.name, "read")
                        }
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={accessStates[route.name]?.fullAccess || false}
                        onChange={() =>
                          handleCheckboxChange(route.name, "fullAccess")
                        }
                      />
                    </td>
                  </tr>
                  {dropdownStates[route.name] &&
                    route.optionNames &&
                    route.optionNames.map((option, optionIndex) => (
                      <tr
                        key={optionIndex}
                        className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                      >
                        <td className="px-6 py-4 pl-9">{option}</td>
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={accessStates[option]?.read || false}
                            onChange={() =>
                              handleCheckboxChange(option, "read")
                            }
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={accessStates[option]?.fullAccess || false}
                            onChange={() =>
                              handleCheckboxChange(option, "fullAccess")
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  {dropdownStates[route.name] &&
                    route.optionName &&
                    route.optionName.map((option, optionIndex) => (
                      <tr
                        key={optionIndex}
                        className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                      >
                        <td className="px-6 py-4 pl-9">{option}</td>
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={accessStates[option]?.read || false}
                            onChange={() =>
                              handleCheckboxChange(option, "read")
                            }
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={accessStates[option]?.fullAccess || false}
                            onChange={() =>
                              handleCheckboxChange(option, "fullAccess")
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  {dropdownStates[route.name] &&
                    route.optionNameRoleMenagement &&
                    route.optionNameRoleMenagement.map(
                      (option, optionIndex) => (
                        <tr
                          key={optionIndex}
                          className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                          <td className="px-6 py-4 pl-9">{option}</td>
                          <td className="px-6 py-4">
                            <input
                              type="checkbox"
                              checked={accessStates[option]?.read || false}
                              onChange={() =>
                                handleCheckboxChange(option, "read")
                              }
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="checkbox"
                              checked={
                                accessStates[option]?.fullAccess || false
                              }
                              onChange={() =>
                                handleCheckboxChange(option, "fullAccess")
                              }
                            />
                          </td>
                        </tr>
                      )
                    )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          {viewBtnState == false && (
            <button
              type="submit"
              className="mt-2 rounded-lg border border-gray-300 bg-white px-8 py-2.5 text-sm font-medium text-gray-900 me-2"
            >
              Save
            </button>
          )}
          <button
            type="button"
            className="mt-2 rounded-lg border border-gray-300 bg-white px-8 py-2.5 text-sm font-medium text-gray-900 me-2"
            onClick={handleCloseBtnClick}
          >
            Close
          </button>
          <ToastContainer />
        </div>
      </form>
    </>
  );
};

export default CreateRoles;
