
class PokemonQuiz {
    constructor() {
        this.submitBtn = document.getElementById("submitBtn");
        this.nameInput = document.getElementById("nameInput");
        this.newPokemonBtn = document.getElementById("newPokemonBtn");
        this.feedback = document.getElementById("feedback");

        this.currentPokemonData = {
            id: null,
            name: null,
            type: null,
            imageUrl: null
        }; 

        this.currentGuess = {
            name: null,
            type: null
        };

        this.url = "https://pokeapi.co/api/v2/pokemon/";
        this.gens = [];
    }

    start() {
        this.inizializza();

        this.newPokemonBtn.addEventListener("click", (e) => this.newRandomPokemon());
    }

    inizializza() {
        console.log("inizializza..")
        this.newRandomPokemon();
        this.submitBtn.addEventListener("click", (e) => this.guess());
    }

    guess() {
        let win = false;
        
        this.currentGuess.name = this.nameInput.value;
        console.log("currentguess.name: " + this.currentGuess.name);
        
        if (this.currentPokemonData.name == this.currentGuess.name)
            win = true;


        this.showGuessFeedback(win);

    }

    showGuessFeedback(win) {
        let messaggio = '';

        if (win) {
            messaggio = "hai vinto";
        } else {
            messaggio = "hai perso";
        }

        console.log(messaggio);
        this.feedback.innerHTML = messaggio;
    }

    newRandomPokemon() {
        console.log("new random pokemon..");
        const randomPokemonId = this.getRandomPokemonID();


        this.getPokemonData();

        this.displayPokemon() 


    }

    getRandomPokemonID() {
        /*let randomID = random number taken from the array this.genToallowedIDs();
        return randomID;*/
    }

    genToallowedIDs() {
        
        allowedIDs = [];
        /*
        if (this.gens == 1) {
            allowedIDs.push(numeri da 1 a 151)            
        }
        if (this.gens == 1) {
            allowedIDs.push(numeri da 1 a 151)            
        }
        if (this.gens == 1) {
            allowedIDs.push(numeri da 1 a 151)            
        }
        if (this.gens == 1) {
            allowedIDs.push(numeri da 1 a 151)            
        }
        if (this.gens == 1) {
            allowedIDs.push(numeri da 1 a 151)            
        }
        if (this.gens == 1) {
            allowedIDs.push(numeri da 1 a 151)            
        }
            */
    }

    displayPokemon() {
        /*
        prendi dati da this.currentPokemonData
        e mostra l'immagine nella displaybox
        */
    };

    getPokemonFromAPI() {
        /*usa this.url per trovare Pokemon
        e salva in this.currentPokemonData */
        //let id = this.currentPokemonData.id;
        let id = Math.floor(Math.random() * 1000);
        async function fetchData(url) {

            try {
                const response = await fetch(url)

                if(!response.ok) {
                    throw new Error("Could not fetch resource from Pokemon API");
                }

                const data = await response.json();
                console.log(data.name);
            }
            catch(error) {
                console.error(error);
            }
        }

        fetchData(this.url+id);
    }

    getPokemonData() {
        /*
        const pokemonJSON = this.getPokemonFromAPI();
        this.currentPokemonData.name = pokemonJSON.name;
        this.currentPokemonData.type = pokemonJSON.type;
        this.currentPokemonData.imageUrl = pokemonJSON.imageURL;
        */
    }


}


gioco = new PokemonQuiz();
gioco.start();
gioco.getPokemonFromAPI();