/**
 * useInvoiceForm.js
 * Hook personalizado: estado, validación y handlers del formulario de factura.
 * El componente InvoiceForm.jsx sólo recibe lo que aquí se expone.
 *
 * Reglas aplicadas (reglas.md):
 *  - Hooks sólo en nivel superior (nunca dentro de condicionales o bucles).
 *  - Prefijo "use" obligatorio.
 *  - Handlers con prefijo "handle".
 *  - Inmutabilidad: nunca mutar state directamente.
 */
import { useState, useCallback, useEffect } from 'react';
import { DEFAULT_TAX_RATE, generateNextInvoiceCode } from '@features/invoices/services/invoice-calculations';

/** Genera un ID de ítem único dentro del draft */
const nextItemId = (() => {
  let counter = 1;
  return () => counter++;
})();

/** Estado inicial del borrador de factura con correlativo automático */
const buildEmptyDraft = (invoices = []) => ({
  code: generateNextInvoiceCode(invoices),
  issueDate: new Date().toISOString().slice(0, 10),
  dueDate: '',
  currency: 'USD',
  taxRate: DEFAULT_TAX_RATE,
  issuerName: 'Andes Logística S.A.C.',
  issuerTaxId: 'RUC: 20491823901',
  issuerAddress: 'Av. Panamericana Sur 4120, Lima • (+51) 1 489-3200',
  clientName: '',
  clientTaxId: '',
  clientEmail: '',
  discount: 0,
  notes: '',
  items: [{ id: nextItemId(), desc: '', qty: 1, price: '' }],
});

/** Reglas de validación — Guard clauses (Bpracticas.md §3) */
const REQUIRED_FIELDS = [
  { key: 'code',          label: 'N° de Factura' },
  { key: 'issueDate',     label: 'Fecha de Emisión' },
  { key: 'issuerName',    label: 'Razón social del emisor' },
  { key: 'issuerTaxId',   label: 'RUC / Identificación del emisor' },
  { key: 'issuerAddress', label: 'Dirección del emisor' },
  { key: 'clientName',    label: 'Razón social del cliente' },
  { key: 'clientTaxId',   label: 'RUC / NIT del cliente' },
  { key: 'clientEmail',   label: 'Correo electrónico del cliente' },
];

function validateDraft(draft) {
  const errors = {};

  REQUIRED_FIELDS.forEach(({ key, label }) => {
    const val = draft[key];
    if (val === undefined || val === null || !val.toString().trim()) {
      errors[key] = `${label} es obligatorio.`;
    }
  });

  if (!draft.items || draft.items.length === 0) {
    errors.general = 'Debe incluir al menos un concepto en la factura.';
  } else {
    draft.items.forEach((item, i) => {
      // 1. Descripción
      if (!item.desc || !item.desc.trim()) {
        errors[`item_desc_${i}`] = 'Descripción requerida.';
      }

      // 2. Cantidad: rechazar vacío, no numérico, 0 o negativos
      const qtyStr = item.qty === null || item.qty === undefined ? '' : String(item.qty).trim();
      const qtyNum = Number(qtyStr);
      if (qtyStr === '') {
        errors[`item_qty_${i}`] = 'Cantidad requerida.';
      } else if (isNaN(qtyNum) || !Number.isFinite(qtyNum)) {
        errors[`item_qty_${i}`] = 'Debe ser numérica.';
      } else if (qtyNum <= 0) {
        errors[`item_qty_${i}`] = 'Debe ser > 0.';
      }

      // 3. Precio unitario: rechazar vacío, no numérico, 0 o negativos
      const priceStr = item.price === null || item.price === undefined ? '' : String(item.price).trim();
      const priceNum = Number(priceStr);
      if (priceStr === '') {
        errors[`item_price_${i}`] = 'Precio requerido.';
      } else if (isNaN(priceNum) || !Number.isFinite(priceNum)) {
        errors[`item_price_${i}`] = 'Debe ser numérico.';
      } else if (priceNum <= 0) {
        errors[`item_price_${i}`] = 'Debe ser > 0.';
      }
    });
  }

  return errors;
}

/**
 * @param {{
 *   onSaveInvoice: (invoice: object) => void,
 *   onDraftChange?: (draft: object) => void,
 *   initialInvoices?: object[],
 * }} options
 */
export function useInvoiceForm({ onSaveInvoice, onDraftChange, initialInvoices = [] }) {
  const [draft, setDraft] = useState(() => buildEmptyDraft(initialInvoices));
  const [errors, setErrors] = useState({});

  // Notificar cambios en el borrador para previsualización en tiempo real
  useEffect(() => {
    onDraftChange?.(draft);
  }, [draft, onDraftChange]);

  /** Actualiza un campo de nivel raíz del draft */
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setDraft(prev => ({ ...prev, [name]: value }));
    setErrors(prev => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  /** Actualiza un campo dentro de un ítem de la lista */
  const handleItemChange = useCallback((id, field, value) => {
    setDraft(prev => {
      const itemIndex = prev.items.findIndex(it => it.id === id);
      if (itemIndex !== -1) {
        setErrors(errs => {
          const errKey = `item_${field}_${itemIndex}`;
          if (!errs[errKey]) return errs;
          const next = { ...errs };
          delete next[errKey];
          return next;
        });
      }
      return {
        ...prev,
        items: prev.items.map(item =>
          item.id === id ? { ...item, [field]: value } : item
        ),
      };
    });
  }, []);

  /** Agrega una fila vacía al final de la lista de ítems */
  const handleAddItem = useCallback(() => {
    setDraft(prev => ({
      ...prev,
      items: [...prev.items, { id: nextItemId(), desc: '', qty: 1, price: 0 }],
    }));
  }, []);

  /**
   * Elimina un ítem por su id.
   * Guard clause: mínimo 1 ítem siempre.
   */
  const handleRemoveItem = useCallback((id) => {
    setDraft(prev => {
      if (prev.items.length <= 1) return prev;
      return { ...prev, items: prev.items.filter(item => item.id !== id) };
    });
    setErrors(prev => {
      const next = {};
      Object.entries(prev).forEach(([key, val]) => {
        if (!key.startsWith('item_')) {
          next[key] = val;
        }
      });
      return next;
    });
  }, []);

  /** Limpia el formulario a su estado vacío */
  const handleReset = useCallback(() => {
    setDraft(buildEmptyDraft(initialInvoices));
    setErrors({});
  }, [initialInvoices]);

  /** Valida y llama a onSaveInvoice con la factura construida */
  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const validationErrors = validateDraft(draft);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const invoice = {
      id: crypto.randomUUID(),
      code: draft.code.trim(),
      issueDate: draft.issueDate,
      dueDate: draft.dueDate,
      currency: draft.currency,
      taxRate: Number(draft.taxRate),
      discount: Number(draft.discount) || 0,
      notes: draft.notes.trim(),
      status: 'Emitida',
      issuer: {
        name: draft.issuerName.trim(),
        taxId: draft.issuerTaxId.trim(),
        address: draft.issuerAddress.trim(),
      },
      client: {
        name: draft.clientName.trim(),
        taxId: draft.clientTaxId.trim(),
        email: draft.clientEmail.trim(),
      },
      items: draft.items.map(({ id, desc, qty, price }) => ({
        id,
        desc: desc.trim(),
        qty: Number(qty),
        price: Number(price),
      })),
    };

    onSaveInvoice(invoice);
    setDraft(buildEmptyDraft(initialInvoices));
    setErrors({});
  }, [draft, onSaveInvoice, initialInvoices]);

  return {
    draft,
    errors,
    handleChange,
    handleItemChange,
    handleAddItem,
    handleRemoveItem,
    handleReset,
    handleSubmit,
  };
}
