
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import MyApp from '@/providers/StreamClientPrvider'

import { StreamVideoProvider } from '@stream-io/video-react-sdk'
import React from 'react'

const Homelayout = ({children}:{children:React.ReactNode}) => {
  return (
    <main className='flex w-full bg-gradient-to-r from-blue-500 to-purple-600'>
   <Sidebar/>
   
   {children}
   
    </main>
              
  )
}

export default Homelayout
