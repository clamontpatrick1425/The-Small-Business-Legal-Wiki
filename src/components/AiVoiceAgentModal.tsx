import React, { useState, useEffect, useRef } from 'react';
import { Phone, PhoneOff, Mic, Volume2, VolumeX, ShieldCheck, UserCheck, AlertCircle, CheckCircle, Clock, X } from 'lucide-react';

interface AiVoiceAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CallLogEntry {
  speaker: 'AI Concierge' | 'Caller' | 'System';
  text: string;
  time: string;
}

export const AiVoiceAgentModal: React.FC<AiVoiceAgentModalProps> = ({ isOpen, onClose }) => {
  const [callStatus, setCallStatus] = useState<'idle' | 'ringing' | 'connected' | 'ended'>('idle');
  const [muted, setMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [duration, setDuration] = useState(0);
  const [activeIntent, setActiveIntent] = useState<string | null>(null);
  const [logs, setLogs] = useState<CallLogEntry[]>([]);
  const timerRef = useRef<any>(null);

  // Text to speech helper
  const speakText = (text: string) => {
    if (muted) return;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.replace(/[*_#]/g, ''));
      utterance.rate = 1.0;
      utterance.pitch = 1.05;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const startCall = () => {
    setCallStatus('ringing');
    setLogs([
      { speaker: 'System', text: 'Dialing The Small Business Legal Wiki Compliance Hotline (800) 555-WIKI...', time: '00:00' },
    ]);

    setTimeout(() => {
      setCallStatus('connected');
      setDuration(0);
      const greeting = 'Thank you for calling The Small Business Legal Wiki Compliance Hotline. Please note that this call may be monitored or recorded for quality assurance under state and federal law. I am Lexi, an automated compliance concierge. Are you inquiring about State LLC filings, FinCEN BOI reporting, local city permits, or would you like to speak to a representative?';
      setLogs(prev => [
        ...prev,
        { speaker: 'System', text: 'Call connected • Two-party recording disclosure acknowledged', time: '00:02' },
        { speaker: 'AI Concierge', text: greeting, time: '00:02' },
      ]);
      speakText(greeting);
    }, 1800);
  };

  const endCall = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setCallStatus('ended');
    clearInterval(timerRef.current);
    setLogs(prev => [
      ...prev,
      { speaker: 'System', text: 'Call completed. Full call transcript and intent classification saved to CRM pipeline.', time: formatDuration(duration) },
    ]);
  };

  useEffect(() => {
    if (callStatus === 'connected') {
      timerRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [callStatus]);

  const formatDuration = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const triggerIntent = (intentName: string, callerText: string, aiResponse: string) => {
    setActiveIntent(intentName);
    const timeStr = formatDuration(duration);

    setLogs(prev => [
      ...prev,
      { speaker: 'Caller', text: callerText, time: timeStr },
      { speaker: 'AI Concierge', text: aiResponse, time: timeStr },
    ]);

    speakText(aiResponse);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-2xl w-full p-6 shadow-2xl flex flex-col max-h-[90vh] relative">
        {/* Close button */}
        <button
          onClick={() => {
            endCall();
            onClose();
          }}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-100 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-base">Inbound AI Voice Agent Simulator</h3>
            <p className="text-xs text-slate-400">Section 9 Master Prompt: 24/7 Phone Concierge & Statutory Call Flow</p>
          </div>
        </div>

        {/* Phone display area */}
        <div className="my-4 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="text-[11px] font-mono uppercase tracking-widest text-slate-400 mb-1">
            {callStatus === 'idle' && 'Ready to place simulated phone call'}
            {callStatus === 'ringing' && 'Connecting to (800) 555-WIKI...'}
            {callStatus === 'connected' && `Call in Progress • ${formatDuration(duration)}`}
            {callStatus === 'ended' && 'Call Terminated'}
          </div>

          <div className="text-xl font-bold font-mono text-slate-100 my-1">
            1-800-555-WIKI (9454)
          </div>

          {callStatus === 'connected' && (
            <div className="flex items-center gap-2 mt-2">
              <span className={`w-3 h-3 rounded-full ${isSpeaking ? 'bg-amber-400 animate-ping' : 'bg-emerald-500'}`} />
              <span className="text-xs text-amber-300 font-mono">
                {isSpeaking ? 'AI Concierge Speaking (Audio Stream Active)' : 'Listening for Caller Response...'}
              </span>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-3 mt-4">
            {callStatus === 'idle' || callStatus === 'ended' ? (
              <button
                onClick={startCall}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg transition-all active:scale-95"
              >
                <Phone className="w-4 h-4" />
                <span>Simulate Inbound Call</span>
              </button>
            ) : (
              <button
                onClick={endCall}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg transition-all active:scale-95"
              >
                <PhoneOff className="w-4 h-4" />
                <span>End Call</span>
              </button>
            )}

            <button
              onClick={() => {
                if (!muted) window.speechSynthesis?.cancel();
                setMuted(!muted);
              }}
              className={`p-2.5 rounded-xl border transition-colors ${
                muted ? 'bg-rose-500/20 border-rose-500 text-rose-300' : 'bg-slate-800 border-slate-700 text-slate-300'
              }`}
              title={muted ? 'Unmute Audio Speech' : 'Mute Speech Voice'}
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Interactive Simulated Caller Intents (Click to simulate speaking) */}
        {callStatus === 'connected' && (
          <div className="space-y-2 mb-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400/90 flex items-center gap-1.5">
              <Mic className="w-3.5 h-3.5" />
              <span>Simulate Caller Response (Test Core Intents):</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() =>
                  triggerIntent(
                    'state_llc',
                    '"I need to check LLC requirements for California."',
                    'Under California statutory code, domestic LLCs must pay the mandatory eight hundred dollar annual franchise tax to the California Franchise Tax Board, plus file a biennial Statement of Information with the Secretary of State within ninety days of initial filing. Would you like me to SMS you the official state filing checklist?'
                  )
                }
                className="text-left p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-750 border border-slate-700 hover:border-amber-500/40 text-xs text-slate-200 transition-all"
              >
                <div className="font-semibold text-amber-300">1. State LLC Filing Rules</div>
                <div className="text-[11px] text-slate-400 truncate">"Check California LLC fees & annual requirements"</div>
              </button>

              <button
                onClick={() =>
                  triggerIntent(
                    'boi_reporting',
                    '"What is the deadline for filing FinCEN BOI?"',
                    'Under the federal Corporate Transparency Act, reporting companies formed before 2024 had until January 1st, 2025 to file. Newly formed entities created in 2024 have ninety calendar days, while those registered in 2025 and beyond have thirty calendar days. Failure to report exposes officers to civil fines up to 591 dollars per day. Would you like our free direct filing link?'
                  )
                }
                className="text-left p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-750 border border-slate-700 hover:border-amber-500/40 text-xs text-slate-200 transition-all"
              >
                <div className="font-semibold text-amber-300">2. FinCEN BOI Deadline</div>
                <div className="text-[11px] text-slate-400 truncate">"What is the federal BOI deadline?"</div>
              </button>

              <button
                onClick={() =>
                  triggerIntent(
                    'city_permits',
                    '"Where is the New York City clerk office for business permits?"',
                    'In New York City, local commercial licenses are administered by the Department of Consumer and Worker Protection located at 42 Broadway in Lower Manhattan. County assumed name filings take place at 60 Centre Street. We have mapped their exact operating hours and transit lines in our Local Hub section.'
                  )
                }
                className="text-left p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-750 border border-slate-700 hover:border-amber-500/40 text-xs text-slate-200 transition-all"
              >
                <div className="font-semibold text-amber-300">3. Local City Permits</div>
                <div className="text-[11px] text-slate-400 truncate">"Find NYC Department of Consumer Protection"</div>
              </button>

              <button
                onClick={() =>
                  triggerIntent(
                    'attorney_transfer',
                    '"Transfer me to a licensed attorney or representative."',
                    'I am transferring your call immediately to our licensed small business advisory desk. Please hold while I connect you to an attorney in your state jurisdiction... Connecting to escalation extension 104.'
                  )
                }
                className="text-left p-2.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-xs text-amber-200 transition-all"
              >
                <div className="font-semibold text-amber-400 flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>4. Transfer to Representative (Press 0)</span>
                </div>
                <div className="text-[11px] text-amber-300/80 truncate">Instant human escalation handoff</div>
              </button>
            </div>
          </div>
        )}

        {/* Real-Time Transcript Log */}
        <div className="flex-1 overflow-y-auto bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 text-xs font-mono max-h-48">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-850 flex items-center justify-between">
            <span>Live Call Transcript & Intent Log</span>
            <span>TCPA Compliant</span>
          </div>

          {logs.map((log, index) => (
            <div key={index} className="leading-relaxed">
              <span className="text-slate-400 text-[10px]">[{log.time}] </span>
              {log.speaker === 'AI Concierge' && <span className="text-amber-400 font-bold">AI Concierge: </span>}
              {log.speaker === 'Caller' && <span className="text-emerald-400 font-bold">Caller: </span>}
              {log.speaker === 'System' && <span className="text-slate-400 italic">System: </span>}
              <span className={log.speaker === 'AI Concierge' ? 'text-slate-200' : log.speaker === 'Caller' ? 'text-emerald-200' : 'text-slate-400'}>
                {log.text}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-[11px]">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Automatic recording disclosure logged
          </span>
          <button
            onClick={() => {
              endCall();
              onClose();
            }}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg"
          >
            Close Hotline
          </button>
        </div>
      </div>
    </div>
  );
};
