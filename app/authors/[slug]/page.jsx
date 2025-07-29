import { sanity, urlFor } from "@/lib/sanity";
import { authorBySlugQuery, blogsByAuthorQuery } from "@/lib/queries";
import { generateMetaTags } from "../../seo-config";

// Add caching configuration
export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata({ params }) {
  const author = await sanity.fetch(authorBySlugQuery, { slug: params.slug });
  if (!author) return {};

  return generateMetaTags({
    title: `${author.name} | Author at BookOne`,
    description: `Read articles and insights by ${author.name}, expert author at BookOne. Discover professional content on web design, SEO, and AI automation.`,
    url: `/authors/${params.slug}`,
    keywords: [
      author.name,
      "BookOne author",
      "web design expert",
      "SEO specialist",
      "AI automation expert",
      "digital marketing",
      "business automation",
    ],
  });
}

export default async function AuthorPage({ params }) {
  const author = await sanity.fetch(authorBySlugQuery, { slug: params.slug });
  const blogs = await sanity.fetch(blogsByAuthorQuery, { slug: params.slug });

  if (!author) return <div className="py-16 text-center">Author not found</div>;

  return (
    <section className="max-w-3xl mx-auto py-16 px-4">
      <div className="flex items-center gap-6 mb-8">
        {author.image && (
          <img
            src={urlFor(author.image)}
            alt={author.name}
            className="w-24 h-24 rounded-full object-cover"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold mb-2">{author.name}</h1>
          {author.bio && (
            <div className="text-gray-700 text-base">{author.bio}</div>
          )}
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-4">Posts by {author.name}</h2>
      <ul className="space-y-4">
        {blogs.map((blog) => (
          <li key={blog._id}>
            <a
              href={`/blogs/${blog.slug.current}`}
              className="text-lg text-primary hover:underline font-medium"
            >
              {blog.title}
            </a>
            <div className="text-sm text-gray-500">
              {new Date(blog._createdAt).toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
