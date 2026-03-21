---
name: handle-modus-checkbox-value-bug
description: Apply the critical checkbox value inversion workaround when working with ModusCheckbox components
---

# Handle Modus Checkbox Value Bug

Apply the critical value inversion workaround for ModusWcCheckbox components.

## Critical Bug

The `ModusWcCheckbox` web component has a **value inversion bug** where the `value` property returns the **opposite** of the actual checked state:

- When checkbox is **checked**: `target.value` returns `false`
- When checkbox is **unchecked**: `target.value` returns `true`

This is the **opposite** of what developers expect.

## When to Use

Use this skill when:
- Implementing checkbox functionality with ModusCheckbox
- Fixing checkbox-related bugs
- Handling checkbox value changes
- Creating forms with checkboxes

## Reference Implementation

See `src/components/ModusCheckbox.tsx` for the complete workaround implementation.

## The Fix

Always invert the value when reading from checkbox events:

```tsx
const handleValueChange = (event: Event) => {
  const customEvent = event as CustomEvent<InputEvent>;

  // 🚨 CRITICAL: Handle the value inversion bug
  const rawValue = (customEvent.target as HTMLModusWcCheckboxElement).value;
  const actualValue = !rawValue; // ✅ CORRECT: Invert the value

  // Use actualValue for your logic
  setChecked(actualValue);
};
```

## Complete Pattern (SolidJS)

```tsx
import { createEffect } from "solid-js";
import type { Component } from "solid-js";

const ModusCheckbox: Component<{
  value?: boolean;
  onValueChange?: (event: CustomEvent<boolean>) => void;
}> = (props) => {
  let checkboxEl: HTMLModusWcCheckboxElement | undefined;

  createEffect(() => {
    const checkbox = checkboxEl;
    if (!checkbox) return;

    const handleValueChange = (event: Event) => {
      const customEvent = event as CustomEvent<InputEvent>;

      // 🚨 CRITICAL BUG WORKAROUND: The ModusWcCheckbox component has a value
      // inversion bug where the `value` property returns the opposite of the
      // actual checked state. This function corrects this by inverting the
      // raw value before passing it to the parent component.
      const rawValue = (customEvent.target as HTMLModusWcCheckboxElement).value;
      const actualValue = !rawValue; // ✅ CORRECT: Invert the value

      const correctedEvent = new CustomEvent("valueChange", {
        detail: actualValue,
        bubbles: true,
        cancelable: true,
      });

      props.onValueChange?.(correctedEvent);
    };

    if (props.onValueChange) {
      checkbox.addEventListener("inputChange", handleValueChange);
    }

    return () => {
      if (props.onValueChange) {
        checkbox.removeEventListener("inputChange", handleValueChange);
      }
    };
  });

  return (
    <modus-wc-checkbox
      ref={(el) => (checkboxEl = el)}
      value={props.value}
    />
  );
};
```

## Usage in Forms

When using checkboxes in forms:

```tsx
function MyForm() {
  const [agreeToTerms, setAgreeToTerms] = createSignal(false);

  return (
    <ModusCheckbox
      value={agreeToTerms()}
      onValueChange={(event) => {
        // event.detail is already corrected (inverted)
        setAgreeToTerms(event.detail);
      }}
      label="I agree to the terms and conditions"
    />
  );
}
```

## Multiple Checkboxes

When handling multiple checkboxes:

```tsx
function CheckboxGroup() {
  const [checkboxes, setCheckboxes] = createSignal({
    option1: false,
    option2: true,
    option3: false,
  });

  const handleCheckboxChange = (key: string, event: CustomEvent<boolean>) => {
    // event.detail is already corrected
    setCheckboxes((prev) => ({
      ...prev,
      [key]: event.detail,
    }));
  };

  return (
    <>
      <ModusCheckbox
        value={checkboxes().option1}
        onValueChange={(e) => handleCheckboxChange("option1", e)}
        label="Option 1"
      />
      <ModusCheckbox
        value={checkboxes().option2}
        onValueChange={(e) => handleCheckboxChange("option2", e)}
        label="Option 2"
      />
      <ModusCheckbox
        value={checkboxes().option3}
        onValueChange={(e) => handleCheckboxChange("option3", e)}
        label="Option 3"
      />
    </>
  );
}
```

## Important Notes

1. **The bug is in `target.value`**: The inversion happens when reading `event.target.value`, not in `event.detail`
2. **Always invert**: Never trust the raw value - always invert it
3. **Wrapper handles it**: The `ModusCheckbox` wrapper component already handles this, so if you're using the wrapper, you don't need to invert again
4. **Document the bug**: Add comments explaining the workaround

## Related Files

- `src/components/ModusCheckbox.tsx` - Complete wrapper implementation
