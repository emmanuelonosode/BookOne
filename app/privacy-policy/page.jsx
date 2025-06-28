export const metadata = {
  title: "Privacy Policy | MyBook",
  description:
    "Learn how we collect, use, and protect your information at MyBook.",
};

export default function PrivacyPolicy() {
  return (
    <section className="max-w-3xl mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        At MyBook, your privacy is important to us. This Privacy Policy explains
        how we collect, use, disclose, and safeguard your information when you
        visit our website.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">
        1. Information We Collect
      </h2>
      <ul className="list-disc pl-6 mb-4">
        <li>
          <strong>Personal Information:</strong> Such as your name, email
          address, and any other information you provide when you contact us,
          subscribe to our newsletter, or create an account.
        </li>
        <li>
          <strong>Usage Data:</strong> Information about how you use our
          website, including your IP address, browser type, and pages visited.
        </li>
        <li>
          <strong>Cookies:</strong> We use cookies to remember your preferences
          and enhance your experience. You can manage cookies in your browser
          settings.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">
        2. How We Use Your Information
      </h2>
      <ul className="list-disc pl-6 mb-4">
        <li>To provide and maintain our services.</li>
        <li>
          To communicate with you, including sending newsletters and updates.
        </li>
        <li>To improve our website and user experience.</li>
        <li>To comply with legal obligations.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">
        3. Sharing Your Information
      </h2>
      <p className="mb-4">
        We do not sell or rent your personal information. We may share your
        information with trusted third parties who assist us in operating our
        website, conducting our business, or serving our users, as long as those
        parties agree to keep this information confidential.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">4. Data Security</h2>
      <p className="mb-4">
        We implement reasonable security measures to protect your information.
        However, no method of transmission over the Internet or electronic
        storage is 100% secure.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">5. Your Rights</h2>
      <p className="mb-4">
        You have the right to access, update, or delete your personal
        information. To exercise these rights, please contact us at{" "}
        <a href="mailto:support@mybook.com" className="text-blue-600 underline">
          support@mybook.com
        </a>
        .
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">
        6. Changes to This Policy
      </h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. We will notify you
        of any changes by posting the new policy on this page.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">7. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us
        at{" "}
        <a href="mailto:support@mybook.com" className="text-blue-600 underline">
          support@mybook.com
        </a>
        .
      </p>
    </section>
  );
}
