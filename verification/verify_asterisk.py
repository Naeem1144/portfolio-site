from playwright.sync_api import sync_playwright

def verify_asterisk():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # Wait for server to start
            page.goto("http://localhost:3000")

            # Scroll to contact section
            # The contact section id is "contact"
            page.locator("#contact").scroll_into_view_if_needed()

            # Wait for the contact form to be visible
            page.wait_for_selector("#contact form")

            # Take screenshot of the contact form
            # We want to see the labels with asterisks
            contact_section = page.locator("#contact")
            contact_section.screenshot(path="verification/contact_form.png")

            print("Screenshot taken: verification/contact_form.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_asterisk()
