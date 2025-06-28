"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("cookie_consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    Cookies.set("cookie_consent", "true", { expires: 365 });
    setVisible(false);
    // Safe to store things now
    // Cookies.set("subscribed", "false");
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-8 md:right-8 bg-light text-dark p-4 rounded-xl shadow-lg flex justify-between items-center z-50">
      <p className="text-sm">
        We use cookies to remember your preferences and enhance your experience.
        By clicking "Accept", you agree to our cookie policy.
      </p>
      <button
        onClick={acceptCookies}
        className="bg-dark text-white px-4 py-2 rounded-md ml-4"
      >
        Accept
      </button>
    </div>
  );
};

export default CookieConsent;
