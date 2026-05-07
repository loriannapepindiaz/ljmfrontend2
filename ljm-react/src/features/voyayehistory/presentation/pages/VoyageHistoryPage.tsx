import React, { useEffect, useState } from 'react';
import BackButton from '../../../../components/BackButton';
import Navbar from '../../../home/presentation/components/Navbar';
import Footer from '../../../home/presentation/components/Footer';
import UpcomingVoyageCard from '../components/UpcomingVoyageCard';
import VoyageHistoryList from '../components/VoyageHistoryList';
import LoyaltySection from '../components/LoyaltySection';
import { getLocalVoyageHistoryData, voyageHistoryApi, type VoyageHistoryData } from '../voyageHistoryData';

const VoyageHistoryPage: React.FC = () => {
  const [historyData, setHistoryData] = useState<VoyageHistoryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;
    let didTimeout = false;
    const localHistoryData = getLocalVoyageHistoryData();
    const timeoutId = window.setTimeout(() => {
      didTimeout = true;
      controller.abort();
    }, 12000);

    setHistoryData(localHistoryData);
    setIsLoading(!localHistoryData);
    setError(null);

    voyageHistoryApi.current(controller.signal)
      .then((response) => {
        if (!isActive) return;

        setHistoryData(response.data);
      })
      .catch((requestError) => {
        if (!isActive) return;

        if (controller.signal.aborted && didTimeout) {
          setError(
            localHistoryData
              ? null
              : 'El historial está tardando demasiado en responder. Verifica que el backend esté encendido e intenta de nuevo.',
          );
          return;
        }

        setError(
          localHistoryData
            ? null
            : requestError instanceof Error
              ? requestError.message
              : 'No se pudo cargar el historial de viajes.',
        );
      })
      .finally(() => {
        if (!isActive) return;

        window.clearTimeout(timeoutId);
        setIsLoading(false);
      });

    return () => {
      isActive = false;
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  const visibleMemberCode = historyData?.client.memberCode ?? getLocalVoyageHistoryData()?.client.memberCode ?? null;

  return (
    <div className="bg-[#f6f7f8] text-[#0e1a34] min-h-screen">
      <Navbar />
      <BackButton topClass="top-24" />
      <main className="pt-28 px-8 pb-12">
        <div className="max-w-6xl mx-auto">

          <header className="mb-10 pt-10">
            <h1 className="text-4xl font-bold text-[#0e1a34] mb-2" style={{ fontFamily: 'Newsreader, serif' }}>
              Historial de Viajes
            </h1>
            <p className="text-slate-500 max-w-2xl">
              Reviva sus travesías por alta mar y prepare su próxima expedición con la flota LJM Sealine.
            </p>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-[#0e1a34]/60">
              {visibleMemberCode ? `ID miembro ${visibleMemberCode}` : 'ID de miembro pendiente'}
            </p>
          </header>

          {error ? (
            <div className="mb-8 rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
              {error}
            </div>
          ) : null}

          <UpcomingVoyageCard reservation={historyData?.upcomingReservation ?? null} isLoading={isLoading && !historyData?.upcomingReservation} />
          <VoyageHistoryList items={historyData?.travelHistory ?? []} isLoading={isLoading} />
          <LoyaltySection data={historyData} isLoading={isLoading} />

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VoyageHistoryPage;
