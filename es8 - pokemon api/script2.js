
class PokemonQuiz {
    constructor() {
        this.submitBtn = document.getElementById("submitBtn");
        this.nameInput = document.getElementById("nameInput");
        this.newPokemonBtn = document.getElementById("newPokemonBtn");
        this.feedback = document.getElementById("feedback");
        this.imagePokemon = document.getElementById("pokemonImg");

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
        
        this.currentGuess.name = this.nameInput.value.toLowerCase();
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


    displayPokemon() {
        /*
        prendi dati da this.currentPokemonData
        e mostra l'immagine nella displaybox
        */
       console.log("dentro displayPokemon");
       this.imagePokemon.src = this.currentPokemonData.sprites.front_default;
       console.log("this.imagePokemon.src = " + this.imagePokemon.src); 
    };

    getPokemonFromAPI() {
        /*usa this.url per trovare Pokemon
        e salva in this.currentPokemonData */
        //let id = this.currentPokemonData.id;
        let id = Math.floor(Math.random() * 1000);

        console.log("dentro getPokemonFromAPI")
        async function fetchData(url) {

            try {
                const response = await fetch(url)
                
                if (!response.ok) {
                    throw new Error("Could not fetch resource from Pokemon API");
                }

                const data = await response.json();
                
                console.log("(in getPokemonFromAPI): data fetchato, name: " + data.name);
                console.log("pkmn sprite url: " + data.sprites.front_default);
                return data;
            }
            catch(error) {
                console.error(error);
            }
        }

        fetchData(this.url+id);
    }

    async getPokemonData() {

        console.log("dentro getPokemonData, prima di  this.getPOkemonfromAPI")
        const data = this.getPokemonFromAPI();
        console.log("dentro getPokemonData, dopo this.getPOkemonfromAPI, data: " + data);
        this.currentPokemonData.name = data.name;
        this.currentPokemonData.imageUrl = data.sprites.front_default;
        this.currentPokemonData.type = data.type;

        console.log("dentro getPokemonData, currentPokemonData.name: " + this.currentPokemonData.name);
        
        
        
    }


}


gioco = new PokemonQuiz();
gioco.start();


