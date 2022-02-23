describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Andre Miranda',
      username: 'andre',
      password: 'affm'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })


  it('front page can be opened', function() {
    cy.contains('Username')
    cy.contains('Password')
  })


  it('login form can be opened', function() {
    cy.get('#username-login').type('andre')
    cy.get('#password-login').type('affm')
    cy.contains('Login').click()

    cy.contains('Welcome Andre Miranda')
  })

  it('will not loggin with wrong password', function() {
    cy.get('#username-login').type('andre')
    cy.get('#password-login').type('aaa')
    cy.contains('Login').click()
    cy.contains('Wrong username or password')

    cy.get('#message-div').should('have.css', 'color', 'rgb(255, 0, 0)')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'andre', password: 'affm' })
    })

    it('a new note can be created', function() {
      cy.contains('Create new note').click()
      cy.get('#new-blog-title').type('A E2E test with Cypress')
      cy.get('#new-blog-author').type('Andre Miranda')
      cy.get('#new-blog-url').type('cypress.com')
      cy.get('#save-newBlog-btn').click()
    })
  })

  describe('and a blog exists', function () {
    beforeEach(function () {
      cy.login({ username: 'andre', password: 'affm' })
      cy.createBlog({
        title: 'The game',
        author: 'João Carvalho',
        url: 'thegame.com'
      })
    })

    it('second note can be added', function(){
      cy.createBlog({
        title: 'Once in a while',
        author: 'Arthur Dolle',
        url: 'dolle.com'
      })
    })

    it('user can like post', function() {
      cy.get('#hide-show').click()
      cy.get('#likeBtn').click()

      cy.contains('You liked the blog')
    })

    it('who created the blog can delete it', function() {
      cy.get('#hide-show').click()
      cy.get('#remove-blog-button').click()

      cy.contains('Blog deleted successfully')
    })

    it('not creator user cant delete blogs', function(){
      const user = {
        name: 'Joao',
        username: 'joao',
        password: 'joao'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.login({ username: 'joao', password: 'joao' })
      cy.get('#hide-show').click()

      cy.get('.hidden-div').should('not.contain', '#remove-blog-button')
    })

    it('order the blogs according to likes', () => {
      cy.createBlog({
        title: 'aaaaaa',
        author: 'aaaaaa',
        url: 'aaaaa.com',
        likes: 2
      })
      cy.createBlog({
        title: 'bbbbbbb',
        author: 'bbbbbbbb',
        url: 'bbbbbbb.com',
        likes: 12
      })
      cy.createBlog({
        title: 'cccccccc',
        author: 'ccccccc',
        url: 'cccccc.com',
        likes: 30
      })
      cy.get('.blog-author').then(buttons => {
        expect(buttons[0].textContent).to.equal('ccccccc')
        expect(buttons[buttons.length-1].textContent).to.equal('João Carvalho')
      })
    })
  })


})