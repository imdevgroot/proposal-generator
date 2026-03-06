"use client";
import styles from "./ProposalPreview.module.css";
import { ProposalData, PACKAGES, ADDONS, calcTotal } from "./ProposalGenerator";

const NICHE_INTROS: Record<string, string> = {
  "Barbershop": "In today's competitive grooming industry, a professional website helps you attract new clients and stand out from every other shop on the block.",
  "Beauty Salon": "A stunning website is your digital storefront — it shows potential clients your work before they ever walk in the door.",
  "Cleaning Service": "Most homeowners search online before hiring. A professional site puts your cleaning service at the top of their list.",
  "Contractor / Construction": "Homeowners are searching online for trusted contractors right now. A professional website builds credibility and brings in quality leads.",
  "Dental Office": "Patients research dentists online before booking. A polished website increases trust and helps fill your schedule.",
  "Food Truck": "Hungry customers want to find you fast. A mobile-friendly site with your schedule and menu keeps them coming back.",
  "HVAC": "When someone's AC breaks, they Google it immediately. Be the first result they trust with a professional HVAC website.",
  "Landscaping": "Show off your best work with a portfolio site that turns visitors into paying landscaping clients.",
  "Law Firm": "Trust is everything in legal services. A professional website establishes authority and helps clients feel confident choosing you.",
  "Medical / Health": "Patients expect to find you online. A clear, professional site builds trust and makes booking easy.",
  "Nail Salon": "Your nail art deserves a stunning showcase. A beautiful website attracts new clients and keeps regulars coming back.",
  "Personal Trainer": "Let your results speak for themselves. A professional website showcases your transformations and fills your training schedule.",
  "Photography": "Your photography business deserves a portfolio that wows. A professional site turns visitors into booked clients.",
  "Plumbing": "When pipes burst, people search immediately. A professional plumbing website gets you calls before the competition.",
  "Real Estate": "In real estate, first impressions are everything — online and in person. A sleek website sets you apart from every other agent.",
  "Restaurant / Café": "Diners look you up before they come in. A professional website with your menu, hours, and story turns browsers into regulars.",
  "Roofing": "Storm season brings searches for trusted roofers. A professional website puts your business at the top of that list.",
  "Tattoo Studio": "Your art deserves the spotlight. A portfolio website builds your reputation and books appointments on autopilot.",
  "Towing / Auto": "When someone's stranded, they need help fast. A clean, mobile-friendly site makes you the first call they make.",
  "Trucking / Logistics": "Shippers research carriers before they call. A professional website builds confidence and wins you more contracts.",
  "Other": "In today's digital world, your website is often the first impression you make. Let's make sure it counts.",
};

function getIntro(niche: string, businessName: string, city: string) {
  const intro = NICHE_INTROS[niche] || NICHE_INTROS["Other"];
  const loc = city ? ` in ${city}` : "";
  const biz = businessName || "your business";
  return `Hi — I put together this proposal specifically for ${biz}${loc}. ${intro}`;
}

export default function ProposalPreview({ data }: { data: ProposalData }) {
  const { base, addonTotal, total } = calcTotal(data);
  const pkg = PACKAGES[data.pkg];
  const half = Math.round(total / 2);
  const selectedAddons = Object.entries(ADDONS).filter(
    ([k]) => data.addons[k as keyof typeof data.addons]
  );

  const biz = data.businessName || "[Business Name]";
  const owner = data.ownerFirstName || "[Owner]";
  const city = data.city || "[City]";

  return (
    <div className={styles.doc}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerLogo}>NuPeeks</div>
          <div className={styles.headerTagline}>Professional Websites That Work</div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.headerContact}>nupeeks@outlook.com</div>
        </div>
      </header>

      <div className={styles.body}>
        {/* Prepared for */}
        <div className={styles.preparedFor}>
          <span className={styles.prepLabel}>PROPOSAL PREPARED FOR</span>
          <span className={styles.prepBiz}>{biz}</span>
          <span className={styles.prepCity}>{city}</span>
        </div>

        <div className={styles.goldDivider} />

        {/* Intro */}
        <p className={styles.intro}>
          Hi {owner}, {getIntro(data.niche, data.businessName, data.city)}
        </p>

        {/* Demo link */}
        {data.demoUrl && (
          <div className={styles.demoBox}>
            <span className={styles.demoLabel}>🌐 Preview Your Demo Site</span>
            <a
              href={data.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.demoBtn}
            >
              View Demo →
            </a>
          </div>
        )}

        {/* Package */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Your Package</h2>
            <span className={styles.pkgBadge}>
              {"popular" in pkg && pkg.popular && "★ Most Popular · "}
              {pkg.name} — ${base}
            </span>
          </div>
          <ul className={styles.featureList}>
            {pkg.features.map((f) => (
              <li key={f}>
                <span className={styles.checkmark}>✓</span> {f}
              </li>
            ))}
          </ul>
        </section>

        {/* Add-ons */}
        {selectedAddons.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Add-ons</h2>
            <ul className={styles.featureList}>
              {selectedAddons.map(([, addon]) => (
                <li key={addon.label}>
                  <span className={styles.checkmark}>+</span> {addon.label}{" "}
                  <strong>+${addon.price}{addon.suffix}</strong>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Pricing */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Investment</h2>
          <div className={styles.pricingTable}>
            <div className={styles.pricingRow}>
              <span>{pkg.name} Package</span>
              <span>${base}</span>
            </div>
            {selectedAddons.map(([, addon]) => (
              <div className={styles.pricingRow} key={addon.label}>
                <span>{addon.label}</span>
                <span>+${addon.price}{addon.suffix}</span>
              </div>
            ))}
            <div className={styles.pricingDivider} />
            <div className={`${styles.pricingRow} ${styles.pricingTotal}`}>
              <span>Total Investment</span>
              <span className={styles.totalAmount}>${total}</span>
            </div>
          </div>
        </section>

        {/* Timeline + Payment */}
        <div className={styles.twoCol}>
          <section className={styles.infoBox}>
            <h3 className={styles.infoTitle}>📅 Timeline</h3>
            <p>3–5 business days from deposit</p>
            <p className={styles.infoNote}>Rush delivery available upon request</p>
          </section>
          <section className={styles.infoBox}>
            <h3 className={styles.infoTitle}>💳 Payment</h3>
            <p>50% upfront: <strong>${half}</strong></p>
            <p>50% on launch: <strong>${half}</strong></p>
          </section>
        </div>

        {/* Guarantee */}
        <div className={styles.guarantee}>
          <span className={styles.guaranteeIcon}>🛡️</span>
          <div>
            <strong>100% Satisfaction Guarantee</strong>
            <p>Unlimited revisions until you&apos;re 100% happy with the design. If you&apos;re not satisfied, you don&apos;t pay.</p>
          </div>
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <h3 className={styles.ctaTitle}>Ready to get started?</h3>
          <p className={styles.ctaText}>
            Reply to this message or reach Barry directly:
          </p>
          <a href="mailto:nupeeks@outlook.com" className={styles.ctaEmail}>
            nupeeks@outlook.com
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerLogo}>NuPeeks</div>
        <div className={styles.footerTagline}>Professional Websites That Work</div>
        <div className={styles.footerContact}>nupeeks@outlook.com</div>
      </footer>
    </div>
  );
}
