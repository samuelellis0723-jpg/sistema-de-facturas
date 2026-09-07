---
name: Audited Ledger
colors:
  surface: '#fbf9f6'
  surface-dim: '#dbdad7'
  surface-bright: '#fbf9f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f0'
  surface-container: '#efeeeb'
  surface-container-high: '#eae8e5'
  surface-container-highest: '#e4e2df'
  on-surface: '#1b1c1a'
  on-surface-variant: '#434842'
  inverse-surface: '#30312f'
  inverse-on-surface: '#f2f0ed'
  outline: '#747871'
  outline-variant: '#c4c8c0'
  surface-tint: '#526351'
  primary: '#0f1e10'
  on-primary: '#ffffff'
  primary-container: '#243324'
  on-primary-container: '#8a9c88'
  inverse-primary: '#bacbb6'
  secondary: '#50644a'
  on-secondary: '#ffffff'
  secondary-container: '#d0e6c6'
  on-secondary-container: '#55684e'
  tertiary: '#121e0c'
  on-tertiary: '#ffffff'
  tertiary-container: '#26331f'
  on-tertiary-container: '#8d9c82'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e8d1'
  primary-fixed-dim: '#bacbb6'
  on-primary-fixed: '#101f11'
  on-primary-fixed-variant: '#3b4b3a'
  secondary-fixed: '#d3e9c9'
  secondary-fixed-dim: '#b7cdae'
  on-secondary-fixed: '#0f1f0c'
  on-secondary-fixed-variant: '#394c34'
  tertiary-fixed: '#d8e8cb'
  tertiary-fixed-dim: '#bccbb0'
  on-tertiary-fixed: '#121f0d'
  on-tertiary-fixed-variant: '#3d4b35'
  background: '#fbf9f6'
  on-background: '#1b1c1a'
  surface-variant: '#e4e2df'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  mono-num-lg:
    fontFamily: JetBrains Mono
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.02em
  mono-num-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: -0.01em
  mono-num-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  spacing-3xs: 0.125rem
  spacing-2xs: 0.25rem
  spacing-xs: 0.5rem
  spacing-sm: 0.75rem
  spacing-md: 1rem
  spacing-lg: 1.5rem
  spacing-xl: 2rem
  spacing-2xl: 3rem
  sidebar-width: 16.5rem
  gutter: 1.25rem
---

## Brand & Style

This design system establishes a high-precision, calming, and authoritative operational environment engineered for internal accounting, invoice generation, reconciliation, and audit management. It rejects the sterile, cold blues and stark greys common to legacy enterprise ERPs, substituting them with an organic, disciplined palette rooted in deep botanical tones and warm archival surfaces.

The visual direction marries **Corporate Modernism** with **Editorial Precision**:
- **Demeanor:** Methodical, tranquil, unwavering, and elite. It minimizes cognitive fatigue during 8-hour spreadsheet and ledger review workflows.
- **Target Audience:** Internal finance directors, senior accountants, billing administrators, and financial compliance officers who require high information density without visual chaos.
- **Emotional Response:** Inspires quiet confidence, absolute clarity, deliberate pace, and administrative order. Numbers feel grounded and indisputable.

## Colors

The color system derives from archival forest hues and pressed paper tones, calibrated precisely to maintain WCAG AAA compliance across primary workflows.

### Palette Architecture
- **Primary (`#243324` / `#2D3B2D` - Woods End):** Anchors global structural architecture, sidebars, dense data table headers, and primary editorial titles. Conveys institutional permanence.
- **Secondary (`#4A5D44` / `#3F4F3B` - Wood Lane):** Used for actionable states, primary command buttons, active tab indicators, and balanced micro-interactions.
- **Tertiary (`#7C8B72` / `#6A7A61` - Villa Courtyard):** Utilized for structural micro-borders, secondary icons, breadcrumbs, and subtle muted badges.
- **Surface & Warm Tiers (`#D6CEBE`, `#E5DFC8`, `#F4F1EA` - Clean Khaki):** Forms container tiers, metric cards, sidebar sub-nav backgrounds, and table row zebra-striping.
- **Neutral Canvas (`#FAF8F5`):** Soft ivory background that mitigates monitor glare and eye strain. Pure white (`#FFFFFF`) is reserved exclusively for the literal invoice preview canvas and editable receipt documents.
- **Text Ink (`#1C231B`):** Deep organic obsidian for optimal text readability against canvas surfaces.

### Semantic Tones for Financial Operations
- **Credit / Paid / Success:** `#385A3F` (Deep Botanical Sage) with `#EAF2EB` background.
- **Pending / In Review:** `#8C6D23` (Warm Amber Mustard) with `#FBF6EA` background.
- **Void / Disputed / Danger:** `#843126` (Muted Rust Clay) with `#FDF0EE` background.

## Typography

The typographic hierarchy distinguishes between interface navigation, narrative content, and numerical financial calculations:

1. **Interface & Structural Text (Inter):** Leveraged for all navigation, headings, form labels, and descriptive notes. Features negative tracking on headings for crisp corporate density.
2. **Financial Data & Totals (JetBrains Mono):** Mandated for all monetary figures, tax percentages, invoice IDs, IBAN/BIC codes, timestamps, and column amounts. The monospaced tabular alignment guarantees vertical scanning integrity across ledger rows.
3. **Tabular Figures in Inter:** When numeric values occur inline within normal text blocks, the OpenType feature `tnum` (tabular figures) must be enabled.

## Layout & Spacing

The layout is built around a hybrid structure optimized for widescreen financial operations:
- **Persistent Left Rail Navigation:** Fixed width (`16.5rem` / `264px`) rendered in deep `#243324`, keeping core accounting modules (Invoicing, Accounts Payable, General Ledger, Tax Engine) readily accessible.
- **Dynamic Content Canvas:** Fluid horizontal workspace with an adaptive maximum container cap of `1600px` for multi-column balancing.
- **Invoice Split View Mode:** A 50/50 dual-pane architecture on desktop: the left pane hosts live data inputs, tax selector toggles, and line-item builders; the right pane renders an isolated, fixed-ratio digital white paper (`#FFFFFF`) representing the true printed invoice.
- **Rhythm & Grid:** Built upon a compact 4px baseline system. Table rows maintain a compact 36px height (compact mode) or 44px height (standard mode) to support high row counts without scrolling exhaustion.

## Elevation & Depth

This design system avoids loud, floating drop shadows, utilizing **tonal surfacing with warm ambient diffusion and hairline structural borders**.

- **Level 0 (Canvas Base):** Ground layer (`#FAF8F5`). Flat, non-elevated.
- **Level 1 (Card & Module Layer):** Surfaces rendered in `#F4F1EA` or `#FFFFFF` with a subtle hairline boundary: `1px solid rgba(106, 122, 97, 0.22)`.
  - Shadow: `0 1px 2px rgba(36, 51, 36, 0.04), 0 2px 6px rgba(36, 51, 36, 0.02)`.
- **Level 2 (Dropdowns, Flyout Panels, Context Menus):** Clean white or rich warm cream `#FAF8F5`.
  - Border: `1px solid rgba(124, 139, 114, 0.35)`.
  - Shadow: `0 4px 14px rgba(36, 51, 36, 0.08), 0 1px 3px rgba(36, 51, 36, 0.04)`.
- **Level 3 (Reconciliation Modals & Audit Overlays):** Centered viewports with a tinted backdrop overlay (`rgba(36, 51, 36, 0.45)` with `backdrop-filter: blur(2px)`).
  - Shadow: `0 12px 36px rgba(28, 35, 27, 0.16)`.
- **Level Print (Document Canvas):** The simulated paper sheet floats with `box-shadow: 0 4px 20px rgba(36, 51, 36, 0.06), 0 0 0 1px rgba(124, 139, 114, 0.18)`.

## Shapes

The design system employs a disciplined, soft geometry that respects enterprise ergonomics:
- **Base Rounding (`rounded`):** `0.25rem` (4px) applied to compact inputs, badge tags, table row selector checkboxes, and ledger action toolbars.
- **Container Rounding (`rounded-lg`):** `0.5rem` (8px) applied to standard cards, invoice summary modules, alert boxes, and dropdown menus.
- **Feature Rounding (`rounded-xl`):** `0.75rem` (12px) applied strictly to outer application panels, invoice preview viewports, and modal dialogs.
- **Pills:** Forbidden for primary operational UI buttons; reserved only for status indicator chips (e.g., "PAID", "OVERDUE") to visually decouple metadata from clickable actions.

## Components

### Buttons
- **Primary:** Solid `#4A5D44` background with pure `#FFFFFF` label text. Focus ring: `2px` ring in `#7C8B72` offset by `2px`. Hover state shifts to `#3F4F3B`.
- **Secondary / Outline:** Background transparent, border `1px solid #7C8B72`, text `#243324`. Hover shifts background to `rgba(214, 206, 190, 0.3)`.
- **Subtle / Ghost:** No border, text `#4A5D44`, hover transitions to `#E5DFC8`.

### Input Fields & Selectors
- Background: `#FFFFFF` or `#F4F1EA` (dependent on section context).
- Border: `1px solid rgba(124, 139, 114, 0.4)`.
- Active / Focus: Border `#4A5D44` with a soft outer shadow: `0 0 0 3px rgba(74, 93, 68, 0.15)`.
- Monospaced Currency Fields: Embedded currency indicator (`EUR`, `USD`, `$`, `€`) set in `#7C8B72`, with value rendered in `JetBrains Mono`.

### Ledger Data Tables
- Header Row: Background `#F4F1EA`, border-bottom `2px solid #D6CEBE`, text label in `label-caps` (`#243324`).
- Data Row: Alternating hover state with `#FAF8F5`, row selection highlighted in `rgba(124, 139, 114, 0.12)`.
- Column Alignments: Text columns align left; numerical values, debits, credits, and tax sums strictly align right in `mono-num-md`.

### Status Badges & Chips
- Form factor: Compact pill with `0.25rem` padding vertical, `0.625rem` padding horizontal.
- Typography: `label-caps` in weight `600`.
- Tonal matching: Low saturation backgrounds paired with high-contrast text drawn from the semantic palette (e.g., `#EAF2EB` fill with `#243324` text for settled balances).

### Cards & Summary Panels
- Background: `#FAF8F5` or `#F4F1EA` bordered by `#D6CEBE`.
- Metrics display: Micro-title in Inter regular (`body-sm`), numerical aggregated value in `mono-num-lg` using `#243324`.

### Interactive Invoice Builder (Line-Item Grid)
- Embedded itemized table with inline formula calculations, drag-handle reordering, automatic item line numbering in `JetBrains Mono`, and one-click VAT/tax selector chips.