/**
 * InvoicesPage.jsx — Página principal de gestión de facturas
 *
 * Responsabilidades:
 *  - Centraliza el estado de facturas (useInvoices).
 *  - Renderiza el split-view: formulario/historial + preview.
 *  - Conecta AppShell con las features de invoices.
 *
 * Flujo completo:
 *   Crear factura → aparece en historial → se muestra en el preview.
 */
import { useState, useCallback } from 'react';
import AppShell from '@app/AppShell';
import InvoiceForm from '@features/invoices/components/InvoiceForm';
import InvoicePreview from '@features/invoices/components/InvoicePreview';
import InvoiceHistoryTable from '@features/invoices/components/InvoiceHistoryTable';
import { useInvoices } from '@features/invoices/hooks/useInvoices';
import {
  calculateInvoiceTotals,
  formatMoney,
  formatDraftForPreview,
} from '@features/invoices/services/invoice-calculations';

function InvoicesPage() {
  const { invoices, selectedInvoice, selectedId, addInvoice, selectInvoice } = useInvoices();

  const [activeTab, setActiveTab] = useState('form');
  const [activeNav, setActiveNav] = useState('emision');
  const [period, setPeriod] = useState('2025-Q2');
  const [liveDraft, setLiveDraft] = useState(null);

  /** Guarda la factura, la agrega al historial y la selecciona en el preview */
  const handleSaveInvoice = useCallback((invoice) => {
    addInvoice(invoice);
    setActiveTab('history');
  }, [addInvoice]);

  /** Calcula el volumen total para el sub-header */
  const totalVolume = formatMoney(
    invoices.reduce((acc, inv) => {
      const { total } = calculateInvoiceTotals(inv.items, inv.discount, inv.taxRate);
      return acc + total;
    }, 0),
    'USD'
  );

  /**
   * En la pestaña 'form' se muestra el borrador en tiempo real.
   * En la pestaña 'history' se muestra la factura seleccionada del historial.
   */
  const displayedInvoice = (activeTab === 'form' && liveDraft)
    ? formatDraftForPreview(liveDraft)
    : selectedInvoice;

  return (
    <AppShell
      activeNav={activeNav}
      onNavChange={setActiveNav}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      period={period}
      onPeriodChange={setPeriod}
      invoiceCount={invoices.length}
      totalVolume={totalVolume}
    >
      {/* Split view: code.html L167 — grid xl:12 cols */}
      <div className="max-w-workspace mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8 items-start print:block print:w-full print:max-w-none">
        {/* Columna izquierda: formulario o historial según activeTab (oculta en impresión) */}
        <div className="xl:col-span-6 flex flex-col gap-6 print:hidden">
          {activeTab === 'form' ? (
            <InvoiceForm
              onSaveInvoice={handleSaveInvoice}
              onDraftChange={setLiveDraft}
              existingInvoices={invoices}
            />
          ) : (
            <InvoiceHistoryTable
              invoices={invoices}
              selectedId={selectedId}
              onSelectInvoice={selectInvoice}
            />
          )}
        </div>

        {/* Columna derecha: preview A4 siempre visible (ancho completo en impresión) */}
        <div className="xl:col-span-6 flex flex-col items-center print:block print:w-full print:max-w-none">
          <InvoicePreview
            invoice={displayedInvoice}
          />
        </div>
      </div>
    </AppShell>
  );
}

export default InvoicesPage;
