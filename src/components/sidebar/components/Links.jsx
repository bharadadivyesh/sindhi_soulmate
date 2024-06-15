/* eslint-disable */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import DashIcon from "components/icons/DashIcon";
import { useNavigate } from "react-router-dom";
// chakra imports

export function SidebarLinks(props) {
  const [selectedOption, setSelectedOption] = useState("");

  const navigation = useNavigate();
  // Chakra color mode
  let location = useLocation();

  const { routes } = props;
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    if (selectedValue) {
      navigation(`/admin/${selectedValue}`);
    }
  };

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  const createLinks = (routes) => {
    return routes.map((route, index) => {
      if (
        route.layout === "/admin" ||
        route.layout === "/auth" ||
        route.layout === "/rtl"
      ) {
        return (
          <>
            <Link key={index} to={route.layout + "/" + route.path}>
              <div className="relative mb-3 flex hover:cursor-pointer">
                <li
                  className="my-[3px] flex cursor-pointer px-8 flex-col"
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
                        ? "font-bold text-navy-700 dark:text-white"
                        : "font-medium text-gray-600"
                    }
                    ${route.styles ? "ml-10" : ""}
                    `}
                  >
                    {route.name}
                  </p>
                  </span>
                  
                  {location.pathname === "/admin/all-user" &&  (
                    <ul className="text-gray-500 dark:text-gray-400 flex flex-col pl-6 pt-1">
                      {route.optionNames?.map((item, index) => (
                         <Link
                         className="py-1"
                         key={index}
                         to={route.layout + "/" + route.optionPaths[index]}
                       >
                         <li className="my-1 ml-4 font-medium text-gray-600">
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
              {route.options && route.options.length > 0 && (
                <ul className="ml-16 mt-2">
                  {route.options.map((item, index) => (
                    <Link
                      key={index}
                      to={route.layout + "/" + route.optionPaths[index]}
                    >
                      <li className="my-1 ml-4 font-medium text-gray-600">
                        {item}
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </Link>
          </>
        );
      }
    });
  };
  return createLinks(routes);
}

export default SidebarLinks;
