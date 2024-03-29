/// <reference types="cypress" />
describe("Игра пара", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Тест 1", () => {
    cy.get(".card").should("have.length", 16);
    cy.get(".open").should("not.exist");
  });

  it("Тест 2", () => {
    cy.contains("2").click();
    cy.get(".open").should("exist");
  });

  it("Тест 3", () => {
    cy.get(".card").first().click();

    let cardOpen = false;

    function openCards(index) {
      if (cardOpen) {
        return;
      }
      if (index === 0) {
        return;
      }

      cy.get(".card").eq(index).click();

      let firstElement;
      let secondElement;
      cy.get(".card")
        .first()
        .invoke("text")
        .then((text) => {
          firstElement = text;
          console.log(firstElement);
        });

      cy.get(".card")
        .eq(index)
        .invoke("text")
        .then((text) => {
          secondElement = text;
          console.log(secondElement);
          if (firstElement === secondElement) {
            cardOpen = true;
            return;
          } else {
            cy.get(".card").first().click();
            cy.get(".card").eq(index).click();
            openCards(index + 1);
          }
        });
      cy.get(".card").first().click();
    }

    openCards(1);
  });

  it("Тест 4", () => {
    cy.get(".card").first().click();

    let cardOpen = false;

    function openCards(index) {
      if (cardOpen) {
        return;
      }
      if (index === 0) {
        return;
      }

      cy.get(".card").eq(index).click();

      let firstElement;
      let secondElement;
      cy.get(".card")
        .first()
        .invoke("text")
        .then((text) => {
          firstElement = text;
          console.log(firstElement);
        });

      cy.get(".card")
        .eq(index)
        .invoke("text")
        .then((text) => {
          secondElement = text;
          console.log(secondElement);
          if (firstElement !== secondElement) {
            cardOpen = true;
            return;
          } else {
            cy.get(".card").first().click();
            cy.get(".card").eq(index).click();
            cy.wait(500).then(() => {
              cy.get(".card").first().click();
              cy.get(".card").eq(index).click();
              openCards(index + 1);
            });
          }
        });
      cy.get(".card").first().click();
    }

    openCards(1);
    cy.get(".card").eq(2).click();
    cy.get(".card").first().should("not.have.class", "flipped");
    cy.get(".card").eq(1).should("not.have.class", "flipped");
  });
});
