from playwright.sync_api import sync_playwright
import time

def verify_loading_spinner():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the page
        page.goto("http://localhost:3000")

        # Fill the form
        page.fill("input[name='name']", "Test User")
        page.fill("input[name='email']", "test@example.com")
        page.fill("textarea[name='message']", "This is a test message to verify the loading spinner.")

        # Click the submit button
        # We need to capture the state while it is submitting.

        # We can intercept the route to delay the response so we can capture the spinner
        # delay is not a valid argument for route.fulfill in playwright python sync api apparently or I messed up.
        # Let's try handling the route with a python sleep.

        def handle_route(route):
            time.sleep(2)
            route.fulfill(status=200, body='{"success": true}')

        page.route("**/api/contact", handle_route)

        submit_button = page.locator("button[type='submit']")
        submit_button.click()

        # Wait for a brief moment for the state to update (button should be disabled and showing spinner)
        page.wait_for_timeout(500)

        # Take a screenshot
        page.screenshot(path="verification/loading_spinner.png")

        browser.close()

if __name__ == "__main__":
    verify_loading_spinner()
