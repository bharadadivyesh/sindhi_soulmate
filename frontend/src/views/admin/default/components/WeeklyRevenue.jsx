import React, { useState, useEffect } from "react";
import Card from "components/card";
import BarChart from "components/charts/BarChart";
import { barChartOptionsWeeklyRevenue } from "variables/charts";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const WeeklyRevenue = () => {
  const [barChartDataWeeklyRevenueData, setBarChartDataWeeklyRevenueData] =useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const {
    register,
    watch,
    formState: { errors },
  } = useForm();
  let startDate = watch("startDate");
  let endDate = watch("endDate");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3005/get-formData");
        const users = await response.json();
        const revenueMap = new Array(7).fill(0);
        const start = new Date(startDate);
        const end = new Date(endDate);
        users.forEach((user) => {
          const createdAt = new Date(user.createdAt);
          if (createdAt >= start && createdAt <= end) {
            const day = createdAt.getDay();
            const revenue =
              parseInt(user.discountedPrice) || parseInt(user.price) || 0;
            revenueMap[day] += revenue;
          }
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
        setBarChartDataWeeklyRevenueData(revenueArray);
      } catch (error) {
        toast.error("Something went wrong");
      }
    };
    if (startDate && endDate) {
      fetchData();
    }
  }, [startDate, endDate]);
  return (
    <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 text-center">
      <div className="mb-auto flex items-center justify-between px-6">
        <h2 className="text-lg font-bold text-navy-700 dark:text-white">
          Revenue {`- ₹${totalRevenue}`}
        </h2>
        <div className="grid gap-2">
          <label className="pr-10">Start Date</label>
          <input type="date" {...register("startDate")} />
        </div>
        To
        <div className="grid">
          <label className="pr-10">End Date</label>
          <input
            type="date"
            {...register("endDate", {
              validate: {
                notSame: (value) =>
                  value !== startDate ||
                  "End Date cannot be the same as Start Date",
                notBeforeStart: (value) =>
                  !startDate ||
                  value > startDate ||
                  "End Date cannot be before Start Date",
              },
            })}
          />
        </div>
        {errors.endDate && <p>{errors.endDate.message}</p>}
      </div>
      <div className="md:mt-16 lg:mt-0">
        <div className="h-[250px] w-full xl:h-[350px]">
          {barChartDataWeeklyRevenueData.length > 0 && (
            <BarChart
              chartData={barChartDataWeeklyRevenueData}
              chartOptions={barChartOptionsWeeklyRevenue}
            />
          )}
        </div>
      </div>
    </Card>
  );
};

export default WeeklyRevenue;
