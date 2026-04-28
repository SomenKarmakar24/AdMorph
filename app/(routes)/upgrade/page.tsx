"use client";

import React from "react";
import { Crown, Zap, Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    desc: "Get started with basic AI ad generation",
    features: [
      "10 AI credits/month",
      "Basic image generation",
      "720p video export",
      "Community support",
    ],
    current: true,
    gradient: "from-gray-600 to-gray-700",
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    desc: "For creators who need more power",
    features: [
      "100 AI credits/month",
      "HD image generation",
      "1080p video export",
      "Priority support",
      "Custom prompts",
      "Avatar ads",
    ],
    popular: true,
    gradient: "from-violet-600 to-indigo-600",
  },
  {
    name: "Enterprise",
    price: "$49",
    period: "/month",
    desc: "For teams and agencies",
    features: [
      "Unlimited credits",
      "4K image generation",
      "4K video export",
      "Dedicated support",
      "API access",
      "Team collaboration",
      "Custom branding",
    ],
    gradient: "from-amber-500 to-orange-600",
  },
];

const UpgradePage = () => {
  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium mb-5 shadow-lg shadow-violet-500/5">
          <Crown className="w-3.5 h-3.5" />
          Pricing
        </div>
        <h1 className="hero-heading text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-300 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
          Upgrade Your Plan
        </h1>
        <p className="text-gray-400/80 mt-3 tracking-wide">
          Unlock more AI power for your ad creatives
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`glass-card rounded-2xl p-7 relative ${plan.popular ? "ring-2 ring-violet-500/40 shadow-xl shadow-violet-500/10" : ""}  `}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-violet-500/20">
                Most Popular
              </div>
            )}
            <h3 className="text-lg font-bold text-white/95">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mt-3">
              <span className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {plan.price}
              </span>
              <span className="text-sm text-gray-500">{plan.period}</span>
            </div>
            <p className="text-xs text-gray-400/80 mt-2">{plan.desc}</p>

            <div className="space-y-2 mt-5">
              {plan.features.map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-sm text-gray-300">{f}</span>
                </div>
              ))}
            </div>

            <button
              className={`w-full mt-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                plan.current
                  ? "bg-white/5 text-gray-400 border border-white/10 cursor-default"
                  : "btn-premium"
              }`}
            >
              {plan.current ? "Current Plan" : "Upgrade"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpgradePage;
