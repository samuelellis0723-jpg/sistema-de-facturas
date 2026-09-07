/**
 * InvoiceTotals.jsx — Bloque de notas, totales y pie formal
 * Fuente: code.html L437–476
 * Co-located con InvoicePreview.
 */
import { formatMoney } from '@features/invoices/services/invoice-calculations';

/**
 * @param {{
 *   notes: string,
 *   subtotal: number,
 *   discount: number,
 *   tax: number,
 *   total: number,
 *   taxRate: number,
 *   currency: string,
 * }} props
 */
function InvoiceTotals({ notes, subtotal, discount, tax, total, taxRate, currency }) {
  const taxRateLabel = `${Math.round(Number(taxRate) * 100)}%`;
  const hasDiscount = discount > 0;

  return (
    <div className="pt-6 border-t border-outline-variant mt-8 break-inside-avoid">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
        {/* Notas y firma electrónica */}
        <div className="sm:col-span-7 space-y-2">
          <div className="p-3 rounded-lg bg-surface-container-low/60 border border-outline-variant">
            <span className="text-[11px] font-medium text-secondary block mb-1">Notas y condiciones</span>
            <p className="text-xs text-on-surface leading-relaxed">
              {notes || 'Sin observaciones adicionales.'}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-outline pt-1">
            <span className="material-symbols-outlined text-[15px]">verified</span>
            <span>Documento tributario digital con firma electrónica válida.</span>
          </div>
        </div>

        {/* Totales */}
        <div className="sm:col-span-5 flex flex-col gap-1.5 bg-surface-container-low/60 p-4 rounded-lg border border-outline-variant">
          <div className="flex justify-between items-center text-xs">
            <span className="text-on-surface-variant">Subtotal:</span>
            <span className="font-mono font-medium text-on-surface">{formatMoney(subtotal, currency)}</span>
          </div>

          {hasDiscount && (
            <div className="flex justify-between items-center text-xs text-error">
              <span>Descuento:</span>
              <span className="font-mono font-medium">-{formatMoney(discount, currency)}</span>
            </div>
          )}

          <div className="flex justify-between items-center text-xs">
            <span className="text-on-surface-variant">Impuesto ({taxRateLabel}):</span>
            <span className="font-mono font-medium text-on-surface">{formatMoney(tax, currency)}</span>
          </div>

          <div className="pt-2 border-t border-outline-variant flex justify-between items-baseline mt-1">
            <span className="text-xs font-semibold text-primary">Total a pagar:</span>
            <span className="text-base font-bold font-mono text-primary">{formatMoney(total, currency)}</span>
          </div>
        </div>
      </div>

      {/* Pie formal */}
      <div className="flex items-center justify-between pt-5 mt-5 border-t border-outline-variant/60 text-[11px] text-outline">
        <span>FacturaFlow v4.8</span>
        <span>Página 1 de 1</span>
      </div>
    </div>
  );
}

export default InvoiceTotals;
