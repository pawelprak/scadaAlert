//myModule.sayHi();

console.log('classic');




var infoAktywnyNotAusWOW = new AlertKM({
    id: 'idSoftVersion',
    fontSize: '1.0em',
    texts: ['alert!!!']
});

infoAktywnyNotAusWOW.render();
setTimeout(function () {
    infoAktywnyNotAusWOW.remove();
    infoAktywnyNotAusWOW = null;
}, 5000);

