"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaUserAlt, FaHome, FaRegListAlt, FaCalendarAlt, FaEnvelope } from 'react-icons/fa';
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
// FloatingNav Component
export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
  }) => {
  const router = useRouter();

  const handleProfileClick = () => {
    router.push('/profile');
  }
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}  
      className={cn(
        "flex max-w-fit fixed top-10 inset-x-0 mx-auto border bg-black  rounded-lg  shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] px-10 py-5 items-center justify-center space-x-4 border-white/[0.1]",
        className
      )}
    >
      {navItems.map((navItem: any, idx: number) => (
        <Link
          key={`link=${idx}`}
          href={navItem.link}
          className={cn(
            "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-100 dark:hover:text-neutral-300 hover:text-neutral-400"
          )}
        >
          <span className="block sm:hidden">{navItem.icon}</span>
          <span className="hidden sm:block text-sm">{navItem.name}</span>
        </Link>
      ))}
    
  <div onClick={handleProfileClick} className="cursor-pointer">
        <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-white dark:text-white px-4 py-2 rounded-full">
          <UserButton afterSignOutUrl="/sign-in" />
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
        </button>
      </div>
    </motion.div>
  );
};

// Navbar Component
export default function Navbar() {
  return (
    <FloatingNav
      navItems={[
        { name: 'Home', link: '/', icon: <FaHome /> },
        { name: 'About Yoom', link: '#about', icon: <FaUserAlt /> },
        { name: 'Dashboard', link: '/dashboard', icon: <FaHome /> },
        { name: 'Features', link: '#features', icon: <FaRegListAlt /> },
        { name: 'Upcoming Meetings', link: '#meetings', icon: <FaCalendarAlt /> },
        { name: 'Instruction', link: '#instruction', icon: <FaHome /> },
        { name: 'Our Team', link: '#team', icon: <FaUserAlt /> },
        
      ]}
      className="your-custom-class"
    />
  );
}
