// Test the game using Playwright
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:8000/cosmic-pong.html');
  await page.waitForTimeout(3000);
  
  // Click single player button via JavaScript
  await page.evaluate(() => {
    const btn = document.getElementById('singlePlayerBtn');
    if (btn) {
      console.log('Found button, clicking...');
      btn.click();
    } else {
      console.log('Button not found');
    }
  });
  
  await page.waitForTimeout(2000);
  
  // Check if game started
  const gameContainer = await page.evaluate(() => {
    const container = document.getElementById('gameContainer');
    return container ? container.classList.contains('active') : false;
  });
  
  console.log('Game container active:', gameContainer);
  
  await browser.close();
})();
