///// indovina il numero tra 1 e 100 in 5 tentativi

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function giocaPartita() {
    const numeroCorretto = getRandomInt(1, 101);

    let tentativi = 1;
    let guess = null; 

    while (tentativi <= 5) {
        guess = parseInt(prompt("Indovina il numero da 1 a 100!")); // faccio parseInt per convertire esplicitamente la stringa a numero. non è necessario ma è per chiarezza 

        if (guess == numeroCorretto) {
            alert("Indovinato!"); 
            document.body.style.backgroundColor = "green";
            return true;
        }
        else if (guess > numeroCorretto) {
            alert("Troppo alto!");
        }
        else if (guess < numeroCorretto) {
            alert("Troppo basso!");
        }
        else {
            alert("Devi inserire un numero valido.");
            continue;   /// metto contiue qui così salto il tentativi++, cioè se uno scrive unac osa che non è un numero non glielo conto come tentativo
        };
        tentativi++;
    }
    alert(`Tentativi finiti. Il numero era ${numeroCorretto}`);
    return false; 
}

giocare = true
while (giocare) {
    giocaPartita();
    giocare = confirm("Vuoi giocare ancora?");
}

