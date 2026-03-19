"use client"

import React from 'react'
import { MapPin, Star } from 'lucide-react'

interface Destino {
  id: number
  img: string
  titulo: string
  pais: string
  rating: number
  descripcion: string
  precio?: number
}

interface DestinationCardProps {
  destino: Destino
  variant?: 'grid' | 'featured'
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destino, variant = 'grid' }) => {
  if (variant === 'featured') {
    return (
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out cursor-pointer group">
        <div className="relative overflow-hidden">
          <img
            src={destino.img}
            alt={destino.titulo}
            className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
            <Star className="w-4 h-4 text-[#c9a962]" fill="#c9a962" />
            <span className="text-sm font-semibold text-[#0e1a34]">{destino.rating}</span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-2xl font-serif text-[#0e1a34]">{destino.titulo}</h3>
            {destino.precio && (
              <div className="text-right shrink-0 ml-4">
                <span className="text-2xl font-bold text-[#c9a962]">${destino.precio.toLocaleString()}</span>
                <p className="text-xs text-[#0e1a34]/50 uppercase">por persona</p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-[#0e1a34]/60 mb-4">
            <MapPin className="w-4 h-4" />
            <span className="text-sm uppercase tracking-wide">{destino.pais}</span>
          </div>
          <p className="text-[#0e1a34]/70 text-sm leading-relaxed mb-6 line-clamp-2">
            {destino.descripcion}
          </p>
          <button className="w-full border-2 border-[#c9a962] text-[#c9a962] py-3.5 rounded-full font-semibold uppercase text-sm tracking-widest hover:bg-[#c9a962] hover:text-white transition-all duration-300">
            VER DETALLES
          </button>
        </div>
      </div>
    )
  }

  // variant === 'grid'
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col cursor-pointer group">
      <div className="relative">
        <div className="p-3 pb-0 overflow-hidden rounded-xl">
          <img
            src={destino.img}
            alt={destino.titulo}
            className="w-full h-56 object-cover rounded-xl group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        </div>
        <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
          <Star className="w-4 h-4 text-[#c9a962]" fill="#c9a962" />
          <span className="text-sm font-semibold text-[#0e1a34]">{destino.rating}</span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        {/* Título solo, sin el botón al lado */}
        <h3 className="text-xl font-serif font-bold text-[#0e1a34] mb-2">{destino.titulo}</h3>
        <div className="flex items-center gap-1.5 text-[#0e1a34]/50 mb-3">
          <MapPin className="w-4 h-4" />
          <span className="text-sm uppercase tracking-wide">{destino.pais}</span>
        </div>
        <p className="text-[#0e1a34]/60 text-sm leading-relaxed line-clamp-3 flex-1 mb-5">
          {destino.descripcion}
        </p>
        {/* Botón al fondo, ancho completo — consistente con variant featured */}
        <button className="w-full border-2 border-[#c9a962] text-[#c9a962] py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-[#c9a962] hover:text-white transition-all duration-300">
          VER DETALLES
        </button>
      </div>
    </div>
  )
}

export default DestinationCard