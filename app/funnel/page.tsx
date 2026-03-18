"use client";

/*
═══════════════════════════════════════════════════════════
VIDEOS DUANE NEEDS TO RECORD (4-6 minutes each, phone or camera is fine):

Video 1 — "What to Fix and What to Leave"
Talk about: The 3 things that matter most to buyers (first impression,
kitchen feel, bathroom freshness). What NOT to spend money on.
Your construction background — you've seen what buyers actually notice.

Video 2 — "The $10,000 Secret"
Talk about: The specific things your clients do before listing that
add value (declutter, neutral paint, curb appeal, small staging).
Share a real story of a home that sold for more than expected.

Video 3 — "Making Buyers Fall in Love"
Talk about: Your wife's decorating approach. The power of scent, light
and flow. How you walk through a home and see it through a buyer's eyes.

Video 4 — "Why Homes Don't Sell"
Talk about: The 3 real reasons (wrong price, poor presentation,
wrong agent/marketing). Be honest and direct.
Tell a turnaround story.

Video 5 — "Welcome + Your Free Guide"
Talk about: Who you are, your background, why you do this,
what's in the guide, what to expect from working with you.

Once recorded, upload to YouTube as Unlisted.
Replace DUANE_VIDEO_1 through DUANE_VIDEO_5 in the code
with the actual YouTube video IDs.
═══════════════════════════════════════════════════════════
*/

import { useState } from "react";
import { useRouter } from "next/navigation";
import emailjs from "@emailjs/browser";

const SERVICE   = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const TEMPLATE  = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const PUBKEY    = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";
const SHEET_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL ?? "";

/* ─── Types ─── */
type Answers = {
  email: string;
  situation: string;
  concern: string;
  condition: string;
  timeline: string;
  goal: string;
};

type VideoInfo = {
  id: string;
  headline: string;
  subtext: string;
};

/* ─── Video logic ─── */
function getVideo(a: Answers): VideoInfo {
  if (a.condition === "C" || a.condition === "D") {
    return {
      id: "vHaGzW2SUW4",
      headline: "Here's exactly what to fix (and what to leave alone)",
      subtext:
        "Duane walks you through the highest-ROI improvements for homes just like yours.",
    };
  }
  if (a.concern === "A") {
    return {
      id: "DUANE_VIDEO_2",
      headline: "The $10,000 secret most sellers never hear",
      subtext:
        "This is what consistently gets Duane's clients more than they expected.",
    };
  }
  if (a.concern === "C") {
    return {
      id: "DUANE_VIDEO_3",
      headline: "How to make buyers fall in love the moment they walk in",
      subtext:
        "Duane's wife is a professional decorator. Here's what she does before every listing.",
    };
  }
  if (a.situation === "C") {
    return {
      id: "cUr2av9GNeQ",
      headline: "Why homes don't sell — and exactly how we fix that",
      subtext:
        "Duane has helped many sellers who felt stuck. Here's what was really going on.",
    };
  }
  return {
    id: "nZ7pOfCKwII",
    headline: "Your free guide is on its way — watch this first",
    subtext:
      "Duane shares the single biggest mistake sellers make and how to avoid it.",
  };
}

/* ─── Human-readable labels for each answer ─── */
const LABELS: Record<string, Record<string, string>> = {
  situation: {
    A: "Thinking about selling but haven't decided yet",
    B: "Decided to sell and want to get started",
    C: "Been trying to sell but it hasn't worked",
    D: "Just want to know what my home is worth",
  },
  concern: {
    A: "Getting the price I need",
    B: "Finding the right buyer",
    C: "The home not showing well",
    D: "Not knowing what to fix first",
  },
  condition: {
    A: "Move-in ready — just needs cleaning",
    B: "Needs minor updates (paint, fixtures, small repairs)",
    C: "Needs significant work but has great bones",
    D: "I honestly don't know where to start",
  },
  timeline: {
    A: "As soon as possible",
    B: "In the next 3-6 months",
    C: "Within the next year",
    D: "Just exploring my options for now",
  },
  goal: {
    A: "Getting the highest possible price",
    B: "A fast, stress-free sale",
    C: "Finding the right buyer who will love the home",
    D: "Just knowing I made the right decision",
  },
};

const VIDEO_LABELS: Record<string, string> = {
  vHaGzW2SUW4: "What to Fix and What to Leave",
  DUANE_VIDEO_2: "The $10,000 Secret",
  DUANE_VIDEO_3: "Making Buyers Fall in Love",
  cUr2av9GNeQ: "Why Homes Don't Sell",
  nZ7pOfCKwII: "Welcome + Your Free Guide",
};

function readableAnswer(field: string, code: string): string {
  return LABELS[field]?.[code] ?? code;
}

/* ─── Choice Button ─── */
function Choice({
  letter,
  label,
  onClick,
  delay,
}: {
  letter: string;
  label: string;
  onClick: () => void;
  delay: number;
}) {
  return (
    <button
      className={`tf-choice tf-animate tf-animate-delay-${delay}`}
      onClick={onClick}
    >
      <span className="tf-choice-letter">{letter}</span>
      {label}
    </button>
  );
}

/* ─── Main Funnel ─── */
// Debug: log env vars on module load
console.log("[FUNNEL DEBUG] SHEET_URL:", SHEET_URL ? `"${SHEET_URL}"` : "⚠️ EMPTY — check .env.local NEXT_PUBLIC_GOOGLE_SHEET_URL");
console.log("[FUNNEL DEBUG] EmailJS SERVICE:", SERVICE || "⚠️ EMPTY");
console.log("[FUNNEL DEBUG] EmailJS TEMPLATE:", TEMPLATE || "⚠️ EMPTY");
console.log("[FUNNEL DEBUG] EmailJS PUBKEY:", PUBKEY || "⚠️ EMPTY");

export default function FunnelPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({
    email: "",
    situation: "",
    concern: "",
    condition: "",
    timeline: "",
    goal: "",
  });
  const [emailError, setEmailError] = useState("");

  const totalSteps = 7;
  const progress = (step / totalSteps) * 100;

  function pick(field: keyof Answers, value: string) {
    setAnswers((prev) => ({ ...prev, [field]: value }));
    if (step < 6) {
      setStep(step + 1);
    } else {
      // Step 6 is the last question — advance to video and send email
      const updated = { ...answers, [field]: value };
      sendEmail(updated);
      sendToSheet(updated);
      setStep(7);
    }
  }

  function sendEmail(a: Answers) {
    if (!SERVICE || !TEMPLATE || !PUBKEY) return;

    const video = getVideo(a);
    const params = {
      lead_email: a.email,
      situation: readableAnswer("situation", a.situation),
      concern: readableAnswer("concern", a.concern),
      condition: readableAnswer("condition", a.condition),
      timeline: readableAnswer("timeline", a.timeline),
      goal: readableAnswer("goal", a.goal),
      video_shown: VIDEO_LABELS[video.id] ?? video.id,
      date: new Date().toLocaleDateString("en-CA"),
    };

    emailjs
      .send(SERVICE, TEMPLATE, params, { publicKey: PUBKEY })
      .then(() => {
        console.log("Lead email sent successfully");
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
      });
  }

  function sendToSheet(a: Answers) {
    console.log("[FUNNEL DEBUG] sendToSheet() called");
    console.log("[FUNNEL DEBUG] SHEET_URL value:", SHEET_URL ? `"${SHEET_URL}"` : "⚠️ EMPTY");
    if (!SHEET_URL) {
      console.warn("[FUNNEL DEBUG] ⚠️ SHEET_URL is empty — fetch will NOT fire. Set NEXT_PUBLIC_GOOGLE_SHEET_URL in .env.local");
      return;
    }

    const video = getVideo(a);
    const payload = {
      date: new Date().toLocaleDateString("en-CA"),
      email: a.email,
      situation: readableAnswer("situation", a.situation),
      concern: readableAnswer("concern", a.concern),
      condition: readableAnswer("condition", a.condition),
      timeline: readableAnswer("timeline", a.timeline),
      goal: readableAnswer("goal", a.goal),
      video_shown: VIDEO_LABELS[video.id] ?? video.id,
    };
    console.log("[FUNNEL DEBUG] 🚀 Fetching SHEET_URL with payload:", payload);
    fetch(SHEET_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        console.log("[FUNNEL DEBUG] ✅ Fetch completed. Status:", res.status, "Type:", res.type);
      })
      .catch((err) => {
        console.error("[FUNNEL DEBUG] ❌ Fetch error:", err);
      });
  }

  function submitEmail() {
    const email = answers.email.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmailError("");
    setStep(2);
  }

  function goBack() {
    if (step === 1) {
      router.push("/");
    } else {
      setStep(step - 1);
    }
  }

  const video = getVideo(answers);
  const isPlaceholder = video.id.startsWith("DUANE_");

  return (
    <div className="funnel-bg">
      {/* Progress bar */}
      <div className="tf-progress">
        <div className="tf-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Back button */}
      <button className="tf-back" onClick={goBack}>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </button>

      {/* ─── STEP 1: Email ─── */}
      {step === 1 && (
        <div className="tf-step" key="step1">
          <div className="tf-body">
            <div className="tf-card">
              <p className="tf-step-label tf-animate">Step 1 of 7</p>
              <h2 className="tf-question tf-animate tf-animate-delay-1">
                Where should we send your free guide?
              </h2>
              <p className="tf-subtext tf-animate tf-animate-delay-2">
                We'll email you the PDF right away — plus a personal note from
                Duane.
              </p>
              <div className="tf-animate tf-animate-delay-3">
                <input
                  type="email"
                  className="tf-input-box"
                  placeholder="your@email.com"
                  value={answers.email}
                  onChange={(e) =>
                    setAnswers((prev) => ({ ...prev, email: e.target.value }))
                  }
                  onKeyDown={(e) => e.key === "Enter" && submitEmail()}
                  autoFocus
                />
                {emailError && (
                  <p className="tf-alert-error">{emailError}</p>
                )}
              </div>
              <div className="tf-animate tf-animate-delay-4">
                <button className="tf-ok" onClick={submitEmail}>
                  Send Me the Guide
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── STEP 2: Situation ─── */}
      {step === 2 && (
        <div className="tf-step" key="step2">
          <div className="tf-body">
            <div className="tf-card">
              <p className="tf-step-label tf-animate">Step 2 of 7</p>
              <h2 className="tf-question tf-animate tf-animate-delay-1">
                To make sure the guide is most helpful for you...
              </h2>
              <p className="tf-subtext tf-animate tf-animate-delay-2">
                What best describes your situation right now?
              </p>
              <Choice
                letter="A"
                label="I'm thinking about selling but haven't decided yet"
                onClick={() => pick("situation", "A")}
                delay={3}
              />
              <Choice
                letter="B"
                label="I've decided to sell and want to get started"
                onClick={() => pick("situation", "B")}
                delay={4}
              />
              <Choice
                letter="C"
                label="I've been trying to sell but it hasn't worked"
                onClick={() => pick("situation", "C")}
                delay={5}
              />
              <Choice
                letter="D"
                label="I just want to know what my home is worth"
                onClick={() => pick("situation", "D")}
                delay={6}
              />
            </div>
          </div>
        </div>
      )}

      {/* ─── STEP 3: Concern ─── */}
      {step === 3 && (
        <div className="tf-step" key="step3">
          <div className="tf-body">
            <div className="tf-card">
              <p className="tf-step-label tf-animate">Step 3 of 7</p>
              <h2 className="tf-question tf-animate tf-animate-delay-1">
                Good to know — one more quick question:
              </h2>
              <p className="tf-subtext tf-animate tf-animate-delay-2">
                What concerns you most about selling your home?
              </p>
              <Choice
                letter="A"
                label="Getting the price I need"
                onClick={() => pick("concern", "A")}
                delay={3}
              />
              <Choice
                letter="B"
                label="Finding the right buyer"
                onClick={() => pick("concern", "B")}
                delay={4}
              />
              <Choice
                letter="C"
                label="The home not showing well"
                onClick={() => pick("concern", "C")}
                delay={5}
              />
              <Choice
                letter="D"
                label="Not knowing what to fix first"
                onClick={() => pick("concern", "D")}
                delay={6}
              />
            </div>
          </div>
        </div>
      )}

      {/* ─── STEP 4: Condition ─── */}
      {step === 4 && (
        <div className="tf-step" key="step4">
          <div className="tf-body">
            <div className="tf-card">
              <p className="tf-step-label tf-animate">Step 4 of 7</p>
              <h2 className="tf-question tf-animate tf-animate-delay-1">
                How would you describe your home's current condition?
              </h2>
              <Choice
                letter="A"
                label="Move-in ready — just needs cleaning"
                onClick={() => pick("condition", "A")}
                delay={2}
              />
              <Choice
                letter="B"
                label="Needs minor updates (paint, fixtures, small repairs)"
                onClick={() => pick("condition", "B")}
                delay={3}
              />
              <Choice
                letter="C"
                label="Needs significant work but has great bones"
                onClick={() => pick("condition", "C")}
                delay={4}
              />
              <Choice
                letter="D"
                label="I honestly don't know where to start"
                onClick={() => pick("condition", "D")}
                delay={5}
              />
            </div>
          </div>
        </div>
      )}

      {/* ─── STEP 5: Timeline ─── */}
      {step === 5 && (
        <div className="tf-step" key="step5">
          <div className="tf-body">
            <div className="tf-card">
              <p className="tf-step-label tf-animate">Step 5 of 7</p>
              <h2 className="tf-question tf-animate tf-animate-delay-1">
                When are you hoping to have your home sold?
              </h2>
              <Choice
                letter="A"
                label="As soon as possible"
                onClick={() => pick("timeline", "A")}
                delay={2}
              />
              <Choice
                letter="B"
                label="In the next 3-6 months"
                onClick={() => pick("timeline", "B")}
                delay={3}
              />
              <Choice
                letter="C"
                label="Within the next year"
                onClick={() => pick("timeline", "C")}
                delay={4}
              />
              <Choice
                letter="D"
                label="Just exploring my options for now"
                onClick={() => pick("timeline", "D")}
                delay={5}
              />
            </div>
          </div>
        </div>
      )}

      {/* ─── STEP 6: Goal ─── */}
      {step === 6 && (
        <div className="tf-step" key="step6">
          <div className="tf-body">
            <div className="tf-card">
              <p className="tf-step-label tf-animate">Step 6 of 7</p>
              <h2 className="tf-question tf-animate tf-animate-delay-1">
                What would make this the perfect outcome for you?
              </h2>
              <Choice
                letter="A"
                label="Getting the highest possible price"
                onClick={() => pick("goal", "A")}
                delay={2}
              />
              <Choice
                letter="B"
                label="A fast, stress-free sale"
                onClick={() => pick("goal", "B")}
                delay={3}
              />
              <Choice
                letter="C"
                label="Finding the right buyer who will love the home"
                onClick={() => pick("goal", "C")}
                delay={4}
              />
              <Choice
                letter="D"
                label="Just knowing I made the right decision"
                onClick={() => pick("goal", "D")}
                delay={5}
              />
            </div>
          </div>
        </div>
      )}

      {/* ─── STEP 7: Personalized Video + CTA ─── */}
      {step === 7 && (
        <div className="tf-step" key="step7" style={{ minHeight: "auto", paddingTop: "4rem", paddingBottom: "4rem" }}>
          <div className="tf-body" style={{ maxWidth: "640px" }}>
            {/* Video section */}
            <div className="tf-card tf-animate" style={{ marginBottom: "1.5rem" }}>
              <p className="tf-step-label">Your Personalized Message</p>
              <h2 className="tf-question tf-animate tf-animate-delay-1">
                {video.headline}
              </h2>
              <p className="tf-subtext tf-animate tf-animate-delay-2">
                {video.subtext}
              </p>

              <div className="tf-animate tf-animate-delay-3">
                {isPlaceholder ? (
                  <div className="video-placeholder">
                    <img
                      src="https://i10.moxi.onl/img-pr/a/7faa4f50-42b4-4d01-a9bc-1c297ea92741/0_1_full.jpg"
                      alt="Duane Enns"
                      className="w-20 h-20 rounded-full object-cover mb-4 shadow-lg"
                    />
                    <p
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        color: "#002349",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Duane's personal video message is coming soon
                    </p>
                    <p
                      style={{
                        fontFamily: "'Outfit', system-ui, sans-serif",
                        fontSize: "0.85rem",
                        color: "#8a8f9a",
                      }}
                    >
                      In the meantime, your free guide is on its way!
                    </p>
                  </div>
                ) : (
                  <div
                    style={{
                      maxWidth: "360px",
                      margin: "0 auto",
                      borderRadius: "16px",
                      overflow: "hidden",
                    }}
                  >
                    <iframe
                      src={`https://www.youtube.com/shorts/${video.id}`}
                      title="Duane Enns — Personal Message"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{
                        width: "360px",
                        height: "640px",
                        border: "none",
                        display: "block",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Text CTA */}
            <div
              className="tf-card tf-animate tf-animate-delay-4"
              style={{ textAlign: "center" }}
            >
              <h2
                className="tf-question"
                style={{ marginBottom: "0.5rem" }}
              >
                Ready to talk? Text Duane directly.
              </h2>
              <p className="tf-subtext" style={{ marginBottom: "1.5rem" }}>
                No forms, no waiting. Just a real conversation with someone who
                knows your area.
              </p>

              <a
                href="sms:+12043462111"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "1.1rem 2.5rem",
                  background: "linear-gradient(135deg, #002349, #003366)",
                  color: "#fff",
                  fontFamily: "'Outfit', system-ui, sans-serif",
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  borderRadius: "18px",
                  textDecoration: "none",
                  boxShadow: "0 6px 24px rgba(0, 35, 73, 0.35)",
                  transition: "all 0.3s ease",
                  marginBottom: "1.25rem",
                }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Text Duane Now — (204) 346-2111
              </a>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontFamily: "'Outfit', system-ui, sans-serif",
                  fontSize: "0.9rem",
                  color: "#8a8f9a",
                }}
              >
                <a
                  href="tel:+12043462111"
                  style={{
                    color: "#5a6070",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                >
                  Or call: (204) 346-2111
                </a>
                <a
                  href="mailto:duane@coldwellbanker.ca"
                  style={{
                    color: "#5a6070",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                >
                  Email: duane@coldwellbanker.ca
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
