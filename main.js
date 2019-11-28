// Provate a riprodurre uno slider di immagini simile a quello visto a lezione, con grafica totalmente a piacere!
// BONUS: cambiare immagine cliccando sui pallini (mostrando quindi l'immagine con indice corrispondente)
// Nome repo: js-jq-carousel

$('.rounded.arrow.right').click(function(){
    // creiamo due variabili per non ripetere sempre img corrente e la sua successiva
    var imgCorrente = $('img.active');
    var imgSuccessiva = imgCorrente.next('img');
    // due variabili anche per i pallini, poi il resto è logica conseguenza di quello che accade alle immagini
    // basta seguire le stesse logiche di prev and next, first and last, ed il gioco è fatto.
    var pallinoCorrente = $('i.active');
    var pallinoSuccessivo = pallinoCorrente.next('i');
    // a ogni click togli dalla img corrente la classe active e aggiungila a quella dopo, la classe active è quella che gestisce il display:block/none nel css
    imgCorrente.removeClass('active');
    imgSuccessiva.addClass('active');

    pallinoCorrente.removeClass('active');
    pallinoSuccessivo.addClass('active');
    // visto che dovró usare il last per fare lo stesso discorso per le sinistre, allora la sfrutto anche qua: se l'immagine corrente ha la classe last, quindi so che è in posizione finale, allora la successiva diventa la prima, che prenderà la classe active, e il circo ricomincia
    if (imgCorrente.hasClass('last')) {
        imgSuccessiva = $('img.first').addClass('active');
        pallinoSuccessivo = $('i.first').addClass('active');
    };
});

$('.rounded.arrow.left').click(function(){
    var imgCorrente = $('img.active');
    var imgPrecedente = imgCorrente.prev('img');

    var pallinoCorrente = $('i.active');
    var pallinoPrecedente = pallinoCorrente.prev('i');

    imgCorrente.removeClass('active');
    imgPrecedente.addClass('active');

    pallinoCorrente.removeClass('active');
    pallinoPrecedente.addClass('active');

    if (imgCorrente.hasClass('first')) {
        imgPrecedente = $('img.last').addClass('active');
        pallinoPrecedente = $('i.last').addClass('active');
    };
});


// BONUS: //

// index() di jQuery con il $(this) mi ritorna la posizione dell'elemento cliccato, è l'equivalente del indexOf per le array: qui é come se l'array fosse il padre dots, e tutti i puntini dentro sono i suoi elementi in posizione.
// mi creo una serie di varibaili più chiacchierine per non portarmi dietro il mondo intero
$('.dots i').click(function(){
    var pallinoCorrente = $('i.active');
    var pallinoScelto = $(this);
    // questo indexPallino sarà un numero (nel nostro caso da 0 a 3) che indica la posizione del pallino
    var indexPallino = pallinoScelto.index();
    var imgCorrente = $('img.active');


    // se il pallino che clicco NON è quello attivo
    if (!pallinoScelto.hasClass('active')) {
        // tolgo la classe al pallino che era attivo
        pallinoCorrente.removeClass('active');
        // aggiungo la classe active al pallino che ho premuto
        pallinoScelto.addClass('active');
        // all'immagine corrente tolgo la classe active (quindi tolgo il display block)
        imgCorrente.removeClass('active');
        // e qui accade la magia, perchè stiamo letteralmente PARLANDO grazie a jQuery:
        // prendi il div photos, trovami l'img con posizione indexPallino (quindi la posizione del pallino cliccato) e aggiungile la classe active.
        // così facendo, di ogni pallino su cui clickeremo, prendiamo la posizione e andiamo a cercare l'immagine con la stessa posizione all'interno del div photos. SPETTACOLO PURO!!!!
        $('.photos').find('img').eq(indexPallino).addClass('active');
    };
});


// l'esercitazione di oggi prevede di aggiungere l'autoplay allo slider che abbiamo visto ieri.
// L'idea è che ogni 3 secondi le slide cambino da sole, passando in automatico a visualizzare la slide successiva.
// Nome repo: js-jq-carousel-autoplay

//  le cose principali su cui ragionare sono il setInterval ogni 3 secondi, il clearInterval se viene premuto il tasto play (con conseguente cambio dell'iconcina) e se si preme sulle frecce... andiamo per ordine...


function myTime() {
    var imgCorrente = $('img.active');
    var imgSuccessiva = imgCorrente.next('img');

    var pallinoCorrente = $('i.active');
    var pallinoSuccessivo = pallinoCorrente.next('i');

    imgCorrente.removeClass('active');
    imgSuccessiva.addClass('active');

    pallinoCorrente.removeClass('active');
    pallinoSuccessivo.addClass('active');

    if (imgCorrente.hasClass('last')) {
    imgSuccessiva = $('img.first').addClass('active');
    pallinoSuccessivo = $('i.first').addClass('active');
    };
};

var clock = setInterval(myTime, 3000);

$('.autoplay-playing').click(function(){
    clearInterval(clock);
});
