import { adminDb } from "@/configs/firebaseAdmin";
import { imagekit } from "@/lib/imagekit";
import { replicate } from "@/lib/replicate";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { imageUrl, imageToVideoPrompt, uid, docId } = await req.json();

    if (!imageUrl || !imageToVideoPrompt || !docId) {
      return NextResponse.json(
        { error: "Missing required fields: imageUrl, imageToVideoPrompt, or docId" },
        { status: 400 }
      );
    }

    const input = {
      image: imageUrl,
      prompt: imageToVideoPrompt,
    };

    // Update doc status to pending
    await adminDb.collection('user-ads').doc(docId).update({
      imageToVideoStatus: "pending",
    });

    console.log("Generating video with Replicate...");
    const output = await replicate.run("wan-video/wan-2.2-i2v-fast", { input });

    console.log("Replicate output:", output);

    // Handle Replicate output - it might be a URL object, string, or array
    let videoUrl: string;
    if (Array.isArray(output)) {
      const firstItem = output[0];
      if (firstItem instanceof URL) {
        videoUrl = firstItem.href;
      } else {
        videoUrl = firstItem as string;
      }
    } else if (output instanceof URL) {
      videoUrl = output.href;
    } else if (typeof output === "string") {
      videoUrl = output;
    } else {
      // Handle case where output might have a url() method or url property
      //@ts-ignore
      const urlValue = output?.url?.() || output?.url || output?.[0];
      if (urlValue instanceof URL) {
        videoUrl = urlValue.href;
      } else {
        videoUrl = urlValue as string;
      }
    }

    if (!videoUrl) {
      throw new Error("Failed to get video URL from Replicate");
    }

    console.log("Video URL:", videoUrl);

    // Download the video
    const resp = await fetch(videoUrl);
    if (!resp.ok) {
      throw new Error(`Failed to fetch video: ${resp.statusText}`);
    }
    const videoBuffer = Buffer.from(await resp.arrayBuffer());

    // Upload video to ImageKit
    const uploadResult = await imagekit.upload({
      file: videoBuffer,
      fileName: `video_${Date.now()}.mp4`,
      isPublished: true,
    });

    console.log("Video uploaded to ImageKit:", uploadResult.url);

    // Update doc with completed status and video URL
    await adminDb.collection('user-ads').doc(docId).update({
      imageToVideoStatus: "completed",
      videoUrl: uploadResult.url,
    });

    return NextResponse.json({ success: true, videoUrl: uploadResult.url });
  } catch (error: any) {
    console.error("Video generation error:", error);
    return NextResponse.json(
      {
        error: "Something went wrong",
        details: error.message,
      },
      { status: 500 }
    );
  }
}