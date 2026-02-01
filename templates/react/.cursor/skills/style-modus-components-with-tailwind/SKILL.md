---
name: style-modus-components-with-tailwind
description: Style Modus components using custom border and opacity utilities that work with CSS variables, avoiding Tailwind patterns that don't work with runtime CSS variables
---

# Style Modus Components with Tailwind

Style Modus components using custom border and opacity utilities that work with CSS variables, avoiding Tailwind patterns that don't work with runtime CSS variables.

## When to Use

Use this skill when:
- Styling Modus components with borders
- Applying opacity to design system colors
- Creating theme-aware components
- Avoiding common Tailwind + CSS variable pitfalls
- Ensuring components work in all 6 Modus themes

## The Core Problem

**Tailwind CSS** processes colors at **build time**, but **Modus Design System** uses **CSS variables** that resolve at **runtime**. This creates incompatibilities:

- ❌ `border-red-500` - Hardcoded color, not theme-aware
- ❌ `text-foreground/80` - Doesn't work with CSS variables
- ❌ `border border-destructive` - May not work reliably

**Solution**: Use custom utilities that work with CSS variables at runtime.

## Reference Documentation

For detailed technical explanation, see: `docs/tailwind-css-variables-problem.md`

## Custom Border Utilities

### Available Border Utilities

**Standard borders (1px)**:
- `border-default` - Default border color
- `border-success` - Success color border
- `border-warning` - Warning color border
- `border-destructive` - Error/destructive color border
- `border-primary` - Primary/info color border

**Thick borders (2px)**:
- `border-thick` - Thick default border
- `border-thick-success` - Thick success border
- `border-thick-warning` - Thick warning border
- `border-thick-destructive` - Thick destructive border
- `border-thick-primary` - Thick primary border

**Dashed borders**:
- `border-dashed` - Dashed default border
- `border-dashed-success` - Dashed success border
- `border-dashed-warning` - Dashed warning border
- `border-dashed-destructive` - Dashed destructive border

**Directional borders**:
- `border-top-default`, `border-bottom-success`, `border-left-warning`, `border-right-destructive`
- Pattern: `border-{direction}-{color}`

### Correct Border Usage

```tsx
// ✅ CORRECT: Use custom border utilities
<div className="border-destructive">Error message</div>
<div className="border-success">Success message</div>
<div className="border-thick-primary">Important content</div>
<div className="border-bottom-default">Separator</div>

// ❌ WRONG: Don't use Tailwind color classes
<div className="border border-red-500">Error</div>
<div className="border-2 border-green-500">Success</div>
<div className="border border-blue-500">Info</div>
```

### Border Examples

```tsx
// Alert with border
<div className="bg-card border-destructive rounded-lg p-4">
  <div className="text-destructive font-semibold">Error</div>
  <div className="text-foreground">Something went wrong</div>
</div>

// Card with border
<div className="bg-card border-default rounded-lg p-6">
  <div className="text-foreground">Card content</div>
</div>

// Success indicator
<div className="border-thick-success rounded p-4">
  <div className="text-success">Operation successful</div>
</div>
```

## Custom Opacity Utilities

### Available Opacity Levels

**Opacity levels**: 80%, 60%, 40%, 20%

**Pattern**: `{property}-{color}-{opacity}`

### Text Opacity

```tsx
// ✅ CORRECT: Use custom opacity utilities
<div className="text-foreground-80">Subheading (80% opacity)</div>
<div className="text-foreground-60">Description (60% opacity)</div>
<div className="text-muted-foreground-40">Hint (40% opacity)</div>
<div className="text-primary-80">Primary text with opacity</div>

// ❌ WRONG: Don't use Tailwind opacity syntax
<div className="text-foreground/80">Doesn't work</div>
<div className="text-primary/60">Doesn't work</div>
```

### Background Opacity

```tsx
// ✅ CORRECT: Background with opacity
<div className="bg-primary-20">Subtle primary background</div>
<div className="bg-destructive-40">Warning background</div>
<div className="bg-success-60">Success background</div>

// ❌ WRONG: Tailwind opacity syntax
<div className="bg-primary/20">Doesn't work</div>
<div className="bg-destructive/40">Doesn't work</div>
```

### Border Opacity

```tsx
// ✅ CORRECT: Border with opacity
<div className="border border-destructive-40">Subtle error border</div>
<div className="border border-primary-60">Primary border with opacity</div>

// ❌ WRONG: Tailwind opacity syntax
<div className="border border-destructive/40">Doesn't work</div>
```

### Available Color + Opacity Combinations

**Text opacity**:
- `text-foreground-80`, `text-foreground-60`, `text-foreground-40`, `text-foreground-20`
- `text-muted-foreground-80`, `text-muted-foreground-60`, etc.
- `text-primary-80`, `text-primary-60`, `text-primary-40`, `text-primary-20`
- `text-secondary-80`, `text-secondary-60`, etc.
- `text-destructive-80`, `text-destructive-60`, etc.
- `text-warning-80`, `text-warning-60`, etc.
- `text-success-80`, `text-success-60`, etc.

**Background opacity**:
- `bg-foreground-80`, `bg-foreground-60`, `bg-foreground-40`, `bg-foreground-20`
- `bg-primary-80`, `bg-primary-60`, `bg-primary-40`, `bg-primary-20`
- Same pattern for: `secondary`, `destructive`, `warning`, `success`, `muted`

**Border opacity**:
- `border-destructive-80`, `border-destructive-60`, etc.
- Same pattern for all border colors

## Complete Styling Examples

### Alert Component

```tsx
// ✅ CORRECT: Theme-aware alert
<div className="bg-card border-destructive rounded-lg p-4">
  <div className="flex items-center gap-2">
    <i className="modus-icons text-destructive">warning</i>
    <div className="text-destructive font-semibold">Error</div>
  </div>
  <div className="text-foreground-80 mt-2">Error message details</div>
</div>

// ❌ WRONG: Hardcoded colors
<div className="bg-white border border-red-500 rounded-lg p-4">
  <div className="text-red-500">Error</div>
  <div className="text-gray-600/80">Details</div>
</div>
```

### Card Component

```tsx
// ✅ CORRECT: Theme-aware card
<div className="bg-card border-default rounded-lg p-6 shadow-sm">
  <div className="text-foreground text-xl font-semibold mb-2">Card Title</div>
  <div className="text-foreground-60">Card description with muted text</div>
  <div className="mt-4 flex gap-2">
    <ModusButton color="primary">Primary Action</ModusButton>
    <ModusButton variant="borderless">Secondary</ModusButton>
  </div>
</div>
```

### Form Input with Feedback

```tsx
// ✅ CORRECT: Form input styling
<div>
  <ModusInputLabel label="Email" required />
  <ModusTextInput
    value={email}
    onInputChange={handleEmailChange}
    customClass={errors.email ? "border-destructive" : "border-default"}
  />
  {errors.email && (
    <ModusInputFeedback
      message={errors.email}
      type="error"
    />
  )}
</div>
```

### Button States

```tsx
// ✅ CORRECT: Button with hover states
<button className="
  bg-primary text-primary-foreground
  hover:bg-primary-80
  border-primary
  rounded-lg px-4 py-2
  transition-colors
">
  Click me
</button>
```

### Text Hierarchy

```tsx
// ✅ CORRECT: Text hierarchy with opacity
<div className="space-y-2">
  <div className="text-foreground text-2xl font-bold">Main Heading</div>
  <div className="text-foreground-80 text-lg">Subheading</div>
  <div className="text-foreground-60 text-base">Body text</div>
  <div className="text-muted-foreground-60 text-sm">Caption</div>
</div>
```

## Common Mistakes to Avoid

### Mistake 1: Using Tailwind Color Classes

```tsx
// ❌ WRONG: Hardcoded Tailwind colors
<div className="border border-red-500">Error</div>
<div className="text-blue-600">Info</div>
<div className="bg-green-100">Success</div>

// ✅ CORRECT: Design system colors
<div className="border-destructive">Error</div>
<div className="text-primary">Info</div>
<div className="bg-success-20">Success</div>
```

### Mistake 2: Using Tailwind Opacity Syntax

```tsx
// ❌ WRONG: Tailwind opacity syntax doesn't work
<div className="text-foreground/80">Text</div>
<div className="bg-primary/60">Background</div>
<div className="border border-destructive/40">Border</div>

// ✅ CORRECT: Custom opacity utilities
<div className="text-foreground-80">Text</div>
<div className="bg-primary-60">Background</div>
<div className="border border-destructive-40">Border</div>
```

### Mistake 3: Mixing Tailwind and Custom Utilities

```tsx
// ❌ WRONG: Mixing incompatible patterns
<div className="border border-destructive/80">Mixed patterns</div>

// ✅ CORRECT: Use custom utilities consistently
<div className="border border-destructive-80">Consistent pattern</div>
```

### Mistake 4: Using Inline Styles

```tsx
// ❌ WRONG: Inline styles bypass design system
<div style={{ border: "1px solid var(--modus-wc-color-error)" }}>Error</div>
<div style={{ color: "rgba(0, 0, 0, 0.8)" }}>Text</div>

// ✅ CORRECT: Use utility classes
<div className="border-destructive">Error</div>
<div className="text-foreground-80">Text</div>
```

## Migration Patterns

### From Tailwind Default Borders

```tsx
// Before: Tailwind defaults
<div className="border border-red-500">Error</div>
<div className="border-2 border-green-500">Success</div>

// After: Custom utilities
<div className="border-destructive">Error</div>
<div className="border-thick-success">Success</div>
```

### From Tailwind Opacity Modifiers

```tsx
// Before: Tailwind opacity (doesn't work)
<div className="text-foreground/80">Text</div>
<div className="bg-primary/60">Background</div>

// After: Custom opacity utilities
<div className="text-foreground-80">Text</div>
<div className="bg-primary-60">Background</div>
```

### From Inline Styles

```tsx
// Before: Inline styles
<div style={{ 
  border: "1px solid var(--modus-wc-color-error)",
  color: "rgba(0, 0, 0, 0.8)"
}}>Content</div>

// After: Utility classes
<div className="border-destructive text-foreground-80">Content</div>
```

## Theme Compatibility

All custom utilities work with **all 6 Modus themes**:

- ✅ Classic Light
- ✅ Classic Dark
- ✅ Modern Light
- ✅ Modern Dark
- ✅ Connect Light
- ✅ Connect Dark

Colors automatically adapt when themes change - no code changes needed.

## Implementation Location

Custom utilities are defined in:
- **`src/index.css`** - All border and opacity utilities

## Testing Checklist

- [ ] Components use custom border utilities (not Tailwind colors)
- [ ] Opacity uses custom utilities (not `/80` syntax)
- [ ] No hardcoded colors (hex, RGB, Tailwind defaults)
- [ ] Components work in all 6 themes
- [ ] Colors adapt when theme switches
- [ ] No inline styles for colors/borders

## Related Files

- `docs/tailwind-css-variables-problem.md` - Detailed technical explanation
- `src/index.css` - Custom utility definitions
- `.cursor/rules/border-usage-guidelines.mdc` - Border usage rules
- `.cursor/rules/modus-opacity-utilities-react.mdc` - Opacity utilities rules
- `.cursor/rules/modus-color-usage-react.mdc` - Color usage rules

## Quick Reference

### Borders
- Use: `border-destructive`, `border-success`, `border-warning`, `border-primary`
- Don't use: `border-red-500`, `border-green-500`, `border border-destructive`

### Opacity
- Use: `text-foreground-80`, `bg-primary-60`, `border-destructive-40`
- Don't use: `text-foreground/80`, `bg-primary/60`, `border-destructive/40`

### Colors
- Use: `text-foreground`, `bg-primary`, `text-destructive`
- Don't use: `text-gray-900`, `bg-blue-500`, `text-red-600`
