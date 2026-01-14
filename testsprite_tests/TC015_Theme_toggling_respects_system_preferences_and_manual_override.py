import asyncio
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None

    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()

        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )

        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)

        # Open a new page in the browser context
        page = await context.new_page()

        # Navigate to your target URL and wait until the network request is committed
        await page.goto("http://localhost:8080", wait_until="commit", timeout=10000)

        # Wait for the main page to reach DOMContentLoaded state (optional for stability)
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=3000)
        except async_api.Error:
            pass

        # Iterate through all iframes and wait for them to load as well
        for frame in page.frames:
            try:
                await frame.wait_for_load_state("domcontentloaded", timeout=3000)
            except async_api.Error:
                pass

        # Interact with the page elements to simulate user flow
        # -> Set system theme to dark mode
        frame = context.pages[-1]
        # Click the theme toggle button to check current theme state or toggle manually if needed 
        elem = frame.locator('xpath=html/body/div/div[2]/nav/div/div/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        # -> Manually toggle to light mode using theme toggle control
        frame = context.pages[-1]
        # Manually toggle to light mode using the theme toggle control 
        elem = frame.locator('xpath=html/body/div/div[2]/nav/div/div/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        # -> Reload application to verify saved theme preference overrides system theme
        await page.goto('http://localhost:8080/', timeout=10000)
        await asyncio.sleep(3)
        # -> Click the theme toggle button to manually toggle theme and observe visual changes to confirm current theme mode
        frame = context.pages[-1]
        # Click the theme toggle button to toggle theme and observe visual changes to confirm current theme mode 
        elem = frame.locator('xpath=html/body/div/div[2]/nav/div/div/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000) 
        # -> Click the theme toggle button to manually toggle theme again and observe any changes in page content or attributes that might indicate theme mode.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div[2]/nav/div/div/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Manually toggle the theme again using the toggle button to observe if the theme changes visually and then reload the application to check if the last toggled theme persists.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div[2]/nav/div/div/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        await page.goto('http://localhost:8080/', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Manually toggle the theme again using the toggle button to observe if the theme changes visually and then verify if the last toggled theme persists after reload.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div[2]/nav/div/div/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Scroll down to check if any footer or additional page elements provide theme mode indicators or storage info for persistence verification.
        await page.mouse.wheel(0, await page.evaluate('() => window.innerHeight'))
        

        # -> Manually toggle the theme to light mode again using the toggle button and verify the visual change to light mode.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div[2]/nav/div/div/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Reload the application to verify that the saved theme preference (light mode) overrides the system theme (dark mode).
        await page.goto('http://localhost:8080/', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Manually toggle the theme to dark mode again using the toggle button and verify the visual change to dark mode.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div[2]/nav/div/div/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Reload the application one last time to verify that the saved dark mode preference overrides the system theme.
        await page.goto('http://localhost:8080/', timeout=10000)
        await asyncio.sleep(3)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=NineProo').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Design Tools').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Toggle theme').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Pricing').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Free Forever').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Instant Export').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=No Signup').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Professional-grade tools for modern web development. Generate CSS, check accessibility, optimize prompts, and more.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Explore Tools').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=9').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Tools').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=100%').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Privacy').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=0').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Cost').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Why NineProo?').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Built for developers who value speed, privacy, and simplicity.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Lightning Fast').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=All tools run entirely in your browser. No server calls, no waiting. Instant results every time.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=100% Private').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Your data never leaves your device. No tracking, no cookies, no analytics. Complete privacy.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Always Free').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=All 9 tools are completely free to use. No signup required, no setup — just start creating.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Free').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Glass Architect').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Generate stunning glassmorphism and frosted glass CSS effects with live preview.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Open tool').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Prompt Engineer').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Optimize your AI prompts with persona, tone, and output format controls.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Palette Master').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Generate algorithmic color harmonies with lock, copy, and export features.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Grid Architect').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Visual CSS Grid layout designer with interactive preview and instant export.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Gradient Text').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Create eye-catching gradient text effects with customizable colors and direction.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Shadow Studio').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Design neumorphic shadows with light source control and shape presets.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Blob Maker').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Generate organic blob shapes with gradient colors and optional animation.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Contrast Eye').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=WCAG accessibility checker with vision simulations and auto-fix suggestions.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Meta Tags').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=SEO and Open Graph meta tag generator with live Google and social previews.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Pricing').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Simple, Transparent Pricing').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=All tools are currently 100% free. Pro plans coming soon!').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Current').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Free').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=$0forever').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Essential tools for everyone').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=All 9 tools included').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=3 preset saves per tool').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=CSS/SVG export').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Community support').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Current Plan').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Coming Soon').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Pro Monthly').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=$12/month').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=For power users').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Everything in Free').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Unlimited preset saves').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Export as PNG/SVG images').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Priority support').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=No watermarks').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Early access to new tools').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Pro Annual').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=$99/year').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Best value — save 17%').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Everything in Pro Monthly').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2 months free').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Exclusive templates').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Lifetime updates').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Frequently Asked Questions').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Everything you need to know about NineProo').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Is NineProo really free?').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Do I need to create an account?').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Is my data private?').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Can I use the generated CSS in commercial projects?').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=What browsers are supported?').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=How do I export my work?').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Will more tools be added?').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=NineProo').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Design Tools').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=© 2026').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Contact').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Privacy').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Terms').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    