export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev";
  return {
    title: "Terms and Conditions | BookOne - Service Terms & Legal",
    description:
      "Read BookOne's terms and conditions. Understand our service terms, user rights, and legal agreements for using our digital services.",
    keywords: [
      "terms and conditions",
      "service terms",
      "legal agreement",
      "BookOne terms",
      "user agreement",
      "service conditions",
      "legal terms",
    ],
    alternates: {
      canonical: `${baseUrl}/terms-and-conditions`,
    },
    openGraph: {
      title: "Terms and Conditions | BookOne - Service Terms & Legal",
      description:
        "Read BookOne's terms and conditions. Understand our service terms, user rights, and legal agreements for using our digital services.",
      url: `${baseUrl}/terms-and-conditions`,
      siteName: "BookOne",
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: "BookOne Terms and Conditions",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Terms and Conditions | BookOne - Service Terms & Legal",
      description:
        "Read BookOne's terms and conditions. Understand our service terms, user rights, and legal agreements for using our digital services.",
      images: ["/opengraph-image.png"],
      creator: "@EmmanuelOnosod1",
      site: "@EmmanuelOnosod1",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default function TermsOfServicePage() {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:ring-2 focus:ring-purple-600"
      >
        Skip to main content
      </a>
      <section
        className="min-h-screen bg-gray-50 text-gray-800 py-16 px-6 md:px-20"
        aria-labelledby="terms-heading"
      >
        <div className="max-w-4xl mx-auto">
          <h1
            id="terms-heading"
            className="text-4xl font-bold text-purple-700 mb-6"
            tabIndex={0}
          >
            Terms of Service
          </h1>
          <p className="mb-8 text-sm text-gray-500" tabIndex={0}>
            Effective Date: {today}
          </p>
          <section id="main-content" className="space-y-6 leading-relaxed">
            <p>
              Welcome to BookOne. These Terms of Service govern your use of our
              website and services. By accessing or using our services, you
              agree to comply with and be bound by these Terms. If you do not
              agree, you may not use our services.
            </p>

            <h2 className="text-2xl font-semibold text-purple-700" tabIndex={0}>
              1. Services Provided
            </h2>
            <p>
              BookOne provides web design, brand identity, SEO, AI automation,
              chatbot development, workflow automation, content creation, and
              analytics services. Our services may be delivered digitally,
              on-site, or remotely, depending on the project.
            </p>

            <h2 className="text-2xl font-semibold text-purple-700" tabIndex={0}>
              2. Eligibility
            </h2>
            <p>
              You must be at least 18 years old or have the consent of a legal
              guardian to use our services. By engaging with us, you represent
              that you meet this requirement.
            </p>

            <h2 className="text-2xl font-semibold text-purple-700" tabIndex={0}>
              3. Project Terms and Deliverables
            </h2>
            <p>
              All project terms, deliverables, and timelines will be outlined in
              a written proposal or agreement before work begins. Changes to
              scope, deadlines, or features may result in additional costs.
            </p>

            <h2 className="text-2xl font-semibold text-purple-700" tabIndex={0}>
              4. Payments
            </h2>
            <p>
              Payment terms will be specified in each agreement or invoice.
              Unless otherwise agreed, payments are due before final
              deliverables are handed over. Late payments may result in
              suspension of work.
            </p>

            <h2 className="text-2xl font-semibold text-purple-700" tabIndex={0}>
              5. Intellectual Property
            </h2>
            <p>
              Unless stated otherwise in the contract, BookOne retains ownership
              of all pre-existing intellectual property used in your project.
              Final deliverables become your property once payment is made in
              full. BookOne reserves the right to display completed projects in
              our portfolio unless you request otherwise in writing.
            </p>

            <h2 className="text-2xl font-semibold text-purple-700" tabIndex={0}>
              6. Client Responsibilities
            </h2>
            <p>
              You agree to provide accurate, timely, and complete information
              required for your project. Delays in providing materials may
              result in extended timelines.
            </p>

            <h2 className="text-2xl font-semibold text-purple-700" tabIndex={0}>
              7. Third-Party Tools and Services
            </h2>
            <p>
              Some services may rely on third-party tools such as analytics
              platforms, hosting services, or automation software. BookOne is
              not responsible for issues arising from third-party services but
              will assist in resolving them where possible.
            </p>

            <h2 className="text-2xl font-semibold text-purple-700" tabIndex={0}>
              8. Limitation of Liability
            </h2>
            <p>
              BookOne is not liable for any indirect, incidental, or
              consequential damages resulting from the use of our services. Our
              maximum liability for any claim related to our services will not
              exceed the amount paid for the specific service in question.
            </p>

            <h2 className="text-2xl font-semibold text-purple-700" tabIndex={0}>
              9. Termination
            </h2>
            <p>
              Either party may terminate a project by giving written notice. If
              terminated, you will be responsible for payment of work completed
              up to the date of termination.
            </p>

            <h2 className="text-2xl font-semibold text-purple-700" tabIndex={0}>
              10. Changes to Terms
            </h2>
            <p>
              We may update these Terms of Service from time to time. Changes
              will be posted on our website with an updated effective date.
            </p>

            <h2 className="text-2xl font-semibold text-purple-700" tabIndex={0}>
              11. Contact
            </h2>
            <address className="not-italic">
              If you have any questions about these Terms, please contact us at:
              <br />
              Email:{" "}
              <a
                href="mailto:info@bookone.dev"
                className="text-blue-700 underline"
              >
                info@bookone.dev
              </a>
              <br />
              Website:{" "}
              <a href="https://bookone.dev" className="text-blue-700 underline">
                https://bookone.dev
              </a>
            </address>
          </section>
        </div>
      </section>
    </>
  );
}
