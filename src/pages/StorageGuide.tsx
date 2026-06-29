import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, HardDrive, Thermometer, Wind, Sun, Info, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export const StorageGuide: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [moisture, setMoisture] = useState([13]);

  const getStatusColor = (m: number) => {
    if (m <= 13) return 'bg-green-500';
    if (m <= 15) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getAdvice = (m: number) => {
    if (m <= 13) return t.storage.advice.safe;
    if (m <= 18) return t.storage.advice.risky;
    return t.storage.advice.unsafe;
  };

  return (
    <div className="px-4 pt-6 pb-32 max-w-4xl mx-auto">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/')} 
        className="mb-6 hover:bg-primary/5 text-primary font-bold rounded-xl"
      >
        <ArrowLeft className="mr-2 h-5 w-5" /> {t.common.back}
      </Button>

      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-orange-500 text-white shadow-lg">
          <HardDrive className="h-8 w-8" />
        </div>
        <div>
          <h2 className="text-3xl font-extrabold text-primary tracking-tight">{t.storage.title}</h2>
          <p className="text-muted-foreground font-medium">{t.storage.subtitle}</p>
        </div>
      </div>

      <Tabs defaultValue="drying" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-slate-100 p-1 rounded-2xl h-14 mb-8">
          <TabsTrigger value="drying" className="rounded-xl font-black text-sm uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
            {t.storage.tabs.drying}
          </TabsTrigger>
          <TabsTrigger value="hermetic" className="rounded-xl font-black text-sm uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
            {t.storage.tabs.hermetic}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="drying">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-none shadow-2xl rounded-3xl overflow-hidden bg-white">
              <CardHeader className="bg-primary text-white p-8">
                <CardTitle className="text-2xl font-black tracking-tighter uppercase">{t.storage.moistureLevel}</CardTitle>
                <p className="text-white/80 font-bold leading-tight">{t.storage.moisturePrompt}</p>
              </CardHeader>
              <CardContent className="p-8">
                <div className="flex justify-between mb-8 text-xs font-black uppercase tracking-widest text-primary/40">
                  <span>{t.storage.boneDry}</span>
                  <span>{t.storage.ideal}</span>
                  <span>{t.storage.fresh}</span>
                </div>
                <Slider
                  defaultValue={[13]}
                  max={25}
                  min={8}
                  step={0.5}
                  value={moisture}
                  onValueChange={setMoisture}
                  className="py-4"
                />
                
                <div className="mt-12 text-center">
                  <div className="inline-block p-1 bg-slate-100 rounded-3xl mb-4">
                    <div className={`w-32 h-32 rounded-full ${getStatusColor(moisture[0])} flex items-center justify-center text-white text-4xl font-black shadow-inner transition-colors`}>
                      {moisture[0]}%
                    </div>
                  </div>
                  <h4 className="text-primary/40 font-black uppercase tracking-widest text-xs mb-1">{t.storage.status}</h4>
                  <p className="text-xl font-black text-primary leading-tight">{getAdvice(moisture[0])}</p>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <h3 className="text-[10px] font-black text-primary/40 uppercase tracking-widest px-2">Drying Tips</h3>
              <div className="p-6 bg-blue-50 rounded-3xl border-2 border-blue-100 flex items-start gap-4">
                <div className="p-3 bg-blue-500 text-white rounded-2xl shadow-lg">
                  <Wind className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-black text-blue-900 uppercase tracking-widest text-[10px] mb-1">{t.storage.tips.air.title}</h4>
                  <p className="text-blue-800 font-bold leading-tight">{t.storage.tips.air.desc}</p>
                </div>
              </div>

              <div className="p-6 bg-yellow-50 rounded-3xl border-2 border-yellow-100 flex items-start gap-4">
                <div className="p-3 bg-yellow-500 text-white rounded-2xl shadow-lg">
                  <Sun className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-black text-yellow-900 uppercase tracking-widest text-[10px] mb-1">{t.storage.tips.sun.title}</h4>
                  <p className="text-yellow-800 font-bold leading-tight">{t.storage.tips.sun.desc}</p>
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-3xl border-2 border-slate-100 flex items-start gap-4">
                <div className="p-3 bg-slate-500 text-white rounded-2xl shadow-lg">
                  <Info className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-widest text-[10px] mb-1">Testing</h4>
                  <p className="text-slate-800 font-bold leading-tight">If you don't have a meter, try the "salt test" or "bite test".</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="hermetic">
          <Card className="border-none shadow-2xl rounded-3xl overflow-hidden bg-white">
            <CardHeader className="bg-primary text-white p-8">
              <CardTitle className="text-4xl font-black tracking-tighter uppercase">{t.storage.hermeticTitle}</CardTitle>
              <p className="text-white/80 mt-2 font-bold leading-tight">{t.storage.hermeticDesc}</p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {t.storage.hermeticSteps.map((step, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center font-black text-primary text-xl group-hover:bg-primary group-hover:text-white transition-all">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-primary leading-tight mb-1">{step.title}</h4>
                      <p className="text-slate-600 font-bold leading-tight">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-8 bg-green-50 rounded-[40px] border-2 border-green-100 flex items-center gap-6">
                <div className="p-4 bg-green-500 text-white rounded-3xl shadow-xl">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div>
                  <h4 className="font-black text-green-900 uppercase tracking-widest text-xs mb-1">Key Benefit</h4>
                  <p className="text-xl font-black text-green-800 leading-tight">Zero chemical needed. Your grain stays fresh for over 12 months.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
