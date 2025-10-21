///// indovina il numero tra 1 e 100 in 5 tentativi
/// versione grafica invece che gli alert


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


let numeroCorretto = getRandomInt(1, 101);
let tentativi = 0;
const maxTentativi = 5;

// mi salvo gli elementi dell'hmtl con cui devo interagire
const input = document.getElementById("guessInput");
const feedback = document.getElementById("feedback");
const tentativiText = document.getElementById("tentativi");
const submitBtn = document.getElementById("submitBtn");
const restartBtn = document.getElementById("restartBtn");
const finestraGioco = document.getElementsByClassName("container")[0]

// comportamento pulsante per provare un numero
submitBtn.addEventListener("click", () => {
        const guess = parseInt(input.value);
        if (isNaN(guess) || guess < 1 || guess > 100) {
            feedback.textContent = "Inserisci un numero valido tra 1 e 100.";
        return;
        }

        tentativi++;
        tentativiText.innerHTML = `Tentativi rimasti: ${maxTentativi - tentativi}`;

        if (guess == numeroCorretto) {
            feedback.innerHTML = "Indovinato!"; 
            tentativiText.innerHTML = '';
            finestraGioco.style.backgroundColor = "#4ad300ff";  // cambia colore sfondo per vittoria
            endGame();
            return;
        }
        else if (guess > numeroCorretto) {
            feedback.innerHTML = "Troppo alto!";
        }
        else if (guess < numeroCorretto) {
            feedback.innerHTML = "Troppo basso!";
        }

        if (tentativi >= maxTentativi && guess != numeroCorretto) {
            finestraGioco.style.backgroundColor = "#830000ff";
            feedback.innerHTML = `Tentativi finiti. Il numero era ${numeroCorretto}.`;
            endGame();
        }
    }
);

// funzione per finire il gioco
function endGame() {
    submitBtn.disabled = true;
    restartBtn.style.display = 'inline-block';
}

// comportamento pulsante gioca ancora
restartBtn.addEventListener("click", () => {
        // resetta parametri del gioco
        numeroCorretto = getRandomInt(1, 101);
        tentativi = 0;
        guess = null;
        // pulisci tutti i messaggi
        feedback.innerHTML = '';
        tentativiText.innerHTML = '';
        finestraGioco.style.backgroundColor = "#0e0075";  // ripristina il colore sfondo
        restartBtn.style.display = "none";    // nascondi il pulsante restart
        submitBtn.disabled = false;        // riattiva pulsante submit

    }
)


/*

function giocaPartita() {
    const numeroCorretto = getRandomInt(1, 101);

    let tentativi = 1;
    let sguess = null; 

    while (tentativi <= 5) {
        //guess = parseInt(prompt("Indovina il numero da 1 a 100!")); // faccio parseInt per convertire esplicitamente la stringa a numero. non è necessario ma è per chiarezza 

        else {
            feedback.innerHTML = "Devi inserire un numero valido.";
            continue;   /// metto contiue qui così salto il tentativi++, cioè se uno scrive unac osa che non è un numero non glielo conto come tentativo
        };

    }
    feedback.innerHTML = `Tentativi finiti. Il numero era ${numeroCorretto}.`;
    return false; 
}

giocare = true
while (giocare) {
    giocaPartita();
    //giocare = confirm("Vuoi giocare ancora?");
    giocare = false;
}
*/
