import { IBlog } from "../../src/interfaces/blog"
import { signUpCredentials } from "../../src/interfaces/login"

Cypress.Commands.add('requestBackend', ( path: string, method: string, body?: object, needAuth?: boolean ) => {
  return cy.request({
    url: `http://localhost:3001/api${path}`,
    method,
    body,
    headers: {
      'Authorization': needAuth ? `bearer ${JSON.parse(localStorage.getItem('loggedNoteappUser') || "").token}` : ''
    }
  })
})

Cypress.Commands.add('visitFrontend', () => {
  return cy.visit('http://localhost:5173')
})

Cypress.Commands.add('login', function ({ username, password }: { username: string, password: string }) {
  return cy.requestBackend('/login', 'POST', { username, password }).then((response) => {
    localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body));
    cy.visitFrontend();
  })
})


Cypress.Commands.add('createBlog', ( blogContent: IBlog ) => {
  return cy.requestBackend('/blogs', 'POST', blogContent, true)
})

Cypress.Commands.add('createTestingUser', () => {
  return cy.requestBackend('/users', 'POST', {
    name: "Robert C. Martin",
    username: 'UncleBob',
    password: '1234abcde'
  })
})

Cypress.Commands.add('resetDatabase', () => {
  return cy.requestBackend('/testing/reset', 'DELETE')
})