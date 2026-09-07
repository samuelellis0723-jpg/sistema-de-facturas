/**
 * InvoicePreview.jsx — Hoja A4 de previsualización de factura
 * Fuente: code.html L356–479
 *
 * Este componente es puramente presentacional:
 *   - Recibe la factura completa por props.
 *   - Consume calculateInvoiceTotals() de services.
 *   - Delega secciones a sub-componentes co-located (< 200 líneas cada uno).
 *
 * Estilos @media print: ocultan sidebar, header y toolbar para PDF limpio.
 */
import { calculateInvoiceTotals } from '@features/invoices/services/invoice-calculations';
import InvoiceHeader from './InvoiceHeader';
import InvoiceItemsTable from './InvoiceItemsTable';
import InvoiceTotals from './InvoiceTotals';

/**
 * @param {{
 *   invoice: object | null,
 *   onPrint?: () => void,
 *   onMarkPaid?: () => void,
 *   onEmail?: () => void,
 * }} props
 */
function InvoicePreview({ invoice, onPrint, onMarkPaid, onEmail }) {
  if (!invoice) {
    return (
      <div className="w-full max-w-[650px] flex items-center justify-center min-h-[300px] rounded-xl border border-outline-variant bg-white text-on-surface-variant text-sm">
        <div className="text-center">
          <span className="material-symbols-outlined text-[40px] text-outline block mb-2">receipt_long</span>
          <p>Selecciona o crea una factura para previsualizar</p>
        </div>
      </div>
    );
  }

  const { subtotal, discount, tax, total } = calculateInvoiceTotals(
    invoice.items,
    invoice.discount,
    invoice.taxRate
  );

  const isPaid = invoice.status === 'Pagada';

  return (
    <div className="w-full flex flex-col items-center print:block print:w-full">
      {/* Barra de herramientas de la hoja — oculta en impresión */}
      <div className="w-full max-w-[650px] mb-3 flex items-center justify-between px-1 print:hidden">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#467e3c]" />
          <span className="text-xs font-medium text-on-surface-variant">Vista previa A4</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            title="Imprimir / Guardar en PDF"
            onClick={() => { onPrint?.(); window.print(); }}
            className="h-8 px-3 rounded-md bg-white border border-outline-variant hover:bg-surface text-xs font-medium text-on-surface flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px] text-outline">print</span>
            PDF
          </button>
          <button
            type="button"
            onClick={onMarkPaid}
            className="h-8 px-3 rounded-md bg-[#eef4ec] border border-[#d6e5d3] hover:bg-[#e2edd0] text-xs font-semibold text-[#2d4d29] flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            {isPaid ? 'Marcar pendiente' : 'Marcar pagada'}
          </button>
          <button
            type="button"
            onClick={onEmail}
            className="h-8 px-3 rounded-md bg-white border border-outline-variant hover:bg-surface text-xs font-medium text-on-surface flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px] text-outline">mail</span>
            Enviar
          </button>
        </div>
      </div>

      {/* Hoja A4 — canvas blanco */}
      <div
        id="invoice-print-root"
        className="w-full max-w-[650px] bg-white rounded-xl shadow-md border border-outline-variant/80 p-9 flex flex-col justify-between min-h-[820px] transition-all print:rounded-none print:shadow-none print:border-none print:p-0 print:max-w-none print:min-h-0"
      >
        <div>
          <InvoiceHeader invoice={invoice} />
          <InvoiceItemsTable items={invoice.items} currency={invoice.currency} />
        </div>

        <InvoiceTotals
          notes={invoice.notes}
          subtotal={subtotal}
          discount={discount}
          tax={tax}
          total={total}
          taxRate={invoice.taxRate}
          currency={invoice.currency}
        />
      </div>
    </div>
  );
}

export default InvoicePreview;
