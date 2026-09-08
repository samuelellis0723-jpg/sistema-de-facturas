/**
 * invoice-api.js
 * Servicio de comunicación con la API REST de facturas (json-server).
 * Base URL: http://localhost:3001/invoices
 *
 * Proporciona métodos para:
 *  - Obtener todas las facturas (GET /invoices)
 *  - Obtener una factura individual por su ID (GET /invoices/:id)
 *  - Guardar una nueva factura (POST /invoices)
 *
 * Reglas aplicadas (Bpracticas.md / reglas.md):
 *  - Manejo seguro de errores con try/catch y timeouts.
 *  - Funciones puras e independientes del framework.
 */

const API_BASE_URL = 'http://localhost:3001/invoices';
const TIMEOUT_MS = 3000;

/**
 * Envoltorio de fetch con timeout para no bloquear la aplicación
 * si el servidor local de json-server no está en ejecución.
 *
 * @param {string} url
 * @param {RequestInit} [options]
 * @returns {Promise<Response>}
 */
async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Obtiene todas las facturas almacenadas en el servidor JSON.
 * @returns {Promise<Array|null>} Lista de facturas o null si no se pudo conectar.
 */
export async function getInvoicesApi() {
  try {
    const res = await fetchWithTimeout(API_BASE_URL);
    if (!res.ok) {
      throw new Error(`Error en el servidor: HTTP ${res.status}`);
    }
    const data = await res.json();
    return Array.isArray(data) ? data : null;
  } catch (err) {
    console.info('API local de facturas no disponible, operando en modo local:', err.message);
    return null;
  }
}

/**
 * Obtiene una factura individual por su ID (ej. "FAC-2025-0041").
 * Permite buscar individualmente mediante GET /invoices/:id.
 *
 * @param {string} id - Identificador o código de la factura
 * @returns {Promise<object|null>} Factura encontrada o null
 */
export async function getInvoiceByIdApi(id) {
  console.log('id', id)
  console.log('API_BASE_URL', API_BASE_URL)
  if (!id) return null;
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/${encodeURIComponent(id)}`);
    if (!res.ok) {
      console.log('res', res)
      if (res.status === 404) return null;
      throw new Error(`Error al buscar factura ${id}: HTTP ${res.status}`);
    }
    const data = await res.json();
    console.log(`[GET /invoices/${id}] Factura obtenida por ID:`, data);
    return data;
  } catch (err) {
    console.warn(`Error al consultar factura ${id} en la API:`, err.message);
    return null;
  }
}

/**
 * Guarda una nueva factura en el servidor JSON (db.json).
 *
 * @param {object} invoice - Objeto de factura con su respectivo id
 * @returns {Promise<object|null>} Factura guardada o null si falló
 */
export async function createInvoiceApi(invoice) {
  if (!invoice) return null;
  try {
    const res = await fetchWithTimeout(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invoice),
    });

    if (!res.ok) {
      throw new Error(`Error al guardar en el servidor: HTTP ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.warn('No se pudo guardar la factura en json-server (db.json):', err.message);
    return null;
  }
}
