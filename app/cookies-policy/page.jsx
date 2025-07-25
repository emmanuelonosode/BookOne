import LegalPageLayout from "../component/LegalPage"

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout title="Cookie Policy">
      <p>Last updated: July 24, 2025</p>

      <h2>1. What Are Cookies?</h2>
      <p>
        Cookies are small text files stored on your device by your browser. They
        help improve website performance and personalize your experience.
      </p>

      <h2>2. How We Use Cookies</h2>
      <ul>
        <li>
          <strong>Essential Cookies</strong>: necessary for site functionality
        </li>
        <li>
          <strong>Analytics Cookies</strong>: to track usage patterns and
          improve user experience
        </li>
        <li>
          <strong>Marketing Cookies</strong>: to provide relevant ads (with
          consent)
        </li>
      </ul>

      <h2>3. Managing Cookies</h2>
      <p>
        You can control or delete cookies via your browser settings. However,
        disabling cookies may affect functionality.
      </p>

      <h2>4. Third-Party Cookies</h2>
      <p>
        We may allow trusted third parties like Google Analytics to place
        cookies on our site.
      </p>

      <h2>5. Contact Us</h2>
      <p>
        If you have questions about our use of cookies, email us at
        privacy@bookone.agency.
      </p>
    </LegalPageLayout>
  );
}
