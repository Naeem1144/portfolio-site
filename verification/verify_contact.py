from playwright.sync_api import sync_playwright

def verify_contact_section():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the home page (assuming ContactSection is on the home page)
        try:
            page.goto("http://localhost:3000", timeout=60000)

            # Wait for the contact section to be visible
            # The contact section has a heading "Let's Work Together"
            page.get_by_text("Let's Work Together").scroll_into_view_if_needed()
            page.wait_for_selector("text=Let's Work Together")

            # Verify required field indicators
            # We expect to see "*" in red next to labels
            # Since the text is "Name *", we can check for that text content or the span

            # Take a screenshot of the contact form
            # We can locate the form container.
            # Looking at the code, the form is in a card.
            form_card = page.locator(".card-content").last

            # Ensure the form is fully visible
            form_card.scroll_into_view_if_needed()

            # Take screenshot
            page.screenshot(path="verification/contact_section.png")
            print("Screenshot saved to verification/contact_section.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_contact_section()
