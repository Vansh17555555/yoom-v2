"use client";
import React, { useEffect, useState } from 'react';
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
  useChatContext,
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/index.css';
import { useUser } from '@clerk/nextjs';
import Loader from '@/components/Loader';
import type { Channel as ChannelType } from 'stream-chat';

interface ChatComponentProps {
  callId: string;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ callId }) => {
  const { user } = useUser();
  const { client } = useChatContext();
  const [channel, setChannel] = useState<ChannelType | null>(null);

  useEffect(() => {
    if (!user || !client) return;

    const setupChat = async () => {
      const channel = client.channel('messaging', callId, {
        name: `Video Call`,
        members: [user.id],
      });

      await channel.watch();
      setChannel(channel);
    };

    setupChat();

    return () => {
      if (channel) {
        channel.stopWatching();
      }
    };
  }, [user, client, callId]);

  if (!channel) return <Loader />;

  return (
    <Chat client={client} theme="messaging light">
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <div style={{ marginBottom: '30px', marginTop: '-40px !important' }}> 
            <MessageInput />
          </div>
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default ChatComponent;
