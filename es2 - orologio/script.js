const orario = document.getElementById("orario");
const messaggio = document.getElementById("messaggio");



function aggiornaOrologio() {
    let ora = new Date();

    orario.innerHTML = ora.toLocaleTimeString("it-IT");

    if (ora.getHours() > 6 && ora.getHours() <= 12) {
        messaggio.innerHTML = "Buon Mattino!";
    }
    else if (ora.getHours() > 12 && ora.getHours() <= 18) {
        messaggio.innerHTML = "Buon Pomeriggio!";
    }
    else if (ora.getHours() > 18 && ora.getHours() <= 24) {
        messaggio.innerHTML = "Buona Notte!";
    }
}

// aggiorna subito all'inizio
aggiornaOrologio();

// poi ogni secondo
setInterval(aggiornaOrologio, 1000);

    