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

const updateFormSelektor = `${mainSelektor} hs-update-kunde`;

/* global Cypress, cy, describe, it, beforeEach */

describe('Aendern', () => {
    beforeEach(() => {
        // Seite aufrufen: siehe cypress.json
        cy.visit(Cypress.config().baseUrl);
    });

    it('Aendern des Kunde mit ID "00000000-0000-0000-0000-000000000040"', () => {
        // Given
        const nachname = 'Delta';
        const neuerNachname = 'Deltanew';

        cy.get(sucheSelektor).click();
        cy.get(suchformularSelektor).within(() => {
            cy.get('#nachnameInput').type(nachname);
            cy.get('button').click();
        });

        cy.get(`${gefundeneKundenSelektor} div mat-card`).within(() => {
            cy.get('button').click();
        });

        // When
        // Todo Implement proper search.
        cy.get(`${updateFormSelektor}`).within(() => {
            cy.get('#nachnameInput').type(neuerNachname);
            cy.get('button').click();
        });
    });
});
