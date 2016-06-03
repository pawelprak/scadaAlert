/*global $, jQuery*/
/*jslint devel: true */
/*global document: false */
/*jslint nomen: true*/
/*global require */

// Pierwszy plik, ktory bedzie zaladowany przez biblioteke require - konfiguracja sciezek do modulow
require.config({
    baseUrl: "js",
    paths: {
        jquery: 'libs/jquery',
        scadaAlert: 'libs/scadaAlert',
        main: 'main',
        prism: "libs/prism"
    },
    shim: {
        "bootstrap": {
            "deps": ['jquery']
        },
        "prism": {
            "exports": "Prism"
        }
    }
});


// Start glownej aplikkacji
require(['main'], function (main) {
    'use strict';

    $(document).ready(function () {
        main.init();
    });
});