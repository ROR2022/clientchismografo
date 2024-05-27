
//"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import { MyProvider } from "@/context/MyContext";
import dynamic from 'next/dynamic'
const ChismeHeader= dynamic(()=>import('@/components/ChismeHeader/ChismeHeader'),{ssr:false})
const ChismeFooter= dynamic(()=>import('@/components/ChismeFooter/ChismeFooter'),{ssr:false})




const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gossip RorApp",
  description: "Basic Example Social App Next.js Nest.js",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MyProvider>
          <ChismeHeader/>
        {children}
        <ChismeFooter/>
        </MyProvider>
        </body>
    </html>
  );
}
