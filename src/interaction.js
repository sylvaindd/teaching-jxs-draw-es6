
// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
class DnD {
    constructor(canvas, interactor) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.interactor = interactor;

        this.start = new Array();
        this.start[0] = 0;
        this.start[1] = 0;
        this.end = new Array();
        this.end[0] = 0;
        this.end[1] = 0;
        this.current = new Array();
        this.current[0] = 0;
        this.current[1] = 0;
        // Définir ici les attributs de la classe

        // Associer les évènements du canvas aux fonctions ci-dessous.

        // this.croix = new Croix(60, 60, 5, "#0000ff");
        // this.cercle = new Cercle(30, 5, "#ff3300");

        $(canvas).mousedown(this.mouseDown.bind(this));
        $(canvas).mousemove(this.mouseMove.bind(this));
        $(canvas).mouseup(this.mouseUp.bind(this));
    }

    mouseDown(evt){
        this.start[0] = evt.offsetX;
        this.start[1] = evt.offsetY;
        this.clickDown = true;
        // switch (evt.which) {
        //     case 1:
        //         this.croix.paint(this.canvas.getContext('2d'), this.start[0], this.start[1]);
        //         break;
        //     case 3:
        //         this.cercle.paint(this.canvas.getContext('2d'), this.start[0], this.start[1]);
        //         break;
        // }
        this.interactor.onInteractionStart(this);
        console.log("Mouse down : x - " + this.start[0] + " y - " + this.start[1]);
    }

    mouseMove(evt){
        this.current[0] = evt.offsetX;
        this.current[1] = evt.offsetY;
        this.interactor.onInteractionUpdate(this);
      //console.log("Mouse move : x - " + evt.offsetX + " y - " + evt.offsetY);
    }

    mouseUp(evt){
        this.end[0] = evt.offsetX;
        this.end[1] = evt.offsetY;
        this.interactor.onInteractionEnd(this);
        console.log("Mouse up : x - " + this.end[0] + " y - " + this.end[1]);
    }
}



// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}



