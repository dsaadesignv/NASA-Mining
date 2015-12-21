// Mes variables
var title;
var artist;
var mission;
var enth, patr, comb, fest, mela, ener, cont, epiq;
var tabArtist;
var genres;
var mood;
var tabListMission = [];



// Chargement des motifs
/*function preload() {

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
}*/


// Chargement aléatoire des données dans le fichier de données
$.getJSON("json/DATAWakeUpCalls-V1.json").done( function(tabTrack){
	// Création d'un tableau des missions uniques
	for (var i = 0; i < tabTrack.length; i++) {
		var missionExists = false;
		for(var j=0;j<tabListMission.length; j++){
			if( tabListMission[j] == tabTrack[i].mission ) missionExists = true;
		}
		if( missionExists == false ) tabListMission.push( tabTrack[i].mission );
	};

	// add tablistMission Menu
	var menu = $('.dropdown-menu');
	for(var j=0;j<tabListMission.length; j++){
		$(menu).append();
	}


	var index = Math.floor( Math.random() * tabTrack.length );
	title = tabTrack[ index ].title;
	artist = tabTrack[ index ].artist;
	mission = tabTrack[ index ].mission;

	// Affichage des données textuelles

	$("h2").html( tabTrack[index].mission );      // Titre de la mission en h2

	for (var i = 0; i < tabTrack.length; i++) {
		$("li").html(tabTrack[i].mission);        // Menu déroulant de sélection de la mission (j'ai réussi à afficher une liste mais n'est pas réussi à afficher toutes les missions.)
	};
});

  
// Renvoie le tableau d'artistes par mission
function getArtistByMission(mission){

   $.ajax({
    url:'json/DATAWakeUpCalls-V1.json',
    async:false,
    dataType:'json',
    success:function(tabTrack) {
      
    	console.log("tabTrack:", tabTrack);
	  var tabArtist = [];
      for (track in tabTrack) {
        console.log(tabTrack[track].mission);
        if(tabTrack[track].mission === mission) {
          console.log(tabTrack[track].artist); 
          tabArtist.push(tabTrack[track].artist);
        }
      }

	  console.log(tabArtist);
	  
	  for( artist in tabArtist ) {
	    if(tabArtist[artist] != 0) {
	      getGenreByArtist(tabArtist[artist]);
	    }
	  }
    }
  });
}



// Récupère le genre musical en fonction du nom de l'artiste
function getGenreByArtist(artist){
  $.ajax({
    url:'http://developer.echonest.com/api/v4/artist/search?api_key=4DPQCMYZ8YZF3N0AF&format=json&name='+artist+'&results=1&bucket=genre',
    async:false,
    dataType:'json',
    success:function(data){
      
	  var genre = [];
      var genreList = data.response.artists[0].genres;
      for (genreItem in genreList) {
        genre.push(genreList[genreItem].name);
      }
      console.log(genre);
      getMoodByGenre(genre);

    }
  });

}


// Récupère l'humeur en fonction d'un genre
function getMoodByGenre(genres){
  var mood = 'not found';
// inverser la fonction asynchrone
  $.ajax({
    url:'json/TABgenres.json',
    async:false,
    dataType:'json',

    success:function(data){
	  var mood;
      for (genreItem in genres) {
        for (var moodItem in data) {    // pour chaque humeur...
          var tabGenres = data[moodItem];   // ...créer un tableau du contenu de "humeur"
          for (var i=0; i<tabGenres.length; i++) {
            if(genres[genreItem] == tabGenres[i]) {   // si le genre correspond à l'un des genres du tableau
              mood = moodItem;    // afficher le mood du tableau correspondant
            }
          }
        }
      }
      drawImage(mood);
    }
      
  });
}


// Afficher l'image correspondant à l'humeur (je n'ai pas réussi à faire fonctionner le postionnement aléatoire.)

var x;
var y;

function drawImage(mood) {  

  switch(mood) {            

      case "enthousiaste":
      image(enth, x+random(-300,300), y + random(-300,300));
      break;
     
      case "patriotique":
        image(patr, x+random(-300,300), y + random(-300,300));
      break;
      
      case "combatif":
        image(comb, x+random(-300,300), y + random(-300,300));
      break;
      
      case "festif":
        image(fest, x+random(-300,300), y + random(-300,300));
      break;
      
      case "melancolique":
        image(mela, x+random(-300,300), y + random(-300,300));
      break;
      
      case "energique":
        image(ener, x+random(-300,300), y + random(-300,300));
      break;
      
      case "contemplatif":
        image(cont, x+random(-300,300), y + random(-300,300));
      break;
     
      case "epique":
        image(epiq, x+random(-300,300), y + random(-300,300));
      break;
      
    }
    
  }

// Ce que je n'ai pas pu faire par manque de temps : 
// - Réorganiser l'ordre des images pour que les motifs à formes pleines passent en arrière-plan, dessous les autres motifs (enthousiaste, patriotique, combatif, festif).
// - Rendre cliquable les motifs pour donner le détail : nom de l'humeur, infos sur les titres associés à chaque humeur, commentaires.
// - Créer et lire la playlist de la mission (ou à défaut le premier titre)


function setup(){
	createCanvas( 400,400 );
	x = random(300,width-300);
	y = random(300,width-300);
    getArtistByMission(mission);
}

function draw(){

  /*

*/
  noLoop();
}
