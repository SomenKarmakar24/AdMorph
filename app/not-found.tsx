"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <main className="w-full max-w-xl mx-auto text-center py-16">
        {/* Centered illustration - place the image at public/404-illustration.png */}
        <img
          src="/404-illustration.png"
          alt="404 illustration"
          className="mx-auto w-72 md:w-96 object-contain"
        />

        <button
          onClick={() => router.back()}
          className="mt-8 inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-lg shadow hover:bg-black transition"
        >
          Go back
        </button>
      </main>
    </div>
  );
}
