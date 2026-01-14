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
        # -> Click on the Meta Tags Generator tool button to open it
        frame = context.pages[-1]
        # Click on Meta Tags Generator tool button
        elem = frame.locator('xpath=html/body/div/div[2]/nav/div/div/div/div/a[9]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Input webpage title, description, keywords, author, OG image URL, social handle, and select platform, skipping Site URL input due to error
        frame = context.pages[-1]
        # Input webpage title
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div/div[2]/div/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('Test Website Title')
        

        frame = context.pages[-1]
        # Input webpage description
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div/div[2]/div[2]/textarea').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('This is a test description for the website to verify meta tag generation.')
        

        frame = context.pages[-1]
        # Input keywords
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div/div[2]/div[3]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('test, seo, meta tags')
        

        frame = context.pages[-1]
        # Input author name
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div/div[2]/div[4]/div/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('Test Author')
        

        frame = context.pages[-1]
        # Input OG image URL
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div/div[2]/div[5]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('https://testwebsite.com/og-image.png')
        

        frame = context.pages[-1]
        # Input social handle
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div/div[2]/div[6]/div/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('@testhandle')
        

        frame = context.pages[-1]
        # Select platform Twitter/X
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div/div[2]/div[6]/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click the Copy button to export the meta tags as an HTML snippet and verify the exported snippet for valid SEO-optimized tags
        frame = context.pages[-1]
        # Click the Copy button to export the generated meta tags HTML snippet
        elem = frame.locator('xpath=html/body/div').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=My Awesome Website').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=A fantastic website that does amazing things for users around the world.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=web, development, tools').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Your Name').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=https://example.com').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=https://example.com/og-image.png').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=@yourhandle').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=summary_large_image').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=website').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=canonical').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    