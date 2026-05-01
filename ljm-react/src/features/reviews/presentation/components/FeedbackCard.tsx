import React from 'react';

interface FeedbackCardProps {
  initials: string;
  name: string;
  registryId: string;
  stars: number;
  text: string;
  timeAgo: string;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({
  initials, name, registryId, stars, text, timeAgo,
}) => {
  return (
    <div className="bg-[#1E2944] p-8 rounded-lg relative overflow-hidden">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#06122C] rounded-full flex items-center justify-center text-[#DEC29E] border border-[#DEC29E]/30 font-semibold text-sm tracking-wider flex-shrink-0">
            {initials}
          </div>
          <div>
            <h4 className="font-semibold text-[#D9E2FF] text-lg">{name}</h4>
            <p className="text-[10px] uppercase tracking-widest text-[#D9E2FF]/50">
              ID de Registro: {registryId}
            </p>
          </div>
        </div>
        <div className="flex text-[#DEC29E] text-sm">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className="material-symbols-outlined"
              style={{ fontVariationSettings: i < stars ? "'FILL' 1" : "'FILL' 0" }}
            >
              star
            </span>
          ))}
        </div>
      </div>

      <p className="text-[#D9E2FF]/60 leading-relaxed italic">"{text}"</p>

      <div className="mt-6 flex items-center gap-2 text-[10px] uppercase text-[#DEC29E]/40">
        <span className="material-symbols-outlined text-xs">schedule</span>
        <span>Registrado hace {timeAgo}</span>
      </div>
    </div>
  );
};

export default FeedbackCard;
