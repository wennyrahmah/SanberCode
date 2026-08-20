
describe('Login OrangeHRM - 12 Test Cases', () => {

  beforeEach(() => {
    cy.visit(
      'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
    )
  })


  // =========================================================
  // TC-LOGIN-01
  // Login valid
  // =========================================================
  it('TC-LOGIN-01 - Login dengan username dan password valid', () => {

    cy.get('input[name="username"]')
      .should('be.visible')
      .type('Admin')

    cy.get('input[name="password"]')
      .should('be.visible')
      .type('admin123')

    cy.get('button[type="submit"]')
      .click()

    cy.url()
      .should('include', '/dashboard')

    cy.contains('Dashboard')
      .should('be.visible')

    // Screenshot
    cy.screenshot('TC-LOGIN-01-PASSED', {
      capture: 'fullPage'
    })
  })


  // =========================================================
  // TC-LOGIN-02
  // Username kosong
  // =========================================================
  it('TC-LOGIN-02 - Username kosong dan password valid', () => {

    cy.get('input[name="password"]')
      .type('admin123')

    cy.get('button[type="submit"]')
      .click()

    cy.get('input[name="username"]')
      .parent()
      .parent()
      .should('contain', 'Required')

    cy.screenshot('TC-LOGIN-02-PASSED', {
      capture: 'fullPage'
    })
  })


  // =========================================================
  // TC-LOGIN-03
  // Password kosong
  // =========================================================
  it('TC-LOGIN-03 - Username valid dan password kosong', () => {

    cy.get('input[name="username"]')
      .type('Admin')

    cy.get('button[type="submit"]')
      .click()

    cy.get('input[name="password"]')
      .parent()
      .parent()
      .should('contain', 'Required')

    cy.screenshot('TC-LOGIN-03-PASSED', {
      capture: 'fullPage'
    })
  })


  // =========================================================
  // TC-LOGIN-04
  // Username dan password kosong
  // =========================================================
  it('TC-LOGIN-04 - Username dan password kosong', () => {

    cy.get('button[type="submit"]')
      .click()

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


  // =========================================================
  // TC-LOGIN-05
  // Username salah, password benar
  // =========================================================
  it('TC-LOGIN-05 - Username salah dan password valid', () => {

    cy.get('input[name="username"]')
      .type('WrongUser')

    cy.get('input[name="password"]')
      .type('admin123')

    cy.get('button[type="submit"]')
      .click()

    cy.contains('Invalid credentials')
      .should('be.visible')

    cy.screenshot('TC-LOGIN-05-PASSED', {
      capture: 'fullPage'
    })
  })


  // =========================================================
  // TC-LOGIN-06
  // Username benar, password salah
  // =========================================================
  it('TC-LOGIN-06 - Username valid dan password salah', () => {

    cy.get('input[name="username"]')
      .type('Admin')

    cy.get('input[name="password"]')
      .type('WrongPassword')

    cy.get('button[type="submit"]')
      .click()

    cy.contains('Invalid credentials')
      .should('be.visible')

    cy.screenshot('TC-LOGIN-06-PASSED', {
      capture: 'fullPage'
    })
  })


  // =========================================================
  // TC-LOGIN-07
  // Username dan password salah
  // =========================================================
  it('TC-LOGIN-07 - Username dan password salah', () => {

    cy.get('input[name="username"]')
      .type('WrongUser')

    cy.get('input[name="password"]')
      .type('WrongPassword')

    cy.get('button[type="submit"]')
      .click()

    cy.contains('Invalid credentials')
      .should('be.visible')

    cy.screenshot('TC-LOGIN-07-PASSED', {
      capture: 'fullPage'
    })
  })


  // =========================================================
  // TC-LOGIN-08
  // Username dengan spasi
  // =========================================================
  it('TC-LOGIN-08 - Username menggunakan spasi', () => {

    cy.get('input[name="username"]')
      .type(' Admin ')

    cy.get('input[name="password"]')
      .type('admin123')

    cy.get('button[type="submit"]')
      .click()

    cy.contains('Invalid credentials')
      .should('be.visible')

    cy.screenshot('TC-LOGIN-08-PASSED', {
      capture: 'fullPage'
    })
  })


  // =========================================================
  // TC-LOGIN-09
  // Password dengan spasi
  // =========================================================
  it('TC-LOGIN-09 - Password menggunakan spasi', () => {

    cy.get('input[name="username"]')
      .type('Admin')

    cy.get('input[name="password"]')
      .type(' admin123 ')

    cy.get('button[type="submit"]')
      .click()

    cy.contains('Invalid credentials')
      .should('be.visible')

    cy.screenshot('TC-LOGIN-09-PASSED', {
      capture: 'fullPage'
    })
  })


  // =========================================================
  // TC-LOGIN-10
  // Username huruf kapital
  // =========================================================
  it('TC-LOGIN-10 - Username menggunakan huruf kapital', () => {

    cy.get('input[name="username"]')
      .type('ADMIN')

    cy.get('input[name="password"]')
      .type('admin123')

    cy.get('button[type="submit"]')
      .click()

    cy.contains('Invalid credentials')
      .should('be.visible')

    cy.screenshot('TC-LOGIN-10-PASSED', {
      capture: 'fullPage'
    })
  })


  // =========================================================
  // TC-LOGIN-11
  // Password huruf kapital
  // =========================================================
  it('TC-LOGIN-11 - Password menggunakan huruf kapital', () => {

    cy.get('input[name="username"]')
      .type('Admin')

    cy.get('input[name="password"]')
      .type('ADMIN123')

    cy.get('button[type="submit"]')
      .click()

    cy.contains('Invalid credentials')
      .should('be.visible')

    cy.screenshot('TC-LOGIN-11-PASSED', {
      capture: 'fullPage'
    })
  })


  // =========================================================
  // TC-LOGIN-12
  // Password sangat panjang
  // =========================================================
  it('TC-LOGIN-12 - Password sangat panjang', () => {

    const longPassword = 'A'.repeat(100)

    cy.get('input[name="username"]')
      .type('Admin')

    cy.get('input[name="password"]')
      .type(longPassword)

    cy.get('button[type="submit"]')
      .click()

    cy.contains('Invalid credentials')
      .should('be.visible')

    cy.url()
      .should('include', '/auth/login')

    cy.screenshot('TC-LOGIN-12-PASSED', {
      capture: 'fullPage'
    })
  })

})
