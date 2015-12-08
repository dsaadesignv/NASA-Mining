var myCanvas;
var meteors = [];
var meteorsLoaded = false;
var image;
var nbMeteorsSelected = 0, id1 = 999, id2 = 999;
var meteorWidth = 151;
var meteorHeight = 151;
var marge =52;
var nbMeteorX = 6;
var nbMeteorY = 3;

var carte = L.map('map').setView([51.505, -0.09], 2);

$(document).ready (function(){
	console.log( "ready" );
	// Relier avec la carte Leaflet
	L.tileLayer( 'http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	} ).addTo( carte );

	$.getJSON( "data/meteors.json" ).done(function( result ){
		console.log( "nb meteors:", result.length );

		//Créer des Meteors et les ajouter au tableau, les afficher 
		for (var i = 0; i < nbMeteorX * nbMeteorY / 2; i++) {
			var data = result[ Math.floor( Math.random() * result.length ) ];
			console.log( data );
			if( data.nom ){
				var meteor = new Meteor( data );
				//console.log( meteor );
				meteors.push( meteor );

				meteor = new Meteor( data );
				meteors.push( meteor );
			}
			else{
				console.log( "no name in meteor" );
				// retour
				i = i - 1;
			}
		}

		// Aléatoire entre toutes les météorites
		meteors = shuffle( meteors );

		console.log( meteors );
		meteorsLoaded = true;
	}).error(function( e ){
		console.log( e );
	});
} );


function shuffle(o){
	for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
}

// Sélection des données à afficher pour chaque météorite
var Meteor = function( data ){ 
	this.name = data.nom; 
	this.date = data.yea
	this.mass = data.mass;
	this.loc = {
		lat: data.reclat, 
		long: data.reclong
	};
	this.selected = false;
	this.found = false;
}

// Fichiers à charger
function preload(){
	MeteorB = loadImage("data/meteorite-b.png");
	MeteorD = loadImage("data/dos.png");
	drapeauIcon = loadImage("data/drapeau-24.png");
	fontRegular = loadFont ("data/font/FabfeltScript-Bold.otf");
}

// Affichage des Meteor en fonction de x, y
Meteor.prototype.draw = function( x, y ){ 

	push();

	translate( x, y );
	noStroke();
	fill(0,0,0);

	// Si la météorite sélectionnée ne correspond pas à la deuxième sélectionnée : affichage de l'image MeteorV
	if ( this.selected == false  && this.found == false ){ 
		image(MeteorB,0,0);	

	} 
	// Afficher le nom de la météorite lorsque l'on a sélectionné une météorite
	else {

		image(MeteorD,0,0);
		textFont(fontRegular);
		textSize(20);
		textAlign(CENTER);
		fill(255); 
		text( text(this.name,75,75));
	}

	pop();
}

// Création du canvas
function setup(){
	var canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent("canvasDiv");
}

// Afficher les météorites sélectionnées dans le canvas
function draw() {
	background( '#021735' );
	if( meteorsLoaded ){
		for (var i = 0; i < meteors.length; i++) {
			meteors[i].draw( marge + ( i % nbMeteorX ) * (meteorWidth+marge), marge + Math.floor( i / nbMeteorX ) * (meteorHeight + marge) ); 
		}
	}
}

function mousePressed(){
	// Lorsque l'on clique sur 2 météorites et que leurs id ne correspondent pas : false
	if( nbMeteorsSelected == 2 ){ 
		for (var i = 0; i < meteors.length; i++) {
			meteors[i].selected = false;
		};

		nbMeteorsSelected = 0;
		id1 = 999;
		id2 = 999;
	}

	// Cliquer une zone x,y : savoir si la donnée correspond à la zone (de la météorite)
	for (var i = 0; i < meteors.length; i++) {
		if( mouseX > marge + ( i % nbMeteorX ) * (meteorWidth+marge) && mouseX < marge + ( i % nbMeteorX ) * (meteorWidth+marge) + meteorWidth &&
			mouseY > marge + Math.floor( i / nbMeteorX ) * (meteorHeight+marge) && mouseY < marge + Math.floor( i / nbMeteorX ) * (meteorHeight+marge) + meteorHeight ){
			if( meteors[ i ].selected == false ){
				meteors[ i ].selected = true;
				nbMeteorsSelected = nbMeteorsSelected + 1;
				if( nbMeteorsSelected == 1 ) id1 = i;
				else if( nbMeteorsSelected == 2 ) id2 = i;
			}
		}
	}
}

// Lorsque l'on relâche la souris: si les id correspondent : true
function mouseReleased(){
	if( nbMeteorsSelected == 2 && meteors[ id1 ].name == meteors[ id2 ].name ){ 
		meteors[ id1 ].found = true;
		meteors[ id2 ].found = true;

		console.log(
			meteors[ id1 ].loc.long, meteors[ id1 ].loc.lat
			);

		// Remplacement du marker d'origine
		var drapeauIcon = L.icon ({
			iconUrl: 'data/drapeau-24.png', 
			iconSize: [38, 95],
			iconAnchor:   [meteors[ id1 ].loc.lat, meteors[ id1 ].loc.long],
			popupAnchor:  [0,0] 

		});

		// Afficher le popup au clic sur le marker : contenant le nom de la météorite, sa masse et son année de chute
		L.marker ([meteors[ id1 ].loc.lat, meteors[ id1 ].loc.long], {icon: drapeauIcon})
		.addTo(carte)
		.bindPopup( "Name ~ " + meteors[ id1 ].name + "<br>" + "Mass ~ " + meteors[ id1 ].mass + " g " + "<br>" + "Year ~ " + meteors[ id1 ].date);
		
	}
}
