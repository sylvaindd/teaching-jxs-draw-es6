
// Implémenter ici les 4 classes du modèle.
// N'oubliez pas l'héritage !

class Forme{

    constructor(epaisseur, couleur) {
        this.epaisseur = epaisseur | 1;
        this.couleur = couleur;
    }

}

class Formes{

    constructor() {
        this.formes = new Array();
        this.addForme = this.addForme.bind(this);
    }

    addForme(forme){
        this.formes.push(forme);
        this.updateList(forme);
    }

}

class Ligne extends Forme{

    constructor(pos1x, pos1y, pos2x, pos2y, epaisseur, couleur) {
        super(epaisseur, couleur);
        this.pos1 = new Array();
        this.pos1[0] = pos1x;
        this.pos1[1] = pos1y;
        this.pos2 = new Array();
        this.pos2[0] = pos2x;
        this.pos2[1] = pos2y;
    }
}

class Rectangle extends Forme{

    constructor(posx, posy, longueur, hauteur, epaisseur, couleur) {
        super(epaisseur, couleur);
        this.pos = new Array();
        this.pos[0] = posx;
        this.pos[1] = posy;
        this.longueur = longueur;
        this.hauteur = hauteur;
    }

}

class Croix extends Forme{

    constructor(longueur, hauteur, epaisseur, couleur) {
        super(epaisseur, couleur);
        this.longueur = longueur;
        this.hauteur = hauteur;
    }
}

class Cercle extends Forme{

    constructor(longueur, epaisseur, couleur) {
        super(epaisseur, couleur);
        this.longueur = longueur | 1;
    }
}