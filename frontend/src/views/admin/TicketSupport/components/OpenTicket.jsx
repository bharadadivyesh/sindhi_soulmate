import React, { useEffect } from "react";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser } from "react-icons/fa";
import { RiReplyAllLine } from "react-icons/ri";
import { HiOutlinePlus } from "react-icons/hi";
import { FiMinus } from "react-icons/fi";
import moment from "moment-timezone";
import { useContext } from "react";
import TicketSupportContext from "./TicketSupportContext";
const OpenTicket = () => {
  const value = useContext(TicketSupportContext);
  let { ticketSupport } = value;
  const editor = useRef(null);
  const [counter, setCounter] = useState(1);
  const [openTicketData, setOpenTicketData] = useState([]);
  const [toggle, setToggle] = useState("");
  const [formData, setFormData] = useState([]);
  const [replyData, setReplyData] = useState([]);
  const [content, setContent] = useState("");
  const [userToggle,setUserToggle] = useState(false)
  const [toggleState, setToggleState] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const handleToggle = (index) => {
    setToggleState((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  // useEffect(()=>{
  //   setToggle("ViewTicket");
  //   setReplyData([ticketSupport])
  // },[ticketSupport])
  const handleUserToggleBtnClick = () =>{setUserToggle(!userToggle)}
  const handleViewTicketClick = (items) => {
    setFormData(items);
    setToggle("ViewTicket");
  };
  const handleReplyButtonClick = () => {setToggle("Reply");};
  useEffect(() => {
    axios.get("http://localhost:3005/tickets").then((res) => {
      if(res.status === 200){
        let data = res.data;
        let tableData = data.filter(items => items.status === "open")
        setOpenTicketData(tableData);
      }
    });
  }, []);
  useEffect(() => {
    axios.get(`http://localhost:3005/admin-replies/${formData?.email}`)
      .then((res) => {
        setReplyData(res.data);
      });
  }, [formData]);
  const {register,handleSubmit,setValue,reset,formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  useEffect(() => {
    if (formData) {
      setValue("name", formData.name || "");
      setValue("email", formData.email || "");
      setValue("phone", formData.phone || "");
      setValue("department", formData.department || "");
      setValue("priority", formData.priority || "");
      setValue("subject", formData.subject || "");
      setContent("");
    }
  }, [formData, setValue]);
  const onSubmit = async (data) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = content;
    const textContent = tempElement.innerText || tempElement.textContent;
    data.message = textContent;
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("image1", data.image1[0]);
    formData.append("message", data.message);
    formData.append("name", data.name);
    formData.append("department", data.department);
    formData.append("priority", data.priority);
    formData.append("subject", data.subject);
    await axios.post("http://localhost:3005/ticketReply", formData).then((res) => {
        toast.success(res.data.message);
        reset();
      });
  };
  const filteredTickets = openTicketData.filter(
    (ticket) => ticket.ticketNumber.toString().includes(searchInput) || ticket.name.toLowerCase().includes(searchInput.toLowerCase())
  );
  return (
    <>
      {toggle === "" && (
        <>
          <div>
            <input
              type="search"
              className="mb-6 block w-full max-w-md rounded-lg border p-3 text-sm text-gray-900"
              placeholder="Search Ticket or Name"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <div className="relative overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="select-none py-3 pl-7 text-xs font-bold tracking-wide text-gray-600">Ticket Number</th>
                  <th className="select-none py-3 pl-16 text-xs font-bold tracking-wide text-gray-600">Name</th>
                  <th className="select-none py-3 pl-16 text-xs font-bold tracking-wide text-gray-600">Email</th>
                  <th className="select-none py-3 pl-16 text-xs font-bold tracking-wide text-gray-600">Phone</th>
                  <th className="select-none py-3 pl-16 text-xs font-bold tracking-wide text-gray-600">Department</th>
                  <th className="select-none py-3 pl-16 text-xs font-bold tracking-wide text-gray-600">Priority</th>
                  <th className="select-none py-3 pl-16 text-xs font-bold tracking-wide text-gray-600">Response</th>
                  <th className="select-none pl-20 text-xs font-bold tracking-wide text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((items, index) => (
                  <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                    <td className="pl-6 text-sm font-bold text-navy-700 dark:text-white">{items.ticketNumber}</td>
                    <td className="pl-16 text-sm font-bold text-navy-700 dark:text-white">{items.name}</td>
                    <td className="pl-16 text-sm font-bold text-navy-700 dark:text-white">{items.email}</td>
                    <td className="pl-16 text-sm font-bold text-navy-700 dark:text-white">{items.phone}</td>
                    <td className="pl-16 text-sm font-bold text-navy-700 dark:text-white">{items.department}</td>
                    <td className="pl-16 text-sm font-bold text-navy-700 dark:text-white">{items.priority}</td>
                    <td className="pl-16 text-sm font-bold text-navy-700 dark:text-white">{items.response}</td>
                    <td className="pl-16 text-sm font-bold text-navy-700 dark:text-white">
                      <button
                        type="button"
                        className="mb-3 mt-3 w-24 rounded-lg border border-gray-300 bg-white px-1 py-2 text-sm font-bold text-navy-700 dark:text-white"
                        onClick={() => handleViewTicketClick(items)}
                      >
                        View Ticket
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {toggle === "ViewTicket" && (
        <>
          <div className="mb-5 flex items-start">
            <div className="leading-1.5 flex w-2/3 flex-col rounded border-gray-200 bg-[rgba(153,233,251,0.27)] p-3">
              <div className="flex items-center justify-between space-x-2 rtl:space-x-reverse">
                <span className="flex gap-3 text-sm font-semibold text-gray-900 dark:text-white">
                  <FaUser /> {formData?.name}
                  <span className="ml-24">{formData?.createdAt?.split("T")[0].split("-").reverse().join("/")}
                    <span className="ml-16">{moment.tz(formData.createdAt, "Asia/Kolkata").format("HH:mm")}</span>
                  </span>
                </span>
                <div className="flex">
                  {userToggle === true ? (<FiMinus onClick={handleUserToggleBtnClick} />) : (<HiOutlinePlus onClick={handleUserToggleBtnClick} />)}
                </div>
              </div>
              <div>
                {userToggle === true && (
                  <>
                    <p className="py-2.5 text-sm font-normal text-gray-900 dark:text-white">
                      This is a notification to let you know that we are chaging
                      the status of your ticket "Ticket number" to closed as we
                      have not received a responce from you in over 72 hours.
                    </p>
                    <span className="py-2.5 text-sm font-normal text-gray-900 dark:text-white"><b>Department :</b> {formData.department}</span>
                    <br />
                    <span className="py-2.5 text-sm font-normal text-gray-900 dark:text-white"><b>Priority :</b> {formData.priority}</span>
                    <p className="py-2.5 text-sm font-normal text-gray-900 dark:text-white"><b>Message : </b> {formData?.message}</p>
                    <p className="py-2.5 text-sm font-normal text-gray-900 dark:text-white">Regards,</p>
                    <p className="py-2.5 text-sm font-normal text-gray-900 dark:text-white">{formData.name}</p>
                  </>
                )}
              </div>
            </div>
          </div>
          {replyData.map((items, index) => {
            const isToggled = toggleState[index];
            return (
              <div className="mb-5 flex" key={index}>
                <div className="leading-1.5 flex w-2/3 flex-col rounded bg-[rgba(6,255,1,0.08)] p-3">
                  <div className="flex justify-between space-x-2 rtl:space-x-reverse">
                    <span className="flex gap-3 text-sm font-semibold text-gray-900 dark:text-white">
                      <FaUser /> Sindhi Soulmate
                      <span className="ml-24">{items?.createdAt?.split("T")[0]?.split("-")?.reverse()?.join("/")}
                        <span className="ml-16">{moment.tz(items.createdAt, "Asia/Kolkata").format("HH:mm")}</span>
                      </span>
                    </span>
                    <div className="flex" onClick={() => handleToggle(index)}>{isToggled ? <FiMinus /> : <HiOutlinePlus />}</div>
                  </div>
                  <div>
                    {isToggled && (
                      <>
                        <p className="py-2.5 text-sm font-normal text-gray-900 dark:text-white">
                          This is a notification to let you know that we are
                          chaging the status of your ticket "Ticket number" to
                          closed as we have not received a responce from you in
                          over 72 hours.
                        </p>
                        <span className="py-2.5 text-sm font-normal text-gray-900 dark:text-white"><b>Subject :</b> {items.subject}</span>
                        <br />
                        <span className="py-2.5 text-sm font-normal text-gray-900 dark:text-white"><b>Department :</b> {items.department}</span>
                        <br />
                        <span className="py-2.5 text-sm font-normal text-gray-900 dark:text-white"><b>Priority :</b> {items.priority}</span>
                        <p className="py-2.5 text-sm font-normal text-gray-900 dark:text-white"><b>Message : </b> {items?.message}</p>
                        <p className="py-2.5 text-sm font-normal text-gray-900 dark:text-white"><b>Attachment : </b><img src="" alt="" /></p>
                        <p className="py-2.5 text-sm font-normal text-gray-900 dark:text-white">Regards,</p>
                        <p className="py-2.5 text-sm font-normal text-gray-900 dark:text-white">Sindhi Soulmate Team</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <button
            type="button"
            className=" mt-6 flex w-1/12 gap-5 rounded-lg border border-gray-300 bg-white py-3 pl-7 text-sm font-medium text-gray-900"
            onClick={handleReplyButtonClick}
          >
            <span className="mt-1"><RiReplyAllLine /></span>Reply
          </button>
        </>
      )}
      {toggle === "Reply" && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 grid gap-6 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-xs font-bold tracking-wide text-gray-600 dark:text-white">Name</label>
              <input
                type="text"
                placeholder="Name Here"
                {...register("name", { required: true })}
                readOnly
                className="block w-full cursor-no-drop select-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
              />
              {errors.name && (<span className="text-red-600">Name is Required</span>)}
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold tracking-wide text-gray-600 dark:text-white">Email Address</label>
              <input
                type="text"
                placeholder="Email Here"
                {...register("email", { required: true })}
                readOnly
                className="block w-full cursor-no-drop rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
              {errors.email && (<span className="text-red-600">Email is Required</span>)}
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold tracking-wide text-gray-600 dark:text-white">Phone Number</label>
              <input
                type="text"
                placeholder="PhoneNumber Here"
                readOnly
                {...register("phone", { required: true })}
                className="block w-full cursor-no-drop rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
              {errors.email && (<span className="text-red-600">Email is Required</span>)}
            </div>
          </div>
          <div className="mb-6 grid gap-6 md:grid-cols-7">
            <div className="md:col-span-3">
              <label className="mb-2 block text-xs font-bold tracking-wide text-gray-600 dark:text-white">Subject</label>
              <input
                type="text"
                placeholder="Subject Here"
                readOnly
                {...register("subject", { required: true })}
                className="block w-full cursor-no-drop select-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
              />
              {errors.subject && (<span className="text-red-600">Subject is Required</span>)}
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-xs font-bold tracking-wide text-gray-600 dark:text-white">Department</label>
              <input
                type="text"
                placeholder="Department Here"
                readOnly
                {...register("department", { required: true })}
                className="block w-full cursor-no-drop select-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-xs font-bold tracking-wide text-gray-600 dark:text-white">Priority</label>
              <input
                type="text"
                placeholder="Priority Here"
                readOnly
                {...register("priority", { required: true })}
                className="block w-full cursor-no-drop select-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"/>
            </div>
          </div>
          <div className="mb-6">
            <label className="mb-2 block text-xs font-bold tracking-wide text-gray-600 dark:text-white">Message</label>
            <div>
              <JoditEditor
                ref={editor}
                {...register("message", { required: true })}
                value={content}
                onChange={(newContent) => {
                  setContent(newContent);
                  setValue("message", newContent);
                }}
                className="block h-96 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"/>
            </div>
          </div>
          <div>
            <label className="mb-2 block text-xs font-bold tracking-wide text-gray-600 dark:text-white">Attachment</label>
            <input
              type="file"
              {...register("image1")}
              className=" w-5/6 cursor-pointer rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"/>
            <button
              type="button"
              className="mb-2 w-48 ml-6 rounded-lg border border-gray-300 bg-white p-2.5 text-sm font-medium text-gray-900 me-2"
              onClick={() => setCounter(counter + 1)}
            >Add More</button>
          </div>
          <button type="submit"className="my-4 mb-2 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-900 me-2 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700">Submit</button>
          <ToastContainer />
        </form>
      )}
    </>
  );
};
export default OpenTicket;