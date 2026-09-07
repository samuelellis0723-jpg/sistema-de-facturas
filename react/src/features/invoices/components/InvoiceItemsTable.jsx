/**
 * InvoiceItemsTable.jsx — Tabla de conceptos en la hoja impresa
 * Fuente: code.html L420–435
 * Co-located con InvoicePreview.
 */
import { formatMoney } from '@features/invoices/services/invoice-calculations';

function InvoiceItemsTable({ items, currency }) {
  return (
    <div className="mt-6">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-outline-variant text-on-surface-variant font-medium">
            <th className="py-2.5 px-2 w-8 text-center font-normal">#</th>
            <th className="py-2.5 px-3 font-normal">Descripción</th>
            <th className="py-2.5 px-3 w-16 text-right font-normal">Cant.</th>
            <th className="py-2.5 px-3 w-24 text-right font-normal">Precio</th>
            <th className="py-2.5 px-3 w-24 text-right font-normal">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/50 text-xs">
          {items.map((item, i) => {
            const lineTotal = (Number(item.qty) || 0) * (Number(item.price) || 0);
            return (
              <tr key={item.id} className="hover:bg-surface-container-low/30">
                <td className="py-2.5 px-2 text-center text-outline font-mono text-[11px]">{i + 1}</td>
                <td className="py-2.5 px-3 text-on-surface font-medium">
                  {item.desc || 'Concepto sin descripción'}
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-on-surface-variant">{item.qty}</td>
                <td className="py-2.5 px-3 text-right font-mono text-on-surface-variant">
                  {formatMoney(item.price, currency)}
                </td>
                <td className="py-2.5 px-3 text-right font-mono font-medium text-primary">
                  {formatMoney(lineTotal, currency)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default InvoiceItemsTable;
