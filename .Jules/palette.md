## 2024-05-23 - Dynamic Form Status Accessibility
**Learning:** Dynamic success/error messages in forms are often not announced by screen readers unless explicitly marked with `role="alert"` or wrapped in an `aria-live` region.
**Action:** Always wrap form feedback messages in a container with `role="alert"` (for errors) or `aria-live="polite"` (for success) to ensure users are aware of the outcome without having to navigate around.
