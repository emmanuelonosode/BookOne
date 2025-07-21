import { sanity, urlFor } from "@/lib/sanity";
import { allCategoriesQuery, paginatedBlogsQuery } from "@/lib/queries";

const PAGE_SIZE = 6;

export default async function BlogListPage({ searchParams }) {
  const page = parseInt(searchParams?.page || "1", 10);
  const search = searchParams?.search || "";
  const category = searchParams?.category || "";

  // Build GROQ filters
  const categoryFilter = category
    ? ` && references(*[_type=='category' && slug.current=='${category}']._id)`
    : "";
  const searchFilter = search
    ? ` && (title match "*${search}*" || body[].children[].text match "*${search}*" || author->name match "*${search}*" || categories[]->title match "*${search}*")`
    : "";
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  // Replace filters in query
  const blogs = await sanity.fetch(
    paginatedBlogsQuery
      .replace("$categoryFilter", categoryFilter)
      .replace("$searchFilter", searchFilter)
      .replace("$start", start)
      .replace("$end", end)
  );
  console.log(blogs);
  const categories = await sanity.fetch(allCategoriesQuery);

  // For pagination, get total count
  const totalCount = await sanity.fetch(
    `count(*[_type == "post"${categoryFilter}${searchFilter}])`
  );
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <section className="py-16 md:py-22 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Sidebar: Categories */}
        <aside className="md:w-1/4 mb-8 md:mb-0">
          <div className="bg-white rounded-xl shadow p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4 text-primary">Categories</h2>
            <ul className="space-y-2">
              <li>
                <a
                  href="/blogs"
                  className={`block px-3 py-2 rounded-lg transition font-medium ${
                    !category
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100 text-gray-800"
                  }`}
                >
                  All Categories
                </a>
              </li>
              {categories.map((cat) => (
                <li key={cat._id}>
                  <a
                    href={`?category=${cat.slug.current}${
                      search ? `&search=${encodeURIComponent(search)}` : ""
                    }`}
                    className={`block px-3 py-2 rounded-lg transition font-medium ${
                      category === cat.slug.current
                        ? "bg-primary text-white"
                        : "hover:bg-gray-100 text-gray-800"
                    }`}
                  >
                    {cat.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        {/* Main Content: Blog List */}
        <div className="md:w-3/4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <h1 className="text-3xl font-bold text-primary">BookOne Blog</h1>
            <form className="flex gap-2 w-full md:w-auto" method="get">
              <input
                type="text"
                name="search"
                placeholder="Search by title, content, author, or category..."
                defaultValue={search}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-64 text-black focus:outline-primary"
              />
              {category && (
                <input type="hidden" name="category" value={category} />
              )}
              <button
                type="submit"
                className="bg-primary text-white px-5 py-2 rounded-lg font-semibold hover:bg-primary/90 transition"
              >
                Search
              </button>
            </form>
          </div>
          <ul className="space-y-8">
            {blogs.length === 0 && (
              <li className="text-center text-gray-500 py-12 text-lg">
                No blogs found.
              </li>
            )}
            {blogs.map((blog) => (
              <li
                key={blog._id}
                className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row gap-6 hover:shadow-lg transition"
              >
                {blog.mainImage && (
                  <a
                    href={`/blogs/${blog.slug.current}`}
                    className="md:w-1/3 block"
                  >
                    <img
                      src={urlFor(blog.mainImage)}
                      alt={blog.title}
                      className="rounded-lg w-full h-40 object-cover mb-4 md:mb-0"
                    />
                  </a>
                )}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <a
                      href={`/blogs/${blog.slug.current}`}
                      className="text-2xl font-bold text-primary hover:underline"
                    >
                      {blog.title}
                    </a>
                    <div className="flex flex-wrap gap-2 mt-2 mb-2">
                      {blog.categories?.map((cat) => (
                        <span
                          key={cat._id}
                          className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium"
                        >
                          {cat.title}
                        </span>
                      ))}
                    </div>
                    <div className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {/* Show a short excerpt from the body if available */}
                      {blog.body &&
                      blog.body[0]?.children &&
                      blog.body[0].children[0]?.text
                        ? blog.body[0].children[0].text.slice(0, 120) +
                          (blog.body[0].children[0].text.length > 120
                            ? "..."
                            : "")
                        : ""}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    {blog.author?.image && (
                      <img
                        src={urlFor(blog.author.image)}
                        alt={blog.author.name}
                        className="w-8 h-8 rounded-full object-cover border"
                      />
                    )}
                    <a
                      href={`/authors/${blog.author?.slug?.current}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      {blog.author?.name}
                    </a>
                    <span className="text-gray-400 text-xs">
                      · {new Date(blog._createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {/* Pagination */}
          <div className="flex gap-2 mt-12 justify-center">
            {Array.from({ length: totalPages }, (_, i) => (
              <a
                key={i}
                href={`?page=${i + 1}${
                  search ? `&search=${encodeURIComponent(search)}` : ""
                }${
                  category ? `&category=${encodeURIComponent(category)}` : ""
                }`}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  page === i + 1
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-primary/10"
                }`}
              >
                {i + 1}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
