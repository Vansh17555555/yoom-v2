"use client";
import React, { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useChatContext } from 'stream-chat-react';
import { useToast } from './ui/use-toast';
import { Textarea } from './ui/textarea';
import ReactDatePicker from "react-datepicker";
import { Input } from './ui/input';
import { useUser } from "@clerk/nextjs";
import { IconType } from 'react-icons/lib';
import { AiOutlineVideoCamera, AiOutlineCalendar, AiOutlineFileText, AiOutlineLink } from "react-icons/ai";
import Image from 'next/image';

// Define the HomeCardProps interface
interface HomeCardProps {
  className?: string;
  img: string;
  title: string;
  description: string;
  handleClick: () => void;
  Icon: IconType;
  bgColor: string;
}

// HomeCard component
const HomeCard: React.FC<HomeCardProps> = ({ img, title, description, handleClick, Icon, bgColor }) => {
  return (
    <div
      className="relative cursor-pointer bg-cover bg-center bg-no-repeat flex items-center justify-center text-center p-4 hover:scale-105 transition-transform duration-300 hover:shadow-lg hover:shadow-black/50 rounded-2xl"
      onClick={handleClick}
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '200px',
        width: '100%',
        backgroundColor: bgColor,
      }}
    >
      
      <div className="absolute top-2 left-2 text-white text-3xl">
        {Icon && <Icon />}
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center p-4 hover:bg-opacity-70 transition-opacity duration-300">
        <div>
          <h3 className="text-xl font-bold text-white transition-transform duration-300 hover:scale-105">{title}</h3>
          <p className="text-base text-white transition-transform duration-300 hover:scale-105">{description}</p>
        </div>
      </div>
    </div>
  );
};

// Define the MeetingState type
type MeetingState = 'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined;

// Define the MeetingValues interface
interface MeetingValues {
  dateTime: Date;
  description: string;
  link: string;
}

// MeetingTypeList component
const MeetingTypeList: React.FC = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<MeetingState>(undefined);
  const { user } = useUser();
  const videoClient = useStreamVideoClient();
  const [values, setValues] = useState<MeetingValues>({
    dateTime: new Date(),
    description: '',
    link: ''
  });
  const [callData, setCallData] = useState<Call | undefined>(undefined);
  const { toast } = useToast();
  const { client } = useChatContext();

  // Function to handle meeting creation
  const createMeeting = async () => {
    if (!videoClient || !user) return;

    try {
      const id = crypto.randomUUID();
      const call = videoClient.call('default', id);
      if (!call) throw new Error('Failed to create call');

      const startsAt = values.dateTime.toISOString() || new Date().toISOString();
      const description = values.description || 'Instant meeting';
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description
          }
        }
      });
      setCallData(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({ title: "Meeting created" });
    } catch (error) {
      console.error('Error creating meeting:', error);
      toast({
        title: 'Error creating meeting',
      });
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callData?.id}`;

  // Function to handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard 
        img="/icons/meet1.png" 
        title="New Meeting" 
        description="Start an instant meeting" 
        handleClick={() => setMeetingState('isInstantMeeting')} 
        Icon={AiOutlineVideoCamera}
        bgColor="#475569" 
      />
      <HomeCard 
        img="/icons/meet2.jpeg" 
        title="Schedule Meeting" 
        description="Plan your meeting" 
        handleClick={() => setMeetingState('isScheduleMeeting')} 
        Icon={AiOutlineCalendar}
        bgColor="#bbf7d0" 
      />
      <HomeCard 
        img="/icons/meet3.jpeg" 
        title="View Recordings" 
        description="Check out your recordings" 
        handleClick={() => router.push('/recordings')} 
        Icon={AiOutlineFileText}
        bgColor="#5eead4" 
      />
      <HomeCard 
        img="/icons/meet4.jpeg" 
        title="Join Meeting" 
        description="Via invitation link" 
        handleClick={() => setMeetingState('isJoiningMeeting')} 
        Icon={AiOutlineLink}
        bgColor="#818cf8" 
      />
      
      {!callData ? (
        <MeetingModal 
          isOpen={meetingState === 'isScheduleMeeting'} 
          onClose={() => setMeetingState(undefined)} 
          title="Create Meeting" 
          className="text-center" 
          buttonText="Start Meeting" 
          handleClick={createMeeting}
        >
          <div className='flex flex-col gap-2.5'>
            <label className='text-base text-normal leading-[22px] text-sky-2'>
              Add a description
            </label>
            <Textarea 
              name="description"
              className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0 ' 
              onChange={handleInputChange} 
            />
          </div>
          <div className='flex w-full flex-col gap-2.5'>
            <label className='text-base text-normal leading-[22px] text-sky-2'>
              Select date and time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date: Date) => setValues((prev) => ({ ...prev, dateTime: date! }))}
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="MMM d, yyyy h:mm aa"
              timeIntervals={15}
              timeCaption='time'
              className="w-full bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal 
          isOpen={meetingState === 'isScheduleMeeting'} 
          onClose={() => setMeetingState(undefined)} 
          title="Meeting Created" 
          className="text-center"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: 'Link copied' });
          }}
          image='/icons/checked.svg'
          buttonIcon='/icons/copy.svg'
          buttonText="Copy Meeting Link"
        />
      )}
      
      <MeetingModal 
        isOpen={meetingState === 'isInstantMeeting'} 
        onClose={() => setMeetingState(undefined)} 
        title="Start an instant meeting" 
        className="text-center" 
        buttonText="Start Meeting" 
        handleClick={createMeeting} 
      />
      
      <MeetingModal 
        isOpen={meetingState === 'isJoiningMeeting'} 
        onClose={() => setMeetingState(undefined)} 
        title="Paste the link here" 
        className="text-center" 
        buttonText="Join Meeting" 
        handleClick={() => router.push(values.link)}
      >
        <Input 
          name="link"
          placeholder='Meeting Link' 
          className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0' 
          onChange={handleInputChange} 
        />
      </MeetingModal>
    </section>
  );
};

export default MeetingTypeList;
