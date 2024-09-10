
import React from 'react';
import Image from 'next/image';  
import book from '/assets/book.png';  
import pc from '/assets/pc.png';      
import card from '/assets/card.png';  
import finance from '/assets/finance.png';  

const About = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-blue-500 via-white to-purple-500 flex flex-col items-center px-4" id="about">
      <div className="p-8 bg-white shadow-lg rounded-lg border border-gray-300 w-full max-w-screen-xl mt-10 mb-12">
        <h1 className="text-purple-600 text-6xl font-semibold p-4 mb-8 text-center border-b-4 border-blue-500">
          <span className="text-gray-700">About</span>
          <span className="text-blue-500 ml-2">Yoom</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-200 via-white to-purple-200">
          
          {/* Top row */}
          <div className="col-span-2 md:col-span-1 relative bg-white backdrop-blur-md border border-blue-200 rounded-xl overflow-hidden p-6 pb-8 flex flex-col animate-background">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-blue-800 opacity-80"></div>
            <div className="relative z-10 flex flex-row">
              <Image src='/assets/book.png' alt="book" width={100} height={100} className="w-auto h-[138px]" />
              <div className="flex flex-col ml-4">
                <h2 className="text-2xl font-bold text-white">Real-Time Processing and Querying</h2>
                <p className="text-lg text-white/80">The app uses advanced deep learning to capture and analyze entire conversations during video calls. Users can later query specific aspects of the discussion to retrieve precise responses.</p>
              </div>
            </div> 
          </div>

          <div className="relative bg-white backdrop-blur-md border border-purple-200 rounded-xl overflow-hidden p-6 pb-8 flex flex-col animate-background">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-blue-800 opacity-80"></div>
            <div className="relative z-10 flex flex-row">
              <Image src='/assets/pc.png' alt="pc" width={100} height={100} className="w-auto h-[138px]" />
              <div className="flex flex-col ml-4">
                <h2 className="text-2xl font-bold text-white">Quick Info Retrieval</h2>
                <p className="text-lg text-white/80">Easily access key points, insights, or specific topics without having to review the entire call, saving time and improving efficiency.</p>
              </div>
            </div> 
          </div>

          {/* Bottom row */}
          <div className="relative bg-white backdrop-blur-md border border-blue-200 rounded-xl overflow-hidden p-6 pb-8 flex flex-col animate-background">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-blue-800 opacity-80"></div>
            <div className="relative z-10 flex flex-row">
              <Image src='/assets/card.png' alt="card" width={100} height={100} className="w-auto h-[138px]" />
              <div className="flex flex-col ml-4">
                <h2 className="text-2xl font-bold text-white">Versatile Use Cases</h2>
                <p className="text-lg text-white/80">Adapts to various settings, from business meetings to casual chats, helping users focus on the most relevant information.</p>
              </div>
            </div> 
          </div>

          <div className="col-span-2 md:col-span-1 relative bg-white backdrop-blur-md border border-purple-200 rounded-xl overflow-hidden p-6 pb-8 flex flex-col animate-background">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-blue-800 opacity-80"></div>
            <div className="relative z-10 flex flex-row">
              <Image src='/assets/finance.png' alt="finance"width={100} height={100} className="w-auto h-[138px]" />
              <div className="flex flex-col ml-4">
                <h2 className="text-2xl font-bold text-white">Enhanced Productivity</h2>
                <p className="text-lg text-white/80">Streamlines information retrieval, boosting productivity and ensuring a more organized communication experience.</p>
              </div>
            </div> 
          </div>

        </div>
      </div> 
    </div> 
  )
}

export default About;
