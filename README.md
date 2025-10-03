# Loco 2

A Next.js application with Supabase integration, featuring the Crico module and reusable timeline/gantt chart components.

## Features

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Supabase** for database operations
- **Crico Module** - Custom business logic module
- **Reusable Components** - Timeline and Gantt chart components
- **ESLint** for code quality

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- A Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone https://github.com/spookydinero/loco2.git
cd loco-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your Supabase credentials in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Database Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API
3. Copy your project URL and anon key to `.env.local`
4. Create the necessary database tables (see database schema documentation)

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # Reusable UI components
│   ├── timeline/       # Timeline component
│   └── gantt/          # Gantt chart component
├── lib/                # Utility libraries
│   └── supabase.ts     # Supabase client configuration
└── modules/            # Feature modules
    └── crico/          # Crico module
        ├── components/ # Module-specific components
        ├── hooks/      # Custom hooks
        ├── types/      # TypeScript types
        └── utils/      # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Key Components

### Crico Module

The Crico module provides business-specific functionality with:
- Dashboard component
- Custom data hooks
- Type definitions
- Utility functions

### Reusable Components

- **Timeline**: Displays chronological events with status indicators
- **Gantt Chart**: Project timeline visualization with progress tracking

## Deployment

### Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Connect your GitHub repository to Vercel
2. Add your environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Platforms

This is a standard Next.js application that can be deployed to any platform supporting Node.js.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
