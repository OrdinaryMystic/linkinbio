/**
 * send-newsletter.mjs
 *
 * Sends a newsletter issue to all active Supabase subscribers via Resend.
 *
 * Usage:
 *   node scripts/send-newsletter.mjs \
 *     --subject "Taurus Season: The Bull and the Body" \
 *     --html scripts/issues/2026-04-20.html
 *
 * Dry run (logs recipients, sends nothing):
 *   node scripts/send-newsletter.mjs --subject "..." --html "..." --dry-run
 *
 * Env vars needed (loaded from .env.local automatically):
 *   RESEND_API_KEY
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { readFileSync, existsSync } from "fs";
import { resolve, join, dirname } from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// ---------------------------------------------------------------------------
// Load .env.local manually (no dotenv dependency needed)
// ---------------------------------------------------------------------------
const envPath = join(ROOT, ".env.local");
if (existsSync(envPath)) {
  const lines = readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = val;
  }
  console.log("Loaded .env.local");
}

// ---------------------------------------------------------------------------
// Parse args
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);

function getArg(flag) {
  const idx = args.indexOf(flag);
  return idx !== -1 ? args[idx + 1] : undefined;
}

const subject = getArg("--subject");
const htmlFile = getArg("--html");
const dryRun = args.includes("--dry-run");

if (!subject) {
  console.error("Error: --subject is required");
  process.exit(1);
}
if (!htmlFile) {
  console.error("Error: --html <path> is required");
  process.exit(1);
}

const htmlPath = resolve(ROOT, htmlFile);
if (!existsSync(htmlPath)) {
  console.error(`Error: HTML file not found: ${htmlPath}`);
  process.exit(1);
}
const rawHtml = readFileSync(htmlPath, "utf-8");

// ---------------------------------------------------------------------------
// Clients
// ---------------------------------------------------------------------------
const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

// ---------------------------------------------------------------------------
// Fetch active subscribers
// ---------------------------------------------------------------------------
const { data: subscribers, error: dbError } = await supabase
  .from("newsletter_subscribers")
  .select("email, unsubscribe_token")
  .eq("status", "active");

if (dbError) {
  console.error("Supabase error:", dbError.message);
  process.exit(1);
}

if (!subscribers || subscribers.length === 0) {
  console.log("No active subscribers. Nothing to send.");
  process.exit(0);
}

console.log(`\nSubject:    ${subject}`);
console.log(`Recipients: ${subscribers.length}`);
if (dryRun) console.log("DRY RUN — no emails will be sent.\n");
else console.log("");

// ---------------------------------------------------------------------------
// Send
// ---------------------------------------------------------------------------
const SITE = "https://ordinarymysticreadings.com";
const FROM = "Tyler (Ordinary Mystic) <tyler@ordinarymysticreadings.com>";
const DELAY_MS = 120; // ~8 sends/sec — well under Resend limits

let sent = 0;
let failed = 0;

for (const { email, unsubscribe_token } of subscribers) {
  const unsubscribeUrl = `${SITE}/api/newsletter/unsubscribe?token=${unsubscribe_token}`;
  const html = rawHtml.replace(/\{\{UNSUBSCRIBE_URL\}\}/g, unsubscribeUrl);

  if (dryRun) {
    console.log(`  [dry] ${email}`);
    sent++;
    continue;
  }

  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject,
      headers: {
        "List-Unsubscribe": `<${unsubscribeUrl}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
      html,
    });
    console.log(`  ✓ ${email}`);
    sent++;
  } catch (err) {
    console.error(`  ✗ ${email} —`, err.message);
    failed++;
  }

  await new Promise((r) => setTimeout(r, DELAY_MS));
}

console.log(`\nDone. Sent: ${sent}${failed ? ` | Failed: ${failed}` : ""}`);
