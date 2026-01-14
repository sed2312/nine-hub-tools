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
        # -> Click on the Grid Architect tool to open the CSS Grid Generator
        frame = context.pages[-1]
        # Click on the 'Grid Architect' tool to open the CSS Grid Generator
        elem = frame.locator('xpath=html/body/div/div[2]/main/section[3]/div/div[2]/a[4]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Adjust columns, rows, and gap using sliders or available controls to test grid generation
        frame = context.pages[-1]
        # Click and drag or adjust the slider for Columns
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div[2]/div[2]/div/div/span/span[2]/span').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        frame = context.pages[-1]
        # Click and drag or adjust the slider for Rows
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div[2]/div[2]/div/div[2]/span/span[2]/span').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Adjust the columns slider to 4, rows slider to 3, and gap slider to 20 and verify the live preview updates accordingly.
        frame = context.pages[-1]
        # Adjust columns slider to increase columns from 3 to 4
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div[2]/div[2]/div/div/span/span[2]/span').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        frame = context.pages[-1]
        # Adjust rows slider to increase rows from 2 to 3
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div[2]/div[2]/div/div[2]/span/span[2]/span').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        frame = context.pages[-1]
        # Adjust gap slider to increase gap from 16px to 20px
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div[2]/div[2]/div[2]/div[2]/span/span[2]/span').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Try to interact with sliders differently or verify if there are other controls to input gap, columns, and rows values. Then verify the live preview updates correctly.
        frame = context.pages[-1]
        # Try clicking columns slider again to adjust columns
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div[2]/div[2]/div/div/span/span[2]/span').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        frame = context.pages[-1]
        # Try clicking rows slider again to adjust rows
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div[2]/div[2]/div/div[2]/span/span[2]/span').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        frame = context.pages[-1]
        # Try clicking gap slider again to adjust gap
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div[2]/div[2]/div[2]/div[2]/span/span[2]/span').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Try to input values for columns, rows, and gap using alternative controls such as preset buttons or manual input fields if available, then verify the live preview updates correctly.
        frame = context.pages[-1]
        # Click preset button 'Classic Dashboard 4×4' to change grid dimensions
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div[2]/div[2]/div[4]/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Adjust the gap slider to 20px and verify the live preview and CSS code update accordingly.
        frame = context.pages[-1]
        # Adjust gap slider to increase gap from 16px to 20px
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div[2]/div[2]/div[2]/div[2]/span/span[2]/span').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click the 'Copy' button to export the generated CSS grid code and verify it matches the input configurations.
        frame = context.pages[-1]
        # Click the 'Copy' button to export the generated CSS grid code
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div[3]/div/div[2]/div/div/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=Grid Architect').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Professional CSS Grid designer with spanning, alignment, responsive preview, Elementor export, and 25+ presets').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Interactive grid preview where clicking any cell toggles spanning 2x2').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Columns').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Rows').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Gap').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Classic Dashboard 4×4').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=display: grid;').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=grid-template-columns: repeat(3, 1fr);').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=grid-template-rows: repeat(2, 1fr);').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=gap: 16px;').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    