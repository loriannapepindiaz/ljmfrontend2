import React from 'react';

interface Metric {
  label: string;
  value: string;
}

interface MetricsGridProps {
  metrics: Metric[];
}

const MetricsGrid: React.FC<MetricsGridProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric) => (
        <div key={metric.label} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            {metric.label}
          </p>
          <p className="text-3xl font-bold text-[#0e1a34]">{metric.value}</p>
        </div>
      ))}
    </div>
  );
};

export default MetricsGrid;