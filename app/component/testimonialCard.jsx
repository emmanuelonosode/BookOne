export default function TestimonialCard({ testimonial }) {
  if (!testimonial || !testimonial.quote) return null;

  return (
    <div className="bg-white border border-[#1C1917]/[0.08] p-8 rounded-2xl shadow-sm my-12">
      <blockquote className="text-xl italic text-[#3A352F]">
        "{testimonial.quote}"
      </blockquote>
      <p className="mt-4 text-right font-semibold text-[#1C1917]">
        - {testimonial.author}
        {testimonial.role && (
          <span className="block text-sm font-normal text-[#9C968C]">
            {testimonial.role}
          </span>
        )}
      </p>
    </div>
  );
}
