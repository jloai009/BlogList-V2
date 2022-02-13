describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Jose',
      username: 'Jose',
      password: 'Josespassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to Blog-List')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.login({ username: 'Jose', password: 'Josespassword' })
      cy.contains('Jose logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('Jose')
      cy.get('#password').type('Josespasswordd')
      cy.get('#login-button').click()
      cy.get('#notification')
        .contains('Wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.contains('Jose logged in').should('not.exist')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Jose', password: 'Josespassword' })
    })

    it('A blog can be created', function() {
      cy.contains('Create New Blog').click()
      cy.get('#input-title').type('test title')
      cy.get('#input-author').type('test author')
      cy.get('#input-url').type('test.url.test')
      cy.get('#button-create').click()
      cy.contains('test title test author')
    })

    it('A blog can be deleted by its creator', function() {
      cy.createBlog({ title: 'test title1', author: 'test author1', _url: 'test.url.test1' })
      cy.contains('View').click()
      cy.contains('Delete').click()
      cy.contains('test title1').should('not.exist')
    })

    it('A blog cannot be deleted by a user who didn\'t create it', function() {
      cy.createBlog({ title: 'test title1', author: 'test author1', _url: 'test.url.test1' })
      const user = {
        name: 'Jose',
        username: 'Jose2',
        password: 'Josespassword2'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.login({ username: 'Jose2', password: 'Josespassword2' })
      cy.contains('View').click()
      cy.contains('Delete').should('not.exist')
    })

    it('A user can like a blog', function () {
      cy.createBlog({ title: 'test title1', author: 'test author1', _url: 'test.url.test1' })
      cy.createBlog({ title: 'test title2', author: 'test author2', _url: 'test.url.test2' })
      cy.createBlog({ title: 'test title3', author: 'test author3', _url: 'test.url.test3' })
      cy.contains('View').click()
      cy.contains('Like').click()
      cy.contains('Likes: 1')
    })

    it('Blogs are sorted by number of likes', function () {
      cy.createBlog({ title: 'test title1', author: 'test author1', _url: 'test.url.test1', likes: 0 })
      cy.createBlog({ title: 'test title2', author: 'test author2', _url: 'test.url.test2', likes: 7 })
      cy.createBlog({ title: 'test title3', author: 'test author3', _url: 'test.url.test3', likes: 3 })
      cy.get('.button-view')
        .click({ multiple: true })
        .then(() => {
          cy.get('.blog').then(list => {
            cy.wrap(list[0]).contains('test title2')
            cy.wrap(list[1]).contains('test title3')
            cy.wrap(list[2]).contains('test title1')
          })
        })
    })
  })

})