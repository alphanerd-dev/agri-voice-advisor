import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Bug, History, ChevronRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { toast } from 'sonner';
import { AudioPlayer } from '@/components/AudioPlayer';
import { HistoryTimeline, HistoryItem } from '@/components/HistoryTimeline';
import { motion, AnimatePresence } from 'framer-motion';

export const SymptomChecker: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, t } = useLanguage();
  const [result, setResult] = useState<any>(null);
  const [history, setHistory] = useLocalStorage<HistoryItem[]>('vh_symptom_history', []);

  const simulateAnalysis = (input: string) => {
    // Basic rule-based simulation for the demo
    const lowerInput = input.toLowerCase();
    
    let diagnosis = {
      id: 'unknown',
      title: 'General Crop Stress',
      confidence: 65,
      cause: 'Environmental factors or early stage pest.',
      action: 'Monitor daily and clear weeds.'
    };

    if (lowerInput.includes('worm') || lowerInput.includes('hole') || lowerInput.includes('tsutsotsi') || lowerInput.includes('ramuka') || lowerInput.includes('kòkòrò') || lowerInput.includes('ihò') || lowerInput.includes('ahụhụ') || lowerInput.includes('oghere')) {
      diagnosis = {
        id: 'armyworm',
        title: 'Fall Armyworm',
        confidence: 94,
        cause: 'Spodoptera frugiperda infestation.',
        action: 'Apply Neem oil solution or Bacillus thuringiensis (Bt).'
      };
    } else if (lowerInput.includes('yellow') || lowerInput.includes('leaf') || lowerInput.includes('rawaya') || lowerInput.includes('ganye') || lowerInput.includes('pupa') || lowerInput.includes('ewe') || lowerInput.includes('edo edo') || lowerInput.includes('akwụkwọ')) {
      diagnosis = {
        id: 'nitrogen',
        title: 'Nitrogen Deficiency',
        confidence: 88,
        cause: 'Lack of soil nutrients.',
        action: 'Apply NPK 15-15-15 fertilizer and organic manure.'
      };
    }

    setResult(diagnosis);

    // Save to history
    const newHistory: HistoryItem = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      input,
      response: diagnosis.title
    };
    setHistory(prev => [newHistory, ...prev].slice(0, 10));
  };

  useEffect(() => {
    const state = location.state as { initialTranscript?: string };
    if (state?.initialTranscript) {
      simulateAnalysis(state.initialTranscript);
    }
  }, [location.state]);

  return (
    <div className="px-4 pt-6 pb-32">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')} 
          className="mb-6 hover:bg-primary/5 text-primary font-bold rounded-xl"
        >
          <ArrowLeft className="mr-2 h-5 w-5" /> {t.common.back}
        </Button>

        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-primary text-white shadow-lg">
            <Bug className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-primary tracking-tight">{t.symptoms.title}</h2>
            <p className="text-muted-foreground font-medium">{t.symptoms.subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <div className="flex justify-between items-center px-2">
              <h3 className="text-[10px] font-black text-primary/40 uppercase tracking-widest">{t.common.history}</h3>
              <Button 
                variant="link" 
                size="sm" 
                onClick={() => { setHistory([]); toast.success(t.common.clear + '!'); }}
                className="text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-500"
              >
                {t.common.clear}
              </Button>
            </div>
            <HistoryTimeline 
              items={history} 
              onItemClick={(item) => simulateAnalysis(item.input)} 
            />
          </div>

          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card className="border-none shadow-2xl rounded-3xl overflow-hidden bg-white">
                    <CardContent className="p-12 text-center space-y-6">
                      <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Bug className="h-10 w-10 text-primary/30" />
                      </div>
                      <h3 className="text-2xl font-black text-primary tracking-tight">{t.symptoms.placeholder}</h3>
                      <p className="text-muted-foreground font-bold italic">{t.symptoms.example}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', damping: 20 }}
                >
                  <Card className="border-none shadow-2xl rounded-3xl overflow-hidden bg-white">
                    <CardHeader className="bg-primary text-white p-8">
                      <div className="flex items-center justify-between mb-2">
                        <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white">
                          {t.symptoms.resultTitle}
                        </span>
                        <span className="text-white/80 text-xs font-black uppercase tracking-widest">
                          {t.symptoms.confidence}: {result.confidence}%
                        </span>
                      </div>
                      <CardTitle className="text-5xl font-black tracking-tighter">{result.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                      <AudioPlayer 
                        text={`Diagnosis: ${result.title}. Cause: ${result.cause}. Action: ${result.action}`}
                        lang={language}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-slate-50 rounded-3xl border-2 border-slate-100">
                          <h4 className="text-[10px] font-black text-primary/40 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <ShieldAlert className="h-3 w-3" />
                            {t.symptoms.rootCause}
                          </h4>
                          <p className="text-lg font-bold text-primary leading-tight">{result.cause}</p>
                        </div>
                        <div className="p-6 bg-green-50 rounded-3xl border-2 border-green-100">
                          <h4 className="text-[10px] font-black text-green-900/40 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <CheckCircle2 className="h-3 w-3" />
                            {t.symptoms.action}
                          </h4>
                          <p className="text-lg font-bold text-green-900 leading-tight">{result.action}</p>
                        </div>
                      </div>

                      <Button 
                        onClick={() => navigate('/treatment', { state: { initialTranscript: result.title } })}
                        className="w-full h-20 bg-primary hover:bg-primary/90 text-white rounded-[32px] text-xl font-black shadow-xl group"
                      >
                        {t.dashboard.openModule}
                        <ChevronRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
