import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@stream-io/video-react-sdk/dist/css/styles.css"
import "react-datepicker/dist/react-datepicker.css"
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
    <html lang="en">
     
      <body className={`${inter.className} bg-dark-2 `}>{children}
      <Toaster/>
      </body>

    </html>
  );
}
