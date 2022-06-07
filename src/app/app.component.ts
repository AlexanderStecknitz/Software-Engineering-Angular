/*
 * Copyright (C) 2018 - present Juergen Zimmermann, Hochschule Karlsruhe
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

// "core" enthaelt Funktionalitaet, damit die Webanwendung im Browser laeuft
import { Component } from '@angular/core';
// statt console.log(...)
import log from 'loglevel';

// JIT (= Just-in-time) Compiler: Uebersetzung zur Laufzeit, d.h. dynamisch
// AoT (= Ahead-of-Time) Compiler: statische Übersetzung fuehrt zu weniger Code bzw. kleinerem Bundle

// Web-Komponente ("web component"): Zusammenfassung von
//  * HTML-Fragment
//  * Shadow DOM fuer das HTML-Fragment
//  * CSS-Stil fuer das HTML-Fragment
//  * Logik durch JavaScript
// https://developer.mozilla.org/docs/Web/Web_Components
// https://developer.mozilla.org/docs/Web/Web_Components/Shadow_DOM
// BackboneJS war 2010 das erste komponentenorientierte, clientseitige Web-Framework

// "Composite Pattern" bei UIs: Eine UI-Komponente besteht aus wiederum aus
// einfachen UI-Komponenten, z.B. ein Suchformular besteht aus einem Label,
// einem Eingabefeld und einem Button.

// Eine Komponente (= funktionale Einheit) ist an das MVC-Pattern angelehnt:
// sie besteht aus einem HTML-Template (= View) und der zugehoerigen
// Dialogsteuerung (= Controller) mit dem Model als Bindeglied.
// Controller sind klein ("Thin Controllers") und die Anwendungslogik wird
// in die Service-Klassen ausgelagert.
// Innerhalb der Wurzelkomponente werden die Kindkomponenten geladen.
// https://angular.io/docs/js/latest/api/annotations/ComponentAnnotation-class.html

// Metadaten-Annotationen in Angular sind z.B. @Component.
// Annotationen sind ein Spezialfall der Decorators:
// Ein Decorator *ergaenzt* die vorhandene Funktionalitaet von einer Klasse oder
// einer Methode oder einem Attribut oder einem Methodenargument.
// siehe https://github.com/wycats/javascript-decorators

/**
 * Wurzelkomponente mit dem Tag &lt;hs-root&gt;
 */
@Component({
    // Schnittstelle der View fuer Wiederverwendung in anderen Komponenten:
    // durch das Tag <hs-app> in index.html, d.h. CSS-Selector wird spezifiziert
    // Schreibweise innerhalb von HTML:         kebab-case
    // Schreibweise innerhalb von TypeScript:   CamelCase
    // Beispiel:
    //   <hs-root>
    //       <hs-header>
    //           ...
    //       </hs-header>
    //       <hs-main>
    //           <router-outlet>
    //               <hs-suche-buecher>
    //                   <hs-suchformular>
    //                       ...
    //                   </hs-suchformular>
    //                   <hs-suchergebnis>
    //                       ...
    //                   </hs-suchergebnis>
    //               </hs-suche-buecher>
    //           <router-outlet>
    //       </hs-main>
    //   </hs-root>
    selector: 'hs-root',

    // "template - A document or file having a preset format, used as a
    // starting point for a particular application so that the format does not
    // have to be recreated each time it is used."
    // Siehe http://www.thefreedictionary.com/template
    // HTML-Templates ~ View bei MVC: das Model referenzieren u. den Controller
    // aufrufen.
    // Multi-line Strings fuer kleine Inline-Templates.
    // Vorteile:  alles auf einen Blick und keine separate HTML-Datei
    // Nachteile: kein Syntax-Highlighting, kein Autovervollstaendigen
    // VS Code soll kuenftig Syntax-Highlighting und IntelliSense koennen:
    // https://github.com/angular/angular/blob/master/CHANGELOG.md#features-4
    //
    // Composed DOM: Der Baum und die Tags, die im Browser dargestellt werden
    // Light DOM:    Der Baum, in den der Shadow-DOM eingefuegt wird,
    //               z.B. <suche>
    // Shadow DOM:   Der Baum, der innerhalb des Light DOM eingefuegt wird,
    //               z.B. das Template aus SucheTitel.
    //               Dieser Baum ist zunaechst vor dem Endbenutzer verborgen
    // http://webcomponents.org/polyfills/shadow-dom
    // http://w3c.github.io/webcomponents/spec/shadow
    // https://github.com/angular/angular/issues/2529
    templateUrl: './app.component.html',

    // ViewEncapsulation:
    // Emulated (= default): Shadow DOM wird emuliert (hier: Shadow DOM v0),
    //  d.h. CSS gilt nur fuer die Komponente selbst, nicht fuer die Kindkomponenten
    //  wird auch von angular-fontawesome verwendet
    // None: CSS gilt fuer die gesamte Webanwendung, d.h. <style> innerhalb von <head>
    // ShadowDom: "shadow root" v1 verwenden, d.h. CSS auch fuer die Kindkomponenten
    //  https://w3c.github.io/webcomponents/spec/shadow
    //  https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM

    // https://github.com/angular/angular/issues/5059
    // encapsulation: ViewEncapsulation.ShadowDom,
})

// Definitionsklasse ~ Controller: Eingabedaten entgegennehmen, Model fuer die
// View aktualisieren, Funktionen fuer die Benutzer-Interaktion bereitstellen,
// z.B. onClick oder onSubmit
// Die Doku zu Angular haengt immer noch den Suffix "Component" an die Klasse
export class AppComponent {
    constructor() {
        log.debug('AppComponent.constructor()');
    }
}
