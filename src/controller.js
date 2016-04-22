const editingMode = { rect: 0, line: 1 };

class Pencil {
	constructor(ctx, drawing, canvas) {
		this.ctx = ctx;
		this.drawing = drawing;
		this.canvas = canvas;
		this.currEditingMode = editingMode.line;
		this.currLineWidth = 5;
		this.currColour = '#000000';
		this.currentShapeDefined = false;
		new DnD(canvas, this);

        // Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.
        $("#butRect").click(() => {
        	this.currEditingMode = editingMode.rect;
        });
        
        $("#butLine").click(() => {
        	this.currEditingMode = editingMode.line;
        });

        $("#spinnerWidth").change(() => {
        	this.currLineWidth = $(this).val();
        });

        $("#colour").change(() => {
        	this.currColour = $("#colour").val();
        });
    }


	// Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd
	onInteractionStart(DnD){
		if(this.currEditingMode == editingMode.line){
			this.currentShape = new Ligne(DnD.start[0], DnD.start[1], DnD.start[0], DnD.start[1], this.currLineWidth, this.currColour);
		}
		else if(this.currEditingMode == editingMode.rect){
			this.currentShape = new Rectangle(DnD.start[0], DnD.start[1], 0, 0, this.currLineWidth, this.currColour);
		}
		this.currentShapeDefined = true;
		this.drawing.addForme(this.currentShape);
	}

	onInteractionUpdate(DnD){
		if(this.currentShapeDefined){
			if(this.currEditingMode == editingMode.line){
				this.currentShape.pos2[0] = DnD.current[0];
				this.currentShape.pos2[1] = DnD.current[1];
			}
			else if(this.currEditingMode == editingMode.rect){
				this.currentShape.longueur = DnD.current[0] - this.currentShape.pos[0];
				this.currentShape.hauteur = DnD.current[1] - this.currentShape.pos[1];
			}
			this.drawing.paint(this.ctx, this.canvas);
		}
	}

	onInteractionEnd(DnD){
		if(this.currEditingMode == editingMode.line){
			this.currentShape.pos2[0] = DnD.end[0];
			this.currentShape.pos2[1] = DnD.end[1];

		}
		else if(this.currEditingMode == editingMode.rect){
			this.currentShape.longueur = DnD.end[0] - this.currentShape.pos[0];
			this.currentShape.hauteur = DnD.end[1] - this.currentShape.pos[1];
		}
		this.currentShapeDefined = false;
		this.drawing.paint(this.ctx, this.canvas);
	}
}