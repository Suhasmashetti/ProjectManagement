"use client";
import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar"
import Sidebar from '../components/Sidebar';
import StoreProvider, { useAppSelector } from './redux';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      if(isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [isDarkMode, isHydrated]);

  // Prevent hydration mismatch by showing loading state until hydrated
  if (!isHydrated) {
    return (
      <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-500" />
      </div>
    );
  }
  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className={`flex flex-col w-full bg-gray-50 dark:bg-gray-900 ${ isSidebarCollapsed ? "" : "md:pl-64"}`}>
        <Navbar />
        <div className="p-4">{children}</div>
      </main>
    </div>
  )
};

const DashboardWrapper = ({ children }: { children: React.ReactNode}) => {
  return (
    <StoreProvider> 
      <DashboardLayout>{ children }</DashboardLayout>
    </StoreProvider>
  )
}

export default DashboardWrapper
