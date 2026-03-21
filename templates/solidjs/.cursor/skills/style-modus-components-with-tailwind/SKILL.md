---
description: Use ModusDropdownMenu instead of ModusSelect for reliable event handling
globs: ["**/components/ModusSelect*.tsx", "**/components/ModusDropdownMenu*.tsx", "**/demos/**/page.tsx"]
alwaysApply: true
---

# Modus Select vs Dropdown Menu - Short

Use ModusDropdownMenu instead of ModusSelect for reliable event handling.

## Key Rules

- **Use ModusDropdownMenu, not ModusSelect** - ModusSelect has unreliable event handling in SolidJS
- **Reliable itemSelect events** - ModusDropdownMenu provides consistent event handling
- **Proper state management** - Use SolidJS signals to track selected values and visibility
- **Programmatic control** - Use callback refs to control dropdown visibility
- **Event handling patterns** - Handle `itemSelect` events for selection changes
- **Test thoroughly** - Verify dropdown behavior and event handling
- **Use established patterns** - Follow ModusDropdownMenu component patterns

## Reference

For detailed component comparison, implementation patterns, and advanced usage, fetch the full rule: `modus-select-vs-dropdown-menu-solidjs`
