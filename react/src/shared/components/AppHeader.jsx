/**
 * AppHeader.jsx — Barra superior sticky
 * Fuente: code.html L103–140
 */

const PERIOD_OPTIONS = [
  { value: '2025-Q2', label: '2025 · Q2 (Abr - Jun)' },
  { value: '2025-Q1', label: '2025 · Q1 (Ene - Mar)' },
  { value: '2024-Q4', label: '2024 · Q4 (Oct - Dic)' },
];

/**
 * @param {{
 *   period: string,
 *   onPeriodChange: (value: string) => void,
 *   isPeriodOpen?: boolean,
 *   userName?: string,
 *   userRole?: string,
 *   userInitials?: string,
 * }} props
 */
function AppHeader({
  period = '2025-Q2',
  onPeriodChange,
  isPeriodOpen = true,
  userName = 'M. Fernández',
  userRole = 'Contabilidad General',
  userInitials = 'MF',
}) {
  return (
    <header className="h-16 bg-white border-b border-outline-variant px-8 sticky top-0 z-40 flex items-center justify-between print:hidden">
      {/* Selector de período */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-on-surface">
          <span className="material-symbols-outlined text-outline text-[20px]">calendar_today</span>
          <span className="text-on-surface-variant font-medium">Período:</span>
          <select
            className="bg-transparent font-medium text-on-surface text-sm border-0 focus:ring-0 cursor-pointer p-0 pr-6"
            value={period}
            onChange={(e) => onPeriodChange?.(e.target.value)}
          >
            {PERIOD_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <span className="text-outline-variant text-base font-light">|</span>

        {/* Badge de período fiscal */}
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#eef4ec] text-[#365330]">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: isPeriodOpen ? '#467e3c' : '#e57373' }}
          />
          {isPeriodOpen ? 'Período fiscal abierto' : 'Período fiscal cerrado'}
        </span>
      </div>

      {/* Perfil y acciones rápidas */}
      <div className="flex items-center gap-4">
        <button
          className="w-9 h-9 flex items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors"
          title="Notificaciones"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">notifications</span>
        </button>
        <button
          className="w-9 h-9 flex items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors"
          title="Ayuda"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">help_outline</span>
        </button>

        <div className="h-6 w-px bg-outline-variant mx-1" />

        <div className="flex items-center gap-3 pl-1">
          <div className="text-right">
            <p className="text-sm font-semibold text-on-surface leading-tight">{userName}</p>
            <p className="text-xs text-on-surface-variant">{userRole}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#394d35] text-white flex items-center justify-center text-sm font-medium">
            {userInitials}
          </div>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
