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
  "Restaurant / Cafe",
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

// SVG Icons
function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  );
}

function PrintIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>
    </svg>
  );
}

function SaveIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    </svg>
  );
}

function FormIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  );
}

function PreviewIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  );
}

export default function ProposalGenerator() {
  const [data, setData] = useState<ProposalData>(defaultData);
  const [saved, setSaved] = useState<{ ts: number; data: ProposalData }[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const [copyMsg, setCopyMsg] = useState("");
  const [mobileTab, setMobileTab] = useState<"form" | "preview">("form");
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
      .map(([, v]) => `  - ${v.label}: +$${v.price}${v.suffix}`)
      .join("\n");

    const text = `Hi ${data.ownerFirstName || "[Owner]"},

Thanks for your interest in getting a professional website for ${data.businessName || "[Business]"}!

I would love to help ${data.businessName || "your business"} stand out online. Here is a custom proposal I put together for you:

---
WEBSITE PROPOSAL FOR ${(data.businessName || "[Business]").toUpperCase()}
Prepared by NuPeeks | nupeeks@outlook.com
---

PACKAGE: ${pkg.name} — $${base}
${pkg.features.map((f) => `  - ${f}`).join("\n")}
${addonLines ? `\nADD-ONS:\n${addonLines}` : ""}

PRICING BREAKDOWN:
  Base Package: $${base}${addonTotal ? `\n  Add-ons: +$${addonTotal}` : ""}
  -----------------
  TOTAL: $${total}

TIMELINE: 3-5 business days (rush available)

PAYMENT:
  50% upfront: $${Math.round(total / 2)}
  50% on launch: $${Math.round(total / 2)}

GUARANTEE: Unlimited revisions until you are 100% happy with the design.
${data.demoUrl ? `\nDEMO SITE: ${data.demoUrl}` : ""}

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
      {/* Mobile Tab Toggle */}
      <div className={styles.mobileTabs}>
        <button
          className={`${styles.mobileTab} ${mobileTab === "form" ? styles.mobileTabActive : ""}`}
          onClick={() => setMobileTab("form")}
        >
          <FormIcon /> Form
        </button>
        <button
          className={`${styles.mobileTab} ${mobileTab === "preview" ? styles.mobileTabActive : ""}`}
          onClick={() => setMobileTab("preview")}
        >
          <PreviewIcon /> Preview
        </button>
      </div>

      {/* LEFT: Form */}
      <div className={`${styles.formPanel} no-print animate-fade-in ${mobileTab === "preview" ? styles.mobileHidden : ""}`}>
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
                  <option value="">Select niche...</option>
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
                        <span className={styles.badge}>Most Popular</span>
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
              <CopyIcon /> Copy as Email
            </button>
            <button
              className={styles.btnSecondary}
              onClick={() => window.print()}
            >
              <PrintIcon /> Print / PDF
            </button>
            <button className={styles.btnSecondary} onClick={saveProposal}>
              <SaveIcon /> Save
            </button>
            <button
              className={styles.btnGhost}
              onClick={() => setShowSaved(!showSaved)}
            >
              <FolderIcon /> Saved ({saved.length})
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
      <div
        className={`${styles.previewPanel} animate-fade-in ${mobileTab === "form" ? styles.mobileHidden : ""}`}
        ref={previewRef}
      >
        <ProposalPreview data={data} />
      </div>
    </div>
  );
}
