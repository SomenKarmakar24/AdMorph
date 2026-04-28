"use client";

import React, { useEffect, useState } from "react";
import FormInput from "../_components/FormInput";
import PreviewResult from "../_components/PreviewResult";
import axios from "axios";
import { useAuthContext } from "@/app/provider";
import { useRouter } from "next/navigation";
import {
  Upload,
  Sparkles,
  ImageIcon,
  Film,
  CheckCircle2,
  Loader2,
  Wand2,
  CloudUpload,
  Lightbulb,
} from "lucide-react";

type FormDataType = {
  file?: File;
  description: string;
  size: string;
  imageUrl?: string;
  avatar?: string;
};

type PromptData = {
  docId: string;
  imageKitUrl: string;
  textToImagePrompt: string;
  imageToVideoPrompt: string;
};

/* ── Progress Tracker Steps ── */
const progressSteps = [
  { key: "upload", label: "Upload", icon: Upload },
  { key: "prompt", label: "AI Prompt", icon: Sparkles },
  { key: "review", label: "Review", icon: Wand2 },
  { key: "image", label: "Image Gen", icon: ImageIcon },
  { key: "complete", label: "Complete", icon: CheckCircle2 },
];

/* ── AI Suggestion Chips ── */
const aiSuggestions = [
  "Add warm cinematic lighting",
  "Use luxury studio background",
  "Include lifestyle model",
  "Increase product focus",
  "Add promotional text space",
  "Use vibrant neon tones",
  "Add water splash effects",
  "Minimal clean background",
];

const ProductImages = ({ title, enableAvatar }: any) => {
  const [formData, setFormData] = useState<FormDataType>({
    description: "",
    size: "",
  });

  const [loading, setLoading] = useState(false);
  const [generatingPrompt, setGeneratingPrompt] = useState(false);
  const [promptData, setPromptData] = useState<PromptData | null>(null);
  const [activeTab, setActiveTab] = useState<"images" | "videos" | "recent">(
    "images",
  );
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  /* ── Determine current progress step ── */
  const getCurrentStep = () => {
    if (loading) return "image";
    if (promptData) return "review";
    if (generatingPrompt) return "prompt";
    return "upload";
  };

  const currentStep = getCurrentStep();

  const onHandleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Step 1: Generate prompts only (upload + OpenAI)
  const OnGeneratePrompts = async () => {
    if (!formData.file && !formData.imageUrl) {
      alert("Please upload a product image or select a sample");
      return;
    }
    if (!formData.description || !formData.size) {
      alert("Enter all fields");
      return;
    }
    if (!user?.email) {
      alert("User not logged in");
      return;
    }

    setGeneratingPrompt(true);

    const formData_ = new FormData();
    if (formData.file) formData_.append("file", formData.file);
    if (formData.imageUrl) formData_.append("imageUrl", formData.imageUrl);
    formData_.append("description", formData.description);
    formData_.append("size", formData.size);
    formData_.append("userEmail", user.email);
    formData_.append("avatar", formData.avatar ?? "");

    try {
      const result = await axios.post("/api/generate-prompt", formData_);
      console.log("Prompt API Response:", result.data);
      setPromptData(result.data);
    } catch (error: any) {
      console.error("Prompt API Error:", error);
      alert(error?.response?.data?.error || "Failed to generate prompts");
    }

    setGeneratingPrompt(false);
  };

  // Step 2: Generate image using (possibly edited) prompts
  const OnGenerateImage = async () => {
    if (!promptData) return;
    if (!user?.email) return;

    setLoading(true);

    try {
      const result = await axios.post("/api/generate-product-image", {
        docId: promptData.docId,
        imageKitUrl: promptData.imageKitUrl,
        textToImagePrompt: promptData.textToImagePrompt,
        imageToVideoPrompt: promptData.imageToVideoPrompt,
        userEmail: user.email,
        avatar: formData.avatar ?? "",
      });
      console.log("Image API Response:", result.data);
      setPromptData(null);
    } catch (error: any) {
      console.error("Image API Error:", error);
      alert(error?.response?.data?.error || "Failed to generate image");
    }

    setLoading(false);
  };

  const onPromptChange = (field: string, value: string) => {
    setPromptData((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  /* ── Append AI suggestion to image prompt ── */
  const onAppendSuggestion = (suggestion: string) => {
    if (promptData) {
      onPromptChange(
        "textToImagePrompt",
        promptData.textToImagePrompt + ". " + suggestion,
      );
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] animate-fade-in">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="hero-heading text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-300 via-purple-300 to-indigo-400 bg-clip-text text-transparent tracking-tight">
            {title ? title : "AI Creative Studio"}
          </h1>
          <p className="text-sm text-gray-400/80 mt-2 tracking-wide">
            Generate stunning ad creatives with AI
          </p>
        </div>
      </div>

      {/* ── Progress Tracker ── */}
      <div className="glass-panel rounded-2xl p-5 mb-7">
        <div className="flex items-center justify-between gap-2">
          {progressSteps.map((step, i) => {
            const stepIndex = progressSteps.findIndex(
              (s) => s.key === currentStep,
            );
            const isCompleted = i < stepIndex;
            const isActive = step.key === currentStep;
            const Icon = step.icon;

            return (
              <React.Fragment key={step.key}>
                <div className="flex flex-col items-center gap-1.5 flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isCompleted
                        ? "progress-step-completed text-green-400 ring-2 ring-green-500/30"
                        : isActive
                          ? "progress-step-active text-violet-400 ring-2 ring-violet-500/40 animate-glow"
                          : "bg-white/[0.04] text-gray-500 border border-white/[0.06]"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : isActive && (generatingPrompt || loading) ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>
                  <span
                    className={`text-[10px] font-medium ${isActive ? "text-violet-300" : isCompleted ? "text-green-400" : "text-gray-500"}`}
                  >
                    {step.label}
                  </span>
                </div>
                {i < progressSteps.length - 1 && (
                  <div
                    className={`h-[2px] flex-1 rounded-full -mt-5 transition-all duration-700 ${
                      i < stepIndex
                        ? "progress-line-completed"
                        : "bg-white/[0.06]"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* ── Left Panel – Creative Studio ── */}
        <div className="lg:col-span-4 xl:col-span-4">
          <div className="glass-panel rounded-2xl p-5 custom-scrollbar overflow-y-auto max-h-[calc(100vh-220px)]">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <Wand2 className="w-4 h-4 text-white" />
              </div>
              <h2 className="font-semibold text-lg text-white">
                Creative Studio
              </h2>
            </div>

            <FormInput
              onHandleInputChange={onHandleInputChange}
              OnGenerate={OnGeneratePrompts}
              OnGenerateImage={OnGenerateImage}
              loading={loading}
              generatingPrompt={generatingPrompt}
              enableAvatar={enableAvatar}
              promptData={promptData}
              onPromptChange={onPromptChange}
            />
          </div>
        </div>

        {/* ── Right Panel – Gallery ── */}
        <div className="lg:col-span-8 xl:col-span-8">
          {/* ── Tabs ── */}
          <div className="glass-panel rounded-2xl p-1.5 mb-5 inline-flex gap-1">
            {(["images", "videos", "recent"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tab-pill ${
                  activeTab === tab ? "tab-pill-active" : "tab-pill-inactive"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="glass-panel rounded-2xl p-5 custom-scrollbar overflow-y-auto max-h-[calc(100vh-280px)]">
            <PreviewResult activeTab={activeTab} />
          </div>
        </div>
      </div>

      {/* ── AI Suggestions (shown when prompt is being reviewed) ── */}
      {promptData && (
        <div className="glass-panel rounded-2xl p-5 mt-6 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-4 h-4 text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.4)]" />
            <h3 className="font-semibold text-sm text-white/90">
              AI Suggestions
            </h3>
            <span className="text-[10px] text-gray-500 ml-1">
              Click to append to prompt
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {aiSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => onAppendSuggestion(suggestion)}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/[0.04] text-gray-300 border border-white/[0.08] hover:bg-violet-500/15 hover:text-violet-300 hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImages;
