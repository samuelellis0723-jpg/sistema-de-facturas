/**
 * useInvoices.js
 * Hook que centraliza el listado de facturas y la factura seleccionada.
 * Expone acciones inmutables para InvoicesPage.
 */
import { useState, useCallback, useEffect } from 'react';
import { getInvoicesApi, createInvoiceApi } from '@features/invoices/services/invoice-api';

/** Datos de ejemplo iniciales alineados con code.html L489–562 */
const INITIAL_INVOICES = [
  {
    id: 'FAC-2025-0041',
    code: 'FAC-2025-0041',
    issueDate: '2025-04-10',
    dueDate: '2025-05-10',
    currency: 'USD',
    taxRate: 0.18,
    discount: 50.00,
    notes: 'Pago a 30 días. Transferencia vía BCP Dólares.',
    status: 'Pagada',
    issuer: {
      name: 'Andes Logística S.A.C.',
      taxId: 'RUC: 20491823901',
      address: 'Av. Panamericana Sur 4120, Lima • (+51) 1 489-3200',
    },
    client: {
      name: 'Distribuidora Global del Pacífico',
      taxId: 'RUC: 20119283741',
      email: 'pagos@pacificoglobal.com · Miraflores',
    },
    items: [
      { id: 1, desc: 'Transporte refrigerado de carga perecible (Ruta Arequipa-Callao)', qty: 2, price: 1200.00 },
      { id: 2, desc: 'Seguro de tránsito de mercancías especiales', qty: 1, price: 350.00 },
    ],
  },
  {
    id: 'FAC-2025-0042',
    code: 'FAC-2025-0042',
    issueDate: '2025-04-14',
    dueDate: '2025-04-30',
    currency: 'USD',
    taxRate: 0.18,
    discount: 0.00,
    notes: 'Condición de pago contra entrega de guía remisión sellada.',
    status: 'Pendiente',
    issuer: {
      name: 'Andes Logística S.A.C.',
      taxId: 'RUC: 20491823901',
      address: 'Av. Panamericana Sur 4120, Lima • (+51) 1 489-3200',
    },
    client: {
      name: 'Comercializadora Textil Andina',
      taxId: 'NIT: 900214829-1',
      email: 'contabilidad@textilandina.com',
    },
    items: [
      { id: 1, desc: 'Servicio de embalaje técnico y consolidación de hilados', qty: 45, price: 28.00 },
      { id: 2, desc: 'Almacenaje temporal en nave fiscal (15 días)', qty: 1, price: 650.00 },
    ],
  },
  {
    id: 'FAC-2025-0043',
    code: 'FAC-2025-0043',
    issueDate: '2025-04-18',
    dueDate: '2025-05-18',
    currency: 'USD',
    taxRate: 0.18,
    discount: 0.00,
    notes: 'Transferencia bancaria a 30 días calendario. Banco BCP Cta Cte USD: 191-8842901-0-22.',
    status: 'Emitida',
    issuer: {
      name: 'Andes Logística S.A.C.',
      taxId: 'RUC: 20491823901',
      address: 'Av. Panamericana Sur 4120, Lima • (+51) 1 489-3200',
    },
    client: {
      name: 'Pacific AgroExport International',
      taxId: 'RUC: 20554189024',
      email: 'cuentas@pacificagro.pe · San Isidro, D.F.',
    },
    items: [
      { id: 1, desc: 'Flete marítimo consolidado Container 40ft (Callao - Guayaquil)', qty: 1, price: 2100.00 },
      { id: 2, desc: 'Trámite aduanero y despacho de exportación agrícola', qty: 1, price: 420.00 },
      { id: 3, desc: 'Inspección fitosanitaria y certificación SENASA', qty: 1, price: 180.00 },
    ],
  },
];

const STORAGE_KEY = 'facturaflow_invoices';
const SELECTED_ID_KEY = 'facturaflow_selected_id';

/** Lee facturas almacenadas en localStorage de forma segura con fallback */
function loadStoredInvoices() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_INVOICES;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_INVOICES;
  } catch (err) {
    console.warn('No se pudieron leer facturas de localStorage:', err);
    return INITIAL_INVOICES;
  }
}

/** Lee el ID seleccionado en localStorage de forma segura con fallback */
function loadStoredSelectedId(fallbackId) {
  try {
    const stored = localStorage.getItem(SELECTED_ID_KEY);
    return stored || fallbackId;
  } catch {
    return fallbackId;
  }
}

export function useInvoices() {
  const [invoices, setInvoices] = useState(loadStoredInvoices);
  const [selectedId, setSelectedId] = useState(() => {
    const initialList = loadStoredInvoices();
    return loadStoredSelectedId(initialList[0]?.id ?? 'FAC-2025-0043');
  });

  // Sincronizar con el servidor db.json al iniciar si json-server está corriendo
  useEffect(() => {
    let isMounted = true;
    getInvoicesApi().then((serverInvoices) => {
      if (isMounted && serverInvoices && serverInvoices.length > 0) {
        setInvoices(serverInvoices);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Guardar en localStorage en cada cambio del arreglo de facturas
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
    } catch (err) {
      console.warn('Error al persistir facturas en localStorage:', err);
    }
  }, [invoices]);

  // Guardar en localStorage en cada cambio de la factura seleccionada
  useEffect(() => {
    try {
      if (selectedId) {
        localStorage.setItem(SELECTED_ID_KEY, selectedId);
      }
    } catch (err) {
      console.warn('Error al persistir selectedId en localStorage:', err);
    }
  }, [selectedId]);

  const selectedInvoice = invoices.find(inv => inv.id === selectedId) ?? invoices[0] ?? null;

  /** Agrega una factura nueva de forma inmutable, la selecciona y la persiste en db.json */
  const addInvoice = useCallback((invoice) => {
    setInvoices(prev => [invoice, ...prev]);
    setSelectedId(invoice.id);
    createInvoiceApi(invoice);
  }, []);

  const selectInvoice = useCallback((id) => {
    setSelectedId(id);
  }, []);

  return {
    invoices,
    selectedInvoice,
    selectedId,
    addInvoice,
    selectInvoice,
  };
}
