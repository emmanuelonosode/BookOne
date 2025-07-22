import { sanity, urlFor } from "@/lib/sanity";
import { projects } from "../../lib/queries";

export async function generateMetadata({ params }) {
  return {
    title: "Our Portfolio | BookOne Web Agency",
    description:
      "Explore our curated portfolio of web design, development, and automation projects. See how BookOne helps businesses grow with modern, effective digital solutions.",
    openGraph: {
      title: "Our Portfolio | BookOne Web Agency",
      description:
        "Explore our curated portfolio of web design, development, and automation projects. See how BookOne helps businesses grow with modern, effective digital solutions.",
      url: "http://localhost/3000/portfolio",
      type: "website",
      images: [
        {
          url: "https://yourdomain.com/og-image/portfolio.png", // Replace with your actual OG image
          width: 1200,
          height: 630,
          alt: "BookOne Portfolio Showcase",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Our Portfolio | BookOne Web Agency",
      description:
        "Take a look at the stunning websites and tools we've created to help businesses thrive online.",
      images: ["https://yourdomain.com/og-image/portfolio.png"], // Replace this too
    },
  };
}
export default async function PortfolioListPage() {
  const portfolios = await sanity.fetch(projects);

  return (
    <section className="py-16 md:py-22 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-8">Our Portfolio</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolios.length === 0 && (
          <li className="text-center text-gray-500 py-12 text-lg col-span-full">
            No projects found.
          </li>
        )}
        {portfolios.map((project) => (
          <li
            key={project._id}
            className="bg-white rounded-xl shadow p-6 flex flex-col hover:shadow-lg transition"
          >
            {project.images && project.images[0] && (
              <a
                href={`/portfolio/${project.slug.current}`}
                className="block mb-4"
              >
                <img
                  src={urlFor(project.images[0])}
                  alt={project.title}
                  className="rounded-lg w-full h-40 object-cover"
                />
              </a>
            )}
            <a
              href={`/portfolio/${project.slug.current}`}
              className="text-2xl font-bold text-primary hover:underline mb-2"
            >
              {project.title}
            </a>
            <div className="flex flex-wrap gap-2 mb-2">
              {project.category && (
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium">
                  {project.category}
                </span>
              )}
            </div>
            <div className="text-gray-600 text-sm mb-2 line-clamp-2">
              {project.overview?.slice(0, 120)}
              {project.overview?.length > 120 ? "..." : ""}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
