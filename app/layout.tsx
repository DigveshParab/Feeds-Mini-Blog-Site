import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata: Metadata = {
  title: "Feed",
  description: "A modern blogging platform built with Next.js and MongoDB.",
  authors: [{ name: "Digvesh", url: "https://digveshparab-portfolio.netlify.app/" }],
  openGraph:{
    title: "MyApp",
    description: "A modern blogging platform built with Next.js and MongoDB.",
    siteName: "Feed",
    locale: "en_US",
    type: "website",
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <AuthProvider>
          <ProtectedRoute>
            <Navbar/>
            {children}
          </ProtectedRoute>
        </AuthProvider>
      </body>
    </html>
  );
}
