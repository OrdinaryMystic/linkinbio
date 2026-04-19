import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(
      new URL("/unsubscribed?error=missing-token", request.url)
    );
  }

  const { error } = await getSupabaseAdmin()
    .from("newsletter_subscribers")
    .update({ status: "unsubscribed", unsubscribed_at: new Date().toISOString() })
    .eq("unsubscribe_token", token)
    .eq("status", "active");

  if (error) {
    console.error("[newsletter] Unsubscribe error:", error);
    return NextResponse.redirect(
      new URL("/unsubscribed?error=server", request.url)
    );
  }

  return NextResponse.redirect(new URL("/unsubscribed", request.url));
}
