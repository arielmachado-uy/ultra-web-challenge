export class Login {
  getUsernameTextbox() {
    return cy.get("#user-name");
  }

  getPasswordTextbox() {
    return cy.get("#password");
  }

  getLoginButton() {
    return cy.get("#login-button");
  }

  enterCredentials(username: string, password: string) {
    this.getUsernameTextbox().type(username);
    this.getPasswordTextbox().type(password);
  }
}
