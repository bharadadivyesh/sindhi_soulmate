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
    <div className="relative overflow-x-auto">
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
                    Enter FirstName
                  </label>
                  <input
                    type="text"
                    {...register("firstName", { required: true })}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Enter FirstName"
                  />
                  {errors.firstName && (<span className="text-red-600 ">Enter FirstName</span>)}
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
                  {errors.lastname && (<span className="text-red-600 ">Enter LastName</span>)}
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
                  {errors.email && (<span className="text-red-600 ">Enter Email</span>)}
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
              Name
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
            <td className="px-6 py-4">Silver</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default CreateRoles;