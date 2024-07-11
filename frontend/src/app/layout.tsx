"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import ParentProvider from "@/ParentProvider";
import Header from "@/components/header/header";
import { useEffect } from "react";
import axiosInstance from "@/axiosInstance";
import { useUser } from "@/context/AuthContext";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ParentProvider><Header />{children}</ParentProvider>
      </body>
    </html>
  );
}
