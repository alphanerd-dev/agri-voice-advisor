import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, MapPin, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AudioPlayer } from '@/components/AudioPlayer';
import { useLanguage } from '@/context/LanguageContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const MarketMonitor: React.FC = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const crops = ['maize', 'millet', 'sorghum', 'groundnut', 'tomatoes'] as const;
  const hubs = t.market.hubs;

  // Realistic estimates for Nigerians hubs
  const getPrice = (hub: string, crop: string) => {
    // Deterministic prices for demo based on hub/crop string lengths
    const base = 40000 + (hub.length * 1000) + (crop.length * 500);
    return base;
  };

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat('en-NG', { 
      style: 'currency', 
      currency: 'NGN', 
      maximumFractionDigits: 0 
    }).format(p);
  };

  const audioSummary = useMemo(() => {
    const kanoMaize = getPrice('Kano', 'maize');
    const lagosTomatoes = getPrice('Lagos', 'tomatoes');
    
    if (language === 'ha-NG') {
      return `Farashin hatsi a Kano: ${t.market.crops.maize} ita ce ${kanoMaize} Naira. A Legas, ${t.market.crops.tomatoes} kiyasi ne na ${lagosTomatoes} Naira. ${t.market.estimateNote}.`;
    }
    if (language === 'yo-NG') {
      return `Iye owo ni Kano: ${t.market.crops.maize} jẹ ${kanoMaize} Naira. Ni Lagos, ${t.market.crops.tomatoes} jẹ kiyesi ${lagosTomatoes} Naira. ${t.market.estimateNote}.`;
    }
    if (language === 'ig-NG') {
      return `Ọnụahịa n'ahịa Kano: ${t.market.crops.maize} bụ ${kanoMaize} Naira. Na Lagos, ${t.market.crops.tomatoes} bụ atụmatụ nke ${lagosTomatoes} Naira. ${t.market.estimateNote}.`;
    }
    return `Market briefing: In Kano, Maize is estimated at ${kanoMaize} Naira per bag. In Lagos, Tomatoes are around ${lagosTomatoes} Naira. Note that all prices are estimates.`;
  }, [language, t]);

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
        <div className="p-4 rounded-2xl bg-purple-500 text-white shadow-lg">
          <TrendingUp className="h-8 w-8" />
        </div>
        <div>
          <h2 className="text-3xl font-extrabold text-primary tracking-tight">{t.market.title}</h2>
          <p className="text-muted-foreground font-medium">{t.market.subtitle}</p>
        </div>
      </div>

      <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-primary text-white mb-8">
        <CardContent className="p-8 space-y-4">
          <div className="flex items-center gap-2 text-white/80 font-black uppercase tracking-widest text-[10px]">
            <TrendingUp className="h-4 w-4" />
            {t.market.digest}
          </div>
          <h3 className="text-3xl font-black tracking-tighter">{t.market.briefing}</h3>
          <p className="text-white/80 font-bold leading-tight">{t.market.briefingDesc}</p>
          <AudioPlayer 
            text={audioSummary} 
            lang={language}
            className="bg-white/10 border-white/20 text-white"
          />
        </CardContent>
      </Card>

      <div className="mb-6 flex items-center gap-2 p-4 bg-orange-50 rounded-2xl border-2 border-orange-100 text-orange-800">
        <AlertCircle className="h-5 w-5 shrink-0" />
        <p className="text-sm font-black uppercase tracking-tighter">{t.market.estimateNote}</p>
      </div>

      <Card className="border-2 border-primary/10 shadow-2xl rounded-3xl overflow-hidden bg-white">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow className="border-b-2 border-primary/10">
                  <TableHead className="w-[140px] font-black text-primary uppercase tracking-tighter py-6 px-6">
                    {t.market.title.split(' ')[0]}
                  </TableHead>
                  {crops.map(crop => (
                    <TableHead key={crop} className="font-black text-primary uppercase tracking-tighter text-center px-4">
                      {t.market.crops[crop]}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {hubs.map((hub) => (
                  <TableRow key={hub} className="border-b border-primary/5 hover:bg-primary/[0.02] transition-colors">
                    <TableCell className="font-bold text-primary py-5 px-6 flex items-center gap-2">
                      <MapPin className="h-3 w-3 text-primary/40" />
                      {hub}
                    </TableCell>
                    {crops.map(crop => (
                      <TableCell key={crop} className="text-center font-black text-slate-700">
                        <div className="text-sm">{formatPrice(getPrice(hub, crop))}</div>
                        <div className="text-[9px] text-muted-foreground font-bold uppercase tracking-tighter">
                          {t.market.perBag}
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
