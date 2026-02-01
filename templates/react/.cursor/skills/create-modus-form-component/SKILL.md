---
name: create-modus-form-component
description: Scaffold form components with proper Modus input integration, event handling, validation, and checkbox bug handling
---

# Create Modus Form Component

Scaffold form components with proper Modus input integration, event handling, validation feedback, and checkbox bug handling.

## When to Use

Use this skill when:
- Creating forms with Modus input components
- Building multi-step forms
- Implementing form validation
- Handling form submissions
- Creating user registration or contact forms

## Pattern Overview

Modus forms follow these patterns:

1. **Use Modus input components** (ModusTextInput, ModusCheckbox, etc.)
2. **Handle input changes** with proper event handlers
3. **Apply checkbox value inversion** automatically
4. **Use ModusInputFeedback** for validation messages
5. **Include proper accessibility** attributes
6. **Handle form submission** with ModusButton

## Basic Form Template

```tsx
"use client";

import { useState } from "react";
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

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Form submitted:", formData);
      // Handle form submission
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-card border-default rounded-lg">
      <div className="text-2xl font-bold mb-6 text-foreground">
        Contact Us
      </div>

      <div className="space-y-4">
        {/* Name Field */}
        <div>
          <ModusInputLabel
            label="Name"
            required
            size="md"
          />
          <ModusTextInput
            value={formData.name}
            onInputChange={(event) => {
              const value = (event.target as HTMLModusWcTextInputElement).value;
              updateField("name", value);
            }}
            placeholder="Enter your name"
            required
            size="md"
          />
          {errors.name && (
            <ModusInputFeedback
              message={errors.name}
              type="error"
              size="md"
            />
          )}
        </div>

        {/* Email Field */}
        <div>
          <ModusInputLabel
            label="Email"
            required
            size="md"
          />
          <ModusTextInput
            type="email"
            value={formData.email}
            onInputChange={(event) => {
              const value = (event.target as HTMLModusWcTextInputElement).value;
              updateField("email", value);
            }}
            placeholder="Enter your email"
            required
            size="md"
          />
          {errors.email && (
            <ModusInputFeedback
              message={errors.email}
              type="error"
              size="md"
            />
          )}
        </div>

        {/* Checkbox Field */}
        <div>
          <ModusCheckbox
            label="I agree to the terms and conditions"
            value={formData.agreeToTerms}
            onValueChange={(event) => {
              // ✅ Checkbox value is already corrected (inverted) by wrapper
              updateField("agreeToTerms", event.detail);
            }}
            required
            size="md"
          />
          {errors.agreeToTerms && (
            <ModusInputFeedback
              message={errors.agreeToTerms}
              type="error"
              size="md"
            />
          )}
        </div>

        {/* Submit Button */}
        <div className="flex gap-2 pt-4">
          <ModusButton
            color="primary"
            variant="filled"
            onButtonClick={handleSubmit}
          >
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
}
```

## Form with Multiple Input Types

```tsx
interface ExtendedFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  newsletter: boolean;
  notifications: boolean;
}

export default function ExtendedForm() {
  const [formData, setFormData] = useState<ExtendedFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    newsletter: false,
    notifications: false,
  });

  const updateTextField = (field: keyof ExtendedFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateCheckboxField = (field: keyof ExtendedFormData, value: boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Text Input */}
      <div>
        <ModusInputLabel label="Name" required />
        <ModusTextInput
          value={formData.name}
          onInputChange={(event) => {
            const value = (event.target as HTMLModusWcTextInputElement).value;
            updateTextField("name", value);
          }}
          required
        />
      </div>

      {/* Email Input */}
      <div>
        <ModusInputLabel label="Email" required />
        <ModusTextInput
          type="email"
          value={formData.email}
          onInputChange={(event) => {
            const value = (event.target as HTMLModusWcTextInputElement).value;
            updateTextField("email", value);
          }}
          required
        />
      </div>

      {/* Phone Input */}
      <div>
        <ModusInputLabel label="Phone" />
        <ModusTextInput
          type="tel"
          value={formData.phone}
          onInputChange={(event) => {
            const value = (event.target as HTMLModusWcTextInputElement).value;
            updateTextField("phone", value);
          }}
        />
      </div>

      {/* Textarea */}
      <div>
        <ModusInputLabel label="Message" required />
        <ModusTextarea
          value={formData.message}
          onInputChange={(event) => {
            const value = (event.target as HTMLModusWcTextareaElement).value;
            updateTextField("message", value);
          }}
          rows={4}
          required
        />
      </div>

      {/* Checkboxes */}
      <div className="space-y-2">
        <ModusCheckbox
          label="Subscribe to newsletter"
          value={formData.newsletter}
          onValueChange={(event) => {
            // ✅ Value already corrected by wrapper
            updateCheckboxField("newsletter", event.detail);
          }}
        />
        <ModusCheckbox
          label="Enable notifications"
          value={formData.notifications}
          onValueChange={(event) => {
            // ✅ Value already corrected by wrapper
            updateCheckboxField("notifications", event.detail);
          }}
        />
      </div>

      {/* Submit */}
      <ModusButton
        color="primary"
        onButtonClick={() => console.log("Form data:", formData)}
      >
        Submit
      </ModusButton>
    </div>
  );
}
```

## Key Patterns

### 1. Input Change Handling

```tsx
// ✅ CORRECT: Extract value from event target
onInputChange={(event) => {
  const value = (event.target as HTMLModusWcTextInputElement).value;
  updateField("fieldName", value);
}}

// ❌ WRONG: Don't use event.detail for input values
onInputChange={(event) => {
  updateField("fieldName", event.detail); // Wrong!
}}
```

### 2. Checkbox Value Handling

```tsx
// ✅ CORRECT: Use event.detail (already corrected by wrapper)
onValueChange={(event) => {
  // event.detail is already inverted/corrected
  updateField("checkboxField", event.detail);
}}

// ❌ WRONG: Don't invert again
onValueChange={(event) => {
  updateField("checkboxField", !event.detail); // Double inversion!
}}
```

### 3. Validation Feedback

```tsx
{errors.fieldName && (
  <ModusInputFeedback
    message={errors.fieldName}
    type="error"
    size="md"
  />
)}
```

### 4. Form State Management

```tsx
// Use useState for form data
const [formData, setFormData] = useState<FormData>({
  field1: "",
  field2: false,
});

// Update function
const updateField = (field: keyof FormData, value: string | boolean) => {
  setFormData(prev => ({ ...prev, [field]: value }));
};
```

## Validation Patterns

### Real-time Validation

```tsx
const [email, setEmail] = useState("");
const [emailError, setEmailError] = useState<string | undefined>();

const handleEmailChange = (value: string) => {
  setEmail(value);
  
  // Clear error when user types
  if (emailError) {
    setEmailError(undefined);
  }
  
  // Validate on blur or submit
};

const validateEmail = (): boolean => {
  if (!email.trim()) {
    setEmailError("Email is required");
    return false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setEmailError("Please enter a valid email address");
    return false;
  }
  return true;
};
```

### Form-wide Validation

```tsx
const validateForm = (): boolean => {
  const newErrors: Partial<Record<keyof FormData, string>> = {};

  if (!formData.name.trim()) {
    newErrors.name = "Name is required";
  }

  if (!formData.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!isValidEmail(formData.email)) {
    newErrors.email = "Invalid email format";
  }

  if (!formData.agreeToTerms) {
    newErrors.agreeToTerms = "You must agree to the terms";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

## Common Form Components

### Text Input

```tsx
<ModusTextInput
  value={formData.name}
  onInputChange={(event) => {
    const value = (event.target as HTMLModusWcTextInputElement).value;
    updateField("name", value);
  }}
  placeholder="Enter name"
  required
  label="Name"
/>
```

### Textarea

```tsx
<ModusTextarea
  value={formData.message}
  onInputChange={(event) => {
    const value = (event.target as HTMLModusWcTextareaElement).value;
    updateField("message", value);
  }}
  rows={4}
  placeholder="Enter message"
  required
  label="Message"
/>
```

### Checkbox

```tsx
<ModusCheckbox
  label="I agree to terms"
  value={formData.agreeToTerms}
  onValueChange={(event) => {
    // ✅ Value already corrected
    updateField("agreeToTerms", event.detail);
  }}
  required
/>
```

### Radio Buttons

```tsx
<ModusRadio
  label="Option 1"
  name="choice"
  value="option1"
  checked={formData.choice === "option1"}
  onValueChange={(event) => {
    updateField("choice", event.detail);
  }}
/>
```

## Accessibility

Always include:

- **Labels**: Use `ModusInputLabel` or `label` prop
- **Required indicators**: Use `required` prop
- **Error messages**: Use `ModusInputFeedback` with `type="error"`
- **ARIA attributes**: Components handle these automatically

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
- `src/demos/checkbox-demo/page.tsx` - Checkbox examples
