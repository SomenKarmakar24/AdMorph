"use client";

import React from "react";
import {
  HelpCircle,
  BookOpen,
  MessageCircle,
  ExternalLink,
} from "lucide-react";

const HelpPage = () => {
  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <h1 className="hero-heading text-2xl font-bold bg-gradient-to-r from-violet-300 via-purple-300 to-indigo-400 bg-clip-text text-transparent mb-8">
        Help Center
      </h1>

      <div className="space-y-4">
        {[
          {
            icon: BookOpen,
            title: "Documentation",
            desc: "Learn how to use AdMorph AI tools",
            color: "text-violet-400",
          },
          {
            icon: MessageCircle,
            title: "Contact Support",
            desc: "Get help from our team",
            color: "text-blue-400",
          },
          {
            icon: HelpCircle,
            title: "FAQ",
            desc: "Frequently asked questions",
            color: "text-green-400",
          },
          {
            icon: ExternalLink,
            title: "Community",
            desc: "Join the AdMorph community",
            color: "text-orange-400",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="glass-card rounded-xl p-4 flex items-center gap-4 cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] flex items-center justify-center border border-white/[0.06] shadow-lg shadow-black/10">
              <item.icon
                className={`w-5 h-5 ${item.color} drop-shadow-[0_0_4px_rgba(139,92,246,0.2)]`}
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpPage;
