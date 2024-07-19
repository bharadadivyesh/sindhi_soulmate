import React, { useEffect,useState } from "react";
import Card from "components/card";
import axios from "axios";

const ExpiredSubscription = () => {
  const [registrationData, setRegistrationData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3005/get-formData").then((res) => {
      setRegistrationData(res.data);
    });
  }, []);
  const expiredSubscriptionUsers = registrationData.filter(
    (user) => new Date(user.expirationDate) < new Date()
  );
  return (
    <Card extra={"w-full h-full sm:overflow-auto px-6"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Expired Subscription
        </div>
      </header>
      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <div className="relative overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="select-none px-6 py-3 text-xs font-bold tracking-wide text-gray-600">
                  Person Name
                </th>
                <th className="select-none px-6 py-3 text-xs font-bold tracking-wide text-gray-600">
                  Mobile Number
                </th>
                <th className="select-none px-6 py-3 text-xs font-bold tracking-wide text-gray-600">
                  Membership Type
                </th>
                <th className="select-none px-6 py-3 text-xs font-bold tracking-wide text-gray-600">
                  Expire Date
                </th>
              </tr>
            </thead>
            <tbody>
              {expiredSubscriptionUsers.map((items, index) => {
                return (
                  <tr className="bg-white dark:bg-gray-800" key={index}>
                    <td className="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
                      {`${items.firstName} ${items.lastName}`}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
                      {items.mobileNumber}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
                      {items.subscriptionType}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
                      {new Date(
                        new Date(items.expirationDate).getTime() +
                          5.5 * 60 * 60 * 1000
                      ).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};

export default ExpiredSubscription;
