import React from "react";
import MainDashboard from "views/admin/default";
import Profile from "views/admin/profile";
import AllUser from "./views/admin/tables/components/AllUser";
import ActiveUser from "views/admin/tables/components/ActiveUser";
import RequestedUser from "views/admin/tables/components/RequestedUser";
import DeactivatedUser from "views/admin/tables/components/DeactivatedUser";
import TerminatedUser from "views/admin/tables/components/TerminatedUser.jsx";
import RejectedUser from "views/admin/tables/components/RejectedUser";
import ExpireSubscription from "views/admin/tables/components/ExpireSubscription";
import DeactivatedAccount from "views/admin/tables/components/DeactivatedAccount"

// Icon Imports
import {
  MdHome,
  MdBarChart,
  MdPerson,
} from "react-icons/md";
import { RiCoupon3Line } from "react-icons/ri";
import PendingPayment from "views/admin/tables/components/PendingPayment";
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
    optionNames : ["Requested User","Active User","DeActiveted User","Rejected User","Terminated User","Pending Payment","Expired Subscription","Deactivated Account"],
    icon: <MdBarChart className="h-6 w-6" />,
    component: <AllUser />,
  },
  // {
  //   names: "Requested User",
  //   layout: "/all-user-requested",
  //   path: "requested-user",
  //   component: <RequestedUser />,
  // },
  // {
  //   names: "Active User",
  //   layout: "/all-user",
  //   path: "active-user",
  //   component: <ActiveUser />,
  // },

  {
    names: "DeActiveted User",
    layout: "/admin",
    path: "deactiveted-user",
    component: <DeactivatedUser />,
  },
  {
    names: "Rejected User",
    layout: "/admin",
    path: "rejected-user",
    component: <RejectedUser />,
  },
  {
    names: "Terminated User",
    layout: "/admin",
    path: "terminated-user",
    component: <TerminatedUser />,
  },

  {
    names: "Pending Payment",
    layout: "/admin",
    path: "pending-payment",
    component: <PendingPayment />,
  },
  {
    names: "Expire Subscription",
    layout: "/admin",
    path: "expire-subscription",
    component: <ExpireSubscription />,
  },
  {
    names: "Deactivated Account",
    layout: "/admin",
    path: "deactivated-account",
    component: <DeactivatedAccount />,
  },
  {
    name: "Coupon",
    layout: "/admin",
    path: "coupon",
    icon : <RiCoupon3Line className="h-6,w-6"/>,
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
