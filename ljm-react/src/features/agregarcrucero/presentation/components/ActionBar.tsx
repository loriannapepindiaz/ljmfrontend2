import React from 'react';
import { useTranslation } from 'react-i18next';

interface ActionBarProps {
  onPublish: () => void;
  loading?: boolean;
  error?: string | null;
  success?: boolean;
}

const ActionBar: React.FC<ActionBarProps> = ({ onPublish, loading = false, error = null, success = false }) => {
  const { t } = useTranslation();

  return (
    <div className="sticky bottom-0 bg-white/80 backdrop-blur-md border-t border-slate-200 p-6 px-8 flex flex-col md:flex-row justify-between items-center gap-4 z-30">
      <button className="text-slate-500 hover:text-red-500 font-bold text-sm transition-colors uppercase tracking-widest px-4">
        {t('fleet.add.cancelEdit')}
      </button>

      <div className="flex flex-col items-end gap-2 w-full md:w-auto">
        {error && (
          <p className="text-red-500 text-xs font-semibold">{error}</p>
        )}
        {success && (
          <p className="text-emerald-600 text-xs font-semibold">Crucero creado exitosamente.</p>
        )}
        <div className="flex gap-4 w-full md:w-auto">
          <button className="flex-1 md:flex-none border-2 border-[#0e1a34] text-[#0e1a34] hover:bg-[#0e1a34] hover:text-white font-bold py-3 px-8 rounded-lg transition-all text-sm uppercase tracking-widest">
            {t('fleet.add.saveDraft')}
          </button>
          <button
            onClick={onPublish}
            disabled={loading}
            className="flex-1 md:flex-none bg-[#eacea9] hover:bg-[#d4af37] text-[#0e1a34] font-black py-3 px-10 rounded-lg transition-all shadow-lg text-sm uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-lg">
              {loading ? 'hourglass_empty' : 'directions_boat'}
            </span>
            {loading ? 'Guardando...' : t('fleet.add.publish')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionBar;
