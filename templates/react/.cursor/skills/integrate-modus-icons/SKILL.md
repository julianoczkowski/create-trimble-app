---
name: integrate-modus-icons
description: Help with correct Modus icon usage patterns including naming conventions, sizing, and accessibility
---

# Integrate Modus Icons

Help with correct Modus icon usage patterns including naming conventions, sizing, and accessibility.

## When to Use

Use this skill when:
- Adding icons to components or buttons
- Choosing the right icon name
- Sizing icons correctly
- Ensuring proper accessibility
- Integrating icons with Modus components

## Icon Naming Convention

**CRITICAL**: Modus icons use **UNDERSCORES (_)**, not hyphens (-)

### Correct Icon Names

```tsx
// ✅ CORRECT: Use underscores
<i className="modus-icons">save_disk</i>
<i className="modus-icons">arrow_left</i>
<i className="modus-icons">add_circle</i>
<i className="modus-icons">user_permissions</i>

// ❌ WRONG: Don't use hyphens
<i className="modus-icons">save-disk</i>
<i className="modus-icons">arrow-left</i>
```

## Usage Patterns

### Pattern 1: Using ModusIcon Component

```tsx
import ModusIcon from "./components/ModusIcon";

// Informational icon (announced by screen reader)
<ModusIcon
  name="user_add"
  size="lg"
  decorative={false}
  ariaLabel="Add user"
/>

// Decorative icon (not announced)
<ModusIcon
  name="chevron_right"
  size="md"
  decorative={true}
/>
```

Reference: `src/components/ModusIcon.tsx`

### Pattern 2: Using Bare `<i>` Element

```tsx
// Decorative icon
<i className="modus-icons text-lg" aria-hidden="true">
  user_add
</i>

// Informational icon
<i
  className="modus-icons text-md"
  role="img"
  aria-label="Settings"
>
  settings
</i>
```

### Pattern 3: Icons in Buttons

```tsx
import ModusButton from "./components/ModusButton";

// Icon with text (left position)
<ModusButton
  icon="save_disk"
  iconPosition="left"
>
  Save File
</ModusButton>

// Icon with text (right position)
<ModusButton
  icon="download"
  iconPosition="right"
>
  Download
</ModusButton>

// Icon only (requires aria-label)
<ModusButton
  icon="settings"
  iconPosition="only"
  ariaLabel="Open settings"
/>
```

Reference: `src/components/ModusButton.tsx:149-206` for icon rendering logic

## Icon Sizing

### Tailwind Text Classes

Use Tailwind text utilities for sizing:

```tsx
// Small icon
<i className="modus-icons text-sm">info</i>

// Base icon (Modus default 14px)
<i className="modus-icons text-base">warning</i>

// Large icon (16px)
<i className="modus-icons text-lg">error</i>

// Extra large icon (18px)
<i className="modus-icons text-xl">success</i>
```

### Modus Font Size Scale

| Tailwind Class | Size | Usage |
|----------------|------|-------|
| `text-2xs` | 8px | Micro icons, badges |
| `text-xs` | 10px | Small labels, captions |
| `text-sm` | 12px | Secondary icons |
| `text-base` | 14px | **Modus default size** |
| `text-lg` | 16px | Body text icons |
| `text-xl` | 18px | Large icons |
| `text-2xl` | 20px | Prominent icons |
| `text-3xl` | 24px | Display icons |

### Button Icon Sizing

Icons in buttons automatically scale based on button size:

```tsx
// Icons scale with button size
<ModusButton size="xs" icon="star" iconPosition="left">Extra Small</ModusButton>
<ModusButton size="sm" icon="star" iconPosition="left">Small</ModusButton>
<ModusButton size="md" icon="star" iconPosition="left">Medium</ModusButton>
<ModusButton size="lg" icon="star" iconPosition="left">Large</ModusButton>

// Icon-only buttons use larger icons
<ModusButton size="md" icon="settings" iconPosition="only" ariaLabel="Settings" />
```

Automatic sizing rules:
- **Icons with text**: Scale with button size (`text-xs` for xs, `text-lg` for md)
- **Icon-only buttons**: Get larger icons (`text-sm` for xs, `text-xl` for md)

Reference: `src/components/ModusButton.tsx:98-134`

## Icon Colors

Use design system colors:

```tsx
// Primary color
<i className="modus-icons text-primary">info</i>

// Success color
<i className="modus-icons text-success">check_circle</i>

// Warning color
<i className="modus-icons text-warning">warning</i>

// Error color
<i className="modus-icons text-error">error</i>

// Muted text
<i className="modus-icons text-muted-foreground">help</i>
```

## Accessibility

### Decorative Icons

For purely decorative icons, use `aria-hidden="true"`:

```tsx
<button>
  <i className="modus-icons mr-2" aria-hidden="true">save_disk</i>
  Save Document
</button>
```

### Informational Icons

For icons that convey meaning, provide proper labels:

```tsx
// Using role="img" and aria-label
<i className="modus-icons" role="img" aria-label="Warning">
  warning
</i>

// Using aria-label on parent element
<button aria-label="Delete item">
  <i className="modus-icons" aria-hidden="true">delete</i>
</button>
```

### Icon-Only Buttons

Always provide accessible labels:

```tsx
<ModusButton
  icon="settings"
  iconPosition="only"
  ariaLabel="Open settings menu"
/>
```

## Common Icon Names

### Navigation & UI

- `arrow_left`, `arrow_right`, `arrow_up`, `arrow_down`
- `chevron_left`, `chevron_right`
- `menu`, `close`, `home`, `settings`, `search`

### Actions & Operations

- `add`, `remove`, `edit_combination`, `delete`
- `save_disk`, `download`, `upload`, `copy_content`

### Status & Feedback

- `check`, `check_circle`, `error`, `warning`, `alert`, `info`, `help`

### Files & Documents

- `file`, `file_upload`, `file_download`
- `folder_open`, `folder_closed`, `document`, `image`, `video`

### User & Account

- `person`, `people_group`, `user_account`, `user_add`
- `key`, `lock`, `lock_open`

## Validating Icon Names

Check icon names against the complete list in:
- `.cursor/rules/modus-icon-names.mdc` - Complete list of 700+ valid icon names

Common mistakes:
- Using hyphens instead of underscores
- Wrong capitalization (all lowercase)
- Typos in icon names

## Testing Icons

### Visual Verification

Icons should display as glyphs, not text. If you see text like "save_disk" instead of an icon:

1. Check font CSS is loaded in `index.html`
2. Verify icon name uses underscores
3. Confirm `modus-icons` class is applied
4. Check network tab for font file download

### Browser DevTools Check

```javascript
// Check if font is loaded
const testElement = document.createElement('span');
testElement.className = 'modus-icons';
document.body.appendChild(testElement);
const fontFamily = window.getComputedStyle(testElement).fontFamily;
console.log('Font loaded:', fontFamily.includes('modus-icons'));
document.body.removeChild(testElement);
```

## Common Mistakes

1. **Wrong naming**: Using hyphens instead of underscores
2. **Wrong sizing**: Using pixel values instead of Tailwind classes
3. **Missing accessibility**: Not providing aria-label for informational icons
4. **Wrong icon name**: Not checking against valid icon list
5. **Font not loaded**: Missing CSS import for Modus icons

## Related Files

- `src/components/ModusIcon.tsx` - Icon component wrapper
- `src/components/ModusButton.tsx` - Button icon integration
- `.cursor/rules/modus-icon-names.mdc` - Complete icon name list
- `.cursor/rules/modus-icons-react.mdc` - Detailed icon documentation
