class LoginPage {

  usernameValid = 'Admin'
  passwordValid = 'admin123'

  usernameInvalid = 'WrongUser'
  passwordInvalid = 'WrongPassword'


  visitLoginPage() {
    cy.visit(
      'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
    )
  }

  usernameInput() {
    return cy.get('input[name="username"]')
  }

  passwordInput() {
    return cy.get('input[name="password"]')
  }

  loginButton() {
    return cy.get('button[type="submit"]')
  }

  typeUsername(username) {
    this.usernameInput().type(username)
  }

  typePassword(password) {
    this.passwordInput().type(password)
  }

  clickLogin() {
    this.loginButton().click()
  }

  login(username, password) {
    this.typeUsername(username)
    this.typePassword(password)
    this.clickLogin()
  }


  usernameRequired() {
    this.usernameInput()
      .parent()
      .parent()
      .should('contain', 'Required')
  }

  passwordRequired() {
    this.passwordInput()
      .parent()
      .parent()
      .should('contain', 'Required')
  }

  invalidCredentials() {
    cy.contains('Invalid credentials')
      .should('be.visible')
  }

  dashboardDisplayed() {
    cy.url().should('include', '/dashboard')

    cy.contains('Dashboard')
      .should('be.visible')
  }
}

export default LoginPage