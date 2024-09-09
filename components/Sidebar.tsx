"use client"

import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const Sidebar = () => {
    const pathname = usePathname()

    return (
        <section 
            className=' left-0 top-0 flex h-screen  flex-col justify-between p-6 text-white max-sm:hidden lg:w-[350px] bg-transparent' 
        >
            <div className='flex flex-1 flex-col gap-6'>
                {sidebarLinks.map((link) => {
                    const isActive = pathname === link.route;
                    return (
                        <Link key={link.label} href={link.route} className={cn('flex gap-4 items-center p-4 rounded-lg justify-start', {'bg-blue-500': isActive})}>
                            <Image src={link.imgUrl} alt={link.label} width={24} height={24}/>      
                            <p className='text-lg font-semibold max-lg:hidden'> {link.label}</p>
                        </Link>
                    )
                })}
            </div>
            <div className="bottom-right">
                <Image src="/icons/videoconf.png" alt="Sidebar Image" width={200} height={100} /> 
            </div>
        </section>
    )
}

export default Sidebar
