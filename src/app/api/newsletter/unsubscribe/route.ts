import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(
      new URL("/unsubscribed?error=missing-token", request.url)
    );
  }

  const { data, error } = await getSupabaseAdmin()
    .from("newsletter_subscribers")
    .update({ status: "unsubscribed", unsubscribed_at: new Date().toISOString() })
    .eq("unsubscribe_token", token)
    .eq("status", "active")
    .select("email")
    .single();

  if (error) {
    console.error("[newsletter] Unsubscribe error:", error);
    return NextResponse.redirect(
      new URL("/unsubscribed?error=server", request.url)
    );
  }

  // Sync unsubscribe to Resend — non-blocking
  if (data?.email) {
    try {
      await resend.contacts.update({ email: data.email, unsubscribed: true });
    } catch (contactError) {
      console.error("[newsletter] Resend unsubscribe sync error:", contactError);
    }
  }

  return NextResponse.redirect(new URL("/unsubscribed", request.url));
}
