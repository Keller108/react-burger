describe('template spec', () => {
    beforeEach(function() {
        cy.visit('http://localhost:3000');
        cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
        cy.intercept("POST", "api/orders", { fixture: "order.json" }).as("postOrder");

        window.localStorage.setItem(
            "refreshToken",
            JSON.stringify("test-refreshToken")
        );
        window.localStorage.setItem(
            "accessToken",
            JSON.stringify("test-accessToken")
        );
    });

    it('Модальное окно с заказом открывается корректно', function() {

        cy.get('li[draggable="true"]').first().trigger('dragstart');
        cy.get('section[class^=BurgerConstructor_constructor]').first().trigger('drop', { force: true })

        cy.window().its('store')
            .invoke('dispatch', { type: "LOGIN_SUCCESS" })

        cy.get('button').click();

        cy.get("[data-cy=modal-close-btn]")
        .first()
        .children()
        .first()
        .click({ force: true })
    });
})