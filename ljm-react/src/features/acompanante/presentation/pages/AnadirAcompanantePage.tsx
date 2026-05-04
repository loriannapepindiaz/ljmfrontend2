import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../home/presentation/components/Navbar';
import Footer from '../../../home/presentation/components/Footer';
import BackButton from '../../../../components/BackButton';
import { loadBookingDraft, type BookingDraft } from '../../../../lib/bookingDraft';

import ExpeditionHero from '../components/ExpeditionHero';
import ResidenceSpecs from '../components/ResidenceSpecs';
import GastronomyPanel from '../components/GastronomyPanel';
import CompanionManifest from '../components/CompanionManifest';
import FinancialStatement from '../components/FinancialStatement';

const AnadirAcompanantePage: React.FC = () => {
  const navigate = useNavigate();
  const [draft, setDraft] = useState<BookingDraft>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    loadBookingDraft()
      .then((bookingDraft) => {
        if (mounted) {
          setDraft(bookingDraft);
        }
      })
      .finally(() => {
        if (mounted) {
          setIsLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="bg-[#F6F7F8] text-[#1E2944] min-h-screen">
      <Navbar />
      <BackButton />
      <main className="pt-32 pb-40 max-w-7xl mx-auto px-6 md:px-12">
        <ExpeditionHero draft={draft} isLoading={isLoading} />

        <section className="mb-32">
          <div className="grid grid-cols-1 gap-10 xl:grid-cols-[1.18fr_0.82fr] xl:items-start">
            <ResidenceSpecs destination={draft.destination} suite={draft.suite} />
            <GastronomyPanel personalization={draft.personalization} />
          </div>
        </section>

        <CompanionManifest companions={draft.companions ?? []} />
        <FinancialStatement draft={draft} />

        <section className="mt-20">
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-[#c9a96c]/30 bg-[linear-gradient(135deg,#fffdf9_0%,#f4ede2_100%)] p-8 shadow-[0_24px_70px_rgba(30,41,68,0.12)] md:p-10">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <p className="text-[10px] uppercase tracking-[0.35em] text-[#9a7a42]">
                  Curaduria de experiencias
                </p>
                <h3
                  className="mt-3 text-3xl text-[#1E2944] md:text-4xl"
                  style={{ fontFamily: 'Noto Serif, serif' }}
                >
                  Descubra experiencias diseñadas para su travesía
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[#1E2944]/65 md:text-base">
                  Complemente su viaje con actividades exclusivas a bordo, seleccionadas
                  para elevar cada momento de su odisea.
                </p>
              </div>

              <button
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#1E2944] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#F3D7A0] shadow-[0_18px_40px_rgba(30,41,68,0.2)] transition hover:-translate-y-1 hover:bg-[#162038]"
                onClick={() => navigate("/personalization")}
                type="button"
              >
                Explorar actividades
                <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AnadirAcompanantePage;
