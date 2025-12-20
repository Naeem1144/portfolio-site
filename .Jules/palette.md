## 2024-05-23 - Dynamic Form Feedback
**Learning:** Dynamic success/error messages inserted into the DOM are not announced by screen readers unless they have appropriate roles.
**Action:** Always add `role="alert"` to error containers and `role="status"` to success/notification containers to ensure immediate announcement.
