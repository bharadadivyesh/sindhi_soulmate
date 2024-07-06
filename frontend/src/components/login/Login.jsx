import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    await axios
      .post("http://localhost:3005/signin", data)
      .then((res) => {
        let token = res.data.token;
        Cookies.set('auth-token', token)
        toast.success(res.data.message);
        navigate("/admin");
      })
      .catch(() => {
        toast.error("Invalid credential");
      });
  };
  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md rounded-lg p-7 shadow-lg">
          <h2 className="mb-4 flex justify-center text-3xl font-extrabold leading-none tracking-tight text-gray-900">
            Login
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-white ">
                Enter FullName
              </label>
              <input
                type="text"
                {...register("firstName", { required: true })}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                placeholder="Enter FullName"
                autoComplete="off"
              />
              {errors.name && (
                <span className="text-red-600">Enter FullName</span>
              )}
            </div>
            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-white">
                Enter Password
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                placeholder="Enter Password"
              />
              {errors.password && (
                <span className="text-red-600">Enter Password</span>
              )}
            </div>
            <button
              type="submit"
              className="w-full  rounded-lg bg-purple-500 px-5 py-2.5 text-center text-sm font-medium text-white "
            >
              Submit
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};
export default Login;
