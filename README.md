# Dserve AI - Corporate Website

Dserve AI is a premier enterprise AI data pipeline and annotation services platform. This repository contains the source code for the official Dserve AI corporate website, built with modern web technologies to ensure a high-performance, accessible, and premium user experience.

## 🏗️ Architecture & Tech Stack

This project is built using the latest industry standards to ensure scalability, maintainability, and ultra-fast page loads.

- **Framework**: [Next.js 14/15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **Styling**: Vanilla CSS Modules (`*.module.css`) with advanced CSS Custom Properties (Variables)
- **Animations**: Custom React hooks, CSS Transitions, and `IntersectionObserver` for scroll-reveal effects.
- **Rendering**: Static Site Generation (SSG) for zero-latency page loads and SEO optimization.

## 📂 Project Structure

The repository is structured following Next.js enterprise best practices:

```text
dserveai-site/
├── app/                  # Next.js App Router (Pages & Layouts)
│   ├── about/            # About Us page
│   ├── blog/             # Knowledge Hub & dynamic blog posts
│   ├── case-studies/     # Enterprise case studies
│   ├── contact/          # Interactive contact form
│   ├── faq/              # Frequently Asked Questions
│   ├── industries/       # Industry-specific solutions
│   └── services/         # Core data annotation services
├── components/           # Reusable React components
│   ├── layout/           # Global layout components (Navbar, Footer)
│   └── ui/               # Interactive UI components (TiltCard, Accordions, Grids)
├── lib/                  # Shared utilities and static data sources
├── public/               # Static assets (images, videos, icons)
└── package.json          # Project dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:
- Node.js (v18.17.0 or higher)
- npm, yarn, or pnpm

### Installation & Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/dserveai-site.git
   cd dserveai-site
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 🛠️ Code Quality & Build

This project enforces strict typing and linting to maintain a robust, production-ready codebase.

- **Linting**: Run `npm run lint` to catch potential errors.
- **Production Build**: Run `npm run build` to generate an optimized, statically generated version of the site in the `.next` folder. You can test it locally using `npm run start`.

## ☁️ Deployment Guide (Vercel)

This application is highly optimized for deployment on [Vercel](https://vercel.com), the native hosting platform for Next.js.

### Step-by-Step Deployment:
1. **Push to GitHub**: Ensure all your local changes, including this README, are committed and pushed to a remote GitHub repository.
2. **Import to Vercel**: 
   - Log in to your [Vercel Dashboard](https://vercel.com/dashboard).
   - Click **Add New...** -> **Project**.
   - Connect your GitHub account and select the `dserveai-site` repository.
3. **Configure Build Settings**: Vercel will automatically detect the Next.js framework. The default settings (Build Command: `next build`, Output Directory: `.next`) are correct.
4. **Deploy**: Click the **Deploy** button. Vercel will build the site and provide you with a live URL (e.g., `https://dserveai-site.vercel.app`).

## 📄 License

Copyright © 2026 Dserve AI. All rights reserved.
Proprietary and confidential. Unauthorized copying of this repository, via any medium, is strictly prohibited.
