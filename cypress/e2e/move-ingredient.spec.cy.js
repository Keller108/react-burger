describe('template spec', () => {
    before(function() {
      cy.visit('http://localhost:3000');
    });
    it('Dran and drop работате корректно', function() {

      cy.get('li[draggable="true"]').first().trigger('dragstart');
      cy.get('section[class^=BurgerConstructor_constructor]').first().trigger('drop', { force: true })
      cy.get('ul li div').should('exist')
    });
})