import { useState, useRef, useCallback } from "react";

const COLORS = {
  bg: "#0a0a0f",
  surface: "#12121a",
  card: "#1a1a26",
  border: "#2a2a3d",
  purple: "#8b5cf6",
  purpleLight: "#a78bfa",
  purpleDim: "#4c1d95",
  purpleGlow: "rgba(139, 92, 246, 0.15)",
  red: "#ef4444",
  yellow: "#f59e0b",
  green: "#10b981",
  text: "#f1f0f5",
  muted: "#6b6b8a",
  subtle: "#2e2e45",
};

const styles = {
  app: {
    minHeight: "100vh",
    backgroundColor: COLORS.bg,
    color: COLORS.text,
    fontFamily: "'Inter', system-ui, sans-serif",
    padding: "0",
  },
  header: {
    borderBottom: `1px solid ${COLORS.border}`,
    padding: "20px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.surface,
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.purpleDim})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    boxShadow: `0 0 20px ${COLORS.purpleGlow}`,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 800,
    letterSpacing: "-0.5px",
  },
  logoSpan: {
    color: COLORS.purple,
  },
  tagline: {
    fontSize: 11,
    color: COLORS.muted,
    letterSpacing: "2px",
    textTransform: "uppercase",
    fontWeight: 600,
  },
  main: {
    maxWidth: 820,
    margin: "0 auto",
    padding: "32px 20px 60px",
  },
  hero: {
    textAlign: "center",
    marginBottom: 40,
  },
  heroEyebrow: {
    display: "inline-block",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "3px",
    textTransform: "uppercase",
    color: COLORS.purple,
    backgroundColor: COLORS.purpleGlow,
    border: `1px solid ${COLORS.purpleDim}`,
    borderRadius: 20,
    padding: "4px 14px",
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: "clamp(28px, 5vw, 42px)",
    fontWeight: 900,
    lineHeight: 1.1,
    marginBottom: 12,
    letterSpacing: "-1px",
  },
  heroSub: {
    fontSize: 15,
    color: COLORS.muted,
    maxWidth: 480,
    margin: "0 auto",
    lineHeight: 1.6,
  },
  tabs: {
    display: "flex",
    gap: 8,
    marginBottom: 24,
    backgroundColor: COLORS.surface,
    padding: 6,
    borderRadius: 12,
    border: `1px solid ${COLORS.border}`,
  },
  tab: (active) => ({
    flex: 1,
    padding: "10px 16px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
    transition: "all 0.2s",
    backgroundColor: active ? COLORS.purple : "transparent",
    color: active ? "#fff" : COLORS.muted,
    boxShadow: active ? `0 0 20px ${COLORS.purpleGlow}` : "none",
  }),
  card: {
    backgroundColor: COLORS.card,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: COLORS.muted,
    marginBottom: 10,
    display: "block",
  },
  textarea: {
    width: "100%",
    minHeight: 140,
    backgroundColor: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 10,
    padding: "14px 16px",
    color: COLORS.text,
    fontSize: 14,
    lineHeight: 1.6,
    resize: "vertical",
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  uploadZone: (dragging) => ({
    border: `2px dashed ${dragging ? COLORS.purple : COLORS.border}`,
    borderRadius: 12,
    padding: "40px 24px",
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: dragging ? COLORS.purpleGlow : COLORS.surface,
    transition: "all 0.2s",
  }),
  uploadIcon: {
    fontSize: 36,
    marginBottom: 12,
  },
  uploadText: {
    fontSize: 14,
    color: COLORS.muted,
    marginBottom: 6,
  },
  uploadHint: {
    fontSize: 12,
    color: COLORS.subtle,
  },
  previewImg: {
    maxWidth: "100%",
    maxHeight: 240,
    borderRadius: 10,
    border: `1px solid ${COLORS.border}`,
    marginTop: 16,
    display: "block",
    margin: "16px auto 0",
  },
  btn: {
    width: "100%",
    padding: "15px 24px",
    backgroundColor: COLORS.purple,
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    letterSpacing: "0.5px",
    boxShadow: `0 0 30px ${COLORS.purpleGlow}`,
    transition: "all 0.2s",
    marginTop: 16,
  },
  btnDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
    boxShadow: "none",
  },
  loadingWrap: {
    textAlign: "center",
    padding: "40px 0",
  },
  spinner: {
    width: 40,
    height: 40,
    border: `3px solid ${COLORS.border}`,
    borderTop: `3px solid ${COLORS.purple}`,
    borderRadius: "50%",
    margin: "0 auto 16px",
    animation: "spin 0.8s linear infinite",
  },
  loadingText: {
    color: COLORS.muted,
    fontSize: 14,
  },
  resultHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    flexWrap: "wrap",
    gap: 12,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 800,
  },
  overchargeBadge: (amount) => ({
    backgroundColor: amount > 0 ? "rgba(239,68,68,0.15)" : "rgba(16,185,129,0.15)",
    border: `1px solid ${amount > 0 ? COLORS.red : COLORS.green}`,
    color: amount > 0 ? COLORS.red : COLORS.green,
    borderRadius: 8,
    padding: "6px 14px",
    fontSize: 13,
    fontWeight: 700,
  }),
  feeList: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 20,
  },
  feeItem: (type) => ({
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: "12px 16px",
    borderRadius: 10,
    backgroundColor:
      type === "JUNK"
        ? "rgba(239,68,68,0.08)"
        : type === "QUESTIONABLE"
        ? "rgba(245,158,11,0.08)"
        : "rgba(16,185,129,0.08)",
    border: `1px solid ${
      type === "JUNK"
        ? "rgba(239,68,68,0.25)"
        : type === "QUESTIONABLE"
        ? "rgba(245,158,11,0.25)"
        : "rgba(16,185,129,0.25)"
    }`,
    gap: 12,
  }),
  feeLeft: {
    flex: 1,
  },
  feeName: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 3,
  },
  feeDesc: {
    fontSize: 12,
    color: COLORS.muted,
    lineHeight: 1.5,
  },
  feeRight: {
    textAlign: "right",
    flexShrink: 0,
  },
  feeAmount: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 4,
  },
  feeBadge: (type) => ({
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: "1px",
    textTransform: "uppercase",
    color:
      type === "JUNK" ? COLORS.red : type === "QUESTIONABLE" ? COLORS.yellow : COLORS.green,
    backgroundColor:
      type === "JUNK"
        ? "rgba(239,68,68,0.15)"
        : type === "QUESTIONABLE"
        ? "rgba(245,158,11,0.15)"
        : "rgba(16,185,129,0.15)",
    padding: "2px 8px",
    borderRadius: 4,
    display: "inline-block",
  }),
  sectionTitle: {
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: COLORS.muted,
    marginBottom: 12,
    marginTop: 20,
  },
  disputeBox: {
    backgroundColor: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 10,
    padding: 16,
    fontSize: 13,
    lineHeight: 1.7,
    color: COLORS.text,
    whiteSpace: "pre-wrap",
    position: "relative",
  },
  copyBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: COLORS.subtle,
    border: "none",
    borderRadius: 6,
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: 700,
    padding: "4px 10px",
    cursor: "pointer",
    letterSpacing: "0.5px",
  },
  historyEmpty: {
    textAlign: "center",
    padding: "60px 20px",
    color: COLORS.muted,
  },
  historyEmptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  historyItem: {
    backgroundColor: COLORS.card,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 12,
    padding: "16px 20px",
    marginBottom: 12,
    cursor: "pointer",
    transition: "border-color 0.2s",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  historyLeft: {
    flex: 1,
    minWidth: 0,
  },
  historyDate: {
    fontSize: 11,
    color: COLORS.muted,
    marginBottom: 4,
    fontWeight: 600,
    letterSpacing: "0.5px",
  },
  historyPreview: {
    fontSize: 13,
    color: COLORS.text,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  historyRight: {
    textAlign: "right",
    flexShrink: 0,
  },
  clearBtn: {
    backgroundColor: "transparent",
    border: `1px solid ${COLORS.border}`,
    color: COLORS.muted,
    borderRadius: 8,
    padding: "8px 16px",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    marginBottom: 16,
  },
  newScanBtn: {
    backgroundColor: "transparent",
    border: `1px solid ${COLORS.purple}`,
    color: COLORS.purple,
    borderRadius: 8,
    padding: "10px 20px",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    marginTop: 16,
    width: "100%",
  },
};

function parseFeeResponse(text) {
  try {
    const clean = text.replace(/```json|```/g, "").trim();
    const start = clean.indexOf("{");
    const end = clean.lastIndexOf("}");
    if (start === -1 || end === -1) throw new Error("No JSON");
    return JSON.parse(clean.slice(start, end + 1));
  } catch {
    return null;
  }
}

const SYSTEM_PROMPT = `You are FeeExposed, an AI bill auditor. Analyze bills and receipts ruthlessly. 

Return ONLY valid JSON (no markdown, no explanation) in this exact format:
{
  "summary": "One sentence summary of what this bill is for",
  "totalOvercharge": 12.50,
  "fees": [
    {
      "name": "Fee name",
      "amount": "$X.XX or 'Unknown'",
      "type": "JUNK|QUESTIONABLE|LEGIT",
      "reason": "Short explanation why"
    }
  ],
  "disputeScript": "Full dispute script the user can read verbatim to fight these charges",
  "battlePlan": "3-4 step action plan to get money back"
}

JUNK = fees with no legitimate basis, pure profit grabs (resort fees, service fees with no service, convenience fees)
QUESTIONABLE = fees that may be negotiable or inflated
LEGIT = actual taxes or required government fees

Be aggressive. Most fees are junk. Call them out.`;

export default function FeeExposed() {
  const [tab, setTab] = useState("scan");
  const [inputMode, setInputMode] = useState("text");
  const [billText, setBillText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("feeexposed_history") || "[]");
    } catch {
      return [];
    }
  });
  const [copied, setCopied] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef();

  const saveToHistory = useCallback((scanResult, preview) => {
    const entry = {
      id: Date.now(),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      summary: scanResult.summary,
      totalOvercharge: scanResult.totalOvercharge,
      fees: scanResult.fees,
      disputeScript: scanResult.disputeScript,
      battlePlan: scanResult.battlePlan,
      preview,
    };
    setHistory((prev) => {
      const updated = [entry, ...prev].slice(0, 50);
      try { localStorage.setItem("feeexposed_history", JSON.stringify(updated)); } catch {}
      return updated;
    });
  }, []);

  const handleImageDrop = useCallback((file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
      setImageBase64(e.target.result.split(",")[1]);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleScan = async () => {
    setError(null);
    setResult(null);
    setLoading(true);

    try {
      let messages;
      if (inputMode === "text") {
        messages = [{ role: "user", content: `Analyze this bill:\n\n${billText}` }];
      } else {
        messages = [{
          role: "user",
          content: [
            { type: "image", source: { type: "base64", media_type: imageFile.type, data: imageBase64 } },
            { type: "text", text: "Analyze this bill/receipt image and expose all the junk fees." },
          ],
        }];
      }

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages,
        }),
      });

      const data = await response.json();
      const text = data.content?.map((b) => b.text || "").join("") || "";
      const parsed = parseFeeResponse(text);

      if (!parsed) throw new Error("Could not parse response. Try again.");

      setResult(parsed);
      saveToHistory(parsed, inputMode === "text" ? billText.slice(0, 80) : "📷 Photo scan");
    } catch (err) {
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyDispute = () => {
    navigator.clipboard.writeText(result.disputeScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const canScan = inputMode === "text" ? billText.trim().length > 10 : !!imageBase64;

  return (
    <div style={styles.app}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        textarea:focus { border-color: #8b5cf6 !important; }
        button:hover:not(:disabled) { filter: brightness(1.1); }
      `}</style>

      <header style={styles.header}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>🔍</div>
          <div>
            <div style={styles.logoText}>
              Fee<span style={styles.logoSpan}>Exposed</span>
            </div>
            <div style={styles.tagline}>Stop paying junk fees</div>
          </div>
        </div>
        <div style={{ fontSize: 12, color: COLORS.muted, textAlign: "right" }}>
          <span style={{ color: COLORS.purple, fontWeight: 700 }}>{history.length}</span> scans saved
        </div>
      </header>

      <main style={styles.main}>
        {!result && !loading && (
          <>
            <div style={styles.hero}>
              <div style={styles.heroEyebrow}>AI Bill Auditor</div>
              <h1 style={styles.heroTitle}>
                They're charging you.<br />
                <span style={{ color: COLORS.purple }}>We expose it.</span>
              </h1>
              <p style={styles.heroSub}>
                Paste a bill or snap a photo. FeeExposed finds every junk fee and hands you a script to fight back.
              </p>
            </div>

            <div style={styles.tabs}>
              <button style={styles.tab(inputMode === "text")} onClick={() => setInputMode("text")}>
                📋 Paste Bill Text
              </button>
              <button style={styles.tab(inputMode === "photo")} onClick={() => setInputMode("photo")}>
                📷 Upload Photo
              </button>
              <button style={styles.tab(tab === "history")} onClick={() => setTab(tab === "history" ? "scan" : "history")}>
                🗂 History ({history.length})
              </button>
            </div>

            {tab !== "history" ? (
              <div style={styles.card}>
                {inputMode === "text" ? (
                  <>
                    <label style={styles.label}>Paste your bill here</label>
                    <textarea
                      style={styles.textarea}
                      placeholder="Paste hotel bill, phone bill, cable statement, restaurant receipt... anything with fees."
                      value={billText}
                      onChange={(e) => setBillText(e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <label style={styles.label}>Upload bill photo</label>
                    <div
                      style={styles.uploadZone(dragging)}
                      onClick={() => fileRef.current.click()}
                      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                      onDragLeave={() => setDragging(false)}
                      onDrop={(e) => { e.preventDefault(); setDragging(false); handleImageDrop(e.dataTransfer.files[0]); }}
                    >
                      <div style={styles.uploadIcon}>📄</div>
                      <div style={styles.uploadText}>Drop your bill photo here or tap to browse</div>
                      <div style={styles.uploadHint}>JPG, PNG, WEBP supported</div>
                      <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => handleImageDrop(e.target.files[0])}
                      />
                    </div>
                    {imagePreview && <img src={imagePreview} alt="Bill preview" style={styles.previewImg} />}
                  </>
                )}
                <button
                  style={{ ...styles.btn, ...((!canScan || loading) ? styles.btnDisabled : {}) }}
                  onClick={handleScan}
                  disabled={!canScan || loading}
                >
                  🔍 Expose The Fees
                </button>
                {error && (
                  <div style={{ marginTop: 12, color: COLORS.red, fontSize: 13, textAlign: "center" }}>
                    {error}
                  </div>
                )}
              </div>
            ) : (
              <div>
                {history.length === 0 ? (
                  <div style={styles.historyEmpty}>
                    <div style={styles.historyEmptyIcon}>🗂</div>
                    <div>No scans yet. Start by scanning a bill.</div>
                  </div>
                ) : (
                  <>
                    <button style={styles.clearBtn} onClick={() => {
                      setHistory([]);
                      try { localStorage.removeItem("feeexposed_history"); } catch {}
                    }}>
                      Clear All History
                    </button>
                    {history.map((item) => (
                      <div key={item.id} style={styles.historyItem} onClick={() => { setResult(item); setTab("scan"); }}>
                        <div style={styles.historyLeft}>
                          <div style={styles.historyDate}>{item.date}</div>
                          <div style={styles.historyPreview}>{item.summary}</div>
                        </div>
                        <div style={styles.historyRight}>
                          <div style={{ ...styles.overchargeBadge(item.totalOvercharge), fontSize: 12 }}>
                            {item.totalOvercharge > 0 ? `+$${item.totalOvercharge.toFixed(2)} junk` : "Clean bill"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </>
        )}

        {loading && (
          <div style={styles.loadingWrap}>
            <div style={styles.spinner} />
            <div style={styles.loadingText}>Scanning your bill for junk fees...</div>
          </div>
        )}

        {result && !loading && (
          <div>
            <div style={styles.resultHeader}>
              <div style={styles.resultTitle}>Scan Results</div>
              <div style={styles.overchargeBadge(result.totalOvercharge)}>
                {result.totalOvercharge > 0
                  ? `$${result.totalOvercharge.toFixed(2)} in junk fees`
                  : "No junk fees found"}
              </div>
            </div>

            <div style={{ ...styles.card, marginBottom: 16 }}>
              <div style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.6 }}>{result.summary}</div>
            </div>

            <div style={styles.sectionTitle}>Fee Breakdown</div>
            <div style={styles.feeList}>
              {result.fees?.map((fee, i) => (
                <div key={i} style={styles.feeItem(fee.type)}>
                  <div style={styles.feeLeft}>
                    <div style={styles.feeName}>{fee.name}</div>
                    <div style={styles.feeDesc}>{fee.reason}</div>
                  </div>
                  <div style={styles.feeRight}>
                    <div style={{ ...styles.feeAmount, color: fee.type === "JUNK" ? COLORS.red : fee.type === "QUESTIONABLE" ? COLORS.yellow : COLORS.green }}>
                      {fee.amount}
                    </div>
                    <div style={styles.feeBadge(fee.type)}>{fee.type}</div>
                  </div>
                </div>
              ))}
            </div>

            {result.disputeScript && (
              <>
                <div style={styles.sectionTitle}>Dispute Script</div>
                <div style={{ ...styles.card, position: "relative" }}>
                  <button style={styles.copyBtn} onClick={copyDispute}>
                    {copied ? "✓ Copied" : "Copy"}
                  </button>
                  <div style={styles.disputeBox}>{result.disputeScript}</div>
                </div>
              </>
            )}

            {result.battlePlan && (
              <>
                <div style={styles.sectionTitle}>Battle Plan</div>
                <div style={styles.card}>
                  <div style={{ fontSize: 14, lineHeight: 1.8, color: COLORS.text, whiteSpace: "pre-wrap" }}>
                    {result.battlePlan}
                  </div>
                </div>
              </>
            )}

            <button style={styles.newScanBtn} onClick={() => { setResult(null); setBillText(""); setImageFile(null); setImagePreview(null); setImageBase64(null); }}>
              + Scan Another Bill
            </button>
          </div>
        )}
      </main>
    </div>
    }
