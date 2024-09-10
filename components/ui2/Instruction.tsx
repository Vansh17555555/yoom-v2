import React from 'react';
import { FaVideo, FaRegCalendarAlt, FaFilePdf, FaCheckCircle } from 'react-icons/fa';
import { MdSchedule, MdSettings } from 'react-icons/md';

const InstructionPage = () => {
    return (
      <main>
            <link href='/FaVideo'></link>

    <div className="relative w-full min-h-screen bg-gray-100">
      
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-white to-purple-500 z-0"></div>

      <div className="relative w-full min-h-screen p-6 z-10">
        
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">Yoom Meeting Roadmap</h1>
          <p className="text-lg text-gray-700">Follow these steps to set up and join your Yoom meeting smoothly.</p>
        </header>

        
        <div className="relative w-full max-w-6xl mx-auto">
        
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-blue-200 h-full w-1 md:w-2 rounded-md"></div>

          
          <div className="flex items-start mb-12 w-full relative">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg transition-transform transform hover:scale-105">
              <FaVideo className="text-2xl" />
            </div>
            <div className="ml-6 w-full relative z-10 bg-white shadow-lg rounded-lg p-6 border border-gray-300 transition-transform transform hover:scale-105">
              <h2 className="text-xl font-semibold text-blue-600">1. Schedule Your Meeting</h2>
              <p className="text-gray-600 mt-2">Create a Yoom meeting by scheduling it through the Yoom app or website.</p>
              <p className="text-gray-500 mt-2 flex items-center"><FaRegCalendarAlt className="mr-1" /> Add meeting details and invite participants.</p>
            </div>
          </div>

          
          <div className="flex items-start mb-12 w-full relative">
            <div className="flex-shrink-0 w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg transition-transform transform hover:scale-105">
              <MdSchedule className="text-2xl" />
            </div>
            <div className="ml-6 w-full relative z-10 bg-white shadow-lg rounded-lg p-6 border border-gray-300 transition-transform transform hover:scale-105">
              <h2 className="text-xl font-semibold text-green-600">2. Set Up Your Equipment</h2>
              <p className="text-gray-600 mt-2">Ensure your camera, microphone, and speakers are working properly.</p>
              <p className="text-gray-500 mt-2 flex items-center"><MdSettings className="mr-1" /> Check your settings in the Yoom app.</p>
            </div>
          </div>

         
          <div className="flex items-start mb-12 w-full relative">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center shadow-lg transition-transform transform hover:scale-105">
              <FaFilePdf className="text-2xl" />
            </div>
            <div className="ml-6 w-full relative z-10 bg-white shadow-lg rounded-lg p-6 border border-gray-300 transition-transform transform hover:scale-105">
              <h2 className="text-xl font-semibold text-purple-600">3. Join the Meeting</h2>
              <p className="text-gray-600 mt-2">Click the meeting link or enter the meeting ID to join.</p>
              <p className="text-gray-500 mt-2 flex items-center"><FaCheckCircle className="mr-1" /> Follow the prompts to enter the meeting.</p>
            </div>
          </div>

         
          <div className="flex items-start w-full relative">
            <div className="flex-shrink-0 w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg transition-transform transform hover:scale-105">
              <FaCheckCircle className="text-2xl" />
            </div>
            <div className="ml-6 w-full relative z-10 bg-white shadow-lg rounded-lg p-6 border border-gray-300 transition-transform transform hover:scale-105">
              <h2 className="text-xl font-semibold text-red-600">4. Start Your Meeting</h2>
              <p className="text-gray-600 mt-2">Begin your meeting by sharing your screen, starting the video, and engaging with participants.</p>
              <p className="text-gray-500 mt-2 flex items-center"><FaVideo className="mr-1" /> Make sure all participants can hear and see you.</p>
            </div>
          </div>
        </div>
      </div>
            </div>
                  </main>
  );
};

export default InstructionPage;
