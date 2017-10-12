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

function calcolaCostoOrario(prezzoAcquisto, durataAnni, tassoUtilizzo) {
    return (prezzoAcquisto / (durataAnni * 8760 * tassoUtilizzo)).toFixed(2);
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

class Materiale extends Elemento {
    constructor(nome, costo) {
        super(nome);
        this.costo = parseFloat(costo);
    }

    getCosto() {
        return this.costo;
    }

    getCostoStringa() {
        return "€ " + this.costo.toFixed(2);
    }

    getDescrizione() {
        return this.getNome() + " | " + this.getCostoStringa();
    }
}

class QuantitaMateriale extends Elemento {
    constructor(nome, materiale, quantita) {
        super(nome);
        this.materiale = materiale;
        this.quantita = parseFloat(quantita);
        this.costo = this.getCalcolaCosto();
    }

    getCalcolaCosto() {
        return this.materiale.costo * this.quantita;
    }

    getCosto() {
        return this.costo;
    }

    getCostoStringa() {
        return "€ " + this.costo.toFixed(2);
    }

    getDescrizione() {
        return this.getNome() + " | " + this.getCostoStringa();
    }
}

class Compito extends Elemento {
    constructor(nome, strumenti, durata, listamateriali) {
        super(nome);
        this.strumenti = strumenti;
        this.durata = durata;
        this.listamateriali = listamateriali;
        this.costo = this.getCalcoloCosto();
    }

    getCalcoloCosto() {
        var ris = 0;
        for (var c = 0; c < this.strumenti.length; c++) {
            ris += this.strumenti[c].getCosto() * this.durata;
        }
        for (var c = 0; c < this.listamateriali.length; c++) {
            ris += this.listamateriali[c].getCosto();
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
        descr += "Materiali: <br>";
        for (var c = 0; c < this.listamateriali.length; c++) {
            descr += " - " + this.listamateriali[c].getNome() + " | " + this.listamateriali[c].getCostoStringa() + "<br>";
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
            for (var cm = 0; cm < this.compiti[cc].listamateriali.length; cm++) {
                ris += this.compiti[cc].listamateriali[cm].getCosto();
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
            descr += " + " + this.compiti[cc].getNome() + " | Durata: " + this.compiti[cc].getDurata() + " h | Costo compito: € " + this.compiti[cc].getCosto().toFixed(2) + "<br>";
            for (var cs = 0; cs < this.compiti[cc].strumenti.length; cs++) {
                descr += " -- " + this.compiti[cc].strumenti[cs].getNome() + " | Costo: € " + (this.compiti[cc].strumenti[cs].getCosto() * this.compiti[cc].getDurata()).toFixed(2) + "<br>";
            }
            for (var cm = 0; cm < this.compiti[cc].listamateriali.length; cm++) {
                descr += " -- " + this.compiti[cc].listamateriali[cm].getNome() + " | Costo: € " + this.compiti[cc].listamateriali[cm].getCosto().toFixed(2) + "<br>";
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

var pala = new Strumento("Pala", calcolaCostoOrario(100, 1, 0.3));
var camion = new Strumento("Camion", calcolaCostoOrario(30000, 5, 0.3));

var cemento = new Materiale("Cemento", 5);
var acciaio = new Materiale("Acciaio", 2);
var legno = new Materiale("Legno", 2);
var benzina = new Materiale("Benzina", 1.33);

var benzina10L = new QuantitaMateriale("Benzina 10 L", benzina, 10);
var legno20 = new QuantitaMateriale("Legno 20 mc", legno, 20);
var acciaio100 = new QuantitaMateriale("Tiranti 100 kg", acciaio, 100);

var scavo = new Compito("Scavo", [manovale, pala], 100, [legno20, acciaio100]);
var trasporto = new Compito("Trasporto", [autista, camion], 3, [benzina10L]);

var fondazione = new Lavorazione("Fondazione", [scavo, trasporto]);

wr(fondazione.getDescrizione());