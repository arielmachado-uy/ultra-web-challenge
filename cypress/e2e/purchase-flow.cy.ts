import { Inventory } from "@pageObjects/inventory-page";
import { Cart } from "@pageObjects/cart-page";
import { PurchaseForm } from "@pageObjects/purchase-form";
import { Invoice } from "@pageObjects/invoice-page";
import { Confirmation } from "@pageObjects/confirmation-page";

describe("Purchase suite", () => {

  // Suite variables
  let inventoryPage = new Inventory();
  let cartPage = new Cart();
  let formPage = new PurchaseForm();
  let invoicePage = new Invoice();
  let confirmationPage = new Confirmation();

  let invoiceValues = {
        itemTotal: 0,
        tax: 0,
        total: 0
      }

  beforeEach(() => {
    cy.fixture('/test_data/user.json')
    .then(user => {
      cy.userLogin(user.username, user.password);
    })
  })

  it("Successful purchase of a single product", function () {
    //TODO: Get the list of items and randomly select one of them
    // Find all the items and store one in an alias
    inventoryPage.getInventoryItems(1).as('selectedProduct')

    // Store the button of the selected item for future usage
    cy.get('@selectedProduct').find('button').as('productButton')
    
    // Validate text before clicking on the button
    cy.get('@productButton').should('have.text', 'Add to cart')

    // Validate that the cart is empty
    inventoryPage.getCartCounter().should('not.exist')

    // Click on the selected product button
    cy.get('@productButton').click();

    // Validate text changed to remove
    cy.get('@productButton').should('have.text', 'Remove')

    // Check the count in the cart increased by 1
    inventoryPage.getCartCounter()
    .should('have.text', "1")

    // Store the name of the product for future validations
    cy.get('@selectedProduct')
    .find('.inventory_item_name')
    .then($value => {
      const name = $value.text()
      cy.wrap(name).as('productName')
    })
  
    // Display the name of the selected product
    cy.get("@productName")
    .then(name => cy.log(`Selected product: ${name}`))
    
    // Store the price of the product for future validations
    cy.get('@selectedProduct')
    .find('.inventory_item_price')
    .then($value => {
      const name = $value.text()
      cy.wrap(name).as('productPrice')
    })

    // Display the price of the product
    cy.get("@productPrice")
    .then(price => cy.log(`Selected product price: ${price}`))

    // Click on the cart
    inventoryPage.getCartButton().click();

    // Check Cart values
    // Get the name of the product in the cart and compare it with the stored one
    // TODO: Improve in order to different items in the cart
    cartPage.getItemName()
    .invoke('text')
    .then(selectedName => {
      cy.get("@productName").then(storedName => {
        expect(selectedName).to.be.equal(storedName);
      })
    })

    // Get the price of the product in the cart and compare it with the stored one
    cartPage.getItemPrice()
    .invoke('text')
    .then(selectedPrice => {
      cy.get("@productPrice").then(storedPrice => {
        expect(selectedPrice).to.be.equal(storedPrice);
      })
    })

   // Validate the number of products in the cart
   // Based on how the UI works, I should only have 1
   cartPage.getCartQuantity().should('have.text', '1');

    // Click on the Checkout button
   cartPage.getCheckoutButton().click();

    // Complete the checkout form
    formPage.getNameTextbox().type('Ariel');
    formPage.getSurnameTextbox().type('Machado');
    formPage.getPOTextbox().type('11600');

    // Click on the Continue button
    formPage.getContinueButton().click();

    // Check Overview values
    // Validate the number of products in the cart
   // Based on how the UI works, I should only have 1
   invoicePage.getInvoiceQuantity().should('have.text', '1');

   // Get the name of the product in the cart and compare it with the stored one
   invoicePage.getItemName()
   .invoke('text')
   .then(selectedName => {
     cy.get("@productName").then(storedName => {
       expect(selectedName).to.be.equal(storedName);
     })
   })

   // Get the price of the product in the cart and compare it with the stored one
   invoicePage.getItemPrice()
   .invoke('text')
   .then(selectedPrice => {
     cy.get("@productPrice").then(storedPrice => {
       expect(selectedPrice).to.be.equal(storedPrice);
     })
   })

    // Validate the sections of the invoice
    // Payment Information title
    invoicePage.getPaymentInformationLabel().should('be.visible');
    // Payment information will change so I just check that there is some text there
    invoicePage.getPaymentInformationLabel().next().should('be.visible');
    
    // Shipping Information title
    invoicePage.getShippingInformationLabel().should('be.visible');
    // Shipping information will change so I just check that there is some text there
    invoicePage.getShippingInformationLabel().next().should('be.visible');
    
    // Price Total title
    invoicePage.getPriceTotalLabel().should('be.visible');
    
    // Get Item total value
   invoicePage.getItemPriceLabel()
   .invoke('text')
   .then(subTotal => {
    invoiceValues.itemTotal = Number(invoicePage.getPriceFromText(subTotal));
    cy.get("@productPrice").then(storedPrice => {
      expect(`$${invoiceValues.itemTotal}`).to.be.equal(storedPrice);
    })
  })

    // Get Tax value
   invoicePage.getTaxLabel() 
    .invoke('text')
    .then(tax => {
      invoiceValues.tax = Number(invoicePage.getPriceFromText(tax));
    })

    // Get Total value
    invoicePage.getTotalLabel()
    .invoke('text')
    .then(total => {
      invoiceValues.total = Number(invoicePage.getPriceFromText(total));
   
      // Math validations
    expect((invoiceValues.total).toString()).to.be.equal((invoiceValues.itemTotal + invoiceValues.tax).toFixed(2));
  })

  // Click on the Continue button
  invoicePage.getContinueButton().click();

  // Validate confirmation message
  confirmationPage.getConfirmationMessage().should('have.text', 'Thank you for your order!')

  // Click on the Back Home button
  confirmationPage.getBackButton().click();

  // Validate that the cart is empty
  inventoryPage.getCartCounter().should('not.exist')
   })
})