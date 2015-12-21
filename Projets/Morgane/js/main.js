// Mes variables
var jsonData, moods;
var title;
var artist;
var mission;
var enth, patr, comb, fest, mela, ener, cont, epiq;
var missionArtists;
var genres;
var mood;
var tabListMission = [];



// Chargement des motifs
function preload() {

  enth = loadImage('img/enth.png');
  patr = loadImage('img/patr.png');
  comb = loadImage('img/comb.png');
  fest = loadImage('img/fest.png');
  
  var randomImage = Math.floor( Math.random() * 3) + 1; // choix aléatoire entre les 3 images différentes pour une humeur
  mela = loadImage('img/mela'+randomImage+'.png');
  
  randomImage = Math.floor( Math.random() * 3) + 1; // choix aléatoire entre les 3 images différentes pour une humeur
  ener = loadImage('img/ener'+randomImage+'.png');
  
  randomImage = Math.floor( Math.random() * 3) + 1; // choix aléatoire entre les 3 images différentes pour une humeur
  cont = loadImage('img/cont'+randomImage+'.png');
  
  randomImage = Math.floor( Math.random() * 3) + 1; // choix aléatoire entre les 3 images différentes pour une humeur
  epiq = loadImage('img/epiq'+randomImage+'.png');
}


//load jsonData
$(document).ready(function() {
	// Chargement des données des missions
	$.getJSON("json/DATAWakeUpCalls-V1.json").done( function( data ){
		jsonData = data;
		// console.log( jsonData );

		// Création d'un tableau des missions uniques
		for (var i = 0; i < jsonData.length; i++) {
			var missionExists = false;
			for(var j=0;j<tabListMission.length; j++){
				if( tabListMission[j] == jsonData[i].mission ) missionExists = true;
			}
			if( missionExists == false ) tabListMission.push( jsonData[i].mission );
		}

		// add tablistMission Menu
		var menu = document.getElementById('missionSelector');
		for(var k=0;k<tabListMission.length; k++){
			menu.innerHTML += '<li><a class="missionItem" href="#' + tabListMission[ k ] + '">' + tabListMission[ k ] + '</a></li>';
		}

		$('.missionItem').click( function( e ){
			$("h2").html( $(this).html() );      // Titre de la mission en h2
			clear();
			getArtistsByMission( $(this).html() );
		});
	});

	// Chargement des données des humeurs

	$.getJSON("json/TABgenres.json").done( function( data ){
		moods = data;
		console.log( moods );
	});
});

  
// Renvoie le tableau d'artistes par mission
function getArtistsByMission( mission ){

	var missionArtists = [];
	for(track in jsonData) {
		if( jsonData[ track ].mission === mission ) {
			if( jsonData[ track ].artist != 0 ) missionArtists.push( jsonData[ track ].artist );
		}
	}

	console.log( missionArtists );

	for( artist in missionArtists ) {
		if(missionArtists[artist] != 0) {
			getGenreByArtist(missionArtists[artist]);
		}
	}
}

// Récupère le genre musical en fonction du nom de l'artiste
function getGenreByArtist( artist ){
	$.ajax({
		url:'http://developer.echonest.com/api/v4/artist/search?api_key=4DPQCMYZ8YZF3N0AF&format=json&name=' + artist + '&results=1&bucket=genre',
		async:false,
		jsonDataType:'json',
		success:function( data ){
			var artistGenres = [];
			var genreList = data.response.artists[ 0 ].genres;

			for( genreItem in genreList ) {
				artistGenres.push( genreList[ genreItem ].name );
			}

			if( artistGenres.length > 0 ){
				console.log( artistGenres );
				getMoodByGenre( artistGenres );
			}
			else console.log( "no genre found for", artist )
		}
	});
}


// Récupère l'humeur en fonction d'un genre
function getMoodByGenre( genres ){
	var mood = 'not found';

	for( var genreItem in genres ) {
		// console.log( genres[ genreItem ] );

		for ( var moodItem in moods ) {    // pour chaque humeur...
			var tabGenres = moods[ moodItem ];   // ...créer un tableau du contenu de "humeur"
			// console.log( tabGenres );

			for ( var i = 0; i < tabGenres.length; i ++ ) {
				if(genres[ genreItem ] == tabGenres[ i ]) {   // si le genre correspond à l'un des genres du tableau
					mood = moodItem;    // afficher le mood du tableau correspondant
				}
			}
		}
	}
	if( mood != 'not found' ) drawImage( mood );
	else console.log( 'mood not found' );
}


// Afficher l'image correspondant à l'humeur (je n'ai pas réussi à faire fonctionner le postionnement aléatoire.)

var x;
var y;

function drawImage(mood) { 
	// console.log( "drawImage", mood );
	switch(mood) {            
		case "enthousiaste":
			image(enth, x+random(-width/2,width/2), y + random(-height/2,height/2));
			break;

		case "patriotique":
			image(patr, x+random(-width/2,width/2), y + random(-height/2,height/2));
			break;

		case "combatif":
			image(comb, x+random(-width/2,width/2), y + random(-height/2,height/2));
			break;

		case "festif":
			image(fest, x+random(-width/2,width/2), y + random(-height/2,height/2));
			break;

		case "melancolique":
			image(mela, x+random(-width/2,width/2), y + random(-height/2,height/2));
			break;

		case "energique":
			image(ener, x+random(-width/2,width/2), y + random(-height/2,height/2));
			break;

		case "contemplatif":
			image(cont, x+random(-width/2,width/2), y + random(-height/2,height/2));
			break;

		case "epique":
			image(epiq, x+random(-width/2,width/2), y + random(-height/2,height/2));
			break;
	}
}

// Ce que je n'ai pas pu faire par manque de temps : 
// - Réorganiser l'ordre des images pour que les motifs à formes pleines passent en arrière-plan, dessous les autres motifs (enthousiaste, patriotique, combatif, festif).
// - Rendre cliquable les motifs pour donner le détail : nom de l'humeur, infos sur les titres associés à chaque humeur, commentaires.
// - Créer et lire la playlist de la mission (ou à défaut le premier titre)


function setup(){
	createCanvas( windowWidth - 20, 400 );
	x = width/2;
	y = height/2;
	imageMode( CENTER );
}

function draw(){
	// clear();
	// ellipse(mouseX,mouseY,50,50);
	noLoop();
}
