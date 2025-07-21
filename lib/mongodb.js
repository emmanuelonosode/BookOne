import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      family: 4,
      maxPoolSize: 10,
      minPoolSize: 5,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => mongoose)
      .catch((error) => {
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw new Error(`Failed to connect to MongoDB: ${e.message}`);
  }

  return cached.conn;
}

// Handle connection events
mongoose.connection.on("error", () => {});

mongoose.connection.on("disconnected", () => {});

mongoose.connection.on("connected", () => {});

// Handle process termination
process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    process.exit(1);
  }
});

export default connectDB;
