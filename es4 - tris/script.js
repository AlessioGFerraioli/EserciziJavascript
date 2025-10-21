class GiocoTris {
    constructor(schermoId, messaggioId, restartBtnId) {
        // load sounds        
        this.audioPop = new Audio("sounds/pop.flac")
        this.audioClave = new Audio("sounds/clave.wav")
        this.audioFanfare = new Audio("sounds/fanfare.wav")
        this.audioPageflip = new Audio("sounds/pageflip.wav")

        this.messaggio = document.getElementById(messaggioId)
        this.schermo = document.getElementById(schermoId);
        this.restartBtn = document.getElementById(restartBtnId)

        this.tiles = [];

        for (let i = 1; i < 10; i++) {
            let tileObj = {
                element: document.getElementById('tile'+i),
                utilizzata: false
            }
            this.tiles.push(tileObj);
            //this.tiles[i-1].element.innerHTML = `${i-1}`; // write the number of the cell for DEBUG
        }

    }

    inizializza() { 
        for (const tile of this.tiles) {
            tile.element.innerHTML = "";
            tile.element.style.color = "";
            tile.element.style.boxShadow = "";
            tile.utilizzata = false; 
        }

        this.messaggio.innerHTML = "";
        this.restartBtn.style.display = "none";
        this.giocoAttivo = true;
        this.playerSelector = true;      
    }

    giocaPartita() {
        this.inizializza(); // configura tutti i parametri per l'inizio della partita

        for (const tile of this.tiles) {
            tile.element.addEventListener("click", (event) => this.giocaTurno(tile, event))
        }

        this.restartBtn.addEventListener("click", () => this.resetPartita());
    }

    giocaTurno(tile, event) {
        if (!this.giocoAttivo || tile.utilizzata) return;
    
        if (this.playerSelector) {
            event.currentTarget.innerHTML = "X";
        }
        else {
            event.currentTarget.innerHTML = "O";
        }

        this.audioPop.currentTime = 0;
        this.audioPop.play();
        event.currentTarget.style.color = "#F2E9E4";
        tile.utilizzata = true;          // flagga quella tile come utilizzata
        tile.element.style.boxShadow = "none";   // disattiva l'animazione al click
        
        if (this.boardPiena() || this.vittoria()) {  // ferma il gioco se ho vinto o non ci sono piu caselle vuote
            this.fermaGioco();
            this.giocoAttivo = false;
        }
        else {
            this.playerSelector = !this.playerSelector;   
        }

    }
    
    fermaGioco() {
        // check stato tiles
        if (this.vittoria()) {
            // il giocatore che ha appena mosso ha vinto
            let activePlayer = "X";
            if (!this.playerSelector) activePlayer = "O";
            this.messaggio.innerHTML = `${activePlayer} WON`;
            this.audioFanfare.currentTime = 0;
            this.audioFanfare.play();
        } 
        else {
            this.messaggio.innerHTML = `DRAW`;
            this.audioClave.currentTime = 0;
            this.audioClave.play();
        }

        // disattiva il behaviour di tutte le tile (segnandole utilizzate e disattivando animazione) 
        for (let tile of this.tiles) {
            tile.utilizzata = true;  
            tile.element.style.boxShadow = "none";   // disattiva l'animazione al click
        }
        // mostra pulsante per rigiocare
        this.restartBtn.style.display = 'inline-block';
    }


    boardPiena() {       
        if (this.tiles.every(t => t.utilizzata)) {
            return true;
        }
        return false;
    }


    vittoria() {
        const winConditions = [];

        function pushWinCondition(i, j, k, tiles) {
            let condition = (tiles[i].element.innerHTML == tiles[k].element.innerHTML)
                            && (tiles[k].element.innerHTML == tiles[j].element.innerHTML) 
                            && (tiles[i].element.innerHTML != '')

            winConditions.push(condition)
            if (condition) {
                tiles[i].element.style.color = "#f2de05ff";
                tiles[j].element.style.color = "#f2de05ff";
                tiles[k].element.style.color = "#f2de05ff";
            }
           
        }

        pushWinCondition(0,1,2, this.tiles);
        pushWinCondition(3,4,5, this.tiles);
        pushWinCondition(6,7,8, this.tiles);
        pushWinCondition(0,3,6, this.tiles);
        pushWinCondition(1,4,7, this.tiles);
        pushWinCondition(2,5,8, this.tiles);
        pushWinCondition(0,4,8, this.tiles);
        pushWinCondition(2,4,6, this.tiles);    
        
        if (winConditions.some(condition => condition)) {
            return true;
        }
        return false;
    }

    resetPartita() {
        // funzione per quando hai già giocato e premi il pulsante per giocare ancora
        this.audioPop.currentTime = 0;
        this.audioPop.playbackRate = 0.2;
        this.audioPop.play();
        this.audioPop.playbackRate = 1;  // ripristino il playback rate normale
        this.audioPageflip.currentTime = 0.6;
        this.audioPageflip.play();
        this.giocaPartita(); 
    }
}


gioco = new GiocoTris("schermo", "messaggio", "restartBtn");
gioco.giocaPartita();




/////////////////////////////////////////////



























