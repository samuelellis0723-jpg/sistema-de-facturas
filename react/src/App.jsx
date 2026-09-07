/**
 * App — Componente raíz de FacturaFlow
 *
 * Jerarquía (reglas.md §1):
 *   Componentes → Páginas → App → main.jsx
 *
 * Las rutas adicionales se declararán aquí en fases posteriores.
 */
import InvoicesPage from '@features/invoices/pages/InvoicesPage';

function App() {
  return <InvoicesPage />;
}

export default App;

