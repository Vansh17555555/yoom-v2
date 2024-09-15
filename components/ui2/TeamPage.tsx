import React from 'react';
import Image from 'next/image';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const teamMembers = [
  {
    id: 2,
    name: 'Shivam Singh',
    role: 'Lead Developer',
    image: '/WhatsApp Unknown 2024-09-10 at 3.52.40 PM/WhatsApp Image 2024-09-10 at 3.44.00 PM.jpeg',
    linkedin: 'https://www.linkedin.com/in/komal-a2392624a/',
    github: 'https://github.com/KomalSrivastava',
    twitter: '',
    profile: '',
  },
  {
    id: 3,
    name: 'Vansh Verma',
    role: 'Backend Developer',
    image: '/WhatsApp Unknown 2024-09-10 at 3.52.40 PM/WhatsApp Image 2024-09-10 at 3.43.59 PM (1).jpeg',
    linkedin: 'https://www.linkedin.com/in/shivansh-mahajan-13227824a/',
    github: 'https://github.com/shivansh-2003',
    twitter: '',
    profile: '',
  },
  {
    id: 4,
    name: 'Komal',
    role: 'Frontend Developer',
    image: '/WhatsApp Unknown 2024-09-10 at 3.52.40 PM/WhatsApp Image 2024-09-10 at 3.43.59 PM.jpeg',
    linkedin: 'https://www.linkedin.com/in/vansh-verma-b48290293',
    github: 'www.github.com/Vansh17555555',
    twitter: '',
    profile: '',
  },
  {
    id: 1,
    name: 'Shivansh Mahajan',
    role: 'AI/ML',
    image: '/WhatsApp Unknown 2024-09-10 at 3.52.40 PM/WhatsApp Image 2024-09-10 at 3.43.59 PM(1).jpeg',
    linkedin: 'https://www.linkedin.com/in/komal-a2392624a/',
    github: 'https://github.com/KomalSrivastava',
    twitter: '',
    profile: '',
  },
];

const TeamPage = () => {
  return (
    <div className="bg-white min-h-screen py-12 px-6 flex flex-col items-center" id="team">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Meet Our Team</h1>
        <p className="text-lg text-gray-700">Get to know the talented individuals behind our project.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="w-full max-w-xs mx-auto group"
          >
            <div className="relative bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform group-hover:scale-105 h-96">
              <Image
                src={member.image}
                alt={member.name}
                width={400}
                height={400}
                layout="responsive"
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:opacity-70"
              />
              <div className="absolute inset-0 bg-gray-600 opacity-0 group-hover:opacity-90 flex flex-col items-center justify-center transition-opacity duration-300 ease-in-out p-4">
                <h2 className="text-white text-lg font-semibold mb-1 transition-transform transform group-hover:translate-y-[-5px]">
                  {member.name}
                </h2>
                <p className="text-white text-sm mb-2">{member.role}</p>
                <div className="flex space-x-3">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-blue-300"
                    >
                      <FaLinkedin className="text-lg" />
                    </a>
                  )}
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-gray-300"
                    >
                      <FaGithub className="text-lg" />
                    </a>
                  )}
                  {member.twitter && (
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-blue-300"
                    >
                      <FaTwitter className="text-lg" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
