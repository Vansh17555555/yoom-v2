import MyApp from '@/providers/StreamClientPrvider'
import React from 'react';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <MyApp>{children}</MyApp>
    </main>
  );
};

export default HomeLayout;