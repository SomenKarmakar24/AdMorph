"use client";
import React from "react";
import Image from "next/image";
import CompareSection from "./CompareSection";

export default function DemoSection() {
  return (
    <>
      <section className="relative py-20 px-6 md:px-12 bg-gradient-to-b from-transparent to-gray-900/20">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">
              See How Our AI Transforms Your Product Image
            </h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Watch the complete transformation from your original image to an
              enhanced AI version, and finally to a dynamic video advertisement.
            </p>
          </div>

          {/* Demo Steps - All in One Row */}
          <div className="relative bg-gradient-to-br from-gray-800/30 to-gray-900/50 rounded-3xl p-4 md:p-8 backdrop-blur-sm border border-gray-700/50 overflow-x-auto">
            <div className="flex items-center justify-between gap-8 md:gap-16 min-w-max mx-auto w-full max-w-6xl">
              {/* Step 1 - Original Image */}
              <div className="text-center flex-shrink-0">
                <div className="mb-4">
                  <h4 className="text-xl md:text-3xl font-bold text-white mb-1">
                    Step 1
                  </h4>
                  <p className="text-gray-300 text-sm md:text-base">
                    Original Image
                  </p>
                </div>
                <div className="relative">
                  <Image
                    src="/can-png.png"
                    alt="Original Fanta can image"
                    width={300}
                    height={400}
                    className="rounded-lg shadow-lg object-contain max-h-[280px] md:max-h-[400px] w-auto mx-auto"
                  />
                </div>
              </div>

              {/* Arrow 1 */}
              <div className="flex items-center justify-center flex-shrink-0">
                <svg
                  width="60"
                  height="20"
                  viewBox="0 0 60 20"
                  className="text-orange-500"
                >
                  <defs>
                    <marker
                      id="arrowhead1"
                      markerWidth="10"
                      markerHeight="7"
                      refX="9"
                      refY="3.5"
                      orient="auto"
                    >
                      <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                    </marker>
                  </defs>
                  <line
                    x1="5"
                    y1="10"
                    x2="50"
                    y2="10"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray="8,5"
                    markerEnd="url(#arrowhead1)"
                  />
                </svg>
              </div>

              {/* Step 2 - Enhanced AI Image */}
              <div className="text-center flex-shrink-0">
                <div className="mb-4">
                  <h4 className="text-xl md:text-3xl font-bold text-white mb-1">
                    Step 2
                  </h4>
                  <p className="text-gray-300 text-sm md:text-base">
                    Enhanced AI Image
                  </p>
                </div>
                <div className="relative">
                  <Image
                    src="/can-enhance.png"
                    alt="AI enhanced Fanta can image"
                    width={300}
                    height={400}
                    className="rounded-lg shadow-lg object-contain max-h-[280px] md:max-h-[400px] w-auto mx-auto"
                  />
                  <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-orange-500 text-white text-xs px-1 md:px-2 py-1 rounded-full font-semibold">
                    AI Enhanced
                  </div>
                </div>
              </div>

              {/* Arrow 2 */}
              <div className="flex items-center justify-center flex-shrink-0">
                <svg
                  width="60"
                  height="20"
                  viewBox="0 0 60 20"
                  className="text-purple-500"
                >
                  <defs>
                    <marker
                      id="arrowhead2"
                      markerWidth="10"
                      markerHeight="7"
                      refX="9"
                      refY="3.5"
                      orient="auto"
                    >
                      <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                    </marker>
                  </defs>
                  <line
                    x1="5"
                    y1="10"
                    x2="50"
                    y2="10"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray="8,5"
                    markerEnd="url(#arrowhead2)"
                  />
                </svg>
              </div>

              {/* Step 3 - AI Generated Video */}
              <div className="text-center flex-shrink-0">
                <div className="mb-4">
                  <h4 className="text-xl md:text-3xl font-bold text-white mb-1">
                    Step 3
                  </h4>
                  <p className="text-gray-300 text-sm md:text-base">
                    AI Generated Video
                  </p>
                </div>
                <div className="relative">
                  <video
                    className="rounded-lg shadow-lg max-h-[280px] md:max-h-[400px] w-auto mx-auto"
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="/can-enhance.png"
                    preload="auto"
                  >
                    <source src="/can-video-ai.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-purple-500 text-white text-xs px-1 md:px-2 py-1 rounded-full font-semibold">
                    AI Video
                  </div>
                </div>
              </div>
            </div>

            {/* Process Flow Description */}
            <div className="mt-12 text-center">
              <div className="bg-gray-800/50 rounded-2xl p-6 max-w-4xl mx-auto">
                <h5 className="text-lg font-semibold text-white mb-4">
                  Complete AI Transformation Process
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold">
                      1
                    </div>
                    <span className="text-gray-300">
                      Upload your product image
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                      2
                    </div>
                    <span className="text-gray-300">
                      AI enhances with effects & lighting
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      3
                    </div>
                    <span className="text-gray-300">
                      Generate dynamic video advertisement
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CompareSection />
    </>
  );
}
