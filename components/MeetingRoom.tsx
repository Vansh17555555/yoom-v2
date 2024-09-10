'use client';

import React, { useEffect, useState } from 'react';
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
import { Users, LayoutList, MessageCircle, Mic } from 'lucide-react';
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
  const isPersonalRoom = !!searchParams.get('personal');
  const router = useRouter();
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionData, setTranscriptionData] = useState('');
  const [transcriptionError, setTranscriptionError] = useState('');
  const [isProcessingTranscription, setIsProcessingTranscription] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
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
          const response = await axios.post('http://localhost:5000/process_transcription', { url });
          console.log('Transcription processed:', response.data);
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
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
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
      </div>
      
      {/* Transcription Processing Indicator */}
      {isProcessingTranscription && (
        <div className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded">
          Processing Transcription...
        </div>
      )}

      {/* Transcription Display */}
      {(transcriptionData || transcriptionError) && (
        <div className="absolute bottom-20 left-0 right-0 mx-auto w-3/4 p-4 bg-black bg-opacity-50 text-white rounded-lg max-h-48 overflow-auto">
          <h3 className="text-lg font-bold">Transcription</h3>
         
        </div>
      )}
      
      {/* Chat Interface */}
      
      
      {/* Call Controls */}
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5">
        <CallControls onLeave={() => router.push(`/`)} />
        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b] ">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  onClick={() =>
                    setLayout(item.toLowerCase() as CallLayoutType)
                  }
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-dark-1" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <Users size={20} className="text-white" />
          </div>
        </button>
        <button onClick={() => setShowChat((prev) => !prev)}>
          <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <MessageCircle size={20} className="text-white" />
          </div>
        </button>
        {/* Transcription button */}
        <button onClick={toggleTranscription}>
          <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <Mic size={20} className="text-white" />
            {isTranscribing ? ' Stop Transcription' : ' Start Transcription'}
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;