
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import MyApp from '@/providers/StreamClientPrvider'

import { StreamVideoProvider } from '@stream-io/video-react-sdk'
import React from 'react'

const Homelayout = ({children}:{children:React.ReactNode}) => {
  return (
    <main>
    <MyApp>{children}</MyApp>
    </main>
              
  )
}

export default Homelayout
