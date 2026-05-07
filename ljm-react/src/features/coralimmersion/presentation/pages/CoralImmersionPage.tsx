import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BadgeCheck, Clock3, Star } from 'lucide-react';
import Navbar from '../../../home/presentation/components/Navbar';
import Footer from '../../../home/presentation/components/Footer';
import { experienceApi, type Experience } from '../../../../lib/api';
import BackButton from '../../../../components/BackButton';

type SelectedExperience = {
  id?: string | number;
  title?: string;
  location?: string;
  rating?: string;
  image?: string;
  description?: string;
  price?: number;
};

const fallbackExperience: SelectedExperience = {
  title: 'Inmersion en Arrecifes de Coral',
  location: 'Arrecifes de Positano',
  rating: '4.9',
  image: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=2000&auto=format&fit=crop',
  description: 'Una expedición silenciosa a través de los jardines sumergidos del Mediterráneo.',
};

type Gallery = { detail: string; equipment: string; yacht: string };

const staticGallery: Gallery = {
  detail: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?q=80&w=1200&auto=format&fit=crop',
  equipment: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=900&auto=format&fit=crop',
  yacht: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=900&auto=format&fit=crop',
};

const galleryBySlug: Record<string, Gallery> = {
  'tirolesa-sobre-el-mar': {
    detail: 'https://www.ncl.com/sites/default/files/blog-hero-best-places-zipline.jpg',
    equipment: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=900&auto=format&fit=crop',
    yacht: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=900&auto=format&fit=crop',
  },
  'tour-privado': {
    detail: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=1260',
    equipment: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=900&auto=format&fit=crop',
    yacht: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=900&auto=format&fit=crop',
  },
  'jet-ski': {
    detail: 'https://images.pexels.com/photos/18972198/pexels-photo-18972198.jpeg?auto=compress&cs=tinysrgb&w=1260',
    equipment: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=900&auto=format&fit=crop',
    yacht: 'https://images.unsplash.com/photo-1559494007-9f5847c49d94?q=80&w=900&auto=format&fit=crop',
  },
  'buceo-premium': {
    detail: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop',
    equipment: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=900&auto=format&fit=crop',
    yacht: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?q=80&w=900&auto=format&fit=crop',
  },
  'spa-bienestar': {
    detail: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1260',
    equipment: 'https://images.pexels.com/photos/3757954/pexels-photo-3757954.jpeg?auto=compress&cs=tinysrgb&w=900',
    yacht: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=900&auto=format&fit=crop',
  },
  'velero-sunset': {
    detail: 'https://images.unsplash.com/photo-1500514966906-fe245eea9344?q=80&w=1200&auto=format&fit=crop',
    equipment: 'https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&cs=tinysrgb&w=900',
    yacht: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=900&auto=format&fit=crop',
  },
  'snorkel-guiado': {
    detail: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=80&w=1200&auto=format&fit=crop',
    equipment: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?q=80&w=900&auto=format&fit=crop',
    yacht: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=900&auto=format&fit=crop',
  },
  'kayak': {
    detail: 'https://images.pexels.com/photos/1497584/pexels-photo-1497584.jpeg?auto=compress&cs=tinysrgb&w=1260',
    equipment: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=900&auto=format&fit=crop',
    yacht: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=900&auto=format&fit=crop',
  },
};

const slugToTitle = (value?: string) =>
  value
    ?.split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const CoralImmersionPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams();
  const stateExperience = (location.state as { experience?: SelectedExperience } | null)?.experience;
  const [backendExperience, setBackendExperience] = useState<Experience | null>(null);
  const [backendChecked, setBackendChecked] = useState(false);

  const titleFromSlug = slugToTitle(slug);
  const selectedExperience = stateExperience ?? (titleFromSlug ? { title: titleFromSlug } : fallbackExperience);
  const gallery = galleryBySlug[slug ?? ''] ?? staticGallery;
  const title = backendExperience?.nombre ?? selectedExperience.title ?? titleFromSlug ?? fallbackExperience.title;
  const description = backendExperience?.descripcion ?? selectedExperience.description ?? fallbackExperience.description;
  const heroImage = selectedExperience.image ?? backendExperience?.imagen_url ?? fallbackExperience.image;
  const rawPrice = backendExperience
    ? Number(backendExperience.precio_base)
    : (selectedExperience.price ?? null);
  const price = rawPrice === null
    ? 'Sin datos'
    : rawPrice > 0
      ? `€${rawPrice}`
      : 'Incluido';
  const rating = selectedExperience.rating ?? 'Sin datos';
  const noBackendData = backendChecked && !backendExperience;
  const details = useMemo(
    () => [
      {
        icon: Clock3,
        title: 'Duración',
        value: 'No registrada',
        text: '',
      },
      {
        icon: Star,
        title: 'Nivel',
        value: backendExperience?.categoria ?? selectedExperience.location ?? 'Sin datos',
        text: rating !== 'Sin datos' ? `Calificación: ${rating}` : '',
      },
      {
        icon: BadgeCheck,
        title: 'Precio',
        value: price,
        text: backendExperience?.unidad_cobro
          ? backendExperience.unidad_cobro.replace('por_', 'Por ').replace('_', ' ')
          : '',
      },
    ],
    [backendExperience, price, rating, selectedExperience.location],
  );

  useEffect(() => {
    let isMounted = true;
    setBackendChecked(false);
    setBackendExperience(null);

    const loadExperience = async () => {
      try {
        if (selectedExperience.id) {
          const response = await experienceApi.getById(selectedExperience.id);
          if (isMounted) setBackendExperience(response.data);
          return;
        }

        const searchName = selectedExperience.title ?? titleFromSlug;

        if (!searchName) {
          return;
        }

        const response = await experienceApi.list({ nombre: searchName });
        if (isMounted) setBackendExperience(response.data[0] ?? null);
      } catch {
        if (isMounted) setBackendExperience(null);
      } finally {
        if (isMounted) setBackendChecked(true);
      }
    };

    loadExperience();

    return () => {
      isMounted = false;
    };
  }, [selectedExperience.id, selectedExperience.title, titleFromSlug]);

  return (
    <div className="min-h-screen bg-white font-['Public_Sans'] text-[#09152b]">
      <Navbar />
      <BackButton />

      <section className="relative min-h-screen overflow-hidden bg-[#071321] pt-20 text-white">
        <img
          src={heroImage}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#041121]/45" />

        <div className="relative z-10 flex min-h-[76vh] flex-col items-center justify-center px-6 text-center">
          <h1 className="max-w-4xl font-['Playfair_Display'] text-6xl leading-[0.9] text-white drop-shadow-lg md:text-8xl">
            {title}
          </h1>
          <p className="mt-7 max-w-3xl font-['Playfair_Display'] text-lg italic text-white md:text-2xl">
            {description}
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center">
          <p className="text-[8px] font-bold uppercase tracking-[0.45em] text-white/70">Resumen</p>
          <span className="mt-2 block text-lg leading-none text-white">v</span>
        </div>
      </section>

      <main>
        <section className="mx-auto max-w-3xl px-6 py-28 text-center">
          <p className="mb-6 text-[8px] font-bold uppercase tracking-[0.52em] text-[#a88b5f]">
            Experiencia seleccionada
          </p>
          <h2 className="font-['Playfair_Display'] text-3xl text-[#101828] md:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-slate-600">
            {description}
          </p>
        </section>

        <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 pb-12 md:grid-cols-[1.18fr_0.82fr]">
          <img
            src={gallery.detail}
            alt="Detalle de experiencia marina"
            className="h-[780px] w-full object-cover"
          />
          <div className="grid gap-6">
            <img
              src={gallery.equipment}
              alt="Equipo premium"
              className="h-[370px] w-full object-cover"
            />
            <img
              src={gallery.yacht}
              alt="Yate en aguas azules"
              className="h-[384px] w-full object-cover"
            />
          </div>
        </section>

        <section className="bg-[#0b1730] px-6 py-20 text-white">
          <div className="mx-auto max-w-7xl">
            <p className="mb-14 text-center text-[8px] font-bold uppercase tracking-[0.52em] text-[#eacea9]/40">
              Detalles de la experiencia
            </p>
            <div className="flex flex-col sm:flex-row items-stretch justify-center divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              {details.map((item) => (
                <div key={item.title} className="flex flex-col items-center text-center px-24 py-10 sm:py-0 w-full sm:w-1/3">
                  <div className="mb-6 flex size-14 items-center justify-center rounded-full bg-[#eacea9]/10 border border-[#eacea9]/25 text-[#eacea9]">
                    <item.icon size={20} strokeWidth={1.5} />
                  </div>
                  <p className="text-[8px] font-bold uppercase tracking-[0.38em] text-[#eacea9]/55 mb-4">{item.title}</p>
                  <p className="font-['Playfair_Display'] text-3xl text-white mb-2">{item.value}</p>
                  {item.text && (
                    <p className="text-xs text-white/35 tracking-wide mt-1">{item.text}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f5f6f8] px-6 py-32 text-center">
          <h2 className="font-['Playfair_Display'] text-4xl text-[#101828]">¿Listo para reservar?</h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-slate-500">
            Las plazas se gestionan según disponibilidad y datos registrados para cada experiencia.
          </p>
          <button
            onClick={() => navigate('/destinations')}
            className="mt-12 bg-[#eacea9] px-16 py-4 text-[10px] font-bold uppercase tracking-[0.28em] text-[#09152b] hover:bg-[#f2dfc5]"
          >
            Ver destinos disponibles
          </button>
          <p className="mt-10 text-[8px] uppercase tracking-[0.26em] text-slate-400">
            Atención personalizada 24/7 para miembros
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CoralImmersionPage;
