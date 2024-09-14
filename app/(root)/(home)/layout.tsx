import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Nabla } from "next/font/google";
import React from "react";

const Homelayout = ({ children }: { children: React.ReactNode }) => {
  return (
        <div className='flex w-full'>

            <section className='flex min-h-screen flex-1 flex-col px-6 max-md:pb-14 sm:px-14 w-full bg-[#2F3147]'>
                <div className='w-full'>
                  {children}
                </div>
            </section>
        </div>

  );
};

export default Homelayout;
