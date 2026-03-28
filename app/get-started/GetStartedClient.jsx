"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const SERVICES = [
  { id: "website-purchase", label: "Website Purchase" },
  { id: "web-design",       label: "Web Design" },
  { id: "ai-automation",    label: "AI Automation" },
  { id: "seo",              label: "SEO" },
  { id: "ecommerce",        label: "E-commerce" },
  { id: "maintenance",      label: "Maintenance" },
  { id: "consulting",       label: "Consulting" },
];

const BUDGETS = ["< $5k", "$5k – $10k", "$10k – $25k", "$25k+"];
const REFERRAL = ["Google Search", "LinkedIn", "Twitter / X", "Referral", "Other"];

export default function GetStartedClient() {
  const searchParams = useSearchParams();
  const intent       = searchParams.get("intent");
  const websiteTitle = searchParams.get("website");
  const websitePrice = searchParams.get("price");
  const isWebsitePurchase = intent === "website-purchase" && websiteTitle;

  const [formData, setFormData] = useState({
    firstName:      "",
    lastName:       "",
    email:          "",
    previousWebsite: "",
    services:       isWebsitePurchase ? ["website-purchase"] : [],
    budget:         "",
    referralSource: "",
    message:        isWebsitePurchase
      ? `Hi, I'm interested in purchasing the "${websiteTitle}" website${websitePrice ? ` listed at $${Number(websitePrice).toLocaleString()}` : ""}. Please let me know the next steps.`
      : "",
  });

  const [errors,      setErrors]      = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  function handleChange(field, value) {
    setFormData((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: null }));
  }

  function toggleService(id) {
    setFormData((p) => ({
      ...p,
      services: p.services.includes(id) ? p.services.filter((s) => s !== id) : [...p.services, id],
    }));
    if (errors.services) setErrors((p) => ({ ...p, services: null }));
  }

  function validate() {
    const e = {};
    if (!formData.firstName.trim()) e.firstName = "Required";
    if (!formData.lastName.trim())  e.lastName  = "Required";
    if (!formData.email.trim())     e.email     = "Required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = "Invalid email";
    if (!formData.services.length)  e.services  = "Select at least one";
    if (!formData.budget)           e.budget    = "Required";
    if (!formData.message.trim())   e.message   = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.success) {
        setSubmitStatus("success");
        setFormData({ firstName: "", lastName: "", email: "", previousWebsite: "", services: [], budget: "", referralSource: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass = (field) =>
    `w-full border-b bg-transparent py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors duration-200 ${
      errors[field]
        ? "border-red-400/60"
        : "border-white/[0.12] focus:border-white/50"
    }`;

  return (
    <div className="bg-[#080808] min-h-screen pt-32 pb-24">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">

        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-16 lg:gap-24">

          {/* LEFT — info */}
          <div>
            <p className="text-[10px] tracking-[0.25em] text-white/30 uppercase mb-4">
              Start a Project
            </p>
            <h1
              className="font-display font-black text-white leading-none mb-8"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              Let&apos;s build<br />
              <span className="italic">something great.</span>
            </h1>
            <p className="text-sm text-white/40 leading-relaxed mb-12 max-w-sm">
              Fill out the form and we&apos;ll get back to you within 24 hours with a free proposal.
            </p>

            <div className="space-y-6">
              <a
                href="mailto:hello@bookone.dev"
                className="flex items-center gap-4 text-sm text-white/40 hover:text-white transition-colors duration-200 group"
              >
                <span className="text-[10px] tracking-[0.15em] uppercase font-mono text-white/20 group-hover:text-[#E8FF47] transition-colors w-8">EM</span>
                hello@bookone.dev
              </a>
              <a
                href="tel:+2348077080903"
                className="flex items-center gap-4 text-sm text-white/40 hover:text-white transition-colors duration-200 group"
              >
                <span className="text-[10px] tracking-[0.15em] uppercase font-mono text-white/20 group-hover:text-[#E8FF47] transition-colors w-8">PH</span>
                +234 807 708 0903
              </a>
              <p className="flex items-start gap-4 text-sm text-white/40">
                <span className="text-[10px] tracking-[0.15em] uppercase font-mono text-white/20 w-8 pt-px">LO</span>
                Allen Avenue, Lagos, Nigeria
              </p>
            </div>

            {/* Testimonial */}
            <blockquote className="mt-16 border-l-2 border-[#E8FF47] pl-6">
              <p className="font-display italic text-white/60 text-base leading-snug mb-3">
                &quot;Bookone Studio transformed our workflow. Their AI solutions saved us 20+ hours a week.&quot;
              </p>
              <footer className="text-[10px] tracking-[0.15em] uppercase text-white/25 font-mono">
                John Doe — CEO, TechStart
              </footer>
            </blockquote>
          </div>

          {/* RIGHT — form */}
          <div>
            {isWebsitePurchase && (
              <div className="mb-8 border border-[#E8FF47]/20 bg-[#E8FF47]/[0.04] px-5 py-4">
                <p className="text-xs text-[#E8FF47]/80 font-mono tracking-wide">
                  Purchasing: {websiteTitle}
                  {websitePrice && <span className="text-white/40 ml-2">· ${Number(websitePrice).toLocaleString()}</span>}
                </p>
              </div>
            )}

            <AnimatePresence mode="wait">
              {submitStatus === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-24 border-t border-white/[0.06]"
                >
                  <p className="text-[10px] tracking-[0.25em] uppercase text-white/30 font-mono mb-6">Message received</p>
                  <p
                    className="font-display font-black text-white leading-none mb-6"
                    style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
                  >
                    <span className="italic">We&apos;ll be in touch.</span>
                  </p>
                  <p className="text-sm text-white/40 mb-10">
                    Expect a reply within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitStatus(null)}
                    className="text-xs tracking-[0.1em] uppercase text-white/30 hover:text-white transition-colors duration-200 font-mono"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="space-y-10"
                >
                  {/* Name row */}
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[10px] tracking-[0.2em] uppercase text-white/30 mb-3 font-mono">First Name</label>
                      <input
                        type="text"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                        className={inputClass("firstName")}
                      />
                      {errors.firstName && <p className="text-red-400 text-[10px] mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-[0.2em] uppercase text-white/30 mb-3 font-mono">Last Name</label>
                      <input
                        type="text"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                        className={inputClass("lastName")}
                      />
                      {errors.lastName && <p className="text-red-400 text-[10px] mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-white/30 mb-3 font-mono">Email Address</label>
                    <input
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className={inputClass("email")}
                    />
                    {errors.email && <p className="text-red-400 text-[10px] mt-1">{errors.email}</p>}
                  </div>

                  {/* Services */}
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-white/30 mb-4 font-mono">
                      I&apos;m interested in
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SERVICES.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => toggleService(s.id)}
                          className={`px-4 py-2 text-xs tracking-wide border transition-colors duration-200 ${
                            formData.services.includes(s.id)
                              ? "border-[#E8FF47] text-[#E8FF47] bg-[#E8FF47]/[0.06]"
                              : "border-white/[0.10] text-white/40 hover:border-white/30 hover:text-white"
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                    {errors.services && <p className="text-red-400 text-[10px] mt-2">{errors.services}</p>}
                  </div>

                  {/* Budget + Referral */}
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[10px] tracking-[0.2em] uppercase text-white/30 mb-3 font-mono">Budget Range</label>
                      <select
                        value={formData.budget}
                        onChange={(e) => handleChange("budget", e.target.value)}
                        className={`${inputClass("budget")} cursor-pointer [&>option]:bg-[#111]`}
                      >
                        <option value="" disabled>Select a range</option>
                        {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                      {errors.budget && <p className="text-red-400 text-[10px] mt-1">{errors.budget}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-[0.2em] uppercase text-white/30 mb-3 font-mono">How did you find us?</label>
                      <select
                        value={formData.referralSource}
                        onChange={(e) => handleChange("referralSource", e.target.value)}
                        className="w-full border-b border-white/[0.12] focus:border-white/50 bg-transparent py-3 text-sm text-white outline-none transition-colors duration-200 cursor-pointer [&>option]:bg-[#111]"
                      >
                        <option value="" disabled>Select</option>
                        {REFERRAL.map((r) => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-white/30 mb-3 font-mono">Project Details</label>
                    <textarea
                      placeholder="Tell us about your goals, timeline, and requirements..."
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      rows={5}
                      className={`${inputClass("message")} resize-none`}
                    />
                    {errors.message && <p className="text-red-400 text-[10px] mt-1">{errors.message}</p>}
                  </div>

                  {submitStatus === "error" && (
                    <p className="text-red-400 text-xs font-mono">
                      Something went wrong. Please try again or email us directly.
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex items-center gap-3 text-[#E8FF47] text-sm font-semibold tracking-wide hover:text-white transition-colors duration-200 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="inline-block w-4 h-4 border border-white/30 border-t-white rounded-full animate-spin" />
                    ) : null}
                    {isSubmitting ? "Sending…" : "Send Message"}
                    {!isSubmitting && (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                        <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
