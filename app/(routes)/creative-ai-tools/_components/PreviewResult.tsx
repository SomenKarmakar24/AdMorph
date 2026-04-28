import { useAuthContext } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/configs/firebaseConfig";
import axios from "axios";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import {
  Download,
  Loader2Icon,
  LoaderCircle,
  Sparkle,
  Play,
  Pencil,
  Eye,
  Film,
  ImageIcon,
  Layers,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export type PreviewProduct = {
  id: string;
  finalProductImageUrl: string;
  productImageUrl: string;
  description: string;
  size: string;
  status: string;
  imageToVideoStatus: string;
  videoUrl: string;
  imageToVideoPrompt?: string;
};

const PreviewResult = ({
  activeTab = "images",
}: {
  activeTab?: "images" | "videos" | "recent";
}) => {
  const { user } = useAuthContext();
  const [productList, setProductList] = useState<PreviewProduct[]>();
  const [loading, setLoading] = useState(false);
  const [editingVideoPrompt, setEditingVideoPrompt] = useState<string | null>(
    null,
  );
  const [editedPrompts, setEditedPrompts] = useState<Record<string, string>>(
    {},
  );

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
      console.log("Product list:", matchedDocs);
      setProductList(matchedDocs);
    });

    return () => unSub();
  }, [user?.email]);

  const DownloadImage = async (imageUrl: string) => {
    const result = await fetch(imageUrl);
    const blob = await result.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.setAttribute("download", "admorph-creative");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(blobUrl);
  };

  const GenerateVideo = async (config: any) => {
    if (!config?.finalProductImageUrl || !config?.imageToVideoPrompt) {
      alert("Missing image URL or video prompt");
      return;
    }
    const videoPrompt = editedPrompts[config.id] || config.imageToVideoPrompt;
    setLoading(true);
    setEditingVideoPrompt(null);
    try {
      const result = await axios.post("/api/generate-product-video", {
        imageUrl: config?.finalProductImageUrl,
        imageToVideoPrompt: videoPrompt,
        uid: user?.uid,
        docId: config?.id,
      });
      console.log("Video generation started:", result.data);
    } catch (error: any) {
      console.error("Error generating video:", error);
      alert(error?.response?.data?.error || "Failed to generate video");
    } finally {
      setLoading(false);
    }
  };

  /* ── Filter products based on active tab ── */
  const filteredList = productList?.filter((p) => {
    if (activeTab === "videos") return !!p.videoUrl;
    if (activeTab === "recent") return true; // show all, sorted by newest
    return true; // "images" shows all
  });

  /* ── Empty State ── */
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div className="w-18 h-18 rounded-2xl bg-gradient-to-br from-violet-500/15 to-indigo-500/10 flex items-center justify-center mb-5 shadow-lg shadow-violet-500/5 border border-violet-500/10 p-4">
        <Layers className="w-8 h-8 text-violet-400/60" />
      </div>
      <h3 className="text-lg font-semibold text-gray-200 mb-1.5">
        No creatives yet
      </h3>
      <p className="text-sm text-gray-500 text-center max-w-[280px] leading-relaxed">
        Upload a product image and generate your first AI-powered ad creative
      </p>
    </div>
  );

  /* ── Loading Card ── */
  const LoadingCard = () => (
    <div className="media-card glass-card overflow-hidden animate-glow">
      <div className="h-[220px] bg-gradient-to-br from-violet-500/[0.06] to-indigo-500/[0.04] flex flex-col items-center justify-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-full border-2 border-violet-500/30 border-t-violet-400 animate-spin" />
          <Sparkle className="w-4 h-4 text-violet-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <p className="text-xs font-medium text-violet-300 animate-pulse">
          AI is creating magic...
        </p>
      </div>
    </div>
  );

  return (
    <div>
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          {activeTab === "videos" ? (
            <Film className="w-4 h-4 text-blue-400" />
          ) : (
            <ImageIcon className="w-4 h-4 text-violet-400" />
          )}
          <h2 className="font-semibold text-lg text-white capitalize">
            {activeTab === "recent" ? "Recent Creatives" : activeTab}
          </h2>
          {filteredList && (
            <span className="text-[10px] font-medium text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">
              {filteredList.length}
            </span>
          )}
        </div>
      </div>

      {/* ── Grid ── */}
      {filteredList && filteredList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredList.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {product?.status === "completed" ? (
                <div className="media-card glass-card overflow-hidden group transition-all duration-500">
                  {/* ── Image ── */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={product.finalProductImageUrl}
                      alt={product.description}
                      width={500}
                      height={500}
                      className="w-full h-[200px] object-cover"
                    />

                    {/* ── Overlay Actions ── */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-3">
                      <div className="flex items-center gap-1.5 w-full">
                        <button
                          onClick={() =>
                            DownloadImage(product.finalProductImageUrl)
                          }
                          className="p-2 rounded-lg bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
                          title="Download"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        <Link
                          href={product.finalProductImageUrl}
                          target="_blank"
                        >
                          <button
                            className="p-2 rounded-lg bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
                            title="View full"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </Link>
                        {product?.videoUrl && (
                          <Link href={product?.videoUrl} target="_blank">
                            <button
                              className="p-2 rounded-lg bg-blue-500/20 backdrop-blur-sm text-blue-300 hover:bg-blue-500/30 transition-colors"
                              title="Play video"
                            >
                              <Play className="w-3.5 h-3.5" />
                            </button>
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* ── Status Badges ── */}
                    {product?.videoUrl && (
                      <div className="absolute top-2 right-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-500/20 text-blue-300 backdrop-blur-sm border border-blue-500/20">
                          Video Ready
                        </span>
                      </div>
                    )}
                  </div>

                  {/* ── Card Footer ── */}
                  <div className="p-3 border-t border-white/5">
                    {!product?.videoUrl && product?.imageToVideoPrompt && (
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => {
                            if (editingVideoPrompt === product.id) {
                              setEditingVideoPrompt(null);
                            } else {
                              setEditingVideoPrompt(product.id);
                              if (!editedPrompts[product.id]) {
                                setEditedPrompts((prev) => ({
                                  ...prev,
                                  [product.id]:
                                    product.imageToVideoPrompt || "",
                                }));
                              }
                            }
                          }}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                          title="Edit video prompt"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>

                        <button
                          disabled={
                            product?.imageToVideoStatus === "pending" || loading
                          }
                          onClick={() => GenerateVideo(product)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                          {product?.imageToVideoStatus === "pending" ? (
                            <LoaderCircle className="w-3 h-3 animate-spin" />
                          ) : (
                            <Sparkle className="w-3 h-3" />
                          )}
                          Animate
                        </button>
                      </div>
                    )}

                    {product?.videoUrl && (
                      <p className="text-[10px] text-gray-500 text-center">
                        Image + Video generated
                      </p>
                    )}

                    {/* ── Editable Video Prompt ── */}
                    {editingVideoPrompt === product.id && (
                      <div className="mt-2 p-2.5 rounded-lg border border-blue-500/20 bg-blue-500/[0.03] animate-fade-in">
                        <h4 className="text-[10px] font-semibold mb-1.5 text-blue-300">
                          Video Prompt
                        </h4>
                        <Textarea
                          value={
                            editedPrompts[product.id] ||
                            product.imageToVideoPrompt ||
                            ""
                          }
                          onChange={(e) =>
                            setEditedPrompts((prev) => ({
                              ...prev,
                              [product.id]: e.target.value,
                            }))
                          }
                          className="min-h-[60px] text-xs bg-transparent border-white/5 resize-none"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <LoadingCard />
              )}
            </div>
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default PreviewResult;
