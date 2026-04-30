import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BadgeCheck, Clock3, MapPin, Star } from 'lucide-react';
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
};

const fallbackExperience: SelectedExperience = {
  title: 'Inmersion en Arrecifes de Coral',
  location: 'Arrecifes de Positano',
  rating: '4.9',
  image: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=2000&auto=format&fit=crop',
  description: 'Una expedicion silenciosa a traves de los jardines sumergidos del Mediterraneo.',
};

const staticGallery = {
  detail: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?q=80&w=1200&auto=format&fit=crop',
  equipment: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=900&auto=format&fit=crop',
  yacht: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=900&auto=format&fit=crop',
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
  const title = backendExperience?.nombre ?? selectedExperience.title ?? titleFromSlug ?? fallbackExperience.title;
  const description = backendExperience?.descripcion ?? selectedExperience.description ?? fallbackExperience.description;
  const heroImage = backendExperience?.imagen_url ?? selectedExperience.image ?? fallbackExperience.image;
  const locationLabel = selectedExperience.location ?? backendExperience?.categoria ?? 'Sin datos';
  const price = backendExperience
    ? Number(backendExperience.precio_base) > 0
      ? `$${backendExperience.precio_base}`
      : 'Incluido'
    : 'Sin datos';
  const rating = selectedExperience.rating ?? 'Sin datos';
  const noBackendData = backendChecked && !backendExperience;
  const goToPersonalization = () => {
    navigate('/personalization', {
      state: { selectedActivities: [selectedExperience.title ?? title], focusActivities: true },
    });
  };

  const details = useMemo(
    () => [
      {
        icon: Clock3,
        title: 'Duracion',
        value: 'No registrada',
        text: 'La tabla experiencias no tiene un campo de duracion',
      },
      {
        icon: Star,
        title: 'Nivel',
        value: backendExperience?.categoria ?? 'Sin datos',
        text: backendExperience ? `Calificacion destacada: ${rating}` : 'Sin categoria en backend/BD',
      },
      {
        icon: MapPin,
        title: 'Ubicacion',
        value: locationLabel,
        text: 'Ubicacion enviada desde la experiencia seleccionada',
      },
      {
        icon: BadgeCheck,
        title: 'Precio',
        value: price,
        text: backendExperience?.unidad_cobro ? `Cobro: ${backendExperience.unidad_cobro.replaceAll('_', ' ')}` : 'Sin precio registrado',
      },
    ],
    [backendExperience, locationLabel, price, rating],
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
          {noBackendData && (
            <div className="mt-8 rounded-full border border-[#eacea9]/40 bg-[#0b1730]/70 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#eacea9]">
              Sin datos adicionales en backend/BD
            </div>
          )}
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
          {noBackendData && (
            <p className="mx-auto mt-5 max-w-xl rounded-xl bg-amber-50 px-5 py-3 text-xs font-semibold text-amber-800">
              Esta experiencia se abrio con la informacion local de la tarjeta. No se encontro un registro equivalente en backend/BD.
            </p>
          )}
        </section>

        <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 pb-12 md:grid-cols-[1.18fr_0.82fr]">
          <img
            src={staticGallery.detail}
            alt="Detalle de experiencia marina"
            className="h-[780px] w-full object-cover grayscale"
          />
          <div className="grid gap-6">
            <img
              src={staticGallery.equipment}
              alt="Equipo premium"
              className="h-[370px] w-full object-cover grayscale"
            />
            <img
              src={staticGallery.yacht}
              alt="Yate en aguas azules"
              className="h-[384px] w-full object-cover"
            />
          </div>
        </section>

        <section className="bg-[#0b1730] px-6 py-20 text-white">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
            {details.map((item) => (
              <div key={item.title}>
                <div className="mb-6 flex size-7 items-center justify-center rounded-full bg-[#eacea9] text-[#0b1730]">
                  <item.icon size={14} strokeWidth={2.5} />
                </div>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#eacea9]">{item.title}</p>
                <p className="mt-3 font-['Playfair_Display'] text-lg text-white">{item.value}</p>
                <p className="mt-4 whitespace-pre-line text-xs leading-5 text-white/55">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#f5f6f8] px-6 py-32 text-center">
          <h2 className="font-['Playfair_Display'] text-4xl text-[#101828]">Listo para reservar?</h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-slate-500">
            Las plazas se gestionan segun disponibilidad y datos registrados para cada experiencia.
          </p>
          <button
            onClick={goToPersonalization}
            className="mt-12 bg-[#eacea9] px-16 py-4 text-[10px] font-bold uppercase tracking-[0.28em] text-[#09152b] hover:bg-[#f2dfc5]"
          >
            Personalizar esta experiencia
          </button>
          <p className="mx-auto mt-5 max-w-xl text-xs leading-6 text-slate-500">
            Se abrira personalizacion con esta experiencia seleccionada.
          </p>
          <p className="mt-10 text-[8px] uppercase tracking-[0.26em] text-slate-400">
            Atencion personalizada 24/7 para miembros
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CoralImmersionPage;
