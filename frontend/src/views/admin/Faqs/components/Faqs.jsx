import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FiMinus } from "react-icons/fi";
import { HiOutlinePlus } from "react-icons/hi";

const Faqs = () => {

  const [faqs,setFaqs] = useState([])
  const [toggleState, setToggleState] = useState({});
  useEffect(() => {
    axios.get("http://localhost:3005/get-faqs").then((res) => {
      setFaqs(res.data);
    });
  }, []);

   const handleToggle = (index) => {
     setToggleState((prevState) => ({
       ...prevState,
       [index]: !prevState[index],
     }));
   };
  return (
    <>
      {faqs.map((items, index) => {
        const isToggled = toggleState[index];
        return (
          <div className="mb-5 flex" key={index}>
            <div className="leading-1.5 flex w-full flex-col rounded-lg bg-customBlue p-3 shadow-lg">
              <div className="flex justify-between space-x-2 rtl:space-x-reverse">
                <span className="flex gap-3 text-sm font-semibold text-gray-900 dark:text-white select-none">
                  {`(${index + 1})  ${items?.question}`}
                </span>
                <div className="flex" onClick={() => handleToggle(index)}>
                  {isToggled ? <FiMinus /> : <HiOutlinePlus />}
                </div>
              </div>
              <div>
                {isToggled && (
                  <>
                    <p className="py-2.5 text-sm font-normal text-gray-900 dark:text-white select-none">
                      {items?.description}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
export default Faqs