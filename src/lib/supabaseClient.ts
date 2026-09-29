import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Only create the Supabase client when required env vars are present.
export let supabase: any = null
if (supabaseUrl && supabaseAnonKey) {
	supabase = createClient(supabaseUrl, supabaseAnonKey)
} else {
	// eslint-disable-next-line no-console
	console.warn('Supabase env vars are not set: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

// Server helper to fetch homepage data (use in Server Components)
export async function fetchHomepageData() {
	if (!supabase) return { products: [], warranties: [], projects: [], posts: [] }

	const [{ data: products }, { data: warranties }, { data: projects }, { data: posts }] = await Promise.all([
		supabase.from('product_lines').select('*').limit(8),
		supabase.from('warranty_policies').select('*'),
		supabase.from('projects').select('*').limit(3),
		supabase.from('posts').select('*').limit(3),
	])

	return {
		products: products || [],
		warranties: warranties || [],
		projects: projects || [],
		posts: posts || [],
	}
}
