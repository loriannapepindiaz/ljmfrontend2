// components/CruceroAlojamientos.tsx
import React, { useState } from 'react';
import { VesselData } from '../../../fleet/data/vessels';

interface CruceroAlojamientosProps {
  vessel?: VesselData;
}

const CruceroAlojamientos: React.FC<CruceroAlojamientosProps> = ({ vessel }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // SLIDE 1 - Owner's Pavilion
    {
      mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVdjZIuZySJPAAaI3_ZWHfkmdVw1BufcSoU_uXkQ3PojJS85ZLs1iER7zTAhTqyQlsKzs3z9bzBckPKszRQS7r1VpL0HZAfwsgY3P8p5oIJF4KTYhIc0f3Lkog9-NfS7uwpujOZRs5GazNrFZ_4zwoCcEXENljtiAb8SyJUlxLWN6zvVRjHBAeCBkYZfjq5mvw5XX1bt6r56btKWGvxcqsiyfjfFaKmL0Hp_wPMQ6FyFw57LS7W43iU4wuggdz2vL6OkCDyn734tKx",
      mainTitle: "El Pabellón del Propietario",
      mainDesc: "Con 150 metros cuadrados, terraza privada, estudio y acceso directo al helipuerto de proa.",
      mainDeck: "01 — Cubierta Cuatro",
      thumbs: [
        {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBvqiAbboDG2M7vX2qwTcokADV4DKNfpyxMy8ExNHCxGvZsG-Dr62U-_MM_L6jSoF02OY_278FRfTpwhS-L9VgXhsvhcIVEIChwgEa0ykMQ_i5kS2IpXFXgiOKjJyHxkrruNtTz3U8LVr6J2ian41gR3tGm_0Tai45xrZIObDVEJzilc1QXee9YdacESnJsR8e0Uoo3eKG0tDrBn2DflJjpz5-pL5YtiGrYc06m73_9U_sI5NEE1_YCVmrS34uC4k5zLjnobAxWIfYs",
          label: "Suite VIP Alfa"
        },
        {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1gnTu4RFZ9ku7uxrFMeyXboUvpk1Xb6FS7gRFdd5plxxS9LD-njs6DBZiP9BQfOR8yU9NVXODGAEKe9livJfvz2G_LUZHJ2tAYFJv5bKcGmqnFpHsNnwm7A_E4kym8-ATXwgFIrhTDfVmjqR-eIRG_nMfAAOoOhFmLj2BegwJXdwAi7kmgykBN3t0OZJTzAGbjra3Pk2WORErAtUPHZNBTbET08yEWhBi6G1-YS1Qc-VYTDKa5couJc_xD3jzdRnmc6WSfBMtbTlz",
          label: "El Camarote Azure"
        }
      ]
    },
    // SLIDE 2 - VIP Suite
    {
      mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBvqiAbboDG2M7vX2qwTcokADV4DKNfpyxMy8ExNHCxGvZsG-Dr62U-_MM_L6jSoF02OY_278FRfTpwhS-L9VgXhsvhcIVEIChwgEa0ykMQ_i5kS2IpXFXgiOKjJyHxkrruNtTz3U8LVr6J2ian41gR3tGm_0Tai45xrZIObDVEJzilc1QXee9YdacESnJsR8e0Uoo3eKG0tDrBn2DflJjpz5-pL5YtiGrYc06m73_9U_sI5NEE1_YCVmrS34uC4k5zLjnobAxWIfYs",
      mainTitle: "Suite VIP Alfa",
      mainDesc: "Balcón privado con jacuzzi, cama king-size y baño revestido de mármol con vistas al océano.",
      mainDeck: "02 — Cubierta Tres",
      thumbs: [
        {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1gnTu4RFZ9ku7uxrFMeyXboUvpk1Xb6FS7gRFdd5plxxS9LD-njs6DBZiP9BQfOR8yU9NVXODGAEKe9livJfvz2G_LUZHJ2tAYFJv5bKcGmqnFpHsNnwm7A_E4kym8-ATXwgFIrhTDfVmjqR-eIRG_nMfAAOoOhFmLj2BegwJXdwAi7kmgykBN3t0OZJTzAGbjra3Pk2WORErAtUPHZNBTbET08yEWhBi6G1-YS1Qc-VYTDKa5couJc_xD3jzdRnmc6WSfBMtbTlz",
          label: "El Camarote Azure"
        },
        {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVdjZIuZySJPAAaI3_ZWHfkmdVw1BufcSoU_uXkQ3PojJS85ZLs1iER7zTAhTqyQlsKzs3z9bzBckPKszRQS7r1VpL0HZAfwsgY3P8p5oIJF4KTYhIc0f3Lkog9-NfS7uwpujOZRs5GazNrFZ_4zwoCcEXENljtiAb8SyJUlxLWN6zvVRjHBAeCBkYZfjq5mvw5XX1bt6r56btKWGvxcqsiyfjfFaKmL0Hp_wPMQ6FyFw57LS7W43iU4wuggdz2vL6OkCDyn734tKx",
          label: "Pabellón del Propietario"
        }
      ]
    },
    // SLIDE 3 - Azure Cabin
    {
      mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1gnTu4RFZ9ku7uxrFMeyXboUvpk1Xb6FS7gRFdd5plxxS9LD-njs6DBZiP9BQfOR8yU9NVXODGAEKe9livJfvz2G_LUZHJ2tAYFJv5bKcGmqnFpHsNnwm7A_E4kym8-ATXwgFIrhTDfVmjqR-eIRG_nMfAAOoOhFmLj2BegwJXdwAi7kmgykBN3t0OZJTzAGbjra3Pk2WORErAtUPHZNBTbET08yEWhBi6G1-YS1Qc-VYTDKa5couJc_xD3jzdRnmc6WSfBMtbTlz",
      mainTitle: "El Camarote Azure",
      mainDesc: "Configuración twin con camas convertibles, terraza privada y sistema de entretenimiento a medida.",
      mainDeck: "03 — Cubierta Dos",
      thumbs: [
        {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVdjZIuZySJPAAaI3_ZWHfkmdVw1BufcSoU_uXkQ3PojJS85ZLs1iER7zTAhTqyQlsKzs3z9bzBckPKszRQS7r1VpL0HZAfwsgY3P8p5oIJF4KTYhIc0f3Lkog9-NfS7uwpujOZRs5GazNrFZ_4zwoCcEXENljtiAb8SyJUlxLWN6zvVRjHBAeCBkYZfjq5mvw5XX1bt6r56btKWGvxcqsiyfjfFaKmL0Hp_wPMQ6FyFw57LS7W43iU4wuggdz2vL6OkCDyn734tKx",
          label: "Pabellón del Propietario"
        },
        {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBvqiAbboDG2M7vX2qwTcokADV4DKNfpyxMy8ExNHCxGvZsG-Dr62U-_MM_L6jSoF02OY_278FRfTpwhS-L9VgXhsvhcIVEIChwgEa0ykMQ_i5kS2IpXFXgiOKjJyHxkrruNtTz3U8LVr6J2ian41gR3tGm_0Tai45xrZIObDVEJzilc1QXee9YdacESnJsR8e0Uoo3eKG0tDrBn2DflJjpz5-pL5YtiGrYc06m73_9U_sI5NEE1_YCVmrS34uC4k5zLjnobAxWIfYs",
          label: "Suite VIP Alfa"
        }
      ]
    }
  ];

  const currentData = slides[currentSlide];

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-32 px-8 bg-white" id="accommodations">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="font-['Newsreader'] text-5xl font-bold text-[#0e1a34] leading-tight">
              Retiros Magistrales
            </h2>
            <p className="text-[#45464d] mt-6 text-lg">
              Cada camarote del The Serenity es un ambiente a medida, con roble de origen sostenible, cuero cosido a mano y cristal panorámico de suelo a techo.
            </p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={goToPrevious}
              className="w-12 h-12 rounded-full border border-[#0e1a34] flex items-center justify-center text-[#0e1a34] hover:bg-[#0e1a34] hover:text-white transition-all duration-300"
            >
              <span className="material-symbols-outlined text-sm">west</span>
            </button>
            <button 
              onClick={goToNext}
              className="w-12 h-12 rounded-full border border-[#0e1a34] flex items-center justify-center text-[#0e1a34] hover:bg-[#0e1a34] hover:text-white transition-all duration-300"
            >
              <span className="material-symbols-outlined text-sm">east</span>
            </button>
          </div>
        </div>

        {/* Imagen principal que CAMBIA */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto md:h-200">
          <div className="md:col-span-8 group relative overflow-hidden h-100 md:h-full">
            <img 
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
              src={currentData.mainImage}
              alt={`${currentData.mainTitle} cabin`}
            />
            <div className="absolute bottom-0 left-0 p-8 bg-linear-to-t from-black/80 to-transparent w-full text-white">
              <span className="text-[10px] uppercase tracking-widest text-[#eacea9]">
                {currentData.mainDeck}
              </span>
              <h3 className="font-['Newsreader'] text-3xl font-bold mt-2 italic">
                {currentData.mainTitle}
              </h3>
              <p className="text-sm mt-4 max-w-md text-slate-300">
                {currentData.mainDesc}
              </p>
            </div>
          </div>

          {/* Thumbnails que también CAMBIAN */}
          <div className="md:col-span-4 flex flex-col gap-8">
            {currentData.thumbs.map((thumb, index) => (
              <div key={index} className="flex-1 group relative overflow-hidden h-75">
                <img 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                  src={thumb.src}
                  alt={thumb.label}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-[#0e1a34]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="bg-white/90 px-6 py-3 text-[#0e1a34] text-xs font-bold uppercase tracking-widest shadow-sm">
                    {thumb.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots para navegación directa */}
        <div className="mt-12 flex justify-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-[#0e1a34] scale-125 shadow-md'
                  : 'bg-[#0e1a34]/30 hover:bg-[#0e1a34]/50 hover:scale-110'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CruceroAlojamientos;