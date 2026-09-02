/**
 * Test Scenario for Login Spec (End-to-End):
 *
 * - should display login page correctly
 *   - should render email input, password input, and login button
 * - should display alert when email and password are wrong
 *   - should show an alert message returned by the API
 * - should display homepage when email and password are correct
 *   - should redirect to homepage and show the logout button
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.clearLocalStorage();

    // Stub dipasang SEBELUM cy.visit agar proses preload aplikasi bersifat
    // deterministik. Tanpa ini, App menjalankan asyncPreloadProcess() ke API
    // sungguhan; selama preload berjalan App merender PreloadTemplate yang tidak
    // memuat navigasi, lalu menggantinya dengan AppLayout setelah selesai.
    // Pergantian tersebut melepas elemen tautan dari DOM di tengah perintah
    // Cypress dan memunculkan kegagalan "element has detached from DOM".
    cy.intercept('GET', '**/users/me', {
      statusCode: 401,
      body: { status: 'fail', message: 'Missing authentication' },
    }).as('preloadRequest');

    cy.intercept('GET', '**/threads', {
      statusCode: 200,
      body: { status: 'success', message: 'ok', data: { threads: [] } },
    }).as('threadsRequest');

    cy.intercept('GET', '**/users', {
      statusCode: 200,
      body: { status: 'success', message: 'ok', data: { users: [] } },
    }).as('usersRequest');

    cy.visit('/');

    // Tunggu preload selesai supaya AppLayout sudah stabil sebelum diuji.
    cy.wait('@preloadRequest');
    cy.get('a[href="#/login"]').should('be.visible');
  });

  it('should display login page correctly', () => {
    // act: buka halaman login lewat tautan navigasi (HashRouter -> href "#/login")
    cy.get('a[href="#/login"]').click();

    // assert
    cy.get('input#email').should('be.visible');
    cy.get('input#password').should('be.visible');
    cy.get('button').contains('Masuk').should('be.visible');
  });

  it('should display alert when email and password are wrong', () => {
    // arrange: stub respons gagal supaya tidak menyentuh server publik
    cy.intercept('POST', '**/login', {
      statusCode: 401,
      body: {
        status: 'fail',
        message: 'email atau password salah',
      },
    }).as('loginRequest');

    const alertStub = cy.stub().as('alertStub');
    cy.on('window:alert', alertStub);

    // act
    cy.get('a[href="#/login"]').click();
    cy.get('input#email').type('wrong_user@example.com');
    cy.get('input#password').type('wrong_password');
    cy.get('button').contains('Masuk').click();

    // assert
    cy.wait('@loginRequest');
    cy.get('@alertStub').should('have.been.calledWith', 'email atau password salah');
  });

  it('should display homepage when email and password are correct', () => {
    // arrange: stub login + profil pengguna
    cy.intercept('POST', '**/login', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'ok',
        data: { token: 'fake-access-token-12345' },
      },
    }).as('loginRequest');

    // Menimpa stub preload: setelah login, permintaan profil harus berhasil.
    cy.intercept('GET', '**/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'ok',
        data: {
          user: {
            id: 'john_doe',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://ui-avatars.com/api/?name=John+Doe',
          },
        },
      },
    }).as('meRequest');

    // act
    cy.get('a[href="#/login"]').click();
    cy.get('input#email').type('john@example.com');
    cy.get('input#password').type('secretpassword');
    cy.get('button').contains('Masuk').click();

    cy.wait('@loginRequest');
    cy.wait('@meRequest');

    // assert: navigasi menampilkan tombol keluar dan kembali ke beranda
    cy.get('button').contains('Keluar').should('be.visible');
    cy.hash().should('eq', '#/');
  });
});
