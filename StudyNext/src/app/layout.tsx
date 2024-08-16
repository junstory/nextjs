//"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { revalidateTag } from "next/cache";
import Control from "../components/control";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Study",
  description: "Generated by junstory",
};


type Post = {
	id: string
	title: string
	body: string
}
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //const [topics, setTopics] = useState([]);
  // useEffect(()=>{
  //   fetch('http://localhost:9999/topics')
  //   .then(res=>res.json)
  //   .then(result=>{

  //   });
  // },[]);
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL +'topics', {cache: "no-store"});
  const topics:Post[] = await res.json();
  return (
    <html lang="en">
      <body className={inter.className}>
      <h1><Link href="/">WEB</Link></h1>
      <ol>
        {topics.map(topic=>{
          return <li key= {topic.id}><Link href={`/read/${topic.id}`}>{topic.title}</Link></li>
        })}
        {/* <li><Link href="/read/1">html</Link></li>
        <li><Link href="/read/2">css</Link></li> */}
      </ol>
        {children}
      <Control />  
      </body>
    </html>
  );
}
