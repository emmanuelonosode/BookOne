import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    content: {
      type: Object, // Editor.js outputs structured JSON
      required: [true, "Content is required"],
    },
    banner: {
      type: String,
      required: [true, "Banner image URL is required"],
    },
    location: {
      type: String,
      default: "Unknown",
    },
    author: {
      id: { type: String, required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    lowercase: {
      type: String,
      required: true,
      lowercase: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Generate slug before validation
blogSchema.pre("validate", function (next) {
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  if (this.isModified("title")) {
    this.lowercase = this.title.toLowerCase();
  }

  next();
});

// Ensure updatedAt is current before each save
blogSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Handle duplicate slug error gracefully
blogSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new Error("A blog post with this title or slug already exists."));
  } else {
    next(error);
  }
});

// Static method to find a blog by its slug
blogSchema.statics.findBySlug = function (slug) {
  return this.findOne({ slug: slug.toLowerCase() });
};

// Instance method to update a blog
blogSchema.methods.updateBlog = async function (updates) {
  Object.assign(this, updates);
  return this.save();
};

// Create or reuse Blog model
const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
