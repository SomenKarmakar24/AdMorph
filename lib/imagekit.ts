import ImageKit from "imagekit";

// Check for required environment variables
if (!process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY) {
  throw new Error('NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY is not set');
}
if (!process.env.IMAGEKIT_PRIVATE_KEY) {
  throw new Error('IMAGEKIT_PRIVATE_KEY is not set');
}
if (!process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT) {
  throw new Error('NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT is not set');
}

export const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
});


