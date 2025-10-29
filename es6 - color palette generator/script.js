class ColorPalette {
    constructor(numColori=5) {
        this.numColori = 5;
        this.tiles = [];
        this.inizializza();

        this.generateBtn = document.getElementById('generateBtn');
    } 

    inizializza() {    
        for (let i = 1; i < 6; i++) {
            let tileObj = {
                element: document.getElementById('tile'+i),
                color: this.randomHexColor()
            }
            this.tiles.push(tileObj);
        }

        for (let tile of this.tiles) {           
            tile.element.style.backgroundColor = tile.color;
            tile.element.innerHTML = tile.color;
            console.log("analizzando tile " + tile.color)
            console.log("is dark: ", this.isDark(tile.color));
            if (this.isDark(tile.color)) tile.element.style.color = "#ffffff";
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

    hexToDec(hex) {
        return Number('0x'+hex)
    } 

    isDark(hexColor) {
        let r = this.hexToDec(hexColor.charAt(1) + hexColor.charAt(2) )
        let g = this.hexToDec(hexColor.charAt(3) + hexColor.charAt(4) )
        let b = this.hexToDec(hexColor.charAt(5) + hexColor.charAt(6) )

        console.log(hexColor)
        console.log("r " + r + " g" + g + " b" + b);

        let dark = null;
        const thr = 100;
        const ceil = 160;
        if ((r < thr && g < thr && b < ceil) || (r < ceil && g < thr && b < thr) || (r < thr && g < ceil && b < thr)) dark = true
        else dark = false

        console.log("dark: "+ dark)
        return dark;
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