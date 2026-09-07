/**
 * InvoiceForm.jsx — Formulario de emisión de facturas
 * Fuente: code.html L171–309
 *
 * Este componente es declarativo puro:
 *  - Toda la lógica vive en useInvoiceForm (hook).
 *  - Solo renderiza JSX y delega eventos a los handlers del hook.
 *  - SRP: < 200 líneas, un único propósito.
 */
import { useInvoiceForm } from '@features/invoices/hooks/useInvoiceForm';
import { formatMoney } from '@features/invoices/services/invoice-calculations';

/** Clases base de input del diseño Stitch */
const INPUT_BASE = 'w-full h-9 px-3 rounded-md bg-white border border-outline-variant text-xs text-on-surface focus:outline-none focus:border-secondary transition-colors';
const INPUT_LG = 'w-full h-10 px-3 rounded-lg bg-surface border border-outline-variant text-sm focus:bg-white focus:outline-none focus:border-secondary transition-colors';
const ERROR_MSG = 'mt-1 text-[11px] text-error';

/** Muestra un mensaje de error inline si existe */
function FieldError({ message }) {
  if (!message) return null;
  return <p className={ERROR_MSG}>{message}</p>;
}

/**
 * @param {{
 *   onSaveInvoice: (invoice: object) => void,
 *   onDraftChange?: (draft: object) => void,
 *   existingInvoices?: object[],
 * }} props
 */
function InvoiceForm({ onSaveInvoice, onDraftChange, existingInvoices = [] }) {
  const {
    draft, errors,
    handleChange, handleItemChange,
    handleAddItem, handleRemoveItem,
    handleReset, handleSubmit,
  } = useInvoiceForm({
    onSaveInvoice,
    onDraftChange,
    initialInvoices: existingInvoices,
  });

  return (
    <section className="bg-white rounded-xl shadow-sm border border-outline-variant p-7">
      {/* Encabezado de sección */}
      <div className="flex items-center justify-between pb-5 border-b border-outline-variant mb-6">
        <div>
          <h1 className="text-lg font-semibold text-primary tracking-tight">Nueva Factura Comercial</h1>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Ingresa los datos para emitir y previsualizar en tiempo real
          </p>
        </div>
        <button
          type="button"
          className="text-xs font-medium text-secondary hover:text-primary flex items-center gap-1 px-3 py-1.5 rounded-md border border-outline-variant hover:bg-surface-container-low transition-colors"
          onClick={handleReset}
        >
          <span className="material-symbols-outlined text-[16px]">restart_alt</span>
          Limpiar datos
        </button>
      </div>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
        {/* 1. Metadatos clave */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-on-surface-variant mb-1.5" htmlFor="code">
              N° de Factura
            </label>
            <input id="code" name="code" type="text" value={draft.code}
              onChange={handleChange} required
              className={`${INPUT_LG} font-mono font-semibold text-primary ${errors.code ? 'border-error' : ''}`}
              placeholder="FAC-2025-0000"
            />
            <FieldError message={errors.code} />
          </div>
          <div>
            <label className="block text-xs font-medium text-on-surface-variant mb-1.5" htmlFor="issueDate">
              Fecha Emisión
            </label>
            <input id="issueDate" name="issueDate" type="date" value={draft.issueDate}
              onChange={handleChange}
              className={`${INPUT_LG} font-mono text-xs ${errors.issueDate ? 'border-error' : ''}`}
            />
            <FieldError message={errors.issueDate} />
          </div>
          <div>
            <label className="block text-xs font-medium text-on-surface-variant mb-1.5" htmlFor="dueDate">
              Vencimiento
            </label>
            <input id="dueDate" name="dueDate" type="date" value={draft.dueDate}
              onChange={handleChange}
              className={`${INPUT_LG} font-mono text-xs`}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-on-surface-variant mb-1.5">Moneda e IVA</label>
            <div className="grid grid-cols-2 gap-1.5">
              <select name="currency" value={draft.currency} onChange={handleChange}
                className="h-10 px-2 rounded-lg bg-surface border border-outline-variant text-xs font-medium text-on-surface focus:bg-white focus:outline-none focus:border-secondary">
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="PEN">PEN (S/)</option>
                <option value="MXN">MXN ($)</option>
              </select>
              <select name="taxRate" value={draft.taxRate} onChange={handleChange}
                className="h-10 px-2 rounded-lg bg-surface border border-outline-variant text-xs font-medium text-on-surface focus:bg-white focus:outline-none focus:border-secondary">
                <option value="0.18">18%</option>
                <option value="0.16">16%</option>
                <option value="0.19">19%</option>
                <option value="0.21">21%</option>
                <option value="0.13">13%</option>
                <option value="0.00">0%</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2. Emisor y Cliente */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Emisor */}
          <div className="p-4 rounded-xl bg-surface-container-low/50 border border-outline-variant flex flex-col gap-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
              <span className="material-symbols-outlined text-[17px] text-secondary">business</span>
              <span>Datos del Emisor</span>
            </div>
            <div>
              <label className="block text-[11px] text-on-surface-variant mb-1 font-medium" htmlFor="issuerName">Razón social</label>
              <input id="issuerName" name="issuerName" type="text" value={draft.issuerName} onChange={handleChange}
                className={`${INPUT_BASE} ${errors.issuerName ? 'border-error' : ''}`} placeholder="Empresa emisora S.A." />
              <FieldError message={errors.issuerName} />
            </div>
            <div>
              <label className="block text-[11px] text-on-surface-variant mb-1 font-medium" htmlFor="issuerTaxId">RUC / Identificación Fiscal</label>
              <input id="issuerTaxId" name="issuerTaxId" type="text" value={draft.issuerTaxId} onChange={handleChange}
                className={`${INPUT_BASE} font-mono ${errors.issuerTaxId ? 'border-error' : ''}`} placeholder="RUC: 00000000000" />
              <FieldError message={errors.issuerTaxId} />
            </div>
            <div>
              <label className="block text-[11px] text-on-surface-variant mb-1 font-medium" htmlFor="issuerAddress">Dirección comercial</label>
              <input id="issuerAddress" name="issuerAddress" type="text" value={draft.issuerAddress} onChange={handleChange}
                className={`${INPUT_BASE} ${errors.issuerAddress ? 'border-error' : ''}`} placeholder="Calle y ciudad" />
              <FieldError message={errors.issuerAddress} />
            </div>
          </div>

          {/* Cliente */}
          <div className="p-4 rounded-xl bg-surface-container-low/50 border border-outline-variant flex flex-col gap-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
              <span className="material-symbols-outlined text-[17px] text-secondary">person</span>
              <span>Datos del Cliente</span>
            </div>
            <div>
              <label className="block text-[11px] text-on-surface-variant mb-1 font-medium" htmlFor="clientName">Razón social / Nombre cliente</label>
              <input id="clientName" name="clientName" type="text" value={draft.clientName} onChange={handleChange} required
                className={`${INPUT_BASE} ${errors.clientName ? 'border-error' : ''}`}
                placeholder="Empresa o persona natural" />
              <FieldError message={errors.clientName} />
            </div>
            <div>
              <label className="block text-[11px] text-on-surface-variant mb-1 font-medium" htmlFor="clientTaxId">RUC / NIT / Tax ID</label>
              <input id="clientTaxId" name="clientTaxId" type="text" value={draft.clientTaxId} onChange={handleChange}
                className={`${INPUT_BASE} font-mono ${errors.clientTaxId ? 'border-error' : ''}`} placeholder="Ej. 20554189024" />
              <FieldError message={errors.clientTaxId} />
            </div>
            <div>
              <label className="block text-[11px] text-on-surface-variant mb-1 font-medium" htmlFor="clientEmail">Correo electrónico / Contacto</label>
              <input id="clientEmail" name="clientEmail" type="text" value={draft.clientEmail} onChange={handleChange}
                className={`${INPUT_BASE} ${errors.clientEmail ? 'border-error' : ''}`} placeholder="contacto@cliente.com" />
              <FieldError message={errors.clientEmail} />
            </div>
          </div>
        </div>

        {/* 3. Conceptos y servicios */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-primary">
              Conceptos y Servicios ({draft.items.length})
            </span>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-on-surface-variant">Descuento global:</span>
              <div className="flex items-center gap-1 bg-surface px-2.5 py-1 rounded-md border border-outline-variant">
                <span className="text-on-surface-variant font-mono">$</span>
                <input name="discount" type="number" min="0" step="0.01"
                  value={draft.discount} onChange={handleChange}
                  className="w-16 bg-transparent font-mono text-xs text-right text-on-surface focus:outline-none" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-outline-variant bg-white">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-surface-container-low/60 text-on-surface-variant font-medium border-b border-outline-variant">
                  <th className="py-2.5 px-3 w-10 text-center font-normal">#</th>
                  <th className="py-2.5 px-3 font-normal">Descripción</th>
                  <th className="py-2.5 px-3 w-24 text-right font-normal">Cant.</th>
                  <th className="py-2.5 px-3 w-28 text-right font-normal">Precio Unit.</th>
                  <th className="py-2.5 px-3 w-28 text-right font-normal">Total</th>
                  <th className="py-2.5 px-2 w-10" />
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/60">
                {draft.items.map((item, index) => {
                  const lineTotal = (Number(item.qty) || 0) * (Number(item.price) || 0);
                  const hasDescError = !!errors[`item_desc_${index}`];
                  const hasQtyError = !!errors[`item_qty_${index}`];
                  const hasPriceError = !!errors[`item_price_${index}`];

                  return (
                    <tr key={item.id} className="hover:bg-surface-container-low/40 transition-colors">
                      <td className="py-2.5 px-3 text-center text-outline font-mono text-[11px] align-top">{index + 1}</td>
                      <td className="py-2 px-3 align-top">
                        <input type="text" value={item.desc}
                          onChange={(e) => handleItemChange(item.id, 'desc', e.target.value)}
                          placeholder="Concepto o descripción..."
                          className={`w-full px-2 py-1 bg-transparent border hover:border-outline-variant focus:border-secondary focus:bg-white rounded text-xs text-on-surface focus:outline-none transition-colors ${hasDescError ? 'border-error' : 'border-transparent'}`}
                        />
                        <FieldError message={errors[`item_desc_${index}`]} />
                      </td>
                      <td className="py-2 px-3 text-right align-top">
                        <input type="number" min="1" step="1" value={item.qty}
                          onChange={(e) => handleItemChange(item.id, 'qty', e.target.value)}
                          className={`w-20 text-right px-2 py-1 bg-transparent border hover:border-outline-variant focus:border-secondary focus:bg-white rounded font-mono text-xs text-on-surface focus:outline-none transition-colors ${hasQtyError ? 'border-error' : 'border-transparent'}`}
                        />
                        <FieldError message={errors[`item_qty_${index}`]} />
                      </td>
                      <td className="py-2 px-3 text-right align-top">
                        <input type="number" min="0" step="0.01" value={item.price}
                          onChange={(e) => handleItemChange(item.id, 'price', e.target.value)}
                          className={`w-24 text-right px-2 py-1 bg-transparent border hover:border-outline-variant focus:border-secondary focus:bg-white rounded font-mono text-xs text-on-surface focus:outline-none transition-colors ${hasPriceError ? 'border-error' : 'border-transparent'}`}
                        />
                        <FieldError message={errors[`item_price_${index}`]} />
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-medium text-primary text-xs align-top">
                        {formatMoney(lineTotal, draft.currency)}
                      </td>
                      <td className="py-2.5 px-2 text-center align-top">
                        <button type="button" title="Eliminar ítem"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-outline hover:text-error p-1 rounded transition-colors">
                          <span className="material-symbols-outlined text-[17px]">close</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <FieldError message={errors.general} />

          <button type="button" onClick={handleAddItem}
            className="self-start px-3.5 py-2 rounded-lg text-xs font-medium text-secondary hover:bg-secondary/10 border border-outline-variant flex items-center gap-1.5 transition-colors">
            <span className="material-symbols-outlined text-[16px]">add</span>
            Agregar concepto
          </button>
        </div>

        {/* 4. Notas */}
        <div>
          <label className="block text-xs font-medium text-on-surface-variant mb-1.5" htmlFor="notes">
            Condiciones de Pago y Notas
          </label>
          <input id="notes" name="notes" type="text" value={draft.notes} onChange={handleChange}
            className="w-full h-10 px-3.5 rounded-lg bg-surface border border-outline-variant text-xs text-on-surface focus:bg-white focus:outline-none focus:border-secondary transition-colors"
            placeholder="Ej. Transferencia bancaria a 30 días…" />
        </div>

        {/* 5. Acciones */}
        <div className="flex items-center justify-between pt-4 border-t border-outline-variant">
          <button type="button"
            className="px-4 py-2.5 rounded-lg border border-outline-variant text-on-surface hover:bg-surface text-xs font-medium transition-colors">
            Guardar Borrador
          </button>
          <button type="submit"
            className="px-5 py-2.5 rounded-lg bg-secondary hover:bg-primary text-white text-xs font-semibold shadow-xs flex items-center gap-2 transition-all active:scale-95">
            <span className="material-symbols-outlined text-[17px]">check_circle</span>
            Guardar y Emitir Factura
          </button>
        </div>
      </form>
    </section>
  );
}

export default InvoiceForm;
