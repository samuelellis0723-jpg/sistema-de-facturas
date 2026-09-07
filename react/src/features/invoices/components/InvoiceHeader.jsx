/**
 * InvoiceHeader.jsx — Membrete superior de la hoja A4
 * Fuente: code.html L382–418 (issuer block + invoice code block + client block)
 * Co-located con InvoicePreview.
 */
import { formatDateDisplay } from '@features/invoices/services/invoice-calculations';

const STATUS_STYLES = {
  Pagada:   'bg-[#eef4ec] text-[#2d4d29]',
  Pendiente: 'bg-[#fef3eb] text-[#914d18]',
  Emitida:   'bg-surface-container text-on-surface',
};

function InvoiceHeader({ invoice }) {
  const { issuer, client, code, issueDate, dueDate, currency, status } = invoice;
  const statusClass = STATUS_STYLES[status] ?? STATUS_STYLES.Emitida;

  return (
    <>
      {/* Membrete superior — emisor + código de factura */}
      <div className="flex justify-between items-start pb-6 border-b border-outline-variant gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-lg bg-[#243324] text-white flex items-center justify-center shadow-xs mt-0.5">
            <span className="material-symbols-outlined text-[24px]">apartment</span>
          </div>
          <div>
            <h2 className="text-base font-bold text-primary tracking-tight leading-tight">
              {issuer.name || 'Empresa Emisora'}
            </h2>
            <p className="font-mono text-xs text-on-surface-variant mt-0.5">{issuer.taxId}</p>
            <p className="text-xs text-on-surface-variant max-w-[260px] leading-relaxed mt-1">
              {issuer.address}
            </p>
          </div>
        </div>

        {/* Identificador de factura */}
        <div className="text-right">
          <span className="text-[11px] font-medium text-secondary block">Factura Electrónica</span>
          <span className="text-base font-bold font-mono text-primary tracking-tight">{code}</span>
          <div className="text-xs text-on-surface-variant mt-1.5 font-mono space-y-0.5">
            <div>Emisión: <span className="text-on-surface font-medium">{formatDateDisplay(issueDate)}</span></div>
            <div>Vencimiento: <span className="text-on-surface font-medium">{formatDateDisplay(dueDate)}</span></div>
          </div>
        </div>
      </div>

      {/* Bloque cliente + estado */}
      <div className="grid grid-cols-2 gap-6 py-6 border-b border-outline-variant">
        <div>
          <span className="text-[11px] font-medium text-secondary uppercase tracking-wider block mb-1">
            Facturado a
          </span>
          <div className="text-sm font-semibold text-primary">{client.name || 'Cliente'}</div>
          <div className="font-mono text-xs text-on-surface-variant mt-0.5">{client.taxId}</div>
          <div className="text-xs text-on-surface-variant mt-0.5">{client.email}</div>
        </div>
        <div className="flex flex-col items-end justify-center">
          <span className="text-[11px] font-medium text-on-surface-variant mb-1.5">Estado del documento</span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusClass}`}>{status}</span>
          <span className="text-xs font-mono text-on-surface-variant mt-2">
            Moneda: {currency} {currency === 'USD' ? '($)' : currency === 'EUR' ? '(€)' : currency === 'PEN' ? '(S/)' : '($)'}
          </span>
        </div>
      </div>
    </>
  );
}

export default InvoiceHeader;
