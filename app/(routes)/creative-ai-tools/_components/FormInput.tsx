"use client";

import {
  ImagePlus,
  Square,
  Monitor,
  Smartphone,
  Sparkles,
  Loader2Icon,
  CloudUpload,
  Copy,
  RotateCcw,
  ImageIcon,
  Film,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const sampleProduct = [
  "/headphone.png",
  "/juice-can.png",
  "/perfume.png",
  "/burger.png",
  "/ice-creame.png",
];

const AvatarList = [
  {
    name: "Avatar 1",
    imageUrl:
      "https://imgv3.fotor.com/images/gallery/generate-a-realistic-ai-avatar-of-a-formal-man-in-fotor.jpg",
  },
  {
    name: "Avatar 2",
    imageUrl:
      "https://imgv3.fotor.com/images/gallery/generate-a-realistic-ai-avatar-of-a-professional-woman-in-fotor.jpg",
  },
  {
    name: "Avatar 3",
    imageUrl: "https://ai-avatar-generator.com/avatars3/nature.png",
  },
  {
    name: "Avatar 4",
    imageUrl: "https://res.jogg.ai/upload/www/AI_Avatar_cover_03d2df47fe.jpg",
  },
  {
    name: "Avatar 5",
    imageUrl:
      "https://amajova.com/assets/uploads/project/0-1744938735-6801a6efc1108.webp",
  },
];

const sizeOptions = [
  { value: "1024x1024", label: "1:1 Square", icon: Square },
  { value: "1536x1024", label: "16:9 Wide", icon: Monitor },
  { value: "1024x1536", label: "9:16 Portrait", icon: Smartphone },
];

type PromptData = {
  docId: string;
  imageKitUrl: string;
  textToImagePrompt: string;
  imageToVideoPrompt: string;
};

type Props = {
  onHandleInputChange: (field: string, value: any) => void;
  OnGenerate: () => void;
  OnGenerateImage: () => void;
  loading: boolean;
  generatingPrompt: boolean;
  enableAvatar: boolean;
  promptData: PromptData | null;
  onPromptChange: (field: string, value: string) => void;
};

function FormInput({
  onHandleInputChange,
  loading,
  generatingPrompt,
  OnGenerate,
  OnGenerateImage,
  enableAvatar,
  promptData,
  onPromptChange,
}: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<string>();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [dragOver, setDragOver] = useState(false);
  const [description, setDescription] = useState("");
  const [originalPrompts, setOriginalPrompts] = useState<{
    text: string;
    video: string;
  } | null>(null);

  const onFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    onHandleInputChange("file", file);
    onHandleInputChange("imageUrl", null);
    setPreview(URL.createObjectURL(file));
  };

  /* ── Save original prompts when first received ── */
  if (promptData && !originalPrompts) {
    setOriginalPrompts({
      text: promptData.textToImagePrompt,
      video: promptData.imageToVideoPrompt,
    });
  }
  if (!promptData && originalPrompts) {
    setOriginalPrompts(null);
  }

  return (
    <div className="space-y-5">
      {/* ── Section 1: Upload ── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500/30 to-indigo-500/20 text-violet-400 flex items-center justify-center text-[10px] font-bold shadow-lg shadow-violet-500/10 border border-violet-500/20">
            1
          </span>
          <h3 className="text-sm font-semibold text-white/90 tracking-wide">
            Product Image
          </h3>
        </div>

        {/* Upload Dropzone */}
        <label
          htmlFor="imageUpload"
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            onFileSelect(e.dataTransfer.files);
          }}
          className={`group relative block rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden ${
            dragOver
              ? "border-violet-400 bg-violet-500/10 shadow-lg shadow-violet-500/10"
              : preview
                ? "border-white/10 bg-white/[0.04]"
                : "border-white/[0.08] bg-white/[0.02] hover:border-violet-500/40 hover:bg-violet-500/5 hover:shadow-lg hover:shadow-violet-500/5"
          }`}
        >
          {!preview ? (
            <div className="flex flex-col items-center justify-center py-10 px-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/15 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-violet-500/10 border border-violet-500/10">
                <CloudUpload className="w-6 h-6 text-violet-400 drop-shadow-[0_0_6px_rgba(139,92,246,0.4)]" />
              </div>
              <p className="text-sm font-medium text-gray-300">
                Drop your image here
              </p>
              <p className="text-xs text-gray-500 mt-1">
                or click to browse · up to 5MB
              </p>
            </div>
          ) : (
            <div className="relative">
              <Image
                src={preview}
                alt="preview"
                width={300}
                height={300}
                className="w-full h-[180px] object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <p className="text-xs font-medium text-white">
                  Click to replace
                </p>
              </div>
            </div>
          )}
        </label>

        <input
          type="file"
          id="imageUpload"
          className="hidden"
          accept="image/*"
          onChange={(event) => onFileSelect(event.target.files)}
        />

        {/* Sample Products */}
        <div className="mt-3">
          <p className="text-[11px] text-gray-500 mb-2 uppercase tracking-wider">
            Or try a sample
          </p>
          <div className="flex gap-2">
            {sampleProduct.map((product, index) => (
              <button
                key={index}
                className={`relative w-[48px] h-[48px] rounded-lg overflow-hidden border transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-violet-500/10 ${
                  preview === product
                    ? "border-violet-500 ring-2 ring-violet-500/30"
                    : "border-white/10 hover:border-violet-500/40"
                }`}
                onClick={() => {
                  setPreview(product);
                  onHandleInputChange("imageUrl", product);
                  onHandleInputChange("file", null);
                }}
              >
                <Image
                  src={product}
                  alt="sample"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Avatar Section ── */}
      {enableAvatar && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-5 h-5 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center text-[10px] font-bold">
              ★
            </span>
            <h3 className="text-sm font-semibold text-white">Select Avatar</h3>
          </div>
          <div className="flex gap-3 flex-wrap">
            {AvatarList.map((avatar, index) => (
              <button
                key={index}
                className={`relative rounded-full overflow-hidden transition-all duration-300 hover:scale-110 ${
                  avatar.name === selectedAvatar
                    ? "ring-2 ring-violet-500 shadow-lg shadow-violet-500/20"
                    : "ring-1 ring-white/10 hover:ring-violet-500/40"
                }`}
                onClick={() => {
                  setSelectedAvatar(avatar.name);
                  onHandleInputChange("avatar", avatar.imageUrl);
                }}
              >
                <Image
                  src={avatar.imageUrl}
                  alt={avatar.name}
                  width={56}
                  height={56}
                  className="w-[50px] h-[50px] object-cover"
                />
                {avatar.name === selectedAvatar && (
                  <div className="absolute inset-0 bg-violet-500/20 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-violet-400" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Section 2: Description ── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500/30 to-indigo-500/20 text-violet-400 flex items-center justify-center text-[10px] font-bold shadow-lg shadow-violet-500/10 border border-violet-500/20">
            2
          </span>
          <h3 className="text-sm font-semibold text-white/90 tracking-wide">
            Description
          </h3>
        </div>
        <div className="relative">
          <Textarea
            placeholder="Describe your product and how you want it displayed in the ad..."
            className="min-h-[100px] bg-white/[0.03] border-white/10 rounded-xl text-sm placeholder:text-gray-600 focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/20 transition-all resize-none"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
              onHandleInputChange("description", event.target.value);
            }}
          />
          <span className="absolute bottom-2 right-3 text-[10px] text-gray-600">
            {description.length}/500
          </span>
        </div>
      </div>

      {/* ── Section 3: Size ── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500/30 to-indigo-500/20 text-violet-400 flex items-center justify-center text-[10px] font-bold shadow-lg shadow-violet-500/10 border border-violet-500/20">
            3
          </span>
          <h3 className="text-sm font-semibold text-white/90 tracking-wide">
            Image Size
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {sizeOptions.map((opt) => {
            const Icon = opt.icon;
            const isActive = selectedSize === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => {
                  setSelectedSize(opt.value);
                  onHandleInputChange("size", opt.value);
                }}
                className={`flex flex-col items-center gap-1.5 p-3.5 rounded-xl border transition-all duration-300 ${
                  isActive
                    ? "border-violet-500/50 bg-gradient-to-br from-violet-500/15 to-indigo-500/10 text-violet-300 shadow-lg shadow-violet-500/10"
                    : "border-white/[0.08] bg-white/[0.02] text-gray-400 hover:border-violet-500/30 hover:bg-violet-500/5 hover:shadow-lg hover:shadow-violet-500/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[10px] font-medium">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Generate / Prompt Review ── */}
      {!promptData ? (
        <div className="pt-2">
          <button
            disabled={loading || generatingPrompt}
            onClick={OnGenerate}
            className="btn-premium w-full group"
          >
            {generatingPrompt ? (
              <Loader2Icon className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            )}
            <span>
              {generatingPrompt ? "Generating Prompts..." : "Generate Prompts"}
            </span>
          </button>
          <p className="text-[10px] text-gray-600 text-center mt-2">
            AI will generate prompts for you to review
          </p>
        </div>
      ) : (
        <div className="space-y-4 pt-2 animate-fade-in">
          {/* Image Prompt */}
          <div className="rounded-xl border border-violet-500/20 bg-gradient-to-br from-violet-500/[0.05] to-indigo-500/[0.02] p-3.5 shadow-lg shadow-violet-500/5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-violet-400" />
                <h4 className="text-xs font-semibold text-violet-300">
                  Image Prompt
                </h4>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(promptData.textToImagePrompt)
                  }
                  className="p-1 rounded-md hover:bg-white/5 text-gray-500 hover:text-white transition-colors"
                  title="Copy"
                >
                  <Copy className="w-3 h-3" />
                </button>
                {originalPrompts && (
                  <button
                    onClick={() =>
                      onPromptChange("textToImagePrompt", originalPrompts.text)
                    }
                    className="p-1 rounded-md hover:bg-white/5 text-gray-500 hover:text-white transition-colors"
                    title="Reset"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
            <Textarea
              value={promptData.textToImagePrompt}
              onChange={(e) =>
                onPromptChange("textToImagePrompt", e.target.value)
              }
              className="min-h-[90px] text-xs bg-transparent border-white/5 rounded-lg focus:border-violet-500/30 resize-none"
            />
          </div>

          {/* Video Prompt */}
          <div className="rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/[0.05] to-cyan-500/[0.02] p-3.5 shadow-lg shadow-blue-500/5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5 text-blue-400" />
                <h4 className="text-xs font-semibold text-blue-300">
                  Video Prompt
                </h4>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(promptData.imageToVideoPrompt)
                  }
                  className="p-1 rounded-md hover:bg-white/5 text-gray-500 hover:text-white transition-colors"
                  title="Copy"
                >
                  <Copy className="w-3 h-3" />
                </button>
                {originalPrompts && (
                  <button
                    onClick={() =>
                      onPromptChange(
                        "imageToVideoPrompt",
                        originalPrompts.video,
                      )
                    }
                    className="p-1 rounded-md hover:bg-white/5 text-gray-500 hover:text-white transition-colors"
                    title="Reset"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
            <Textarea
              value={promptData.imageToVideoPrompt}
              onChange={(e) =>
                onPromptChange("imageToVideoPrompt", e.target.value)
              }
              className="min-h-[70px] text-xs bg-transparent border-white/5 rounded-lg focus:border-blue-500/30 resize-none"
            />
          </div>

          {/* Generate Image */}
          <button
            disabled={loading}
            onClick={OnGenerateImage}
            className="btn-premium w-full group"
          >
            {loading ? (
              <Loader2Icon className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            )}
            <span>{loading ? "Generating Image..." : "Generate Image"}</span>
          </button>
          <p className="text-[10px] text-gray-600 text-center">
            5 Credits per generation
          </p>
        </div>
      )}
    </div>
  );
}

export default FormInput;
