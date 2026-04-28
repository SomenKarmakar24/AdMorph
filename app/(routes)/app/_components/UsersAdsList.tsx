"use client";

import { useAuthContext } from "@/app/provider";
import { db } from "@/configs/firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { PreviewProduct } from "../../creative-ai-tools/_components/PreviewResult";
import { Play, Eye, Download, Layers, ArrowRight } from "lucide-react";
import Link from "next/link";

const UsersAdsList = () => {
  const [adsList, setAdsList] = useState<PreviewProduct[]>([]);
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user?.email) return;
    const q = query(
      collection(db, "user-ads"),
      where("userEmail", "==", user?.email),
    );

    const unSub = onSnapshot(q, (querySnapshot) => {
      const matchedDocs: any = [];
      querySnapshot.forEach((doc) => {
        matchedDocs.push({ id: doc.id, ...doc.data() });
      });
      matchedDocs.sort((a: any, b: any) => b.id.localeCompare(a.id));
      setAdsList(matchedDocs);
    });

    return () => unSub();
  }, [user?.email]);

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="hero-heading text-xl font-bold text-white/95 tracking-tight">
          Recent Creatives
        </h2>
        {adsList.length > 0 && (
          <Link
            href="/creative-ai-tools/product-images"
            className="flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      {adsList.length === 0 && (
        <div className="glass-panel rounded-2xl p-12 flex flex-col items-center animate-fade-in">
          <div className="w-18 h-18 rounded-2xl bg-gradient-to-br from-violet-500/15 to-indigo-500/10 flex items-center justify-center mb-5 shadow-lg shadow-violet-500/5 border border-violet-500/10 p-4">
            <Layers className="w-8 h-8 text-violet-400/60" />
          </div>
          <p className="text-gray-300 text-lg font-semibold mb-1.5">
            No ads created yet
          </p>
          <p className="text-gray-500 text-sm mb-5">
            Start creating stunning AI-powered ad creatives
          </p>
          <Link href={user ? "/creative-ai-tools/product-images" : "/login"}>
            <button className="btn-premium">
              <span>Create Your First Ad</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {adsList.map((ads, index) => (
          <div
            key={ads.id || index}
            className="media-card glass-card overflow-hidden group animate-fade-in"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <div className="relative overflow-hidden">
              <Image
                src={ads.finalProductImageUrl || "/placeholder.png"}
                alt="Generated product image"
                width={400}
                height={400}
                className="w-full object-cover h-[200px] lg:h-[280px] transition-transform duration-700 group-hover:scale-105"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-3">
                <div className="flex items-center gap-1.5">
                  <Link href={ads.finalProductImageUrl || "#"} target="_blank">
                    <button className="p-2 rounded-lg bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors">
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                  {ads.videoUrl && ads.videoUrl !== "" && (
                    <Link href={ads.videoUrl} target="_blank">
                      <button className="p-2 rounded-lg bg-blue-500/20 backdrop-blur-sm text-blue-300 hover:bg-blue-500/30 transition-colors">
                        <Play className="w-3.5 h-3.5" />
                      </button>
                    </Link>
                  )}
                </div>
              </div>

              {/* Video badge */}
              {ads.videoUrl && (
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-500/20 text-blue-300 backdrop-blur-sm border border-blue-500/20">
                    Video
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersAdsList;
