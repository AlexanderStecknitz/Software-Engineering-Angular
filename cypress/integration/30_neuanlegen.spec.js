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

import { login } from './login';

// CSS-Selektoren in der Navigationsleiste
const navSelektor = 'hs-root hs-header hs-nav';
const createPath = '/kunde/create';
const createMenuSelektor = `${navSelektor} ul li a[routerLink="${createPath}"]`;
const suchePath = '/kunde/suche';
const sucheSelektor = `${navSelektor} ul li a[routerLink="${suchePath}"]`;

// CSS-Selektoren in <main>
const mainSelektor = 'hs-root hs-main';
const homeSelektor = `${mainSelektor} hs-home`;

const createSelektor = `${mainSelektor} hs-create-kunde`;
const kategorieCreateSelektor = 'hs-create-kategorie select';
const geschlechtCreateSelektor = 'hs-create-geschlecht select';
const familienstandCreateSelektor = 'hs-create-familienstand select';
/*
const ratingCreateSelektor = 'hs-create-rating select';
const verlagCreateSelektor = 'hs-create-verlag select';
*/

const suchformularSelektor = `${mainSelektor} hs-suche-kunde hs-suchformular`;
const gefundeneKundenSelektor = `${mainSelektor} hs-suchergebnis hs-gefundene-kunden`;

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
        const geschlecht = 'Weiblich';
        const kategorie = 5;
        const familienstand = 'Ledig';
        const postleitzahl = '68723';
        const ort = 'Birkenstadt';
        const umsatz = '4999';
        const waehrung = 'EUR';

        // When
        cy.get(createMenuSelektor).click();
        cy.get(createSelektor).within(() => {
            cy.get('#nachnameInput').type(nachname);
            cy.get('#emailInput').type(email);
            cy.get('#homepageInput').type(homepage);
            cy.get('#geburtsdatumInput').type(geburtsdatum);
            cy.get(geschlechtCreateSelektor).select(geschlecht);
            cy.get(kategorieCreateSelektor).select(kategorie);
            cy.get(familienstandCreateSelektor).select(familienstand);
            cy.get('#postleitzahlInput').type(postleitzahl);
            cy.get('#ortInput').type(ort);
            cy.get('#umsatzInput').type(umsatz);
            cy.get('#waehrungInput').type(waehrung);
            cy.get('#sportInput').click();
            cy.get('#reisenInput').click();
            cy.get('#lesenInput').click();
            cy.get('#newsletterInput').click();
            cy.get('button').click();
        });

        // Then
        cy.contains(`${homeSelektor} h1`, 'Hello!');
        cy.get(sucheSelektor).click();
        cy.get(suchformularSelektor).within(() => {
            cy.get('#nachnameInput').type(nachname);
            cy.get('button').click();
        });
        cy.get(`${gefundeneKundenSelektor} tr td:nth-child(3)`).each(
            // eslint-disable-next-line arrow-parens
            (elem) => {
                expect(elem.text()).to.contain(nachname);
            },
        );
    });
});
