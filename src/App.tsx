import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { useVoice } from '@/hooks/useVoice';
import { VoiceFAB } from '@/components/VoiceFAB';
import { Dashboard } from '@/pages/Dashboard';
import { SymptomChecker } from '@/pages/SymptomChecker';
import { TreatmentAdvisory } from '@/pages/TreatmentAdvisory';
import { StorageGuide } from '@/pages/StorageGuide';
import { MarketMonitor } from '@/pages/MarketMonitor';
import { AnimatePresence, motion } from 'framer-motion';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SupportedLanguage } from '@/lib/i18n';

function AppContent() {
  const { language, setLanguage, t } = useLanguage();
  const { isRecording, transcript, startRecording, stopRecording, parseIntent } = useVoice(language);
  const [lastTranscript, setLastTranscript] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (transcript && !isRecording) {
      setLastTranscript(transcript);
      const intent = parseIntent(transcript);
      if (intent) {
        switch (intent) {
          case 'symptoms':
            navigate('/symptom-checker', { state: { initialTranscript: transcript } });
            break;
          case 'advisory':
            navigate('/treatment-advisory', { state: { initialTranscript: transcript } });
            break;
          case 'storage':
            navigate('/storage-guide', { state: { initialTranscript: transcript } });
            break;
          case 'market':
            navigate('/market-monitor', { state: { initialTranscript: transcript } });
            break;
        }
      }
    }
  }, [transcript, isRecording, parseIntent, navigate]);

  const handleToggleVoice = () => {
    if (isRecording) {
      stopRecording();
    } else {
      setLastTranscript('');
      startRecording();
    }
  };

  const languages: { code: SupportedLanguage; name: string }[] = [
    { code: 'en-US', name: 'English' },
    { code: 'ha-NG', name: 'Hausa' },
    { code: 'yo-NG', name: 'Yoruba' },
    { code: 'ig-NG', name: 'Igbo' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-foreground font-sans selection:bg-primary selection:text-white pb-20">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg cursor-pointer">
              V
            </div>
            <span className="text-xl font-black text-primary tracking-tighter hidden sm:block">VoiceHarvest</span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-xl border-2 border-primary/20 font-bold gap-2">
                <Globe className="h-4 w-4" />
                {languages.find((l) => l.code === language)?.name}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-2xl border-2 border-primary/10">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`font-bold py-3 px-4 ${language === lang.code ? 'bg-primary text-white' : ''}`}
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="container mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/symptom-checker" element={<SymptomChecker />} />
              <Route path="/treatment-advisory" element={<TreatmentAdvisory />} />
              <Route path="/storage-guide" element={<StorageGuide />} />
              <Route path="/market-monitor" element={<MarketMonitor />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <VoiceFAB 
        isRecording={isRecording} 
        onToggle={handleToggleVoice} 
        transcript={transcript} 
      />
      
      <Toaster position="top-center" richColors />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
