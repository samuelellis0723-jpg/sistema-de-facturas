/**
 * AppSidebar.jsx — Navegación lateral fija
 * Fuente: code.html L53–99
 * Props dinámicas: brandName, brandSubtitle, syncStatus, navItems, footerInfo
 */

/** @param {{ icon: string, label: string, isActive: boolean, onClick?: () => void }} props */
function NavLink({ icon, label, isActive, onClick }) {
  const base = 'flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm transition-colors w-full text-left focus:outline-none focus:ring-0';
  const active = 'bg-white/10 text-white font-medium';
  const inactive = 'text-[#a8bda4] hover:bg-white/5 hover:text-white';

  return (
    <button
      type="button"
      className={`${base} ${isActive ? active : inactive}`}
      onClick={onClick}
    >
      <span
        className="material-symbols-outlined text-[20px] shrink-0"
        style={isActive ? { color: '#9dc597' } : {}}
      >
        {icon}
      </span>
      <span className="truncate">{label}</span>
    </button>
  );
}

/**
 * @param {{
 *   activeNav: string,
 *   onNavChange: (key: string) => void,
 *   companyName?: string,
 *   companySubtitle?: string,
 *   isSynced?: boolean,
 *   statusLabel?: string,
 *   syncPercent?: string,
 *   normativeLabel?: string,
 *   normativeVersion?: string,
 * }} props
 */
function AppSidebar({
  activeNav = 'emision',
  onNavChange,
  companyName = 'FacturaFlow',
  companySubtitle = 'LEDGEREASE CORE',
  isSynced = true,
  statusLabel = 'DB ONLINE',
  syncPercent = 'Sync 100%',
  normativeLabel = 'Facturación Electrónica',
  normativeVersion = 'v4.8 Activa',
}) {
  const navItems = [
    { key: 'emision',   icon: 'edit_document',  label: 'Emisión de Facturas' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-primary-container text-[#b5c7b1] z-50 flex flex-col justify-between shadow-sm print:hidden select-none">
      <div className="flex flex-col">
        {/* Logo marca */}
        <div className="px-6 pt-7 pb-6 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-white shadow-sm shrink-0">
            <span className="material-symbols-outlined text-[20px]">receipt_long</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[17px] font-semibold text-white tracking-tight leading-tight">
              {companyName}
            </span>
            <span className="text-[11px] text-[#8ea48a] font-normal uppercase tracking-wide mt-0.5">{companySubtitle}</span>
          </div>
        </div>

        {/* Estado de sincronización */}
        <div className="px-5 mb-4">
          <div className="px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-xs text-[#a2b59e]">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: isSynced ? '#83d475' : '#e57373' }}
              />
              <span className="text-[11px] font-semibold tracking-wider">{isSynced ? statusLabel : 'OFFLINE'}</span>
            </div>
            <span className="font-mono text-[11px] text-[#869b82]">
              {isSynced ? syncPercent : 'Sync —'}
            </span>
          </div>
        </div>

        {/* Navegación */}
        <nav className="flex flex-col gap-1 px-3">
          {navItems.map(({ key, icon, label }) => (
            <NavLink
              key={key}
              icon={icon}
              label={label}
              isActive={activeNav === key}
              onClick={() => onNavChange?.(key)}
            />
          ))}
        </nav>
      </div>

      {/* Pie del sidebar — normativa fiscal */}
      <div className="p-5">
        <div className="p-3.5 rounded-lg bg-white/5 border border-white/5 flex flex-col gap-1 text-xs">
          <span className="text-[#7c9478] uppercase text-[10px] font-medium tracking-wider">
            Normativa Fiscal
          </span>
          <span className="text-white font-medium">{normativeLabel}</span>
          <span className="text-[#8ba287] font-mono text-[11px]">{normativeVersion}</span>
        </div>
      </div>
    </aside>
  );
}

export default AppSidebar;
