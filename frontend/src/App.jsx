import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "layouts/admin";
import TicketSupportContext from "views/admin/TicketSupport/components/TicketSupportContext";

const App = () => {
  const [ticketSupport,setTicketSupport] = useState()
  return (
    <TicketSupportContext.Provider value={{ticketSupport,setTicketSupport}}>
        <Routes>
        <Route path="admin/*" element={<AdminLayout />} />
        <Route path="/" element={<Navigate to="/admin" replace />} />
    </Routes>
      </TicketSupportContext.Provider>
  );
};
export default App;