# DOMINO Homepage Prototype

This project is a Next.js homepage prototype for DOMINO Glass Kitchen.

## Setup

```bash
npm install
```

Create a local environment file:

```bash
copy .env.local.example .env.local
```

Use the values in `.env.local` from your Supabase project.

## Local environment variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Seed data

The SQL seed file is in the `sql` folder:

- `sql/domino_homepage_seed.sql`

Paste that script into Supabase SQL Editor to create tables and sample records for:
- product lines
- warranty policies
- projects
- posts
- leads

## Run

```bash
npm run dev
```

## Build

```bash
npm run build
```
