import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function SidebarLinks(props) {
  const [accessRoutes, setAccessRoutes] = useState([]);
  let location = useLocation();
  const navigate = useNavigate();
  const allUserPaths = ["all-user","requested-user","active-user","deactiveted-user","rejected-user","terminated-user","pending-payment","expire-subscription","deactivated-account"];
  const ticketPaths = ["tickit", "open-ticket", "close-ticket"];
  const roleManagementPaths = ["role-managemant","create-roles","view-roles","view-members"];
  const pathSegments = location.pathname.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];
  const { routes } = props;
  useEffect(() => {
    const token = Cookies.get("auth-token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const { permissions } = decodedToken;
      const accessibleRoutes = routes.filter((route) => {
        const routePermission = permissions.find(
          (perm) => perm.name === route.name
        );
        return routePermission && routePermission.permissions.read;
      });
      setAccessRoutes(accessibleRoutes);
    }
  }, [routes]);
  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };
  if (location.pathname === "/admin/ticket") {
    navigate("/admin/open-ticket");
  }
  if (location.pathname === "/admin/role-managemant") {
    navigate("/admin/view-roles");
  }
  if (location.pathname === "/admin/logout") {
    Cookies.remove("auth-token");
    navigate("/");
  }
  const createLinks = () => {
    return accessRoutes.map((route, index) => {
      if (route.layout === "/admin") {
        return (
          <Link key={index} to={route.layout + "/" + route.path}>
            <div className="relative mb-3 flex hover:cursor-pointer">
              <li
                className="my-[3px] flex cursor-pointer flex-col px-8"
                key={index}
              >
                <span
                  className={`flex flex-row${
                    activeRoute(route.path) && route.path !== "ticket"
                      ? "font-bold text-brand-500 dark:text-white"
                      : "font-medium text-gray-600"
                  }`}
                >
                  {route.icon ? route.icon : ""}
                  <p
                    className={`leading-1 ml-4 flex ${
                      activeRoute(route.path) && route.path !== "ticket"
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
                          className={`my-1 ml-4 font-medium text-gray-600
                             ${
                               activeRoute(`/admin/${route.optionPath[index]}`)
                                 ? "font-extrabold text-brand-700 dark:text-white"
                                 : "font-medium text-gray-600"
                             }
                          `}
                        >
                          {item}
                        </li>
                      </Link>
                    ))}
                  </ul>
                )}
                {roleManagementPaths.includes(lastSegment) && (
                  <ul className="flex list-disc flex-col pl-6 pt-1 text-gray-500 dark:text-gray-400">
                    {route?.optionNameRoleMenagement?.map((item, index) => {
                      return (
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
                      );
                    })}
                  </ul>
                )}
              </li>
              {activeRoute(route.path) ? (
                <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
              ) : null}
            </div>
          </Link>
        );
      }
      return null;
    });
  };
  return createLinks(routes);
}
export default SidebarLinks;
