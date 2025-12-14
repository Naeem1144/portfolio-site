## 2024-05-20 - Accessible Form Feedback
**Learning:** Screen readers require explicit `role="alert"` or `aria-live` regions to announce dynamic status changes like form success/error messages. Simple divs are ignored.
**Action:** Always wrap form feedback messages in a container with `role="alert"` (for errors) or `role="status"`/`aria-live="polite"` (for success).
