"use client";

import CookieConsent from "react-cookie-consent";

export default function ClientCookieConsent() {
  return (
    <CookieConsent
      location="bottom"
      cookieName="bookoneConsent"
      buttonText="Accept All"
      declineButtonText="Decline"
      enableDeclineButton
      style={{
        background: "#2B373B",
        color: "#fff",
        fontSize: "14px",
        padding: "1rem",
        textAlign: "left",
      }}
      buttonStyle={{
        background: "#6b46c1",
        color: "#fff",
        fontSize: "14px",
        borderRadius: "4px",
        padding: "10px 20px",
        marginLeft: "1rem",
      }}
      declineButtonStyle={{
        background: "#555",
        color: "#fff",
        fontSize: "14px",
        borderRadius: "4px",
        padding: "10px 20px",
        marginLeft: "1rem",
      }}
      expires={180}
    >
      <strong>We use cookies</strong> to personalize content and ads, to provide
      social media features, and to analyze our traffic. We also share
      information about your use of our site with our analytics and marketing
      partners. Read our{" "}
      <a
        href="/cookie-policy"
        style={{ color: "#fff", textDecoration: "underline" }}
        target="_blank"
        rel="noopener noreferrer"
      >
        Cookie Policy
      </a>
      .
    </CookieConsent>
  );
}
