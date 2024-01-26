describe('Blog app', () => {
  beforeEach(() => {
    cy.newUser({ username: 'juan', password: '123', name: 'Juan Jose' })
  })
  describe('Login', () => {
    it('Success with correct credentials', () => {
      cy.visit('')
      cy.contains('Login').click()
      cy.get('#username').type('juan')
      cy.get('#password').type('123')

      cy.get('#login-submit').click()

      cy.contains('Bienvenido Juan Jose')
    })

    it('Fails with wrong credentials', () => {
      cy.visit('')
      cy.contains('Login').click()
      cy.get('#username').type('juan')
      cy.get('#password').type('12345')

      cy.get('#login-submit').click()

      cy.get('.message')
        .should('contain', 'wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .should('have.css', 'border-color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'juan', password: '123' })
      cy.createBlog({ title: 'Nuevo blog desde cypress', author: 'Juan Jose Mejia', url: 'www.facebook.com' })
    })
    it('Blogs are ordered according to likes with the blog with the most likes first.', () => {
      cy.createBlog({ title: 'Segundo blog desde cypress', author: 'Juan Jose Mejia', url: 'www.facebook.com' })
      cy.contains('Segundo blog desde cypress')
        .contains('View').click()
        .get('#like-button').click().then(() => cy.contains('Likes: 1'))
        .get('#like-button').click().then(() => cy.contains('Likes: 2'))
      cy.get('.blog').eq(0).should('contain', 'Segundo blog desde cypress')
      cy.get('.blog').eq(1).should('contain', 'Nuevo blog desde cypress')
    })

    it('A blog can be created', () => {
      cy.get('#togglable-button').click()
      cy.get('#title').type('Nuevo blog desde cypress')
      cy.get('#author').type('Juan Jose Mejia')
      cy.get('#url').type('www.facebook.com')
      cy.get('#submit').click()
      cy.contains('Nuevo blog desde cypress')
    })
    it('the user can like the blog', () => {
      cy.contains('Nuevo blog desde cypress')
        .contains('View').click()
        .get('#like-button').click().then(() => cy.contains('Likes: 1'))
    })
    it('the user can delete blog', () => {
      cy.contains('Nuevo blog desde cypress')
        .contains('View').click()
        .get('#delete-button').click()
      cy.contains('Nuevo blog desde cypress').should('not.exist')
    })
  })

  describe('Other users cannot delete the blog', () => {
    it('Delete blog for other user', () => {
      cy.newUser({ username: 'juan', password: '123', name: 'Juan Jose Mejia' }).then(() => {
        cy.login({ username: 'juan', password: '123' })
        cy.createBlog({ title: 'Prueba desde cypress', author: 'Juan Jose Mejia', url: 'www.facebook.com' })
        cy.contains('Logout').click()

        cy.newUser({ username: 'andres', password: '123', name: 'Andres Estrada' })
          .then(() => {
            cy.contains('Login').click()
            cy.get('#username').type('andres')
            cy.get('#password').type('123')
            cy.get('#login-submit').click()

            cy.contains('View').click()
            cy.contains('Remove').click()
            cy.get('.message').should('exist')
              .should('contain', 'No tienes permisos para eliminar este blog')
              .should('have.css', 'color', 'rgb(255, 0, 0)')
              .should('have.css', 'border-color', 'rgb(255, 0, 0)')
          })
      })
    })
  })

})
