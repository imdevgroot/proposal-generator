"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./ProposalGenerator.module.css";
import ProposalPreview from "./ProposalPreview";
import SavedProposals from "./SavedProposals";

export type Package = "starter" | "standard" | "premium";
export interface ProposalData {
  businessName: string;
  ownerFirstName: string;
  niche: string;
  city: string;
  demoUrl: string;
  pkg: Package;
  addons: {
    logo: boolean;
    maintenance: boolean;
    gbp: boolean;
  };
}

export const PACKAGES = {
  starter: {
    name: "Starter",
    price: 600,
    features: [
      "4-page website",
      "Mobile responsive design",
      "Contact form",
      "1 revision round",
    ],
  },
  standard: {
    name: "Standard",
    price: 800,
    popular: true,
    features: [
      "4-page website",
      "Mobile responsive design",
      "Contact form",
      "Google Analytics integration",
      "SEO optimization",
      "3 revision rounds",
    ],
  },
  premium: {
    name: "Premium",
    price: 1200,
    features: [
      "4-page website",
      "Mobile responsive design",
      "Contact form",
      "Google Analytics integration",
      "SEO optimization",
      "Online booking system",
      "Live chat widget",
      "5 revision rounds",
      "Priority support",
    ],
  },
};

export const ADDONS = {
  logo: { label: "Logo Design", price: 150, suffix: "" },
  maintenance: { label: "Monthly Maintenance", price: 150, suffix: "/mo" },
  gbp: { label: "Google Business Profile Setup", price: 100, suffix: "" },
};

export const NICHES = [
  "Barbershop",
  "Beauty Salon",
  "Cleaning Service",
  "Contractor / Construction",
  "Dental Office",
  "Food Truck",
  "HVAC",
  "Landscaping",
  "Law Firm",
  "Medical / Health",
  "Nail Salon",
  "Personal Trainer",
  "Photography",
  "Plumbing",
  "Real Estate",
  "Restaurant / Café",
  "Roofing",
  "Tattoo Studio",
  "Towing / Auto",
  "Trucking / Logistics",
  "Other",
];

const defaultData: ProposalData = {
  businessName: "",
  ownerFirstName: "",
  niche: "",
  city: "",
  demoUrl: "",
  pkg: "standard",
  addons: { logo: false, maintenance: false, gbp: false },
};

export function calcTotal(data: ProposalData) {
  const base = PACKAGES[data.pkg].price;
  const addonTotal =
    (data.addons.logo ? 150 : 0) +
    (data.addons.maintenance ? 150 : 0) +
    (data.addons.gbp ? 100 : 0);
  return { base, addonTotal, total: base + addonTotal };
}

export default function ProposalGenerator() {
  const [data, setData] = useState<ProposalData>(defaultData);
  const [saved, setSaved] = useState<{ ts: number; data: ProposalData }[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const [copyMsg, setCopyMsg] = useState("");
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("nupeeks_proposals");
      if (raw) setSaved(JSON.parse(raw));
    } catch {}
  }, []);

  function update(field: keyof ProposalData, value: unknown) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  function toggleAddon(key: keyof ProposalData["addons"]) {
    setData((prev) => ({
      ...prev,
      addons: { ...prev.addons, [key]: !prev.addons[key] },
    }));
  }

  function saveProposal() {
    const entry = { ts: Date.now(), data };
    const updated = [entry, ...saved].slice(0, 5);
    setSaved(updated);
    localStorage.setItem("nupeeks_proposals", JSON.stringify(updated));
    setCopyMsg("Saved!");
    setTimeout(() => setCopyMsg(""), 2000);
  }

  function loadProposal(d: ProposalData) {
    setData(d);
    setShowSaved(false);
  }

  function copyEmail() {
    const { base, addonTotal, total } = calcTotal(data);
    const pkg = PACKAGES[data.pkg];
    const addonLines = Object.entries(ADDONS)
      .filter(([k]) => data.addons[k as keyof typeof data.addons])
      .map(([, v]) => `  • ${v.label}: +$${v.price}${v.suffix}`)
      .join("\n");

    const text = `Hi ${data.ownerFirstName || "[Owner]"},

Thanks for your interest in getting a professional website for ${data.businessName || "[Business]"}!

I'd love to help ${data.businessName || "your business"} stand out online. Here's a custom proposal I put together for you:

---
WEBSITE PROPOSAL FOR ${(data.businessName || "[Business]").toUpperCase()}
Prepared by NuPeeks | nupeeks@outlook.com
---

📦 PACKAGE: ${pkg.name} — $${base}
${pkg.features.map((f) => `  ✓ ${f}`).join("\n")}
${addonLines ? `\n🔧 ADD-ONS:\n${addonLines}` : ""}

💰 PRICING BREAKDOWN:
  Base Package: $${base}${addonTotal ? `\n  Add-ons: +$${addonTotal}` : ""}
  ─────────────────
  TOTAL: $${total}

📅 TIMELINE: 3–5 business days (rush available)

💳 PAYMENT:
  50% upfront: $${Math.round(total / 2)}
  50% on launch: $${Math.round(total / 2)}

✅ GUARANTEE: Unlimited revisions until you're 100% happy with the design.
${data.demoUrl ? `\n🌐 DEMO SITE: ${data.demoUrl}` : ""}

Ready to get started? Reply to this message or reach me at nupeeks@outlook.com

Talk soon,
Barry
NuPeeks
nupeeks@outlook.com
`;

    navigator.clipboard.writeText(text).then(() => {
      setCopyMsg("Copied to clipboard!");
      setTimeout(() => setCopyMsg(""), 2500);
    });
  }

  const { base, addonTotal, total } = calcTotal(data);

  return (
    <div className={styles.root}>
      {/* LEFT: Form */}
      <div className={`${styles.formPanel} no-print animate-fade-in`}>
        <div className={styles.formHeader}>
          <span className={styles.logo}>NuPeeks</span>
          <span className={styles.subtitle}>Proposal Generator</span>
        </div>

        <div className={styles.formBody}>
          {/* Client Info */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Client Info</h3>
            <div className={styles.row2}>
              <label className={styles.field}>
                <span>Business Name</span>
                <input
                  value={data.businessName}
                  onChange={(e) => update("businessName", e.target.value)}
                  placeholder="Joe's Barbershop"
                />
              </label>
              <label className={styles.field}>
                <span>Owner First Name</span>
                <input
                  value={data.ownerFirstName}
                  onChange={(e) => update("ownerFirstName", e.target.value)}
                  placeholder="Joe"
                />
              </label>
            </div>
            <div className={styles.row2}>
              <label className={styles.field}>
                <span>Niche</span>
                <select
                  value={data.niche}
                  onChange={(e) => update("niche", e.target.value)}
                >
                  <option value="">Select niche…</option>
                  {NICHES.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
              <label className={styles.field}>
                <span>City</span>
                <input
                  value={data.city}
                  onChange={(e) => update("city", e.target.value)}
                  placeholder="Chicago, IL"
                />
              </label>
            </div>
            <label className={styles.field}>
              <span>Demo Site URL</span>
              <input
                value={data.demoUrl}
                onChange={(e) => update("demoUrl", e.target.value)}
                placeholder="https://demo.nupeeks.com/barbershop"
              />
            </label>
          </section>

          {/* Package */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Package</h3>
            {(Object.entries(PACKAGES) as [Package, typeof PACKAGES[Package]][]).map(
              ([key, pkg]) => (
                <label
                  key={key}
                  className={`${styles.pkgOption} ${data.pkg === key ? styles.pkgSelected : ""}`}
                >
                  <input
                    type="radio"
                    name="pkg"
                    value={key}
                    checked={data.pkg === key}
                    onChange={() => update("pkg", key)}
                  />
                  <div className={styles.pkgInfo}>
                    <div className={styles.pkgNameRow}>
                      <strong>{pkg.name}</strong>
                      {"popular" in pkg && pkg.popular && (
                        <span className={styles.badge}>★ Most Popular</span>
                      )}
                      <span className={styles.pkgPrice}>${pkg.price}</span>
                    </div>
                    <div className={styles.pkgFeatures}>
                      {pkg.features.join(" · ")}
                    </div>
                  </div>
                </label>
              )
            )}
          </section>

          {/* Add-ons */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Add-ons</h3>
            {(Object.entries(ADDONS) as [keyof typeof ADDONS, typeof ADDONS[keyof typeof ADDONS]][]).map(
              ([key, addon]) => (
                <label key={key} className={styles.addonOption}>
                  <input
                    type="checkbox"
                    checked={data.addons[key]}
                    onChange={() => toggleAddon(key)}
                  />
                  <span>
                    {addon.label}
                    <em> +${addon.price}{addon.suffix}</em>
                  </span>
                </label>
              )
            )}
          </section>

          {/* Total */}
          <div className={styles.totalBar}>
            <span>Base: ${base}</span>
            {addonTotal > 0 && <span>Add-ons: +${addonTotal}</span>}
            <span className={styles.grandTotal}>Total: ${total}</span>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <button className={styles.btnPrimary} onClick={copyEmail}>
              📋 Copy as Email
            </button>
            <button
              className={styles.btnSecondary}
              onClick={() => window.print()}
            >
              🖨 Print / Save PDF
            </button>
            <button className={styles.btnSecondary} onClick={saveProposal}>
              💾 Save
            </button>
            <button
              className={styles.btnGhost}
              onClick={() => setShowSaved(!showSaved)}
            >
              📂 Saved ({saved.length})
            </button>
          </div>

          {copyMsg && <div className={styles.toast}>{copyMsg}</div>}

          {showSaved && (
            <SavedProposals
              saved={saved}
              onLoad={loadProposal}
              onClose={() => setShowSaved(false)}
            />
          )}
        </div>
      </div>

      {/* RIGHT: Preview */}
      <div className={`${styles.previewPanel} animate-fade-in`} ref={previewRef}>
        <ProposalPreview data={data} />
      </div>
    </div>
  );
}
