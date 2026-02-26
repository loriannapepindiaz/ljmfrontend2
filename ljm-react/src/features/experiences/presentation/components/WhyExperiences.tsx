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

  if (variant === 'mobile') {
    return (
      <div className="bg-white dark:bg-primary/50 p-8 rounded-2xl text-center shadow-lg border border-pearl/20">
        <h2 className="text-3xl magiona-style mb-8">Why LJM Experiences?</h2>
        <div className="grid grid-cols-2 gap-4">
          {items.map((item) => (
            <div key={item.title} className="p-5 bg-pearl/10 rounded-xl flex flex-col items-center">
              <span className="material-symbols-outlined text-secondary mb-2 text-3xl">{item.icon}</span>
              <span className="font-semibold text-sm">{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // desktop version
  return (
    <div className="bg-white dark:bg-primary shadow-2xl rounded-3xl p-10 border border-pearl/20">
      <h2 className="text-2xl magiona-style mb-8 text-primary dark:text-pearl text-center">Why LJM Experiences?</h2>
      <div className="grid grid-cols-4 gap-8">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex items-center space-x-4 p-5 rounded-2xl bg-background-light/50 dark:bg-white/5 border border-pearl/30 hover:border-secondary transition-all group cursor-default"
          >
            <span className="material-symbols-outlined text-secondary text-4xl group-hover:scale-110 transition-transform">
              {item.icon}
            </span>
            <div>
              <p className="font-bold text-sm text-primary dark:text-white">{item.title}</p>
              <p className="text-xs text-gray-500 dark:text-pearl/60">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyExperiences;