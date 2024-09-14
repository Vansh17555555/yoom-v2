"use client";

import { useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { SignedOut } from "@clerk/nextjs";

const Profile = () => {
  const { user, isLoaded } = useUser();

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
              {/* Add your transcripts logic here */}
              <p className="text-gray-600 italic">No transcripts available yet.</p>
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