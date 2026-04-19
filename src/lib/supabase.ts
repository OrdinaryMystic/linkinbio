import { createClient } from "@supabase/supabase-js";

// Admin client — server-side only (API routes). Never import in client components.
// Lazy getter avoids module-level initialization errors during Next.js build.
export function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
