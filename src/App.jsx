import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navigation/Navbar';
import BottomNav from './components/Navigation/BottomNav';
import SelfTrainTab from './components/SelfTrain/SelfTrainTab';
import LiveGymFloor from './components/LiveFloor/LiveGymFloor';
import AiCoachTab from './components/AiCoach/AiCoachTab';
import AnalyticsDashboard from './components/Analytics/AnalyticsDashboard';
import FuelProfileTab from './components/FuelProfile/FuelProfileTab';
import OnboardingModal from './components/Onboarding/OnboardingModal';
import { Bot, Sparkles, X, CheckCircle2, AlertCircle } from 'lucide-react';

function MainApp() {
  const {
    activeTab,
    setActiveTab,
    isOnboardingOpen,
    setIsOnboardingOpen,
    toastMessage,
    activeWorkout
  } = useApp();

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col font-sans selection:bg-apex-emerald selection:text-black">
      {/* Top Athletic Navbar */}
      <Navbar />

      {/* Desktop Horizontal Tab Bar (for tablet/desktop ease) */}
      <div className="hidden md:block bg-[#131A26]/80 border-b border-apex-border px-6 py-2 select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {[
              { id: 'self-train', label: '1. Self-Train (Body-Map & Exercises)' },
              { id: 'ai-coach', label: '2. AI Coach & Split Architect' },
              {
                id: 'live-floor',
                label: '3. Live Gym Floor Companion',
                badge: activeWorkout ? 'Live Active' : null
              },
              { id: 'analytics', label: '4. Analytics, Recovery & 1RM' },
              { id: 'fuel-profile', label: '5. Fuel, Macros & Profile' }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                    isActive
                      ? 'bg-apex-surface text-apex-emerald border border-apex-emerald/50 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-apex-surface/40'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="px-1.5 py-0.2 rounded-full bg-apex-emerald text-black text-[9px] font-extrabold animate-pulse">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="text-xs font-mono text-slate-400">
            Offline-First • <span className="text-apex-emerald">100% Calibrated</span>
          </div>
        </div>
      </div>

      {/* Main Tab Content View */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'self-train' && <SelfTrainTab />}
        {activeTab === 'ai-coach' && <AiCoachTab />}
        {activeTab === 'live-floor' && <LiveGymFloor />}
        {activeTab === 'analytics' && <AnalyticsDashboard />}
        {activeTab === 'fuel-profile' && <FuelProfileTab />}
      </main>

      {/* Floating AI Coach Trigger Pill (Visible when not on AI Coach tab) */}
      {activeTab !== 'ai-coach' && (
        <button
          onClick={() => setActiveTab('ai-coach')}
          className="fixed bottom-20 right-5 z-30 py-2.5 px-4 rounded-2xl bg-gradient-to-r from-apex-emerald to-emerald-400 text-black font-extrabold text-xs shadow-glow-emerald flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
        >
          <Bot className="w-4 h-4 fill-black" />
          <span className="font-mono">Ask GymBuddy AI</span>
        </button>
      )}

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 right-5 z-50 animate-slide-up select-none">
          <div
            className={`px-4 py-3 rounded-2xl shadow-2xl border flex items-center space-x-2.5 text-xs font-mono font-bold ${
              toastMessage.type === 'coral'
                ? 'bg-[#1C1816] text-apex-coral border-apex-coral shadow-glow-coral'
                : 'bg-[#0E1F1A] text-apex-emerald border-apex-emerald shadow-glow-emerald'
            }`}
          >
            {toastMessage.type === 'coral' ? (
              <AlertCircle className="w-4 h-4 shrink-0 text-apex-coral" />
            ) : (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-apex-emerald" />
            )}
            <span>{toastMessage.message}</span>
          </div>
        </div>
      )}

      {/* Onboarding & Calibration Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
      />

      {/* Mobile Bottom Dock Navigation */}
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
