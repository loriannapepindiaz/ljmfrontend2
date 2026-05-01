import React from 'react';
import FeedbackCard from './FeedbackCard';

const feedbacks: Array<{
  initials: string;
  name: string;
  registryId: string;
  stars: number;
  text: string;
  timeAgo: string;
}> = [];

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
