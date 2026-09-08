/**
 * InvoiceHistoryTable.jsx — Tabla de historial de facturas
 * Fuente: code.html L311–353 y lógica renderHistoryTable L813–876
 *
 * Props: invoices, selectedId, onSelectInvoice
 * Key estable: invoice.id (nunca el índice)
 */
import { useState, useMemo } from 'react';
import { calculateInvoiceTotals, formatMoney, formatDateDisplay } from '@features/invoices/services/invoice-calculations';

const STATUS_BADGE = {
  Pagada:   'bg-[#eef4ec] text-[#2d4d29]',
  Pendiente: 'bg-[#fef3eb] text-[#914d18]',
  Emitida:  'bg-surface-container text-on-surface',
};



const STATUS_OPTIONS = ['ALL', 'Emitida', 'Pagada', 'Pendiente'];

/**
 * @param {{
 *   invoices: object[],
 *   selectedId: string,
 *   onSelectInvoice: (id: string) => void,
 * }} props
 */
function InvoiceHistoryTable({ invoices = [], selectedId, onSelectInvoice }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return invoices.filter(inv => {
      const matchSearch = !q
        || inv.code?.toLowerCase().includes(q)
        || inv.client?.name?.toLowerCase().includes(q);
      const matchStatus = statusFilter === 'ALL' || inv.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [invoices, search, statusFilter]);

  return (
    <section className="bg-white rounded-xl shadow-sm border border-outline-variant p-7">
      {/* Encabezado */}
      <div className="flex items-center justify-between pb-5 border-b border-outline-variant mb-5">
        <div>
          <h2 className="text-lg font-semibold text-primary">Historial de Facturas</h2>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Listado de comprobantes registrados y su estado actual
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por cliente o N° factura..."
            className="w-full h-9 pl-9 pr-3 rounded-lg bg-surface border border-outline-variant text-xs text-on-surface focus:outline-none focus:border-secondary"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-9 px-3 rounded-lg bg-surface border border-outline-variant text-xs text-on-surface focus:outline-none focus:border-secondary"
        >
          {STATUS_OPTIONS.map(opt => (
            <option key={opt} value={opt}>
              {opt === 'ALL' ? 'Todos los estados' : opt + 's'}
            </option>
          ))}
        </select>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto rounded-lg border border-outline-variant bg-white">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-surface-container-low/60 text-on-surface-variant font-medium border-b border-outline-variant">
              <th className="py-2.5 px-3 font-normal">N° Factura</th>
              <th className="py-2.5 px-3 font-normal">Cliente</th>
              <th className="py-2.5 px-3 font-normal">Fecha</th>
              <th className="py-2.5 px-3 text-right font-normal">Total</th>
              <th className="py-2.5 px-3 text-center font-normal">Estado</th>
              <th className="py-2.5 px-3 text-center font-normal">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/60">
            {invoices.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-[36px] text-outline block mb-2">
                    receipt_long
                  </span>
                  <p className="font-medium text-sm text-on-surface">No hay facturas registradas</p>
                  <p className="text-xs text-on-surface-variant mt-1">
                    Crea una nueva factura desde el formulario para comenzar.
                  </p>
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-[28px] text-outline block mb-1">
                    search_off
                  </span>
                  <p className="text-xs">No se encontraron facturas que coincidan con la búsqueda.</p>
                </td>
              </tr>
            ) : (
              filtered.map((inv) => {
                const { total } = calculateInvoiceTotals(inv.items, inv.discount, inv.taxRate);
                const isSelected = inv.id === selectedId;
                const badgeClass = STATUS_BADGE[inv.status] ?? STATUS_BADGE.Emitida;

                return (
                  <tr
                    key={inv.id}
                    className={[
                      'cursor-pointer transition-colors',
                      isSelected
                        ? 'bg-[#eef4ec]/60 font-medium'
                        : 'hover:bg-surface-container-low/50',
                    ].join(' ')}
                    onClick={() => onSelectInvoice(inv.id)}
                  >
                    <td className="py-3 px-3 font-mono font-semibold text-primary">{inv.code}</td>
                    <td className="py-3 px-3">
                      <div className="font-medium text-on-surface truncate max-w-[200px]">
                        {inv.client?.name}
                      </div>
                      <div className="text-[11px] text-on-surface-variant font-mono truncate max-w-[200px]">
                        {inv.client?.taxId}
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono text-on-surface-variant text-[11px]">
                      {formatDateDisplay(inv.issueDate)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-semibold text-primary">
                      {formatMoney(total, inv.currency)}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium ${badgeClass}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          title="Ver factura"
                          onClick={(e) => { e.stopPropagation(); onSelectInvoice(inv.id); }}
                          className="p-1 text-secondary hover:bg-surface-container rounded transition-colors"
                        >
                          <span className="material-symbols-outlined text-[17px]">visibility</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default InvoiceHistoryTable;
