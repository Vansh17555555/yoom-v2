import React from "react";
import Link from "next/link";
import Image from "next/image";
import Mobilenav from "./mobilenav";
import {SignedIn,UserButton} from "@clerk/nextjs"
const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50  bg-[#1C1C1C] py-4 lg:px-10 w-full text-white">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt="Yoom logo"
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          Yoom
        </p>
      </Link>
      <div className="flex-between gap-10">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/upcoming">Upcoming</Link>
        <Link href="/previous">Previous</Link>
        <Link href="/recordings">Recordings</Link>
        <Link href="/personal-room">Personal-Room</Link>
        <Mobilenav />
      </div>
      <div className='flex-between gap-5'><SignedIn><UserButton/></SignedIn></div>
    </nav>
  );
};

export default Navbar;
