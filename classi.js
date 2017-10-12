// **********************************
// ******* FUNZIONI GLOBALI *********
// **********************************

function wr(testo) {
    if (testo != null) {
        var ris = document.getElementById("risultati");
        var p = document.createElement("p");
        p.innerHTML = testo;
        ris.appendChild(p);
    }
}

function calcolaCostoOrario(prezzoAcquisto, durataAnni) {
    return (prezzoAcquisto / (durataAnni * 8760)).toFixed(2);
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
        return this.getNome() + " | " + this.getCostoStringa();
    }
}

class Compito extends Elemento {
    constructor(nome, strumenti, durata) {
        super(nome);
        this.strumenti = strumenti;
        this.durata = durata;
        this.costo = this.getCalcoloCosto();
    }

    getCalcoloCosto() {
        var ris = 0;
        for (var c = 0; c < this.strumenti.length; c++) {
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
        var descr = "<strong>" + this.getNome() + "</strong>" + "<br>" + "<i>";
        descr += "Strumenti: <br>";
        for (var c = 0; c < this.strumenti.length; c++) {
            descr += " - " + this.strumenti[c].getNome() + " | " + this.strumenti[c].getCostoStringa() + "<br>";
        }
        descr += "Durata: " + this.getDurata() + " h<br>";
        descr += "Costo Totale: € " + this.getCosto().toFixed(2) + "</i>";
        return descr;
    }
}

class Lavorazione extends Elemento {
    constructor(nome, compiti) {
        super(nome);
        this.compiti = compiti;
        this.costo = this.getCalcoloCosto();
        this.durata = this.getCalcoloDurata();
    }

    getCalcoloCosto() {
        var ris = 0;
        for (var cc = 0; cc < this.compiti.length; cc++) {
            for (var cs = 0; cs < this.compiti[cc].strumenti.length; cs++) {
                ris += this.compiti[cc].strumenti[cs].getCosto() * this.compiti[cc].durata;
            }
        }
        return ris;
    }

    getCalcoloDurata() {
        var ris = 0;
        for (var cc = 0; cc < this.compiti.length; cc++) {
            ris += this.compiti[cc].durata;
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
        var descr = "<strong>" + this.getNome() + "</strong>" + "<br>" + "<i>";
        descr += "Compiti: <br>";

        for (var cc = 0; cc < this.compiti.length; cc++) {
            descr += " + " + this.compiti[cc].getNome() + " | Durata: " + this.compiti[cc].getDurata() + " h | Costo: € " + this.compiti[cc].getCosto().toFixed(2) + "<br>";
            for (var cs = 0; cs < this.compiti[cc].strumenti.length; cs++) {
                descr += " -- " + this.compiti[cc].strumenti[cs].getNome() + " | Costo compito: € " + (this.compiti[cc].strumenti[cs].getCosto() * this.compiti[cc].getDurata()).toFixed(2) + "<br>";
            }
        }

        descr += "<br>";
        descr += "Durata Totale: " + this.getDurata() + " h<br>";
        descr += "Costo Totale: € " + this.getCosto().toFixed(2) + "</i>";
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

var pala = new Strumento("Pala", calcolaCostoOrario(100, 1));
var camion = new Strumento("Camion", calcolaCostoOrario(30000, 5));

var scavo = new Compito("Scavo", [manovale, pala], 100);
var trasporto = new Compito("Trasporto", [autista, camion], 3);

var fondazione = new Lavorazione("Fondazione", [scavo, trasporto]);

wr(fondazione.getDescrizione());