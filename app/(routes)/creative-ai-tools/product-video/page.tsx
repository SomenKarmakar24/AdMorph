"use client";

import React from "react";
import PreviewResult from "../_components/PreviewResult";

const ProductVideoPage = () => {
  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-2xl p-6">
        <h2 className="hero-heading text-2xl font-bold bg-gradient-to-r from-blue-300 via-violet-300 to-indigo-400 bg-clip-text text-transparent">
          AI Product Video
        </h2>
        <p className="text-sm text-gray-400/80 mt-2 tracking-wide">
          Select an image you generated with flux, then click Animate to turn it
          into a video.
        </p>
      </div>

      <div className="glass-panel rounded-2xl p-5">
        <PreviewResult />
      </div>
    </div>
  );
};

export default ProductVideoPage;
