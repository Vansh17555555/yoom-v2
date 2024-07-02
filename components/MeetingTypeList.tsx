"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import HomeCard from './HomeCard';
import MeetingModal from './MeetingModal';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from './ui/use-toast';
import { Textarea } from './ui/textarea';
import ReactDatePicker from "react-datepicker"
import { Input } from './ui/input';

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: ''
  });
  const [callData, setCallData] = useState<Call>();
  const { toast } = useToast();

  const user = {
    id: 'user-id',
    name: 'user-name',
    image: 'user-image-url',
  };

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      const id = crypto.randomUUID();
      const call = client.call('default', id);
      if (!call) throw new Error('Failed to create call');

      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
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

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard img="/icons/add-meeting.svg" title="New Meeting" description="Start an instant meeting" handleClick={() => setMeetingState('isInstantMeeting')} className="bg-orange-1" />
      <HomeCard className="bg-blue-1" img="/icons/schedule.svg" title="Schedule Meeting" description="Plan your meeting" handleClick={() => setMeetingState('isScheduleMeeting')} />
      <HomeCard className="bg-purple-1" img="/icons/recordings.svg" title="View Recordings" description="Check out your recordings" handleClick={() => router.push('/recordings')} />
      <HomeCard className="bg-yellow-1" img="/icons/join-meeting.svg" title="Join Meeting" description="Via invitation link" handleClick={() => setMeetingState('isJoiningMeeting')} />
      
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
            <label className='text-base text-normal leading[22px] text-sky-2'>
              Add a description
            </label>
            <Textarea className='border-none bg-dark-3 focus-vsible:ring-0 focus-visible:ring-offset-0 ' onChange={(e) => setValues({ ...values, description: e.target.value })}></Textarea>
          </div>
          <div className='flex w-full flex-col gap-2.5'>
            <label className='text-base text-normal leading[22px] text-sky-2'>
              Select date and time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date: Date) => setValues({ ...values, dateTime: date! })}
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
      
      <MeetingModal isOpen={meetingState === 'isInstantMeeting'} onClose={() => setMeetingState(undefined)} title="Start an instant meeting" className="text-center" buttonText="Start Meeting" handleClick={createMeeting} />
      <MeetingModal isOpen={meetingState === 'isJoiningMeeting'} onClose={() => setMeetingState(undefined)} title="Paste the link here" className="text-center" buttonText="Join Meeting" handleClick={() => router.push(values.link)}>
        <Input placeholder='Meeting Link' className='border-none bg-dark-3 focus-visible:ring-0 focus:visible:ring-offset-0' onChange={(e) => setValues({ ...values, link: e.target.value })} />
      </MeetingModal>
    </section>
  );
};

export default MeetingTypeList;
