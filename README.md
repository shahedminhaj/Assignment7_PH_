# বাজার দর (BazarDor)

বাজার দর বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের প্রতিদিনের দাম এক নজরে দেখার একটি responsive বাজারদর অ্যাপ। পণ্য ও ক্যাটাগরি ব্রাউজ করুন, দৈনিক দামের পরিবর্তন দেখুন এবং বিভিন্ন বাজারের দামের তুলনা করুন।

## Technologies

- Next.js 16 App Router and React
- TypeScript
- Tailwind CSS 4
- Better Auth with MongoDB
- React Hot Toast
- BazarDor Products API

## Features

1. Responsive Bengali interface with category navigation, current date and a live price ticker.
2. Home page sections for the day’s top price risers and fallers, plus all products.
3. Product cards with Bengali prices, units and daily percentage changes.
4. Product detail pages with minimum, maximum and average prices and market-by-market comparisons.
5. Category pages with numeric price sorting and loading and not-found states.
6. Email/password registration and sign-in, Google and GitHub sign-in, toast feedback and protected product/profile pages.
7. Profile information update flow.

## Getting started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Authentication configuration

Create a `.env.local` file with the following values to enable Better Auth:

```dotenv
MONGODB_URI=your-mongodb-connection-string
BETTER_AUTH_SECRET=your-long-random-secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

Configure the corresponding production URLs and OAuth callback URLs in your deployment and Google/GitHub applications. Product and category data are provided by the public BazarDor API; the app automatically tries its alternative endpoint if the primary endpoint is unavailable.

## Build and deploy

```bash
npm run build
npm start
```

Deploy on Vercel or another platform supporting Next.js. Set the authentication environment variables in the deployment settings before enabling account features.
