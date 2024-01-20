describe('Note app', () => {
it('then example', function() {
  cy.get('button').then( buttons => {
    console.log('number of buttons', buttons.length)
    cy.wrap(buttons[0]).click()
  })
})
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'camilo andres',
      username: 'camilo',
      password: 'camilo123'
    }

    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.visit('')
  })

  it('Login form can be opened', () => {
    cy.contains('login').click()
    cy.get('#username').type('camilo')
    cy.get('#password').type('camilo123')
    cy.get('#login-button').click()
    cy.contains('camilo andres logge-in')
  })

  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'camilo', password: 'camilo123' })
    })
    describe('and a note exists', () => {
      beforeEach(() => {
        cy.createNote({ content: 'another note cypress', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })
      it('one of those can be made important',() => {
       cy.contains('second note').parent().find('button').as('theButton')
       cy.get('@theButton').click()
       cy.get('@theButton').should('contain','make not important')
      })
    })
  })
  it('login fails with wrong password', () => {
    cy.contains('login').click()
    cy.get('#username').type('camilo')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
      .should('have.css', 'border-style', 'solid')
      .should('have.css', 'background', 'rgb(211, 211, 211)')

    cy.get('html').should('not.contain', 'camilo andres logged-in')
  })
})
