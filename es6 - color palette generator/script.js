class ColorPalette {
    constructor(numColori=5) {
        this.numColori = 5;
        this.tiles = [];
        this.inizializza();

        this.generateBtn = document.getElementById('generateBtn');
    } 

    inizializza() {    
        for (let i = 1; i < 6; i++) {
            this.tiles.push(document.getElementById('tile'+i));
        }

        for (let tile of this.tiles){
            tile.style.backgroundColor = `'${this.randomHexColor()}'`;
        }
    }


    random(number) {
        return Math.floor(Math.random() * number);
    }

    randomHexColor() {
        let r = this.random(256).toString(16).padStart(2, '0');  // pad start serve per assicurarsi che isa scritto a 2 cirfre
        let g = this.random(256).toString(16).padStart(2, '0');
        let b = this.random(256).toString(16).padStart(2, '0');
        return "#" + r + g + b
    }



    main() {

        this.generateBtn.addEventListener("click", e => {
                this.inizializza();
            }
        );
    }
}


const palette = new ColorPalette;

palette.main();