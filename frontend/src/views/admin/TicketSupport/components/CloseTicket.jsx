import axios from 'axios'
import React, { useEffect, useState } from 'react'
const CloseTicket = () => {
  const [closeTicketData,setCloseTicketData] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:3005/close-tickets").then((res)=>{
      setCloseTicketData(res.data)
    })
  },[])
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="select-none px-6 py-3 pl-8 text-xs font-bold tracking-wide text-gray-600">No.</th>
            <th className="select-none px-6 py-3 pl-8 text-xs font-bold tracking-wide text-gray-600"> Name </th>
            <th className="select-none px-6 py-3 pl-8 text-xs font-bold tracking-wide text-gray-600">Email</th>
            <th className="select-none px-6 py-3 pl-8 text-xs font-bold tracking-wide text-gray-600">Phone</th>
            <th className="select-none px-6 py-3 pl-8 text-xs font-bold tracking-wide text-gray-600">Department</th>
            <th className="select-none px-6 py-3 pl-8 text-xs font-bold tracking-wide text-gray-600">Priority</th>
            <th className="select-none px-6 py-3 pl-8 text-xs font-bold tracking-wide text-gray-600" >Responce</th>
            <th className="select-none px-6 py-3 pl-8 text-xs font-bold tracking-wide text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {closeTicketData.map((items, index) => {
            return (
              <tr className="bg-white dark:bg-gray-800" key={index}>
                <td className="pl-8 text-sm font-bold text-navy-700 dark:text-white">
                  {items.ticketNumber}
                </td>
                <td className="pl-8 text-sm font-bold text-navy-700 dark:text-white">
                  {items.name}
                </td>
                <td className="pl-8 text-sm font-bold text-navy-700 dark:text-white">
                  {items.email}
                </td>
                <td className="pl-8 text-sm font-bold text-navy-700 dark:text-white">
                  {items.phone}
                </td>
                <td className="pl-8 text-sm font-bold text-navy-700 dark:text-white">
                  {items.department}
                </td>
                <td className="pl-8 text-sm font-bold text-navy-700 dark:text-white">
                  {items.priority}
                </td>
                <td className="pl-8 text-sm font-bold text-navy-700 dark:text-white">
                  {items.response}
                </td>
                <td className="pl-8 text-sm font-bold text-navy-700 dark:text-white">
                  <button
                    type="button"
                    className="mb-3 mt-3 w-24 rounded-lg border border-gray-300 bg-white px-1 py-2 text-sm font-bold text-navy-700 dark:text-white"
                  >
                    View Ticket
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default CloseTicket