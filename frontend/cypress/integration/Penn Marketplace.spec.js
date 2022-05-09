// Penn Marketplace.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

const frontendLink = 'http://localhost:3000';

describe('Cypress Testing: Registration', () => {
  it('user registration and deleting account', () => {
    cy.visit(frontendLink);
    cy.get('button').contains('Login').click();
    cy.get('button').contains('Sign Up').click();
    cy.get('[placeholder="First Name"]').type('David');
    cy.get('[placeholder="Last Name"]').type('Wang');
    cy.get('#signUpFormPennEmail').type('ddwang@seas.upenn.edu');
    cy.get('#signUpFormPassword').type('password');
    cy.get('#monthSelect').select('January');
    cy.get('#daySelect').select('1');
    cy.get('#yearSelect').select('2022');
    cy.get('#schoolSelect').select('School of Engineering and Applied Sciences');
    cy.get('#majorSelect').select('Computer Science');
    cy.get('#classyearSelect').select('2022');
    cy.get('button').contains('Create Account').click();
    cy.get('#basic-nav-dropdown').click();
    cy.get('#delete-user').click();
  });
});

describe('Cypress Testing: Login', () => {
  it('user login and deleting account', () => {
    cy.visit(frontendLink);
    cy.get('button').contains('Login').click();
    cy.get('button').contains('Sign Up').click();
    cy.get('[placeholder="First Name"]').type('David');
    cy.get('[placeholder="Last Name"]').type('Wang');
    cy.get('#signUpFormPennEmail').type('ddwang@seas.upenn.edu');
    cy.get('#signUpFormPassword').type('password');
    cy.get('#monthSelect').select('January');
    cy.get('#daySelect').select('1');
    cy.get('#yearSelect').select('2022');
    cy.get('#schoolSelect').select('School of Engineering and Applied Sciences');
    cy.get('#majorSelect').select('Computer Science');
    cy.get('#classyearSelect').select('2022');
    cy.get('button').contains('Create Account').click();
    cy.get('#basic-nav-dropdown').click();
    cy.get('#log-out').click();
    cy.get('#loginFormPennEmail').type('ddwang@seas.upenn.edu');
    cy.get('#loginFormPassword').type('password');
    cy.get('#loginButton').click();
    cy.get('#basic-nav-dropdown').click();
    cy.get('#delete-user').click();
  });
});

describe('Cypress Testing: Messages', () => {
  it('user login and deleting account', () => {
    cy.visit(frontendLink);
    cy.get('button').contains('Login').click();
    cy.get('button').contains('Sign Up').click();
    cy.get('[placeholder="First Name"]').type('David');
    cy.get('[placeholder="Last Name"]').type('Wang');
    cy.get('#signUpFormPennEmail').type('ddwang@seas.upenn.edu');
    cy.get('#signUpFormPassword').type('password');
    cy.get('#monthSelect').select('January');
    cy.get('#daySelect').select('1');
    cy.get('#yearSelect').select('2022');
    cy.get('#schoolSelect').select('School of Engineering and Applied Sciences');
    cy.get('#majorSelect').select('Computer Science');
    cy.get('#classyearSelect').select('2022');
    cy.get('button').contains('Create Account').click();
    cy.get('#basic-nav-dropdown').click();
    cy.get('#dashboard').click();
    cy.get('#search-user').click();
    cy.get('#search-user-input').type('Raymon Shi');
    cy.get('#search-user-button').click();
    cy.get('#search-user-follow').contains('Follow').click();
    cy.wait(5000);
    cy.get('body').click('right');
    cy.get('button').contains('Friends').click();
    cy.wait(3000);
    cy.get('button').contains('Raymon Shi').click({ force: true });
    cy.get('#text-input-message').type('Free me from these chains');
    cy.get('button').contains('Send Message').click();
    cy.wait(10000);
    cy.get('body').click('bottomRight');
    cy.wait(3000);
    cy.get('body').click('bottomRight');
    cy.get('#basic-nav-dropdown').click();
    cy.get('#delete-user').click();
  });
});
