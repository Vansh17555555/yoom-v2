"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from './FeatureSection.module.css';
const features = [
  {
    id: 1,
    title: 'Video Conference',
    description: 'A video conference is a live, virtual meeting that connects two or more people in different locations through video and audio feeds. It allows participants to interact with each other in real-time, using cameras, microphones, and screens.',
    image: 'https://www.appliedglobal.com/wp-content/uploads/Understanding-the-3-Types-of-Video-Conferencing-Systems-1.png',
    link: 'https://www.appliedglobal.com/understanding-the-3-types-of-video-conferencing-systems/',
    reverse: false,
  },
  {
    id: 2,
    title: 'Scheduling a Meeting',
    description: 'Scheduling a meeting involves planning and arranging a gathering of individuals at a specific time and date to discuss a particular topic or agenda. It is an essential step in organizing a meeting, ensuring that all participants are aware of the meeting details and can prepare accordingly.',
    image: 'https://cdn.sanity.io/images/grix75fu/production/0071a80a9ccd69171d99461c3e1042734bfa269f-1536x805.jpg',
    link: 'https://example.com/feature2',
    reverse: true,
  },
  {
    id: 3,
    title: 'Video Recording',
    description: 'Video recording involves capturing and storing video content for future reference, analysis, or sharing. It is a common feature in video conferencing platforms, allowing users to record meetings, presentations, and other events.',
    image: 'https://cdn.staticont.net/pages/0023/48/be1a3123a7f50c441fe7780a80710f1bd04093af.webp',
    link: 'https://example.com/feature3',
    reverse: false,
  },
  {
    id: 4,
    title: 'Upcoming and Previous Meeting',
    description: 'To view upcoming meeting , you need to sign in to your video conferencing platform, navigate to the "Meetings" or "Calendar" tab, view a list of upcoming meetings, and click on a meeting to view its description, agenda, and other details. Similarly, to view past meeting descriptions, you need to sign in to your video conferencing platform, navigate to the "Meetings" or "Calendar" tab, view a list of previous meetings, and click on a meeting to view its description, recording, and other details. If you have any further questions or need help with anything else, feel free to ask.',
    image: 'https://amchamindia.com/wp-content/uploads/2024/08/Meeting-2.jpg',
    link: 'https://example.com/feature4',
    reverse: true,
  },
];

const FeatureSection: React.FC = () => {
  return (
    <section
      id="features"
      style={{
        padding: '4rem 0',
        backgroundColor: '#E0E0E0',
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        textAlign: 'center',
      }}
    >
      <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#333' }}>
        Features
      </h2>

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem',
        }}
      >
        {features.map((feature) => (
          <div
            key={feature.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '4rem',
              width: '100%',
              transition: 'all 0.3s ease-in-out',
              flexDirection: feature.reverse ? 'row-reverse' : 'row',
            }}
          >
            <a
              href={feature.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: '40%' }}
            >
              <motion.img
                src={feature.image}
                alt={feature.title}
                className={styles.featureImage} // Use CSS Module class
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            </a>
            <div style={{ width: '50%', padding: '1rem' }}>
              <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#000' }}>{feature.title}</h3>
              <p style={{ fontSize: '1.2rem', color: '#555' }}>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
