import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@stream-io/video-react-sdk/dist/css/styles.css"
import "react-datepicker/dist/react-datepicker.css"
import {ClerkProvider} from "@clerk/nextjs"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yoom",
  description: "Video calling app",
  icons:{
    icon:"/icons/logo.svg"
  }
};
import { Toaster } from "@/components/ui/toaster";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{layout:{
      logoImageUrl:'/icons/yoom-logo.svg'
            }, variables:{colorText:'#fff',colorPrimary:'#0E78F9',colorBackground:'#1c1f2e',colorInputBackground:'#252a41',colorInputText:'#fff'}}}>
    <html lang="en">
     
      <body className={`${inter.className} bg-black `}>{children}
      <Toaster/>
      </body>

    </html>
    </ClerkProvider>
  );
}
