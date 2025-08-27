"use client";

import { usePerformanceTest } from "../../lib/hooks/usePerformance";

export default function TestHooksPage() {
  const { testValue, increment } = usePerformanceTest();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Performance Hooks Test</h1>
        <p className="mb-4">Test Value: {testValue}</p>
        <button
          onClick={increment}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Increment
        </button>
        <p className="mt-4 text-sm text-gray-600">
          If this page loads without errors, the hooks are working correctly.
        </p>
      </div>
    </div>
  );
}
