


class TimerChallenge {
    constructor() {
        this.messaggio = document.getElementById("feedback");
        this.mainBtn = document.getElementById("startBtn");
    };

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async gioca() {
        this.messaggio.innerHTML = "Ciao"
        //await this.delay(200);
        this.messaggio.innerHTML = "..stronzo"
        //await this.delay(200);
        this.messaggio.innerHTML = "Pronto per giocare?"
        
        // Assegna il primo comportamento
        this.mainBtn.addEventListener("click", () => this.startChallenge(), {once: true});
        
        //this.mostraIstruzioni();
        //this.avviaTimer();
        
        
    }

    entraModalitaGioco() {
        this.messaggio.innerHTML = "modalità gioco on";
        console.log("modalita gioco on")
    }



    async startChallenge() {

        this.messaggio.innerHTML = "PREPARATI.."
        await this.delay(1000); // aspetta 1 secondi
        this.mainBtn.innerHTML = "5...";
        await this.delay(1000); // aspetta 1 secondi
        this.mainBtn.innerHTML = "4...";
        await this.delay(1000); // aspetta 1 secondi
        this.mainBtn.innerHTML = "3...";
        await this.delay(1000); // aspetta 1 secondi
        this.mainBtn.innerHTML = "2...";
        await this.delay(1000); // aspetta 1 secondi
        this.mainBtn.innerHTML = "1...";
        await this.delay(1000); // aspetta 1 secondi
        this.messaggio.innerHTML = "GO!";
        this.mainBtn.innerHTML = "Premi qui!";
        this.mainBtn.style.backgroundColor = "red";


        console.log("Start counting time");
        const startTime = Date.now();

        const endTime = await new Promise(resolve => {
            this.mainBtn.addEventListener("click", () => {
                this.mainBtn.innerHTML = "Wa Bukki!";
                this.mainBtn.style.backgroundColor = "black";
                resolve(Date.now());
            }, {once: true});
        });

        const elapsed = endTime - startTime;
        this.messaggio.innerHTML = `Hai premuto dopo ${elapsed / 1000} secondi.`;
    }

    tastoPremuto(e) {
        if (e.key == "Enter") {
            this.flashScreen();
        }
    }

    flashScreen() {
        console.log("FLASH!");
    }

    mostraIstruzioni() {

    }

    avviaTimer() {

    }
}



class Timer {
    constructor() {

    }

    start() {

    }

    getElapsedTime() {
        return elapsedTime
    }
}

class InputHandler {
    constructor(event) {
        this.e = event;
    }
}

class Feedback {
    constructor() {

    }
}


const gioco = new TimerChallenge();
gioco.gioca();


