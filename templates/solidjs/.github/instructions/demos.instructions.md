---
applyTo: "src/demos/**/*.tsx"
---

# Demo Page Patterns

Demo pages showcase Modus components with interactive examples.

## Page Structure

```tsx
import DemoPage from "../../components/DemoPage";
import DemoExample from "../../components/DemoExample";

export default function ComponentDemoPage() {
  return (
    <DemoPage
      title="Component Name"
      description="Description of the component."
    >
      <DemoExample title="Basic Usage" description="Simple examples.">
        {/* Examples */}
      </DemoExample>

      <DemoExample title="Variants" description="Different styles.">
        {/* Variant examples */}
      </DemoExample>
    </DemoPage>
  );
}
```

## Demo Section Pattern

```tsx
<div class="space-y-4">
  <div class="text-lg font-semibold text-foreground">Section Title</div>
  <div class="flex flex-wrap gap-4">
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
<div class="flex flex-wrap gap-4">
  <ModusButton color="primary">Primary</ModusButton>
  <ModusButton color="secondary">Secondary</ModusButton>
  <ModusButton color="danger">Danger</ModusButton>
</div>
```

## Event Handling Demos

Demonstrate event handling with visible feedback using SolidJS signals:

```tsx
const [lastAction, setLastAction] = createSignal("");

<ModusButton onButtonClick={() => setLastAction("Button clicked")}>
  Click Me
</ModusButton>
<div class="text-foreground-60">Last action: {lastAction()}</div>
```

## Icons in Demos

Use Modus icons only:

```tsx
<i class="modus-icons">check_circle</i>
<i class="modus-icons">warning</i>
<i class="modus-icons">info</i>
```
