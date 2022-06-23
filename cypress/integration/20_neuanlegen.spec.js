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

// import { login } from './login';

// CSS-Selektoren in der Navigationsleiste
const navSelektor = 'hs-root hs-header hs-nav';
const createPath = 'kunde/create';
const createMenuSelektor = `${navSelektor} div button[routerLink="${createPath}"]`;
const suchePath = 'kunde/suche';
const sucheSelektor = `${navSelektor} div button[routerLink="${suchePath}"]`;

// CSS-Selektoren in <main>
const mainSelektor = 'hs-root hs-main';
const suchformularSelektor = `${mainSelektor} hs-suche-kunde hs-suchformular`;
const suchergebnisSelektor = `${mainSelektor} hs-suchergebnis`;
const gefundeneKundenSelektor = `${suchergebnisSelektor} hs-gefundene-kunden`;

// const homeSelektor = `${mainSelektor} hs-home`;

const createSelektor = `${mainSelektor} hs-create-kunde`;

/*
const ratingCreateSelektor = 'hs-create-rating select';
const verlagCreateSelektor = 'hs-create-verlag select';
*/

/* global Cypress, cy, describe, it, beforeEach, expect */

// eslint-disable-next-line max-lines-per-function
describe('Neuanlegen', () => {
    beforeEach(() => {
        cy.visit(Cypress.config().baseUrl);
        // login();
    });
    // eslint-disable-next-line max-lines-per-function
    it('Neues Buch', () => {
        // Given
        const nachname = 'Mustermann';
        const email = 'example@mail.com';
        const homepage = 'https://www.mywebsite.com';
        const geburtsdatum = '6/1/2022';
        const postleitzahl = '68723';
        const ort = 'Birkenstadt';
        const betrag = '4999';
        const waehrung = 'EUR';

        // When
        cy.get(createMenuSelektor).click();
        cy.get(createSelektor).within(() => {
            cy.get('#nachnameInput').type(nachname);
            cy.get('#emailInput').type(email);
            cy.get('#homepageInput').type(homepage);
            cy.get('#geburtsdatumInput').type(geburtsdatum);
            cy.get('#postleitzahlInput').type(postleitzahl);
            cy.get('#ortInput').type(ort);
            cy.get('#betragInput').type(betrag);
            cy.get('#waehrungInput').type(waehrung);
            cy.get('#sportInput').click();
            cy.get('#reisenInput').click();
            cy.get('#lesenInput').click();
            cy.get('#newsletterInput').click();
            cy.get('#buttonCreate').click();
        });
    });

    it('Suchen mit Nachname "Mustermann"', () => {
        // Given
        const nachname = 'Mustermann';

        // When
        cy.get(sucheSelektor).click();
        cy.get(suchformularSelektor).within(() => {
            cy.get('#nachnameInput').type(nachname);
            cy.get('button').click();
        });

        // Then
        // eslint-disable-next-line prettier/prettier
        cy.get(`${gefundeneKundenSelektor} div mat-card`, { timeout: 200_000 }).each(
            // eslint-disable-next-line arrow-parens
            (elem) => {
                expect(elem.text()).to.contain(nachname);
            },
        );
        cy.log('Kundenerstellung erfolgreich');
    });
});
