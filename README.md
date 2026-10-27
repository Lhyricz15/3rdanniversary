# Benjamin & Rosetta — Our Little Forever

A premium anniversary website built with Next.js, TypeScript, and Tailwind CSS for Benjamin and Rosetta.

## Features

- Cinematic intro experience with royal-blue, white, and gold styling
- Story timeline covering Kweikrom, 27 October 2023, and the third anniversary
- Anniversary letter and future section
- Secret message interaction with a date-based key
- Memory gallery with clear local preview vs. private/shared storage messaging
- Supabase-ready memory schema and migration file
- Responsive mobile-first layout
- Social preview metadata and placeholder social image
- Vercel-ready deployment structure

## Local development

1. Clone the repo and open it in VS Code.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
4. Start the app:
   ```bash
   npm run dev
   ```
5. Open http://localhost:3000

## Environment variables

The app has a graceful demo mode when backend services are not configured.

Create a `.env.local` file containing values like:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_ENABLE_SHARED_MEMORIES=false
```

- Leave Supabase values blank to keep the site in demo mode.
- Set `NEXT_PUBLIC_ENABLE_SHARED_MEMORIES=true` only after Supabase is configured correctly.

## Supabase setup (optional)

If you want a real shared memory space:

1. Create a Supabase project.
2. Copy the project URL and anon key into `.env.local`.
3. Run the SQL in `supabase/migrations/001_create_memories.sql` in the Supabase SQL editor.
4. Create storage policies and a private bucket for uploaded memory files.
5. Require authentication before enabling shared memory access.

Important: Do not expose secret keys in client-side code. Only use the anonymous/public key in the browser and keep service-role keys in server-side or local secure environments only.

## GitHub + Vercel deployment

1. Create a GitHub repository.
2. Push this project to the repository.
3. In Vercel, click Import Project.
4. Select the repository and import it.
5. Set environment variables in Vercel if you are enabling Supabase.
6. Deploy the project.
7. Visit your generated Vercel URL and test the experience.

## Social preview

This project includes a placeholder social preview image at `public/social-preview.svg`.

Before publishing, replace the site URL in `app/layout.tsx` and configure the actual deployed URL in Vercel.

## Project structure

- `app/` — Next.js App Router pages and layout
- `lib/` — shared helpers and Supabase client
- `public/` — social preview and public assets
- `supabase/migrations/` — SQL schema for private memory storage
- `.env.example` — environment variable placeholders

## Notes

- This project intentionally keeps all personal memory uploads local until the optional backend is configured.
- The secret key is a playful front-end interaction and is not meant to protect real sensitive information.
- The website can still run in a beautiful demo mode without a backend.

## Customization

Update the names, dates, and anniversary text in `app/page.tsx` if needed before publishing.
