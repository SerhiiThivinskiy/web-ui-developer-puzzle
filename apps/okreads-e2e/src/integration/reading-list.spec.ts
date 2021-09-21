describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');

    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('body')
      .then(($body) => {
        if ($body.find('[data-testing="reading-list-remove-btn"]').length) {
          cy.get('[data-testing="reading-list-remove-btn"]').click({ multiple: true });
        }
      });
    cy.get('body').click();
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('Then: I should be able to mark book as finished', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    const addBookButton = cy.get('[data-testing="add-book-btn"]').first();
    addBookButton.should(
      'contain.text',
      'Want to Read'
    );
    addBookButton.click();

    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-finish-btn"]').should('exist');

    cy.get('[data-testing="reading-list-finish-date"]').should(
      'contain.text',
      'Not finished yet'
    );

    cy.get('[data-testing="reading-list-finish-btn"]').click();

    cy.get('[data-testing="reading-list-finish-date"]').should(
      'contain.text',
      'Finished:'
    );
    cy.get('[data-testing="reading-list-finish-btn"]').should('not.exist');

    cy.get('[data-testing="add-book-btn"]').should(
      'contain.text',
      'Finished'
    );
  });
});
