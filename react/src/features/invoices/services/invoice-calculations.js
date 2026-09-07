/**
 * invoice-calculations.js
 * Funciones puras para cálculos financieros de facturas.
 * Sin efectos secundarios — sin imports de React.
 *
 * Fuente de verdad: code.html L605–612 (calculateTotals)
 */

/** Tasa de IVA por defecto — ajusta según normativa fiscal local */
export const DEFAULT_TAX_RATE = 0.18;

/** Símbolos de moneda soportados */
export const CURRENCY_SYMBOLS = { USD: '$', EUR: '€', PEN: 'S/', MXN: '$' };

/**
 * Calcula el subtotal bruto de una lista de ítems.
 * @param {Array<{qty: number, price: number}>} items
 * @returns {number}
 */
export function calculateSubtotal(items) {
  return items.reduce((acc, item) => {
    const qty = Math.max(0, Number(item.qty) || 0);
    const price = Math.max(0, Number(item.price) || 0);
    return acc + qty * price;
  }, 0);
}

/**
 * Calcula el monto de impuesto sobre la base imponible.
 * @param {number} taxableBase - subtotal ya descontado
 * @param {number} rate - tasa decimal (ej. 0.18 para 18%)
 * @returns {number}
 */
export function calculateTax(taxableBase, rate) {
  const base = Math.max(0, Number(taxableBase) || 0);
  const r = Math.max(0, Number(rate) || 0);
  return base * r;
}

/**
 * Calcula el total a pagar.
 * @param {number} taxableBase
 * @param {number} tax
 * @returns {number}
 */
export function calculateTotal(taxableBase, tax) {
  return Math.max(0, Number(taxableBase) || 0) + Math.max(0, Number(tax) || 0);
}

/**
 * Calcula todos los totales de una factura de una sola vez.
 * @param {Array} items
 * @param {number} discount
 * @param {number} taxRate
 * @returns {{ subtotal: number, discount: number, taxableBase: number, tax: number, total: number }}
 */
export function calculateInvoiceTotals(items, discount, taxRate) {
  const subtotal = calculateSubtotal(items);
  const disc = Math.max(0, Math.min(Number(discount) || 0, subtotal));
  const taxableBase = Math.max(0, subtotal - disc);
  const tax = calculateTax(taxableBase, taxRate);
  const total = calculateTotal(taxableBase, tax);
  return { subtotal, discount: disc, taxableBase, tax, total };
}

/**
 * Formatea un número como moneda localizada.
 * @param {number} amount
 * @param {string} currency - código ISO (USD, EUR, PEN, MXN)
 * @returns {string}
 */
export function formatMoney(amount, currency = 'USD') {
  const symbol = CURRENCY_SYMBOLS[currency] ?? '$';
  const num = Number(amount) || 0;
  return `${symbol}${num.toLocaleString('es-PE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Formatea una fecha ISO (YYYY-MM-DD) a DD/MM/YYYY.
 * @param {string} isoDate
 * @returns {string}
 */
export function formatDateDisplay(isoDate) {
  if (!isoDate) return '--/--/----';
  const parts = isoDate.split('-');
  return parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : isoDate;
}

/**
 * Genera el siguiente código correlativo de factura basado en las existentes.
 * @param {Array<{code: string}>} invoices
 * @returns {string}
 */
export function generateNextInvoiceCode(invoices = []) {
  const currentYear = new Date().getFullYear();
  let maxNum = 40;

  if (Array.isArray(invoices)) {
    invoices.forEach(inv => {
      if (inv && inv.code) {
        const match = String(inv.code).match(/FAC-\d{4}-(\d+)/);
        if (match) {
          const num = parseInt(match[1], 10);
          if (!isNaN(num) && num > maxNum) {
            maxNum = num;
          }
        }
      }
    });
  }

  return `FAC-${currentYear}-${String(maxNum + 1).padStart(4, '0')}`;
}

/**
 * Convierte el estado de un borrador en un objeto de factura compatible con InvoicePreview.
 * @param {object} draft
 * @returns {object|null}
 */
export function formatDraftForPreview(draft) {
  if (!draft) return null;

  return {
    id: 'draft-preview',
    code: draft.code || 'FAC-2025-0000',
    issueDate: draft.issueDate || new Date().toISOString().slice(0, 10),
    dueDate: draft.dueDate || '',
    currency: draft.currency || 'USD',
    taxRate: Number(draft.taxRate) || DEFAULT_TAX_RATE,
    discount: Number(draft.discount) || 0,
    notes: draft.notes || '',
    status: 'Emitida',
    issuer: {
      name: draft.issuerName || 'Empresa Emisora',
      taxId: draft.issuerTaxId || 'RUC: —',
      address: draft.issuerAddress || 'Dirección comercial',
    },
    client: {
      name: draft.clientName || 'Nombre del Cliente',
      taxId: draft.clientTaxId || 'RUC / NIT: —',
      email: draft.clientEmail || '—',
    },
    items: Array.isArray(draft.items) && draft.items.length > 0
      ? draft.items.map((it, idx) => ({
          id: it.id || idx + 1,
          desc: it.desc || 'Concepto sin descripción',
          qty: Number(it.qty) || 0,
          price: Number(it.price) || 0,
        }))
      : [{ id: 1, desc: 'Concepto', qty: 1, price: 0 }],
  };
}
