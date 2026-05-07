import React from 'react';
import type { ReportesData } from '../../data/reportesService';

type Props = { data: ReportesData | null; loading: boolean };

const formatCurrency = (v: number) =>
  `$${v.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

const formatPercent = (v: number) =>
  `${Number.isFinite(v) ? v.toFixed(v % 1 === 0 ? 0 : 1) : '0'}%`;

const Skeleton: React.FC = () => (
  <div className="h-8 w-28 bg-slate-100 rounded animate-pulse mt-1" />
);

const StarRating: React.FC<{ score: number }> = ({ score }) => (
  <div className="flex items-center gap-0.5 mt-1">
    {[1, 2, 3, 4, 5].map((i) => (
      <span
        key={i}
        className="text-[18px] leading-none"
        style={{ color: i <= Math.round(score) ? '#eacea9' : '#e2e8f0' }}
      >
        ★
      </span>
    ))}
  </div>
);

const ReportesKPIs: React.FC<Props> = ({ data, loading }) => {
  const growth = data?.crecimiento_reservas ?? 0;
  const satisfaction = data?.satisfaccion_cliente ?? 0;
  const satisfactionTotal = data?.satisfaccion_total ?? 0;
  const growthPositive = growth >= 0;
  const growthLabel = growth === 0 ? '0%' : `${growthPositive ? '+' : ''}${formatPercent(growth)}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

      {/* Ingresos Mensuales */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-green-50 text-green-600 rounded-lg">
            <span className="material-symbols-outlined">account_balance_wallet</span>
          </div>
          {!loading && (
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
              Período seleccionado
            </span>
          )}
        </div>
        <p className="text-slate-500 text-sm font-medium">Ingresos Mensuales</p>
        {loading ? <Skeleton /> : (
          <h3 className="text-2xl font-bold text-[#0e1a34] mt-1">
            {formatCurrency(data?.ingresos_mensuales ?? 0)}
          </h3>
        )}
      </div>

      {/* Tasa de Ocupación */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <span className="material-symbols-outlined">meeting_room</span>
          </div>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            Ocupación
          </span>
        </div>
        <p className="text-slate-500 text-sm font-medium">Tasa de Ocupación</p>
        {loading ? <Skeleton /> : (
          <h3 className="text-2xl font-bold text-[#0e1a34] mt-1">
            {formatPercent(data?.tasa_ocupacion ?? 0)}
          </h3>
        )}
      </div>

      {/* Satisfacción Cliente */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-amber-50 text-amber-500 rounded-lg">
            <span className="material-symbols-outlined">sentiment_satisfied</span>
          </div>
          {!loading && (
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
              {`${satisfactionTotal} reseña${satisfactionTotal !== 1 ? 's' : ''}`}
            </span>
          )}
        </div>
        <p className="text-slate-500 text-sm font-medium">Satisfacción Cliente</p>
        {loading ? <Skeleton /> : satisfaction > 0 ? (
          <>
            <h3 className="text-2xl font-bold text-[#0e1a34] mt-1">{satisfaction}/5</h3>
            <StarRating score={satisfaction} />
          </>
        ) : (
          <h3 className="text-2xl font-bold text-slate-300 mt-1">Sin reseñas</h3>
        )}
      </div>

      {/* Crecimiento Reservas */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-2 rounded-lg ${growthPositive ? 'bg-[#0e1a34]/5 text-[#0e1a34]' : 'bg-red-50 text-red-500'}`}>
            <span className="material-symbols-outlined">
              {growthPositive ? 'trending_up' : 'trending_down'}
            </span>
          </div>
          <div className="w-12 h-6 overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 100 40">
              <path d="M0 35 Q 25 35, 40 20 T 80 5 T 100 10" fill="none" stroke="#0e1a34" strokeWidth="3" />
            </svg>
          </div>
        </div>
        <p className="text-slate-500 text-sm font-medium">Crecimiento Reservas</p>
        {loading ? <Skeleton /> : (
          <h3 className={`text-2xl font-bold mt-1 ${growthPositive ? 'text-[#0e1a34]' : 'text-red-500'}`}>
            {growthLabel}
          </h3>
        )}
      </div>

    </div>
  );
};

export default ReportesKPIs;
