import React from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
export function SidebarLinks(props) {
  let location = useLocation();
  const navigate = useNavigate();
  // code for roles
  const [userRoles, setUserRoles] = useState(["sub-admin"]);
  const allUserPaths = ["all-user","requested-user","active-user","deactiveted-user","rejected-user","terminated-user","pending-payment","expire-subscription","deactivated-account",];
  const ticketPaths = ["ticket", "open-ticket", "close-ticket"];
  const roleManagementPaths = ["role-managemant","create-roles", "view-roles", "view-members"];
  const pathSegments = location.pathname.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];
  const { routes } = props;
  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };
  if (location.pathname === "/admin/ticket") {
    navigate("/admin/open-ticket");
  }
  if(location.pathname === "/admin/role-managemant"){
    navigate("/admin/create-roles");
  }
  // code for roles
    const hasRequiredRole = (routeRoles) => {
      return routeRoles.some((role) => userRoles.includes(role));
    };

  // route if condition
  // route.layout === "/admin" admin render 
  // isSubAdmin() && route.roles.includes("sub-admin"); sub-admin render
  // && hasRequiredRole(route.roles)
  const createLinks = (routes) => {
    return routes.map((route, index) => {
      if (route.layout === "/admin" ) {
        return (
          <>
            <Link key={index} to={route.layout + "/" + route.path}>
              <div className="relative mb-3 flex hover:cursor-pointer">
                <li
                  className="my-[3px] flex cursor-pointer flex-col px-8"
                  key={index}
                >
                  <span
                    className={`flex flex-row${
                      activeRoute(route.path)
                        ? "font-bold text-brand-500 dark:text-white"
                        : "font-medium text-gray-600"
                    }`}
                  >
                    {route.icon ? route.icon : ""}
                    <p
                      className={`leading-1 ml-4 flex ${
                        activeRoute(route.path)
                          ? "font-bold text-brand-500 dark:text-white"
                          : "font-medium text-gray-600"
                      }`}
                    >
                      {route.name}
                    </p>
                  </span>
                  {allUserPaths.includes(lastSegment) && (
                    <ul className="flex list-disc flex-col pl-6 pt-1 text-gray-500 dark:text-gray-400">
                      {route.optionNames?.map((item, index) => (
                        <Link
                          className="py-1"
                          key={index}
                          to={route.layout + "/" + route.optionPaths[index]}
                        >
                          <li
                            key={index}
                            className={`my-1 ml-4 font-medium text-gray-600 ${
                              activeRoute(`/admin/${route.optionPaths[index]}`)
                                ? "font-extrabold text-brand-700 dark:text-white"
                                : "font-medium text-gray-600"
                            }`}
                          >
                            {item}
                          </li>
                        </Link>
                      ))}
                    </ul>
                  )}
                  {ticketPaths.includes(lastSegment) && (
                    <ul className="flex list-disc flex-col pl-6 pt-1 text-gray-500 dark:text-gray-400">
                      {route.optionName?.map((item, index) => (
                        <Link
                          className="py-1"
                          key={index}
                          to={route.layout + "/" + route.optionPath[index]}
                        >
                          <li
                            key={index}
                            className={`my-1 ml-4 font-medium text-gray-600 ${
                              activeRoute(`/admin/${route.optionPath[index]}`)
                                ? "font-extrabold text-brand-700 dark:text-white"
                                : "font-medium text-gray-600"
                            }`}
                          >
                            {item}
                          </li>
                        </Link>
                      ))}
                    </ul>
                  )}
                  {roleManagementPaths.includes(lastSegment) && (
                    <ul className="flex list-disc flex-col pl-6 pt-1 text-gray-500 dark:text-gray-400">
                      {route?.optionNameRoleMenagement?.map((item, index) => (
                        <Link
                          className="py-1"
                          key={index}
                          to={
                            route.layout +
                            "/" +
                            route.optionPathRoleMenagement[index]
                          }
                        >
                          <li
                            key={index}
                            className={`my-1 ml-4 font-medium text-gray-600 ${
                              activeRoute(
                                `/admin/${route.optionPathRoleMenagement[index]}`
                              )
                                ? "font-extrabold text-brand-700 dark:text-white"
                                : "font-medium text-gray-600"
                            }`}
                          >
                            {item}
                          </li>
                        </Link>
                      ))}
                    </ul>
                  )}
                </li>
                {activeRoute(route.path) ? (
                  <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
                ) : null}
              </div>
            </Link>
          </>
        );
      }
    });
  };
  return createLinks(routes);
}
export default SidebarLinks;