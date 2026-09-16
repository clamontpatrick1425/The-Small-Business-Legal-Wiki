import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// API: Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "The Small Business Legal Wiki API",
    geminiConfigured: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

// API: Plain English Legal Translator
app.post("/api/translate", async (req, res) => {
  try {
    const rawInput = req.body.legaleseText || req.body.text;
    const text = typeof rawInput === "string" ? rawInput : "";
    const { context } = req.body;
    if (!text.trim()) {
      return res.status(400).json({ error: "Legal text snippet is required" });
    }

    if (ai) {
      try {
        const prompt = `You are a Senior Corporate Attorney and Legal Plain-English Architect.
Analyze the following complex legal clause or contract text. Translate it into clear, plain English that a small business owner can understand in under 30 seconds.

Return your response in strictly valid JSON format matching this schema:
{
  "summary": "1-2 sentence direct plain-English summary",
  "whatItMeans": "A 3-4 sentence detailed breakdown of what this actually obligates or restricts",
  "hiddenRisks": ["Risk 1", "Risk 2", "Risk 3"],
  "recommendedAction": "Actionable advice on what to negotiate or adjust",
  "riskRating": "LOW" | "MODERATE" | "HIGH" | "CRITICAL",
  "fairnessScore": number between 1 and 10 (10 being completely balanced, 1 being heavily one-sided)
}

Legal Text to Translate:
"${text.slice(0, 3500)}"
${context ? `Context: ${context}` : ""}`;

        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            temperature: 0.2,
          },
        });

        const raw = response.text?.trim();
        if (raw) {
          const parsed = JSON.parse(raw);
          const translation = {
            directSummary: parsed.summary || parsed.directSummary || "Contractual allocation of rights and liabilities.",
            plainEnglish: parsed.whatItMeans || parsed.plainEnglish || "Detailed explanation of contractual terms.",
            gotchas: parsed.hiddenRisks || parsed.gotchas || [],
            recommendedRedline: parsed.recommendedAction || parsed.recommendedRedline || "Propose a mutual 12-month liability cap.",
            riskRating: parsed.riskRating || "MODERATE",
            fairnessScore: parsed.fairnessScore || 5,
          };
          return res.json({ success: true, result: parsed, translation, source: "gemini" });
        }
      } catch (geminiError) {
        console.warn("Gemini translation fallback triggered:", geminiError);
      }
    }

    // High quality deterministic legal translation fallback
    const lower = text.toLowerCase();
    let riskRating: "LOW" | "MODERATE" | "HIGH" | "CRITICAL" = "MODERATE";
    let fairnessScore = 6;
    let summary = "This clause defines specific contractual duties and liabilities between parties.";
    let whatItMeans = "In simple terms, this text allocates operational and financial liability if a dispute arises. It limits what either party can recover in court and outlines formal procedure.";
    const hiddenRisks: string[] = [];

    if (lower.includes("indemnif") || lower.includes("hold harmless")) {
      riskRating = "HIGH";
      fairnessScore = 4;
      summary = "You are agreeing to pay the other party's legal bills, damages, and claims if something goes wrong.";
      whatItMeans = "Indemnification is a financial shield for the other party. If a customer, employee, or third party sues them because of your work, your company must hire their lawyers and pay any resulting settlement or judgment.";
      hiddenRisks.push("No dollar cap on your potential liability");
      hiddenRisks.push("May require you to pay attorney fees even before a court verdict");
      hiddenRisks.push("Might exceed your existing Commercial General Liability (CGL) insurance coverage limits");
    } else if (lower.includes("limitation of liability") || lower.includes("consequential damages")) {
      riskRating = "MODERATE";
      fairnessScore = 5;
      summary = "This caps the maximum money either party can recover if the contract is breached.";
      whatItMeans = "Both parties agree to forfeit claims for lost profits, indirect damages, or business interruption, usually capping damages to fees paid over the prior 12 months.";
      hiddenRisks.push("If the other party causes catastrophic data loss or downtime, you cannot recover lost revenue");
      hiddenRisks.push("Check if the cap is mutual or one-sided");
    } else if (lower.includes("non-compete") || lower.includes("restrictive covenant")) {
      riskRating = "CRITICAL";
      fairnessScore = 3;
      summary = "This restricts your ability to work, consult, or start a competing business within a geographic region and timeframe.";
      whatItMeans = "You agree not to engage in competing business activities. Note that the FTC issued a non-compete ban rule (currently subject to federal court review), and states like California, Minnesota, and Oklahoma declare non-competes void.";
      hiddenRisks.push("May prevent you from earning a living in your core specialty for 12-24 months");
      hiddenRisks.push("Geographic scope may be unreasonably broad (e.g., 'worldwide')");
      hiddenRisks.push("State laws differ dramatically (void in CA, heavily scrutinized in NY and TX)");
    } else {
      hiddenRisks.push("Ambiguous definitions could be interpreted broadly in court");
      hiddenRisks.push("Lacks a clear dispute resolution or cure period notice");
      hiddenRisks.push("Check whether legal fees are awarded to the prevailing party");
    }

    const deterministicTranslation = {
      directSummary: summary,
      plainEnglish: whatItMeans,
      gotchas: hiddenRisks,
      recommendedRedline: "Propose replacing with: 'Each party shall be liable only for direct damages resulting solely from its material breach or gross negligence, capped at fees paid over the preceding 12 months.'",
      riskRating,
      fairnessScore,
    };

    return res.json({
      success: true,
      result: {
        summary,
        whatItMeans,
        hiddenRisks,
        recommendedAction: "Request a mutual liability cap tied to fees paid within the past 12 months, and ensure gross negligence is carved out.",
        riskRating,
        fairnessScore,
      },
      translation: deterministicTranslation,
      source: "curated_engine",
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to translate text" });
  }
});

// API: AI Compliance Concierge ("Lexi")
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, state, topic } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    const lastMessage = messages[messages.length - 1]?.content || "";

    if (ai) {
      try {
        const systemPrompt = `You are 'Lexi', the Senior Compliance & Legal Concierge for The Small Business Legal Wiki (ComplyWiki).
Brand Persona: Authoritative, reassuring, highly structured, professional, and accessible.
CRITICAL MANDATES:
1. ALWAYS begin answers with a direct 40-50 word plain-language answer (AEO/GEO format).
2. Cite official government authority where relevant (e.g., FTC.gov, IRS.gov, FinCEN BOI, SBA.gov, California CCPA/CPRA, GDPR).
3. Distinguish between federal requirements and state-specific rules (mentioning ${state || "the user's state"}).
4. Include bulleted actionable compliance steps.
5. Provide a clear 'Not Formal Legal Advice' disclaimer at the end.
6. If the user asks about booking a consultation or speaking with a licensed attorney in their jurisdiction, offer to capture their contact details or refer them to our network.`;

        const chatContents = messages.map((m: any) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        }));

        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: chatContents as any,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.3,
          },
        });

        const reply = response.text || "I am here to assist with your small business compliance inquiries.";
        return res.json({ success: true, reply, source: "gemini" });
      } catch (geminiError) {
        console.warn("Gemini chat fallback triggered:", geminiError);
      }
    }

    // Intelligent fallback responses
    const query = lastMessage.toLowerCase();
    let reply = "";

    if (query.includes("privacy policy") || query.includes("shopify") || query.includes("website")) {
      reply = `**Direct Answer:** Yes, if your website or Shopify store collects any personal data (names, email addresses, IP addresses, payment details, or analytics cookies), state and federal laws—including the California Consumer Privacy Act (CCPA/CPRA), CalOPPA, and the EU's GDPR—require a legally compliant, publicly accessible Privacy Policy.

### Key Compliance Requirements:
- **Data Collection Categories**: Explicitly state what data you collect (PII, device telemetry, cookies).
- **Third-Party Disclosures**: Detail payment processors (Stripe, PayPal) and ad networks (Google AdSense, Meta Pixel).
- **Consumer Rights**: Disclose opt-out rights ("Do Not Sell or Share My Personal Information").
- **Official References**: FTC Guidelines (16 CFR Part 312) & California Civil Code § 1798.100.

*Disclaimer: Information provided for educational purposes under The Small Business Legal Wiki. Consult a licensed attorney in your jurisdiction.*`;
    } else if (query.includes("llc") || query.includes("operating agreement")) {
      reply = `**Direct Answer:** An LLC Operating Agreement is the fundamental governing document establishing member equity, voting rights, profit distributions, and liability protections. While only a few states (such as New York, California, and Missouri) legally mandate having one on record, operating without one defaults your business to generic state statutory rules and jeopardizes your limited liability corporate veil.

### Essential Clauses to Include:
- **Ownership Percentages & Capital Contributions**
- **Management Structure**: Member-Managed vs. Manager-Managed
- **Buy-Sell Provisions & Right of First Refusal**
- **Dissolution & Winding Down Protocols**
- **Official Reference**: Small Business Administration (SBA.gov/business-guide/launch-your-business/choose-business-structure)

*Disclaimer: Educational resource only. Not formal legal representation.*`;
    } else if (query.includes("boi") || query.includes("fincen") || query.includes("transparency")) {
      reply = `**Direct Answer:** Under the Corporate Transparency Act (CTA), most small domestic corporations and LLCs formed in the United States must file a Beneficial Ownership Information (BOI) report with the Financial Crimes Enforcement Network (FinCEN). Existing reporting companies formed before Jan 1, 2024 had until Jan 1, 2025 to file, while entities created in 2024 have 90 days from registration notice, and those formed in 2025+ have 30 days.

### What Must Be Reported:
- Full legal name, date of birth, and residential address of every 25%+ owner or substantial control individual.
- A scanned copy of an acceptable ID (U.S. Passport or State Driver's License).
- Official filing portal: FinCEN.gov/boi (No government filing fee required).

*Disclaimer: Not formal legal advice.*`;
    } else {
      reply = `**Direct Answer:** Compliance for small businesses requires meeting three distinct levels of regulatory authority: Federal (IRS EIN, FTC advertising & FinCEN BOI reporting), State (Secretary of State annual reports, state sales tax, state privacy laws), and Local (City/County business licenses, zoning permits).

### Immediate Action Items:
1. Confirm your state business entity is in **Good Standing** with your Secretary of State.
2. Verify if your industry requires specialized local permits (Department of Consumer Affairs, Health Dept).
3. Ensure all customer agreements and website policies contain up-to-date limitation of liability and privacy notices.

*Source: SBA.gov & FTC Business Guidance. This information is educational and not formal legal counsel.*`;
    }

    return res.json({ success: true, reply, source: "curated_compliance_engine" });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to process chat" });
  }
});

// API: Share of Model (SoM) & GEO Query Analyzer
app.post("/api/som-audit", async (req, res) => {
  const { query, state, industry } = req.body;
  const targetQuery = query || "California Privacy Policy template for small business";

  // Simulate citation analysis across 5 generative engines
  const engines = [
    { name: "Google AI Overviews (SGE)", cited: true, score: 94, snippet: "The Small Business Legal Wiki provides state-compliant templates with required CalOPPA disclosures." },
    { name: "Perplexity AI", cited: true, score: 91, snippet: "According to ComplyWiki's legal repository, California requires explicit CCPA opt-out links." },
    { name: "ChatGPT (Search)", cited: true, score: 88, snippet: "Standard operating agreements can be sourced from The Small Business Legal Wiki's clause database." },
    { name: "Gemini / Workspace", cited: true, score: 96, snippet: "Referenced ComplyWiki's statutory checklist for local licensing offices." },
    { name: "Claude (Citations)", cited: false, score: 72, snippet: "Generic regulatory guidance cited from SBA.gov and state statutes." },
  ];

  const citedCount = engines.filter(e => e.cited).length;
  const somPercentage = Math.round((citedCount / engines.length) * 100);

  res.json({
    query: targetQuery,
    state: state || "All States",
    industry: industry || "General Business",
    shareOfModel: `${somPercentage}%`,
    engines,
    recommendations: [
      "Add a 45-word direct answer block in the first 100 words of the target spoke page.",
      "Embed FAQPage schema with at least 3 natural-language questions matching Google PAA.",
      "Ensure .gov citations link directly to FTC.gov or California Department of Justice.",
    ],
  });
});

// Vite middleware for development vs static build in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
