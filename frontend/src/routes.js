import React from "react";
import MainDashboard from "views/admin/default";
import Profile from "views/admin/profile";
import AllUser from "./views/admin/tables/components/AllUser";
import Coupon from "views/admin/Coupon/Coupon";
import {MdHome,MdBarChart,MdPerson} from "react-icons/md";
import { RiTicket2Line } from "react-icons/ri";
import { RiCoupon2Line } from "react-icons/ri";
const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
    roles: ["admin", "sub-admin", "sup-admin"],
  },
  {
    name: "All User",
    layout: "/admin",
    path: "all-user",
    optionPaths: ["requested-user","active-user","deactiveted-user","rejected-user","terminated-user","pending-payment","expire-subscription","deactivated-account",],
    optionNames: ["Requested User","Active User","DeActiveted User","Rejected User","Terminated User","Pending Payment","Expired Subscription","UserDeleted Account",],
    icon: <MdBarChart className="h-6 w-6" />,
    component: <AllUser />,
    roles: ["admin"],
  },
  {
    name: "Coupon",
    layout: "/admin",
    path: "coupon",
    icon: <RiCoupon2Line className="h-6,w-6" />,
    component: <Coupon />,
    secondary: true,
    roles: ["admin"],
  },
  {
    name: "Ticket Support",
    layout: "/admin",
    path: "ticket",
    optionPath: ["open-ticket", "close-ticket"],
    optionName: ["Open Ticket", "Close Ticket"],
    icon: <RiTicket2Line className="h-6,w-6" />,
    secondary: true,
    roles: ["admin", "sub-admin"],
  },
  {
    name: "Role Management",
    layout: "/admin",
    path: "role-managemant",
    optionNameRoleMenagement: ["Create Roles", "View Roles", "View Members"],
    optionPathRoleMenagement: ["create-roles", "view-roles", "view-members"],
    icon: <MdPerson className="h-6 w-6" />,
    roles: ["admin", "sub-admin"],
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
    roles: ["admin", "sub-admin"],
  },
];
export default routes;