import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import Footer from "components/footer/Footer";
import routes from "routes.js";
import RejectedUser from "views/admin/tables/components/RejectedUser";
import ActiveUser from "views/admin/tables/components/ActiveUser";
import RequestedUser from "views/admin/tables/components/RequestedUser";
import DeactivatedUser from "views/admin/tables/components/DeactivatedUser";
import TerminatedUser from "views/admin/tables/components/TerminatedUser";
import PendingPayment from "views/admin/tables/components/PendingPayment";
import ExpireSubscription from "views/admin/tables/components/ExpireSubscription";
import UserDeletedAccount from "views/admin/tables/components/UserDeletedAccount";
import OpenTicket from "views/admin/TicketSupport/components/OpenTicket";
import CloseTicket from "views/admin/TicketSupport/components/CloseTicket";
import CreateRoles from "../../views/admin/Member/components/CreateRoles";
import ViewRoles from "../../views/admin/Member/components/Roles";
import ViewMembers from "../../views/admin/Member/components/Members";
export default function Admin(props) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");
  const [subRoute, setSubRoute] = useState("");
  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);
  React.useEffect(() => {
    getActiveRoute(routes);
  }, [location.pathname]);
  const getActiveRoute = (routes) => {
    let activeRoute = "Main Dashboard";
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(
          routes[i].layout + "/" + routes[i].path
        ) !== -1
      ) {
        setCurrentRoute(routes[i].name);
      } else if (location.pathname === "/admin/requested-user") {
        setSubRoute("Requested User");
      } else if (location.pathname === "/admin/active-user") {
        setSubRoute("Active User");
      } else if (location.pathname === "/admin/deactiveted-user") {
        setSubRoute("Deactiveted user");
      } else if (location.pathname === "/admin/rejected-user") {
        setSubRoute("Rejected user");
      } else if (location.pathname === "/admin/terminated-user") {
        setSubRoute("Terminated User");
      } else if (location.pathname === "/admin/pending-payment") {
        setSubRoute("Pending Payment");
      } else if (location.pathname === "/admin/expire-subscription") {
        setSubRoute("Expire Subscription");
      } else if (location.pathname === "/admin/deactivated-account") {
        setSubRoute("Deactivated Account");
      } else if (location.pathname === "/admin/open-ticket") {
        setCurrentRoute("Ticket Support")
        setSubRoute("Open Ticket");
      } else if (location.pathname === "/admin/close-ticket") {
        setCurrentRoute("Ticket Support");
        setSubRoute("Close Ticket");
      } else if (location.pathname === "/admin/view-roles") {
        setCurrentRoute("Member");
        setSubRoute("Roles");
      } else if (location.pathname === "/admin/view-members") {
        setCurrentRoute("Member");
        setSubRoute("Members");
      } else {
        setSubRoute("");
      }
    }
    return activeRoute;
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      }
      return null;
    });
  };
  document.documentElement.dir = "ltr";
  return (
    <div className="flex h-full w-full">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
        >
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              brandText={currentRoute}
              secondary={subRoute}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-7 md:pr-2">
              <Routes>
                {getRoutes(routes)}
                <Route path="/" element={<Navigate to="/admin/default" replace />}/>
                <Route path="/requested-user" element={<RequestedUser />} />
                <Route path="/active-user" element={<ActiveUser />} />
                <Route path="/deactiveted-user" element={<DeactivatedUser />} />
                <Route path="/rejected-user" element={<RejectedUser />} />
                <Route path="/terminated-user" element={<TerminatedUser />} />
                <Route path="/pending-payment" element={<PendingPayment />} />
                <Route path="/expire-subscription" element={<ExpireSubscription />}/>
                <Route path="/deactivated-account" element={<UserDeletedAccount />}/>
                <Route path="/open-ticket" element={<OpenTicket />} />
                <Route path="/close-ticket" element={<CloseTicket />} />
                <Route path="/create-roles" element={<CreateRoles />} />
                <Route path="/view-roles" element={<ViewRoles />} />
                <Route path="/view-members" element={<ViewMembers />} />
              </Routes>
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
