import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * @method GET
 * @route /api/blogs/[slug]
 * @description Fetch a single blog post by slug
 */
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { slug } = params;
    const blog = await Blog.findOne({ slug }).select("-__v");
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching blog", details: error.message },
      { status: 500 }
    );
  }
}

/**
 * @method PUT
 * @route /api/blogs/[slug]
 * @description Update a blog post by slug (admin only)
 */
export async function PUT(request, { params }) {
  // Admin authentication
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json(
      { error: "Unauthorized. Admin access required." },
      { status: 403 }
    );
  }
  try {
    await connectDB();
    const { slug } = params;
    const body = await request.json();
    const updatedBlog = await Blog.findOneAndUpdate({ slug }, body, {
      new: true,
    });
    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating blog", details: error.message },
      { status: 500 }
    );
  }
}

/**
 * @method DELETE
 * @route /api/blogs/[slug]
 * @description Delete a blog post by slug or ID (admin only)
 */
export async function DELETE(request, { params }) {
  // Admin authentication
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json(
      { error: "Unauthorized. Admin access required." },
      { status: 403 }
    );
  }
  try {
    await connectDB();
    const { slug } = params;

    // Check if the parameter is a MongoDB ObjectId (24 character hex string)
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(slug);

    let deletedBlog;
    if (isObjectId) {
      // If it's an ObjectId, delete by ID
      deletedBlog = await Blog.findByIdAndDelete(slug);
    } else {
      // Otherwise, delete by slug
      deletedBlog = await Blog.findOneAndDelete({ slug });
    }

    if (!deletedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(deletedBlog, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting blog", details: error.message },
      { status: 500 }
    );
  }
}
