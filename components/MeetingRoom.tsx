'use client';

import React, { useEffect, useState } from 'react';
import Whiteboard from './ui2/Whiteboard';
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
  useCall,
  TranscriptionSettingsRequestModeEnum,
} from '@stream-io/video-react-sdk';
import { useRouter, useSearchParams } from 'next/navigation';
import { Users, LayoutList, MessageCircle, Mic, Edit3 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Loader from './Loader';
import { cn } from '@/lib/utils';
import ChatComponent from './ChatComponent';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { useTranscription } from "@/context/TranscriptionContext";
type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  const isPersonalRoom = !!searchParams.get('personal');
  const router = useRouter();
  const [transcriptionText,setTranscriptionText]=useState<string>()
  const {user
} = useUser();
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionData, setTranscriptionData] = useState<string>('');
  const [transcriptionError, setTranscriptionError] = useState<string>('');
  const [isProcessingTranscription, setIsProcessingTranscription] = useState(false);
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const { useCallCallingState, useCallSettings, useIsCallTranscribingInProgress } = useCallStateHooks();
  const callingState = useCallCallingState();
  const call = useCall();
  const { transcription } = useCallSettings() || {};
  const transcriptionInProgress = useIsCallTranscribingInProgress();
  console.log(user)
  const [showTranscriptionStarted, setShowTranscriptionStarted] = useState(false);
  const [showTranscriptionStopped, setShowTranscriptionStopped] = useState(false);
  const [showTranscriptionReady, setShowTranscriptionReady] = useState(false);
 
  useEffect(() => {
    if (!call) return;

    const handleTranscriptionReady = async (event: any) => {
      console.log('Transcription ready event:', event);
      const url = event.call_transcription?.url;
      if (url) {
        try {
          setIsProcessingTranscription(true);
          const response = await axios.post('https://https://fastapi-backend-production-641e.up.railway.app/process_transcription', { url });
          console.log(response);
          const processedTranscription = response.data.transcription_text;
          
          // Save the transcription to a file and upload to MongoDB
          const uploadResponse = await fetch('/api/upload-transcription', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              transcription: processedTranscription,
              fileName: `transcription_${Date.now()}.txt`,
              userId:user?.id
            }),
          });
          setTranscriptionText(processedTranscription)
          if (uploadResponse.ok) {
            const result = await uploadResponse.json();
            console.log("File uploaded to MongoDB:", result);
          } else {
            throw new Error('Failed to upload transcription');
          }
          
          setTranscriptionData(processedTranscription);
          setIsProcessingTranscription(false);
          setTranscriptionError('');
          setShowTranscriptionReady(true);
          console.log("Transcription processed and uploaded to MongoDB");
          setTimeout(() => setShowTranscriptionReady(false), 3000);
        } catch (error) {
          console.error("Error processing or uploading transcription:", error);
          setTranscriptionError(`Failed to process or upload transcription: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      } else {
        console.error("No transcription URL available");
        setTranscriptionError('No transcription URL available');
      }
    };

    const handleTranscriptionStarted = () => {
      console.log('Transcription started');
      setIsTranscribing(true);
      setTranscriptionError('');
      setShowTranscriptionStarted(true);
      setTimeout(() => setShowTranscriptionStarted(false), 3000);
    };

    const handleTranscriptionStopped = () => {
      console.log('Transcription stopped');
      setIsTranscribing(false);
      setIsProcessingTranscription(true)
      setShowTranscriptionStopped(true);
      setTimeout(() => setShowTranscriptionStopped(false), 3000);
    };

    const handleTranscriptionFailed = (error: any) => {
      console.error('Transcription failed', error);
      setTranscriptionError(`Transcription failed: ${error.message}`);
    };

    call.on('call.transcription_started', handleTranscriptionStarted);
    call.on('call.transcription_stopped', handleTranscriptionStopped);
    call.on('call.transcription_ready', handleTranscriptionReady);
    call.on('call.transcription_failed', handleTranscriptionFailed);

    return () => {
      call.off('call.transcription_started', handleTranscriptionStarted);
      call.off('call.transcription_stopped', handleTranscriptionStopped);
      call.off('call.transcription_ready', handleTranscriptionReady);
      call.off('call.transcription_failed', handleTranscriptionFailed);
    };
  }, [call]);

  useEffect(() => {
    if (transcription?.mode === TranscriptionSettingsRequestModeEnum.AUTO_ON && !transcriptionInProgress) {
      call?.startTranscription().catch((err) => {
        console.error('Failed to start transcription', err);
      });
    }
  }, [call, transcription?.mode, transcriptionInProgress]);

  if (callingState !== CallingState.JOINED) return <Loader />;

  const callId = call?.id;

  const toggleTranscription = () => {
    if (isTranscribing) {
      call
        ?.stopTranscription()
        .then(() => setIsTranscribing(false))
        .catch((err) => {
          console.error('Failed to stop transcription', err);
        });
    } else {
      call
        ?.startTranscription()
        .then(() => setIsTranscribing(true))
        .catch((err) => {
          console.error('Failed to start transcription', err);
        });
    }
  };

  const handleAskQuestion = async () => {
    try {
      const response = await axios.post('https://chat-backend-production-4b30.up.railway.app/chat', { question });
      setAnswer(response.data.reply);
    } catch (error) {
      console.error("Error asking question:", error);
      setAnswer("Failed to get an answer. Please try again.");
    }
  };

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />;
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white flex justify-center items-center">
      <div className="relative flex size-full items-center justify-center">
        <div className={cn("flex size-full max-w-[1000px] items-center", {
          "max-w-[70%]": showWhiteboard
        })}>
          <CallLayout />
        </div>
        <div
          className={cn('h-[calc(100vh-86px)] hidden ml-2', {
            'show-block': showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
        <div
          className={cn('h-[calc(100vh-86px)] hidden ml-2 w-80', {
            'show-block': showChat,
          })}
        >
          {callId && <ChatComponent callId={callId} />}
        </div>

        {showWhiteboard && (
          <div className="right-0 bottom-0 h-full w-[20%] bg-white">
            <Whiteboard />
          </div>
        )}

        {isProcessingTranscription && (
          <div className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded">
            Processing Transcription...
          </div>
        )}

        {(transcriptionData || transcriptionError) && (
          <div className="absolute bottom-20 left-0 right-0 mx-auto w-3/4 p-4 bg-gray-800 text-white rounded">
            {transcriptionError ? (
              <div>Error: {transcriptionError}</div>
            ) : (
              <div>Transcription Ready</div>
            )}
          </div>
        )}

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-gray-900 p-4 rounded">
          <CallControls onLeave={()=>router.push('/chat')} />
          <CallStatsButton />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Edit3 className="h-5 w-5 cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-gray-800 text-white">
              <DropdownMenuItem onClick={() => setLayout('grid')}>
                <LayoutList className="mr-2 h-5 w-5" />
                Grid View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLayout('speaker-left')}>
                <LayoutList className="mr-2 h-5 w-5" />
                Speaker Left
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLayout('speaker-right')}>
                <LayoutList className="mr-2 h-5 w-5" />
                Speaker Right
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setShowParticipants(!showParticipants)}>
                <Users className="mr-2 h-5 w-5" />
                Participants
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowChat(!showChat)}>
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowWhiteboard(!showWhiteboard)}>
                <Mic className="mr-2 h-5 w-5" />
                Whiteboard
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={toggleTranscription}>
                <Mic className="mr-2 h-5 w-5" />
                {isTranscribing ? 'Stop Transcription' : 'Start Transcription'}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/chat')}>
                <MessageCircle className="mr-2 h-5 w-5" />
                End Call
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </section>
  );
};

export default MeetingRoom;