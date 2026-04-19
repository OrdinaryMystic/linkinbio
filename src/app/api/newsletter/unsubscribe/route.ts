import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(
      new URL("/unsubscribed?error=missing-token", request.url)
    );
  }

  let email: string;
  try {
    email = Buffer.from(token, "base64url").toString("utf-8");
    if (!email || !email.includes("@")) throw new Error("invalid");
  } catch {
    return NextResponse.redirect(
      new URL("/unsubscribed?error=invalid-token", request.url)
    );
  }

  try {
    await resend.contacts.update({ email, unsubscribed: true });
  } catch (err) {
    console.error("[newsletter] Resend unsubscribe error:", err);
    return NextResponse.redirect(
      new URL("/unsubscribed?error=server", request.url)
    );
  }

  return NextResponse.redirect(new URL("/unsubscribed", request.url));
}
