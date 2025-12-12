# Palette's Journal - Critical Learnings

## 2024-05-23 - Dynamic Feedback and Focus States
**Learning:** Dynamic content like form submission success/error messages must be announced to screen readers. Relying solely on visual changes is insufficient.
**Action:** Use `role="alert"` for critical feedback and `aria-live="polite"` for the container to ensuring dynamic updates are announced. Also, ensure custom inputs have `focus-visible` styles for keyboard navigation.
