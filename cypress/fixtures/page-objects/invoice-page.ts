export class Invoice {
  getInvoiceQuantity() {
    return cy.get('.cart_quantity');
  }

  getItemName() {
    return cy.get('div[class="inventory_item_name"]');
  }

  getItemPrice() {
    return cy.get('div[class="inventory_item_price"]');
  }

  getPaymentInformationLabel() {
    return cy.get('.summary_info_label').contains('Payment Information');
  }

  getShippingInformationLabel() {
    return cy.get('.summary_info_label').contains('Shipping Information');
  }

  getPriceTotalLabel() {
    return cy.get('.summary_info_label').contains('Price Total');
  }

  getPriceFromText(text: string) {
    return /[^$]*$/gm.exec(text);
  }

  getItemPriceLabel() {
    return cy.get('.summary_subtotal_label');
  }

  getTaxLabel() {
    return cy.get('.summary_tax_label');
  }

  getTotalLabel() {
    return cy.get('.summary_total_label');
  }

  getContinueButton() {
    return cy.get('button[data-test="finish"]');
  }
}