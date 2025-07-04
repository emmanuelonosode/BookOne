"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const BlogEditor = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [location, setLocation] = useState("Osogbo");
  const [title, setTitle] = useState("");
  const [banner, setBanner] = useState(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (status === "loading") return;

    if (!session || session.user.role !== "admin") {
      router.push("/auth/signin");
      return;
    }
  }, [session, status, router]);

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

  useEffect(() => {
    const initEditor = async () => {
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
        const LinkTool = (await import("@editorjs/link")).default; // <-- Add this line

        if (!editorRef.current) {
          const editor = new EditorJS({
            holder: "editorjs",
            autofocus: true,
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
              linkTool: {
                class: LinkTool,
                config: {
                  endpoint: "/api/fetchUrl", // Optional: endpoint for link data fetching
                },
              },
            },
            onReady: () => console.log("Editor is ready"),
          });
          editorRef.current = editor;
        }
      } catch (error) {
        console.error("EditorJS initialization failed:", error);
      }
    };

    setTimeout(() => {
      initEditor();
    }, 0);

    return () => {
      if (editorRef.current?.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

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
    try {
      const content = await editorRef.current.save();
      const postData = {
        title,
        content,
        banner,
        location,
        author: {
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
        },
      };

      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      if (res.ok) {
        alert("Blog post submitted!");
        router.push("/admin");
      } else {
        alert("Failed to submit blog post.");
      }
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  if (status === "loading") {
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
          <h1 className="text-2xl font-serif mb-4">Create New Blog Post</h1>

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

          <button
            type="submit"
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Submit Post
          </button>
        </form>
      </div>
    </section>
  );
};

export default BlogEditor;
