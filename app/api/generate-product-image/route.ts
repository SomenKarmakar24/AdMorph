
import { adminDb } from "@/configs/firebaseAdmin";
import { replicate } from "@/lib/replicate";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    console.log("Generate-product-image API called...");

    // Check if Replicate API token is set
    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        { error: "Replicate API token is missing." },
        { status: 500 }
      );
    }

    // Check if ImageKit environment variables are set
    if (
      !process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY ||
      !process.env.IMAGEKIT_PRIVATE_KEY ||
      !process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
    ) {
      return NextResponse.json(
        { error: "ImageKit configuration is missing." },
        { status: 500 }
      );
    }

    const { imagekit } = await import("@/lib/imagekit");

    const body = await req.json();
    const {
      docId,
      imageKitUrl,
      textToImagePrompt,
      imageToVideoPrompt,
      userEmail,
      avatar,
    } = body;

    if (!docId || !imageKitUrl || !textToImagePrompt) {
      return NextResponse.json(
        { error: "Missing required fields: docId, imageKitUrl, textToImagePrompt" },
        { status: 400 }
      );
    }

    // Update status to pending
    await adminDb.collection("user-ads").doc(docId).update({
      status: "pending",
    });

    // --- Generate image using Replicate flux-1.1-pro ---
    console.log("Generating image with Replicate flux-1.1-pro...");
    console.log("Prompt:", textToImagePrompt);

    const replicateInput: any = {
      prompt: textToImagePrompt,
      prompt_upsampling: true,
      safety_tolerance: 5,
      image: imageKitUrl,
    };

    if (avatar && avatar.length > 2) {
      replicateInput.init_image = avatar;
    }

    console.log("Replicate input:", replicateInput);

    let replicateOutput;
    try {
      replicateOutput = await replicate.run("black-forest-labs/flux-1.1-pro", {
        input: replicateInput,
      });
    } catch (replicateError: any) {
      if (replicateError?.message?.includes("NSFW")) {
        await adminDb.collection("user-ads").doc(docId).update({
          status: "failed",
        });
        return NextResponse.json(
          {
            error:
              "The generated image was flagged by the safety filter. Please try a different description or avatar.",
          },
          { status: 422 }
        );
      }
      throw replicateError;
    }

    console.log("Replicate output:", replicateOutput);

    // Extract URL from Replicate output
    let generatedImageUrl: string;
    if (Array.isArray(replicateOutput)) {
      const firstItem = replicateOutput[0];
      generatedImageUrl =
        firstItem instanceof URL ? firstItem.href : (firstItem as string);
    } else if (replicateOutput instanceof URL) {
      generatedImageUrl = replicateOutput.href;
    } else if (typeof replicateOutput === "string") {
      generatedImageUrl = replicateOutput;
    } else {
      //@ts-ignore
      const urlValue =
        //@ts-ignore
        replicateOutput?.url?.() || replicateOutput?.url || replicateOutput?.[0];
      generatedImageUrl =
        urlValue instanceof URL ? urlValue.href : (urlValue as string);
    }

    if (!generatedImageUrl) {
      throw new Error("Failed to get image URL from Replicate");
    }

    console.log("Generated Image URL:", generatedImageUrl);

    // Download the generated image
    const imageResponse = await fetch(generatedImageUrl);
    if (!imageResponse.ok) {
      throw new Error(
        `Failed to fetch generated image: ${imageResponse.statusText}`
      );
    }

    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

    // Upload generated image to ImageKit
    const uploadResult = await imagekit.upload({
      file: imageBuffer,
      fileName: `generate-${Date.now()}.png`,
      isPublished: true,
    });

    // Get user credits
    const usersSnapshot = await adminDb
      .collection("users")
      .where("userEmail", "==", userEmail)
      .get();
    const userDoc = usersSnapshot.docs[0];
    let userCredits = 0;
    if (userDoc) {
      userCredits = userDoc.data()?.credits || 0;
    }

    // Update doc with final image
    await adminDb.collection("user-ads").doc(docId).update({
      finalProductImageUrl: uploadResult?.url,
      productImageUrl: imageKitUrl,
      status: "completed",
      userInfo: userCredits - 5,
      imageToVideoPrompt: imageToVideoPrompt || null,
      imageToVideoStatus: null,
    });

    return NextResponse.json(uploadResult.url);
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Something went wrong", details: error.message },
      { status: 500 }
    );
  }
}
