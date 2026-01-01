from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # Navigate to the contact page section
            page.goto("http://localhost:3000/#contact")

            # Wait for the contact form header
            page.wait_for_selector('text=Send a Message')

            # Locate the specific card that contains "Send a Message"
            contact_card = page.locator('.custom-card').filter(has_text="Send a Message")

            # Scroll it into view just in case
            contact_card.scroll_into_view_if_needed()

            # Take a screenshot
            contact_card.screenshot(path="verification/contact_form_asterisks.png")
            print("Screenshot taken successfully")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
