describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('Then: I should be able to add book and undo it', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="add-book-btn"]').first().click();
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-item"]').should('have.length', 1);

    cy.get('simple-snack-bar button').click();
    cy.get('[data-testing="reading-list-item"]').should('have.length', 0);
  });

  it('Then: I should be able to remove book and undo it', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="add-book-btn"]').first().click();
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-remove-btn"]').click();
    cy.get('[data-testing="reading-list-item"]').should('have.length', 0);

    cy.get('simple-snack-bar button').last().click();
    cy.get('[data-testing="reading-list-item"]').should('have.length', 1);
  });
});
