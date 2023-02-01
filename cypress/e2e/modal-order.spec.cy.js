describe('template spec', () => {
    beforeEach(function() {
      cy.visit('http://localhost:3000');
      cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
      cy.intercept("POST", "api/orders", { fixture: "order.json" }).as("postOrder");

    });
})
