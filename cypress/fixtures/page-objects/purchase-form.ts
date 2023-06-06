export class PurchaseForm {
  getNameTextbox() {
    return cy.get('input[data-test="firstName"]');
  }

  getSurnameTextbox() {
    return cy.get('input[data-test="lastName"]');
  }

  getPOTextbox() {
    return cy.get('input[data-test="postalCode"]');
  }

  getContinueButton() {
    return cy.get('input[data-test="continue"]');
  }
}
