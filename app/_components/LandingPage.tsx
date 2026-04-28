"use client";

import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Snowfall from "react-snowfall";

export default function Landingage() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden"
      style={{
        backgroundImage: "url('/bg-ad.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background overlay for text readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Animated background particles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-40 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
      </div>

      <Snowfall
        snowflakeCount={70} // 👈 much less
        speed={[0.3, 1.2]}
        wind={[-0.2, 0.6]}
        radius={[1.2, 2.5]} // keep modest size
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: 6,
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center px-6 md:px-12 py-6">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-8 w-8 text-orange-500" />
          <h1 className="text-4xl font-bold text-white">AdMorph</h1>
        </div>
        <Button
          onClick={() => router.push("/login")}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
        >
          Get Started
        </Button>
      </header>

      <div className="relative z-10 container mx-auto px-6 md:px-12">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-120px)] px-4 md:px-8">
          {/* Left Side */}
          <div className="space-y-8 px-4 md:px-6">
            <div>
              <h2 className="text-5xl md:text-7xl font-bold mb-6">
                Create your <span className="text-orange-500">Ads</span>.
              </h2>
              <h2 className="text-5xl md:text-7xl font-bold mb-8">
                Build for the <span className="text-white">Real World</span>.
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
                AI-powered ad generation should be fun and rewarding. We're here
                to help you achieve your marketing goals.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => router.push("/login")}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Start your journey
              </Button>

              <Button
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-800 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300"
              >
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-white mb-2">1000+</h3>
                <p className="text-gray-400 text-sm">Ads Generated</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-white mb-2">500+</h3>
                <p className="text-gray-400 text-sm">Happy Users</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-white mb-2">15+</h3>
                <p className="text-gray-400 text-sm">AI Tools</p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="relative max-w-sm mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <video
                className="w-full h-auto rounded-2xl"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              >
                <source src="/ad-demo-landing.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
