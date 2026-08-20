describe('Login OrangeHRM - 12 Test Cases', () => {

  beforeEach(() => {
    cy.visit(
      'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
    )
  })


  it('TC-LOGIN-01 - Login dengan username dan password valid', () => {

    cy.intercept('POST', '**/api/v2/auth/login').as('loginValid')

    cy.get('input[name="username"]')
      .should('be.visible')
      .type('Admin')

    cy.get('input[name="password"]')
      .should('be.visible')
      .type('admin123')

    cy.get('button[type="submit"]')
      .click()

    cy.wait('@loginValid')
      .its('response.statusCode')
      .should('eq', 302)

    cy.url()
      .should('include', '/dashboard')

    cy.contains('Dashboard')
      .should('be.visible')

    cy.screenshot('TC-LOGIN-01-PASSED', {
      capture: 'fullPage'
    })
  })


  it('TC-LOGIN-02 - Username kosong dan password valid', () => {

    cy.intercept('POST', '**/api/v2/auth/login').as('loginUsernameEmpty')

    cy.get('input[name="password"]')
      .type('admin123')

    cy.get('button[type="submit"]')
      .click()

    // Memastikan request login tidak dikirim
    cy.get('@loginUsernameEmpty.all')
      .should('have.length', 0)

    cy.get('input[name="username"]')
      .parent()
      .parent()
      .should('contain', 'Required')

    cy.screenshot('TC-LOGIN-02-PASSED', {
      capture: 'fullPage'
    })
  })


  it('TC-LOGIN-03 - Username valid dan password kosong', () => {

    cy.intercept('POST', '**/api/v2/auth/login').as('loginPasswordEmpty')

    cy.get('input[name="username"]')
      .type('Admin')

    cy.get('button[type="submit"]')
      .click()

    cy.get('@loginPasswordEmpty.all')
      .should('have.length', 0)

    cy.get('input[name="password"]')
      .parent()
      .parent()
      .should('contain', 'Required')

    cy.screenshot('TC-LOGIN-03-PASSED', {
      capture: 'fullPage'
    })
  })

  it('TC-LOGIN-04 - Username dan password kosong', () => {

    cy.intercept('POST', '**/api/v2/auth/login').as('loginBothEmpty')

    cy.get('button[type="submit"]')
      .click()

    cy.get('@loginBothEmpty.all')
      .should('have.length', 0)

    cy.get('input[name="username"]')
      .parent()
      .parent()
      .should('contain', 'Required')

    cy.get('input[name="password"]')
      .parent()
      .parent()
      .should('contain', 'Required')

    cy.screenshot('TC-LOGIN-04-PASSED', {
      capture: 'fullPage'
    })
  })

  it('TC-LOGIN-05 - Username salah dan password valid', () => {

    cy.intercept('POST', '**/api/v2/auth/login').as('loginWrongUsername')

    cy.get('input[name="username"]')
      .type('WrongUser')

    cy.get('input[name="password"]')
      .type('admin123')

    cy.get('button[type="submit"]')
      .click()

    cy.wait('@loginWrongUsername')
      .its('response.statusCode')
      .should('eq', 401)

    cy.contains('Invalid credentials')
      .should('be.visible')

    cy.screenshot('TC-LOGIN-05-PASSED', {
      capture: 'fullPage'
    })
  })

  it('TC-LOGIN-06 - Username valid dan password salah', () => {

    cy.intercept('POST', '**/api/v2/auth/login').as('loginWrongPassword')

    cy.get('input[name="username"]')
      .type('Admin')

    cy.get('input[name="password"]')
      .type('WrongPassword')

    cy.get('button[type="submit"]')
      .click()

    cy.wait('@loginWrongPassword')
      .its('response.statusCode')
      .should('eq', 401)

    cy.contains('Invalid credentials')
      .should('be.visible')

    cy.screenshot('TC-LOGIN-06-PASSED', {
      capture: 'fullPage'
    })
  })


  it('TC-LOGIN-07 - Username dan password salah', () => {

    cy.intercept('POST', '**/api/v2/auth/login').as('loginBothWrong')

    cy.get('input[name="username"]')
      .type('WrongUser')

    cy.get('input[name="password"]')
      .type('WrongPassword')

    cy.get('button[type="submit"]')
      .click()

    cy.wait('@loginBothWrong')
      .its('response.statusCode')
      .should('eq', 401)

    cy.contains('Invalid credentials')
      .should('be.visible')

    cy.screenshot('TC-LOGIN-07-PASSED', {
      capture: 'fullPage'
    })
  })


  it('TC-LOGIN-08 - Username menggunakan spasi', () => {

    cy.intercept('POST', '**/api/v2/auth/login').as('loginUsernameSpace')

    cy.get('input[name="username"]')
      .type(' Admin ')

    cy.get('input[name="password"]')
      .type('admin123')

    cy.get('button[type="submit"]')
      .click()

    cy.wait('@loginUsernameSpace')
      .its('response.statusCode')
      .should('eq', 401)

    cy.contains('Invalid credentials')
      .should('be.visible')

    cy.screenshot('TC-LOGIN-08-PASSED', {
      capture: 'fullPage'
    })
  })

})