/*global $, jQuery*/
/*jslint devel: true */
/*global require, define */

define(['jquery', 'scadaAlert', 'prism'], function (jquery, AlertKM, Prism) {
    'use strict';

    var info1,

        remove = function () {
            if (info1 !== null) {
                info1.remove();
                info1 = null;
            }
        },

        init = function () {
            Prism.highlightAll();

            //console.log('init 222');
            //            setTimeout(function () {
            //                var infoAktywnyNotAusWOW = new AlertKM({
            //                    id: 'idRandomAlert',
            //                    fontSize: '1.0em',
            //                    texts: ['Watch out!']
            //                });
            //                infoAktywnyNotAusWOW.render();
            //                setTimeout(function () {
            //                    infoAktywnyNotAusWOW.remove();
            //                    infoAktywnyNotAusWOW = null;
            //                }, 5000);
            //            }, 2000);


            $(".btn-remove").on("click", function (event, ui) {
                //console.log(info1);
                remove();
            });


            //  _____                      
            // |_   _|   _ _ __   ___  ___ 
            //   | || | | | '_ \ / _ \/ __|
            //   | || |_| | |_) |  __/\__ \
            //   |_| \__, | .__/ \___||___/
            //       |___/|_|              
            $(".btn-types").on("click", function (event, ui) {
                console.log(info1);
                info1 = new AlertKM({
                    id: 'idInfo1',
                    position: 'center',
                    type: $(this).val(),
                    fontSize: '1.0em',
                    texts: [$(this).val()]
                });
                info1.render();
                setTimeout(function () {
                    remove();
                }, 5000);
            });

            //  ____  _                        __  _   _ _     _           __  ____                               
            // / ___|| |__   _____      __    / / | | | (_) __| | ___     / / |  _ \ ___ _ __ ___   _____   _____ 
            // \___ \| '_ \ / _ \ \ /\ / /   / /  | |_| | |/ _` |/ _ \   / /  | |_) / _ \ '_ ` _ \ / _ \ \ / / _ \
            //  ___) | | | | (_) \ V  V /   / /   |  _  | | (_| |  __/  / /   |  _ <  __/ | | | | | (_) \ V /  __/
            // |____/|_| |_|\___/ \_/\_/   /_/    |_| |_|_|\__,_|\___| /_/    |_| \_\___|_| |_| |_|\___/ \_/ \___|
            $(".btn-showHide").on("click", function (event, ui) {
                switch ($(this).val()) {
                case 'render':
                    info1 = new AlertKM({
                        id: 'idInfo1',
                        position: 'center',
                        fontSize: '1.0em',
                        texts: [$(this).val()]
                    });
                    info1.render();
                    break;
                case 'hide':
                    info1.hide();
                    break;
                case 'show':
                    info1.show();
                    break;
                default:
                    console.log('showHide - switch default');
                    break;
                }
            });

            //   ___ ___ ___ 
            //  / __/ __/ __|
            // | (__\__ \__ \
            //  \___|___/___/
            $(".btn-customCss").on("click", function (event, ui) {
                info1 = new AlertKM({
                    id: 'idInfo1',
                    position: 'center',
                    css: 'alert-km-testCustomCss',
                    fontSize: '1.0em',
                    texts: ['Custom CSS']
                });
                info1.render();
            });

            //  _____         _       
            // |_   _|____  _| |_ ___ 
            //   | |/ _ \ \/ / __/ __|
            //   | |  __/>  <| |_\__ \
            //   |_|\___/_/\_\\__|___/
            $(".btn-texts").on("click", function (event, ui) {
                switch ($(this).val()) {
                case 'valShow':
                    info1 = new AlertKM({
                        id: 'idInfo1',
                        position: 'center',
                        fontSize: '1.0em',
                        title: 'Title',
                        texts: ['line 1', 'line 2']
                    });
                    info1.render();
                    break;
                case 'valUpdate':
                    info1.updateTexts(['update 1', 'update 2', 'update 3']);
                    break;
                default:
                    console.log('texts - switch default');
                    break;
                }
            });

            //  ____           _ _   _             
            // |  _ \ ___  ___(_) |_(_) ___  _ __  
            // | |_) / _ \/ __| | __| |/ _ \| '_ \ 
            // |  __/ (_) \__ \ | |_| | (_) | | | |
            // |_|   \___/|___/_|\__|_|\___/|_| |_|
            $(".btn-position").on("click", function (event, ui) {
                info1 = new AlertKM({
                    id: 'idInfo1',
                    position: $(this).val(),
                    fontSize: '1.0em',
                    texts: ['Position: ' + $(this).val()]
                });
                info1.render();
            });

            //  _     _             _ 
            // | |__ | |_ _ __ ___ | |
            // | '_ \| __| '_ ` _ \| |
            // | | | | |_| | | | | | |
            // |_| |_|\__|_| |_| |_|_|
            $(".btn-customHtml").on("click", function (event, ui) {
                var fragHtml = document.createDocumentFragment(),
                    div,
                    p,
                    span;

                div = document.createElement('div');
                $(div)
                    .attr('id', 'idTemp')
                    .addClass('ui-corner-all')
                    .css({
                        'border': '0.1em solid',
                        'border-color': '#888282',
                        'border-radius': '0.5em'

                    });
                p = document.createElement('p');
                $(p)
                    .text('This is custom HTML!')
                    .css({
                        'padding': '1em',
                        'margin': '1em',
                        'display': 'inline-table', // 'table-cell' 'inline-table'
                        'border': '0.1em solid',
                        'width': '25%',
                        'border-color': '#888282',
                        'border-radius': '0.5em',
                        'text-align': 'center'
                    });
                span = document.createElement('span');
                $(span)
                    .addClass('glyphicon')
                    .addClass('glyphicon-off')
                    .css({
                        'float': 'left'
                    })
                    .appendTo(p);
                $(div).append(p);
                $(fragHtml).append(div);

                info1 = new AlertKM({
                    id: 'idInfo1',
                    type: 'info',
                    fontSize: '1.0em',
                    html: fragHtml
                });
                info1.render();
            });

            //                  _ _      
            //   ___ _   _  ___| (_) ___ 
            //  / __| | | |/ __| | |/ __|
            // | (__| |_| | (__| | | (__ 
            //  \___|\__, |\___|_|_|\___|
            //       |___/
            $(".btn-cyclic").on("click", function (event, ui) {
                info1 = new AlertKM({
                    id: 'idInfo1',
                    position: 'center',
                    fontSize: '1.0em',
                    timeVisible: 1000,
                    timeCyclic: 1000,
                    texts: ['Cyclic show/hide']
                });
                info1.render();
            });

            //                                       _                
            //  _ __   __ _ _ __ __ _ _ __ ___   ___| |_ ___ _ __ ___ 
            // | '_ \ / _` | '__/ _` | '_ ` _ \ / _ \ __/ _ \ '__/ __|
            // | |_) | (_| | | | (_| | | | | | |  __/ ||  __/ |  \__ \
            // | .__/ \__,_|_|  \__,_|_| |_| |_|\___|\__\___|_|  |___/
            // |_|                                                
            $(".btn-parameters").on("click", function (event, ui) {
                info1 = new AlertKM({
                    id: 'idInfo1',
                    position: 'center',
                    backgroundColor: '#120f0f',
                    borderColor: '#505050',
                    padding: '1em',
                    opacity: 0.9,
                    width: '95%',
                    height: '95%',
                    fontSize: '1.5em',
                    title: 'Connection error',
                    texts: ['No PLC connected!']
                });
                info1.render();
                setTimeout(function () {
                    remove();
                }, 5000);
            });


        };


    return {
        init: init
    };

});