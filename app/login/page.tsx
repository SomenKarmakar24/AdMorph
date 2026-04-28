"use client";
import { LoginForm } from "@/components/login-form";
import { useAuthContext } from "../provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    // If user is already authenticated, redirect to app
    if (!loading && user) {
      router.replace("/app");
    }
  }, [user, loading, router]);

  // Show loading while auth is being checked
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Don't show login page if user is already authenticated
  if (user) {
    return null;
  }

  return (
    <div
      className="relative flex min-h-svh flex-col items-center justify-center p-6 md:p-10"
      style={{
        backgroundImage: "url('/bg-login2.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      <div className="w-full max-w-sm md:max-w-3xl relative z-10">
        <LoginForm />
      </div>
    </div>
  );
}
