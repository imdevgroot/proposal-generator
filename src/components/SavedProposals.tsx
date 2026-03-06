"use client";
import styles from "./SavedProposals.module.css";
import { ProposalData } from "./ProposalGenerator";

interface Props {
  saved: { ts: number; data: ProposalData }[];
  onLoad: (d: ProposalData) => void;
  onClose: () => void;
}

export default function SavedProposals({ saved, onLoad, onClose }: Props) {
  if (saved.length === 0) {
    return (
      <div className={styles.panel}>
        <div className={styles.header}>
          <span>Saved Proposals</span>
          <button onClick={onClose} className={styles.closeBtn}>✕</button>
        </div>
        <p className={styles.empty}>No saved proposals yet.</p>
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span>Saved Proposals</span>
        <button onClick={onClose} className={styles.closeBtn}>✕</button>
      </div>
      {saved.map((entry) => (
        <button
          key={entry.ts}
          className={styles.entry}
          onClick={() => onLoad(entry.data)}
        >
          <div className={styles.entryName}>{entry.data.businessName || "(no name)"}</div>
          <div className={styles.entryMeta}>
            {entry.data.niche || "—"} · {entry.data.city || "—"} · {new Date(entry.ts).toLocaleDateString()}
          </div>
        </button>
      ))}
    </div>
  );
}
