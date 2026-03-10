// src/features/experiences/components/ExperiencesHero.tsx
import { FC } from 'react';
import WhyExperiences from './WhyExperiences';

const ExperiencesHero: FC = () => {
  return (
    <header className="relative w-full overflow-hidden pt-20 pb-32">
      {/* Imagen */}
      <img
        alt="Luxury dinner on cruise deck at sunset"
        className="absolute inset-0 w-full h-full object-cover"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUNsudZD84rn4ktFGUUcom9aZ1anOrVPu0ymsZEZVn6L1urPW9XFSzeL1cv36Mu-1J6noak0rG6tTHX-unhh5zYyFANFwuJHVU7D5ynd5g9dax3UZoiqr-cHzrRbG0m4mVF8HITf4l7ENClyXZhJ2YdmXXRI1lMM0BhNaWnMpmrvDOr4NFCUhYI8S5dpJcY8T_Wt13NPdsHrT6NaWWrLKjQxu67v_ToR7M3WSJBIN0dsrwPDVVcGokpz9st49qd7aTlPkf9-RrbKQ"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/40 to-primary/90" />

      {/* Contenido */}
     <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-32 md:pt-40">
        <h1 className="magiona-style text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
          Discover the Ultimate <br />
          <span className="text-pearl">Sealine Experiences</span>
        </h1>

        <p className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light tracking-wide">
          Indulge in curated moments of luxury, where every detail is crafted
          for your absolute pleasure across the world's most beautiful horizons.
        </p>

        <button className="bg-accent text-primary font-bold py-4 px-12 rounded-full shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl">
          Plan Your Adventure Now!
        </button>
      </div>

      {/* WHY SECTION DENTRO DEL HERO */}
      <div className="relative z-10 mt-20 px-6 max-w-6xl mx-auto">
        <WhyExperiences variant="desktop" />
      </div>
    </header>
  );
};

export default ExperiencesHero;