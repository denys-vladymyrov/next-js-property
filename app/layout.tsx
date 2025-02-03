import type { Metadata } from "next";
import { ToastContainer } from 'react-toastify';
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from '@/components/AuthProvider';
import { GlobalProvider } from "@/context/GlobalContext";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: 'Property',
  description: 'Find The Perfect Rental Property',
  keywords: 'rental, property, real estate',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <AuthProvider>
        <GlobalProvider>
          <html lang="en">
            <body
              className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
              <Navbar />
              <main>{children}</main>
              <Footer />
              <ToastContainer />
            </body>
          </html>
        </GlobalProvider>
      </AuthProvider>
  );
}
