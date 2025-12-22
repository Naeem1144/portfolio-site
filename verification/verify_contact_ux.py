from playwright.sync_api import sync_playwright

def verify_contact_form():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.set_viewport_size({"width": 1280, "height": 800})

        # Navigate to the home page
        page.goto("http://localhost:3000")

        # Locate the message textarea
        message_area = page.locator('textarea[name="message"]')

        # Scroll it into view
        message_area.scroll_into_view_if_needed()

        # Type into the message box
        message_area.fill("Hello, this is a test message to check the character count.")

        # Wait a bit
        page.wait_for_timeout(500)

        # Take a screenshot of the form area
        # Target the card containing "Send a Message" title specifically
        # The profile card (which was captured previously) is also a .custom-card
        # so we need to be more specific.

        # Find the card that contains "Send a Message"
        contact_card = page.locator('.custom-card').filter(has_text="Send a Message")

        if contact_card.count() > 0:
            contact_card.screenshot(path="verification/contact_form_correct.png")
        else:
            # Fallback to screenshotting the section
            page.locator('h2:has-text("Let\'s Connect")').screenshot(path="verification/contact_form_fallback.png")

        browser.close()

if __name__ == "__main__":
    verify_contact_form()
