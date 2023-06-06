export class Inventory {
  getInventoryItems(position: number) {
    return cy.get('div[class="inventory_item"]').eq(position);
  }

  getCartCounter() {
    return cy.get('span[class="shopping_cart_badge"]');
  }

  getCartButton() {
    return cy.get("a.shopping_cart_link");
  }
}
