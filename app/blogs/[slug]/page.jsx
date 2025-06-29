"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BlogContent from "@/app/component/BlogComponent/BlogContent";
import getReadTime from "../../../lib/readTime";

export default function ReadBlog({ params }) {
  const { slug } = params;
  const { data: session } = useSession();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const isAdmin = session?.user?.role === "admin";

  useEffect(() => {
    fetchBlog();
    // eslint-disable-next-line
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const res = await fetch(`/api/blogs/${slug}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        setBlog(null);
        return;
      }
      const data = await res.json();
      setBlog(data);
    } catch (error) {
      console.error("Error fetching blog:", error);
      setBlog(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this blog post?")) {
      return;
    }
    try {
      const response = await fetch(`/api/blogs/${blog._id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Blog post deleted successfully!");
        router.push("/blogs");
      } else {
        alert("Failed to delete blog post.");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Error deleting blog post.");
    }
  };

  // Calculate read time
  let readTime = "";
  if (blog && blog.content && Array.isArray(blog.content.blocks)) {
    const text = blog.content.blocks
      .map((block) => block.data?.text || "")
      .join(" ");
    readTime = getReadTime(text);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <section className="bg-gray-100 py-30">
        <div className="container">
          <div>No blog found.</div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-100 pb-20 pt-10">
      <div className="max-w-3xl mx-auto py-10">
        {isAdmin && (
          <div className="mb-6 flex gap-4 justify-end">
            <Link
              href={`/blogs/edit/${blog.slug}`}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Edit Post
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete Post
            </button>
          </div>
        )}

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
          {readTime && <span className="ml-2">| {readTime} min read</span>}
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
