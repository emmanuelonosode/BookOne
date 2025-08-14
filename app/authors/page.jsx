export async function generateMetadata() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev";
  return {
    title: "Authors | BookOne",
    description:
      "Meet the talented authors and experts behind BookOne's content.",
    keywords: [
      "authors",
      "BookOne team",
      "content creators",
      "experts",
      "writers",
    ],
    alternates: {
      canonical: `${baseUrl}/authors`,
    },
    openGraph: {
      title: "Authors | BookOne",
      description:
        "Meet the talented authors and experts behind BookOne's content.",
      url: `${baseUrl}/authors`,
      siteName: "BookOne",
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: "BookOne Authors",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Authors | BookOne",
      description:
        "Meet the talented authors and experts behind BookOne's content.",
      images: ["/opengraph-image.png"],
      creator: "@EmmanuelOnosod1",
      site: "@EmmanuelOnosod1",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
import { sanity } from "@/lib/sanity";
import { allAuthorsQuery } from "@/lib/queries";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 3600; // ISR for authors page

export default async function AuthorsPage() {
  const authors = await sanity.fetch(
    allAuthorsQuery,
    {},
    { cache: "force-cache" }
  );

  return (
    <section
      className="py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-purple-50 min-h-screen"
      aria-labelledby="authors-heading"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1
            id="authors-heading"
            className="text-4xl font-bold text-gray-900 mb-4"
            tabIndex={0}
          >
            Meet Our Authors
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the talented writers and experts behind our content.
          </p>
        </div>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          role="list"
          aria-label="Authors List"
        >
          {authors.map((author) => (
            <div
              key={author._id}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center"
              tabIndex={0}
              role="listitem"
              aria-label={`Author: ${author.name}`}
            >
              {author.image && (
                <Image
                  src={author.image.asset?.url || author.image}
                  alt={author.name}
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-purple-200"
                  priority={true}
                />
              )}
              <h2
                className="text-xl font-semibold text-gray-900 mb-2"
                tabIndex={0}
              >
                {author.name}
              </h2>
              <p
                className="text-sm text-gray-600 mb-4 text-center"
                tabIndex={0}
              >
                {author.bio}
              </p>
              <Link
                href={`/authors/${author.slug?.current}`}
                className="inline-block px-4 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label={`View profile for ${author.name}`}
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
