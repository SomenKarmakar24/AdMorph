"use client";

import React from "react";
import { ImageIcon, Film, UserCircle, ArrowRight } from "lucide-react";

const AiTools = [
  {
    name: "AI Product Images",
    desc: "Generate high-quality, professional product images with AI-powered backgrounds and styling.",
    bannerImage: "/product-image.png",
    path: "/creative-ai-tools/product-images",
    gradient: "from-violet-600 to-indigo-600",
    iconGradient: "from-violet-500/20 to-indigo-500/20",
    icon: ImageIcon,
  },
  {
    name: "AI Product Video",
    desc: "Create engaging product showcase videos with cinematic motion and effects.",
    bannerImage: "/product-video.png",
    path: "/creative-ai-tools/product-video",
    gradient: "from-blue-600 to-cyan-600",
    iconGradient: "from-blue-500/20 to-cyan-500/20",
    icon: Film,
  },
  {
    name: "AI Avatar Ads",
    desc: "Bring your products to life with AI-generated avatar presenters.",
    bannerImage: "/product-avatar.png",
    path: "/creative-ai-tools/product-avatar",
    gradient: "from-pink-600 to-rose-600",
    iconGradient: "from-pink-500/20 to-rose-500/20",
    icon: UserCircle,
  },
];

import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "@/app/provider";

const AiToolList = () => {
  const { user } = useAuthContext();
  return (
    <div>
      <div className="mb-8">
        <h2 className="hero-heading text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-300 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
          Creative AI Tools
        </h2>
        <p className="text-sm text-gray-400/80 mt-2 tracking-wide">
          Choose a tool to start creating stunning ad creatives
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {AiTools.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <Link key={index} href={user ? tool.path : "/login"}>
              <div
                className="glass-card rounded-2xl p-6 cursor-pointer group h-full relative overflow-hidden animate-border-glow"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background glow */}
                <div
                  className={`absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br ${tool.gradient} opacity-[0.08] rounded-full blur-3xl group-hover:opacity-[0.18] transition-opacity duration-700`}
                />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.iconGradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-violet-500/5`}
                  >
                    <Icon className="w-5 h-5 text-white drop-shadow-[0_0_4px_rgba(139,92,246,0.4)]" />
                  </div>

                  {/* Text */}
                  <h3 className="text-lg font-bold text-white/95 mb-2 tracking-tight">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-gray-400/80 leading-relaxed flex-1">
                    {tool.desc}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-2 mt-5 text-sm font-semibold text-violet-400 group-hover:text-violet-300 transition-colors">
                    <span>Create Now</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </div>

                {/* Product preview image */}
                <div className="absolute bottom-0 right-0 w-[120px] h-[120px] opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <Image
                    src={tool.bannerImage}
                    alt={tool.name}
                    width={120}
                    height={120}
                    className="object-contain"
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AiToolList;
