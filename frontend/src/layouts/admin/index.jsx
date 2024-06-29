import React, { useId } from "react";
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
import DeactivatedAccount from "views/admin/tables/components/DeactivatedAccount";
import OpenTicket from "views/admin/TicketSupport/components/OpenTicket";
import CloseTicket from "views/admin/TicketSupport/components/CloseTicket";

export default function Admin(props) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");

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
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary;
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        if(location.pathname === "/admin/requested-user"){
          return(
            <Route path="/requested-user" element={<RequestedUser />} />
          )
        }
        else if(location.pathname === "/admin/active-user"){
          return(
                <Route path="/active-user" element={<ActiveUser />} />
              )
        }
        else if(location.pathname === "/admin/deactiveted-user"){
          return(
            <Route path="/deactiveted-user" element={<DeactivatedUser />} />
          )
        }
        else if(location.pathname === "/admin/rejected-user"){
          return(
            <Route path="/rejected-user" element={<RejectedUser />} />
          )
        }
        else if(location.pathname === "/admin/terminated-user"){
          return(
            <Route path="/terminated-user" element={<TerminatedUser />} />
          )
        }
        else if(location.pathname === "/admin/pending-payment"){
          return(
            <Route path="/pending-payment" element={<PendingPayment />} />
          )
        }
        else if(location.pathname === "/admin/expire-subscription"){
          return(
            <Route path="/expire-subscription" element={<ExpireSubscription />} />
          )
        }
        else if(location.pathname === "/admin/deactivated-account"){
          return(
            <Route path="/deactivated-account" element={<DeactivatedAccount />} />
          )
        }
        else if(location.pathname === "/admin/open-ticket"){
          return(
            <Route path="/open-ticket" element={<OpenTicket />}/>
          )
        }
        else if(location.pathname === "/admin/close-ticket"){
          return(
            <Route path="/close-ticket" element={<CloseTicket />}/>
          )
        }
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      }

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
              logoText={"Horizon UI Tailwind React"}
              brandText={currentRoute}
              secondary={getActiveNavbar(routes)}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-7 md:pr-2" >
              <Routes>
                {getRoutes(routes)}
                <Route
                  path="/"
                  element={<Navigate to="/admin/default" replace />}
                />
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
