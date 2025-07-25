// import LegalPageLayout from "@/components/LegalPageLayout";

import LegalPageLayout from "../component/LegalPage"

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy">
      <p>Last updated: July 24, 2025</p>

      <p>
        At BookOne, we respect your privacy and are committed to protecting your
        personal data. This privacy policy explains how we collect, use, and
        share your information when you use our website or services.
      </p>

      <h2>1. Information We Collect</h2>
      <ul>
        <li>
          <strong>Personal Information</strong>: such as your name, email, phone
          number, or billing information when you contact us or use our
          services.
        </li>
        <li>
          <strong>Usage Data</strong>: including pages visited, device type, and
          browser version.
        </li>
        <li>
          <strong>Cookies</strong>: for preferences, analytics, and
          personalization.
        </li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>
        We use your information to:
        <ul>
          <li>Provide and manage services</li>
          <li>Improve user experience</li>
          <li>Send updates and marketing (with consent)</li>
          <li>Comply with legal obligations</li>
        </ul>
      </p>

      <h2>3. Sharing Your Information</h2>
      <p>
        We do not sell your data. We may share your information with third
        parties like hosting providers, analytics tools, and legal entities when
        required.
      </p>

      <h2>4. Your Rights</h2>
      <p>
        You can request access, modification, or deletion of your personal data
        at any time by contacting us.
      </p>

      <h2>5. Contact Us</h2>
      <p>
        If you have questions about this policy, contact us at
        privacy@bookone.agency.
      </p>
    </LegalPageLayout>
  );
}
