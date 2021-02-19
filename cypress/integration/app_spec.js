const marker = ".mapboxgl-marker";

describe("the application", () => {
  beforeEach(() => {
    cy.viewport(1280, 1024);
    cy.visit("/");
    cy.get(".mapbox-loaded");
  });

  it("should successfully load", () => {
    cy.contains(/bothy finder/i);
    cy.contains(
      /you can use this tool to find munros within a certain distance of a specific bothy, or bothies within a certain distance of a specific munro/i
    );
    cy.contains(/search for/i);
    cy.contains(/munros/i);
    cy.contains(/bothies/i);
    cy.contains(/within 10 km of/i);
  });

  describe("when searching for munros", () => {
    it("should display bothies within the selected distance", () => {
      cy.get("[role=combobox]")
        .click()
        .get("[role=option]")
        .contains(/abyssinia/i)
        .click();

      cy.contains(
        /Found 5 munros within 10 km of Abyssinia. Select the icons for more information./i
      );

      cy.get(marker)
        .its("length")
        .should("eq", 6);

      cy.get(marker)
        .eq(1)
        .click();

      cy.contains(/beinn bhuidhe/i);
      cy.contains(/height/i);
      cy.contains(/948.5 metres/i);
      cy.contains(/NN 203 187/i);

      cy.get(marker)
        .eq(1)
        .click();

      cy.get(marker)
        .eq(0)
        .click();

      cy.contains(/abyssinia/i);
      cy.contains(/grid reference/i);
      cy.contains(/NN 255 116/i);

      cy.get(".MuiSlider-markLabel")
        .contains("20km")
        .click();

      cy.get(marker)
        .its("length")
        .should("eq", 16);

      cy.get(marker)
        .eq(1)
        .click();

      cy.contains(/learn more/i).should(
        "have.attr",
        "href",
        "http://www.hill-bagging.co.uk/mountaindetails.php?qu=S&rf=31"
      );
    });

    describe("when there are no bothies within the selected distance", () => {
      it("should display a message informing the user there are no results", () => {
        cy.get("[role=combobox]")
          .click()
          .get("[role=option]")
          .contains(/achnanclach/i)
          .click();

        cy.contains(
          /there are no munros within 10 km of achnanclach, try another search or increase the distance./i
        );
      });
    });
  });

  describe("when searching for bothies", () => {
    it("should display munros within the selected distance", () => {
      cy.get(".MuiFormGroup-root")
        .contains(/bothies/i)
        .click();

      cy.get("[role=combobox]")
        .click()
        .get("[role=option]")
        .contains(/ben alder/i)
        .click();

      cy.contains(
        /found 2 bothies within 10 km of ben alder. Select the icons for more information./i
      );

      cy.get(marker)
        .its("length")
        .should("eq", 3);

      cy.get(marker)
        .eq(1)
        .click();

      cy.contains(/ben alder cottage/i);
      cy.contains(/grid reference/i);
      cy.contains(/NN 498 679/i);

      cy.get(marker)
        .eq(1)
        .click();

      cy.get(marker)
        .eq(0)
        .click();

      cy.contains(/ben alder/i);
      cy.contains(/height/i);
      cy.contains(/1148 metres/i);
      cy.contains(/NN 496 718/i);

      cy.get(".MuiSlider-markLabel")
        .contains("20km")
        .click();

      cy.get(marker)
        .its("length")
        .should("eq", 4);

      cy.get(marker)
        .eq(1)
        .click();

      cy.contains(/learn more/i).should(
        "have.attr",
        "href",
        "https://www.mountainbothies.org.uk/bothies/central-highlands/ben-alder-cottage/"
      );
    });

    describe("when there are no munros within the selected distance", () => {
      it("should display a message informing the user there are no results", () => {
        cy.get(".MuiFormGroup-root")
          .contains(/bothies/i)
          .click();

        cy.get("[role=combobox]")
          .click()
          .get("[role=option]")
          .contains(/an stuc/i)
          .click();

        cy.contains(
          /there are no bothies within 10 km of an stuc, try another search or increase the distance./i
        );
      });
    });
  });
});
