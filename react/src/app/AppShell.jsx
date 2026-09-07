/**
 * AppShell.jsx — Composición del layout base de la aplicación
 * Jerarquía (reglas.md §1): Componentes → AppShell → InvoicesPage → App
 *
 * Compone: AppSidebar + AppHeader + AppTabs + <main> con children.
 */
import AppSidebar from '@shared/components/AppSidebar';
import AppHeader from '@shared/components/AppHeader';
import AppTabs from '@shared/components/AppTabs';

/**
 * @param {{
 *   activeNav: string,
 *   onNavChange: (key: string) => void,
 *   activeTab: string,
 *   onTabChange: (tab: string) => void,
 *   period: string,
 *   onPeriodChange: (value: string) => void,
 *   invoiceCount: number,
 *   totalVolume: string,
 *   children: React.ReactNode,
 * }} props
 */
function AppShell({
  activeNav,
  onNavChange,
  activeTab,
  onTabChange,
  period,
  onPeriodChange,
  invoiceCount,
  totalVolume,
  children,
}) {
  return (
    <div className="bg-[#f8f7f4] font-sans text-on-surface antialiased min-h-screen print:bg-white print:min-h-0">
      <AppSidebar activeNav={activeNav} onNavChange={onNavChange} />

      {/* Contenido principal desplazado por el ancho del sidebar (w-64) */}
      <div className="pl-64 min-h-screen flex flex-col print:pl-0 print:min-h-0 print:block">
        <AppHeader period={period} onPeriodChange={onPeriodChange} />
        <AppTabs
          activeTab={activeTab}
          onTabChange={onTabChange}
          invoiceCount={invoiceCount}
          totalVolume={totalVolume}
        />

        <main className="flex-1 p-8 print:p-0 print:m-0">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AppShell;
