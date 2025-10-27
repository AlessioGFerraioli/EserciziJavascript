
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
        this.gens = this.getSelectedGens();

        this.newPokemonBtn.addEventListener("click", (e) => this.newRandomPokemon());

    }

    getSelectedGens() {

        let selectedGens = [];
        document.getElementById('gen1').checked

        for (let i=1; i<10; i++) {
            console.log("gen"+i)
            if (document.getElementById('gen'+i).checked)
                selectedGens.push(i);
        }

        console.log("selectedGens: " + selectedGens)
        
        return selectedGens;
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
        let textColor = '';

        if (win) {
            messaggio = "Indovinato!";
            textColor = '#0554F2'; 
        } else {
            messaggio = "Ritenta..";
            textColor = '#676767';
        }

        console.log(messaggio);
        this.feedback.style = "visibility: visible";
        this.feedback.innerHTML = messaggio;
        this.feedback.style.color = textColor;
    }

    async newRandomPokemon() {
        this.feedback.style = "visibility: hidden";
        this.gens = this.getSelectedGens();
        console.log("new random pokemon..");
        this.nameInput.value = "";
        this.currentPokemonData.id = this.getRandomPokemonID();
        
        await this.getPokemonData(this.currentPokemonData.id);

        this.displayPokemon() 
    }

    getRandomPokemonID() {
        /*let randomID = random number taken from the array this.genToAllowedIDs();
        return randomID;*/
        function getRandomArrayElement(arr) {
            let i = Math.floor(Math.random() * arr.length);
            return arr[i]; 
        }

        let allowedIDs = this.genToAllowedIDs();
        return getRandomArrayElement(allowedIDs);
    }

    genToAllowedIDs() {
        
        
        function interiInIntervallo(from, to) {
            return Array.from({length:(to - from + 1)},(v,k)=>k+from) 
        };

        let allowedIDs = [];
        console.log("dentro gen ToAllowedID, this.gens: " + this.gens)
        if (this.gens.includes(1)) {
            allowedIDs.push(...interiInIntervallo(1,151));            
        }
        if (this.gens.includes(2)) {
            allowedIDs.push(...interiInIntervallo(152,251));            
        }
        if (this.gens.includes(3)) {
            allowedIDs.push(...interiInIntervallo(252,386));            
        }
        if (this.gens.includes(4)) {
            allowedIDs.push(...interiInIntervallo(387,493));            
        }
        if (this.gens.includes(5)) {
            allowedIDs.push(...interiInIntervallo(494,649));            
        }
        if (this.gens.includes(6)) {
            allowedIDs.push(...interiInIntervallo(650,721));            
        }
        if (this.gens.includes(7)) {
            allowedIDs.push(...interiInIntervallo(722,809));            
        }
        if (this.gens.includes(6)) {
            allowedIDs.push(...interiInIntervallo(810,905));            
        }
        if (this.gens.includes(6)) {
            allowedIDs.push(...interiInIntervallo(906,1025));            
        }

        console.log("allowed IDs: " + allowedIDs)
        
        return allowedIDs
        
    }

    displayPokemon() {
        /*
        prendi dati da this.currentPokemonData
        e mostra l'immagine nella displaybox
        */
       console.log("dentro displayPokemon, currentpokemonName: ", this.currentPokemonData.name);
       console.log("this.imagePokemon.src = " + this.imagePokemon.src); 
       console.log(this.currentPokemonData)
       this.imagePokemon.src = this.currentPokemonData.imageUrl;
       
    };

    async fetchData(url) {
        try {
            const response = await fetch(url)
            
            if (!response.ok) {
                throw new Error("Could not fetch resource from Pokemon API");
            }

            const data = await response.json();
            
            console.log("(in getPokemonFromAPI): data fetchato, name: " + data.name);
            console.log("pkmn sprite url: " + data.sprites.front_default);
            console.log("getPokemonFromAPI ha finito.")
            return data;
        }
        catch(error) {
            console.error(error);
        }
    }


    async getPokemonData(id) {
        
        const data = await this.fetchData(this.url+id);
        this.currentPokemonData.name = data.name;
        this.currentPokemonData.imageUrl = data.sprites.front_default;
        this.currentPokemonData.type = data.type;

        console.log("dentro getPokemonData, currentPokemonData.name: " + this.currentPokemonData.name);        
    }


}


gioco = new PokemonQuiz();
gioco.inizializza();


