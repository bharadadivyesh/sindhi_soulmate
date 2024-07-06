import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "layouts/admin";
import TicketSupportContext from "views/admin/TicketSupport/components/TicketSupportContext";
import Login from "components/login/Login";

const App = () => {
  const [ticketSupport, setTicketSupport] = useState();
  const [ticketRenderState, setTicketRenderState] = useState("");
  const [viewRole,setViewRole] = useState()
  return (
    <TicketSupportContext.Provider
      value={{
        ticketSupport,
        ticketRenderState,
        viewRole,
        setTicketSupport,
        setTicketRenderState,
        setViewRole,
      }}
    >
      <Routes>
        <Route path="admin/*" element={<AdminLayout />} />
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </TicketSupportContext.Provider>
  );
};
export default App;