# rblx-forcer — Generator (Next.js + Supabase)

This is a ready-to-deploy Next.js (App Router) project that allows users to generate public pages at:
`https://<YOUR_VERCEL_PROJECT>.vercel.app/<directory>`

## What's included
- Next.js (app directory)
- TailwindCSS
- Supabase helper (client-side)
- API route to save directory + webhook
- Dynamic page at `/[directory]`

## Setup & Deploy (quick)
1. Create a Supabase project and a table `websites` with columns:
   - id (uuid, primary key, default: gen_random_uuid())
   - directory (text, unique)
   - webhook (text)
   - created_at (timestamp, default: now())

2. On Supabase → Project Settings → API, copy:
   - `Project URL` → NEXT_PUBLIC_SUPABASE_URL
   - `anon public key` → NEXT_PUBLIC_SUPABASE_ANON_KEY

3. On Vercel:
   - Create a new project and import this repo or upload the ZIP.
   - In Project Settings → Environment Variables add:
     - NEXT_PUBLIC_SUPABASE_URL
     - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - Then Deploy.

4. After deploy visit your homepage and create a directory:
   `https://<your-vercel-domain>.vercel.app/`

## Local dev
- Copy `.env.local.example` to `.env.local` and fill values.
- Install dependencies:
  ```
  npm install
  npm run dev
  ```

## Notes
- This project expects you to set the Supabase env vars in Vercel (recommended) or locally in `.env.local`.
- Pages created are publicly visible (anyone can visit `/directory`).
