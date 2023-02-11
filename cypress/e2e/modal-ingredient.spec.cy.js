describe('Открывается на локал хосте', () => {
    beforeEach(function() {
      cy.visit('http://localhost:3000');
    });
    it('Модальное окно работает', function() {
      cy.get('ul li:first').first().as('card');
      cy.get('@card').click();
      cy.contains('Детали ингредиента');
      cy.contains('Краторная булка N-200i');
      cy.contains('Калории,ккал');
      cy.contains('Белки, г');
      cy.contains('Жиры, г');
      cy.contains('Углеводы, г');
      cy.get("[data-cy=modal-close-btn]")
        .first()
        .children()
        .first()
        .click({ force: true })
    });
})
