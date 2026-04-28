"use client";
import { Sparkles } from "lucide-react";
import DemoSection from "./_components/DemoSection";
import FeaturesSection from "./_components/FeaturesSection";
import LandingPage from "./_components/LandingPage";

export default function Home() {
  // Always show the landing page - no redirects or auth checks
  // Users can navigate to /app or /login manually if they want

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-900/20 to-black text-white relative overflow-hidden">
      {/* Background gradient */}

      <LandingPage />
      {/* Demo Section */}
      <DemoSection />

      {/* Features Section with Curved Timeline */}
      <FeaturesSection />

      {/* Footer */}
      <footer className="relative z-10 text-center py-12 px-6 border-t border-gray-800">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Sparkles className="h-6 w-6 text-orange-500" />
          <span className="text-lg font-semibold">AdGenAI</span>
        </div>
        <p className="text-gray-400 text-sm">
          © 2025 AdGenAI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
