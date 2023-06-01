describe("Purchase suite", () => {

  before(() => {
    cy.userLogin('standard_user', 'secret_sauce');
  })

  beforeEach(() => {
    cy.preserveCookieOnce('session-username')
  })

  it("Successful purchase of a single product", function () {
    // Find all the items and store one in an alias
    cy.get('div[class="inventory_item"]').eq(1).as('selectedProduct')

    // Validate text before clicking on it
    cy.get('@selectedProduct')
    .find('button')
    .should('have.text', 'Add to cart')

    // Validate that the cart is empty
    cy.get('span[class="shopping_cart_badge"]').should('not.exist')

    // Click on the stored button
    cy.get('@selectedProduct')
    .find('button')
    .click();

    // Validate text changed to remove
    cy.get('@selectedProduct')
    .find('button')
    .should('have.text', 'Remove')

    // Check the count in the cart increased by 1
    cy.get('span[class="shopping_cart_badge"]')
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
    cy.get('a.shopping_cart_link').click();

    // Check Cart values
    // Get the name of the product in the cart and compare it with the stored one
    cy.get('div[class="inventory_item_name"]')
    .invoke('text')
    .then(selectedName => {
      cy.get("@productName").then(storedName => {
        expect(selectedName).to.be.equal(storedName);
      })
    })

    // Get the price of the product in the cart and compare it with the stored one
    cy.get('div[class="inventory_item_price"]')
    .invoke('text')
    .then(selectedPrice => {
      cy.get("@productPrice").then(storedPrice => {
        expect(selectedPrice).to.be.equal(storedPrice);
      })
    })

   // Validate the number of products in the cart
   // Based on how the UI works, I should only have 1
    cy.get('.cart_quantity').should('have.text', '1');

    // Click on the Checkout button
    cy.get('#checkout').click();

    // Complete the checkout form
    cy.get('input[data-test="firstName"]').type('Ariel');
    cy.get('input[data-test="lastName"]').type('Machado');
    cy.get('input[data-test="postalCode"]').type('11600');

    // Click on the Continue button
    cy.get('input[data-test="continue"]').click();

    // Check Overview values
    // Validate the number of products in the cart
   // Based on how the UI works, I should only have 1
   cy.get('.cart_quantity').should('have.text', '1');

   // Get the name of the product in the cart and compare it with the stored one
   cy.get('div[class="inventory_item_name"]')
   .invoke('text')
   .then(selectedName => {
     cy.get("@productName").then(storedName => {
       expect(selectedName).to.be.equal(storedName);
     })
   })

   // Get the price of the product in the cart and compare it with the stored one
   cy.get('div[class="inventory_item_price"]')
   .invoke('text')
   .then(selectedPrice => {
     cy.get("@productPrice").then(storedPrice => {
       expect(selectedPrice).to.be.equal(storedPrice);
     })
   })

    // Validate the sections of the invoice
    // Payment Information title
    cy.get('.summary_info_label').contains('Payment Information').should('be.visible');
    // Payment information will change so I just check that there is some text there
    cy.get('.summary_info_label').contains('Payment Information').next().should('be.visible');
    
    // Shipping Information title
    cy.get('.summary_info_label').contains('Shipping Information').should('be.visible');
    // Shipping information will change so I just check that there is some text there
    cy.get('.summary_info_label').contains('Shipping Information').next().should('be.visible');
    
    // Price Total title
    cy.get('.summary_info_label').contains('Price Total').should('be.visible');
    
    function getPriceFromText(text: string) {
      return /[^$]*$/gm.exec(text);
    }
    
    let invoiceValues = {
      itemTotal: 0,
      tax: 0,
      total: 0
    }

    // Get Item total value
   cy.get('.summary_subtotal_label')
   .invoke('text')
   .then(subTotal => {
    invoiceValues.itemTotal = Number(getPriceFromText(subTotal));
    cy.get("@productPrice").then(storedPrice => {
      expect(`$${invoiceValues.itemTotal}`).to.be.equal(storedPrice);
   
    })

    // Get Tax value
    cy.get('.summary_tax_label')
    .invoke('text')
    .then(tax => {
      invoiceValues.tax = Number(getPriceFromText(tax));

    // Get Total value
    cy.get('.summary_total_label')
    .invoke('text')
    .then(total => {
      invoiceValues.total = Number(getPriceFromText(total));
   
      // Math validations
    expect((invoiceValues.total).toString()).to.be.equal((invoiceValues.itemTotal + invoiceValues.tax).toFixed(2));
  })

  // Click on the Continue button
  cy.get('button[data-test="finish"]').click();

  // Validate confirmation message
  cy.get('h2[class="complete-header"]').should('have.text', 'Thank you for your order!')

  // Click on the Back Home button
  cy.get('button[data-test="back-to-products"]').click();

  // Validate that the cart is empty
  cy.get('span[class="shopping_cart_badge"]').should('not.exist')
    })
   })
  });
})