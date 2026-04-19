import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let email: string;

  try {
    const body = await request.json();
    email = (body.email ?? "").toLowerCase().trim();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "A valid email address is required." },
      { status: 400 }
    );
  }

  // Insert into Supabase — unique constraint handles duplicates
  const { error: dbError } = await supabaseAdmin
    .from("newsletter_subscribers")
    .insert({ email, source: "website" });

  if (dbError) {
    // 23505 = unique_violation (already subscribed)
    if (dbError.code === "23505") {
      return NextResponse.json({ success: true });
    }
    console.error("[newsletter] Supabase error:", dbError);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  // Send welcome email — non-blocking; don't fail the sub if email errors
  try {
    await resend.emails.send({
      from: "Tyler (Ordinary Mystic) <tyler@ordinarymysticreadings.com>",
      to: email,
      subject: "You're on the list.",
      html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#1a1614;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#1a1614;padding:48px 24px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
          <tr>
            <td style="padding-bottom:32px;border-bottom:1px solid #2d2620;">
              <p style="margin:0;font-size:10px;font-weight:600;letter-spacing:0.3em;text-transform:uppercase;color:#7a2e2a;">
                Ordinary Mystic
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding-top:32px;">
              <p style="margin:0 0 20px;font-size:22px;font-weight:600;line-height:1.3;color:#f5f0e8;">
                You&rsquo;re on the list.
              </p>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#9a8d7d;">
                Every week I send a short letter on the astrological weather &mdash; what&rsquo;s in the sky, what&rsquo;s worth paying attention to, and how to think about the week in front of you.
              </p>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#9a8d7d;">
                No cosmic inevitabilities. Just pattern recognition.
              </p>
              <p style="margin:0 0 32px;font-size:15px;line-height:1.7;color:#9a8d7d;">
                I&rsquo;ll also share updates on Querent, the reading companion I&rsquo;m building, as it takes shape.
              </p>
              <p style="margin:0;font-size:14px;line-height:1.6;color:#6b5e52;">
                &mdash; Tyler<br>
                <a href="https://ordinarymystic.com" style="color:#7a2e2a;text-decoration:none;">ordinarymystic.com</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding-top:40px;border-top:1px solid #2d2620;margin-top:40px;">
              <p style="margin:0;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#3a312b;">
                Tulsa, Oklahoma
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `.trim(),
    });
  } catch (emailError) {
    console.error("[newsletter] Resend error:", emailError);
    // Subscription is saved — don't surface this error to the user
  }

  return NextResponse.json({ success: true });
}
