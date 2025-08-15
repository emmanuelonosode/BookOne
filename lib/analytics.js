// Lightweight analytics helper: prefer dataLayer (GTM), then gtag (GA4), then no-op.
export function trackEvent(eventName, params = {}) {
  try {
    if (typeof window === "undefined") return;

    // Prefer GTM dataLayer if present
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...params });
      return;
    }

    // Fallback to gtag (GA4)
    if (typeof window.gtag === "function") {
      // GA4 semantics: gtag('event', <name>, { ...params })
      window.gtag("event", eventName, params);
      return;
    }

    // Older analytics fallback (ga)
    if (typeof window.ga === "function") {
      // send a generic event; map params to label/category if available
      try {
        const category =
          params.event_category || params.category || "engagement";
        const label = params.event_label || params.label || "";
        window.ga("send", "event", category, eventName, label);
      } catch  {
        // ignore
      }
    }
  } catch (err) {
    // swallow errors to avoid breaking UX
    // eslint-disable-next-line no-console
    console.error("trackEvent error", err);
  }
}

export function trackLeadSubmission({
  lead_source,
  lead_name,
  lead_email,
} = {}) {
  trackEvent("lead_submitted", {
    event_category: "lead",
    event_label: lead_source || "unknown",
    lead_source,
    lead_name,
    lead_email,
  });
}
