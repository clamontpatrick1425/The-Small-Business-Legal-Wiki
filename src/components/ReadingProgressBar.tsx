import React, { useEffect, useState } from 'react';
import { Clock, CheckCircle2, ChevronUp } from 'lucide-react';

interface ReadingProgressBarProps {
  /** Optional target element ID or defaults to window viewport scroll */
  targetId?: string;
  /** Estimated total reading time in minutes (default 5 min) */
  estimatedReadingMinutes?: number;
  /** Show subtle floating dwell time / reading indicator badge */
  showBadge?: boolean;
}

export const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({
  estimatedReadingMinutes = 6,
  showBadge = true,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const docElement = document.documentElement;
          const body = document.body;
          const scrollTop = window.scrollY || docElement.scrollTop || body.scrollTop || 0;
          const scrollHeight = Math.max(
            body.scrollHeight,
            docElement.scrollHeight,
            body.offsetHeight,
            docElement.offsetHeight,
            body.clientHeight,
            docElement.clientHeight
          );
          const clientHeight = window.innerHeight || docElement.clientHeight;
          const totalScrollable = scrollHeight - clientHeight;

          if (totalScrollable <= 0) {
            setScrollProgress(0);
            setIsVisible(false);
            setIsCompleted(false);
          } else {
            const currentPercentage = Math.min(100, Math.max(0, (scrollTop / totalScrollable) * 100));
            setScrollProgress(currentPercentage);
            setIsVisible(scrollTop > 40);
            setIsCompleted(currentPercentage >= 98);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const minutesRemaining = Math.max(
    1,
    Math.ceil(estimatedReadingMinutes * (1 - scrollProgress / 100))
  );

  return (
    <>
      {/* Top of Viewport Progress Bar */}
      <div
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
        className={`fixed top-0 left-0 right-0 z-50 h-1 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 pointer-events-none ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.6)] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Reading Metric Badge & Dwell Time Helper */}
      {showBadge && isVisible && (
        <aside
          aria-label="Reading indicator"
          className="fixed bottom-14 right-4 sm:right-6 z-40 flex items-center gap-2 bg-slate-900/95 border border-slate-700/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-2xl text-[11px] font-mono text-slate-300 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <div className="flex items-center gap-1.5">
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300 font-semibold">Article Finished</span>
              </>
            ) : (
              <>
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-slate-400">
                  ~{minutesRemaining}m read remaining
                </span>
              </>
            )}
            <span className="text-slate-600">•</span>
            <span className="font-bold text-amber-400">
              {Math.round(scrollProgress)}%
            </span>
          </div>

          {/* Quick Back-to-Top Button when scrolled deep */}
          {scrollProgress > 30 && (
            <button
              onClick={scrollToTop}
              title="Return to top of article"
              className="ml-1 p-1 hover:bg-slate-800 rounded-full text-slate-400 hover:text-amber-400 transition-colors pointer-events-auto"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          )}
        </aside>
      )}
    </>
  );
};
