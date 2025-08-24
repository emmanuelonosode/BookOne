const config = {
  plugins: [
    "@tailwindcss/postcss",
    // Add CSS optimization plugins for production
    ...(process.env.NODE_ENV === "production"
      ? ["autoprefixer", "cssnano"]
      : []),
  ],
};

export default config;
