/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable max-lines-per-function */
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
const detailsSelektor = `${mainSelektor} hs-details-kunde`;
const bearbeitenSelektor = `${detailsSelektor} hs-details-bearbeiten`;

const updateFormSelektor = `${mainSelektor} hs-update-kunde form`;
const updateNachnameSelektor = '#nachnameUpdate';
const updateFamilienstandSelektor = 'hs-update-familienstand select';
const updateGeschlechtSelektor = 'hs-update-geschlecht select';

const detailsNachnameSelektor = 'hs-details-nachname div div';
const detailsGeschlechtSelektor = 'hs-details-geschlecht div div span span';
const detailsFamilienstandSelektor =
    'hs-details-familienstand div div span span';
/* global Cypress, cy, describe, it, beforeEach */

describe('Aendern', () => {
    beforeEach(() => {
        // Seite aufrufen: siehe cypress.json
        cy.visit(Cypress.config().baseUrl);
    });

    it('Aendern des Kunde mit ID "00000000-0000-0000-0000-000000000040"', () => {
        // Given
        const nachname = 'Delta';
        const kundeId = '00000000-0000-0000-0000-000000000040';
        const neuerNachname = 'DeltaNew';
        const neuerFamilienstand = 'Ledig';
        const neuesGeschlecht = 'Divers';

        cy.get(sucheSelektor).click();
        cy.get(suchformularSelektor).within(() => {
            cy.get('#nachnameInput').type(nachname);
            cy.get('button').click();
        });

        cy.get(`${gefundeneKundenSelektor} div mat-card mat-card-content table `)
            .eq(0).eq(0)
            .contains(nachname)
            .parent().parent()
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            .eq(4).eq(1).eq(0)
            .click();

        // When
        // Todo Implement proper search.
        cy.get(bearbeitenSelektor).contains('span', 'Bearbeiten').click();
        cy.get(updateFormSelektor).within(() => {
            cy.get(updateNachnameSelektor).clear();
            cy.get(updateNachnameSelektor).type(neuerNachname);

            cy.get(updateNachnameSelektor).select(neuerNachname);
            cy.get(updateGeschlechtSelektor).select(neuesGeschlecht);
            cy.get(updateFamilienstandSelektor).select(neuerFamilienstand);
            cy.get('button').click();
        });

        // Then
        cy.get(sucheSelektor).click();
        cy.get(suchformularSelektor).within(() => {
            cy.get('#nachnameInput').type(neuerNachname);
            cy.get('button').click();
        });

        cy.get(`${gefundeneKundenSelektor} div mat-card`, { timeout: 200_000 }).each(
            // eslint-disable-next-line arrow-parens
            (elem) => {
                expect(elem.text()).to.contain(neuerNachname);
                expect(elem.text()).to.contain(neuesGeschlecht);
                expect(elem.text()).to.contain(neuerFamilienstand);
            },
        );

        cy.log(`Aendern von ${kundeId}: erfolgreich`);
    });
});
