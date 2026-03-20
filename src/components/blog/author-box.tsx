import Image from "next/image";
import Link from "next/link";

export type AuthorSummary = {
  slug: string;
  name: string;
  bio?: string;
  description?: string;
  image: string;
  socials?: {
    label: string;
    url: string;
  }[];
};

type AuthorBoxProps = {
  author: AuthorSummary;
};

export function AuthorBox({ author }: AuthorBoxProps) {
  const summaryText = author.description ?? author.bio ?? "";

  const iconForSocial = (label: string) => {
    if (label === "YouTube") return "/images/youtube-app-white-icon.png";
    if (label === "TikTok") return "/images/tiktok-white-icon.png";
    return "/images/email-white-icon.png";
  };

  return (
    <section className="rounded-xl border border-[#3a315d] bg-[#1f2237] p-4 text-white sm:p-6">
      <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-white/70">
        Author
      </h2>
      <div className="mt-3 flex items-start gap-4">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-white/30 bg-white/10">
          <Image src={author.image} alt={author.name} fill className="object-cover" />
        </div>
        <div className="space-y-1">
          <Link
            href={`/authors/${author.slug}`}
            className="font-semibold text-white underline-offset-4 hover:underline"
          >
            {author.name}
          </Link>
          {summaryText ? (
            <p className="text-sm leading-relaxed text-white/90">{summaryText}</p>
          ) : null}
          {author.socials?.length ? (
            <div className="mt-3 flex flex-wrap gap-3">
              {author.socials.map((social) => (
                <Link
                  key={social.url}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-90 transition-opacity hover:opacity-100"
                  aria-label={social.label}
                >
                  <Image src={iconForSocial(social.label)} alt="" width={24} height={24} />
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
