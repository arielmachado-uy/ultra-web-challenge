import 'cypress-v10-preserve-cookie'
import { Login } from '../fixtures/login-page'

const loginPage = new Login();

declare global {
  namespace Cypress {
    interface Chainable {
      userLogin(username: string, password: string): null;
    }
  }
}

Cypress.Commands.add("userLogin", (username: string, password: string) => {
  cy.visit('/')
  loginPage.enterCredentials(username, password);
  loginPage.getLoginButton().click();
})