// **********************************
// ******* FUNZIONI GLOBALI *********
// **********************************

function wr(testo) {
    if(testo!=null){
        var ris = document.getElementById("risultati");
        var p = document.createElement("p");
        p.innerHTML = testo;
        ris.appendChild(p);
    }    
}

function calcolaCostoOrario(prezzoAcquisto, durataAnni) {
    return (prezzoAcquisto/(durataAnni*8760)).toFixed(2);
}

// **********************************
// *******     CLASSI       *********
// **********************************

class Elemento {
    constructor(nome) {
        this.nome = nome;
    }

    getNome() {
        return this.nome;
    }
}

class Strumento extends Elemento {
    constructor(nome, costo) {
        super(nome);
        this.costo = parseFloat(costo);
    }

    getCosto() {
        return this.costo;
    }

    getCostoStringa() {
        return "€/h " + this.costo.toFixed(2);
    }

    getDescrizione() {
        return this.getNome() + " | "+ this.getCostoStringa();
    }
}

class Lavorazione extends Elemento {
    constructor(nome, strumenti, durata) {
        super(nome);
        this.strumenti = strumenti;
        this.durata = durata;
        this.costo = this.getCalcoloCosto();
    }

    getCalcoloCosto() {
        var ris = 0;
        for(var c=0; c<this.strumenti.length; c++) {
            ris += this.strumenti[c].getCosto() * this.durata;
        }
        return ris;
    }

    getCosto() {
        return this.costo;
    }

    getDurata() {
        return this.durata;
    }

    getStrumenti() {
        return this.strumenti;
    }

    getDescrizione() {
        var descr = "<strong>"+this.getNome()+"</strong>"+"<br>"+"<i>";
        descr += "Strumenti: <br>";
        for(var c=0; c<this.strumenti.length; c++) {
            descr += " - "+this.strumenti[c].getNome() + " | "+ this.strumenti[c].getCostoStringa()+"<br>";
        }
        descr += "Durata: "+this.getDurata()+" h<br>";
        descr += "Costo Totale: € "+this.getCosto().toFixed(2)+"</i>";
        return descr;
    }
}

// **********************************
// ******* IMPLEMENTAZIONE  *********
// **********************************

var manovale = new Strumento("Manovale", 15.0);
var autista = new Strumento("Autista", 20.0);
var muratore = new Strumento("Muratore", 35.0);
var capocantiere = new Strumento("Capo cantiere", 45.0);

var pala = new Strumento("Pala", calcolaCostoOrario(100,1));
var camion = new Strumento("Camion", calcolaCostoOrario(30000,5));

var scavo = new Lavorazione("Scavo", [manovale, pala], 100);
var trasporto = new Lavorazione("Trasporto", [autista, camion], 3);


wr(scavo.getDescrizione());
wr(trasporto.getDescrizione());