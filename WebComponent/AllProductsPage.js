const {By} = require('selenium-webdriver');

class AllProductsPage {
    constructor(driver) {
        this.driver = driver;
        this.productButton = By.css("[href='/products']");
        this.viewProductButton = By.xpath("//a[@href='/product_details/1']");
        this.productName = By.xpath("//h2[.='Blue Top']");
        this.productPrice = By.xpath("//span[.='Rs. 500']");
        this.productCatagory = By.xpath("//p[.='Category: Women > Tops']");
        this.productStock = By.xpath("//p[.='Availability: In Stock']");
        this.productBrand = By.xpath("//p[.='Brand: Polo']");
        this.productCondition = By.xpath("//p[.='Condition: New']");
    }
    async verifyProduct() {
        const productName = await this.driver.findElement(this.productName).getText();
        const productPrice = await this.driver.findElement(this.productPrice).getText();
        const productCatagory = await this.driver.findElement(this.productCatagory).getText();
        const productStock = await this.driver.findElement(this.productStock).getText();
        const productBrand = await this.driver.findElement(this.productBrand).getText();
        const productCondition = await this.driver.findElement(this.productCondition).getText();
        return {
            productName: productName.trim(),
            productPrice: productPrice.trim(),
            productCatagory: productCatagory.trim(),
            productStock: productStock.trim(),
            productBrand: productBrand.trim(),
            productCondition: productCondition.trim(),
        };
    }
    async productBtn() {
        await this.driver.findElement(this.productButton).click();
    }

    async ViewProductBtn() {
        await this.driver.findElement(this.viewProductButton).click();
    }

}

module.exports = AllProductsPage;