import Popup from "reactjs-popup";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { useForm } from "react-hook-form";
const CreateRoles = () => {
  const [editItem, setEditItem] = useState(null);
  const [couponTitleTOggle, setCouponTitleToggle] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <div className="relative">
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
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Role Name
            </th>
            <th scope="col" className="px-6 py-3">
              Dashboard
            </th>
            <th scope="col" className="px-6 py-3">
              All Users
            </th>
            <th scope="col" className="px-6 py-3">
              Coupon
            </th>
            <th scope="col" className="px-6 py-3">
              Ticket Support
            </th>
            <th scope="col" className="px-6 py-3">
              Full Access
            </th>
            <th scope="col" className="px-6 py-3">
              View Only
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
            <td className="px-6 py-4">support</td>
            <td className="px-6 py-4">
              <input type="checkbox" />
            </td>
            <td className="px-6 py-4">
              <input type="checkbox" />
            </td>
            <td className="px-6 py-4">
              <input type="checkbox" />
            </td>
            <td className="px-6 py-4">
              <input type="checkbox" />
            </td>
            <td className="px-6 py-4">
              <input type="checkbox" />
            </td>
            <td className="px-6 py-4">
              <input type="checkbox" />
            </td>
            <td className="px-6 py-4">
              <button
                type="button"
                className="mb-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 me-2 hover:bg-gray-100 "
              >
                Save
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default CreateRoles;
