import BlogContent from "@/app/component/BlogComponent/BlogContent";

export default async function ReadBlog({ params }) {
  const { slug } = params;
  const res = await fetch(`http://localhost:3000/api/blogs/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return (
      <section className="bg-gray-100 py-30">
        <div className="container">
          <div>No blog found.</div>
        </div>
      </section>
    );
  }
  const blog = await res.json();
  console.log(blog.content.blocks);

  return (
    <section className="bg-gray-100 py-30">
      <div className="container max-w-3xl mx-auto py-10">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        {blog.banner && (
          <img
            src={blog.banner}
            alt={blog.title}
            className="w-full h-80 object-cover rounded mb-6"
          />
        )}
        <div className="mb-6 text-gray-500 text-sm">
          {blog.location && <span>Location: {blog.location} | </span>}
          {blog.createdAt && (
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          )}
        </div>
        {blog.content && blog.content.blocks ? (
          <BlogContent blocks={blog.content.blocks} />
        ) : (
          <div>No content available.</div>
        )}
      </div>
    </section>
  );
}
