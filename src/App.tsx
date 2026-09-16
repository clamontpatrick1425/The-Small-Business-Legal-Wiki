import React, { useState } from 'react';
import { ViewType, LegalStateInfo } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { DocumentGeneratorView } from './views/DocumentGeneratorView';
import { ClauseLibraryView } from './views/ClauseLibraryView';
import { ChecklistView } from './views/ChecklistView';
import { TranslatorView } from './views/TranslatorView';
import { LocalHubView } from './views/LocalHubView';
import { ArchitectureView } from './views/ArchitectureView';
import { AiConcierge } from './components/AiConcierge';
import { AiVoiceAgentModal } from './components/AiVoiceAgentModal';
import { LegalPoliciesModal, LegalModalTab } from './components/LegalPoliciesModal';
import { AdSenseUnit } from './components/AdSenseUnit';
import { ReadingProgressBar } from './components/ReadingProgressBar';
import { useSeoMeta } from './hooks/useSeoMeta';
import { ALL_STATES } from './data/legalData';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedClauseId, setSelectedClauseId] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<LegalStateInfo>(ALL_STATES[0]);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [isVoiceAgentOpen, setIsVoiceAgentOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<LegalModalTab>('privacy');

  // Dynamically update document title, description, OG, and Twitter tags based on view
  useSeoMeta({}, currentView);

  const handleOpenLegalModal = (tab: LegalModalTab) => {
    setLegalModalTab(tab);
    setIsLegalModalOpen(true);
  };

  const handleNavigate = (view: ViewType) => {
    setCurrentView(view);
    if (view !== 'clause-detail') {
      setSelectedClauseId(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectClause = (clauseId: string) => {
    setSelectedClauseId(clauseId);
    setCurrentView('clauses');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectState = (state: LegalStateInfo) => {
    setSelectedState(state);
    setCurrentView('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Scroll-based Reading Progress Bar for dwell time and SEO engagement */}
      <ReadingProgressBar estimatedReadingMinutes={6} showBadge={true} />

      {/* Navigation Header */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenConcierge={() => setIsConciergeOpen(true)}
        onOpenVoiceAgent={() => setIsVoiceAgentOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        {currentView === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onSelectClause={handleSelectClause}
            onSelectState={handleSelectState}
          />
        )}

        {currentView === 'generator' && (
          <DocumentGeneratorView />
        )}

        {currentView === 'clauses' && (
          <ClauseLibraryView initialClauseId={selectedClauseId} />
        )}

        {currentView === 'checklists' && (
          <ChecklistView />
        )}

        {currentView === 'translator' && (
          <TranslatorView />
        )}

        {currentView === 'local-hubs' && (
          <LocalHubView />
        )}

        {currentView === 'architecture' && (
          <ArchitectureView />
        )}
      </main>

      {/* Mobile Sticky Bottom Anchor Ad */}
      <AdSenseUnit format="anchor" slotId="mobile-anchor-footer" />

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenLegalModal={handleOpenLegalModal}
      />

      {/* Floating AI Concierge Chatbot */}
      <AiConcierge
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
      />

      {/* Inbound AI Voice Hotline Modal */}
      <AiVoiceAgentModal
        isOpen={isVoiceAgentOpen}
        onClose={() => setIsVoiceAgentOpen(false)}
      />

      {/* Comprehensive Legal Policies & Terms Modal */}
      <LegalPoliciesModal
        isOpen={isLegalModalOpen}
        initialTab={legalModalTab}
        onClose={() => setIsLegalModalOpen(false)}
      />
    </div>
  );
}
