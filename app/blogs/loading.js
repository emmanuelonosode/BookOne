export default function Loading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="animate-pulse space-y-8 w-full max-w-4xl mx-auto px-4">
        {/* Featured post skeleton */}
        <div className="bg-gray-200 h-[400px] rounded-2xl w-full" />

        {/* Grid posts skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-[300px] rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
