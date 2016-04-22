
// Implémenter ici les fonctions paint à ajouter dans chacune des classes du modèle.

Forme.prototype.paint = function(ctx){
	ctx.lineWidth = this.epaisseur;
	ctx.strokeStyle = this.couleur;
}

Formes.prototype.updateList = function(forme){
	var li;
	if(forme instanceof Ligne){
		li = "<li data-index='"+this.formes.indexOf(forme)+"' style='color:"+forme.couleur+"'>Ligne  <i class='fa fa-remove' /></li>";
		$("#shapeList ul").append(li);
	}else{
		li = "<li data-index='"+this.formes.indexOf(forme)+"' style='color:"+forme.couleur+"'>Rectangle  <i class='fa fa-remove' /></li>";
		$("#shapeList ul").append(li);
	}
	li.on("click", function(){
		drawing.splice($(this).parent("li").data("index"), 1);
		$(this).parent("li").remove();
		drawing.paint(ctx, canvas);
	});
}

Formes.prototype.paint = function(ctx, canvas){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = '#F0F0F0'; // set canvas' background color
	ctx.fillRect(0, 0, canvas.width, canvas.height);  // now fill the canvas
	$.each(this.formes,function (key,val){
		val.paint(ctx);
	});
}

Ligne.prototype.paint = function(ctx){
	Forme.prototype.paint.call(this, ctx);
	ctx.beginPath();
	ctx.moveTo(this.pos1[0], this.pos1[1]);
	ctx.lineTo(this.pos2[0], this.pos2[1]);
	ctx.stroke();
}

Rectangle.prototype.paint = function(ctx){
	Forme.prototype.paint.call(this, ctx);
	ctx.beginPath();
	ctx.rect(this.pos[0], this.pos[1], this.longueur, this.hauteur);
	ctx.stroke();
}


Croix.prototype.paint = function(ctx, posx, posy){
	Forme.prototype.paint.call(this, ctx);

	ctx.beginPath();
	ctx.moveTo(posx - this.longueur / 2, posy - this.hauteur / 2);
	ctx.lineTo(posx + this.longueur / 2, posy + this.hauteur / 2);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(posx - this.longueur / 2, posy + this.hauteur / 2);
	ctx.lineTo(posx + this.longueur / 2, posy - this.hauteur / 2);
	ctx.stroke();
}

Cercle.prototype.paint = function(ctx, posx, posy){
	Forme.prototype.paint.call(this, ctx);

	ctx.beginPath();
	ctx.arc(posx, posy, this.longueur, 0, 2*Math.PI);
	ctx.stroke();
}
