# Spurtek Website

A modern B2B industrial technology website built with Next.js 15, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.5+
- **Styling**: Tailwind CSS 3.4+
- **UI Components**: shadcn/ui
- **Database**: PostgreSQL with Prisma ORM
- **CMS**: Strapi (self-hosted)
- **Email**: Resend
- **Deployment**: Vercel

## Project Structure

```
spurtek/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── lib/              # Utilities and configurations
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript type definitions
│   └── config/           # App configuration
├── prisma/               # Prisma schema and migrations
├── public/               # Static assets
└── docker/               # Docker configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- PostgreSQL database
- (Optional) Docker for local database

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd spurtek
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
- `DATABASE_URL`: PostgreSQL connection string
- `NEXT_PUBLIC_APP_URL`: Your app URL (http://localhost:3000 for local)
- `STRAPI_API_URL`: Strapi CMS API URL (if using)
- `RESEND_API_KEY`: Resend email API key
- Other required variables

4. Set up the database:
```bash
# Generate Prisma Client
npm run db:generate

# Run migrations
npm run db:migrate
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run db:generate` - Generate Prisma Client
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

## Environment Variables

See `.env.example` for all required environment variables.

## Database Setup

1. Create a PostgreSQL database
2. Update `DATABASE_URL` in `.env.local`
3. Run migrations: `npm run db:migrate`

## CMS Setup (Strapi)

1. Set up Strapi CMS (see separate Strapi documentation)
   - Create a new Strapi project or use Docker setup
   - Configure database connection
   - Set up admin user

2. Configure content types:
   - **Product**: Title, Slug, Description, Category, Industry tags, Specifications (JSON), Images, Datasheet file, SEO fields
   - **Case Study**: Title, Slug, Client name, Problem, Solution, Outcome, Metrics (JSON), Featured image, Industry tags
   - **Resource**: Title, Slug, Description, Resource type, File upload, Thumbnail, Gated download flag
   - **Industry**: Title, Slug, Description, Hero image, Use cases, Related products

3. Set `NEXT_PUBLIC_STRAPI_API_URL` and `STRAPI_API_TOKEN` in `.env.local`

4. Configure webhook in Strapi to point to: `https://your-domain.com/api/webhooks/strapi`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables in Vercel dashboard:
   - `DATABASE_URL` - PostgreSQL connection string
   - `NEXT_PUBLIC_APP_URL` - Your production URL
   - `NEXT_PUBLIC_STRAPI_API_URL` - Strapi API URL
   - `STRAPI_API_TOKEN` - Strapi API token
   - `RESEND_API_KEY` - Resend email API key
   - `RESEND_FROM_EMAIL` - Sender email address
   - `RESEND_ADMIN_EMAIL` - Admin notification email
   - `UPSTASH_REDIS_REST_URL` - Upstash Redis URL (for rate limiting)
   - `UPSTASH_REDIS_REST_TOKEN` - Upstash Redis token
4. Run database migrations: `npm run db:migrate` (or use Vercel CLI)
5. Deploy

The site will be automatically deployed on every push to main branch via GitHub Actions.

### Docker Deployment

1. Build the image: `docker build -f docker/Dockerfile -t spurtek .`
2. Run with docker-compose: `docker-compose -f docker/docker-compose.yml up -d`
3. Or run manually with database connection

## Architecture Decisions

- **Next.js App Router**: Modern routing and React Server Components
- **TypeScript**: Type safety and better developer experience
- **Prisma**: Type-safe database access
- **Strapi CMS**: Self-hosted, flexible content management
- **Resend**: Modern email API with excellent Next.js integration

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## Project Status

✅ **Phase 1: Foundation** - Complete
- Next.js 15 project initialized
- TypeScript, Tailwind CSS, shadcn/ui configured
- Prisma schema and database setup
- Layout components (Header, Footer)
- Home page with hero and CTAs

✅ **Phase 2: Core Pages** - Complete
- Products listing and detail pages
- Solutions/Industries pages
- Resources page with download gating
- Case Studies pages
- About page
- Contact page with multi-step form

✅ **Phase 3: CMS Integration** - Complete
- Strapi API integration layer
- Content fetching functions
- Webhook handler for content updates

✅ **Phase 4: Backend & Forms** - Complete
- API routes for leads (quote, demo, contact)
- Resend email integration
- Download tracking
- Rate limiting and security

✅ **Phase 5: SEO & Performance** - Complete
- Dynamic metadata generation
- Structured data (JSON-LD)
- Sitemap and robots.txt
- Image optimization ready

✅ **Phase 6: Polish & Deploy** - Complete
- AI-ready placeholders
- Error handling and 404 pages
- CI/CD pipeline (GitHub Actions)
- Docker configuration
- Comprehensive documentation

## Next Steps

1. Install dependencies: `npm install`
2. Set up PostgreSQL database
3. Run migrations: `npm run db:migrate`
4. Configure environment variables
5. (Optional) Set up Strapi CMS
6. Start development: `npm run dev`

## License

Copyright © 2025 Spurtek. All rights reserved.

