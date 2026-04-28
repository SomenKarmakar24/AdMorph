# AdMorph — AI Ads Generator

A Next.js 15 application for generating AI-powered product images and videos. Upload your product, pick an avatar, and let AI generate stunning ad creatives with dynamic splash effects, cinematic lighting, and more — all in seconds.

---

## Features

- AI product image generation using Replicate (flux-1.1-pro)
- AI product video generation using Replicate (wan-2.2-i2v-fast)
- GPT-4.1-mini powered prompt generation from product images
- Avatar + product image composition for personalized ads
- Firebase authentication (email/password, Google)
- Firestore for storing user ads and metadata
- ImageKit for image/video uploads and CDN delivery
- Credit-based usage system (5 credits per generation)
- Prompt review and editing before generation
- Sample product and avatar selection
- Responsive, modern UI with Tailwind CSS

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS, Radix UI |
| Auth & DB | Firebase Auth, Firestore |
| AI - Prompts | OpenAI gpt-4.1-mini |
| AI - Images | Replicate flux-1.1-pro |
| AI - Videos | Replicate wan-2.2-i2v-fast |
| Media CDN | ImageKit |
| Database | Neon (PostgreSQL) + Drizzle ORM |
| HTTP Client | Axios |

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/SomenKarmakar24/ai-ads-generator.git
cd ai-ads-generator
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory:
```bash
# Firebase Client (public)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_MESURMENT_ID=your_firebase_measurement_id

# Firebase Admin SDK (server-side only)
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY\n-----END PRIVATE KEY-----\n"

# ImageKit
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Replicate
REPLICATE_API_TOKEN=your_replicate_api_token

# Neon Database
DATABASE_URL=postgresql://username:password@host/database?sslmode=require
```

> See `.env.example` for a full template.

### 4. Run the development server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to use the app.

---

## Folder Structure

```
app/
├── _components/        # Shared layout components (Header, Sidebar)
├── (routes)/           # App pages (dashboard, tools, profile)
│   └── creative-ai-tools/
│       ├── product-images/
│       ├── product-video/
│       └── product-avatar/
├── api/                # Server-side API routes
│   ├── generate-prompt/
│   ├── generate-product-image/
│   └── generate-product-video/
components/             # Reusable UI components (shadcn/ui)
configs/                # Firebase client, Firebase Admin, DB schema
context/                # React context providers (AuthContext)
hooks/                  # Custom React hooks
lib/                    # Utility libraries (OpenAI, ImageKit, Replicate)
public/                 # Static assets
```

---

## How It Works

1. Upload a product image or pick a sample
2. Optionally select an avatar for personalized ads
3. Enter a description and choose image size
4. AI generates image + video prompts (GPT-4.1-mini)
5. Review and edit the prompts if needed
6. Generate the final product image (Replicate flux-1.1-pro)
7. Optionally convert to video (Replicate wan-2.2-i2v-fast)
8. All results are stored in Firestore and served via ImageKit CDN

---

## Credits System

- Each image generation costs **5 credits**
- Users must be authenticated to generate content
- Credits are tracked per user in Firestore

---

## Author

**Somen Karmakar**

- GitHub: [github.com/SomenKarmakar24](https://github.com/SomenKarmakar24)
- Portfolio: [somenkarmakar.me](https://somenkarmakar.me)
- LinkedIn: [linkedin.com/in/somen-karmakar-74453724a](https://www.linkedin.com/in/somen-karmakar-74453724a/)

---

## License

MIT
