/*
 * Copyright (C) 2021 - present Juergen Zimmermann, Hochschule Karlsruhe
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />

// CSS-Selektoren in der Navigationsleiste, vgl.: XPath
const navSelektor = 'hs-root hs-header hs-nav';
const suchePath = 'kunde/suche';
const sucheSelektor = `${navSelektor} div button[routerLink="${suchePath}"]`;

// CSS-Selektoren in <main>
const mainSelektor = 'hs-root hs-main';
const suchformularSelektor = `${mainSelektor} hs-suche-kunde hs-suchformular`;
const suchergebnisSelektor = `${mainSelektor} hs-suchergebnis`;
const gefundeneKundenSelektor = `${suchergebnisSelektor} hs-gefundene-kunden`;

/* global Cypress, cy, describe, it, beforeEach, expect */

// https://docs.cypress.io/api/table-of-contents
// Tests mit describe() und it() wie in Mocha und Jasmine

// eslint-disable-next-line max-lines-per-function
describe('Suchen', () => {
    beforeEach(() => {
        // Seite aufrufen: siehe cypress.json
        cy.visit(Cypress.config().baseUrl);
    });

    it('Homepage', () => {
        // Then
        // Strings ueberpruefen
        cy.contains(navSelektor, 'Suche');
        cy.contains(mainSelektor, 'Alexander');
    });

    it('Suchseite', () => {
        // When
        cy.get(sucheSelektor).click();

        // Then
        // URL im Browser ueberpruefen
        cy.url().should('match', new RegExp(`${suchePath}$`, 'u'));
        cy.log('Suchseite aufgerufen');
    });

    it('Suchen mit Nachname "a"', () => {
        // Given
        const nachname = 'a';

        // When
        cy.get(sucheSelektor).click();
        cy.get(suchformularSelektor).within(() => {
            cy.get('#nachnameInput').type(nachname);
            cy.get('button').click();
        });

        // Then
        cy.get(`${gefundeneKundenSelektor} div mat-card`).each(
            // eslint-disable-next-line arrow-parens
            (elem) => {
                expect(elem.text()).to.contain(nachname);
            },
        );
        cy.log(`Suchen mit Nachname "${nachname}": erfolgreich`);
    });

    it('Suchen nach Geschlecht "Männlich"', () => {
        // Given
        const geschlecht = 'M';

        // When
        cy.get(sucheSelektor).click();
        cy.get(suchformularSelektor).within(() => {
            cy.get('hs-suche-geschlechttype mat-select').select(geschlecht);
            cy.get('button').click();
        });

        // Then
        // <span> wegen [ngSwitch]
        cy.get(`${gefundeneKundenSelektor} tr td:nth-child(4) span span`).each(
            // eslint-disable-next-line arrow-parens
            (elem) => {
                cy.wrap(elem).should('have.text', geschlecht);
            },
        );
        cy.log(`Suchen nach Geschlecht "${geschlecht}": erfolgreich`);
    });
});
