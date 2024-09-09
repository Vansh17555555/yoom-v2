"use client"
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Sidebar from "@/components/Sidebar";
import MeetingModal from "@/components/MeetingModal";
import MeetingTypeList from "@/components/MeetingTypeList";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "@/components/Navbar";





const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); 

    return () => clearInterval(intervalId); 
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-IN", { dateStyle: "full" }).format(date);
  };

  return (
    <section className="flex flex-col gap-10 p-5 min-h-screen w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white">
     
      <div className="relative h-[300px] w-full rounded-3xl overflow-hidden">
       
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative flex flex-col justify-center items-center h-full p-6">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent mb-4">
            Upcoming Meeting at 12:30 PM
          </h2>
          <div className="text-center">
            <h1 className="text-5xl font-extrabold lg:text-7xl drop-shadow-lg">
              {formatTime(currentDate)}
            </h1>
            <p className="text-lg font-medium lg:text-2xl mt-2 drop-shadow-md">
              {formatDate(currentDate)}
            </p>
          </div>
        </div>
      </div>
      
      <MeetingTypeList />
   
    </section>
  );
};

export default Dashboard;
