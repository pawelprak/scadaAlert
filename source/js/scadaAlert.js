/* Licensed under MIT. */

/*jslint devel: true */
/*jslint nomen: true*/
/*global define */

/**
 * -----------------------------
 * 2016-01-22
 * -----------------------------
 * - Start
 *
 *
 * -----------------------------
 * 2016-02-04
 * -----------------------------
 * - Dodano metodę publiczną: updateTexts
 * - Przy włączonej opcji heigth wprowadzono centrowanie (vertical) elementów <p> 
 */


(function (root, factory) {
    'use strict';
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["scadaAlert"], function (AlertKM) {
            return (root.AlertKM = factory(AlertKM));
        });
    } else {
        root.AlertKM = factory(root.AlertKM);
    }
}(this, function () {
    'use strict';


    function AlertKM(config) { // To jest konstruktor klasy
        if (!(this instanceof AlertKM)) {
            throw new TypeError("*** AlertKM *** Constructor cannot be called as a function. Use 'new' keyword");
        }
        if (config === null || config === undefined) {
            console.log('*** AlertKM *** No parameters passed to constructor!');
            return false;
        }
        if (config.id === null || config.id === undefined) {
            console.log('*** AlertKM *** No id!');
            return false;
        }
        if (document.getElementById(config.id) !== null) { // zapobieganie zmianie parametrów istniejącego elementu
            throw new Error('*** AlertKM *** Element with ID: ' + config.id + ' already exists!');
        }

        // Class public properties
        this.id = config.id;
        this.type = config.type || 'alarm'; // typ okienka: alarm / warning / info / ok
        this.css = config.css || null; // klasa css dostarczona przez użytkownika. Jeśli podana - będzie wczytywana na końcu (nadpisze wszystkie inne style)
        this.title = config.title || null; // tytuł okienka, pogrubiony i zwiększony tekst
        this.texts = config.texts || null; // tabela z kolejnymi linijkami tekstu
        this.position = config.position || 'bottom'; // Pozycja okienka: bottom / top / center
        this.html = config.html || null; // dodanie całego fragmentu html

        this.timeVisible = config.timeVisible || null; // czas przez jaki ma być widoczne okienko
        this.timeCyclic = config.timeCyclic || null; // czas co jaki okres czasu ma się ponownioe pojawiać okienko z powiadomieniem

        this.backgroundColor = config.backgroundColor || null;
        this.borderColor = config.borderColor || null;
        this.padding = config.padding || null; // podawać w em
        this.opacity = config.opacity || null;
        this.width = config.width || null;
        this.height = config.height || null;
        this.fontSize = config.fontSize || null;

        // Class private properties
        this._div = null;
        this._pHeigth = null;
        this._intervalId = null;

        // Class private methods
        this._createParagraph = function (message, title) {
            var p,
                text;

            p = document.createElement("p");
            if (title === undefined) {
                p.setAttribute("class", "alert-km-paragraph");
            } else {
                p.setAttribute("class", "alert-km-title");
            }

            text = document.createTextNode(message);
            p.appendChild(text);
            this._div.appendChild(p);
        };


        this._show = function () {
            if (this._div.style.visibility === 'visible') {
                return;
            } else {
                this._div.style.visibility = 'visible';
            }
        };


        this._hide = function () {
            if (this._div.style.visibility === 'hidden') {
                return;
            } else {
                this._div.style.visibility = 'hidden';
            }
        };


        this._setDivCenterPosition = function () {
            this._div.style.bottom = AlertKM.WINDOW_HEIGHT / 2 - (this._div.offsetHeight / 2) + 'px';
        };


        this._setParCenterPosition = function () {
            var i;
            this._pHeigth = this._div.firstChild.offsetHeight;
            for (i = 0; i < this._div.childNodes.length; i += 1) { // vertical allign p elements
                this._div.childNodes[i].style.top = this._div.offsetHeight / 2 - ((this._pHeigth * this._div.childNodes.length) / 2) + 'px';
            }
        };


        this._cyclicShow = function () {
            var obj = this;

            setTimeout(function () {
                obj._hide();
            }, this.timeVisible);

            if (this.timeCyclic > this.timeVisible) {
                this._intervalId = setInterval(function () {
                    obj._show();
                    setTimeout(function () {
                        obj._hide();
                    }, obj.timeVisible);
                }, this.timeCyclic);
            }
            if (this.timeCyclic < this.timeVisible) {
                this._intervalId = setInterval(function () {
                    obj._show();
                    setTimeout(function () {
                        obj._hide();
                    }, obj.timeCyclic);
                }, this.timeVisible);
            }
            if (this.timeCyclic === this.timeVisible) {
                this._intervalId = setInterval(function () {
                    if (obj._div.style.visibility === 'visible') {
                        obj.hide();
                    } else {
                        obj._show();
                    }
                }, this.timeVisible);
            }
        };

    }

    // static properties
    AlertKM.WINDOW_WIDTH = window.innerWidth;
    AlertKM.WINDOW_HEIGHT = window.innerHeight;

    AlertKM.prototype = {

        constructor: AlertKM,

        // METODY PUBLICZNE 
        render: function () {
            var i,
                div;

            // stworzenie kontenera głównego
            this._div = document.createElement("div");
            this._div.setAttribute("id", this.id);

            // dodanie klas definiujących odpowiednie typy komunikatów
            this._div.classList.add("alert-km-all");
            switch (this.type) {
            case 'alarm':
                this._div.classList.add("alert-km-alarm");
                break;
            case 'warning':
                this._div.classList.add("alert-km-warning");
                break;
            case 'info':
                this._div.classList.add("alert-km-info");
                break;
            case 'ok':
                this._div.classList.add("alert-km-ok");
                break;
            default:
                console.log('*** AlertKM *** Unknown type! Choose for example: warning');
            }

            // dodanie klasy ze stylami użytkownika
            if (this.css !== null) {
                this._div.classList.add(this.css);
            }

            // dodanie tytułu
            if (this.title !== null) {
                this._createParagraph(this.title, 'tytul');
            }

            // dodanie tekstów
            if (this.texts !== null) {
                for (i = 0; i < this.texts.length; i += 1) {
                    this._createParagraph(this.texts[i]);
                }
            }

            // dodatkowe reguły css użytkownika
            if (this.backgroundColor !== null) {
                this._div.style.backgroundColor = this.backgroundColor;
            }
            if (this.borderColor !== null) {
                this._div.style.borderColor = this.borderColor;
            }
            if (this.padding !== null) {
                this._div.style.padding = this.padding + ' 0 ' + this.padding + ' 0 '; // tylko góra i dół
            }
            if (this.opacity !== null) {
                this._div.style.opacity = this.opacity;
            }
            if (this.width !== null) {
                if (AlertKM.WINDOW_WIDTH < 500) { // wielkość ramki w zależności od typu wyświetlacza
                    this._div.style.width = '95%'; // beagle na ktw na pełną szerokość
                } else {
                    this._div.style.width = this.width;
                }
            }
            if (this.height !== null) {
                this._div.style.height = this.height;
            }
            if (this.fontSize !== null) {
                this._div.style.fontSize = this.fontSize;
            }

            // dodanie pełnych elementów html 
            if (this.html !== null) {
                this._div.appendChild(this.html);
            }

            // dodanie elementu do html
            this._div.style.visibility = 'visible'; // potrzebne do obsługi metod show/hide
            document.body.appendChild(this._div);

            // vertical allign of <p> elements
            if (this.height !== null) {
                this._setParCenterPosition();
            }

            // set alert position
            switch (this.position) {
            case 'top':
                //this._div.style.bottom = AlertKM.WINDOW_HEIGHT - this._div.offsetHeight - 5 + "px";
                this._div.style.top = "1%";
                break;
            case 'bottom':
                this._div.style.bottom = "1%";
                break;
            case 'center':
                this._setDivCenterPosition();
                break;
            default:
                this._div.style.bottom = "1%";
                console.log('*** AlertKM *** Unknown type of position! Setting: bottom');
            }

            // cyclic show and hide
            if (this.timeCyclic !== null && this.timeVisible !== null) {
                this._cyclicShow();
            }

        },


        show: function () {
            this._show();
        },


        hide: function () {
            this._hide();
        },


        updateTexts: function (newTexts) {
            var i;

            while (this._div.firstChild) { // remove old texts
                this._div.removeChild(this._div.firstChild);
            }
            if (this.title !== null) { // id exists, add title
                this._createParagraph(this.title, 'tytul');
            }
            for (i = 0; i < newTexts.length; i += 1) { // add new texts
                this._createParagraph(newTexts[i]);
            }
            if (this.position === 'center') { // center div position
                this._setDivCenterPosition();
            }
            if (this.height !== null) { // center <p> elements in <div>
                this._setParCenterPosition();
            }
        },


        remove: function () {
            clearInterval(this._intervalId);
            if (this._div !== undefined) {
                //this._div.remove(); // it doesn't work on chromium browser installed at tinyCoreLinux    
                document.body.removeChild(this._div);
            }
        }

    };

    return AlertKM;
}));