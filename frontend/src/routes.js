import React from "react";
import MainDashboard from "views/admin/default";
import Profile from "views/admin/profile";
import AllUser from "./views/admin/tables/components/AllUser";

import {
  MdHome,
  MdBarChart,
  MdPerson,
} from "react-icons/md";
import { RiCoupon2Line } from "react-icons/ri";
import Coupon from "views/admin/Coupon/Coupon";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "All User",
    layout: "/admin",
    path: "all-user",
    optionPaths : ["requested-user","active-user","deactiveted-user","rejected-user","terminated-user","pending-payment","expire-subscription","deactivated-account"],
    optionNames : ["Requested User","Active User","DeActiveted User","Rejected User","Terminated User","Pending Payment","Expired Subscription","UserDeleted Account"],
    icon: <MdBarChart className="h-6 w-6" />,
    component: <AllUser />,
  },
  {
    name: "Coupon",
    layout: "/admin",
    path: "coupon",
    icon : <RiCoupon2Line  className="h-6,w-6"/>,
    component: <Coupon />,
    secondary: true,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
];
export default routes;
