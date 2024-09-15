"use client";

import { useState, useEffect } from "react";
import { UserButton, useUser, SignedOut } from "@clerk/nextjs";

interface Transcription {
  _id: string;
  fileName: string;
  content: string;
  uploadDate: string;
}

const Profile = () => {
  const { user, isLoaded } = useUser();
  const [transcriptions, setTranscriptions] = useState<Transcription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTranscriptions = async () => {
      try {
        const response = await fetch(`/api/upload-transcription`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-User-Id': user?.id || '',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch transcriptions');
        }

        const data = await response.json();
        setTranscriptions(data.transcriptions || []);
      } catch (error: any) {
        console.error('Error fetching transcriptions:', error);
        setError('Error fetching transcriptions');
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchTranscriptions();
    }
  }, [user?.id]);

  const downloadFile = (fileName: string, content: string) => {
    // Create a Blob from the content
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a link element
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    
    // Append to the DOM and trigger click
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8 sm:p-10">
          <h1 className="text-3xl font-extrabold text-white text-center">User Profile</h1>
        </div>
        <div className="px-6 py-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <UserButton />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {user?.username || user?.fullName || 'Anonymous User'}
            </h2>
            <p className="text-gray-600 mt-2">{user?.primaryEmailAddress?.emailAddress}</p>
          </div>
          
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Transcripts</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              {loading ? (
                <p className="text-gray-600 italic">Loading transcripts...</p>
              ) : error ? (
                <p className="text-red-600 italic">{error}</p>
              ) : transcriptions.length === 0 ? (
                <p className="text-gray-600 italic">No transcripts available yet.</p>
              ) : (
                <ul className="space-y-4">
                  {transcriptions.map((transcription) => (
                    <li key={transcription._id} className="border-b border-gray-200 py-2 flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold">{transcription.fileName}</h3>
                        <p className="text-gray-600 mt-1">{transcription.content}</p>
                        <p className="text-gray-500 mt-1">Uploaded on {new Date(transcription.uploadDate).toLocaleDateString()}</p>
                      </div>
                      <button
                        onClick={() => downloadFile(transcription.fileName, transcription.content)}
                        className="ml-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                      >
                        Download
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-8 sm:p-10 text-center">
          <SignedOut>
            <p className="text-lg text-gray-700">You are signed out. Please sign in to view your profile.</p>
          </SignedOut>
        </div>
      </div>
    </div>
  );
};

export default Profile;
