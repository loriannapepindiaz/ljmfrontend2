// components/Gallery.jsx - COMPLETO Y FUNCIONANDO ✅
import React from 'react';

const galleryItems = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsTCN_0ROR0IL7ZRQCA37YYjBPClqFv7aDxL8dLkubqvJp-qAkneDzN3y9fHmSxONDgaSGYKxlmExcnpxUxqqtegGAfzWNPpsCSnztgwd3NnnUgXA4a1kFgooc6qLkXyH-Z7WsIsThMPRFNyyixaMFcoDq0LLK7BMG6LAi1c3FLsFRhoI2wxD_6qFm_6yb8FIXpXcI3CsV6XYtvKAYyxHXarDhVfOOy5K3plW0FY7XBEUQ1yY03UvsMG4JZiUmY9T6XQv4Y0mKIjI",
    alt: "Cúpulas Azules Santorini",
    title: "Oia, Santorini",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpTeHdvIr0wkSrnooLLwU4I84FnsixOuYNOvuCWnbkl8EqLZoEYfGJ5Zy-XJIb39jGNub9aU01dzWdMEjQqo9Ez9fD5Xu6pLvbbWVOpqojlisVMqE63yz3HsiByDzYDiu3SZkMwtMgC-SFf-pjNv-YskVjak0B3R4CuJr64mrCI09i7Ua6-0gPEuuOQFoiINHqyi-Gy7x0yvJ47jMu_QqD0f_2DKGg6LENc6w0xmb1dhFeFbK3iB0FCCRnsaIxI8nrcOAkPxgauYI",
    alt: "Aguas cristalinas",
    title: "Costas de Milos",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIxS74twmbb1B3cUYdnBclHcheFQsI5GDDEkYbuK8PVOG_PjSbO53UgglbD2IFHHgv3WNzWPURW8JE3SQiDYzgKmxNsV8QHLxYGCdL_WQjWKhsNDGNzvHStG84z61Iu7tkw7vsqwTZIXsDSE5ErPftxL57uTX0S-pMp5yCTyml5ZvU1oxH9L4DUxm4igVXOMYJLi40_vFQH6DUuRJn1F9_9s7uIEhg7eKU3aN_NT3uVO2HmrNkwqZZSttO3xfuwIZPtXMwNqLi7j0",
    alt: "Molinos de Mykonos",
    title: "Pueblo Mykonos",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnBUpuj1Kc35EjGB1CJmOqGoaZi5qoIlshvl0SvHp3lBKJ0a1JklilDFqemjNMzMRNnY_-1E-ve0r1W8JidGmldEOnQ0Z4QW6TNbRWhJtUbuZsZnjqQprs3pLj_udN1onxpUKvexrCTKN1bPY0_i75RHeaUAWSCsTGZPBEqclUXXbWlpiVUhAaRk-8XjTOoprVXxtZSDKemY2n1QnWzX8a5MqRO8AmJsKkXE-5gYeaFtTMQQKSmN016qGUJscalqABspwQB4d7cKc",
    alt: "Vista Cubierta de Lujo",
    title: "Terraza Privada",
  },
];

export default function Gallery() {
  const handleViewPortfolio = () => {
    window.location.href = '/details-suit';
  };

  return (
    <section className="py-16 bg-gradient-to-b from-[#1a1a2e] to-[#16213e]">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <h3 className="text-xl font-bold tracking-[0.3em] uppercase text-[#C5A059]">
            Galería de Destinos
          </h3>
          <button
            onClick={handleViewPortfolio}
            className="text-sm text-[#eacea9]/70 hover:text-[#C5A059] transition-all duration-300 tracking-[0.2em] uppercase font-bold border-b-2 border-transparent hover:border-[#C5A059] pb-1 cursor-pointer hover:tracking-[0.3em]"
          >
            VER PORTAFOLIO COMPLETO
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="group relative h-64 md:h-48 lg:h-56 rounded-2xl overflow-hidden shadow-2xl border border-white/10 cursor-pointer"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                <div className="text-left">
                  <span className="text-lg font-bold tracking-wider uppercase text-white drop-shadow-lg">
                    {item.title}
                  </span>
                  <div className="w-16 h-1 bg-[#C5A059] mt-2 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
