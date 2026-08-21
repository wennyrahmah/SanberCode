import LoginPage from './pages/LoginPage'

const loginPage = new LoginPage()

describe('Login OrangeHRM - POM', () => {

  beforeEach(() => {
    loginPage.visitLoginPage()
  })


  it('TC-LOGIN-01 - Login dengan username dan password valid', () => {

    loginPage.login(
      loginPage.usernameValid,
      loginPage.passwordValid
    )

    loginPage.dashboardDisplayed()
  })


  it('TC-LOGIN-02 - Username kosong dan password valid', () => {

    loginPage.typePassword(loginPage.passwordValid)
    loginPage.clickLogin()

    loginPage.usernameRequired()
  })


  it('TC-LOGIN-03 - Username valid dan password kosong', () => {

    loginPage.typeUsername(loginPage.usernameValid)
    loginPage.clickLogin()

    loginPage.passwordRequired()
  })


  it('TC-LOGIN-04 - Username dan password kosong', () => {

    loginPage.clickLogin()

    loginPage.usernameRequired()
    loginPage.passwordRequired()
  })


  it('TC-LOGIN-05 - Username salah dan password valid', () => {

    loginPage.login(
      loginPage.usernameInvalid,
      loginPage.passwordValid
    )

    loginPage.invalidCredentials()
  })


  it('TC-LOGIN-06 - Username valid dan password salah', () => {

    loginPage.login(
      loginPage.usernameValid,
      loginPage.passwordInvalid
    )

    loginPage.invalidCredentials()
  })


  it('TC-LOGIN-07 - Username dan password salah', () => {

    loginPage.login(
      loginPage.usernameInvalid,
      loginPage.passwordInvalid
    )

    loginPage.invalidCredentials()
  })

  it('TC-LOGIN-08 - Username menggunakan spasi', () => {

    loginPage.login(
      ' Admin ',
      loginPage.passwordValid
    )

    loginPage.invalidCredentials()
  })

})