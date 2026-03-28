"use client";

import Link from "next/link";

const LAST_UPDATED = "March 27, 2026";

const BackArrow = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
    <path d="M12 7H2M2 7L7 2M2 7L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Bullet = () => <span className="text-[#E8FF47] mt-1 shrink-0 text-xs leading-relaxed">—</span>;

interface SectionProps {
  number: string;
  title: string;
  children: React.ReactNode;
  last?: boolean;
}

function Section({ number, title, children, last }: SectionProps) {
  return (
    <section className={`${last ? "pt-12" : "border-b border-white/[0.06] py-12"}`}>
      <div className="grid lg:grid-cols-[220px_1fr] gap-10 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-28">
          <p className="text-[10px] tracking-[0.15em] font-mono text-white/20 mb-2">{number}</p>
          <h2 className="font-display font-bold text-white leading-tight" style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}>
            {title}
          </h2>
        </div>
        <div className="space-y-4">{children}</div>
      </div>
    </section>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return <p className="text-base text-white/55 leading-relaxed">{children}</p>;
}

function List({ items }: { items: string[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item} className="flex items-start gap-3">
          <Bullet />
          <span className="text-base text-white/55 leading-relaxed">{item}</span>
        </div>
      ))}
    </div>
  );
}

function LabelList({ items }: { items: [string, string][] }) {
  return (
    <div className="space-y-3">
      {items.map(([label, text]) => (
        <div key={label} className="flex items-start gap-3">
          <Bullet />
          <span className="text-base text-white/55 leading-relaxed">
            <strong className="text-white/75 font-semibold">{label}:</strong> {text}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function TermsClient() {
  return (
    <main className="bg-[#080808] min-h-screen pt-32 pb-24">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">

        <Link href="/" className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-white/30 hover:text-white transition-colors duration-200 font-mono mb-12">
          <BackArrow /> Home
        </Link>

        {/* Page header */}
        <div className="border-b border-white/[0.06] pb-16 mb-0">
          <p className="text-[10px] tracking-[0.25em] text-white/30 uppercase font-mono mb-4">Legal</p>
          <h1 className="font-display font-black text-white leading-none mb-4" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            Terms &amp; Conditions
          </h1>
          <p className="text-[10px] tracking-[0.2em] uppercase font-mono text-white/25">Last updated: {LAST_UPDATED}</p>
        </div>

        {/* 00 — Overview */}
        <Section number="00" title="Overview">
          <Body>
            Welcome to <strong className="text-white/80 font-semibold">Bookone Studio</strong>. These Terms and Conditions govern your use of our website at <strong className="text-white/75">bookone.dev</strong> and your engagement with our services. By accessing our website or engaging Bookone Studio, you agree to comply with these Terms.
          </Body>
        </Section>

        {/* 01 — Definitions */}
        <Section number="01" title="Definitions">
          <LabelList items={[
            ['"Agency", "We", "Us", "Our"', "Bookone Studio, a digital agency based in Lagos, Nigeria."],
            ['"Client", "You"', "The entity or individual engaging our services."],
            ['"Services"', "Web Design, Development, SEO, AI Automation, Content Writing, and related digital solutions."],
            ['"Deliverables"', "Specific work product created for the Client — website code, design files, or automation scripts."],
          ]} />
        </Section>

        {/* 02 — Scope of Services */}
        <Section number="02" title="Scope of Services">
          <Body>Bookone Studio provides professional digital services including, but not limited to:</Body>
          <LabelList items={[
            ["Web Development", "Custom websites, e-commerce stores, and web applications using React and Next.js."],
            ["SEO Optimization", "Technical SEO, on-page optimization, site speed improvements, and content strategy."],
            ["AI Automation", "Setup of AI agents, chatbots, and business workflow automation."],
            ["Content Strategy", "Copywriting, blog content, and digital marketing materials."],
          ]} />
          <Body>
            The specific scope, timeline, and fees for your project will be detailed in a separate Proposal or Service Agreement. In the event of a conflict, the Service Agreement shall control.
          </Body>
        </Section>

        {/* 03 — Payments */}
        <Section number="03" title="Payments & Billing">
          <Body>Unless otherwise agreed in writing:</Body>
          <LabelList items={[
            ["Deposits", "A non-refundable deposit (typically 50–70%) is required before work commences."],
            ["Milestones", "Remaining balances are due upon completion of specific milestones or final delivery, as outlined in your invoice."],
            ["Late Payments", "We reserve the right to suspend services or withhold delivery of final assets if payments are not made within the agreed timeframe."],
            ["Currency", "All payments shall be made in the currency specified in the invoice (typically NGN or USD)."],
          ]} />
        </Section>

        {/* 04 — Intellectual Property */}
        <Section number="04" title="Intellectual Property">
          <Body>
            <strong className="text-white/80 font-semibold">Client Ownership:</strong> Upon full payment, the Client receives full ownership of the final Deliverables (the specific website design and content).
          </Body>
          <Body>
            <strong className="text-white/80 font-semibold">Agency Rights:</strong> Bookone Studio retains ownership of background technology, frameworks, pre-existing code libraries, and tools used to create the Deliverables; and draft concepts not selected by the Client.
          </Body>
          <Body>
            You grant Bookone Studio a non-exclusive licence to display the project in our portfolio and marketing materials.
          </Body>
        </Section>

        {/* 05 — Client Responsibilities */}
        <Section number="05" title="Client Responsibilities">
          <Body>To ensure the success of the project, you agree to:</Body>
          <List items={[
            "Provide necessary content (text, images, credentials) in a timely manner.",
            "Review work and provide feedback within the agreed timelines.",
            "Ensure you have the right to use any images, text, or data you provide to us.",
          ]} />
          <Body>
            Delays caused by the Client may result in adjusted timelines and potential restart fees if the project goes dormant for more than 30 days.
          </Body>
        </Section>

        {/* 06 — AI Services Disclaimer */}
        <Section number="06" title="AI Services Disclaimer">
          <Body>For services involving AI Automation and AI Agents:</Body>
          <LabelList items={[
            ["Third-Party Dependence", "Our solutions often rely on third-party providers (e.g. OpenAI, Anthropic). We are not liable for service interruptions, API changes, or policy updates by these third parties."],
            ["Accuracy", "AI models can occasionally produce incorrect outputs. You acknowledge that AI outputs should be monitored and verified."],
            ["Usage Costs", "Unless stated otherwise, ongoing API usage costs (e.g. OpenAI token fees) are the responsibility of the Client."],
          ]} />
        </Section>

        {/* 07 — SEO Guarantees */}
        <Section number="07" title="SEO & Marketing">
          <Body>While we employ industry best practices to improve your search rankings and traffic:</Body>
          <LabelList items={[
            ["No Guarantees", 'We cannot guarantee specific rankings (e.g. "Page 1 of Google") or specific traffic numbers, as search algorithms are proprietary and change frequently.'],
            ["Third-Party Platforms", "We are not responsible for changes made by platforms (Google, Meta, etc.) that may affect your visibility."],
          ]} />
        </Section>

        {/* 08 — Limitation of Liability */}
        <Section number="08" title="Limitation of Liability">
          <Body>
            To the fullest extent permitted by applicable law, Bookone Studio shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill.
          </Body>
          <Body>
            Our total liability for any claim shall not exceed the total amount paid by you to Bookone Studio for the specific service giving rise to the claim during the six (6) months prior to the claim.
          </Body>
        </Section>

        {/* 09 — Termination */}
        <Section number="09" title="Termination">
          <Body>Either party may terminate a project with written notice. In the event of termination:</Body>
          <List items={[
            "The Client shall pay Bookone Studio for all work completed and expenses incurred up to the date of termination.",
            "If the Client terminates without cause, any non-refundable deposit remains with Bookone Studio.",
          ]} />
        </Section>

        {/* 10 — Governing Law */}
        <Section number="10" title="Governing Law">
          <Body>
            These Terms shall be governed by the laws of the <strong className="text-white/75 font-semibold">Federal Republic of Nigeria</strong>. Any disputes shall be resolved in the courts of Lagos State, Nigeria.
          </Body>
        </Section>

        {/* 11 — Contact */}
        <Section number="11" title="Contact Us" last>
          <Body>Questions about these Terms? We&apos;re here to help.</Body>
          <div>
            {[
              { label: "EM", value: "hello@bookone.dev", href: "mailto:hello@bookone.dev" },
              { label: "PH", value: "+234 807 708 0903", href: "tel:+2348077080903" },
              { label: "LO", value: "Allen Avenue, Lagos, Nigeria", href: null },
            ].map(({ label, value, href }) => (
              <div key={label} className="flex items-start gap-4 border-t border-white/[0.06] py-4">
                <span className="text-[10px] tracking-[0.15em] uppercase font-mono text-white/20 w-8 pt-px shrink-0">{label}</span>
                {href ? (
                  <a href={href} className="text-sm text-white/50 hover:text-[#E8FF47] transition-colors duration-200">{value}</a>
                ) : (
                  <p className="text-sm text-white/50">{value}</p>
                )}
              </div>
            ))}
          </div>
        </Section>

      </div>
    </main>
  );
}
