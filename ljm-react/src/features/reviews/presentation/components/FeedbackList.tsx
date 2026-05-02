import React from 'react';
import FeedbackCard from './FeedbackCard';

const feedbacks: Array<{
  initials: string;
  name: string;
  registryId: string;
  stars: number;
  text: string;
  timeAgo: string;
}> = [
  {
    initials: 'SL',
    name: 'Sophie L.',
    registryId: 'LJM-00421',
    stars: 5,
    text: 'Una experiencia que superó todas mis expectativas. El servicio a bordo fue impecable y los destinos, simplemente mágicos.',
    timeAgo: '2 días',
  },
  {
    initials: 'MR',
    name: 'Marco R.',
    registryId: 'LJM-00398',
    stars: 5,
    text: 'El buceo en los arrecifes fue extraordinario. El equipo de LJM Sealine cuidó cada detalle durante todo el trayecto.',
    timeAgo: '5 días',
  },
  {
    initials: 'AT',
    name: 'Amelia T.',
    registryId: 'LJM-00374',
    stars: 4,
    text: 'El velero al atardecer con champán fue el momento más romántico de nuestro viaje de aniversario. Lo recomiendo sin duda.',
    timeAgo: '1 semana',
  },
];

const FeedbackList: React.FC = () => {
  return (
    <div className="space-y-8">
      <h3 className="font-serif text-2xl text-[#D9E2FF] border-l-4 border-[#DEC29E] pl-4">
        Comentarios Recientes
      </h3>
      {feedbacks.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.03] px-6 py-10 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Sin comentarios registrados</p>
          <p className="mt-2 text-xs text-slate-500">Los comentarios apareceran cuando existan opiniones reales.</p>
        </div>
      ) : feedbacks.map((fb) => (
        <FeedbackCard key={fb.registryId} {...fb} />
      ))}
    </div>
  );
};

export default FeedbackList;
