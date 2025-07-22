export default function TestimonialCard({ testimonial }) {
  if (!testimonial || !testimonial.quote) return null;

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg my-12">
      <blockquote className="text-xl italic text-gray-300">
        "{testimonial.quote}"
      </blockquote>
      <p className="mt-4 text-right font-semibold text-white">
        - {testimonial.author}
        {testimonial.role && (
          <span className="block text-sm font-normal text-gray-400">
            {testimonial.role}
          </span>
        )}
      </p>
    </div>
  );
}
