"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const EditBlog = ({ params }) => {
  const { slug } = params;
  const { data: session, status } = useSession();
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [banner, setBanner] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    if (status === "loading") return;

    if (!session || session.user.role !== "admin") {
      router.push("/auth/signin");
      return;
    }

    fetchBlog();
  }, [session, status, router, slug]);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/blogs/${slug}`);
      if (response.ok) {
        const blog = await response.json();
        setTitle(blog.title);
        setLocation(blog.location);
        setBanner(blog.banner);

        // Initialize editor with existing content
        setTimeout(() => {
          initEditor(blog.content);
        }, 100);
      } else {
        alert("Blog not found");
        router.push("/admin");
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
      alert("Error loading blog");
    } finally {
      setLoading(false);
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.error?.message || "Upload failed");

      return data.secure_url;
    } catch (err) {
      console.error("Cloudinary upload error:", err.message);
      return null;
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await uploadImageToCloudinary(file);
      if (url) setBanner(url);
    }
  };

  const initEditor = async (initialContent = null) => {
    try {
      const EditorJS = (await import("@editorjs/editorjs")).default;
      const Header = (await import("@editorjs/header")).default;
      const List = (await import("@editorjs/list")).default;
      const ImageTool = (await import("@editorjs/image")).default;
      const Paragraph = (await import("@editorjs/paragraph")).default;
      const Quote = (await import("@editorjs/quote")).default;
      const Embed = (await import("@editorjs/embed")).default;
      const CodeTool = (await import("@editorjs/code")).default;
      const Marker = (await import("@editorjs/marker")).default;
      const InlineCode = (await import("@editorjs/inline-code")).default;

      if (!editorRef.current) {
        const editor = new EditorJS({
          holder: "editorjs",
          autofocus: true,
          data: initialContent,
          tools: {
            header: Header,
            paragraph: { class: Paragraph, inlineToolbar: true },
            list: List,
            quote: Quote,
            embed: Embed,
            code: CodeTool,
            marker: Marker,
            inlineCode: InlineCode,
            image: {
              class: ImageTool,
              config: {
                uploader: {
                  uploadByFile: async (file) => {
                    const imageUrl = await uploadImageToCloudinary(file);
                    return { success: 1, file: { url: imageUrl } };
                  },
                },
              },
            },
          },
        });
        editorRef.current = editor;
      }
    } catch (error) {
      console.error("EditorJS initialization failed:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    if (!editorRef.current) {
      alert("Editor is not ready");
      return;
    }

    setSaving(true);
    try {
      const content = await editorRef.current.save();
      const postData = { title, content, banner, location };

      const res = await fetch(`/api/blogs/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      if (res.ok) {
        alert("Blog post updated successfully!");
        router.push("/admin");
      } else {
        alert("Failed to update blog post.");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Error updating blog post");
    } finally {
      setSaving(false);
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
    <section className="bg-gray-100 py-30">
      <div className="container">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-white p-6 rounded shadow"
        >
          <h1 className="text-2xl font-serif mb-4">Edit Blog Post</h1>

          <input
            type="text"
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-4 border rounded text-black"
          />

          <label className="block cursor-pointer group relative mb-4">
            <img
              src={
                banner ||
                "https://images.unsplash.com/photo-1744195467963-7d73a219a277?w=1200&auto=format&fit=crop&q=80"
              }
              alt="Banner"
              className="w-full h-64 object-contain rounded-lg shadow transition-opacity group-hover:opacity-80"
            />
            <span className="absolute bottom-2 right-2 bg-white/80 text-sm px-3 py-1 rounded shadow group-hover:opacity-100 opacity-0 transition">
              Click to change banner
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          <input
            type="text"
            placeholder="Enter location"
            className="w-full p-2 mb-4 border text-black"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <div
            id="editorjs"
            className="border p-4 bg-white text-black min-h-[300px] rounded"
          />

          <div className="mt-4 flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {saving ? "Updating..." : "Update Post"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin")}
              className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditBlog;
