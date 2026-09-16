import React, { useState } from 'react';
import { 
  CheckSquare, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle, 
  RotateCcw, 
  Download, 
  ArrowRight, 
  Sparkles, 
  ShieldAlert, 
  ShieldCheck 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AdSenseUnit } from '../components/AdSenseUnit';
import { SchemaMarkup } from '../components/SchemaMarkup';
import { useSeoMeta } from '../hooks/useSeoMeta';

interface Question {
  id: string;
  category: string;
  question: string;
  description: string;
  options: Array<{
    label: string;
    points: number; // 0 to 10
    riskLevel: 'LOW' | 'MODERATE' | 'CRITICAL';
    feedback: string;
  }>;
}

const AUDIT_QUESTIONS: Question[] = [
  {
    id: 'privacy-policy',
    category: 'Privacy & Data Protection',
    question: 'Does your website display an active Privacy Policy covering 2026 state privacy mandates?',
    description: 'Under the California Consumer Privacy Act (CCPA/CPRA) and 18+ state privacy laws, any commercial website collecting user data (including Google Analytics, cookies, or contact forms) must publish a compliant privacy disclosure.',
    options: [
      {
        label: 'Yes, fully updated with statutory rights, opt-out mechanisms, and data retention disclosures.',
        points: 10,
        riskLevel: 'LOW',
        feedback: 'Excellent. Your disclosures conform with CCPA § 1798.100 and FTC transparency guidelines.',
      },
      {
        label: 'We have a generic or older privacy policy from 2+ years ago.',
        points: 5,
        riskLevel: 'MODERATE',
        feedback: 'Warning: Privacy laws in CA, VA, CO, CT, and TX were heavily updated in 2024–2026. Older policies lack mandatory profiling opt-outs.',
      },
      {
        label: 'No privacy policy is currently published on our site.',
        points: 0,
        riskLevel: 'CRITICAL',
        feedback: 'Critical Risk: The California AG and CPPA impose statutory civil penalties up to $7,500 per intentional violation.',
      },
    ],
  },
  {
    id: 'boi-filing',
    category: 'Federal Corporate Transparency Act',
    question: 'Is your company a U.S.-formed entity, or a foreign entity registered to do business here?',
    description: 'FinCEN permanently exempted all U.S.-formed corporations and LLCs from Beneficial Ownership Information (BOI) reporting in August 2026. Only foreign entities registered to do business in a U.S. state remain subject to the Corporate Transparency Act.',
    options: [
      { label: 'We were formed in the U.S. — no BOI filing applies to us.', points: 10, riskLevel: 'LOW',
        feedback: 'Correct — U.S.-formed companies have no BOI obligation under the current final rule. Worth a periodic check at FinCEN.gov/boi in case the exemption is narrowed again.' },
      { label: "We're a foreign entity registered to do business in the U.S. and unsure of our filing status.", points: 4, riskLevel: 'MODERATE',
        feedback: 'You likely still must file: 30 calendar days from your registration effective notice.' },
      { label: 'Not sure whether we count as domestic or foreign for this purpose.', points: 2, riskLevel: 'MODERATE',
        feedback: '"Domestic" means formed under U.S. state law; "foreign" means formed abroad and merely registered to do business here.' },
    ],
  },
  {
    id: 'contractor-classification',
    category: 'Employment & Labor Law',
    question: 'How do you legally classify and contract with freelancers and 1099 independent contractors?',
    description: 'States like California (AB 5 / Labor Code § 2775), New Jersey, and Massachusetts enforce strict "ABC Tests" to prevent worker misclassification.',
    options: [
      {
        label: 'Written Independent Contractor Agreements executed, and contractors operate independent businesses.',
        points: 10,
        riskLevel: 'LOW',
        feedback: 'Strong posture. Written contracts with clear IP assignment and tax indemnification protect your business.',
      },
      {
        label: 'We pay them via 1099, but do not have formal written agreements.',
        points: 5,
        riskLevel: 'MODERATE',
        feedback: 'High exposure: Without written IP assignments, your business does not own the code, designs, or materials contractors create.',
      },
      {
        label: 'They work set hours exclusively for us, using company tools.',
        points: 0,
        riskLevel: 'CRITICAL',
        feedback: 'Severe Misclassification Risk: Labor departments and the IRS may reclassify them as W-2 employees with back taxes and overtime penalties.',
      },
    ],
  },
  {
    id: 'state-franchise-tax',
    category: 'Corporate Veil Maintenance',
    question: 'Are your LLC / Corporate annual reports and state franchise fees in active good standing?',
    description: 'Failing to pay annual state franchise taxes (e.g., California $800, Delaware $300, New York biennial fee) results in administrative dissolution and forfeits limited liability protection.',
    options: [
      {
        label: 'Yes, all state reports and franchise taxes are current and verified.',
        points: 10,
        riskLevel: 'LOW',
        feedback: 'Your corporate veil is intact, shielding your personal home, bank accounts, and assets from business creditors.',
      },
      {
        label: 'We missed a recent deadline or have a pending notice.',
        points: 3,
        riskLevel: 'MODERATE',
        feedback: 'Cure immediately: Most states charge penalty interest and will suspend your corporate charter after 60-90 days.',
      },
      {
        label: 'We have never filed an annual report since formation.',
        points: 0,
        riskLevel: 'CRITICAL',
        feedback: 'Piercing the Corporate Veil: If your entity is revoked, owners become personally liable for all business debts and lawsuits.',
      },
    ],
  },
  {
    id: 'local-permits',
    category: 'Local City & County Permits',
    question: 'Do you hold a local municipal Business Tax Certificate / License for your principal place of business?',
    description: 'Even home-based and remote e-commerce businesses typically require a municipal business license from their city hall or county clerk.',
    options: [
      {
        label: 'Yes, active city business tax registration and local zoning permits on file.',
        points: 10,
        riskLevel: 'LOW',
        feedback: 'Local compliance satisfied.',
      },
      {
        label: 'We only registered with the state Secretary of State, not local city hall.',
        points: 5,
        riskLevel: 'MODERATE',
        feedback: 'State registration does NOT waive local municipal tax certificates. Most cities cross-reference state records.',
      },
      {
        label: 'No local licenses or permits filed.',
        points: 2,
        riskLevel: 'MODERATE',
        feedback: 'Review our Local Metro Hub to look up your exact city hall licensing requirements.',
      },
    ],
  },
];

export const ChecklistView: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [completed, setCompleted] = useState(false);

  // Dynamic SEO Meta
  useSeoMeta({
    title: 'Small Business Compliance Audit & Statutory Readiness Checklist (2026) | ComplyWiki',
    description: 'Interactive corporate compliance score audit covering state annual reports, worker classification, registered agent rules, and municipal licensing.',
  });

  const currentQ = AUDIT_QUESTIONS[currentIdx];
  const totalQuestions = AUDIT_QUESTIONS.length;

  const handleSelectOption = (qId: string, points: number) => {
    const updated = { ...answers, [qId]: points };
    setAnswers(updated);

    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setCompleted(true);
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#10b981', '#f59e0b', '#3b82f6'],
      });
    }
  };

  const calculateScore = () => {
    const values = Object.values(answers) as number[];
    const totalPointsEarned = values.reduce((sum, p) => sum + p, 0);
    const maxPoints = totalQuestions * 10;
    return Math.round((totalPointsEarned / maxPoints) * 100);
  };

  const score = calculateScore();

  const resetQuiz = () => {
    setAnswers({});
    setCurrentIdx(0);
    setCompleted(false);
  };

  return (
    <div className="space-y-8">
      {/* Schema.org */}
      <SchemaMarkup
        pageType="Checklist"
        title="Free Small Business Legal Compliance Audit & Risk Assessment"
        description="Interactive 5-point statutory checklist assessing website privacy policies, FinCEN BOI reporting, 1099 contractor agreements, and corporate good standing."
        howTo={{
          name: 'How to Perform an Annual Small Business Statutory Compliance Audit',
          description: 'A 5-point audit workflow to identify corporate governance liabilities, worker misclassification, and state disclosure penalties.',
          totalTime: 'PT15M',
          estimatedCost: { currency: 'USD', value: 0 },
          steps: [
            {
              name: 'Verify State Entity Good Standing & Annual Report Filings',
              text: 'Confirm that your LLC or Corporation is in active good standing with your Secretary of State and that franchise taxes/annual reports are current.',
            },
            {
              name: 'Audit Website Privacy Policies & Cookie Consent Banners',
              text: 'Ensure disclosures comply with CPRA, VCDPA, and state consumer privacy frameworks with opt-out mechanisms.',
            },
            {
              name: 'Audit Independent Contractor & 1099 Work Agreements',
              text: 'Ensure written contractor agreements exist with explicit IP Work-Made-For-Hire assignments and IRS 20-factor compliance.',
            },
            {
              name: 'Confirm Corporate Transparency Act (FinCEN BOI) Status',
              text: 'Confirm whether your entity is domestic (exempt from BOI reporting as of August 2026) or a foreign entity registered to do business in the U.S. (still required to file).',
            },
            {
              name: 'Review Municipal Business Licensing & Assumed Names',
              text: 'Verify city tax certificates and county clerk DBA certificates in your physical operating jurisdictions.',
            },
          ],
        }}
        faqs={[
          {
            question: 'How often should a small business conduct a compliance audit?',
            answer: 'Businesses should conduct a compliance audit annually before state franchise tax and annual report filing deadlines, or immediately upon hiring contractors.',
          },
          {
            question: 'What happens if my business fails an annual report filing?',
            answer: 'Failing to file an annual report results in administrative dissolution or forfeiture of good standing, stripping the entity of limited liability protection.',
          },
        ]}
      />

      {/* Top Banner Ad */}
      <AdSenseUnit format="leaderboard" slotId="quiz-top-leaderboard" />

      {/* Header */}
      <div className="space-y-3 border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
          <CheckSquare className="w-3.5 h-3.5" />
          <span>Interactive Statutory Risk Assessment • 100% Free</span>
        </div>
        <h1 className="font-display font-bold text-2xl sm:text-4xl text-slate-100">
          "Is My Business Compliant?" Statutory Audit Quiz
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl">
          Evaluate your corporate liability exposure across federal mandates, state franchise statutes, and website consumer privacy rules in under 2 minutes.
        </p>
      </div>

      {!completed ? (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Section {currentIdx + 1} of {totalQuestions}: <strong className="text-amber-400">{currentQ.category}</strong></span>
              <span>{Math.round(((currentIdx) / totalQuestions) * 100)}% Complete</span>
            </div>
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${((currentIdx) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                Audit Question #{currentIdx + 1}
              </span>
              <h2 className="font-display font-bold text-lg sm:text-2xl text-slate-100 mt-2">
                {currentQ.question}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                {currentQ.description}
              </p>
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQ.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectOption(currentQ.id, opt.points)}
                  className="w-full text-left p-4 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/50 transition-all group flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <span className="text-sm font-semibold text-slate-200 group-hover:text-amber-300 transition-colors">
                      {opt.label}
                    </span>
                    <p className="text-xs text-slate-400">
                      {opt.feedback}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded shrink-0 ${
                      opt.riskLevel === 'LOW'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : opt.riskLevel === 'MODERATE'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-rose-500/20 text-rose-300'
                    }`}
                  >
                    {opt.riskLevel}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-500">
              {currentIdx > 0 ? (
                <button
                  onClick={() => setCurrentIdx(prev => prev - 1)}
                  className="hover:text-slate-300"
                >
                  ← Previous Question
                </button>
              ) : <div />}
              <span>Answer honestly to receive an accurate remediation checklist.</span>
            </div>
          </div>
        </div>
      ) : (
        /* COMPLETED AUDIT REPORT */
        <div className="max-w-3xl mx-auto space-y-8 animate-in zoom-in-95 duration-300">
          {/* Score Header Card */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-amber-500/30 text-center shadow-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Audit Completed</span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-100">
              Your Statutory Compliance Score: <span className={score >= 80 ? 'text-emerald-400' : score >= 50 ? 'text-amber-400' : 'text-rose-400'}>{score}%</span>
            </h2>

            <div className="max-w-md mx-auto">
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`h-full ${score >= 80 ? 'bg-emerald-500' : score >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>

            <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
              {score >= 80
                ? 'Strong compliance posture. Your operations align with major federal and state disclosure standards. Ensure ongoing annual report filings.'
                : score >= 50
                ? 'Moderate exposure detected. Several high-liability vulnerabilities (such as outdated privacy disclosures or unfiled BOI reports) require prompt remediation.'
                : 'Critical regulatory risk. Immediate attention needed for federal corporate filings and statutory contract documents to preserve your corporate veil.'}
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={resetQuiz}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Audit</span>
              </button>
            </div>
          </div>

          {/* IN-CONTENT NATIVE AD */}
          <AdSenseUnit format="in-content" slotId="quiz-remediation-ad" />

          {/* Remediation Action Plan */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-emerald-400" />
              <span>Recommended Compliance Remediation Action Plan</span>
            </h3>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </span>
                <div className="space-y-1">
                  <div className="font-bold text-sm text-slate-200">Generate State-Compliant Website Privacy Policy</div>
                  <p className="text-xs text-slate-400">
                    Use our free generator to include CCPA/CPRA opt-outs, data category disclosures, and statutory contact instructions.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </span>
                <div className="space-y-1">
                  <div className="font-bold text-sm text-slate-200">Confirm Your FinCEN BOI Status</div>
                  <p className="text-xs text-slate-400">
                    U.S.-formed companies no longer need to file. If you're a foreign entity registered to do business in the U.S., confirm your filing deadline at FinCEN.gov/boi.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  3
                </span>
                <div className="space-y-1">
                  <div className="font-bold text-sm text-slate-200">Execute Written Independent Contractor Agreements</div>
                  <p className="text-xs text-slate-400">
                    Ensure all freelancers sign written IP assignments and tax indemnifications to prevent ABC Test employee misclassification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
