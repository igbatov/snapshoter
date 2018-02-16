require('babel-register');
const puppeteer = require('puppeteer');

function timeout(ms) {
    return new Promise(function(resolve) {
        setTimeout(resolve, ms)
    });
};

var page = null
var browser = null
puppeteer.launch().then(function(b) {
    browser = b;
    return browser.newPage();
}).then(function(p){
    page = p;
    return page.setViewport({width: 5960, height: 4209});
}).then(function(p) {
    return page.goto('http://help.local/help/article/tasks/list', {waitUntil: 'networkidle2'});
}).then(function(page) {
    return timeout(10000);
}).then(function(p) {
    return page.evaluate(function() {
        return new XMLSerializer().serializeToString(document.doctype) + document.documentElement.outerHTML;
    })
    //return page.screenshot({path: 'example.png'});
}).then(function(html){
    console.log(html)
    browser.close();
});