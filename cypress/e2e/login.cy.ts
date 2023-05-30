import { Login } from '../fixtures/login-page'

describe("Log in suite", () => {
  beforeEach(() => {
    cy.visit('/');
  })

  const loginPage = new Login();

  it("Log in with an existing email address", function () {
    loginPage.enterCredentials('standard_user', 'secret_sauce');
    loginPage.getLoginButton().click();
  });
})