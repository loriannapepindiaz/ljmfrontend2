import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AdminSidebar from '../../../gestionreserva/presentation/components/AdminSidebar';
import BasicInfoSection from '../components/BasicInfoSection';
import TechnicalSpecsSection from '../components/TechnicalSpecsSection';
import FacilitiesSection from '../components/FacilitiesSection';
import AccommodationSection from '../components/AccommodationSection';
import SidebarPanel from '../components/SidebarPanel';
import ActionBar from '../components/ActionBar';
import { fleetApi } from '../../../../lib/api';

// IDs reales de la tabla TIPO_CRUCERO en la DB.
const RUTA_KEY_TO_TIPO: Record<string, number> = {
  lujo: 16,
  expedicion: 17,
  familiar: 18,
  aventura: 19,
  clasico: 20,
};

const AgregarCruceroPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const [rutaKey, setRutaKey] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [eslora, setEslora] = useState('');
  const [cubiertas, setCubiertas] = useState('');
  const [tonelaje, setTonelaje] = useState('');
  const [imagenPortadaUrl, setImagenPortadaUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handlePublish = async () => {
    setError(null);
    setSuccess(false);

    const id_tipo_crucero = RUTA_KEY_TO_TIPO[rutaKey];

    if (!nombre.trim()) {
      setError('El nombre del crucero es requerido.');
      return;
    }
    if (!capacidad || Number(capacidad) <= 0) {
      setError('La capacidad debe ser un número positivo.');
      return;
    }
    if (!id_tipo_crucero) {
      setError('Selecciona un tipo de crucero (Lujo, Expedición, etc.).');
      return;
    }

    const payload = {
      nombre: nombre.trim(),
      capacidad_max_pasajeros: Number(capacidad),
      id_tipo_crucero,
      ...(descripcion.trim()      && { descripcion: descripcion.trim() }),
      ...(eslora                  && { eslora_metros: Number(eslora) }),
      ...(cubiertas               && { numero_cubiertas: Number(cubiertas) }),
      ...(tonelaje                && { tonelaje: Number(tonelaje) }),
      ...(imagenPortadaUrl.trim() && { imagen_portada_url: imagenPortadaUrl.trim() }),
    };

    console.log('[AgregarCrucero] POST /api/cruceros payload:', payload);

    setLoading(true);
    try {
      await fleetApi.create(payload);
      setSuccess(true);
      setTimeout(() => navigate('/admin/cruceros'), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear el crucero.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">

        <div className="px-8 pt-6 pb-0">
          <nav className="flex text-sm font-medium text-slate-500 mb-3">
            <a href="#" className="hover:text-[#0e1a34]">{t('fleet.add.breadcrumb')}</a>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-[#0e1a34] font-bold">{t('fleet.add.breadcrumbSub')}</span>
          </nav>
          <h2 className="text-4xl font-bold text-[#0e1a34] tracking-tight">{t('fleet.add.title')}</h2>
          <p className="text-slate-500 mt-2">{t('fleet.add.subtitle')}</p>
        </div>

        <div className="p-8 grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            <BasicInfoSection
              nombre={nombre}
              onNombreChange={setNombre}
              capacidad={capacidad}
              onCapacidadChange={setCapacidad}
              rutaKey={rutaKey}
              onRutaKeyChange={setRutaKey}
            />
            <TechnicalSpecsSection
              cubiertas={cubiertas}
              onCubiertasChange={setCubiertas}
              eslora={eslora}
              onEsloraChange={setEslora}
              tonelaje={tonelaje}
              onTonelajeChange={setTonelaje}
            />
            <FacilitiesSection />
            <AccommodationSection />
          </div>
          <div>
            <SidebarPanel
              descripcion={descripcion}
              onDescripcionChange={setDescripcion}
              imagenPortadaUrl={imagenPortadaUrl}
              onImagenPortadaUrlChange={setImagenPortadaUrl}
            />
          </div>
        </div>

        <ActionBar
          onPublish={handlePublish}
          loading={loading}
          error={error}
          success={success}
        />
      </main>
    </div>
  );
};

export default AgregarCruceroPage;
