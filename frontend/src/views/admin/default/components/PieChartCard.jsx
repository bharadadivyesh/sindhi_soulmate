import PieChart from "components/charts/PieChart";
import {pieChartOptions } from "variables/charts";
import Card from "components/card";
import { useState,useEffect } from "react";
const PieChartCard = () => {
 const [genderCount,setGenderCount] = useState([0,0])
 useEffect(()=>{
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3005/get-formData"); 
      const users = await response.json();
      let maleCount = 0;
      let femaleCount = 0;
      users.forEach((user) => {
        if (user.gender === "Male") {
          maleCount++;
        } else if (user.gender === "Female") {
          femaleCount++;
        }
      });
      setGenderCount([maleCount, femaleCount]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  fetchData();
 },[])
  return (
    <Card extra="rounded-[20px] p-3 flex justify-between">
      <div className="flex flex-row justify-between px-3 pt-2">
        <div>
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            Gender
          </h4>
        </div>
      </div>

      <div className="flex h-[220px] w-full items-center justify-center">
        <PieChart options={pieChartOptions} series={genderCount} />
      </div>
      <div className="flex flex-row !justify-between rounded-2xl px-6 py-3 shadow-2xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-brand-500" />
            <p className="ml-1 text-sm font-normal text-gray-600">Male</p>
          </div>
          <p className="mt-px text-xl font-bold text-navy-700  dark:text-white">
            {genderCount[0]}
          </p>
        </div>

        <div className="h-11 w-px bg-gray-300 dark:bg-white/10" />

        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-[#6AD2FF]" />
            <p className="ml-1 text-sm font-normal text-gray-600">FeMale</p>
          </div>
          <p className="mt-px text-xl font-bold text-navy-700 dark:text-white">
            {genderCount[1]}
          </p>
        </div>
      </div>
    </Card>
  );
};
export default PieChartCard;