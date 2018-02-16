const puppeteer = require('puppeteer');

async function timeout(ms) {
    return new Promise(function(resolve) {
        setTimeout(resolve, ms)
    });
}

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://help.local/help/article/tasks/list', {waitUntil: 'networkidle2'});
    await timeout(10000);
    await page.screenshot({path: 'example.png'});
    const html = await page.evaluate(function() {
        return new XMLSerializer().serializeToString(document.doctype) + document.documentElement.outerHTML;
    })
    console.log(html)
    await browser.close();
})();