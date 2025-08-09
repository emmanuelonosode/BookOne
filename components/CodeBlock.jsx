"use client";

export default function CodeBlock({ value }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value.code);
      // You could add a toast notification here
    } catch (err) {
      // Removed console.error for production cleanliness
    }
  };

  return (
    <div className="my-8 overflow-hidden rounded-2xl shadow-lg border border-gray-200">
      <div className="bg-gray-800 px-6 py-3 flex items-center justify-between">
        <span className="text-gray-300 text-sm font-mono">
          {value.language || "code"}
        </span>
        <button
          onClick={handleCopy}
          className="text-gray-300 hover:text-white text-sm bg-gray-700 px-3 py-1 rounded transition-colors"
          aria-label="Copy code to clipboard"
        >
          Copy
        </button>
      </div>
      <pre className="bg-gray-900 text-gray-100 p-6 overflow-x-auto">
        <code className="font-mono text-sm">{value.code}</code>
      </pre>
    </div>
  );
}
