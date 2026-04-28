"use client";
import React, { useEffect } from "react";
import { useAuthContext } from "../provider";
import { useRouter } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import axios from "axios";
import AppHeader from "../_components/AppHeader";
import { AppSidebar } from "../_components/AppSidebar";

function AppProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // Wait for auth to load

    // If no user is authenticated, redirect to landing page
    if (!user) {
      router.replace("/");
      return;
    }

    // If user is authenticated, check/create user in database
    checkUser();
  }, [user, loading]);

  const checkUser = async () => {
    try {
      const result = await axios.post("/api/user", {
        userName: user?.displayName,
        userEmail: user?.email,
      });
      console.log(user);
    } catch (error) {
      console.error("Failed to check/create user:", error);
    }
  };

  // Show loading screen while auth is being checked
  if (loading) {
    return (
      <div className="min-h-screen app-background flex items-center justify-center">
        <div className="bg-orb bg-orb-purple" />
        <div className="bg-orb bg-orb-blue" />
        <div className="flex flex-col items-center gap-5 relative z-10">
          <div className="relative">
            <div className="w-14 h-14 rounded-full border-2 border-violet-500/30 border-t-violet-400 animate-spin" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 animate-pulse shadow-lg shadow-violet-500/30" />
          </div>
          <p className="text-sm text-gray-400 font-medium tracking-wide">
            Loading studio...
          </p>
        </div>
      </div>
    );
  }

  // If no user after loading, don't render anything (redirect will happen)
  if (!user) {
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full app-background">
        {/* Decorative background orbs */}
        <div className="bg-orb bg-orb-purple" />
        <div className="bg-orb bg-orb-blue" />
        <div className="bg-orb bg-orb-indigo" />

        <AppHeader />
        {/* <SidebarTrigger /> */}
        <div className="relative z-10 p-10">{children}</div>
      </main>
    </SidebarProvider>
  );
}

export default AppProvider;
