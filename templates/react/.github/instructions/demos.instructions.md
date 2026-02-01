---
applyTo: "src/demos/**/*.tsx"
---

# Demo Page Patterns

Demo pages showcase Modus components with interactive examples.

## Page Structure

```tsx
export default function ComponentDemo() {
  return (
    <div className="space-y-8 p-6">
      <div className="text-2xl font-bold text-foreground">Component Name</div>
      <div className="text-foreground-60">Description of the component.</div>

      {/* Demo sections */}
      <DemoSection title="Basic Usage">
        {/* Examples */}
      </DemoSection>

      <DemoSection title="Variants">
        {/* Variant examples */}
      </DemoSection>
    </div>
  );
}
```

## Demo Section Pattern

```tsx
<div className="space-y-4">
  <div className="text-lg font-semibold text-foreground">Section Title</div>
  <div className="flex flex-wrap gap-4">
    {/* Component examples */}
  </div>
</div>
```

## Styling Rules

- Use design system colors: `bg-background`, `text-foreground`, `bg-card`
- Use opacity utilities: `text-foreground-60` (not `text-foreground/60`)
- Use custom border utilities: `border-default`, `border-bottom-default`
- Use `<div>` elements only (no semantic HTML)

## Interactive Examples

Show multiple states and variants:

```tsx
<div className="flex flex-wrap gap-4">
  <ModusButton color="primary">Primary</ModusButton>
  <ModusButton color="secondary">Secondary</ModusButton>
  <ModusButton color="danger">Danger</ModusButton>
</div>
```

## Event Handling Demos

Demonstrate event handling with visible feedback:

```tsx
const [lastAction, setLastAction] = useState<string>("");

<ModusButton onClick={() => setLastAction("Button clicked")}>
  Click Me
</ModusButton>
<div className="text-foreground-60">Last action: {lastAction}</div>
```

## Icons in Demos

Use Modus icons only with underscore naming:

```tsx
<i className="modus-icons">check_circle</i>
<i className="modus-icons">warning</i>
<i className="modus-icons">info</i>
```
