---
applyTo: "src/pages/**/*.tsx"
---

# Application Page Patterns

Pages are user-facing application screens in `src/pages/`.

## Page Structure

```tsx
import { type Component } from "solid-js";

const PageName: Component = () => {
  return (
    <div class="min-h-screen bg-background">
      <div class="container mx-auto p-6">
        <div class="text-2xl font-bold text-foreground mb-6">
          Page Title
        </div>
        {/* Content sections */}
      </div>
    </div>
  );
};

export default PageName;
```

## Layout Patterns

Use Tailwind utilities with design system colors:

```tsx
{/* Card layout */}
<div class="bg-card border-default rounded-lg p-6">
  {/* Card content */}
</div>

{/* Grid layout */}
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Grid items */}
</div>
```

## Navigation

Add routes in `src/App.tsx` using `@solidjs/router`:

```tsx
<Route path="/your-page" component={YourPage} />
```

## Styling Rules

- Use design system colors only: `bg-background`, `text-foreground`, `bg-card`
- Use opacity utilities: `text-foreground-80` (not `text-foreground/80`)
- Use border utilities: `border-default`, `border-bottom-default`
- Use `<div>` elements only (no `h1`, `p`, `section`)

## Theme Awareness

Pages automatically adapt to the active theme. Use theme context if needed:

```tsx
import { useTheme } from "../contexts/ThemeContext";

const { theme, setTheme } = useTheme();
```

## Component Usage

Always use wrapper components from `src/components/`:

```tsx
import ModusButton from "../components/ModusButton";
import ModusAlert from "../components/ModusAlert";
```

Never use `modus-wc-*` web components directly in pages.
