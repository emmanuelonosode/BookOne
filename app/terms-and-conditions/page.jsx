import { generateMetaTags } from "../seo-config";

// Add caching configuration
export const revalidate = 3600; // Revalidate every hour

export const metadata = generateMetaTags({
  title: "Terms and Conditions | BookOne - Service Terms & Legal",
  description:
    "Read BookOne's terms and conditions. Understand our service terms, user rights, and legal agreements for using our digital services.",
  url: "/terms-and-conditions",
  keywords: [
    "terms and conditions",
    "service terms",
    "legal agreement",
    "BookOne terms",
    "user agreement",
    "service conditions",
    "legal terms",
  ],
});

export default function TermsOfServicePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-22 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">Terms of Service for BookOne</h1>
      <p className="mb-4">Last Updated: July 24, 2025</p>

      <p className="mb-4">
        Please read these Terms of Service ("Terms", "Terms of Service")
        carefully before using the{" "}
        <a href="https://bookone.dev" className="text-purple-700 underline">
          bookone.dev
        </a>{" "}
        website (the "Service") operated by BookOne ("us", "we", or "our").
      </p>

      <p className="mb-4">
        Your access to and use of the Service is conditioned on your acceptance
        of and compliance with these Terms. These Terms apply to all visitors,
        users and others who wish to access or use the Service.
      </p>

      <p className="mb-4">
        By accessing or using the Service you agree to be bound by these Terms.
        If you disagree with any part of the terms then you do not have
        permission to access the Service.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">1. Accounts</h2>
      <p className="mb-4">
        When you create an account with us, you guarantee that you are above the
        age of 18, and that the information you provide is accurate, complete,
        and current. Inaccurate or outdated information may result in immediate
        termination. You are responsible for safeguarding your password and for
        any activities under your account.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">
        2. Intellectual Property
      </h2>
      <p className="mb-4">
        The Service and its original content (excluding user content), features,
        and functionality are and will remain the exclusive property of BookOne
        and its licensors. The Service is protected by copyright, trademark, and
        Nigerian and international laws. You may not use our trademarks without
        prior written consent.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">
        3. Links to Other Websites
      </h2>
      <p className="mb-4">
        Our Service may contain links to third-party websites or services that
        are not owned or controlled by BookOne. We are not responsible for their
        content, privacy practices, or services. We advise you to read their
        terms and policies.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">4. Termination</h2>
      <p className="mb-4">
        We reserve the right to terminate or suspend your account at any time,
        without prior notice, for violating these Terms. If you wish to
        terminate your account, you may stop using the Service at any time.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">5. Indemnification</h2>
      <p className="mb-4">
        You agree to defend and indemnify BookOne and its affiliates from any
        claims or damages resulting from your use of the Service or breach of
        these Terms.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">
        6. Limitation of Liability
      </h2>
      <p className="mb-4">
        In no event shall BookOne or its employees be liable for indirect or
        consequential damages, including loss of profits, data, or goodwill,
        resulting from your use of the Service.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">7. Disclaimer</h2>
      <p className="mb-4">
        The Service is provided "as is" and "as available" without warranties of
        any kind. BookOne does not guarantee that the Service will function
        uninterrupted or be free of errors or harmful components.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">8. Exclusions</h2>
      <p className="mb-4">
        Some jurisdictions may not allow the exclusion of certain warranties or
        liabilities. In such cases, these limitations may not apply to you.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">9. Governing Law</h2>
      <p className="mb-4">
        These Terms are governed by and construed in accordance with the laws of
        Nigeria, without regard to its conflict of law rules.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">10. Changes</h2>
      <p className="mb-4">
        We reserve the right to update or change these Terms at any time. We
        will provide at least 30 days notice before any material changes take
        effect. Continued use of the Service after the changes means you accept
        the revised Terms.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">11. Contact Us</h2>
      <p className="mb-1">
        If you have any questions about these Terms, you can reach us at:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>
          Email:{" "}
          <a
            href="mailto:hello@bookone.agency"
            className="text-purple-700 underline"
          >
            hello@bookone.agency
          </a>
        </li>
        <li>
          Contact page:{" "}
          <a href="/contact" className="text-purple-700 underline">
            bookone.agency/contact
          </a>
        </li>
        <li>Phone: +234 (your business number here)</li>
        <li>Address: Lagos, Nigeria (or your full office address)</li>
      </ul>
    </main>
  );
}
