"use client";
import React from "react";
import {
  Target,
  Sparkles,
  Zap,
  TrendingUp,
  BarChart3,
  Edit,
} from "lucide-react";

const features = [
  {
    id: 1,
    title: "Smart AI Analysis",
    description:
      "Our AI analyzes your product images and creates compelling visual narratives that capture attention instantly.",
    icon: Target,
    color: "blue" as const,
    position: { x: 15, y: 85 },
  },
  {
    id: 2,
    title: "Creative Enhancement",
    description:
      "Transform ordinary product photos into stunning marketing visuals with advanced AI-powered image processing.",
    icon: Sparkles,
    color: "purple" as const,
    position: { x: 44, y: 35 },
  },
  {
    id: 3,
    title: "Video Generation",
    description:
      "Generate dynamic video advertisements that bring your products to life with smooth animations and effects.",
    icon: Edit,
    color: "orange" as const,
    position: { x: 70, y: 30 },
  },
  {
    id: 4,
    title: "Performance Analytics",
    description:
      "Track engagement, conversion rates, and optimize your campaigns with real-time analytics and insights.",
    icon: TrendingUp,
    color: "green" as const,
    position: { x: 85, y: 65 },
  },
];

const colorClasses = {
  blue: {
    bg: "bg-blue-500/20",
    hoverBg: "hover:bg-blue-500/30",
    text: "text-blue-500",
    dot: "bg-blue-500",
  },
  purple: {
    bg: "bg-purple-500/20",
    hoverBg: "hover:bg-purple-500/30",
    text: "text-purple-500",
    dot: "bg-purple-500",
  },
  orange: {
    bg: "bg-orange-500/20",
    hoverBg: "hover:bg-orange-500/30",
    text: "text-orange-500",
    dot: "bg-orange-500",
  },
  green: {
    bg: "bg-green-500/20",
    hoverBg: "hover:bg-green-500/30",
    text: "text-green-500",
    dot: "bg-green-500",
  },
};

export default function FeaturesSection() {
  return (
    <section className="relative py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-32">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            We have the best tools
            <br />
            and best process
          </h3>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Yet best any for travelling assistance indulgence unpleasing. Not
            thoughts all exercise blessing. Indulgence way everything joy.
          </p>
        </div>

        {/* Features with Curved Timeline */}
        <div className="relative min-h-[700px] md:min-h-[600px]">
          {/* SVG Curved Path */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 15 85 Q 25 65, 35 45 T 65 25 Q 75 35, 85 65"
              stroke="#f97316"
              strokeWidth="0.3"
              fill="none"
              strokeDasharray="2,1"
              opacity="0.7"
            />
          </svg>

          {/* Feature Points */}
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colors = colorClasses[feature.color];

            return (
              <div
                key={feature.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${feature.position.x}%`,
                  top: `${feature.position.y}%`,
                }}
              >
                {/* Connection Dot */}
                <div
                  className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 ${colors.dot} rounded-full z-10`}
                ></div>

                {/* Feature Card */}
                <div
                  className={`
                  ${
                    index % 2 === 0
                      ? "translate-y-[-140px]"
                      : "translate-y-[80px]"
                  }
                  ${index === 0 ? "translate-x-[-50px]" : ""}
                  ${index === 3 ? "translate-x-[50px]" : ""}
                  bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 max-w-xs w-72
                  hover:bg-gray-800/80 hover:border-gray-600/50 transition-all duration-300
                  hover:transform hover:scale-105
                `}
                >
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 ${colors.bg} ${colors.hoverBg} rounded-xl flex items-center justify-center mb-4 transition-all`}
                  >
                    <Icon className={`h-6 w-6 ${colors.text}`} />
                  </div>

                  {/* Content */}
                  <h4 className={`text-lg font-bold ${colors.text} mb-3`}>
                    {feature.title}
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
