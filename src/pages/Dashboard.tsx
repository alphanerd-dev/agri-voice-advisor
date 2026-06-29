import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Stethoscope, 
  ShieldCheck, 
  Warehouse, 
  TrendingUp, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const modules = [
    {
      id: 'symptoms',
      title: t.dashboard.modules.symptoms.title,
      desc: t.dashboard.modules.symptoms.desc,
      icon: Stethoscope,
      color: 'bg-orange-500',
      lightColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      path: '/symptom-checker'
    },
    {
      id: 'advisory',
      title: t.dashboard.modules.advisory.title,
      desc: t.dashboard.modules.advisory.desc,
      icon: ShieldCheck,
      color: 'bg-green-500',
      lightColor: 'bg-green-50',
      textColor: 'text-green-700',
      path: '/treatment-advisory'
    },
    {
      id: 'storage',
      title: t.dashboard.modules.storage.title,
      desc: t.dashboard.modules.storage.desc,
      icon: Warehouse,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      path: '/storage-guide'
    },
    {
      id: 'market',
      title: t.dashboard.modules.market.title,
      desc: t.dashboard.modules.market.desc,
      icon: TrendingUp,
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      path: '/market-monitor'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="px-4 pt-8 pb-32 max-w-lg mx-auto">
      <div className="mb-10 text-center sm:text-left">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl font-black text-primary tracking-tighter mb-2"
        >
          {t.dashboard.title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground font-bold"
        >
          {t.dashboard.subtitle}
        </motion.p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-4"
      >
        {modules.map((mod) => (
          <motion.div key={mod.id} variants={item}>
            <Card 
              className="group border-none shadow-xl rounded-3xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 active:scale-[0.98]"
              onClick={() => navigate(mod.path)}
            >
              <CardContent className="p-0">
                <div className="flex items-stretch min-h-32">
                  <div className={`w-24 ${mod.color} flex items-center justify-center text-white shrink-0 group-hover:w-28 transition-all`}>
                    <mod.icon className="h-10 w-10" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-1">
                      <h2 className="text-xl font-black text-primary tracking-tight">{mod.title}</h2>
                      <ChevronRight className="h-5 w-5 text-primary/20 group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-sm text-muted-foreground font-medium leading-tight">
                      {mod.desc}
                    </p>
                    
                    <div className="mt-4 flex items-center gap-1 text-xs font-black uppercase tracking-tighter text-primary/40 group-hover:text-primary transition-colors">
                      {t.dashboard.openModule} <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 p-6 bg-primary/5 rounded-3xl border-2 border-dashed border-primary/20 text-center"
      >
        <p className="text-xs font-black uppercase tracking-widest text-primary/40 mb-2">Pro Tip</p>
        <p className="text-sm font-bold text-primary italic leading-relaxed">
          {t.dashboard.micPrompt}
        </p>
      </motion.div>
    </div>
  );
};
