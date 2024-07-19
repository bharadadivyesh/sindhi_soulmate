import React, { useEffect, useState } from "react";
import { Routes, Route,useNavigate } from "react-router-dom";
import AdminLayout from "layouts/admin";
import TicketSupportContext from "views/admin/TicketSupport/components/TicketSupportContext";
import Login from "components/login/Login";
import Cookies from "js-cookie";
const App = () => {
  const [ticketSupport, setTicketSupport] = useState();
  const [ticketRenderState, setTicketRenderState] = useState("");
  const [viewRole, setViewRole] = useState();
  const [viewBtnState,setViewBtnState] = useState(false)
  const navigate = useNavigate();
  useEffect(() => {
    const userCookie = Cookies.get("auth-token");
    if (!userCookie) {
      navigate("/", { replace: true });
    }
    else{
      navigate("/admin",{replace : true})
    }
  }, []);

  return (
    <TicketSupportContext.Provider value={{ticketSupport,ticketRenderState,viewRole,viewBtnState,setTicketSupport,setTicketRenderState,setViewRole,setViewBtnState}}>
      <Routes>
        <Route path="admin/*" element={<AdminLayout />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </TicketSupportContext.Provider>
  );
};
export default App;