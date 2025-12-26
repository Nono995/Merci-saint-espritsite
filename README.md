# Merci Saint-Esprit Website

An ultra-modern church website built with **Next.js 15**, **React 19**, and **Supabase**. This platform features a fully synchronized CMS for managing church content including events, videos, and galleries.

## 🚀 Features

- **Dynamic Hero Section**: Real-time managed announcements and welcoming messages.
- **Events Management**: Complete system for scheduling and displaying upcoming church events.
- **Inspiration Express (Short Videos)**: Support for both uploaded and YouTube-hosted short-form video content.
- **Photo Gallery**: Beautifully organized media gallery for church activities.
- **Admin Dashboard**: Secure, comprehensive management interface for 18+ content sections.
- **Responsive Design**: Optimized for all devices using Tailwind CSS and Framer Motion.

## 🛠 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Frontend**: [React 19](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Backend/Database**: [Supabase](https://supabase.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing**: [Playwright](https://playwright.dev/)

## 🏁 Getting Started

### Prerequisites

- Node.js 20+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Nono995/Merci-saint-espritsite.git
   cd Merci-saint-espritsite
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🧪 Testing

Run E2E tests with Playwright:
```bash
npx playwright test
```

## 📜 License

This project is private.
