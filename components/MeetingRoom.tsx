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
import EndCallButton from './EndCallButton';
import { cn } from '@/lib/utils';
import ChatComponent from './ChatComponent';
import axios from 'axios';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  const isPersonalRoom = !!searchParams.get('personal');
  const router = useRouter();
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

  useEffect(() => {
    if (!call) return;

    const handleTranscriptionReady = async (event: any) => {
      console.log('Transcription ready event:', event);
      const url = event.call_transcription?.url;
      if (url) {
        try {
          setIsProcessingTranscription(true);
          const response = await axios.post('https://yoom-v2.onrender.com/process_transcription', { url });
          setTranscriptionData(response.data.transcription || 'No transcription data available');
          setIsProcessingTranscription(false);
          setTranscriptionError('');
        } catch (error) {
          console.error("Error fetching or processing transcription data:", error);
          setTranscriptionError(`Failed to fetch transcription: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
    };

    const handleTranscriptionStopped = () => {
      console.log('Transcription stopped');
      setIsTranscribing(false);
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
      const response = await axios.post('http://localhost:5000/chat', { question });
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

        {/* Whiteboard Component */}
        {showWhiteboard && (
          <div className="right-0 bottom-0 h-full w-[20%] bg-white">
            <Whiteboard />
          </div>
        )}

        {/* Transcription Processing Indicator */}
        {isProcessingTranscription && (
          <div className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded">
            Processing Transcription...
          </div>
        )}

        {/* Transcription Display */}
        {(transcriptionData || transcriptionError) && (
          <div className="absolute bottom-20 left-0 right-0 mx-auto w-3/4 p-4 bg-gray-800 text-white rounded">
            {transcriptionError ? (
              <div>Error: {transcriptionError}</div>
            ) : (
              <div>{transcriptionData}</div>
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