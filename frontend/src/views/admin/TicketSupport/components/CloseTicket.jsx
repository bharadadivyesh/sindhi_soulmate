import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import TicketSupportContext from './TicketSupportContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAuthToken } from "../../../../utils/auth"
const CloseTicket = () => {
  const token = getAuthToken()
  const value = useContext(TicketSupportContext)
  let { setTicketSupport, setTicketRenderState } = value;
  const location = useLocation()
  const navigate = useNavigate()
  const [closeTicketData,setCloseTicketData] = useState([])
  const [searchInput, setSearchInput] = useState("");
  useEffect(()=>{
    axios.get("http://localhost:3005/tickets").then((res) => {
      if(res.status === 200){
        let data = res?.data;
        let tableData = data?.filter((items) => items.status === "closed");
        setCloseTicketData(tableData);
      }
    });
  },[])
  const handleViewTicketClick = (items) =>{
    if(location.pathname === "/admin/close-ticket"){
      setTicketSupport(items)
      setTicketRenderState("ViewReply")
      navigate("/admin/open-ticket")
    }
  }
   const filteredTickets = closeTicketData.filter(
     (ticket) =>
       ticket.ticketNumber.toString().includes(searchInput) ||
       ticket.name.toLowerCase().includes(searchInput.toLowerCase())
   );
  return (
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
              <th className="select-none px-6 py-3 pl-8 text-xs font-bold tracking-wide text-gray-600">Ticket Number</th>
              <th className="select-none px-6 py-3 pl-8 text-xs font-bold tracking-wide text-gray-600">Name</th>
              <th className="select-none px-6 py-3 pl-8 text-xs font-bold tracking-wide text-gray-600">Email</th>
              <th className="select-none px-6 py-3 pl-8 text-xs font-bold tracking-wide text-gray-600">Phone</th>
              <th className="select-none px-6 py-3 pl-8 text-xs font-bold tracking-wide text-gray-600">Department</th>
              <th className="select-none px-6 py-3 pl-8 text-xs font-bold tracking-wide text-gray-600">Priority</th>
              <th className="select-none px-6 py-3 pl-8 text-xs font-bold tracking-wide text-gray-600">Responce</th>
              {token.permissions.find((p) => p.name === "Close Ticket").permissions.fullAccess && (
                <th className="select-none px-6 py-3 pl-8 text-xs font-bold tracking-wide text-gray-600">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredTickets?.map((items, index) => {
              return (
                <tr className="bg-white dark:bg-gray-800" key={index}>
                  <td className="pl-8 text-sm font-bold text-navy-700 dark:text-white py-6">{items.ticketNumber}</td>
                  <td className="pl-8 text-sm font-bold text-navy-700 dark:text-white">{items.name}</td>
                  <td className="pl-8 text-sm font-bold text-navy-700 dark:text-white">{items.email}</td>
                  <td className="pl-8 text-sm font-bold text-navy-700 dark:text-white">{items.phone}</td>
                  <td className="pl-8 text-sm font-bold text-navy-700 dark:text-white">{items.department}</td>
                  <td className="pl-8 text-sm font-bold text-navy-700 dark:text-white">{items.priority}</td>
                  <td className="pl-8 text-sm font-bold text-navy-700 dark:text-white">{items.response}</td>
                  {token.permissions.find((p) => p.name === "Close Ticket")
                    .permissions.fullAccess && (
                    <td className="pl-8 text-sm font-bold text-navy-700 dark:text-white">
                      <button type="button"className="mb-3 mt-3 w-24 rounded-lg border border-gray-300 bg-white px-1 py-2 text-sm font-bold text-navy-700 dark:text-white"onClick={() => handleViewTicketClick(items)}>View Ticket</button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default CloseTicket