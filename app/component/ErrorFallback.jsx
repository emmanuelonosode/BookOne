import Link from "next/link";

export default function ErrorFallback({ error, reset }) {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="text-center max-w-xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-6">
          {error?.message ||
            "An error occurred while loading the content. Please try again later."}
        </p>
        <div className="space-x-4">
          <button
            onClick={reset}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}
