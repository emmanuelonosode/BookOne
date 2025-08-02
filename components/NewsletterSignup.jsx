"use client";

import { useState, useEffect } from "react";
import { Check, X } from "lucide-react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasSubscribed, setHasSubscribed] = useState(false);

  // Check if user has already subscribed on component mount
  useEffect(() => {
    const subscribed = localStorage.getItem("newsletterSubscribed");
    if (subscribed === "true") {
      setHasSubscribed(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
        // Save to localStorage so user won't see form again
        localStorage.setItem("newsletterSubscribed", "true");
        // Hide the form after successful submission
        setTimeout(() => {
          setIsSubmitted(true);
        }, 2000); // Show success message for 2 seconds, then hide
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Newsletter signup error:", error);
      setStatus("error");
    }
  };

  // If user has already subscribed or form has been submitted and hidden, don't render anything
  if (hasSubscribed || isSubmitted) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
        <p className="text-blue-100 mb-6">
          Get the latest insights on web design, SEO, and digital marketing
          delivered to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-2 border-white text-gray-100 focus:outline-none focus:ring-2 focus:ring-white/50"
              required
              disabled={status === "loading"}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </div>

          {status === "success" && (
            <p className="mt-3 text-green-200 text-sm flex items-center justify-center gap-2">
              <Check className="w-4 h-4" /> Thanks for subscribing! Check your
              email for confirmation.
            </p>
          )}

          {status === "error" && (
            <p className="mt-3 text-red-200 text-sm flex items-center justify-center gap-2">
              <X className="w-4 h-4" /> Something went wrong. Please try again.
            </p>
          )}
        </form>

        <p className="text-xs text-blue-200 mt-4">
          No spam, unsubscribe at any time. We respect your privacy.
        </p>
      </div>
    </div>
  );
}
