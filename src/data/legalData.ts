import { LegalClause, LegalStateInfo, DocumentTemplate, LocalMetroHub, ComplianceQuizQuestion } from '../types';

export const ALL_STATES: LegalStateInfo[] = [
  {
    id: 'california',
    name: 'California',
    code: 'CA',
    filingAgency: 'California Secretary of State',
    annualFee: '$800 Minimum Franchise Tax + $20 Statement of Info (biennial)',
    privacyLaw: 'CCPA / CPRA (California Consumer Privacy Act & Rights Act)',
    privacyStatus: 'Active',
    corporateVeilStrictness: 'High',
    publicationRequirement: false,
    notableStatute: 'Cal. Bus. & Prof. Code § 16600 (Strict prohibition on non-compete covenants)',
    officialGovUrl: 'https://bizfileonline.sos.ca.gov/',
  },
  {
    id: 'new-york',
    name: 'New York',
    code: 'NY',
    filingAgency: 'New York Department of State, Division of Corporations',
    annualFee: '$9 Biennial Statement + $25 - $4,500 Franchise Fee',
    privacyLaw: 'NY SHIELD Act (Data Security & Breach Notification)',
    privacyStatus: 'Active',
    corporateVeilStrictness: 'High',
    publicationRequirement: true,
    notableStatute: 'NY LLC Law § 206 (Mandatory 6-week county newspaper publication requirement)',
    officialGovUrl: 'https://dos.ny.gov/corps',
  },
  {
    id: 'delaware',
    name: 'Delaware',
    code: 'DE',
    filingAgency: 'Delaware Division of Corporations',
    annualFee: '$300 Annual Franchise Tax for LLCs',
    privacyLaw: 'Delaware Personal Data Privacy Act (DPDPA)',
    privacyStatus: 'Active',
    corporateVeilStrictness: 'Moderate',
    publicationRequirement: false,
    notableStatute: '6 Del. C. § 18-1101 (Broadest contractual freedom and Court of Chancery specialization)',
    officialGovUrl: 'https://corp.delaware.gov/',
  },
  {
    id: 'texas',
    name: 'Texas',
    code: 'TX',
    filingAgency: 'Texas Secretary of State & Comptroller of Public Accounts',
    annualFee: '$0 Annual Filing (Franchise Tax Report required if gross > $2.47M)',
    privacyLaw: 'Texas Data Privacy and Security Act (TDPSA)',
    privacyStatus: 'Active',
    corporateVeilStrictness: 'High',
    publicationRequirement: false,
    notableStatute: 'Tex. Bus. Orgs. Code § 101.052 (Governing documents and series LLC statutory framework)',
    officialGovUrl: 'https://www.sos.state.tx.us/corp/',
  },
  {
    id: 'florida',
    name: 'Florida',
    code: 'FL',
    filingAgency: 'Florida Department of State, Division of Corporations (Sunbiz)',
    annualFee: '$138.75 Annual Report Fee (strictly due by May 1 to avoid $400 late penalty)',
    privacyLaw: 'Florida Digital Bill of Rights (FDBR)',
    privacyStatus: 'Active',
    corporateVeilStrictness: 'Moderate',
    publicationRequirement: false,
    notableStatute: 'Fla. Stat. § 605.0105 (Florida Revised LLC Act and operating agreement defaults)',
    officialGovUrl: 'https://dos.fl.gov/sunbiz/',
  },
  {
    id: 'illinois',
    name: 'Illinois',
    code: 'IL',
    filingAgency: 'Illinois Secretary of State, Department of Business Services',
    annualFee: '$75 Annual Report Fee',
    privacyLaw: 'Biometric Information Privacy Act (BIPA) + Consumer Privacy Pending',
    privacyStatus: 'Active',
    corporateVeilStrictness: 'High',
    publicationRequirement: false,
    notableStatute: '740 ILCS 14/ (Strict private right of action for biometric data collection)',
    officialGovUrl: 'https://www.ilsos.gov/departments/business_services/',
  },
  {
    id: 'washington',
    name: 'Washington',
    code: 'WA',
    filingAgency: 'Washington Secretary of State, Corporations & Charities Division',
    annualFee: '$60 Annual Report Fee + State Business & Occupation (B&O) Tax',
    privacyLaw: 'My Health My Data Act (MHMDA - strictest health privacy standard)',
    privacyStatus: 'Active',
    corporateVeilStrictness: 'Moderate',
    publicationRequirement: false,
    notableStatute: 'RCW 19.373 (Private right of action for unauthorized consumer health data capture)',
    officialGovUrl: 'https://www.sos.wa.gov/corporations-charities',
  },
  {
    id: 'virginia',
    name: 'Virginia',
    code: 'VA',
    filingAgency: 'Virginia State Corporation Commission (SCC)',
    annualFee: '$50 Annual Registration Fee',
    privacyLaw: 'Virginia Consumer Data Protection Act (VCDPA)',
    privacyStatus: 'Active',
    corporateVeilStrictness: 'Moderate',
    publicationRequirement: false,
    notableStatute: 'Va. Code Ann. § 59.1-575 (Comprehensive consumer rights & opt-out rules)',
    officialGovUrl: 'https://scc.virginia.gov/',
  },
];

export const LEGAL_CLAUSES: LegalClause[] = [
  {
    id: 'indemnification',
    slug: 'indemnification-clause',
    title: 'Indemnification & Hold Harmless Clause',
    category: 'Liability',
    riskLevel: 'HIGH',
    shortAnswer: 'An indemnification clause obligates one party to pay legal defense costs, settlements, and court damages incurred by the other party if a third-party claim arises from breaches, negligence, or unauthorized misconduct.',
    plainEnglishTranslation: 'If someone sues the other party because of a mistake, copyright breach, or violation committed by your business, you must pay for their attorneys, court costs, and any final judgment.',
    sampleClauseText: 'Each Party ("Indemnifying Party") agrees to defend, indemnify, and hold harmless the other Party, its officers, directors, employees, and agents from and against any third-party claims, damages, liabilities, losses, and reasonable legal fees arising directly out of (a) material breach of this Agreement, (b) gross negligence or intentional misconduct, or (c) infringement of third-party intellectual property rights.',
    commonGotchas: [
      'Uncapped liability: Indemnification provisions are frequently exempted from the general Limitation of Liability cap.',
      'Duty to defend triggers immediately: You may be forced to finance their legal defense before any court verdict or fault determination.',
      'One-way vs. Mutual: Vendor contracts routinely make the customer indemnify them without reciprocal protections.',
    ],
    negotiationTips: 'Always insist on mutuality, link the obligation to "proven breach or gross negligence," and cap indemnification exposure to either 2x contract value or your commercial insurance coverage.',
    officialGovSource: {
      agency: 'Federal Trade Commission (FTC)',
      url: 'https://www.ftc.gov/business-guidance/resources/ftc-policy-statement-unfairness',
      statute: '15 U.S. Code § 45 (Unfair Contract Terms Guidance)',
    },
    faqs: [
      {
        question: 'Does my commercial business insurance cover indemnification claims?',
        answer: 'Standard General Liability (CGL) policies cover bodily injury and property damage, but typically exclude purely contractual liability, IP infringement, and financial losses unless an Errors & Omissions (E&O) or Cyber endorsement is attached.',
      },
      {
        question: 'Can I refuse an indemnification clause in a consulting contract?',
        answer: 'Yes. You can either negotiate it out, replace it with a mutual clause, or insert a monetary ceiling tied to your total fees received.',
      },
    ],
  },
  {
    id: 'limitation-of-liability',
    slug: 'limitation-of-liability-clause',
    title: 'Limitation of Liability & Consequential Damages Waiver',
    category: 'Liability',
    riskLevel: 'CRITICAL',
    shortAnswer: 'A limitation of liability clause places an absolute financial ceiling on recoverable damages in a contract breach, while waiving indirect, incidental, or lost-profit damages to protect a business from bankruptcy.',
    plainEnglishTranslation: 'Even if something goes completely wrong, neither side can sue the other for lost business profits or damages greater than the predetermined cap (usually the fees paid over the last 12 months).',
    sampleClauseText: 'TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS OR DATA LOSS. EACH PARTY\'S AGGREGATE LIABILITY ARISING UNDER THIS AGREEMENT SHALL BE STRICTLY CAPPED AT THE TOTAL SUM OF FEES PAID OR PAYABLE BY CLIENT IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.',
    commonGotchas: [
      'Hidden asymmetric carve-outs: Carving out client IP or payment while leaving vendor uncapped.',
      'Gross negligence exceptions: Most state courts (e.g., NY and CA) invalidate caps if intentional misconduct or gross negligence is proven.',
      'Arbitrary fixed sums: Setting a cap at $100 for a $50,000 enterprise service contract may be deemed unconscionable by a court.',
    ],
    negotiationTips: 'Ensure the disclaimer of consequential damages is 100% mutual and typed in conspicuous uppercase letters as mandated by UCC § 2-316.',
    officialGovSource: {
      agency: 'Uniform Law Commission',
      url: 'https://www.uniformlaws.org/acts/ucc',
      statute: 'Uniform Commercial Code (UCC) § 2-719 (Contractual Modification or Limitation of Remedy)',
    },
    faqs: [
      {
        question: 'Why are limitation of liability clauses always written in ALL CAPS?',
        answer: 'U.S. courts require limitation and warranty disclaimer clauses to be "conspicuous" so that no signer can reasonably claim they were hidden in small print.',
      },
      {
        question: 'Can you completely eliminate liability for data breaches?',
        answer: 'No. State privacy laws (like CCPA § 1798.150) grant consumers statutory statutory damages between $100 and $750 per incident that private contracts cannot contractually waive.',
      },
    ],
  },
  {
    id: 'non-compete-covenant',
    slug: 'non-compete-covenant-clause',
    title: 'Non-Compete & Restrictive Covenants',
    category: 'Restrictive Covenants',
    riskLevel: 'CRITICAL',
    shortAnswer: 'A non-compete clause prohibits a contractor or employee from working for or launching a competing enterprise within a defined geographic territory and duration following termination of the business relationship.',
    plainEnglishTranslation: 'You promise that when this agreement ends, you will not work for rivals or start a similar business in this market for a set period (such as 1 to 2 years).',
    sampleClauseText: 'During the term of this Agreement and for a period of twelve (12) months following termination, Contractor agrees not to directly or indirectly engage in, own, manage, or perform services for any enterprise that directly competes with the specific core offerings of the Company within the defined Geographic Territory.',
    commonGotchas: [
      'California voidness: California Business and Professions Code § 16600 renders nearly all employee and independent contractor non-competes void and unenforceable.',
      'FTC Non-Compete Rule: The FTC issued a comprehensive rule prohibiting employer non-competes (subject to ongoing federal litigation appeals).',
      'Overbroad territory: Terms stating "anywhere the Company operates or plans to operate" are routinely struck down.',
    ],
    negotiationTips: 'Strike the non-compete entirely and replace it with a strong Non-Disclosure (NDA) and Non-Solicitation of clients clause, which courts enforce much more reliably.',
    officialGovSource: {
      agency: 'Federal Trade Commission (FTC)',
      url: 'https://www.ftc.gov/legal-library/browse/rules/noncompete-rule',
      statute: '16 CFR Part 910 (Non-Compete Clause Final Rule)',
    },
    faqs: [
      {
        question: 'Are non-compete agreements legal for 1099 independent contractors?',
        answer: 'Courts view non-competes on 1099 contractors with extreme skepticism because true independent contractors are legally expected to market their skills to the general public.',
      },
      {
        question: 'What is the blue-pencil doctrine?',
        answer: 'Some states allow judges to edit ("blue-pencil") unreasonable non-compete terms to make them enforceable, while other states strike the entire clause down if any part is overbroad.',
      },
    ],
  },
  {
    id: 'governing-law-jurisdiction',
    slug: 'governing-law-and-jurisdiction-clause',
    title: 'Governing Law & Forum Selection Clause',
    category: 'Dispute Resolution',
    riskLevel: 'MODERATE',
    shortAnswer: 'The governing law clause specifies which state substantive law interprets the agreement, while the forum selection clause mandates the physical court venue where any lawsuit must be filed.',
    plainEnglishTranslation: 'If we end up in court, we must use the laws of State X, and both parties must travel to City Y to present the case.',
    sampleClauseText: 'This Agreement and any dispute arising hereunder shall be governed by and construed in accordance with the internal laws of the State of Delaware, without giving effect to any choice of law rules. The parties irrevocably submit to the exclusive personal jurisdiction of the state and federal courts located in New Castle County, Delaware.',
    commonGotchas: [
      'Cross-country litigation costs: If you are based in Florida and sign a California forum clause, you may have to hire out-of-state counsel and fly across the country for depositions.',
      'State-mandated forum requirements: Several states (like California Labor Code § 925) prohibit forcing in-state workers to litigate under out-of-state law.',
    ],
    negotiationTips: 'Propose a neutral location or the defendant\'s home jurisdiction ("the state where the party being sued maintains its principal place of business").',
    officialGovSource: {
      agency: 'U.S. Supreme Court Precedent',
      url: 'https://www.law.cornell.edu/supremecourt/text/571/117',
      statute: 'Atlantic Marine Construction Co. v. U.S. District Court, 571 U.S. 49 (2013)',
    },
    faqs: [
      {
        question: 'Why do so many national contracts choose Delaware or New York?',
        answer: 'Both states possess sophisticated, highly predictable commercial court systems (Delaware Court of Chancery and NY Commercial Division) with established corporate case law.',
      },
    ],
  },
  {
    id: 'severability-clause',
    slug: 'severability-and-survival-clause',
    title: 'Severability & Survival Clause',
    category: 'Operations',
    riskLevel: 'LOW',
    shortAnswer: 'A severability clause guarantees that if a court invalidates any single provision of a contract, the remainder of the agreement continues in full force, while survival clauses preserve confidentiality and liability caps post-termination.',
    plainEnglishTranslation: 'If a judge throws out one bad paragraph, the rest of the agreement still stands. Also, confidentiality and liability rules keep running even after we stop working together.',
    sampleClauseText: 'If any provision of this Agreement is held by a court of competent jurisdiction to be invalid, illegal, or unenforceable, such provision shall be modified to the minimum extent necessary to make it enforceable, and the remaining provisions shall remain in full force and effect.',
    commonGotchas: [
      'Missing survival list: Forgetting to specify that confidentiality, IP assignment, and liability limits survive contract termination.',
    ],
    negotiationTips: 'Standard boilerplate that benefits both parties; ensure it explicitly authorizes the judge to reform the clause rather than discarding the whole agreement.',
    officialGovSource: {
      agency: 'Legal Information Institute',
      url: 'https://www.law.cornell.edu/wex/severability_clause',
      statute: 'Restatement (Second) of Contracts § 184',
    },
    faqs: [
      {
        question: 'What happens if a contract has no severability clause?',
        answer: 'If an essential term is declared illegal without a severability clause, a court could determine the entire contract is void ab initio (invalid from the start).',
      },
    ],
  },
  {
    id: 'force-majeure',
    slug: 'force-majeure-clause',
    title: 'Force Majeure & Act of God Clause',
    category: 'Operations',
    riskLevel: 'MODERATE',
    shortAnswer: 'A force majeure clause excuses or suspends a party\'s performance duties when unforeseeable, uncontrollable catastrophic events (pandemics, natural disasters, war, grid collapse) make contractual execution impossible.',
    plainEnglishTranslation: 'Neither of us is held in breach of contract if an unexpected disaster (like an earthquake, war, or government shutdown) makes it impossible to deliver services.',
    sampleClauseText: 'Neither party shall be liable for any delay or failure to perform its obligations (other than payment duties) caused by events beyond its reasonable control, including Acts of God, war, terrorism, civil unrest, labor strikes, pandemics, utility grid failures, or government embargoes.',
    commonGotchas: [
      'Payment obligations rarely excused: Force majeure usually explicitly carves out the obligation to pay money owed.',
      'Pandemics and supply chains: Post-2020 courts require specific mention of epidemics or government quarantine orders.',
    ],
    negotiationTips: 'Always require prompt written notice (within 5 business days) and a termination right if the force majeure continues beyond 30 to 60 consecutive days.',
    officialGovSource: {
      agency: 'International Chamber of Commerce (ICC)',
      url: 'https://iccwbo.org/resources-for-business/force-majeure-and-hardship/',
      statute: 'ICC Force Majeure Clause Standards (2020 Update)',
    },
    faqs: [
      {
        question: 'Does inflation or economic recession count as force majeure?',
        answer: 'No. U.S. courts consistently rule that financial hardship or market price increases do not qualify as force majeure events.',
      },
    ],
  },
  {
    id: 'ip-assignment',
    slug: 'intellectual-property-assignment-clause',
    title: 'Intellectual Property & Work-Made-For-Hire Assignment',
    category: 'Intellectual Property',
    riskLevel: 'CRITICAL',
    shortAnswer: 'An IP assignment clause explicitly transfers all copyrights, patents, trademarks, and code created during the engagement from the contractor or developer to the hiring business, ensuring undisputed asset ownership.',
    plainEnglishTranslation: 'Everything created, coded, or designed during this project belongs 100% to the company that paid for it, not the individual who built it.',
    sampleClauseText: 'Contractor agrees that all deliverables, code, designs, and work product created in connection with this Agreement shall be deemed a "work made for hire" under the U.S. Copyright Act. To the extent any work does not qualify, Contractor hereby irrevocably assigns to Company all right, title, and interest in and to such intellectual property worldwide.',
    commonGotchas: [
      'Independent contractors are not statutory employees: Under 17 U.S.C. § 101, work created by independent contractors is NOT automatically work-made-for-hire unless expressly assigned in writing.',
      'Pre-existing IP retention: Failing to carve out the contractor\'s pre-existing open-source code or proprietary toolkits.',
    ],
    negotiationTips: 'Ensure assignment is conditioned on receipt of full payment ("effective upon receipt of all agreed-upon compensation").',
    officialGovSource: {
      agency: 'U.S. Copyright Office',
      url: 'https://www.copyright.gov/circs/circ09.pdf',
      statute: 'Circular 9: Works Made Under Hire (17 U.S.C. § 101 & 201)',
    },
    faqs: [
      {
        question: 'If I pay a freelance developer to build an app without a contract, who owns the code?',
        answer: 'The developer legally retains the copyright! The paying business only receives an implied, non-exclusive license unless a signed written assignment transfers ownership.',
      },
    ],
  },
];

export const DOCUMENT_TEMPLATES: DocumentTemplate[] = [
  {
    id: 'mutual-nda',
    slug: 'mutual-non-disclosure-agreement',
    title: 'Mutual Non-Disclosure Agreement (NDA)',
    category: 'Confidentiality',
    description: 'Bilateral commercial confidentiality agreement protecting proprietary trade secrets, business plans, financials, and source code between two parties.',
    estimatedMinutes: 3,
    popularInStates: ['DE', 'CA', 'NY', 'TX'],
    fields: [
      { id: 'disclosingParty', label: 'Company / Party A Name', type: 'text', placeholder: 'Acme Technologies LLC' },
      { id: 'receivingParty', label: 'Partner / Party B Name', type: 'text', placeholder: 'Strategic Partner Inc.' },
      { id: 'state', label: 'Governing Law State', type: 'select', options: ['Delaware', 'California', 'New York', 'Texas', 'Florida'] },
      { id: 'purpose', label: 'Evaluation Purpose', type: 'text', placeholder: 'Evaluating potential joint venture or software partnership' },
      { id: 'termYears', label: 'Confidentiality Term (Years)', type: 'select', options: ['1 Year', '2 Years', '3 Years', '5 Years', 'In Perpetuity (Trade Secrets)'] },
      { id: 'includeNonSolicit', label: 'Include Non-Solicitation of Employees', type: 'checkbox', defaultValue: true },
    ],
    generateText: (d) => `MUTUAL NON-DISCLOSURE AND CONFIDENTIALITY AGREEMENT

This Mutual Non-Disclosure Agreement ("Agreement") is entered into as of ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}, by and between:

PARTY A: ${d.disclosingParty || '[PARTY A LEGAL NAME]'}
PARTY B: ${d.receivingParty || '[PARTY B LEGAL NAME]'}

1. PURPOSE
The parties wish to explore a business opportunity concerning: ${d.purpose || 'Evaluating commercial cooperation'} (the "Purpose"), in connection with which either party may disclose confidential business, technical, or financial information.

2. DEFINITION OF CONFIDENTIAL INFORMATION
"Confidential Information" means all non-public information disclosed by either party to the other, whether orally, in writing, or electronically, that is designated as confidential or reasonably should be understood to be confidential given the nature of the information.

3. OBLIGATIONS & STANDARD OF CARE
Each party agrees to:
(a) Protect the other party's Confidential Information with at least the same degree of care it uses for its own confidential information, but in no event less than reasonable care;
(b) Use the Confidential Information solely for the stated Purpose;
(c) Restrict disclosure solely to employees, legal counsel, and financial advisors with a legitimate need-to-know who are bound by confidentiality terms at least as restrictive as this Agreement.

4. EXCLUSIONS
Confidential Information does not include information that: (a) is or becomes publicly known through no breach; (b) was already known prior to disclosure; (c) is independently developed without reference to the disclosed information; or (d) is required to be disclosed by valid subpoena or government regulation.

5. DURATION OF OBLIGATIONS
The confidentiality covenants set forth herein shall remain in effect for a period of ${d.termYears || '2 Years'} from the date of disclosure; provided, however, that trade secrets recognized under applicable law shall be protected in perpetuity.

${d.includeNonSolicit ? `6. NON-SOLICITATION OF PERSONNEL
During the term of this Agreement and for twelve (12) months thereafter, neither party shall directly solicit or hire any key employee or contractor of the other party introduced during discussions without prior written consent.` : ''}

7. GOVERNING LAW & JURISDICTION
This Agreement shall be governed by and construed in accordance with the laws of the State of ${d.state || 'Delaware'}, without regard to conflict of laws principles.

IN WITNESS WHEREOF, the authorized representatives of the parties have executed this Agreement.

_____________________________                _____________________________
By: ${d.disclosingParty || 'Party A'}                 By: ${d.receivingParty || 'Party B'}
Date: ________________________               Date: ________________________`,
  },
  {
    id: 'independent-contractor',
    slug: 'independent-contractor-agreement',
    title: 'Independent Contractor Agreement (1099)',
    category: 'Employment & Services',
    description: 'Comprehensive 1099 service contract with robust IP assignment, IRS classification protections, and payment terms.',
    estimatedMinutes: 4,
    popularInStates: ['CA', 'TX', 'NY', 'FL'],
    fields: [
      { id: 'clientName', label: 'Client / Company Name', type: 'text', placeholder: 'Apex Commerce LLC' },
      { id: 'contractorName', label: 'Contractor Legal Name', type: 'text', placeholder: 'Jane Doe / CodeCraft Consulting' },
      { id: 'scopeOfWork', label: 'Scope of Services / Deliverables', type: 'textarea', placeholder: 'Frontend web application architecture, API integration, and performance audit.' },
      { id: 'compensation', label: 'Payment Terms & Rate', type: 'text', placeholder: '$125/hour, invoiced bi-weekly with Net 15 terms' },
      { id: 'state', label: 'Governing State', type: 'select', options: ['California', 'Texas', 'New York', 'Delaware', 'Florida'] },
      { id: 'assignIP', label: 'Full Intellectual Property Assignment to Client', type: 'checkbox', defaultValue: true },
    ],
    generateText: (d) => `INDEPENDENT CONTRACTOR SERVICES AGREEMENT

This Agreement is made effective as of ${new Date().toLocaleDateString('en-US')}, between ${d.clientName || '[CLIENT NAME]'} ("Client") and ${d.contractorName || '[CONTRACTOR NAME]'} ("Contractor").

1. SERVICES AND DELIVERABLES
Contractor agrees to provide the following professional services:
${d.scopeOfWork || 'Professional consulting and implementation services as agreed upon.'}

2. COMPENSATION & INVOICING
Client shall compensate Contractor according to the following schedule:
${d.compensation || '$100 per hour or agreed milestone rates.'}
Payments shall be issued within fifteen (15) days of verified invoice receipt.

3. INDEPENDENT CONTRACTOR STATUS
The parties acknowledge that Contractor is an independent contractor and not an employee, agent, or partner of Client. Contractor is solely responsible for all federal, state, and local self-employment taxes, insurance, and benefits. Contractor retains sole discretion over the manner, location, and hours in which the services are performed.

${d.assignIP ? `4. OWNERSHIP OF WORK PRODUCT & IP ASSIGNMENT
Contractor acknowledges and agrees that all deliverables, designs, code, and inventions developed under this Agreement shall be deemed "work made for hire" for Client. Contractor irrevocably transfers and assigns to Client all worldwide copyright, patent, and intellectual property rights in and to the Deliverables upon receipt of payment.` : ''}

5. CONFIDENTIALITY
Contractor shall maintain the confidentiality of all proprietary business, customer, and source code data acquired during the engagement.

6. TERMINATION
Either party may terminate this Agreement upon fourteen (14) days prior written notice. Upon termination, Contractor shall deliver all completed work and Client shall pay for approved services performed through the date of notice.

7. GOVERNING LAW
This Agreement shall be construed under the laws of the State of ${d.state || 'California'}.

CLIENT: ${d.clientName || 'Client'}          CONTRACTOR: ${d.contractorName || 'Contractor'}
Signature: ______________________            Signature: ______________________`,
  },
  {
    id: 'privacy-policy',
    slug: 'website-privacy-policy-template',
    title: 'Website Privacy Policy & Cookie Disclosure',
    category: 'Privacy & Compliance',
    description: 'Comprehensive state & federal privacy disclosure compliant with CCPA/CPRA, CalOPPA, GDPR cookies, and FTC online standards.',
    estimatedMinutes: 3,
    popularInStates: ['CA', 'VA', 'CO', 'NY'],
    fields: [
      { id: 'companyName', label: 'Company / Website Name', type: 'text', placeholder: 'ComplyWiki Media LLC' },
      { id: 'websiteUrl', label: 'Website URL', type: 'text', placeholder: 'https://complywiki.com' },
      { id: 'contactEmail', label: 'Privacy Officer Email', type: 'text', placeholder: 'privacy@complywiki.com' },
      { id: 'usesAdSense', label: 'Displays Google AdSense / Third-Party Ads', type: 'checkbox', defaultValue: true },
      { id: 'usesAnalytics', label: 'Uses Google Analytics / Telemetry', type: 'checkbox', defaultValue: true },
      { id: 'state', label: 'Primary Jurisdiction', type: 'select', options: ['California', 'Delaware', 'New York', 'Texas', 'Washington'] },
    ],
    generateText: (d) => `WEBSITE PRIVACY POLICY
Last Updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

This Privacy Policy describes how ${d.companyName || 'Company'} ("we", "us", or "our") collects, uses, and discloses information obtained through ${d.websiteUrl || 'our website'} (the "Site").

1. INFORMATION WE COLLECT
We collect personal information that you provide voluntarily (such as name, email address, and inquiry details), as well as automated telemetry:
- Device Data: Browser type, operating system, IP address, and referring URLs.
- Usage Data: Pages visited, time spent on pages, and interaction timestamps.

2. HOW WE USE YOUR INFORMATION
We use collected data to operate the Site, deliver requested compliance tools, prevent fraud, and analyze traffic patterns.

${d.usesAdSense ? `3. GOOGLE ADSENSE & THIRD-PARTY ADVERTISING
We display third-party advertisements served by Google AdSense and its certified advertising partners. Google uses cookies (including the DoubleClick DART cookie) to serve ads based on prior visits to our Site and other sites across the Internet. You may opt out of personalized advertising by visiting Google's Ads Settings (www.google.com/settings/ads) or www.aboutads.info.` : ''}

${d.usesAnalytics ? `4. COOKIES & TRACKING TECHNOLOGIES
We utilize essential session cookies and performance analytics cookies (e.g., Google Analytics). You can manage or disable cookie preferences through your web browser configuration.` : ''}

5. CALIFORNIA PRIVACY RIGHTS (CCPA / CPRA)
Under the California Consumer Privacy Act, California residents have the right to:
(a) Request disclosure of categories and specific pieces of personal information collected;
(b) Request deletion of personal information;
(c) Request correction of inaccurate personal information;
(d) Direct us NOT to sell or share your personal information.
We do not sell personal information of consumers for monetary consideration. To exercise rights, contact: ${d.contactEmail || 'privacy@example.com'}.

6. CONTACT US
For privacy inquiries or compliance requests:
${d.companyName || 'Company'}
Email: ${d.contactEmail || 'privacy@example.com'}
Jurisdiction: State of ${d.state || 'California'}.`,
  },
  {
    id: 'single-member-llc',
    slug: 'single-member-llc-operating-agreement',
    title: 'Single-Member LLC Operating Agreement',
    category: 'Corporate Governance',
    description: 'Protects the personal limited liability veil for solo founders and establishes clear succession and banking authorization.',
    estimatedMinutes: 4,
    popularInStates: ['DE', 'WY', 'NV', 'FL', 'TX'],
    fields: [
      { id: 'llcName', label: 'LLC Legal Name', type: 'text', placeholder: 'Sovereign Capital LLC' },
      { id: 'memberName', label: 'Sole Member Name', type: 'text', placeholder: 'Alexandre Sterling' },
      { id: 'state', label: 'State of Formation', type: 'select', options: ['Delaware', 'Wyoming', 'Texas', 'Florida', 'Nevada', 'New York'] },
      { id: 'formationDate', label: 'Formation Date', type: 'text', placeholder: 'January 15, 2024' },
      { id: 'capitalContribution', label: 'Initial Capital Contribution', type: 'text', placeholder: '$1,000' },
    ],
    generateText: (d) => `OPERATING AGREEMENT OF ${d.llcName ? d.llcName.toUpperCase() : '[LLC NAME]'}
A SINGLE-MEMBER LIMITED LIABILITY COMPANY

This Operating Agreement is entered into by ${d.memberName || '[MEMBER NAME]'} ("Sole Member") as of ${d.formationDate || 'formation date'}.

1. FORMATION & NAME
The Company was formed as a Limited Liability Company under the laws of the State of ${d.state || 'Delaware'} by filing Articles of Organization / Certificate of Formation with the Secretary of State.

2. PURPOSE & POWERS
The purpose of the Company is to engage in any lawful business permitted by state law, including all powers necessary or convenient to conduct operations.

3. SOLE MEMBER OWNERSHIP & CAPITAL
Sole Member owns one hundred percent (100%) of the membership interest. The initial capital contribution is recorded as ${d.capitalContribution || '$1,000'}. Sole Member has no obligation to make additional capital contributions unless elected.

4. LIMITED LIABILITY PROTECTION (CORPORATE VEIL)
Neither the Sole Member nor any authorized manager shall be personally liable for any debt, obligation, or liability of the Company solely by reason of being a member. The failure of the Company to observe corporate formalities shall not be grounds for piercing the corporate veil.

5. MANAGEMENT & BANKING
The Company is Member-Managed. The Sole Member has full authority to open bank accounts, sign contracts, and incur liabilities on behalf of the Company.

6. TAX TREATMENT
Unless the Member elects corporate tax status with the IRS (Form 8832 or 2553), the Company shall be treated as a "disregarded entity" for federal income tax purposes.

7. GOVERNING LAW
This Agreement is governed by the Limited Liability Company Act of the State of ${d.state || 'Delaware'}.

SOLE MEMBER:
_____________________________
${d.memberName || 'Sole Member'}
Date: ________________________`,
  },
];

export const LOCAL_METRO_HUBS: LocalMetroHub[] = [
  {
    id: 'nyc',
    city: 'New York City',
    state: 'New York',
    stateCode: 'NY',
    metroArea: 'New York–Newark–Jersey City',
    population: '8.3M+',
    regulationsLevel: 'Very High',
    localCityHall: {
      name: 'New York City Hall / DCWP',
      address: '42 Broadway, New York, NY 10004',
      phone: '(212) 639-9675 (NYC 311)',
      department: 'NYC Department of Consumer and Worker Protection (DCWP)',
      lat: 40.7128,
      lng: -74.0060,
    },
    countyClerk: {
      name: 'New York County Clerk (Manhattan)',
      address: '60 Centre Street, Room 141B, New York, NY 10007',
      phone: '(646) 386-5955',
      purpose: 'DBA (Assumed Name) filings and LLC publication certifications',
    },
    sbdcOffice: {
      name: 'Baruch College Small Business Development Center',
      address: '55 Lexington Ave, Suite 2-140, New York, NY 10010',
      service: 'Free one-on-one business advisory & capital access consulting',
    },
    requiredPermits: [
      { name: 'NYC General Vendor / Business License', issuingAgency: 'DCWP', frequency: 'Biennial', avgCost: '$200 - $500', description: 'Mandatory for retail, consumer services, and storefront businesses.' },
      { name: 'Certificate of Authority for Sales Tax', issuingAgency: 'NYS Dept of Taxation', frequency: 'One-Time', avgCost: 'Free ($0)', description: 'Must be obtained at least 20 days before starting sales.' },
      { name: 'NYC Commercial Rent Tax (CRT)', issuingAgency: 'NYC Dept of Finance', frequency: 'Annual', avgCost: 'Varies', description: 'Applies to commercial leases in Manhattan south of 96th Street exceeding $250k/yr.' },
      { name: 'Section 206 Publication Certificate', issuingAgency: 'NYS DOS', frequency: 'One-time', avgCost: '$50 State Fee + $800-$1,500 Newspaper Ads', description: 'Publish LLC notices in 2 county newspapers for 6 consecutive weeks.' },
    ],
    localTaxChecklist: [
      'New York City General Corporation Tax (GCT) or Unincorporated Business Tax (UBT)',
      'Quarterly NYS and Local Sales and Use Tax Filing (ST-100)',
      'Worker\'s Compensation and Disability Benefits Insurance (NY WCL § 50)',
      'NYC Paid Safe and Sick Leave Law Notice posting',
    ],
    officialPortalUrl: 'https://nyc.gov/business',
  },
  {
    id: 'los-angeles',
    city: 'Los Angeles',
    state: 'California',
    stateCode: 'CA',
    metroArea: 'Los Angeles–Long Beach–Anaheim',
    population: '3.8M+',
    regulationsLevel: 'Very High',
    localCityHall: {
      name: 'Los Angeles City Hall & Office of Finance',
      address: '200 N Spring St, Room 101, Los Angeles, CA 90012',
      phone: '(844) 663-4411',
      department: 'City of Los Angeles Office of Finance',
      lat: 34.0537,
      lng: -118.2427,
    },
    countyClerk: {
      name: 'LA County Registrar-Recorder / County Clerk',
      address: '12400 Imperial Hwy, Norwalk, CA 90650',
      phone: '(800) 201-8999',
      purpose: 'Fictitious Business Name (FBN) statements and certified records',
    },
    sbdcOffice: {
      name: 'Los Angeles Regional SBDC Network',
      address: '4900 E Conant St, Long Beach, CA 90808',
      service: 'Free guidance on local zoning, financing, and labor compliance',
    },
    requiredPermits: [
      { name: 'Business Tax Registration Certificate (BTRC)', issuingAgency: 'City Office of Finance', frequency: 'Annual', avgCost: '$0 - $5,000+ (gross receipts based)', description: 'Mandatory for any commercial activity performed in LA city limits.' },
      { name: 'California Seller\'s Permit', issuingAgency: 'CDTFA', frequency: 'One-Time', avgCost: 'Free ($0)', description: 'Required for selling tangible personal property.' },
      { name: 'LA County Health Operating Permit', issuingAgency: 'LA County Public Health', frequency: 'Annual', avgCost: '$450 - $1,800', description: 'Required for all food service, beauty, and wellness facilities.' },
      { name: 'Fire Department Operating Permit', issuingAgency: 'LAFD Bureau of Fire Prevention', frequency: 'Annual', avgCost: '$250+', description: 'Required for assembly buildings and hazardous materials.' },
    ],
    localTaxChecklist: [
      'City of LA Business Tax renewal by the end of February each year',
      'California $800 Annual Franchise Tax (FTB Form 3522)',
      'California Employment Development Department (EDD) payroll registration',
      'Cal/OSHA Written Injury & Illness Prevention Program (IIPP)',
    ],
    officialPortalUrl: 'https://finance.lacity.gov/',
  },
  {
    id: 'chicago',
    city: 'Chicago',
    state: 'Illinois',
    stateCode: 'IL',
    metroArea: 'Chicago–Naperville–Elgin',
    population: '2.6M+',
    regulationsLevel: 'High',
    localCityHall: {
      name: 'Chicago City Hall / BACP',
      address: '121 N LaSalle St, Room 800, Chicago, IL 60602',
      phone: '(312) 744-6249',
      department: 'Department of Business Affairs and Consumer Protection (BACP)',
      lat: 41.8837,
      lng: -87.6324,
    },
    countyClerk: {
      name: 'Cook County Clerk\'s Office',
      address: '118 N Clark St, Chicago, IL 60602',
      phone: '(312) 603-7790',
      purpose: 'Assumed business names and county real property registries',
    },
    sbdcOffice: {
      name: 'Illinois Small Business Development Center at Chicagoland Chamber',
      address: '410 N Michigan Ave, Suite 900, Chicago, IL 60611',
      service: 'Government contracting assistance and trade counseling',
    },
    requiredPermits: [
      { name: 'Chicago General Business License', issuingAgency: 'BACP', frequency: 'Biennial', avgCost: '$250', description: 'Standard city operational license for non-specialized commercial trade.' },
      { name: 'Zoning & Certificate of Occupancy', issuingAgency: 'Chicago Dept of Buildings', frequency: 'One-Time', avgCost: '$150 - $600', description: 'Verification that commercial activity is permitted under municipal zoning code.' },
    ],
    localTaxChecklist: [
      'Chicago Personal Property Lease Transaction Tax (PPLTT - 9% on cloud software/SaaS)',
      'Illinois Department of Revenue Sales Tax (ROT - Retailers\' Occupation Tax)',
      'Cook County Commercial Real Estate Property Tax assessment checks',
    ],
    officialPortalUrl: 'https://www.chicago.gov/city/en/depts/bacp.html',
  },
  {
    id: 'austin',
    city: 'Austin',
    state: 'Texas',
    stateCode: 'TX',
    metroArea: 'Austin–Round Rock–Georgetown',
    population: '980k+',
    regulationsLevel: 'Moderate',
    localCityHall: {
      name: 'Austin City Hall & Small Business Division',
      address: '301 W 2nd St, Austin, TX 78701',
      phone: '(512) 974-7800',
      department: 'City of Austin Economic Development Department',
      lat: 30.2649,
      lng: -97.7473,
    },
    countyClerk: {
      name: 'Travis County Clerk',
      address: '5501 Airport Blvd, Austin, TX 78751',
      phone: '(512) 854-9188',
      purpose: 'DBA assumed name filings and local records',
    },
    sbdcOffice: {
      name: 'Texas State University SBDC Round Rock/Austin',
      address: '1555 University Blvd, Round Rock, TX 78665',
      service: 'Capital acquisition and enterprise scaling counseling',
    },
    requiredPermits: [
      { name: 'Texas Sales and Use Tax Permit', issuingAgency: 'Texas Comptroller', frequency: 'One-Time', avgCost: '$0', description: 'Required for selling taxable goods or taxable services in Texas.' },
      { name: 'Austin Commercial Building Certificate of Occupancy', issuingAgency: 'Austin Development Services', frequency: 'One-Time', avgCost: '$300', description: 'Building safety and zoning verification.' },
    ],
    localTaxChecklist: [
      'Texas Franchise Tax No-Tax-Due Information Report (Form 05-163)',
      'Travis County Central Appraisal District (TCAD) Business Personal Property Rendition',
      'No personal state income tax; strict state sales tax remittance',
    ],
    officialPortalUrl: 'https://www.austintexas.gov/department/small-business-division',
  },
  {
    id: 'miami',
    city: 'Miami',
    state: 'Florida',
    stateCode: 'FL',
    metroArea: 'Miami–Fort Lauderdale–Pompano Beach',
    population: '450k+ (6.1M Metro)',
    regulationsLevel: 'Moderate',
    localCityHall: {
      name: 'City of Miami Department of Finance',
      address: '444 SW 2nd Ave, 6th Floor, Miami, FL 33130',
      phone: '(305) 416-1199',
      department: 'City of Miami Business Tax Receipt (BTR) Office',
      lat: 25.7743,
      lng: -80.1937,
    },
    countyClerk: {
      name: 'Miami-Dade County Clerk of the Courts',
      address: '73 W Flagler St, Miami, FL 33130',
      phone: '(305) 275-1155',
      purpose: 'Local county business tax receipt and fictitious name notices',
    },
    sbdcOffice: {
      name: 'Florida SBDC at FIU',
      address: '1101 Brickell Ave, Suite S-1000, Miami, FL 33131',
      service: 'Bilingual business growth strategy and import/export compliance',
    },
    requiredPermits: [
      { name: 'City of Miami Local Business Tax Receipt', issuingAgency: 'City of Miami Finance', frequency: 'Annual', avgCost: '$50 - $450', description: 'Local operational license required for all businesses in municipal Miami.' },
      { name: 'Miami-Dade County Business Tax Receipt', issuingAgency: 'Miami-Dade County', frequency: 'Annual', avgCost: '$30 - $300', description: 'Countywide licensing requirement in addition to city license.' },
      { name: 'Certificate of Use (CU)', issuingAgency: 'Miami Zoning Department', frequency: 'Annual', avgCost: '$150 - $250', description: 'Confirms authorized land use and parking regulations.' },
    ],
    localTaxChecklist: [
      'Florida Annual Report filed with Sunbiz by May 1',
      'Florida Reemployment Tax (RT-6) registration with Dept of Revenue',
      'Florida DR-15 Sales and Use Tax electronic monthly reporting',
    ],
    officialPortalUrl: 'https://www.miamigov.com/Services/Business-Taxes-Permits',
  },
];

export const COMPLIANCE_QUIZ_QUESTIONS: ComplianceQuizQuestion[] = [
  {
    id: 1,
    category: 'Website Privacy & Cookies',
    question: 'Does your website or web application collect consumer emails, names, IP addresses, or use analytics tracking (e.g., Google Analytics / Meta Pixel)?',
    explanation: 'Under CCPA/CPRA, CalOPPA, and GDPR, any collection of personally identifiable information (PII) or telemetry cookies legally mandates an up-to-date, comprehensive Privacy Policy with opt-out mechanisms.',
    options: [
      { text: 'Yes, we collect emails and run analytics cookies', points: 3, risk: 'warning', recommendation: 'Install an FTC/CCPA-compliant privacy policy and a cookie banner with opt-out preferences.' },
      { text: 'Yes, and we have an attorney-drafted privacy policy updated within 12 months', points: 0, risk: 'good', recommendation: 'Ensure your "Do Not Sell or Share My Personal Info" link is conspicuously placed in your footer.' },
      { text: 'No, we are a purely static brochure site with zero tracking or forms', points: 0, risk: 'good', recommendation: 'Periodic review advised if you add contact forms or newsletter widgets.' },
    ],
  },
  {
    id: 2,
    category: 'Corporate Governance',
    question: 'Do you maintain a written Operating Agreement or Corporate Bylaws with signed capital contribution records?',
    explanation: 'Operating without a written governing agreement leaves your personal assets vulnerable in litigation and defaults your business disputes to blunt state statutory statutes.',
    options: [
      { text: 'No, we just registered the LLC with the Secretary of State', points: 4, risk: 'danger', recommendation: 'Generate and execute a Single or Multi-Member LLC Operating Agreement immediately to solidify your corporate liability veil.' },
      { text: 'Yes, signed by all members and updated whenever equity or addresses change', points: 0, risk: 'good', recommendation: 'Keep signed originals in your official company corporate book alongside annual minutes.' },
      { text: 'We have an informal verbal understanding among founders', points: 5, risk: 'danger', recommendation: 'Verbal agreements are virtually impossible to defend in court and risk total loss of personal asset protections.' },
    ],
  },
  {
    id: 3,
    category: 'Federal FinCEN Compliance',
    question: 'Has your company filed its Beneficial Ownership Information (BOI) report with the Financial Crimes Enforcement Network (FinCEN)?',
    explanation: 'Under the Corporate Transparency Act (CTA), domestic reporting companies must report 25%+ owners and key controllers to FinCEN or face civil penalties of up to $591/day and criminal fines.',
    options: [
      { text: 'No, we were unaware of this federal requirement', points: 5, risk: 'danger', recommendation: 'File your BOI report immediately at FinCEN.gov/boi (there is no government filing fee).' },
      { text: 'Yes, filed and verified with our FinCEN ID confirmations on record', points: 0, risk: 'good', recommendation: 'Remember you must file an updated report within 30 days if any owner moves or renews their driver\'s license/passport.' },
      { text: 'We qualify for one of the 23 statutory exemptions (e.g., bank, 501c3, large operating company >20 employees & >$5M revenue)', points: 0, risk: 'good', recommendation: 'Document your specific exemption rationale in your corporate records.' },
    ],
  },
  {
    id: 4,
    category: 'Contracts & Worker Classification',
    question: 'Do you engage independent contractors (1099) without written IP assignment agreements?',
    explanation: 'Under U.S. copyright law (17 U.S.C. § 101), independent contractor creations do NOT automatically belong to the hiring company unless a written contract includes an express "work made for hire" and copyright assignment clause.',
    options: [
      { text: 'Yes, freelancers write code or create assets without written contracts', points: 4, risk: 'danger', recommendation: 'Execute an Independent Contractor Agreement with full IP assignment immediately before releasing deliverables.' },
      { text: 'Every contractor signs an IP assignment and confidentiality agreement before starting work', points: 0, risk: 'good', recommendation: 'Maintain signed contractor agreements in your digital legal vault.' },
      { text: 'We have W-2 employees only', points: 0, risk: 'good', recommendation: 'Ensure an Employee Proprietary Information and Inventions Agreement (PIIA) was signed at onboarding.' },
    ],
  },
  {
    id: 5,
    category: 'Commercial Terms & Liability',
    question: 'Do your client contracts or Terms of Service include a conspicuous Limitation of Liability clause capping damages?',
    explanation: 'Without a limitation of liability clause, a single client claim for indirect or consequential damages (such as lost profits or business interruption) could bankrupt an otherwise healthy business.',
    options: [
      { text: 'No, we use simple invoices without liability limitations', points: 4, risk: 'danger', recommendation: 'Implement standardized Terms of Service containing a mutual 12-month fee cap and consequential damages waiver.' },
      { text: 'Yes, contracts include mutual caps and a consequential damages waiver in ALL CAPS', points: 0, risk: 'good', recommendation: 'Audit your carve-outs to ensure indemnities do not accidentally bypass your liability cap.' },
    ],
  },
];

export const RECENT_LEGAL_ALERTS = [
  {
    id: 1,
    agency: 'FinCEN / Dept of Treasury',
    date: 'Updated September 2026',
    title: 'Beneficial Ownership Information (BOI) Strict Enforcement Window',
    summary: 'FinCEN confirms nationwide compliance reviews for small reporting companies under the Corporate Transparency Act. Businesses formed in 2025+ must report within 30 calendar days.',
    impact: 'High',
    sourceUrl: 'https://www.fincen.gov/boi',
  },
  {
    id: 2,
    agency: 'Federal Trade Commission (FTC)',
    date: 'Updated August 2026',
    title: 'Enforcement Policy on Negative Option Billing & Dark Patterns',
    summary: 'FTC finalizes Click-to-Cancel rule requiring subscription services to make cancellation as simple and accessible as enrollment, barring multi-step cancellation hurdles.',
    impact: 'High',
    sourceUrl: 'https://www.ftc.gov/',
  },
  {
    id: 3,
    agency: 'California Privacy Protection Agency (CPPA)',
    date: 'Updated July 2026',
    title: 'Automated Decision-Making & AI Profiling Regulations Active',
    summary: 'Businesses serving California residents using algorithmic scoring or automated profiling must provide opt-out rights and explicit privacy disclosures.',
    impact: 'Moderate',
    sourceUrl: 'https://cppa.ca.gov/',
  },
];
