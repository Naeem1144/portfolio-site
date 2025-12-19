from playwright.sync_api import sync_playwright

def verify_contact_ux():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            page.goto("http://localhost:3000")

            # Scroll to contact section
            contact_section = page.locator("#contact")
            contact_section.scroll_into_view_if_needed()

            # Wait for content to load
            page.wait_for_timeout(2000)

            # Fill form partially
            page.fill('input[name="name"]', "Test User")
            page.fill('input[name="email"]', "test@example.com")
            page.fill('textarea[name="message"]', "This is a test message to verify the loading spinner.")

            # Click submit
            submit_btn = page.get_by_role("button", name="Send Message")

            # Mock the API response to be slow so we can catch the spinner
            page.route("**/api/contact", lambda route: route.continue_())

            # We want to capture the spinner, but it might be too fast with local server.
            # However, we can at least capture the form with the button.
            # To capture the spinner, we'd need to intercept the request and delay it.

            def handle_route(route):
                # Delay the response
                import time
                time.sleep(2)
                route.fulfill(status=200, body='{"success": true}')

            page.route("**/api/contact", handle_route)

            # Click and immediately screenshot
            submit_btn.click()

            # Wait a split second for React state update
            page.wait_for_timeout(500)

            page.screenshot(path="verification/contact_spinner.png")

        finally:
            browser.close()

if __name__ == "__main__":
    verify_contact_ux()
