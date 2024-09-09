import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import MeetingModal from "@/components/MeetingModal";
import MeetingTypeList from "@/components/MeetingTypeList";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const ImageSlider: React.FC = () => {
  const images = [
    "/images/meet1.png",
    "/images/meet2.jpeg",
    "/images/meet3.jpeg",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="slider-container relative h-[300px] w-full rounded-3xl overflow-hidden">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="slider-item">
            <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </Slider>
    </div>
  );
};


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
    <section className="flex flex-col gap-10 p-5 min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="relative h-[300px] w-full rounded-3xl overflow-hidden">
        <ImageSlider />
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
      <MeetingModal />
    </section>
  );
};

export default Dashboard;
