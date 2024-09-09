import MeetingModal from "@/components/MeetingModal";
import MeetingTypeList from "@/components/MeetingTypeList";
import React from "react";

const Dashboard = () => {
  const now = new Date();

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-IN", { dateStyle: "full" }).format(date);
  };

  const time = formatTime(now);
  const date = formatDate(now);

  return (
   <div>
    
   </div>
  );
};

export default Dashboard;
