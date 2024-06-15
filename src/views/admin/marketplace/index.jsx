import axios from "axios";
import { useEffect, useState } from "react";

const Subscription = () => {
  const [subscriptionData, setSubscriptionData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3005/get-subscription").then((res) => {
      if (res.status == 200) {
        setSubscriptionData(res.data);
      }
    });
  }, []);
  return (
    <div class="relative overflow-x-auto">
      <table class="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-xs font-bold tracking-wide text-gray-600 lg:text-xs"
            >
              No.
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-xs font-bold tracking-wide text-gray-600 lg:text-xs"
            >
              Monthly Price
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-xs font-bold tracking-wide text-gray-600 lg:text-xs"
            >
              Yearly Price
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-xs font-bold tracking-wide text-gray-600 lg:text-xs"
            >
              Discount Rate
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-xs font-bold tracking-wide text-gray-600 lg:text-xs"
            >
              Duration
            </th>

          </tr>
        </thead>
        <tbody>
          {subscriptionData.map((items, index) => {
            return (
              <tr class="bg-white dark:bg-gray-800">
                <td class="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
                  {index + 1}
                </td>
                <td class="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">{`₹${items.monthlyPriceNum}`}</td>
                <td class="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">{`₹${items.yearlyPriceNum}`}</td>
                <td class="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">{`₹${parseFloat(items.discountRate).toFixed(2)}`}</td>

                <td class="px-6 py-4 text-sm font-bold text-navy-700 dark:text-white">
                  {items.duration}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Subscription;
