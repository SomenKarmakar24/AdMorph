import { adminDb } from "@/configs/firebaseAdmin";
import { clientOpenAi } from "@/lib/openai";
import { NextRequest, NextResponse } from "next/server";

const PROMPT = `Create a vibrant product showcase image featuring a uploaded image
in the center, surrounded by dynamic splashes of liquid or relevant material that complement the product.
Use a clean, colorful background to make the product stand out. Include subtle elements related to the product's
ingredients, or theme floating around to add context and visual interest.
Ensure the product is sharp and in focus, with motion and energy conveyed through the splash effects.
Also give me image to video prompt for same in JSON format: {textToImage:"", imageToVideo:""}`;

const AVATAR_PROMPT = `Create a vibrant product showcase image featuring the uploaded product image being held naturally by the uploaded avatar image. Position the product clearly in the avatar's hands, making it the focal point of the scene. Surround the product with dynamic splashes of liquid or relevant materials that complement the product. Use a clean, colorful background to make the product stand out. Add subtle floating elements related to the product's flavor, ingredients, or theme for extra context and visual interest. Ensure both the avatar and product are sharp, well-lit, and in focus, while motion and energy are conveyed through the splash effects. Also give me image to video prompt for same in JSON format: {textToImage:"", imageToVideo:""}`;

export async function POST(req: NextRequest) {
  try {
    console.log("Generate-prompt API called...");

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

    // Dynamically import imagekit to avoid initialization errors
    const { imagekit } = await import("@/lib/imagekit");

    const formData = await req.formData();

    const file = formData.get("file") as File;
    const imageUrl = formData.get("imageUrl") as string;
    const description = formData.get("description") as string;
    const size = formData.get("size") as string;
    const userEmail = formData.get("userEmail") as string;
    const avatar = formData?.get("avatar") as string;

    // Validation
    if (!file && !imageUrl) {
      return NextResponse.json(
        { error: "No file or image URL received" },
        { status: 400 }
      );
    }

    if (!description || !size) {
      return NextResponse.json(
        { error: "Description and size are required" },
        { status: 400 }
      );
    }

    // Save initial doc to Firestore
    const docId = Date.now().toString();
    await adminDb.collection("user-ads").doc(docId).set({
      userEmail: userEmail,
      status: "prompt-review",
      description: description,
      size: size,
      originalImageUrl: imageUrl || null,
      ...(avatar?.length > 2 && { avatarUrl: avatar }),
      createdAt: new Date().toISOString(),
      imageToVideoStatus: null,
      videoUrl: null,
    });

    // Convert file or sample image to base64
    let base64File: string;
    let fileName: string;

    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      base64File = Buffer.from(arrayBuffer).toString("base64");
      fileName = `product_${Date.now()}.${file.name.split(".").pop() || "png"}`;
    } else {
      const imageFetchResponse = await fetch(new URL(imageUrl, req.url));
      if (!imageFetchResponse.ok) {
        throw new Error(
          `Failed to fetch sample image: ${imageFetchResponse.statusText}`
        );
      }
      const arrayBuffer = await imageFetchResponse.arrayBuffer();
      base64File = Buffer.from(arrayBuffer).toString("base64");
      fileName = `product_${Date.now()}.${imageUrl.split(".").pop() || "png"}`;
    }

    // Upload to ImageKit
    const imageKitRef = await imagekit.upload({
      file: base64File,
      fileName,
      isPublished: true,
    });

    console.log("ImageKit Upload done:", imageKitRef.url);

    // Prepare data-URI for OpenAI
    const getMimeFromFilename = (name: string) => {
      const ext = (name || "").split(".").pop()?.toLowerCase();
      switch (ext) {
        case "jpg":
        case "jpeg":
          return "image/jpeg";
        case "png":
          return "image/png";
        case "webp":
          return "image/webp";
        case "gif":
          return "image/gif";
        default:
          return "image/png";
      }
    };

    const productMime = file?.type || getMimeFromFilename(fileName);
    const productDataUrl = `data:${productMime};base64,${base64File}`;

    // Attempt to fetch avatar and convert to data URI
    let avatarDataUrl: string | null = null;
    if (avatar && avatar.length > 2) {
      try {
        const avatarResp = await fetch(avatar);
        if (avatarResp.ok) {
          const avatarBuf = Buffer.from(await avatarResp.arrayBuffer());
          const avatarContentType =
            avatarResp.headers.get("content-type") ||
            getMimeFromFilename(avatar);
          avatarDataUrl = `data:${avatarContentType};base64,${avatarBuf.toString("base64")}`;
        }
      } catch (err) {
        console.warn("Error fetching avatar for data-URI:", err);
      }
    }

    // Build OpenAI content
    const content: any[] = [
      {
        type: "input_text",
        text: avatar?.length > 2 ? AVATAR_PROMPT : PROMPT,
      },
      {
        type: "input_image",
        image_url: productDataUrl,
      },
    ];

    if (avatar && avatar.length > 2) {
      content.push({
        type: "input_image",
        image_url: avatarDataUrl || avatar,
      });
    }

    // Generate prompts using OpenAI
    const response = await clientOpenAi.responses.create({
      model: "gpt-4.1-mini",
      input: [{ role: "user", content }],
    });

    const textOutPut = response.output_text?.trim();
    console.log("GPT-4.1-mini raw output:", textOutPut);

    // Extract JSON
    let jsonString = textOutPut;

    const jsonMatch = textOutPut.match(
      /```(?:json)?\s*(\{[\s\S]*?\})\s*```/
    );
    if (jsonMatch) {
      jsonString = jsonMatch[1];
    } else {
      const jsonObjectMatch = textOutPut.match(/\{[\s\S]*\}/);
      if (jsonObjectMatch) {
        jsonString = jsonObjectMatch[0];
      }
    }

    let json;
    try {
      const needsKeyQuotes = /[{,]\s*[A-Za-z0-9_]+\s*:/.test(jsonString);
      if (needsKeyQuotes) {
        jsonString = jsonString.replace(
          /([{,]\s*)([A-Za-z0-9_]+)\s*:/g,
          '$1"$2":'
        );
      }
      jsonString = jsonString.replace(/,\s*([}\]])/g, "$1");
      json = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("Failed to parse JSON:", parseError);
      throw new Error(`Failed to parse JSON from GPT response: ${parseError}`);
    }

    if (!json?.textToImage) {
      throw new Error("Invalid JSON from prompt generator");
    }

    console.log("Prompts generated successfully");

    // Update Firestore doc with prompts
    await adminDb.collection("user-ads").doc(docId).update({
      productImageUrl: imageKitRef.url,
      textToImagePrompt: json.textToImage,
      imageToVideoPrompt: json.imageToVideo,
    });

    // Return prompts + metadata so UI can display them for review
    return NextResponse.json({
      docId,
      imageKitUrl: imageKitRef.url,
      textToImagePrompt: json.textToImage,
      imageToVideoPrompt: json.imageToVideo,
    });
  } catch (error: any) {
    console.error("Generate prompt error:", error);
    return NextResponse.json(
      { error: "Something went wrong", details: error.message },
      { status: 500 }
    );
  }
}
