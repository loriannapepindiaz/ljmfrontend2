// src/features/experiences/components/WhyExperiences.tsx
import { FC } from 'react';

type Variant = 'desktop' | 'mobile';

interface WhyExperiencesProps {
  variant: Variant;
}

const WhyExperiences: FC<WhyExperiencesProps> = ({ variant }) => {
  const items = [
    { icon: 'explore', title: 'Adventure', desc: 'Thrill seeking' },
    { icon: 'account_balance', title: 'Culture', desc: 'Local heritage' },
    { icon: 'spa', title: 'Relaxation', desc: 'Pure tranquility' },
    { icon: 'surfing', title: 'Water Sports', desc: 'Ocean play' },
  ];

  return (
    <div className="bg-accent/90 backdrop-blur-md rounded-3xl p-12 border border-pearl/30 shadow-2xl">
      
      {/* TÍTULO AGREGADO */}
      <h2 className="text-3xl magiona-style text-primary text-center mb-12">
        Why LJM Experiences?
      </h2>

      <div className="grid grid-cols-4 gap-8">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex items-center space-x-4 p-6 rounded-2xl bg-white/10 border border-pearl/40 
            transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <span className="material-symbols-outlined text-primary text-4xl">
              {item.icon}
            </span>

            <div>
              <p className="font-bold text-sm text-primary">
                {item.title}
              </p>
              <p className="text-xs text-primary/70">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyExperiences;