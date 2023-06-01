export class Confirmation {
  getConfirmationMessage() {
    return cy.get('h2[class="complete-header"]');
  }

  getBackButton() {
    return cy.get('button[data-test="back-to-products"]');
  }
}