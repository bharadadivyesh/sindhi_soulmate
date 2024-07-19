import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { encryptData } from "../../utils/crypto";
import { post } from "../../helper/Helper"
const Login = () => {
  const secretKey = "sindhi_Soulmate";
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 const onSubmit = async (data) => {
   const request = {
     path: "signin",
     data: data,
   };

   try {
     let response = await post(request);
     console.log(response);
     if (response.status === 200) {
       let token = response.token;
       Cookies.set("auth-token", token, { expires: 2 });
       toast.success(response.message);
       navigate("/admin");
       console.log("if block work");
     } else {
       toast.error(response.message || "Failed to sign in. Please try again.");
       console.log("else block work");
     }
   } catch (error) {
     toast.error("An error occurred. Please try again later.");
     console.log("Error block work", error);
   }
 };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md rounded-lg p-7 shadow-lg">
          <h2 className="mb-4 flex justify-center text-3xl font-extrabold leading-none tracking-tight text-gray-900"> Login </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-white "> Enter Email </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                placeholder="Enter Email"
                autoComplete="off"
              />
              {errors.email && ( <span className="text-red-600">Enter Email </span> )}
            </div>
            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-white"> Enter Password </label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                placeholder="Enter Password"
              />
              {errors.password && ( <span className="text-red-600">Enter Password</span>)}
            </div>
            <button type="submit" className="w-full  rounded-lg bg-purple-500 px-5 py-2.5 text-center text-sm font-medium text-white ">Submit</button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};
export default Login;
