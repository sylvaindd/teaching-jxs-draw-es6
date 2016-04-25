
// Implémenter ici les fonctions paint à ajouter dans chacune des classes du modèle.

$("#buttonRainbow").click(function () {
	clear(addRainbow);
});

var addRainbow = function(){
	var colors = ["#78dbe9", "#00e5a5", "#24e340", "#5ee33c", "#a3e444", "#cde539", "#e9db3a", "#e9ca39", "#eaa43e", "#eb7d42", "#eb4d3a", "#eb3e62", "#eb3c8e", "#eb47b9", "#eb51d0", "#d950e9", "#b84ee9", "#814ae9", "#5046e9", "#3866e9", "#3392e9", "#42b6e9", "#40d3e9"];
	var separator = 10;
	$.each(colors, function (k, v) {
		drawing.addForme(new Rectangle(5 + k * separator, 5 + k * separator, canvas.width - (5 + k * separator) * 2, canvas.height - (5 + k * separator) * 2, 5, colors[k]));
	});

	drawing.paint(ctx, canvas);
    $("#shapeListUl").slideDown(300);
}

$("#buttonClear").click(function(){
   clear();
   drawing.paint(ctx, canvas);
});

var clear = function(callback){
    drawing.clear();
    $("#shapeListUl").slideUp(300, function() {
        $(this).find("li").remove();
        if(callback != null)
		  callback();
        else
            $(this).show();
    });
}

Forme.prototype.paint = function(ctx){
	ctx.lineWidth = this.epaisseur;
	ctx.strokeStyle = this.couleur;
}

Formes.prototype.updateList = function(forme){
	var li;
    var type;
	if(forme instanceof Ligne){
        type = "Ligne";
	}else{
        type = "Rectangle";
	}
    li = $("<li style='color:"+forme.couleur+";'>"+type+"  <i class='fa fa-remove' /></li>");
    $("#shapeListUl").append(li);
    li.find("i").on("click", () => {
		drawing.formes.splice(this.formes.indexOf(forme), 1);
		li.slideUp(300, function() {
            li.remove();
        });
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
