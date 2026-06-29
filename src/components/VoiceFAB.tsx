import React from 'react';
import { Mic, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

interface VoiceFABProps {
  isRecording: boolean;
  onToggle: () => void;
  transcript: string;
}

export const VoiceFAB: React.FC<VoiceFABProps> = ({ isRecording, onToggle, transcript }) => {
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-8 left-0 right-0 z-50 flex flex-col items-center pointer-events-none">
      <AnimatePresence>
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-6 w-full max-w-md px-4 pointer-events-auto"
          >
            <div className="bg-primary text-white p-6 rounded-3xl shadow-2xl border-4 border-white/20 backdrop-blur-xl relative overflow-hidden">
              <div className="flex items-center gap-4 mb-2">
                <div className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest text-white/70">
                  {t.common.listening}
                </span>
              </div>
              
              <div className="min-h-12 flex items-center">
                <p className="text-xl font-bold leading-tight italic">
                  "{transcript || '...'}"
                </p>
              </div>

              <div className="absolute bottom-0 left-0 h-1 bg-white/30 w-full overflow-hidden">
                <motion.div 
                  className="h-full bg-white"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 10, ease: "linear" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pointer-events-auto">
        <Button
          onClick={onToggle}
          className={`h-20 w-20 rounded-full shadow-2xl border-4 border-white transition-all duration-300 relative group ${
            isRecording 
              ? 'bg-destructive hover:bg-destructive/90' 
              : 'bg-primary hover:bg-primary/90 scale-110'
          }`}
        >
          {isRecording ? (
            <X className="h-8 w-8 text-white" />
          ) : (
            <Mic className="h-10 w-10 text-white" />
          )}

          {!isRecording && (
            <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-primary text-[10px] font-black py-1 px-3 rounded-full shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">
              {t.dashboard.micPrompt}
            </span>
          )}

          {isRecording && (
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-white"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          )}
        </Button>
      </div>
    </div>
  );
};
