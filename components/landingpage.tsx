import React from 'react';
import DotLottiePlayer from './ui2/DotLottiePlayer';
import { Spotlight } from '@/components/ui2/Spotlight';
import { TextGenerateEffect } from '@/components/ui2/TextGenerateEffect';
import MagicButton from '@/components/ui2/MagicButton';
import { MdOutlineStart } from 'react-icons/md';

const LandingPage: React.FC = () => {
  return (
    <div className="pb-20 pt-36">
      <div>
        <Spotlight className="-top-20 -left-10 md:-left-32 md:-top-20 h-screen" fill='white' />
        <Spotlight className="-top-10 left-full h-[80vh] w-[50vw]" fill='purple' />
        <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill='blue' />
      </div>

      <div className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black/[0.2] flex items-center justify-center absolute top-0 left-0">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"/>
      </div>

      <div className="flex justify-center items-center relative h-full z-10">
        <div className='max-w-[95vw] md:max-w-2xl lg:max-w-[70vw] flex flex-col lg:flex-row items-center justify-between w-full'>
          
          <div className="flex-shrink-0 flex items-center justify-center h-full lg:mr-8 lg:w-1/2" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <DotLottiePlayer src="https://lottie.host/359b4814-1e81-46b8-9fbc-4a3131cc5417/hX0smCX1Ug.json" />
          </div>

          <div className='mt-8 lg:mt-0 lg:ml-8 max-w-full flex flex-col items-center justify-center lg:w-1/2'>
            <h2 className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-full lg:max-w-[80%]">
              YOOM ChatBot...
            </h2>
            <TextGenerateEffect
              className="text-center text-2xl md:text-3xl lg:text-5xl xl:text-6xl"
              words="Yoom is a versatile video conferencing platform that offers seamless virtual meetings, screen sharing, and collaborative tools"
            />
            <p className='text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl'>
              Hi, Start Your Meeting by clicking this Button.
            </p>
            <a href="/dashboard" className='w-full flex justify-center'>
              <MagicButton
                title="Meeting"
                icon={<MdOutlineStart />}
                position='right'
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
