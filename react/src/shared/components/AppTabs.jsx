/**
 * AppTabs.jsx — Sub-header con pestañas Editor / Historial
 * Fuente: code.html L142–164
 * Props: activeTab, onTabChange, invoiceCount, totalVolume
 */

const TABS = [
  { key: 'form',    icon: 'edit_note',    label: 'Editor de Factura' },
  { key: 'history', icon: 'receipt_long', label: 'Historial' },
];

/**
 * @param {{
 *   activeTab: 'form' | 'history',
 *   onTabChange: (tab: string) => void,
 *   invoiceCount?: number,
 *   totalVolume?: string,
 * }} props
 */
function AppTabs({ activeTab, onTabChange, invoiceCount = 0, totalVolume = '$0.00' }) {
  return (
    <div className="bg-white/70 border-b border-outline-variant px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 print:hidden">
      {/* Estadísticas rápidas */}
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-on-surface-variant text-xs">Total registradas:</span>
          <span className="font-medium text-on-surface">{invoiceCount} facturas</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-on-surface-variant text-xs">Volumen diario:</span>
          <span className="font-medium text-[#2d4d29] font-mono">{totalVolume}</span>
        </div>
      </div>

      {/* Pestañas */}
      <div className="flex items-center bg-[#eae6dc]/60 p-1 rounded-lg border border-outline-variant/60">
        {TABS.map(({ key, icon, label }) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              type="button"
              className={[
                'px-4 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5',
                isActive
                  ? 'bg-white text-primary shadow-xs font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface',
              ].join(' ')}
              onClick={() => onTabChange(key)}
            >
              <span className="material-symbols-outlined text-[16px]">{icon}</span>
              {label}
              {key === 'history' && invoiceCount > 0 && (
                <span>({invoiceCount})</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default AppTabs;
