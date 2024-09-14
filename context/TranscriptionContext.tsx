"use client"
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the context type
interface TranscriptionContextType {
  transcriptionText: string;
  setTranscriptionText: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context with an initial value of undefined
const TranscriptionContext = createContext<TranscriptionContextType | undefined>(undefined);

// Hook to use the TranscriptionContext, throwing an error if used outside the provider
export const useTranscription = () => {
  const context = useContext(TranscriptionContext);
  if (!context) {
    throw new Error('useTranscription must be used within a TranscriptionProvider');
  }
  return context;
};

// Define the props for TranscriptionProvider
interface TranscriptionProviderProps {
  children: ReactNode;
}

// The TranscriptionProvider component that provides the context to its children
export const TranscriptionProvider: React.FC<TranscriptionProviderProps> = ({ children }) => {
  const [transcriptionText, setTranscriptionText] = useState<string>('');

  // Return the provider, passing down the context value to children
  return (
    <TranscriptionContext.Provider value={{ transcriptionText, setTranscriptionText }}>
      {children}
    </TranscriptionContext.Provider>
  );
};
