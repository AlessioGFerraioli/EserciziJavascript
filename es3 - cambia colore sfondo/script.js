const schermo = document.getElementById("schermo");

function random(number) {
    return Math.floor(Math.random() * number);
}

function randomHexColor() {
    let r = random(256).toString(16).padStart(2, '0');  // pad start serve per assicurarsi che isa scritto a 2 cirfre
    let g = random(256).toString(16).padStart(2, '0');
    let b = random(256).toString(16).padStart(2, '0');
    return "#" + r + g + b
}


function bgChange(gradient=true) {
    const angle = random(360);
    if (gradient) {
            return `linear-gradient(${angle}deg, ${randomHexColor()}, ${randomHexColor()})`;
    }
    return `rgb(${random(256)}, ${random(256)}, ${random(256)})`;
}

schermo.addEventListener("click", (event) => {
    if (event.target.classList.contains("tile")) {  // questo controllo è per assicurarci che non cambi colore qualcosa che non è tile, come schermo stesso
        event.target.style.background = bgChange(false); // event.target identifica l'elemento piu prossimo (piu dentro), cioè il div tile su cui ho cliccato, invece di event.currentTarget che invece indica a cui è attaccato l'eventListener
       }    
    }
)

