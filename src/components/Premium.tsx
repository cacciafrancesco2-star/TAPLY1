import React from 'react';
import { motion } from 'motion/react';
import { Check, Crown, Zap, MessageCircle, Shield, Download, Star } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Premium() {
  const plans = [
    {
      name: 'Gratuito',
      price: '€0',
      features: [
        'Accesso base alle lezioni',
        'Energia max: 25',
        'Ricarica: 5 ogni 5 ore',
        '1 Video-reward al giorno',
        '10 messaggi AI al giorno',
      ],
      current: true,
      color: 'slate',
    },
    {
      name: 'Premium Base',
      price: '€4,99',
      period: '/mese',
      features: [
        'Tutte le lezioni sbloccate',
        'Energia max: 50',
        'Ricarica: 10 ogni 3 ore',
        '3 Video-reward al giorno',
        '30 messaggi AI al giorno',
        'Nessuna pubblicità',
      ],
      popular: true,
      color: 'brand-primary',
    },
    {
      name: 'Premium Pro',
      price: '€9,99',
      period: '/mese',
      features: [
        'Energia illimitata',
        'Messaggi AI illimitati',
        'Accesso offline',
        'Badge esclusivo Pro',
        'Supporto prioritario',
      ],
      color: 'brand-secondary',
    }
  ];

  return (
    <div className="min-h-screen bg-brand-bg pt-24 pb-32 px-6 overflow-y-auto">
      <div className="text-center mb-10">
        <div className="inline-block p-4 bg-brand-secondary/10 rounded-full mb-4">
          <Crown className="w-10 h-10 text-brand-secondary fill-brand-secondary" />
        </div>
        <h2 className="text-4xl mb-2">Scegli il tuo piano</h2>
        <p className="text-slate-500">Accelera il tuo apprendimento digitale.</p>
      </div>

      <div className="space-y-8">
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            whileHover={{ y: -5 }}
            className={cn(
              "bg-white rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden border-4",
              plan.popular ? "border-brand-primary" : "border-transparent"
            )}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-brand-primary text-white text-[10px] font-black px-6 py-2 rounded-bl-3xl uppercase tracking-widest">
                Più Popolare
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-2xl font-black mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black">{plan.price}</span>
                {plan.period && <span className="text-slate-400 font-bold">{plan.period}</span>}
              </div>
            </div>

            <ul className="space-y-4 mb-10">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600 font-medium">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5 shrink-0">
                    <Check className="w-4 h-4 text-green-500" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <button className={cn(
              "w-full py-5 rounded-2xl font-black text-xl transition-all active:scale-95",
              plan.current 
                ? "bg-slate-100 text-slate-400 cursor-default" 
                : plan.popular ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/30" : "bg-slate-900 text-white"
            )}>
              {plan.current ? 'Piano Attuale' : 'Seleziona'}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
