import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AudioPlayer } from '@/components/AudioPlayer';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { toast } from 'sonner';
import { HistoryTimeline, HistoryItem } from '@/components/HistoryTimeline';

const ADVISORY_DB: Record<string, any[]> = {
  'en-US': [
    {
      id: 'neem',
      title: 'Neem Oil Treatment',
      type: 'Organic',
      desc: 'Safe way to kill armyworm larvae.',
      steps: [
        'Mix 5ml Neem oil with 1L water.',
        'Add one drop of liquid soap.',
        'Spray directly on maize heart.',
        'Apply every 5 days for 3 weeks.'
      ]
    },
    {
      id: 'rotation',
      title: 'Crop Rotation',
      type: 'Prevention',
      desc: 'Breaking the pest cycle naturally.',
      steps: [
        'Do not plant maize in the same spot.',
        'Plant legumes (beans) next season.',
        'Deep plow soil to expose pupae.',
        'Clear weeds near field edges.'
      ]
    }
  ],
  'ha-NG': [
    {
      id: 'neem',
      title: 'Maganin Man Neem',
      type: 'Na Halitta',
      desc: 'Hanya mai aminci don kashe tsutsotsi.',
      steps: [
        'Mix 5ml man Neem da 1L na ruwa.',
        'Sanya digo daya na sabulu.',
        'Fesa kai tsaye a cikin zuciyar masara.',
        'Yi amfani da shi duk bayan kwanaki 5.'
      ]
    },
    {
      id: 'rotation',
      title: 'Canza Amfanin Gona',
      type: 'Rigakafi',
      desc: "Karye zagayowar kwari ta dabi'a.",
      steps: [
        'Kada a shuka masara a wuri guda.',
        'Shuka waken soya a kakar wasa mai zuwa.',
        'Yi noma mai zurfi don bankado kwari.',
        'Share ciyawa kusa da gefen gona.'
      ]
    }
  ],
  'yo-NG': [
    {
      id: 'neem',
      title: 'Itọju Man Neem',
      type: 'Ti Adayeba',
      desc: 'Ọna to ni aabo lati pa awọn kọkọrọ.',
      steps: [
        'Dapo 5ml epo Neem pẹlu 1L omi.',
        'Fi ọṣẹ olomi diẹ sii.',
        'Fú aarin agbado rẹ.',
        'Lo oogun yii lẹẹkan ni ọjọ marun.'
      ]
    },
    {
      id: 'rotation',
      title: 'Yipada Irugbin',
      type: 'Idéna',
      desc: 'Déna awọn kọkọrọ nipasẹ adayeba.',
      steps: [
        'Ma ṣe gbin agbado si oju kan naa.',
        'Gbin ẹwa ni saà ti o n bọ.',
        'Tu ilẹ jinlẹ lati mu awọn kọkọrọ jade.',
        'Nu awọn koriko kuro ni eti oko.'
      ]
    }
  ],
  'ig-NG': [
    {
      id: 'neem',
      title: 'Ọgwụgwọ Mmanụ Neem',
      type: 'Organic',
      desc: 'Ụzọ dị nchebe isi gbuo ahụhụ ọka.',
      steps: [
        'Gwakọta 5ml mmanụ Neem na 1L mmiri.',
        'Tinye otu ntapu ncha mmiri.',
        "Fesa ya ozugbo n'etiti ọka gị.",
        'Jiri ya mee ihe kwa ụbọchị ise.'
      ]
    },
    {
      id: 'rotation',
      title: 'Ntughari Ihe Ubi',
      type: 'Mgbochi',
      desc: "Ikwụsị usoro ahụhụ n'ụzọ nkịtị.",
      steps: [
        "Akụla ọka n'otu ebe ahụ ọzọ.",
        "Kụọ agwa n'oge na-abịa.",
        'Gwu ala nke ọma ka ahụhụ pụta.',
        "Hichaa ahịhịa n'akụkụ ubi gị."
      ]
    }
  ]
};

export const TreatmentAdvisory: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, t } = useLanguage();
  const [history, setHistory] = useLocalStorage<HistoryItem[]>('vh_advisory_history', []);
  
  const currentData = ADVISORY_DB[language];
  const [selected, setSelected] = useState(currentData[0]);

  useEffect(() => {
    const state = location.state as { initialTranscript?: string };
    if (state?.initialTranscript) {
      // Intent mapping logic
      const lower = state.initialTranscript.toLowerCase();
      const targetItem = (lower.includes('rotate') || lower.includes('rotation') || lower.includes('canza') || lower.includes('yipada') || lower.includes('ntughari'))
        ? currentData[1]
        : currentData[0];
      
      setSelected(targetItem);

      // Save to history
      const newHistory: HistoryItem = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
        input: state.initialTranscript,
        response: `${targetItem.title}: ${targetItem.desc}`
      };
      setHistory(prev => [newHistory, ...prev].slice(0, 10));
    }
  }, [location.state, language]);

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
          <div className="p-4 rounded-2xl bg-green-500 text-white shadow-lg">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-primary tracking-tight">{t.advisory.title}</h2>
            <p className="text-muted-foreground font-medium">{t.advisory.subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-[10px] font-black text-primary/40 uppercase tracking-widest px-2">
              {t.advisory.selectProcedure}
            </h3>
            {currentData.map((item) => (
              <Card 
                key={item.id}
                className={`group cursor-pointer transition-all border-2 rounded-2xl overflow-hidden ${
                  selected.id === item.id 
                    ? 'border-primary bg-primary/5 shadow-md' 
                    : 'border-transparent hover:border-primary/20 bg-white shadow-sm'
                }`}
                onClick={() => setSelected(item)}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-1.5 py-0.5 rounded bg-primary/10 text-[8px] font-black uppercase text-primary tracking-widest">
                        {item.type}
                      </span>
                      <h4 className="font-bold text-primary truncate leading-tight">{item.title}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground font-medium truncate">{item.desc}</p>
                  </div>
                  <ChevronRight className={`h-5 w-5 transition-all ${selected.id === item.id ? 'text-primary translate-x-1' : 'text-primary/20'}`} />
                </CardContent>
              </Card>
            ))}

            <div className="mt-8">
              <div className="flex justify-between items-center px-2 mb-2">
                <h3 className="text-[10px] font-black text-primary/40 uppercase tracking-widest">{t.common.history}</h3>
                <Button 
                  variant="link" 
                  size="sm" 
                  onClick={() => { setHistory([]); toast.success(t.common.clear + '!'); }}
                  className="text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-500 p-0 h-auto"
                >
                  {t.common.clear}
                </Button>
              </div>
              <HistoryTimeline items={history} onItemClick={(item) => {
                const match = currentData.find(d => item.response.includes(d.title));
                if (match) setSelected(match);
              }} />
            </div>
          </div>

          <div className="lg:col-span-2">
            <Card className="border-none shadow-2xl rounded-3xl overflow-hidden bg-white">
              <CardHeader className="bg-primary text-white p-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {t.advisory.stepByStep}
                  </span>
                  <span className="text-white/80 text-xs font-black uppercase tracking-widest">
                    {selected.steps.length} {t.advisory.stepsCount}
                  </span>
                </div>
                <CardTitle className="text-4xl font-black tracking-tighter">{selected.title}</CardTitle>
                <p className="text-white/80 mt-2 font-bold leading-tight">{selected.desc}</p>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <AudioPlayer 
                  text={`${selected.title}. ${selected.desc}. ${selected.steps.join('. ')}`}
                  lang={language}
                />

                <div className="space-y-6">
                  {selected.steps.map((step: string, idx: number) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex gap-4 group"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-primary/5 flex items-center justify-center font-black text-primary group-hover:bg-primary group-hover:text-white transition-all">
                        {idx + 1}
                      </div>
                      <div className="pt-2">
                        <p className="text-lg font-bold text-slate-700 leading-snug">{step}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="p-6 bg-green-50 rounded-3xl border-2 border-green-100 flex items-center gap-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600 shrink-0" />
                  <div>
                    <h4 className="font-black text-green-900 uppercase tracking-widest text-[10px] mb-1">
                      {t.common.safetyTip}
                    </h4>
                    <p className="text-green-800 font-bold leading-tight">{t.common.safetyTipText}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
