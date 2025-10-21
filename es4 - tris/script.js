const audioPop = new Audio("sounds/pop.flac")
const audioClave = new Audio("sounds/clave.wav")
const audioFanfare = new Audio("sounds/fanfare.wav")
const audioPageflip = new Audio("sounds/pageflip.wav")


const messaggio = document.getElementById("messaggio")
const schermo = document.getElementById("schermo");
const tiles = [];

for (let i = 1; i < 10; i++) {
    tileObj = {
        element: document.getElementById('tile'+i),
        utilizzata: false
    }
    tiles.push(tileObj);
    //tiles[i-1].element.innerHTML = `${i-1}`; // write the number of the cell for DEBUG
}




let playerSelector = true;
let giocoAttivo = true;

for (const tile of tiles) {
    tile.element.addEventListener("click", (event) => {
            if (giocoAttivo) {
                if (tile.utilizzata == true) {
                    return;
                }
                if (playerSelector) {
                    event.currentTarget.innerHTML = "X";
                }
                else {
                    event.currentTarget.innerHTML = "O";
                }
                audioPop.currentTime = 0;
                audioPop.play();
                event.currentTarget.style.color = "#F2E9E4";
                tile.utilizzata = true;          // flagga quella tile come utilizzata
                tile.element.style.boxShadow = "0 0 0px #fff";   // disattiva l'animazione al click
                
                if (boardPiena() || vittoria()) {  // ferma il gioco se ho vinto o non ci sono piu caselle vuote
                    fermaGioco();
                    giocoAttivo = false;
                    return;
                }
                playerSelector = !playerSelector;   
            }
        }
    )
}

restartBtn.addEventListener("click", resetGioco);


function boardPiena() {       
    if (tiles.every(t => t.utilizzata)) {
        return true;
    }
    return false;
}

function fermaGioco() {
    // check stato tiles
    if (vittoria()) {
        // il giocatore che ha appena mosso ha vinto
        let activePlayer = "X";
        if (!playerSelector) activePlayer = "O";
        messaggio.innerHTML = `${activePlayer} WON`;
        audioFanfare.currentTime = 0;
        audioFanfare.play();

    } 
    else {
        messaggio.innerHTML = `DRAW`;
        audioClave.currentTime = 0;
        audioClave.play();
    }

    
    // mostra pulsante per rigiocare
    restartBtn.style.display = 'inline-block';
}


function vittoria() {
    const winConditions = [];

    function pushWinCondition(i, j, k) {
        let condition = (tiles[i].element.innerHTML == tiles[k].element.innerHTML)
                         && (tiles[k].element.innerHTML == tiles[j].element.innerHTML) 
                         && (tiles[i].element.innerHTML != '')

        winConditions.push(condition)
    }

    pushWinCondition(0,1,2);
    pushWinCondition(3,4,5);
    pushWinCondition(6,7,8);
    pushWinCondition(0,3,6);
    pushWinCondition(1,4,7);
    pushWinCondition(2,5,8);
    pushWinCondition(0,4,8);
    pushWinCondition(2,4,6);    
    
    if (winConditions.some(condition => condition)) {
        return true;
    }
    return false;

}


function resetGioco() {
    audioPop.currentTime = 0;
    audioPop.playbackRate = 0.2;
    audioPop.play();
    audioPop.playbackRate = 1;  // ripristino il playback rate normale
    audioPageflip.currentTime = 0.6;
    audioPageflip.play();
    for (const tile of tiles) {
        tile.element.innerHTML = "";
        tile.element.style.color = "";
        tile.element.style.boxShadow = "";
        tile.utilizzata = false; 
    }
    
    messaggio.innerHTML = "";
    restartBtn.style.display = "none";
    giocoAttivo = true;
    playerSelector = true;
}