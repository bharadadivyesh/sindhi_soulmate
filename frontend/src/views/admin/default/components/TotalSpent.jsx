import React, { useState, useEffect } from "react";
import Card from "components/card";
import { toast } from "react-toastify";
import { lineChartOptionsTotalSpent } from "variables/charts";
import LineChart from "components/charts/LineChart";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TotalSpent = () => {
  const [startDate, setStartDate] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [lineChartDataTotalSpent, setLineChartDataTotalSpent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3005/get-formData");
        const users = await response.json();
        const revenueMap = new Array(12).fill(0);

        users.forEach((user) => {
          const month = new Date(user.createdAt).getMonth();
          const revenue =parseInt(user.discountedPrice) || parseInt(user.price) || 0;
          revenueMap[month] += revenue;
        });
        const revenueArray = [
          {
            name: "Revenue",
            data: revenueMap.map((value) => (isNaN(value) ? 0 : value)),
            color: "#4318FF",
          },
        ];
        const total = revenueMap.reduce((total, value) => total + value, 0);
        setTotalRevenue(total);
        setLineChartDataTotalSpent(revenueArray);
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <Card extra="!p-[20px] text-center">
      <div className="flex justify-between">
        <button className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:hover:opacity-90 dark:active:opacity-80">
          <span className="text-sm font-medium text-gray-600">This month</span>
        </button>
        <button className="flex items-center justify-center rounded-lg">
          <DatePicker
            placeholderText="Select Date"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="flex items-center justify-center rounded-lg p-1"
          />
        </button>
      </div>
        <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
          <div className="h-full w-full">
            {lineChartDataTotalSpent && (
              <LineChart
                options={lineChartOptionsTotalSpent}
                series={lineChartDataTotalSpent}
              />
            )}
          </div>
        </div>
    </Card>
  );
};

export default TotalSpent;
