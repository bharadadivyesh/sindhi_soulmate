import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { ImUserCheck } from "react-icons/im";
import { FaMoneyBillAlt } from "react-icons/fa";
import { ImUserMinus } from "react-icons/im";
import { FaUserClock } from "react-icons/fa";
import { FaUsersSlash } from "react-icons/fa";
import { RiUserUnfollowFill } from "react-icons/ri";
import { FaCalendarTimes } from "react-icons/fa";
import { FaUserSlash } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { RiUserReceivedFill } from "react-icons/ri";
import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";
import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import TaskCard from "views/admin/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [RegisteredUsers, setRegisterdUsers] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3005/get-formData").then((res) => {
      setRegisterdUsers(res.data);
    });
  }, []);
  let RequestedUsers = RegisteredUsers?.filter(
    (items) => items.status === "Pending"
  );
  let ActiveUsers = RegisteredUsers?.filter(
    (items) => items.status === "Active"
  );
  let DeactivatedUsers = RegisteredUsers?.filter(
    (items) => items.status === "Deactivated"
  );
  let RejectedUsers = RegisteredUsers?.filter(
    (items) => items.status === "Rejected"
  );
  let TerminatedUsers = RegisteredUsers?.filter(
    (items) => items.status === "Terminated"
  );
  let PendingPayments = RegisteredUsers?.filter((items) => items.step < 9);
  const ExpiredSubscription = RegisteredUsers?.filter(
    (user) => new Date(user.expirationDate) < new Date()
  );
  let UserDeletedAccount = RegisteredUsers?.filter(
    (items) => items.softDelete === true
  );
const totalRevenue = RegisteredUsers?.reduce((total, user) => {
  const price =
    user.discountedPrice !== undefined ? user.discountedPrice : user.price;
  if (typeof price !== "number" || isNaN(price)) {
    return total; 
  }

  return total + price;
}, 0);

  return (
    <div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-5">
        <Widget
          icon={<FaUsers className="h-7 w-7" />}
          title={"All Users"}
          subtitle={`${RegisteredUsers?.length}`}
        />
        <Widget
          icon={<RiUserReceivedFill className="h-6 w-6" />}
          title={"Requested Users"}
          subtitle={`${RequestedUsers?.length}`}
        />
        <Widget
          icon={<ImUserCheck className="h-7 w-7" />}
          title={"Active Users"}
          subtitle={`${ActiveUsers?.length}`}
        />
        <Widget
          icon={<FaUserSlash className="h-6 w-6" />}
          title={"Deactivated Users"}
          subtitle={`${DeactivatedUsers?.length}`}
        />
        <Widget
          icon={<RiUserUnfollowFill className="h-7 w-7" />}
          title={"Rejected Users"}
          subtitle={`${RejectedUsers?.length}`}
        />
        <Widget
          icon={<FaUsersSlash className="h-6 w-6" />}
          title={"Terminated Users"}
          subtitle={`${TerminatedUsers?.length}`}
        />
        <Widget
          icon={<FaUserClock className="h-6 w-6" />}
          title={"Pending Payments"}
          subtitle={`${PendingPayments?.length}`}
        />
        <Widget
          icon={<FaCalendarTimes className="h-6 w-6" />}
          title={"Expired Subscriptions"}
          subtitle={`${ExpiredSubscription?.length}`}
        />
        <Widget
          icon={<ImUserMinus className="h-6 w-6" />}
          title={"UserDeleted Account"}
          subtitle={`${UserDeletedAccount?.length}`}
        />
        <Widget
          icon={<FaMoneyBillAlt className="h-6 w-6" />}
          title={"Total Revenue"}
          subtitle={`₹${totalRevenue}`}
        />
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div>
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableDataCheck}
          />
        </div>
        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <DailyTraffic />
          <PieChartCard />
        </div>
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <TaskCard />
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
