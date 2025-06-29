"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import BlogCard1 from "../component/BlogComponent/blogCard1";
import Btn from "../component/Btn";

export default function BlogHome() {
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = session?.user?.role === "admin";

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs", {
        cache: "no-store",
      });
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (blogId) => {
    if (!confirm("Are you sure you want to delete this blog post?")) {
      return;
    }

    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setBlogs(blogs.filter((blog) => blog._id !== blogId));
        alert("Blog post deleted successfully!");
      } else {
        alert("Failed to delete blog post.");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Error deleting blog post.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <section className="py-28">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10">
          <h1 className="max-w-[750px] text-3xl font-bold">
            Fresh Takes on Tech and Design
          </h1>
          <p className="pat max-w-lg text-zinc-900 mt-2">
            Deep dives, quick wins, and creative thoughts from a developer's
            perspective.
          </p>
          {isAdmin && (
            <div className="mt-4">
              <Link
                href="/blogs/new"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Create New Post
              </Link>
            </div>
          )}
        </div>

        {/* Blog Cards */}
        <div className="grid gap-10 grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))]">
          {blogs.map((blog) => (
            <div key={blog._id} className="relative">
              <BlogCard1
                title={blog.title}
                excerpt={blog.desc}
                banner={blog.banner}

                slug={blog.slug}
              />
              {isAdmin && (
                <div className="absolute top-2 right-2 flex gap-2">
                  <Link
                    href={`/blogs/edit/${blog.slug}`}
                    className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
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
              Smart reads. Once a week. That's it.
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
