class GiocoQuindici {
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

        for (let i = 1; i < 17; i++) {
            let tileObj = {
                element: document.getElementById('tile'+i),
                utilizzata: false
            }
            this.tiles.push(tileObj);
            //this.tiles[i-1].element.innerHTML = `${i-1}`; // write the number of the cell for DEBUG
        }

    }


    inizializza() { 
         
        function shuffleArray(array) {
            /* Randomize array in-place using Durstenfeld shuffle algorithm */
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        }

        const tilesConfig = shuffleArray(
                                Array.from({length:16},(v,k)=>k+1));
       
        for (let i = 0; i < tilesConfig.length; i++) {
            this.tiles[i].value = tilesConfig[i];
            this.tiles[i].element.style.color = "";
            this.tiles[i].element.style.boxShadow = "";
            this.tiles[i].utilizzata = false; 
        }

        this.renderValoriTiles(); 


        this.messaggio.innerHTML = "";
        this.giocoAttivo = true;
        this.playerSelector = true;      
    }

    renderValoriTiles() {
        for (let i = 0; i < this.tiles.length; i++) {
            this.tiles[i].element.innerHTML = this.tiles[i].value;
        }

        this.nascondiTileSedici();
    }

    giocaPartita() {
        this.inizializza(); // configura tutti i parametri per l'inizio della partita
        
        
        document.addEventListener("keydown", (event) => this.muoviTiles(event));


        this.restartBtn.addEventListener("click", () => this.inizializza());
    }

    nascondiTileSedici() {
        for (const tile of this.tiles) {
            if (tile.value == 16) {
                tile.element.innerHTML = "";
                tile.element.style.opacity = "0%";
            }   
            else {
                tile.element.style.opacity = "100%";
            }
        }
    }

    muoviTiles(event) {

        //if (!this.giocoAttivo || tile.utilizzata) return;

        //event.currentTarget.style.color = "#F2E9E4";
        //tile.utilizzata = true;          // flagga quella tile come utilizzata
        //tile.element.style.boxShadow = "none";   // disattiva l'animazione al click
        if (event.key == "ArrowLeft") {
            this.muoviTileVuota("destra");
        }
        else if (event.key == "ArrowRight") {
            this.muoviTileVuota("sinistra");
        }
        else if (event.key == "ArrowUp") {
            this.muoviTileVuota("giu");
        }
        else if (event.key == "ArrowDown") {
            this.muoviTileVuota("su");
        }
        

        if (this.boardPiena() || this.vittoria()) {  // ferma il gioco se ho vinto o non ci sono piu caselle vuote
            this.fermaGioco();
            this.giocoAttivo = false;
        }
        else {
            //this.playerSelector = !this.playerSelector;   
        }

    }

    trovaIndexTileVuota() {
        let tilesValues = this.tiles.map(t=>t.value);
        return tilesValues.indexOf(16);
    }
    
    checkMovimentoTileVuotaAmmesso(direzione, indexTileVuota) {
        console.log(direzione)

        const nonAmmessi = [];
        nonAmmessi.sinistra = [0, 4, 8, 12];
        nonAmmessi.destra = [3, 7, 11, 15];
        nonAmmessi.su = [0, 1, 2, 3];
        nonAmmessi.giu = [12, 13, 14, 15];

        console.log(nonAmmessi[direzione]);
        console.log(indexTileVuota);
        console.log(indexTileVuota in nonAmmessi[direzione]);
        if (nonAmmessi[direzione].includes(indexTileVuota)) return false;
        return true;
    }


    muoviTileVuota(direzione) {

        let i = this.trovaIndexTileVuota();
        console.log(`i = ${i}`);

        if (!this.checkMovimentoTileVuotaAmmesso(direzione, i)) return;

        this.audioPop.currentTime = 0;
        this.audioPop.play();

        if (direzione == "sinistra") {
                this.tiles[i].value = this.tiles[i-1].value;
                this.tiles[i-1].value = 16;
            }
        else if (direzione == "destra") {
                this.tiles[i].value = this.tiles[i+1].value;
                this.tiles[i+1].value = 16;
            }
        else if (direzione == "su") {
                this.tiles[i].value = this.tiles[i-4].value;
                this.tiles[i-4].value = 16;
            }
        else if (direzione == "giu") {
                this.tiles[i].value = this.tiles[i+4].value;
                this.tiles[i+4].value = 16;
            }

        this.renderValoriTiles();
    }

    vittoria() {
        const winConditions = [];
        
        if (winConditions.some(condition => condition)) {
            this.messaggio.innerHTML = "..that's Groovy!"
        }
        else {
            this.messaggio.innerHTML = ""
        }

        
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


gioco = new GiocoQuindici("schermo", "messaggio", "restartBtn");
gioco.giocaPartita();




/////////////////////////////////////////////



























