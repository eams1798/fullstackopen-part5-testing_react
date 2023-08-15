describe('Blog app', function() {
  beforeEach(function() {
    cy.resetDatabase();
    cy.createTestingUser();
    cy.visitFrontend();
  })

  it('Login form is shown', function() {
    cy.contains('Username')
    cy.contains('Password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('UncleBob')
      cy.get('#password').type('1234abcde')
      cy.get('#btn-login').click()
      cy.contains('Robert C. Martin logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('UncleBob')
      cy.get('#password').type('wrong')
      cy.get('#btn-login').click()
      cy.contains('Invalid username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('UncleBob')
      cy.get('#password').type('1234abcde')
      cy.get('#btn-login').click()
      // for any reason, the app can't update with direct fetch login
    })

    it('A blog can be created', function() {
      // look for the blog form and fill it in
      cy.contains('New blog').click()
      cy.get('#title').type('My first blog')
      cy.get('#author').type('Robert C. Martin')
      cy.get('#url').type('https://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html')
      cy.get('#likes').type('5')
      cy.contains('Add blog').click()

      cy.get('#notification')
        .should('contain', 'A new blog My first blog by Robert C. Martin added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      
      cy.get('#blog-list').should('contain', 'My first blog').contains('show').click()
      cy.get('#blog-list').should('contain', 'My first blog')
        .should('contain', 'Robert C. Martin')
        .and('contain', 'https://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html')
        .and('contain', '5')
    })

    describe('And a blog is created', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'My first blog',
          author: 'Robert C. Martin',
          url: 'https://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
          likes: 5
        })
        cy.contains('My first blog').contains('show').click()
      })

      it('A blog can be liked', function() {
        cy.contains('My first blog').contains('like').click()
        cy.get('#likes').should('contain', '6')
      })

      it('A blog can be removed', function() {
        cy.contains('My first blog').contains('Delete').click()
        cy.get('#notification')
          .should('contain', 'Blog My first blog by Robert C. Martin deleted succesfully')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
        cy.should('not.contain', 'My first blog')
      })

      it("A blog can't be removed if it doesn't belong to the user", function() {
        cy.get('#blogs')
          .should('not.contain', 'My first blog')
          .then((blogs) => {
            cy.wrap(blogs[0]).should('not.contain', 'Delete')
          })
      })
    })

    describe('And several blogs are created', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'My first blog',
          author: 'Robert C. Martin',
          url: 'https://blog.cleancoder.com/uncle-bob/2017/05/05/MyFirstBlog.html',
          likes: 5
        })
        cy.createBlog({
          title: 'My second blog',
          author: 'Andy Hunt',
          url: 'https://blog.cleancoder.com/uncle-bob/2017/05/05/MySecondBlog.html',
          likes: 10
        })
        cy.createBlog({
          title: 'My third blog',
          author: 'Mary Smith',
          url: 'https://blog.cleancoder.com/uncle-bob/2017/05/05/MyThirdBlog.html',
          likes: 15
        })
      })
      
      it('Blogs are ordered by likes', function() {
        cy.get('#blogs').eq(0).should('contain', 'My third blog').and('contain', '15')
        cy.get('#blogs').eq(1).should('contain', 'My second blog').and('contain', '10')
        cy.get('#blogs').eq(2).should('contain', 'My first blog').and('contain', '5')

        cy.get('#blogs').eq(1).contains('like').click().click().click().click().click().click()
        cy.get('#blogs').eq(1).should('contain', 'My second blog').and('contain', '16')
        cy.visitFrontend()
        
        cy.get('#blogs').eq(0).should('contain', 'My second blog').and('contain', '16');
        cy.get('#blogs').eq(1).should('contain', 'My third blog').and('contain', '15');
        cy.get('#blogs').eq(2).should('contain', 'My first blog').and('contain', '5');
      })
    })

  })
})