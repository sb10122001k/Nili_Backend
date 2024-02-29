// Import puppeteer
import puppeteer from 'puppeteer'
interface elements extends Element {
    innerText:string
}
async function scrapeEvents() {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  console.log("Herer",page)
  await page.goto('https://insider.in/parties-in-bengaluru-weekend');

  // Scroll to the bottom of the page to load more content
  // await autoScroll(page);
  // Wait for the div elements to load
  console.log("Here2")

  await page.waitForSelector('[data-ref="event_card"]');
  await page.waitForSelector('[data-ref="event_card_image"]');
  await page.waitForSelector('[data-ref="event_card_title"]');
  await page.waitForSelector('[data-ref="event_card_date_string"] p');
  await page.waitForSelector('[data-ref="event_card_location"]');

  // Extract data
  const eventData = await page.evaluate(() => {
    const eventCards = document.querySelectorAll('[data-ref="event_card"]');
    const eventData = [];
    eventCards.forEach(card => {
      const titleElement:elements = card.querySelector('[data-ref="event_card_title"]');
      const dateElement:elements = card.querySelector('[data-ref="event_card_date_string"] p');
      const locationElement:elements = card.querySelector('[data-ref="event_card_location"]');
      const linkElement = card.querySelector('a');
      const imageElement = card.querySelector('[data-ref="event_card_image"]');

      const title = titleElement ? titleElement.innerText : '';
      const date = dateElement ? dateElement.innerText : '';
      const location = locationElement ? locationElement.innerText : '';
      const link = linkElement ? linkElement.href : '';
      const imageURL = imageElement ? imageElement.getAttribute('src') : '';

      eventData.push({
        title: title,
        date: date,
        location: location,
        link: link,
        imageURL: imageURL
      });
    });
    
    return eventData;
  });

  // Close the browser
  await browser.close();

  // Return the scraped data
  return eventData;
}

// Define the autoScroll function
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise<void>((resolve, reject) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 500);
    });
  });
}

// Export the function
export {scrapeEvents};
