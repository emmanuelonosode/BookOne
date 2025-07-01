"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
// import Link from "next/link"; // Removed Next.js Link component
import { motion } from "framer-motion"; // Import motion for animations
import BlogCard1 from "../component/BlogComponent/blogCard1"; // Assuming this path is correct
import Btn from "../component/Btn"; // Assuming this path is correct

// --- Custom Modal Component (Replaces alert/confirm) ---
const ConfirmModal = ({ message, onConfirm, onCancel, type = "confirm" }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full text-center"
      >
        <p className="text-lg font-semibold mb-4 text-gray-800">{message}</p>
        {type === "confirm" ? (
          <div className="flex justify-center gap-4">
            <button
              onClick={onConfirm}
              className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Confirm
            </button>
            <button
              onClick={onCancel}
              className="px-5 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={onConfirm} // On "OK", just close the modal
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            OK
          </button>
        )}
      </motion.div>
    </div>
  );
};

// --- Framer Motion Variants ---
const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100,
    },
  },
};

const blogCardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Delay between each card's animation
      delayChildren: 0.1, // Delay before the first card starts animating
    },
  },
};

const blogCardItemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 90,
    },
  },
};

const newsletterContainerVariants = {
  // Renamed for clarity, as it's the container for newsletter content
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 80,
      staggerChildren: 0.1, // Stagger direct children (text div and form)
      delayChildren: 0.2,
    },
  },
};

const newsletterContentItemVariants = {
  // Specific variants for items inside newsletter sections
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 90,
    },
  },
};

export default function BlogHome() {
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("confirm"); // 'confirm' or 'alert'
  const [modalCallback, setModalCallback] = useState(null); // Function to call on confirm

  const isAdmin = session?.user?.email === "admin@email.com"; // Changed role to email for consistency with previous API

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

  const handleDeleteClick = (blogId) => {
    setModalMessage("Are you sure you want to delete this blog post?");
    setModalType("confirm");
    setModalCallback(() => async () => {
      // This is the actual delete logic
      try {
        const response = await fetch(`/api/blogs/${blogId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setBlogs(blogs.filter((blog) => blog._id !== blogId));
          setModalMessage("Blog post deleted successfully!");
          setModalType("alert");
          setModalCallback(() => () => setShowModal(false)); // Close modal on OK
        } else {
          const errorData = await response.json();
          setModalMessage(
            `Failed to delete blog post: ${
              errorData.details || response.statusText
            }`
          );
          setModalType("alert");
          setModalCallback(() => () => setShowModal(false)); // Close modal on OK
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
        setModalMessage("Error deleting blog post.");
        setModalType("alert");
        setModalCallback(() => () => setShowModal(false)); // Close modal on OK
      }
    });
    setShowModal(true);
  };

  const handleModalConfirm = () => {
    if (modalCallback) {
      modalCallback();
    }
  };

  const handleModalCancel = () => {
    setShowModal(false);
    setModalCallback(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <section className="py-28 bg-white overflow-hidden">
      {" "}
      {/* Added bg-white and overflow-hidden */}
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10">
          <motion.h1
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="max-w-[750px] text-3xl md:text-4xl font-bold text-gray-900" // Added md:text-4xl
          >
            Fresh Takes on Tech and Design
          </motion.h1>
          <motion.p
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="pat max-w-lg text-zinc-900 mt-2 text-lg" // Added text-lg
          >
            Deep dives, quick wins, and creative thoughts from a developer's
            perspective.
          </motion.p>
          {isAdmin && (
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="mt-4"
            >
              {/* Replaced Next.js Link with standard <a> tag */}
              <a
                href="/blogs/new"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Create New Post
              </a>
            </motion.div>
          )}
        </div>

        {/* Blog Cards */}
        <motion.div
          className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" // Adjusted grid for better responsiveness
          variants={blogCardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // Trigger animation when 20% of the grid is visible
        >
          {blogs.map((blog) => (
            <motion.div
              key={blog._id}
              className="relative"
              variants={blogCardItemVariants}
            >
              <BlogCard1
                title={blog.title}
                excerpt={blog.desc} // Ensure blog.desc exists or adjust to blog.content for excerpt
                banner={blog.banner}
                slug={blog.slug}
              />
              {isAdmin && (
                <div className="absolute top-2 right-2 flex gap-2 z-10">
                  {" "}
                  {/* Added z-10 to ensure buttons are above card */}
                  {/* Replaced Next.js Link with standard <a> tag */}
                  <a
                    href={`/blogs/edit/${blog.slug}`}
                    className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
                  >
                    Edit
                  </a>
                  <button
                    onClick={() => handleDeleteClick(blog._id)} // Use new handler
                    className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter */}
        <motion.div
          className="flex items-center max-md:flex-col gap-6 py-28"
          id="newsletter"
          variants={newsletterContainerVariants} // Use the new container variants
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }} // Animate when 40% in view
        >
          <motion.div
            className="grid gap-4 w-full max-md:text-center"
            variants={newsletterContentItemVariants}
          >
            {" "}
            {/* Apply item variants to this div */}
            <motion.h3
              className="text-2xl font-bold"
              variants={newsletterContentItemVariants}
            >
              Sign up for our newsletter
            </motion.h3>
            <motion.p
              className="pat text-gray-600"
              variants={newsletterContentItemVariants}
            >
              Smart reads. Once a week. That's it.
            </motion.p>
          </motion.div>
          <motion.form
            className="w-full max-w-xl"
            variants={newsletterContentItemVariants}
          >
            {" "}
            {/* Apply item variants to the form */}
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
          </motion.form>
        </motion.div>
      </div>
      {/* Render Modal if showModal is true */}
      {showModal && (
        <ConfirmModal
          message={modalMessage}
          type={modalType}
          onConfirm={handleModalConfirm}
          onCancel={handleModalCancel}
        />
      )}
    </section>
  );
}
