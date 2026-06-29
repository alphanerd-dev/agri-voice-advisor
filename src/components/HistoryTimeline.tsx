import React from 'react';
import { History, Calendar, MessageSquare, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export interface HistoryItem {
  id: string;
  timestamp: number;
  input: string;
  response: string;
  metadata?: any;
}

interface HistoryTimelineProps {
  items: HistoryItem[];
  onItemClick?: (item: HistoryItem) => void;
}

export const HistoryTimeline: React.FC<HistoryTimelineProps> = ({ items, onItemClick }) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 px-2">
        <History className="h-4 w-4 text-primary/60" />
        <h3 className="text-sm font-bold text-primary/60 uppercase tracking-widest">
          {t.common.history}
        </h3>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground italic px-2">
          {t.common.noHistory}
        </p>
      ) : (
        <div className="space-y-3">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card 
                className="group border-none shadow-sm hover:shadow-md transition-all cursor-pointer bg-white/50 backdrop-blur-sm overflow-hidden"
                onClick={() => onItemClick?.(item)}
              >
                <div className="flex items-stretch">
                  <div className="w-1 bg-primary/20 group-hover:bg-primary transition-colors" />
                  <div className="p-4 flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span className="text-[10px] font-bold uppercase">
                          {new Date(item.timestamp).toLocaleDateString()} {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-primary/30 group-hover:text-primary transition-colors" />
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <MessageSquare className="h-4 w-4 text-primary/40" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-primary truncate leading-tight mb-1">
                          "{item.input}"
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-1 italic">
                          {item.response}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
