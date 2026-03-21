---
name: create-modus-form-component
description: Scaffold form components with proper Modus input integration, event handling, validation, and checkbox bug handling
---

# Create Modus Form Component

Scaffold form components with proper Modus input integration, event handling, validation feedback, and checkbox bug handling in SolidJS.

## When to Use

Use this skill when:
- Creating forms with Modus input components
- Building multi-step forms
- Implementing form validation
- Handling form submissions
- Creating user registration or contact forms

## Pattern Overview

Modus forms in SolidJS follow these patterns:

1. **Use Modus input components** (ModusTextInput, ModusCheckbox, etc.)
2. **Handle input changes** with proper event handlers
3. **Apply checkbox value inversion** automatically (wrapper handles it)
4. **Use ModusInputFeedback** for validation messages
5. **Include proper accessibility** attributes
6. **Handle form submission** with ModusButton

## Basic Form Template

```tsx
import { createSignal } from "solid-js";
import type { Component } from "solid-js";
import ModusTextInput from "./components/ModusTextInput";
import ModusCheckbox from "./components/ModusCheckbox";
import ModusButton from "./components/ModusButton";
import ModusInputFeedback from "./components/ModusInputFeedback";
import ModusInputLabel from "./components/ModusInputLabel";

interface FormData {
  name: string;
  email: string;
  agreeToTerms: boolean;
}

const ContactForm: Component = () => {
  const [formData, setFormData] = createSignal<FormData>({
    name: "",
    email: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = createSignal<
    Partial<Record<keyof FormData, string>>
  >({});

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (prev[field]) {
        return { ...prev, [field]: undefined };
      }
      return prev;
    });
  };

  const validateForm = (): boolean => {
    const data = formData();
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!data.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!data.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Form submitted:", formData());
    }
  };

  return (
    <div class="max-w-md mx-auto p-6 bg-card border-default rounded-lg">
      <div class="text-2xl font-bold mb-6 text-foreground">Contact Us</div>

      <div class="space-y-4">
        {/* Name Field */}
        <div>
          <ModusInputLabel label="Name" required size="md" />
          <ModusTextInput
            value={formData().name}
            onInputChange={(event) => {
              const value = (event.target as HTMLModusWcTextInputElement).value;
              updateField("name", value);
            }}
            placeholder="Enter your name"
            required
            size="md"
          />
          {errors().name && (
            <ModusInputFeedback
              message={errors().name}
              type="error"
              size="md"
            />
          )}
        </div>

        {/* Email Field */}
        <div>
          <ModusInputLabel label="Email" required size="md" />
          <ModusTextInput
            type="email"
            value={formData().email}
            onInputChange={(event) => {
              const value = (event.target as HTMLModusWcTextInputElement).value;
              updateField("email", value);
            }}
            placeholder="Enter your email"
            required
            size="md"
          />
          {errors().email && (
            <ModusInputFeedback
              message={errors().email}
              type="error"
              size="md"
            />
          )}
        </div>

        {/* Checkbox Field */}
        <div>
          <ModusCheckbox
            label="I agree to the terms and conditions"
            value={formData().agreeToTerms}
            onValueChange={(event) => {
              // ✅ Checkbox value is already corrected (inverted) by wrapper
              updateField("agreeToTerms", event.detail);
            }}
            required
            size="md"
          />
          {errors().agreeToTerms && (
            <ModusInputFeedback
              message={errors().agreeToTerms}
              type="error"
              size="md"
            />
          )}
        </div>

        {/* Submit Button */}
        <div class="flex gap-2 pt-4">
          <ModusButton color="primary" variant="filled" onButtonClick={handleSubmit}>
            Submit
          </ModusButton>
          <ModusButton
            variant="borderless"
            onButtonClick={() => {
              setFormData({ name: "", email: "", agreeToTerms: false });
              setErrors({});
            }}
          >
            Reset
          </ModusButton>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
```

## Key Patterns

### 1. Form State with createSignal

```tsx
const [formData, setFormData] = createSignal<FormData>({
  name: "",
  email: "",
  agreeToTerms: false,
});
```

### 2. Input Change Handling

```tsx
// ✅ CORRECT: Extract value from event target
onInputChange={(event) => {
  const value = (event.target as HTMLModusWcTextInputElement).value;
  updateField("fieldName", value);
}}
```

### 3. Checkbox Value Handling

```tsx
// ✅ CORRECT: Use event.detail (already corrected by wrapper)
onValueChange={(event) => {
  updateField("checkboxField", event.detail);
}}
```

### 4. Validation Feedback

```tsx
{errors().fieldName && (
  <ModusInputFeedback
    message={errors().fieldName}
    type="error"
    size="md"
  />
)}
```

### 5. SolidJS Class Attribute

Use `class` not `className`:

```tsx
<div class="max-w-md mx-auto p-6 bg-card border-default rounded-lg">
```

## Common Mistakes

1. **Double checkbox inversion**: Don't invert checkbox values - wrapper handles it
2. **Wrong event value**: Use `event.target.value` for inputs, not `event.detail`
3. **Missing validation**: Always validate required fields
4. **No error clearing**: Clear errors when user starts typing
5. **Missing labels**: Always provide labels for accessibility

## Related Files

- `src/components/ModusTextInput.tsx` - Text input component
- `src/components/ModusCheckbox.tsx` - Checkbox component (handles bug)
- `src/components/ModusTextarea.tsx` - Textarea component
- `src/components/ModusInputFeedback.tsx` - Validation feedback
- `src/components/ModusInputLabel.tsx` - Input labels
