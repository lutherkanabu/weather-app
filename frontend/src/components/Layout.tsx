// src/components/Layout.tsx
"use client";
import React, { ReactNode } from 'react';
import Link from 'next/link';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-black bg-opacity-95 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] bg-[size:20px_20px] text-white">
      <header className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-amber-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-amber-200">Weather App</h1>
          </Link>
        </div>
      </header>
      <main className="container mx-auto p-4">
        {children}
      </main>
      <footer className="container mx-auto p-4 text-center text-gray-300 text-sm">
        <p>© {new Date().getFullYear()} Weather App - Built with Next.js and Laravel</p>
      </footer>
    </div>
  );
};

export default Layout;