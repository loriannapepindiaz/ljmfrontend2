import React from 'react';
import { useTranslation } from 'react-i18next';

interface PagosMetricsProps {
  totalIncome: number;
  pendingAmount: number;
  refundsAmount: number;
  monthlyGrowth: number;
  loading?: boolean;
}

const fmt = (n: number) =>
  `$${Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const Skeleton: React.FC = () => (
  <div className="h-8 w-28 bg-slate-100 rounded animate-pulse mt-1" />
);

const PagosMetrics: React.FC<PagosMetricsProps> = ({
  totalIncome,
  pendingAmount,
  refundsAmount,
  monthlyGrowth,
  loading,
}) => {
  const { t } = useTranslation();

  const growthLabel = monthlyGrowth === 0
    ? '0%'
    : `${monthlyGrowth > 0 ? '+' : ''}${monthlyGrowth.toFixed(1)}%`;

  const growthPositive = monthlyGrowth >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

      {/* Ingresos Totales */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-green-50 text-green-600 rounded-lg">
            <span className="material-symbols-outlined">payments</span>
          </div>
          {!loading && (
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${growthPositive ? 'text-green-600 bg-green-50' : 'text-red-500 bg-red-50'}`}>
              {growthLabel}
            </span>
          )}
        </div>
        <p className="text-slate-500 text-sm font-medium">{t('payments.metrics.totalIncome')}</p>
        {loading ? <Skeleton /> : <h3 className="text-2xl font-bold text-[#0e1a34] mt-1">{fmt(totalIncome)}</h3>}
      </div>

      {/* Pagos Pendientes */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
            <span className="material-symbols-outlined">pending_actions</span>
          </div>
          <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
            {t('payments.filters.pending')}
          </span>
        </div>
        <p className="text-slate-500 text-sm font-medium">{t('payments.metrics.pending')}</p>
        {loading ? <Skeleton /> : <h3 className="text-2xl font-bold text-[#0e1a34] mt-1">{fmt(pendingAmount)}</h3>}
      </div>

      {/* Reembolsos */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-red-50 text-red-600 rounded-lg">
            <span className="material-symbols-outlined">undo</span>
          </div>
          <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">
            {t('payments.filters.refunded')}
          </span>
        </div>
        <p className="text-slate-500 text-sm font-medium">{t('payments.metrics.refunds')}</p>
        {loading ? <Skeleton /> : <h3 className="text-2xl font-bold text-[#0e1a34] mt-1">{fmt(refundsAmount)}</h3>}
      </div>

      {/* Crecimiento Mensual */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-[#0e1a34]/5 text-[#0e1a34] rounded-lg">
            <span className={`material-symbols-outlined ${growthPositive ? '' : 'text-red-500'}`}>
              {growthPositive ? 'trending_up' : 'trending_down'}
            </span>
          </div>
          <div className="w-12 h-6 overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 100 40">
              <path d="M0 35 Q 25 35, 40 20 T 80 5 T 100 10" fill="none" stroke="#0e1a34" strokeWidth="3" />
            </svg>
          </div>
        </div>
        <p className="text-slate-500 text-sm font-medium">{t('payments.metrics.monthlyGrowth')}</p>
        {loading
          ? <Skeleton />
          : <h3 className={`text-2xl font-bold mt-1 ${growthPositive ? 'text-[#0e1a34]' : 'text-red-500'}`}>{growthLabel}</h3>
        }
      </div>

    </div>
  );
};

export default PagosMetrics;
