from playwright.sync_api import sync_playwright

def verify_contact_form():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the home page (assuming ContactSection is on the home page or accessible via scrolling)
        page.goto("http://localhost:3000")

        # Scroll to the contact section or find the form elements
        # The form elements are in ContactSection.tsx

        # We look for the labels with the asterisks
        # Note: The asterisk text is "*", but checking for visibility of the asterisk is good.

        # Wait for the form to be visible
        page.wait_for_selector('label:has-text("Full Name")')

        # Take a screenshot of the contact form area
        # We can try to locate the card containing the form
        contact_card = page.locator('.custom-card').last
        contact_card.scroll_into_view_if_needed()

        page.screenshot(path="verification/contact_form_asterisks.png")

        browser.close()

if __name__ == "__main__":
    verify_contact_form()
