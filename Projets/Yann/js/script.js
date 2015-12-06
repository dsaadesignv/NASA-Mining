var InfoNEO;
$(document).ready(function(){
	$.getJSON("https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=ZkV6Mh7StjPaqFrsr7wFpdGnhafXElhJLEHVw9Xf&format=JSON").done(function(data){
		var NEO = data.near_earth_objects; // NEO est composé des données de l'objet near_earth_objects à l'intérieur de data(toutes les données)
		InfoNEO = data.near_earth_objects;
		console.log(NEO);
		console.log("longueur",NEO.length);	//on affiche le nombre d'élément dans le tableau NEO
		for (var i = 0; i < NEO.length; i++) {
			//a partir de là on positionne les asteroïdes
			var nbElmntsX = 3; //le nombre d'élément en X
			asteroides.push( //on met dans un tableau les positions des astéroïdes
				new Asteroide( //on crée un nouvel objet qui s'appelle Asteroide
				1300+((i%nbElmntsX)*VisuelAsteroid.width), //on positionne l'objet sur X en fonction de la largeur de l'image et du nombre d'élément qu'on veut sur la ligne
				// % est le modulo (reste d'une division)
				100+( Math.floor(i/nbElmntsX)*VisuelAsteroid.height)) ); //on positionne l'objet sur y en fonction de la hauteur et du nombre d'élément que l'on veut sur la colonne
				// Avec Math.floor on prend le résultat entier de l'opération
			asteroidesInit.push(
				new Asteroide(
					1300+((i%nbElmntsX)*VisuelAsteroid.width),100+( Math.floor(i/nbElmntsX)*VisuelAsteroid.height)) );
		}
		asteroidLoaded = true; // ici on dit que tous les astéroides ont été chargé
	})
});

var VisuelAsteroid, fond, machine;
var asteroidLoaded = false;
var asteroides = []; //on crée un tableau
var asteroidesInit = [];
var selectedAsteroide = 9999; // on dit que l'astéroide sélectionné est le numéro 9999 pour ne pas sélectionner un asteroide qui existe
var opaciteFond = 0;
var clicInfoAsteroid=0;
var ConditionAppuyerSouris = 0;
var QuelleImageAfficher = 0;
var timer;


function preload(){ //on précharge les images
	VisuelAsteroid = loadImage("assets/asteroide.png");
	fond = loadImage("assets/machine_nasa00.png");	
	machine = loadImage("assets/machine_nasa01.png");
	GrandBolt = loadImage("assets/grandUsainBolt.png");
	GrandHyperion = loadImage("assets/grandArbreHyperion.png");
	GrandConcorde = loadImage("assets/grandAvionConcorde.png");
	GrandTGV = loadImage("assets/grandTrainTGV.png");
}

function setup(){
	createCanvas(windowWidth, windowHeight); //le canvas prend toute la page du document
}


function draw(){
    image(fond, 0, 0);
    if( asteroidLoaded ){ 
    	for( var i = 0; i < asteroides.length; i++){
    		image(VisuelAsteroid, asteroides[i].x, asteroides[i].y); // boucle for pour afficher les images d'astéroïdes en fonction de la longueur du tableau qui contient les positions des astéroides.

    	}
    }
//on charge machine après VisuelAsteroid pour que machine soit au dessus
	AfficherImageFonctionChiffre();
    fill(255, 255, 255,opaciteFond);
	rect(0, 0, width, height);
//la zone pour déposer les asteroïdes	
	noFill();
	noStroke();
	rect(741,181,171,80);

// Afficher l'image finale 
	if( AutoriserAffichageImageFinale == 1 ){ 
    	for( var i = 0; i < TableauPositionImageFinal.length; i++){
    		opaciteFond = 200;
    		image(VisuelFinal,TableauPositionImageFinal[i].x,TableauPositionImageFinal[i].y,150,HauteurFinaleImage);
    		QuelleImageAfficher = 0;
    		ConditionAppuyerSouris = 1;
    		clicInfoAsteroid = 1;
/*    			$("#NomAsteroidetextedonnee").html(InfoNEO[selectedAsteroide].name);
				$("#mouvementtextedonnee").html(Mouvementdonnee);
				$("#Nombredonnee").html(ResultatCalcul);
				$("#plusquoi").html(plusquequoi);
				$("#quequiouquoi").html("que");
				console.log(InfoNEO[selectedAsteroide].name);*/
    	}
    }
}


function mousePressed(){
	for( var i = 0; i < asteroides.length; i++){
		if(dist(mouseX, mouseY,asteroides[i].x+VisuelAsteroid.width/2, asteroides[i].y+VisuelAsteroid.width/2)<VisuelAsteroid.width/2 ){ //on essaie de voir si la souris est positionné à l'intérieur d'une des images d'astéroides
			selectedAsteroide = i; //ici i est le numéro d'un des astéroides dans le tableau ou il y a tous les astéroides
		}
	}
}

function mouseDragged(){
	if(selectedAsteroide != 9999 && ConditionAppuyerSouris < 1){ // != différent de 
		asteroides[selectedAsteroide].x = mouseX-VisuelAsteroid.width/2;
		asteroides[selectedAsteroide].y = mouseY-VisuelAsteroid.width/2;
	} else {

	}
}

// var Mouvementdonnee = "";
// var plusquequoi = "";
// var NomComparatif ="";
function mouseReleased(){
	var CompteurImageQuandRelease = 0;
	selectedAsteroide = 9999;
	for( var i = 0; i < asteroides.length; i++){
		if (asteroides[i].x+VisuelAsteroid.width/2>741 && asteroides[i].x+VisuelAsteroid.width/2< (741+171) &&  asteroides[i].y+VisuelAsteroid.width/2> 181 &&  asteroides[i].y+VisuelAsteroid.width/2< (181+80)){
			selectedAsteroide = i;
			clicInfoAsteroid=1;
			ConditionAppuyerSouris = 0
			asteroides[i].x = asteroidesInit[i].x; //on remet l'asteroide dans sa position initiale en x
			asteroides[i].y = asteroidesInit[i].y; //on remet l'asteroide dans sa position initiale en y
			timer = setInterval(function(){
				if(CompteurImageQuandRelease>=8){     // crée un interval jusquà 8 pour afficher 8 fois une images différente
					clearInterval(timer);
					ResultatCalcul = DonneeAsteroidePourCalcul / DonneeTerrestePourCalcul;
					PositionImageFinale();
				}
				else{
					CompteurImageQuandRelease++;
					ImageAleatoire();
				}
			}, 300);
			break;

			
		} 
	}
}


var Asteroide = function( _x, _y ){ //c'est juste pour définir une fonction qui va permettre de stocker les coordonnées en x et y de l'objet Asteroide
	this.x = _x;
	this.y = _y;
}

var AsteroideSelectedPourCalcul = 9999;
function mouseClicked(){
	if (clicInfoAsteroid == 0) {
		for( var i = 0; i < asteroides.length; i++){
			//dist() permet de calculer la distance entre deux moins
			if(dist(mouseX, mouseY,asteroides[i].x+VisuelAsteroid.width/2, asteroides[i].y+VisuelAsteroid.width/2)<VisuelAsteroid.width/2){ //on essaie de voir si la souris est positionné à l'intérieur d'une des images d'astéroides
				ConditionAppuyerSouris = 1;
				selectedAsteroide = i; //ici i est le numéro d'un des astéroides dans le tableau ou il y a tous les astéroides
				AsteroideSelectedPourCalcul = selectedAsteroide;
				opaciteFond = 200;
				clicInfoAsteroid = 1;
//Ici on affiche les informations relatifs aux asteroides.
				$("h2").css("display","initial");
				$("#NomAsteroide").html("Nom de l'asteroide: ");
				$("#InfoNomAsteroide").html(InfoNEO[selectedAsteroide].name);
				$("#DiametreMax").html("Diamètre Maximum: ");
				$("#InfoDiametreMax").html(InfoNEO[selectedAsteroide].estimated_diameter.kilometers.estimated_diameter_max,"km");
				$("#DiametreMin").html("Diamètre Minimum: ");
				$("#InfoDiametreMin").html(InfoNEO[selectedAsteroide].estimated_diameter.kilometers.estimated_diameter_min,"km");
				$("#DateApproche").html("Approche du: ");
				$("#InfoDateApproche").html(InfoNEO[selectedAsteroide].close_approach_data[0].close_approach_date);
				$("#InfoDistanceProche").html(InfoNEO[selectedAsteroide].close_approach_data[0].miss_distance.kilometers);
				$("#InfoVelocite").html(InfoNEO[selectedAsteroide].close_approach_data[0].relative_velocity.kilometers_per_hour);
			}
		}
	} else if (clicInfoAsteroid > 0){ //si on clique et que l'on est pas dans la zone on affiche plus les informations
			AutoriserAffichageImageFinale = 0;
			opaciteFond = 0;
			clicInfoAsteroid = 0;
			$("h2").css("display","none");
			ConditionAppuyerSouris = 0;
	}
}

//fonction pour compter de manière aleatoire de 1 à 5
function ImageAleatoire(){
	for (var i = 0; i < 2 ; i++) {
		var r = Math.floor(random(1,5));
		QuelleImageAfficher = r;
	}
}



var VitesseUsainBolt = 44.72;
var VitesseTGV = 574.8;
var HauteurHyperion = 0.115 ;
var VitesseConcorde = 2179 ;
var DonneeTerrestePourCalcul = 0;
var DonneeAsteroidePourCalcul = 0;
var ResultatCalcul=0;
var VisuelFinal;
var AutoriserAffichageImageFinale = 0;

function AfficherImageFonctionChiffre(){
		if ( QuelleImageAfficher < 1){
		image(machine, -400, 0);
	}	else if (QuelleImageAfficher==1 ){
			image(GrandBolt,0,0);
			DonneeTerrestePourCalcul = VitesseUsainBolt;
			DonneeAsteroidePourCalcul = InfoNEO[selectedAsteroide].close_approach_data[0].relative_velocity.kilometers_per_hour;
			VisuelFinal = GrandBolt;
			Mouvementdonnee = "se déplace";
			plusquequoi = "plus vite";
			NomComparatif = "Usain Bolt";
	}	else if (QuelleImageAfficher==2 ){
			image(GrandHyperion,0,0);
			DonneeTerrestePourCalcul = HauteurHyperion;
			DonneeAsteroidePourCalcul = InfoNEO[selectedAsteroide].estimated_diameter.kilometers.estimated_diameter_max;
			VisuelFinal = GrandHyperion;
			Mouvementdonnee = "est";
			plusquequoi = "plus grand";
			NomComparatif ="qu'Hyperion";

	}	else if (QuelleImageAfficher==3 ){
			image(GrandConcorde,0,0);
			DonneeTerrestePourCalcul = VitesseConcorde;
			DonneeAsteroidePourCalcul = InfoNEO[selectedAsteroide].close_approach_data[0].relative_velocity.kilometers_per_hour;
			VisuelFinal = GrandConcorde;
			Mouvementdonnee = "se déplace";
			plusquequoi = "plus vite";
			NomComparatif ="le Concorde";
	}	else if (QuelleImageAfficher==4 ){
			image(GrandTGV,0,0);
			DonneeTerrestePourCalcul = VitesseTGV;
			DonneeAsteroidePourCalcul = InfoNEO[selectedAsteroide].close_approach_data[0].relative_velocity.kilometers_per_hour;
			VisuelFinal = GrandTGV;
			plusquequoi = "plus vite";
			Mouvementdonnee = "se déplace";
			NomComparatif ="le TGV";
	}
}


var xfinal = 0;
var yfinal = 0;
var TableauPositionImageFinal = []; // on crée un tableau
var PositionDansTableauPositionImageFinal = function( _xfinal, _yfinal ){ // on crée un objet qui va être définit par deux paramètres
	this.x = _xfinal;
	this.y = _yfinal;
}

function PositionImageFinale(){
	for (var i = 0; i < ResultatCalcul; i++) {
		var Nbcolonne= 7;
		var largeurImageMiniature = 150;
		HauteurFinaleImage= ((largeurImageMiniature*VisuelFinal.height)/VisuelFinal.width);
		console.log(VisuelFinal);

		TableauPositionImageFinal.push( 
				new PositionDansTableauPositionImageFinal( //on crée un objet qui va avoir des coordonnées en x et en y en fonction d'un nombre de colonne et de la largeur de l'image affichée
						xfinal = 100 + ((i%Nbcolonne)*largeurImageMiniature),
						yfinal = 150 + (Math.floor(i/Nbcolonne)*HauteurFinaleImage)
					)
			);

		AutoriserAffichageImageFinale = 1;
	}
}