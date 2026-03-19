"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const destinosDestacados = [
  { 
    id: 0, 
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAs8AJnlXBrdROZM-BvFrz9gtoxh2DmZfwv_Bb75xHZYOqCnczsgWoTd1h1xhVC8_ZZxLWJtH2XNSRGKFryl4c58zQxlub0CodBQX69ULPtIopvVTTO6qy0XUDB97av89916F-ZoBGGMSX4YVUcrX5XViMuH6251cXi2ByyW-x-9V2LuevL8fail6Rbfr-s4nQkw560tiiFNNvXmLZU3h-d5GM4tkMg0kahgzVben14bTrLIVs3dxp5yIDLXZLhjANcB4WZpYLO3ro",
    titulo: "Santorini", 
    subtitulo: "Grecia",
    descripcion: "Puestas de sol espectaculares en las islas volcánicas de Grecia.",
  },
  { 
    id: 1, 
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkYPP2yj0hgJBnq9KHhhFzrLa8cw2eoJRIKLTTkNeev4mjhGm24fTSUQihf3nbGzq0qWtW6t8aPwZ6eDr0NQmsrq7EiLlOtahySW7KHkDp22sTOQgeuQX_CXktsqoyU2it2REGyS6ytaeZyr_BjBDgB-b0fkFih2azZczPhfBY8IjbuAjuQx_uTKWK07-rKL5uksSo9MSvVvOnHdS-YGnLJ_yl-MUu9SVMVBU_-L8mLd7UgKbFpG9iJheNpwgach44mDQOE9n6tkA",
    titulo: "Costa Amalfitana", 
    subtitulo: "Italia",
    descripcion: "Acantilados dramáticos y pueblos coloridos en la costa italiana.",
  },
  { 
    id: 2, 
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBblcdXtDz6k0sqnSBdwTK8AlLvUim3ZI1y9MKqz4u_HrT0AR5y1B4Tu-mreo6U8MbeRiUPi2qf6eMdrBsHbYNkbPU6K2Qt7wppJiOXFP332PQkatVIWTFtywGkAH7w3h8DYWTRcsN76eNO_VOm95Zw3XIBlYCKMEEllswbjptcZMQaiyXbeRWETlK4TusldUlLTs4NB9FZcwk8CUk78qrXU98zj6paLPfxt2TFo7klKWrI7YZkIvn-3fSiWD0pjZHJ7ERnebel20M",
    titulo: "Islas Maldivas", 
    subtitulo: "Maldivas", 
    descripcion: "Privacidad absoluta y aguas cristalinas en el corazón del Océano Índico.",
  },
  { 
    id: 3, 
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_w8KL05KnzVo64Lhd8JqIPwltnM4jk1p_oTIWpZ_Z_E-6NUB-hFWT9Q2WLNw2HjA2bMZEcdwMy7DUdrPR9SSc1WSwSnHm6A5Umj2CCCwnrEOlr64CRPkKw7svflZWaHeIGFQVCZB39Ez0FsnA2KcZAHW9iSgYcnAl-_f0pddwKnzpggVizGXodDZvC4stQ9j4wJKC2XhMxVCuvUJj2MwtvNJ108FXG0_hwt-HCkmFGvUEK3YDo7fHFPKbOnMcnrX1DeSh6MUPelE",
    titulo: "Dubái Marina", 
    subtitulo: "EAU",
    descripcion: "Rascacielos futuristas y lujo moderno en el desierto árabe.",
  },
  { 
    id: 4, 
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9f2ltuR0r10x_SFdyVGXzZlLoRoVSHewy6wrLVs1g_GJOAju6ujPctF4FsHK0DnSWzLPzI3bqS6iYwZRQnHO7TlDGOvRVyX-hQCNOUoPN6T0RUt7YJLs8gEiiOLyqMGgL-oJvzz_x0TuHlw3aqc-lRixDVYH6bLjyy44L8Z5JdhOEDekSdp4Fx0bhMQPnyFw48ndZN1THMQVLtnWip-O6yyWwawBpYTt9ahwTmOECxBfMnqbcmpwvTuJx5fgn3indbX6L5F4gz8E",
    titulo: "Riviera Francesa", 
    subtitulo: "Francia",
    descripcion: "Playas glamorosas y vida cosmopolita en la costa mediterránea.",
  }
]

export default function DestinationsCarousel() {
  const [activeIndex, setActiveIndex] = useState(2)
  const [isAnimating, setIsAnimating] = useState(false)

  const getIndex = useCallback((offset: number) => {
    return (activeIndex + offset + destinosDestacados.length) % destinosDestacados.length
  }, [activeIndex])

  const navigate = useCallback((direction: 'prev' | 'next') => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex(prev => 
      direction === 'prev' 
        ? (prev === 0 ? destinosDestacados.length - 1 : prev - 1)
        : (prev + 1) % destinosDestacados.length
    )
    setTimeout(() => setIsAnimating(false), 700)
  }, [isAnimating])

  useEffect(() => {
    const interval = setInterval(() => navigate('next'), 5000)
    return () => clearInterval(interval)
  }, [navigate])

  const getCardStyle = (position: number) => {
    const styles: Record<number, { transform: string; zIndex: number; opacity: number; scale: string }> = {
      [-2]: { 
        transform: 'translateX(-145%) rotateY(25deg)', 
        zIndex: 1, 
        opacity: 0.6,
        scale: '0.7'
      },
      [-1]: { 
        transform: 'translateX(-72%) rotateY(12deg)', 
        zIndex: 2, 
        opacity: 0.9,
        scale: '0.85'
      },
      [0]: { 
        transform: 'translateX(0) rotateY(0deg)', 
        zIndex: 10, 
        opacity: 1,
        scale: '1'
      },
      [1]: { 
        transform: 'translateX(72%) rotateY(-12deg)', 
        zIndex: 2, 
        opacity: 0.9,
        scale: '0.85'
      },
      [2]: { 
        transform: 'translateX(145%) rotateY(-25deg)', 
        zIndex: 1, 
        opacity: 0.6,
        scale: '0.7'
      },
    }
    return styles[position] || { transform: 'translateX(250%)', zIndex: 0, opacity: 0, scale: '0.5' }
  }

  return (
    <section className="bg-[#0e1a34] pb-20 overflow-hidden">
      {/* Carousel Container */}
      <div className="relative h-[550px] md:h-[700px]" style={{ perspective: '1200px' }}>
        {/* Navigation Buttons */}
        <button
          onClick={() => navigate('prev')}
          disabled={isAnimating}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#c9a962]/30 bg-[#0a1628]/80 backdrop-blur-sm flex items-center justify-center text-[#c9a962]/70 hover:text-[#c9a962] hover:border-[#c9a962] transition-all duration-300 disabled:opacity-50"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <button
          onClick={() => navigate('next')}
          disabled={isAnimating}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#c9a962]/30 bg-[#0a1628]/80 backdrop-blur-sm flex items-center justify-center text-[#c9a962]/70 hover:text-[#c9a962] hover:border-[#c9a962] transition-all duration-300 disabled:opacity-50"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Cards Container */}
        <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
          {[-2, -1, 0, 1, 2].map((position) => {
            const destino = destinosDestacados[getIndex(position)]
            const style = getCardStyle(position)
            const isActive = position === 0

            return (
              <div
                key={`${destino.id}-${position}`}
                className="absolute cursor-pointer"
                style={{
                  transform: `${style.transform} scale(${style.scale})`,
                  zIndex: style.zIndex,
                  opacity: style.opacity,
                  transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onClick={() => {
                  if (position < 0) navigate('prev')
                  if (position > 0) navigate('next')
                }}
              >
                <div 
                  className={`
                    relative overflow-hidden rounded-2xl
                    ${isActive 
                      ? 'w-[320px] md:w-[420px] h-[450px] md:h-[560px] ring-2 ring-[#4a9ec8]/50 shadow-2xl shadow-[#4a9ec8]/20' 
                      : 'w-[260px] md:w-[340px] h-[380px] md:h-[480px]'
                    }
                    transition-all duration-500
                  `}
                >
                  {/* Image */}
                  <img
                    src={destino.img}
                    alt={destino.titulo}
                    className="w-full h-full object-cover"
                  />

                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 ${isActive 
                    ? 'bg-gradient-to-t from-[#0a1628] via-[#0a1628]/40 to-transparent' 
                    : 'bg-gradient-to-t from-[#0a1628]/90 via-[#0a1628]/30 to-transparent'
                  }`} />

                  {/* Title at bottom for side cards */}
                  {!isActive && (
                    <div className="absolute bottom-4 left-0 right-0 text-center px-4">
                      <h3 className="text-white font-serif text-lg md:text-xl">{destino.titulo}</h3>
                    </div>
                  )}

                  {/* Content for active card */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                      <h3 className="text-white font-serif text-2xl md:text-3xl mb-2">{destino.titulo}</h3>
                      <p className="text-[#8a9bb3] text-sm mb-6 line-clamp-2">{destino.descripcion}</p>
                      <button className="px-6 py-2.5 rounded-full border border-[#c9a962] text-[#c9a962] text-xs font-semibold uppercase tracking-widest hover:bg-[#c9a962] hover:text-[#0a1628] transition-all duration-300">
                        Explorar Ahora
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {destinosDestacados.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true)
                setActiveIndex(index)
                setTimeout(() => setIsAnimating(false), 700)
              }
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'w-8 bg-[#c9a962]' : 'w-2 bg-[#c9a962]/40 hover:bg-[#c9a962]/60'
            }`}
            aria-label={`Ir al destino ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}