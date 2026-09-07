/** @type {import('tailwindcss').Config} */
// Extraído 1:1 del bloque tailwind.config de code.html (líneas 17-48)
// y ampliado con la paleta completa del DESIGN.md
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // --- Paleta principal (code.html L22-40) ---
        'primary':                  '#1f2d1e',
        'primary-container':        '#243324',
        'on-primary':               '#ffffff',
        'on-primary-container':     '#9ab095',
        'secondary':                '#435940',
        'secondary-container':      '#e8efe6',
        'on-secondary-container':   '#2a3928',
        'surface':                  '#fbfaf8',
        'surface-container-low':    '#f6f4ef',
        'surface-container':        '#edeae2',
        'surface-container-high':   '#e4e0d6',
        'surface-container-lowest': '#ffffff',
        'on-surface':               '#1d201c',
        'on-surface-variant':       '#5f685d',
        'outline':                  '#8b9487',
        'outline-variant':          '#e2ded5',
        'error':                    '#b3261e',
        'error-container':          '#f9dedc',

        // --- Semántica financiera (DESIGN.md L156-158) ---
        'paid':       '#385A3F',
        'paid-bg':    '#EAF2EB',
        'pending':    '#8C6D23',
        'pending-bg': '#FBF6EA',
        'void':       '#843126',
        'void-bg':    '#FDF0EE',
      },
      fontFamily: {
        // Inter para UI, JetBrains Mono para datos financieros (DESIGN.md L53 y L92)
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        // DESIGN.md L114-120
        DEFAULT: '0.25rem',   // 4px  — inputs, badges, checkboxes
        sm:  '0.125rem',      // 2px
        md:  '0.375rem',      // 6px
        lg:  '0.5rem',        // 8px  — cards, dropdowns
        xl:  '0.75rem',       // 12px — paneles, modales
        full: '9999px',       // pills de estado
      },
      spacing: {
        // DESIGN.md L121-131
        '3xs':          '0.125rem',   // 2px
        '2xs':          '0.25rem',    // 4px
        'xs':           '0.5rem',     // 8px
        'sm':           '0.75rem',    // 12px
        'md':           '1rem',       // 16px
        'lg':           '1.5rem',     // 24px
        'xl':           '2rem',       // 32px
        '2xl':          '3rem',       // 48px
        'sidebar':      '16.5rem',    // 264px — ancho fijo del sidebar
        'gutter':       '1.25rem',    // 20px
      },
      boxShadow: {
        // DESIGN.md L176-188 — niveles de elevación
        'level-1': '0 1px 2px rgba(36,51,36,0.04), 0 2px 6px rgba(36,51,36,0.02)',
        'level-2': '0 4px 14px rgba(36,51,36,0.08), 0 1px 3px rgba(36,51,36,0.04)',
        'level-3': '0 12px 36px rgba(28,35,27,0.16)',
        'print':   '0 4px 20px rgba(36,51,36,0.06), 0 0 0 1px rgba(124,139,114,0.18)',
      },
      maxWidth: {
        'workspace': '1520px',  // DESIGN.md L172 — max container del canvas
      },
    },
  },
  plugins: [],
};
