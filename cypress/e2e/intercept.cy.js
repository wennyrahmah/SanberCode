describe('Login OrangeHRM - 12 Test Cases', () => {

  beforeEach(() => {
    cy.visit(
      'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
    )
  })


  // TC-LOGIN-01
  it('TC-LOGIN-01 - Login valid', () => {

    cy.intercept('POST', '**/api/v2/auth/login').as('loginValid')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginValid')
      .its('response.statusCode')
      .should('eq', 200)

    cy.url().should('include', '/dashboard')
  })


  // TC-LOGIN-02
  it('TC-LOGIN-02 - Username kosong', () => {

    cy.intercept('POST', '**/api/v2/auth/login').as('loginUsernameKosong')

    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.get('input[name="username"]')
      .parent()
      .parent()
      .should('contain', 'Required')
  })


  // TC-LOGIN-03
  it('TC-LOGIN-03 - Password kosong', () => {

    cy.intercept('POST', '**/api/v2/auth/login').as('loginPasswordKosong')

    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()

    cy.get('input[name="password"]')
      .parent()
      .parent()
      .should('contain', 'Required')
  })


  // TC-LOGIN-04
  it('TC-LOGIN-04 - Username dan password kosong', () => {

    cy.intercept('POST', '**/api/v2/auth/login').as('loginKosong')

    cy.get('button[type="submit"]').click()

    cy.get('input[name="username"]')
      .parent()
      .parent()
      .should('contain', 'Required')

    cy.get('input[name="password"]')
      .parent()
      .parent()
      .should('contain', 'Required')
  })


  // TC-LOGIN-05
  it('TC-LOGIN-05 - Username salah', () => {

    cy.intercept('POST', '**/api/v2/auth/login').as('loginUsernameSalah')

    cy.get('input[name="username"]').type('WrongUser')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginUsernameSalah')

    cy.contains('Invalid credentials')
      .should('be.visible')
  })


  it('TC-LOGIN-06 - Password salah', () => {

    cy.intercept('POST', '**/api/v2/auth/login').as('loginPasswordSalah')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('WrongPassword')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginPasswordSalah')

    cy.contains('Invalid credentials')
      .should('be.visible')
  })


  it('TC-LOGIN-07 - Username dan password salah', () => {

    cy.intercept('POST', '**/api/v2/auth/login').as('loginKeduanyaSalah')

    cy.get('input[name="username"]').type('WrongUser')
    cy.get('input[name="password"]').type('WrongPassword')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginKeduanyaSalah')

    cy.contains('Invalid credentials')
      .should('be.visible')
  })


  it('TC-LOGIN-08 - Username dengan spasi', () => {

    cy.intercept('POST', '**/api/v2/auth/login').as('loginUsernameSpasi')

    cy.get('input[name="username"]').type(' Admin ')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginUsernameSpasi')

    cy.contains('Invalid credentials')
      .should('be.visible')
  })


  it('TC-LOGIN-09 - Password dengan spasi', () => {

    cy.intercept('POST', '**/api/v2/auth/login').as('loginPasswordSpasi')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type(' admin123 ')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginPasswordSpasi')

    cy.contains('Invalid credentials')
      .should('be.visible')
  })


  it('TC-LOGIN-10 - Username huruf kapital', () => {

    cy.intercept('POST', '**/api/v2/auth/login').as('loginUsernameKapital')

    cy.get('input[name="username"]').type('ADMIN')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginUsernameKapital')

    cy.contains('Invalid credentials')
      .should('be.visible')
  })


  it('TC-LOGIN-11 - Password huruf kapital', () => {

    cy.intercept('POST', '**/api/v2/auth/login').as('loginPasswordKapital')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('ADMIN123')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginPasswordKapital')

    cy.contains('Invalid credentials')
      .should('be.visible')
  })

  it('TC-LOGIN-12 - Password sangat panjang', () => {

    const longPassword = 'A'.repeat(100)

    cy.intercept('POST', '**/api/v2/auth/login').as('loginPasswordPanjang')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type(longPassword)
    cy.get('button[type="submit"]').click()

    cy.wait('@loginPasswordPanjang')

    cy.contains('Invalid credentials')
      .should('be.visible')
  })

})