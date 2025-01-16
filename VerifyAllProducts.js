const {Builder, By} = require('selenium-webdriver');

const DashboardPage = require ('./WebComponent/DashboardPage');
const AllProductsPage = require ('./WebComponent/AllProductsPage');

const assert = require('assert');
const fs = require('fs');
require('dotenv').config();

const browser = process.env.BROWSER;
const baseURL = process.env.BASE_URL;


const screenshotDir = './screenshots/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true});
}

describe('TestCase 8 [Verify Products Page]', function(){
    this.timeout(50000);
    let driver;

    switch (browser) {
        case 'chrome' :
        default :
            const chrome = require('selenium-webdriver/chrome');
            options = new chrome.Options();
            options.addArguments('--headless');
        break;
    }

    //Run setiap mulai test, satu kali saja paling awal
    before(async function () {
        //Run tanpa membuka chorome dengan menggunakan --headless
        driver = await new Builder().forBrowser(browser).setChromeOptions(options).build();
    });

    it('Verify HomePage', async function () {
        const dashboardPage = new DashboardPage(driver);
        await dashboardPage.navigate(baseURL);
        const isLogoDisplayed = await dashboardPage.verifyLogoHome();
        if (isLogoDisplayed) {
            console.log("Homepage is visible successfully.");
        } else {
            console.log("Homepage is not visible.");
        }  
    });
    it('Verify Products Page', async function () {
        const allProductsPage = new AllProductsPage(driver);
        await allProductsPage.productBtn();
        // Verify user is navigated to ALL PRODUCTS page successfully
        const currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, `${baseURL}/products`, 'URL does not match');
        // The products list is visible
        const productList = await driver.findElement(By.css(".features_items"));
        const isDisplayed = await productList.isDisplayed();
        assert(isDisplayed, 'Product list is not visible');
        await allProductsPage.ViewProductBtn();
    });

    it('Verify Product Details Page', async function () {
        const allProductsPage = new AllProductsPage(driver);
        const actualProductDetails = await allProductsPage.verifyProduct();
        const expectedProductDetails = {
            productName: 'Blue Top',
            productPrice: 'Rs. 500',
            productCatagory: 'Category: Women > Tops',
            productStock: 'Availability: In Stock',
            productBrand: 'Brand: Polo',
            productCondition: 'Condition: New',
        };
    
        // Verifikasi masing-masing atribut
        assert.strictEqual(actualProductDetails.productName, expectedProductDetails.productName, 'Product name does not match');
        assert.strictEqual(actualProductDetails.productPrice, expectedProductDetails.productPrice, 'Product price does not match');
        assert.strictEqual(actualProductDetails.productCatagory, expectedProductDetails.productCatagory, 'Product category does not match');
        assert.strictEqual(actualProductDetails.productStock, expectedProductDetails.productStock, 'Product stock does not match');
        assert.strictEqual(actualProductDetails.productBrand, expectedProductDetails.productBrand, 'Product brand does not match');
        assert.strictEqual(actualProductDetails.productCondition, expectedProductDetails.productCondition, 'Product condition does not match');
    
        console.log('All product details verified successfully');
    });
    //Assertion atau validasi
    afterEach(async function () {
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`
        fs.writeFileSync(filepath, screenshot, 'base64');
        console.log('Screenshot succesfully saved');
    });
    
    after(async function () {
        await driver.quit()
    });
});