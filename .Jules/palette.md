## 2024-05-24 - Missing Required Field Indicators
**Learning:** Users with cognitive disabilities (and everyone else) benefit from explicit visual cues for required fields, even if the form logic enforces it. Relying solely on browser validation or color coding isn't enough.
**Action:** Always include a visual indicator (like a red asterisk) for required fields, and ensure it's hidden from screen readers (`aria-hidden="true"`) if the input already has the `required` attribute to avoid redundancy.
