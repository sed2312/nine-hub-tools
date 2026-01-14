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
        # -> Click on the Prompt tool button to access the AI Prompt Generator.
        frame = context.pages[-1]
        # Click on the Prompt tool button to open the AI Prompt Generator 
        elem = frame.locator('xpath=html/body/div/div[2]/nav/div/div/div/div/a[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        # -> Click the Templates button to select a different prompt template.
        frame = context.pages[-1]
        # Click the Templates button to open prompt template options 
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div/div/div[2]/button[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        # -> Select the 'Blog Post Outline' template from the Writing category to test filling customizable fields.
        frame = context.pages[-1]
        # Select the 'Blog Post Outline' template from the Writing category 
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div[2]/div[2]/div[4]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        # -> Fill in the 'Core Task' field with a sample task description.
        frame = context.pages[-1]
        # Fill in the Core Task field with a sample task description. 
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div/div[2]/div/textarea').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('Write a blog post outline about the benefits of AI in healthcare.')
        # -> Fill in the 'Context / Background' field with relevant context information.
        frame = context.pages[-1]
        # Fill in the Context / Background field with relevant context information. 
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div/div[2]/div[2]/textarea').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('AI technology is transforming healthcare by improving diagnostics, treatment plans, and patient outcomes.')
        # -> Change the 'Persona' field from 'Generic' to 'Professional' to test template customization.
        frame = context.pages[-1]
        # Click the Persona dropdown to change from Generic to Professional 
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div/div[2]/div[3]/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        # -> Change the Persona field from 'Generic' to 'Professional' to test template customization.
        frame = context.pages[-1]
        # Click the Persona dropdown to open options 
        elem = frame.locator('xpath=html/body/div[2]/div').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        # -> Fill the Constraints field with a sample constraint and verify the prompt updates accordingly.
        frame = context.pages[-1]
        # Fill the Constraints field with sample constraints. 
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div/div[2]/div[4]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('Max 500 words, include at least 3 subheadings, use engaging language.')
        # -> Click the 'Add Example' button to add an example prompt for few-shot learning.
        frame = context.pages[-1]
        # Click the 'Add Example' button to add an example prompt for few-shot learning. 
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div/div[2]/div[6]/div/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        # -> Fill in the 'Input example...' field with a sample input to test example prompt addition.
        frame = context.pages[-1]
        # Fill in the 'Input example...' field with a sample input for the example prompt. 
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div/div[2]/div[6]/div[2]/div[2]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('Create an outline for a blog post about AI in education.')
        # -> Fill in the 'Expected output...' field with a sample expected output for the example prompt.
        frame = context.pages[-1]
        # Fill in the 'Expected output...' field with a sample expected output for the example prompt. 
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div/div[2]/div[6]/div[2]/div[2]/input[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('An outline with introduction, key benefits, challenges, and conclusion sections.')
        # -> Click the export button to export the constructed prompt text and verify the exported prompt matches the constructed prompt.
        frame = context.pages[-1]
        # Click the 'Save preset' or export button to export the constructed prompt text. 
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div/div/div[2]/div/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        # -> Input a preset name and save the preset to complete the export process.
        frame = context.pages[-1]
        # Input a preset name in the Save Preset dialog to save the constructed prompt. 
        elem = frame.locator('xpath=html/body/div[3]/div[2]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('Blog Post Outline AI Healthcare')
        # -> Click the Save button to save the preset and complete the export process.
        frame = context.pages[-1]
        # Click the Save button to save the preset and complete the export process. 
        elem = frame.locator('xpath=html/body/div[3]/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000) 
        # -> Click the Templates button to select a different prompt template.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div/div/div[2]/button[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click the 'Blog Post Outline' template to select it.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div[2]/div[2]/div[4]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Fill in the 'Core Task' field with a sample task description.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div/div[2]/div/textarea').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('Create a comprehensive blog post outline about AI Prompt Generators including:\n- Catchy title with primary keyword\n- Meta description (150-160 chars)\n- Introduction hook\n- 5-7 main sections with H2/H3 headings\n- Key points under each section\n- Conclusion with CTA\n- FAQ section (5 questions)')
        

        # -> Fill in the 'Context / Background' field with relevant context information.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div/div[2]/div[2]/textarea').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('Target audience: marketing professionals and content creators. Keyword: AI prompt generators. Intent: informational.')
        

        # -> Change the 'Persona' field from 'Generic' to 'Professional' to test template customization.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div/div[2]/div[3]/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Scroll down to reveal more elements and re-examine the Constraints field input element to find the correct index or interaction method.
        await page.mouse.wheel(0, 200)
        

        # -> Input sample constraints text into the Constraints field using element index 39.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div/div[2]/div[4]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('Max 500 words, include at least 3 examples, avoid jargon.')
        

        # -> Click the 'Add Example' button to add an example prompt for few-shot learning.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div/div[2]/div[6]/div/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Fill in the 'Input example...' field with a sample input to test example prompt addition.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div/div[2]/div[6]/div[2]/div[2]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('Write a blog post outline about AI in healthcare.')
        

        # -> Fill in the 'Expected output...' field with a sample expected output for the example prompt.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div[2]/main/div/div/div[2]/div/div/div[2]/div[6]/div[2]/div[2]/input[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('- Introduction to AI in healthcare\n- Benefits and challenges\n- Key technologies\n- Use cases\n- Future trends\n- Conclusion')
        

        # -> Click the export button to export the constructed prompt text and verify the exported prompt matches the constructed prompt.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div[2]/nav/div/div/div[2]/button[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        try:
            await expect(frame.locator('text=AI Prompt Generator Failure Notification').first).to_be_visible(timeout=1000)
        except AssertionError:
            raise AssertionError("Test case failed: The AI Prompt Generator did not correctly build or export prompts as per the test plan steps.")
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    