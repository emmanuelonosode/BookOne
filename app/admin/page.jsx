"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    if (!session || session.user.role !== "admin") {
      router.push("/auth/signin");
      return;
    }

    fetchBlogs();
  }, [session, status, router]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs");
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      }
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

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!session || session.user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Access denied. Admin privileges required.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome back, {session.user.name}! Manage your blog posts here.
          </p>
        </div>

        <div className="mb-6">
          <Link
            href="/blogs/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Create New Post
          </Link>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {blogs.map((blog) => (
              <li key={blog._id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Created: {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Location: {blog.location}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                    >
                      View
                    </Link>
                    <Link
                      href={`/blogs/edit/${blog.slug}`}
                      className="text-green-600 hover:text-green-900 text-sm font-medium"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="text-red-600 hover:text-red-900 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {blogs.length === 0 && (
            <div className="px-6 py-12 text-center text-gray-500">
              No blog posts found. Create your first post!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
