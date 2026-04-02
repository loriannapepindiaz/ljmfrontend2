// components/CruceroEspecificaciones.tsx
import React from 'react';
import { VesselData } from '../../../fleet/data/vessels';

interface CruceroEspecificacionesProps {
  vessel?: VesselData;
}

const CruceroEspecificaciones: React.FC<CruceroEspecificacionesProps> = ({ vessel }) => {
  const specs = vessel?.specs;

  return (
    <section className="py-24 px-8 bg-[#ffffff] text-[#0e1a34]" id="specifications">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#5a5e6b] uppercase tracking-widest text-xs font-bold">
            Engineering Excellence
          </span>
          <h2 className="font-['Newsreader'] text-4xl font-bold mt-2 text-[#0e1a34]">
            Technical Integrity
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#e2e8f0]/30 border border-[#e2e8f0]/30">
          <div className="bg-white p-12 text-center group hover:bg-[#0e1a34] transition-all duration-500">
            <span className="material-symbols-outlined text-[#eacea9] text-4xl mb-4 group-hover:text-white transition-colors">
              straighten
            </span>
            <h4 className="text-[#45464d] uppercase text-[10px] tracking-widest mb-2 group-hover:text-[#eacea9]">
              Overall Length
            </h4>
            <p className="font-['Newsreader'] text-4xl font-bold text-[#0e1a34] group-hover:text-white">
              {specs?.length || '82.5m'}
            </p>
            <p className="text-slate-400 text-xs mt-2 group-hover:text-slate-200">
              270 Feet of Precision
            </p>
          </div>
          <div className="bg-white p-12 text-center group hover:bg-[#0e1a34] transition-all duration-500">
            <span className="material-symbols-outlined text-[#eacea9] text-4xl mb-4 group-hover:text-white transition-colors">
              weight
            </span>
            <h4 className="text-[#45464d] uppercase text-[10px] tracking-widest mb-2 group-hover:text-[#eacea9]">
              Gross Tonnage
            </h4>
            <p className="font-['Newsreader'] text-4xl font-bold text-[#0e1a34] group-hover:text-white">
              {specs?.tonnage || '2,250t'}
            </p>
            <p className="text-slate-400 text-xs mt-2 group-hover:text-slate-200">
              Voluminous Steel Hull
            </p>
          </div>
          <div className="bg-white p-12 text-center group hover:bg-[#0e1a34] transition-all duration-500">
            <span className="material-symbols-outlined text-[#eacea9] text-4xl mb-4 group-hover:text-white transition-colors">
              groups
            </span>
            <h4 className="text-[#45464d] uppercase text-[10px] tracking-widest mb-2 group-hover:text-[#eacea9]">
              Guest Capacity
            </h4>
            <p className="font-['Newsreader'] text-4xl font-bold text-[#0e1a34] group-hover:text-white">
              {specs?.guests || '12'}
            </p>
            <p className="text-slate-400 text-xs mt-2 group-hover:text-slate-200">
              Luxury Master Suites
            </p>
          </div>
          <div className="bg-white p-12 text-center group hover:bg-[#0e1a34] transition-all duration-500">
            <span className="material-symbols-outlined text-[#eacea9] text-4xl mb-4 group-hover:text-white transition-colors">
              layers
            </span>
            <h4 className="text-[#45464d] uppercase text-[10px] tracking-widest mb-2 group-hover:text-[#eacea9]">
              Number of Decks
            </h4>
            <p className="font-['Newsreader'] text-4xl font-bold text-[#0e1a34] group-hover:text-white">
              {specs?.decks || '5'}
            </p>
            <p className="text-slate-400 text-xs mt-2 group-hover:text-slate-200">
              Connected by Elevator
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CruceroEspecificaciones;