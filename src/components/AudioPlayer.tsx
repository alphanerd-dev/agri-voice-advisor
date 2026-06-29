import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { useVoice } from '@/hooks/useVoice';

interface AudioPlayerProps {
  text: string;
  lang?: string;
  className?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ text, lang, className }) => {
  const { language, t } = useLanguage();
  const { speak } = useVoice(language);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const handlePlay = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      speak(text, (lang as any) || language);
      setIsPlaying(true);
      
      // Auto-reset when speech finishes
      const checkEnd = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
          setIsPlaying(false);
          clearInterval(checkEnd);
        }
      }, 500);
    }
  };

  const handleMute = () => {
    if (isMuted) {
      setIsMuted(false);
    } else {
      window.speechSynthesis.cancel();
      setIsMuted(true);
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className={`flex items-center gap-3 p-4 rounded-2xl bg-white border-2 border-primary/10 shadow-sm ${className}`}>
      <Button
        size="icon"
        variant={isPlaying ? "default" : "outline"}
        onClick={handlePlay}
        className={`h-12 w-12 rounded-xl shrink-0 ${isPlaying ? 'bg-primary' : 'text-primary'}`}
        title={isPlaying ? t.common.pause : t.common.play}
      >
        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
      </Button>

      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
          {isPlaying ? t.common.listening : 'Audio Advisory'}
        </div>
        <div className="flex items-center gap-1 h-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div 
              key={i} 
              className={`w-1 rounded-full transition-all duration-300 ${
                isPlaying ? 'bg-primary animate-pulse' : 'bg-primary/20'
              }`}
              style={{ 
                height: isPlaying ? `${Math.random() * 100}%` : '4px',
                animationDelay: `${i * 0.1}s` 
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          size="icon"
          variant="ghost"
          onClick={handlePlay}
          className="h-10 w-10 rounded-lg text-muted-foreground hover:text-primary"
          title={t.common.tryAgain}
        >
          <RotateCcw className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={handleMute}
          className="h-10 w-10 rounded-lg text-muted-foreground hover:text-primary"
          title={isMuted ? t.common.unmute : t.common.mute}
        >
          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  );
};
