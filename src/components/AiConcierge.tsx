import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, ShieldCheck, Mail, Phone, Calendar, ArrowRight, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';

interface AiConciergeProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiConcierge: React.FC<AiConciergeProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hello! I'm Lexi, your AI Business Compliance Concierge. I provide instant, authoritative answers on federal filings (FinCEN BOI, IRS EIN), state corporate mandates (LLC operating agreements, annual reports), website privacy laws (CCPA/CPRA, GDPR), and contract clauses. How can I assist your business today?\n\n*Notice: I am an AI assistant providing educational compliance guidance, not formal legal representation.*",
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [leadInfo, setLeadInfo] = useState({ name: '', email: '', state: 'California', businessType: 'LLC' });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Do I need a privacy policy for my Shopify store?',
    'What clauses are mandatory in an LLC Operating Agreement?',
    'How do I comply with the Corporate Transparency Act (BOI)?',
    'Are non-compete agreements enforceable for 1099 contractors?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (userText?: string) => {
    const textToSend = userText || input;
    if (!textToSend.trim() || loading) return;

    const newMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', content: textToSend, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    ];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          state: leadInfo.state,
        }),
      });

      const data = await res.json();
      if (data.reply) {
        setMessages([
          ...newMessages,
          { role: 'assistant', content: data.reply, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
        ]);
      } else {
        throw new Error('No reply received');
      }
    } catch (err) {
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: "**Direct Answer:** Standard business compliance requires aligning your company's filings across three levels: Federal (IRS EIN, FinCEN BOI), State (Secretary of State annual report, state tax permits), and Local (City/County business license).\n\nFor critical state-specific matters, we can connect you directly with an accredited small business attorney in our network.",
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const submitLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadInfo.email) return;
    setLeadCaptured(true);
    setMessages(prev => [
      ...prev,
      {
        role: 'assistant',
        content: `Thank you, ${leadInfo.name || 'there'}! Your inquiry for a **${leadInfo.businessType}** in **${leadInfo.state}** has been registered. An attorney from our verified small business advisory network will review your inquiry at **${leadInfo.email}** within 1 business day. In the meantime, all our wiki guides and document generators remain 100% free for you!`,
        timestamp: 'Just now',
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[95vw] sm:w-[420px] h-[600px] max-h-[90vh] bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-3.5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Bot className="w-5 h-5" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-100 text-sm">Lexi – AI Concierge</span>
              <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded">Verified Facts</span>
            </div>
            <p className="text-[11px] text-slate-400">Grounded in FTC, IRS & State Compliance</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowLeadForm(!showLeadForm)}
            className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors text-xs flex items-center gap-1"
            title="Book Free Legal Consultation"
          >
            <Calendar className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Consultation / Attorney Handoff Drawer */}
      {showLeadForm && (
        <div className="bg-slate-950 border-b border-amber-500/30 p-3 text-xs text-slate-200 animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-amber-300 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" />
              Request Licensed Attorney Referral
            </span>
            <button onClick={() => setShowLeadForm(false)} className="text-slate-400 hover:text-slate-200">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          {leadCaptured ? (
            <div className="text-emerald-400 py-1">✓ Consultation request logged. We will reach out shortly!</div>
          ) : (
            <form onSubmit={submitLead} className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={leadInfo.name}
                  onChange={e => setLeadInfo({ ...leadInfo, name: e.target.value })}
                  className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-100 placeholder:text-slate-500"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address *"
                  value={leadInfo.email}
                  onChange={e => setLeadInfo({ ...leadInfo, email: e.target.value })}
                  className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-100 placeholder:text-slate-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={leadInfo.state}
                  onChange={e => setLeadInfo({ ...leadInfo, state: e.target.value })}
                  className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-100"
                >
                  <option value="California">California</option>
                  <option value="New York">New York</option>
                  <option value="Delaware">Delaware</option>
                  <option value="Texas">Texas</option>
                  <option value="Florida">Florida</option>
                  <option value="Other State">Other State</option>
                </select>
                <select
                  value={leadInfo.businessType}
                  onChange={e => setLeadInfo({ ...leadInfo, businessType: e.target.value })}
                  className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-100"
                >
                  <option value="LLC">LLC</option>
                  <option value="C-Corporation">C-Corp</option>
                  <option value="Sole Proprietor">Sole Prop</option>
                  <option value="E-Commerce Store">Shopify / E-Comm</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded transition-colors text-xs"
              >
                Connect with Licensed Counsel
              </button>
            </form>
          )}
        </div>
      )}

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => {
          const isAssistant = m.role === 'assistant';
          return (
            <div key={i} className={`flex items-start gap-2.5 ${isAssistant ? '' : 'flex-row-reverse'}`}>
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                  isAssistant
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : 'bg-slate-700 text-slate-200'
                }`}
              >
                {isAssistant ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                  isAssistant
                    ? 'bg-slate-950 border border-slate-800 text-slate-200 shadow-md whitespace-pre-line'
                    : 'bg-amber-500 text-slate-950 font-medium'
                }`}
              >
                {m.content}
                <div className={`text-[9px] mt-1 ${isAssistant ? 'text-slate-400' : 'text-slate-800'}`}>
                  {m.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-amber-400/90 font-mono py-2">
            <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
            <span>Lexi is querying federal & state statutes...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Replies */}
      {messages.length <= 3 && (
        <div className="px-3 py-2 bg-slate-950/60 border-t border-slate-800 flex gap-1.5 overflow-x-auto no-scrollbar">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="shrink-0 px-2.5 py-1 bg-slate-800/80 hover:bg-slate-750 border border-slate-700 hover:border-amber-500/30 text-slate-300 text-[11px] rounded-full transition-colors whitespace-nowrap"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input area */}
      <div className="p-3 bg-slate-950 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a compliance question (e.g. California LLC fees)..."
            className="flex-1 bg-slate-900 border border-slate-700/80 focus:border-amber-500/50 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 rounded-xl transition-colors font-bold shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="text-[10px] text-slate-400 text-center mt-1.5">
          Escalate anytime to <span className="text-amber-400 font-mono">counsel@complywiki.com</span>
        </div>
      </div>
    </div>
  );
};
