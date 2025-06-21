import BlogCard1 from "../component/BlogComponent/blogCard1";
import Btn from "../component/Btn";

// Fetch directly from your source (database, CMS, or API)
async function getBlogs() {
  const res = await fetch("http://localhost:3000/api/blogs", {
    cache: "no-store", // SSR - prevent caching, good for dynamic blogs
  });
  return res.json();
}

export default async function BlogHome() {
  const blogs = await getBlogs();

  return (
    <section className="py-28">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10">
          <h1 className="max-w-[750px] text-3xl font-bold">
            Fresh Takes on Tech and Design
          </h1>
          <p className="pat max-w-lg text-zinc-900 mt-2">
            Deep dives, quick wins, and creative thoughts from a developer’s
            perspective.
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid gap-10 grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))]">
          {blogs.map((blog) => (
            <BlogCard1
              key={blog.id}
              title={blog.title}
              excerpt={blog.excerpt}
              imgurl={blog.imgurl}
              categories={blog.categories}
              timeToRead={blog.timeToRead}
              slug={blog.slug}
            />
          ))}
        </div>

        {/* Newsletter */}
        <div
          className="flex items-center max-md:flex-col gap-6 py-28"
          id="newsletter"
        >
          <div className="grid gap-4 w-full max-md:text-center">
            <h3 className="text-2xl font-bold">Sign up for our newsletter</h3>
            <p className="pat text-gray-600">
              Smart reads. Once a week. That’s it.
            </p>
          </div>
          <form className="w-full max-w-xl">
            <div className="flex gap-4 max-md:flex-col mb-4">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                placeholder="example@email.com"
                name="email"
                id="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <Btn label="Subscribe" />
            </div>
            <p className="text-xs text-gray-500">
              By clicking Subscribe you agree to our Terms and Conditions.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
