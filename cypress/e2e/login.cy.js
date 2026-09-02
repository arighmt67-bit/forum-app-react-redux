/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.clearLocalStorage();
  });

  it('should display login page correctly', () => {
    cy.get('a[href="/login"]').click();
    cy.get('input#email').should('be.visible');
    cy.get('input#password').should('be.visible');
    cy.get('button').contains('Masuk').should('be.visible');
  });

  it('should display alert when email and password are wrong', () => {
    cy.get('a[href="/login"]').click();
    cy.get('input#email').type('wrong_user@example.com');
    cy.get('input#password').type('wrong_password');
    cy.get('button').contains('Masuk').click();

    cy.on('window:alert', (str) => {
      expect(str).to.be.a('string');
    });
  });

  it('should display homepage when email and password are correct', () => {
    cy.visit('/login');
    cy.get('input#email').type('john@example.com');
    cy.get('input#password').type('secretpassword');

    // Intercept login request
    cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/login', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'ok',
        data: {
          token: 'fake-access-token-12345',
        },
      },
    }).as('loginRequest');

    // Intercept users/me request
    cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'ok',
        data: {
          user: {
            id: 'john_doe',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
        },
      },
    }).as('meRequest');

    cy.get('button').contains('Masuk').click();

    cy.wait('@loginRequest');
    cy.wait('@meRequest');

    // Navigation should now display the user and logout button
    cy.get('button').contains('Keluar').should('be.visible');
  });
});
