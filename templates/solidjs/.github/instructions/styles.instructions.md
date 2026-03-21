---
applyTo: "**/*.css"
---

# CSS and Design System Patterns

This project uses Tailwind CSS 3 with a custom 9-color design system.

## Color Variables

Modus provides 9 CSS variables mapped to Tailwind utilities:

```css
/* Base colors */
--modus-wc-color-base-page     /* bg-background */
--modus-wc-color-base-100      /* bg-card */
--modus-wc-color-base-200      /* bg-muted */
--modus-wc-color-base-300      /* bg-secondary */
--modus-wc-color-base-content  /* text-foreground */

/* Semantic colors */
--modus-wc-color-info          /* bg-primary, text-primary */
--modus-wc-color-success       /* bg-success, text-success */
--modus-wc-color-warning       /* bg-warning, text-warning */
--modus-wc-color-error         /* bg-destructive, text-destructive */
```

## Custom Border Utilities

Tailwind's border-color doesn't work with CSS variables. Use custom utilities:

```css
/* Standard borders */
.border-default { border: 1px solid var(--modus-wc-color-base-200); }
.border-primary { border: 1px solid var(--modus-wc-color-info); }
.border-success { border: 1px solid var(--modus-wc-color-success); }
.border-warning { border: 1px solid var(--modus-wc-color-warning); }
.border-destructive { border: 1px solid var(--modus-wc-color-error); }

/* Directional borders */
.border-bottom-default { border-bottom: 1px solid var(--modus-wc-color-base-200); }
.border-top-default { border-top: 1px solid var(--modus-wc-color-base-200); }
```

## Custom Opacity Utilities

Tailwind's `/80` syntax doesn't work with CSS variables. Use color-mix():

```css
/* Text opacity */
.text-foreground-80 {
  color: color-mix(in srgb, var(--modus-wc-color-base-content) 80%, transparent);
}
.text-foreground-60 {
  color: color-mix(in srgb, var(--modus-wc-color-base-content) 60%, transparent);
}

/* Background opacity */
.bg-primary-20 {
  background-color: color-mix(in srgb, var(--modus-wc-color-info) 20%, transparent);
}
```

## Forbidden Patterns

```css
/* NEVER use hardcoded colors */
.wrong { color: #000000; }
.wrong { background-color: rgb(0, 0, 0); }

/* NEVER use generic Tailwind colors in CSS */
/* Use the design system utilities instead */
```

## Theme Support

All CSS variables automatically update when the `data-theme` attribute changes on `<html>`. No additional CSS is needed for theme switching.
