
# AI Ads Generator

A Next.js 13+ application for generating AI-powered product images and videos using OpenAI, DALL-E, and ImageKit. Includes Firebase authentication, Firestore database, and a beautiful UI with Tailwind CSS.

## Features
- AI product image and video generation (OpenAI, DALL-E)
- Avatar and product image composition
- Firebase authentication (email/password, Google)
- Firestore for user and ad data
- ImageKit for image uploads and CDN
- Responsive, modern UI with Tailwind CSS
- Credit-based usage system
- Sample product and avatar selection

## Tech Stack
- Next.js 13+ (App Router)
- React, TypeScript
- Tailwind CSS
- Firebase Auth & Firestore
- OpenAI API (gpt-4o, DALL-E)
- ImageKit
- Axios

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/ai-ads-generator.git
cd ai-ads-generator
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file with the following:
```
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
```

### 4. Configure Next.js Image Domains
Edit `next.config.ts` to allow all external image domains used for avatars and samples.

### 5. Run the development server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to use the app.

## Folder Structure
- `app/` - Next.js app directory (pages, API routes, components)
- `components/` - Shared UI components
- `configs/` - Firebase, DB, and schema configs
- `context/` - React context providers
- `hooks/` - Custom React hooks
- `lib/` - Utility libraries (OpenAI, ImageKit, etc.)
- `public/` - Static assets

## Credits System
- Each image/video generation deducts credits from the user
- Users must be authenticated to generate content

## License
MIT
