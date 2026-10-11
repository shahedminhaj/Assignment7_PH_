# Bazar Dor (বাজার দর)

A responsive Bengali-language market price web application for checking everyday grocery prices, comparing market rates across different bazaars, and viewing detailed product information. Built as part of the B14-A7 assignment.

---

## Links

- Live Site: https://assignment7-ph.vercel.app/
- GitHub Repository: https://github.com/shahedminhaj/Assignment7_PH_.git

---

## Technologies Used

| Technology | Purpose |
|-----------|---------|
| Next.js 16 (App Router) | UI rendering and page navigation |
| React 19 | Component library |
| TypeScript | Type safety and developer experience |
| Tailwind CSS 4 | Styling and responsive design |
| Better Auth | Email/Password + Google + GitHub authentication |
| MongoDB Atlas | Database for user and session data |
| React Hot Toast | Toast notifications |
| Bazar Dor Products API | Product, category, and market price data |

---

## Key Features

1. Responsive Navbar with Price Ticker
   Bengali logo with date, category links with active state highlighting, auth buttons, and an infinite scrolling price marquee showing emoji, name, price, and change percentage.

2. Hero Section with Anchor CTA
   Eyebrow text, main heading, subtitle, a CTA button that smoothly scrolls to the "সব পণ্য" section, and a hero image on the right side.

3. Home Page with Risers, Fallers, and All Products
   Top 6 risers (▲), Top 6 fallers (▼), and a full responsive product grid. Each card shows emoji, Bengali product name, unit line, Bengali-numeral price, and a color-coded change badge (green up, red down, gray flat).

4. Protected Product Details Page
   Requires login. Shows emoji, title, description, category tags, unit, min/max/average price summary, and a market-by-market price breakdown across different bazaars.

5. Category Page with Sort and Skeleton Loader
   Category title with icon, sort dropdown (default, price low to high, price high to low), skeleton loader while fetching, responsive grid, and a friendly 404 empty state with a "হোম পেজে ফিরে যান" CTA.

6. Better Auth Integration
   Email/Password sign up and sign in, Google and GitHub social login, toast notifications on success/error/logout, and protected route redirects.

7. Profile Update
   Logged-in users can update their display name from a dedicated profile route using Better Auth's update user API.

8. Fully Responsive and 404 Handling
   Works on mobile, tablet, and desktop. Custom 404 page for invalid routes, skeleton loaders for data fetching, and safe dynamic route handling on Vercel (no hard 404 on refresh).