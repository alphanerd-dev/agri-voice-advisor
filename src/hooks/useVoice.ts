import { useState, useCallback, useEffect, useRef } from 'react';
import * as Sonner from 'sonner';
import { SupportedLanguage, keywords } from '@/lib/i18n';

export interface VoiceState {
  isRecording: boolean;
  transcript: string;
  error: string | null;
}

const SIMULATED_PHRASES: Record<SupportedLanguage, string[]> = {
  'en-US': [
    "I see small holes in my maize leaves.",
    "What is the current market price for rice in Kano?",
    "How do I use hermetic bags for storage?",
    "Show me the treatment for armyworm."
  ],
  'ha-NG': [
    "Ina ganin kananan ramuka a cikin ganyen masara na.",
    "Menene farashin shinkafa a Kano a yanzu?",
    "Ta yaya zan yi amfani da buhunan hermetic don ajiya?",
    "Nuna min maganin tsutsotsi."
  ],
  'yo-NG': [
    "Mo ri awọn ihò kekere ninu awọn ewe agbado mi.",
    "Kini idiyele ọja lọwọlọwọ fun iresi ni Kano?",
    "Bawo ni MO ṣe lo awọn baagi hermetic fun ibi ipamọ?",
    "Fi itọju fun kọkọrọ han mi."
  ],
  'ig-NG': [
    "M na-ahụ obere oghere na akwụkwọ ọka m.",
    "Gịnị bụ ọnụ ahịa osikapa n'ahịa Kano ugbu a?",
    "Kedu ka m ga-esi eji akpa hermetic maka nchekwa?",
    "Gosi m ọgwụgwọ maka ahụhụ."
  ]
};

export const useVoice = (lang: SupportedLanguage = 'en-US') => {
  const [state, setState] = useState<VoiceState>({
    isRecording: false,
    transcript: '',
    error: null,
  });

  const [recognition, setRecognition] = useState<any>(null);
  const isStartedRef = useRef(false);
  const simTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    let rec: any = null;
    if (SpeechRecognition) {
      rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = true;
      rec.lang = lang;

      rec.onstart = () => {
        isStartedRef.current = true;
        setState(prev => ({ ...prev, isRecording: true, error: null, transcript: '' }));
      };

      rec.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setState(prev => ({ ...prev, transcript }));
      };

      rec.onerror = (event: any) => {
        isStartedRef.current = false;
        setState(prev => ({ ...prev, isRecording: false, error: event.error }));
        if (event.error !== 'aborted' && event.error !== 'no-speech') {
          Sonner.toast.error(`Speech recognition error: ${event.error}`);
        }
      };

      rec.onend = () => {
        isStartedRef.current = false;
        setState(prev => ({ ...prev, isRecording: false }));
      };

      setRecognition(rec);
    }

    return () => {
      if (rec) {
        try {
          rec.stop();
        } catch (e) {}
      }
      if (simTimeoutRef.current) {
        window.clearTimeout(simTimeoutRef.current);
      }
    };
  }, [lang]);

  const startRecording = useCallback(() => {
    if (recognition && !isStartedRef.current) {
      try {
        recognition.start();
        return;
      } catch (e) {
        console.error('Speech recognition start error:', e);
        isStartedRef.current = false;
      }
    }

    // Fallback simulation if recognition is unavailable or fails
    setState(prev => ({ ...prev, isRecording: true, transcript: '' }));
    isStartedRef.current = true;
    
    if (simTimeoutRef.current) window.clearTimeout(simTimeoutRef.current);
    
    simTimeoutRef.current = window.setTimeout(() => {
      const phrases = SIMULATED_PHRASES[lang] || SIMULATED_PHRASES['en-US'];
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      setState(prev => ({ ...prev, isRecording: false, transcript: randomPhrase }));
      isStartedRef.current = false;
    }, 2000);
  }, [recognition, lang]);

  const stopRecording = useCallback(() => {
    if (simTimeoutRef.current) {
      window.clearTimeout(simTimeoutRef.current);
      simTimeoutRef.current = null;
    }
    
    isStartedRef.current = false;
    setState(prev => ({ ...prev, isRecording: false }));

    if (recognition) {
      try {
        recognition.stop();
      } catch (e) {}
    }
  }, [recognition]);

  const parseIntent = useCallback((text: string): 'symptoms' | 'advisory' | 'storage' | 'market' | null => {
    const lower = text.toLowerCase();
    const langKeywords = keywords[lang];

    if (langKeywords.symptoms.some(k => lower.includes(k))) return 'symptoms';
    if (langKeywords.advisory.some(k => lower.includes(k))) return 'advisory';
    if (langKeywords.storage.some(k => lower.includes(k))) return 'storage';
    if (langKeywords.market.some(k => lower.includes(k))) return 'market';

    return null;
  }, [lang]);

  const speak = useCallback((text: string, voiceLang: SupportedLanguage = lang) => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = voiceLang;
      utterance.pitch = 1.0;
      utterance.rate = 0.9;
      
      const voices = synth.getVoices();
      const voice = voices.find(v => v.lang.startsWith(voiceLang.split('-')[0]));
      if (voice) utterance.voice = voice;
      
      synth.speak(utterance);
    }
  }, [lang]);

  return {
    ...state,
    startRecording,
    stopRecording,
    parseIntent,
    speak,
  };
};
