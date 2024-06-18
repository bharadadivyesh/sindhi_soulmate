import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import Footer from "components/footer/Footer";
import routes from "routes.js";
import RejectedUser from "views/admin/tables/components/RejectedUser";
import ActiveUser from "views/admin/tables/components/ActiveUser";
import { logDOM } from "@testing-library/react";

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
    // console.log(routes);
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        if (location.pathname === "/admin/requested-user") {
          if (prop.path === "all-user") {
            // Check for requested-user condition
            if (prop.optionPaths.includes("requested-user") && location.pathname === "/admin/requested-user") {
              return <Route path="/requested-user" element={<RejectedUser />} />;
            }
            
            // Check for active-user condition
            if (prop.optionPaths.includes("active-user") && location.pathname === "/admin/active-user") {
              return <Route path="/active-user" element={<ActiveUser />} />;
            }
          }
          // if (prop.path === "all-user") {
          //   if (prop.optionPaths[0] == "requested-user" && location.pathname == "/admin/requested-user") {
          //     return (
          //       <Route path="/requested-user" element={<RejectedUser />} />
          //     );
          //   }
          //   // console.log(prop.optionPaths[1]);
          //   else if (prop.optionPaths[1] == "active-user" && location.pathname == "/admin/active-user") {
          //     return (
          //       // console.log("render")
          //       <Route path="/active-user" element={<ActiveUser />} />
          //     );
          //   }
          // }
        }
        return (
          // console.log(prop.path)
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      }

      //  else if(location.pathname === "/admin/requested-user") {
      //   return (
      //     <Route path={`/${prop.path}`} element={<RejectedUser />} key={key} />
      //   )
      // }
      // else if(location.pathname === "/admin/active-user") {
      //   return (
      //     <Route path={`/${prop.path}`} element={<ActiveUser />} key={key} />
      //   )
      // }
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
          {/* Routes */}
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              logoText={"Horizon UI Tailwind React"}
              brandText={currentRoute}
              secondary={getActiveNavbar(routes)}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-7 md:pr-2">
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
