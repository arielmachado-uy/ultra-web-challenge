export class Cart {
  getItemName() {
    return cy.get('div[class="inventory_item_name"]');
  }

  getItemPrice() {
    return cy.get('div[class="inventory_item_price"]');
  }

  getCartQuantity() {
    return cy.get(".cart_quantity");
  }

  getCheckoutButton() {
    return cy.get("#checkout");
  }
}
