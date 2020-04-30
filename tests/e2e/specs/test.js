// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('Call your colleagues')
    cy.get('input').type('Levi')
    cy.get('.t-button').click();
    cy.wait(1000)
    cy.contains('Whose Favourite Song is That?')
    cy.get('input').type('Ren 1990s')
    cy.wait(1000)
    cy.get('li:first-child > img').click();
    cy.get('.t-button').click();
  })
})
