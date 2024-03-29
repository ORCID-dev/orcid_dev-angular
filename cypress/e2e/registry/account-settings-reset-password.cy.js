/// <reference types="cypress" />
import userData from '../../fixtures/testing-users.fixture.json'

describe('Account Settings - users can reset their password', async function () {
  before(() => {
    cy.programmaticallySignin('cyAcctSettRestPasswUser') //send user key from fixture file
    cy.visit('/my-orcid')
    cy.get('#biography-panel') //wait for page to load
  })

  it('Verify user is able to reset the password to a different valid password and log in', function () {
    cy.get('#cy-user-info').click()
    cy.get('#cy-account-settings').wait(1000).click({ force: true })
    cy.get('#cy-password-panel-action-more').wait(1000).click({ force: true })
    cy.get('[formcontrolname="oldPassword"]')
      .clear()
      .type(userData.cyAcctSettRestPasswUser.password)
    cy.get('[formcontrolname="password"]')
      .clear()
      .type(userData.cyAcctSettRestPasswUser.newPassw)
    cy.get('[formcontrolname="retypedPassword"]')
      .clear()
      .type(userData.cyAcctSettRestPasswUser.newPassw)
    cy.get('#cy-save-password').click()
    cy.contains('Your password has been updated').should('be.visible') //wait for update to complete
    //log out
    cy.get('#cy-user-info').click()
    cy.get('#cy-signout').click({ force: true })

    //user can log in with new password
    cy.get('#username').clear().type(userData.cyAcctSettRestPasswUser.oid)
    cy.get('#password').clear().type(userData.cyAcctSettRestPasswUser.newPassw)
    cy.get('#signin-button').click()
    //verify user is redirected to my orcid page
    cy.get('#biography-panel') //wait for my orcid page to load
  })

  after(() => {
    //log out
    cy.get('#cy-user-info').click()
    cy.get('#cy-signout').click({ force: true })
  })
})
