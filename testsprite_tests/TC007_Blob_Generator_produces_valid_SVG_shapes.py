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
        # -> Click on the Blob Maker button to open the Blob Generator tool
        frame = context.pages[-1]
        # Click on the Blob Maker button to open the Blob Generator tool 
        elem = frame.locator('xpath=html/body/div/div[2]/nav/div/div/div/div/a[7]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        # -> Adjust the Complexity slider to a new value to verify the shape preview updates accordingly
        frame = context.pages[-1]
        # Click and adjust the Complexity slider to change the blob shape complexity 
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div[2]/div[2]/div/span/span[2]/span').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        # -> Try adjusting the Size slider (index 33) to see if the shape preview updates accordingly
        frame = context.pages[-1]
        # Click and adjust the Size slider to change the blob shape size 
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div[2]/div[2]/div[2]/span/span[2]/span').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        # -> Try clicking the Randomize button to see if the blob shape preview updates accordingly
        frame = context.pages[-1]
        # Click the Randomize button to generate a new blob shape and verify if the preview updates 
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div[2]/div/div/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        # -> Export the blob as an SVG file by clicking the appropriate export or download button
        frame = context.pages[-1]
        # Click the export or download button to export the blob as an SVG file 
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000) 
        # -> Adjust the Complexity slider by clicking or dragging to a new value and verify the blob shape preview updates accordingly.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div[2]/div[2]/div/span/span[2]/span').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Adjust the Size slider by simulating keyboard input or dragging the slider handle to a new value and verify the blob preview updates accordingly.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div[2]/div[2]/div[2]/span/span[2]/span').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div[2]/div[2]/div[2]/span/span[2]/span').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click the 'Download SVG' button (index 46) to export the blob as an SVG file and verify the export.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div[2]/div[3]/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=Generate organic blob shapes with gradient colors, rotation, and animation').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=50%').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=256px').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Download SVG').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    