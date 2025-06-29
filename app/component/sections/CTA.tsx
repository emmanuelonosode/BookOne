import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-20 text-center">
      <div className="container max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">
          Ready to bring your business online?
        </h2>
        <p className=" mb-8">
          Let`s talk about how BookOne can help you launch smarter and faster.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-white text-primary font-semibold px-6 py-3 rounded-full hover:bg-light transition"
        >
          Get a Free Consultation
        </Link>
      </div>
    </section>
  );
}
