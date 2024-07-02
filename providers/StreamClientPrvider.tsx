"use client"
import { tokenProvider} from '@/actions/stream.actions';
import { userid } from '@/components/userid';
import Loader from '@/components/Loader';
import {
    StreamCall,
    StreamVideo,
    StreamVideoClient,
    User,
  } from '@stream-io/video-react-sdk';
import { ReactNode, useEffect, useState } from 'react';
  
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY

const MyApp = ({ children }: { children: ReactNode }) => {
    const [videoClient, setVideoClient] = useState<StreamVideoClient>()
    
    useEffect(() => {
        if (!apiKey) throw new Error('Stream API key missing')
        const user = {
            id: userid,
            name: 'user-name',
            image: 'user-image-url'
        }
        const client = new StreamVideoClient({
            apiKey,
            user:{
              id: userid,
            name: 'user-name',
            image: 'user-image-url'
            },
            tokenProvider,
    })
    setVideoClient(client);
    }, []);

    if (!videoClient) return <Loader />

    return (
      <StreamVideo client={videoClient}>
    {children}
      </StreamVideo>
    );
  };

export default MyApp;
