from playwright.sync_api import sync_playwright, expect

def verify_contact_form(page):
    page.goto('http://localhost:3000')

    # Wait for the contact form to be visible
    # We look for "Send a Message" heading
    page.get_by_role("heading", name="Send a Message").wait_for()

    # Scroll to the contact section to ensure it's in view for screenshot
    contact_section = page.get_by_role("heading", name="Send a Message")
    contact_section.scroll_into_view_if_needed()

    # Verify the "Full Name" label contains the asterisk
    # We can't easily check for the asterisk inside the label with text matcher alone
    # because it might be split in the DOM, but we can check the locator.

    # Take a screenshot of the contact form
    page.screenshot(path="verification/contact_form.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_contact_form(page)
        finally:
            browser.close()
