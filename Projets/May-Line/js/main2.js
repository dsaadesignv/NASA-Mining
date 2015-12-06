/* ------------------------

PROGRAMMATION DE LA MAP

---------------------------*/


function map(n, start1, stop1, start2, stop2) {
 	return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
};


var carte = L.map('map').setView([51.505, -0.09], 5);


/* ------------------------

PROGRAMMATION DES METEORITES 

---------------------------*/


var meteorsLoaded = false,
	meteors = [],
	selectedMeteors = [],
	massMax;

var imgs = [
	'data/pyramide.png',
	'data/cube.png',
	'data/hexa.png',
	'data/penta.png'
];  



// QUAND LE DOC EST PRES : CHARGEMENT DU JSON
/*les données du fichiers JSON sont récupérées et appelées "result"
  1 météorite = selectedMeteors*/

$(document).ready(function(){

	// CHEMIN ABSOLU VERS LE JSON
	$.getJSON('data/meteors.json').done(function(result){
			
			// BOUCLE
			for(var i=0;i<300;i++){
				meteors.push( result[i] );
			}

			meteors.forEach(function(m,i){
				m.index = i;
			});

			selectedMeteors = meteors;
			meteorsLoaded = true;

			displayMeteors();
		})
		.error(function(error){
			console.log("fail");
		});

	$("#mass").on('change', function(e){
		displayMeteors();
	});
});


/* ------------------------

CREATION DES METEORITES 

---------------------------*/



function displayMeteors(){
	
	// MODIFICATION DU ZOOM
	var zoom = carte.getZoom();
	var center = carte.getCenter();
	carte.remove();
	carte = L.map('map').setView(center, zoom);

	// AFFICHAGE DES METEORITES SELECTIONNEES APRES CHAQUE ACTION ZOOM
	carte.on('zoomend', function(){
		displayMeteors();
	});

	// AFFICHE DE LA MAP APPELEE "CARTE"
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(carte);

	// ETABLISSEMENT DE LA FONCTION DU ~ SLIDER
	// ON APPELLE MASSMAX LA VALEUR LA PLUS HAUTE DU SLIDER
	massMax = $('#mass')[0].valueAsNumber;

	// QUAND MASSMAX ATTEINT LE MAXIMUM ON AFFICHE TOUTES LES METEORITES SELECTIONNEES
	if(massMax == 3000000){
		selectedMeteors = meteors;
	}

	// SINON ON AFFICHE LES METEORITES DONT LA MASSE EST INFERIEURE OU EGALE A LA VALEUR SELECTIONNEE 
	else{
		selectedMeteors = meteors.filter(function(meteor){
			return meteor.mass <= massMax;
		});
	}

	// ON AFFICHE SUR LA CONSOLE LA VALEUR DE LA METEORITE-1
	console.log( selectedMeteors[selectedMeteors.length-1 ]);



	/*   CE QUI SE PASSE QUAND LES METEORITES SONT CHARGEES   */

	if(meteorsLoaded){

		// PROGRAMMATION DU ZOOM
		var scale = map( carte.getZoom(), 0, 17, 0.1, 3.5);


		for( var i=0; i<selectedMeteors.length; i=i+1){
			var meteoriteIcon = L.icon({
				
				// SELECTION DE L'IMAGE
				iconUrl: imgs[ selectedMeteors[i].index%imgs.length ],

				// TAILLE DE L'IMAGE
				iconSize: [selectedMeteors[i].mass/10000, selectedMeteors[i].mass/10000],

				// POINT DE L'IMAGE A PLACER SELON LES COORDONNEES
				iconAnchor: [selectedMeteors[i].mass/10000/2, selectedMeteors[i].mass/10000/2],

				// POINT DE L'IMAGE A PARTIR DUQUEL LE POP UP S'OUVRE
				popupAnchor: [0, 0]
			});
			
				// PLACEMENT DE L'IMAGE 
				/*au point x=reclat, y=reclong du JSON
				sur la carte
				et ouverture d'un popup avec le nom, le poids et l'année de chute de la meteorite*/
				L.marker( [selectedMeteors[i].reclat, selectedMeteors[i].reclong], {icon: meteoriteIcon} )
					.addTo(carte)
					.bindPopup(selectedMeteors[i].name+", <br>"+ selectedMeteors[i].mass +"g, <br>"+selectedMeteors[i].year);
		}
	}
}



/* ------------------------

CREATION DU BOUTON 

---------------------------*/



function ClicBouton(){ 
    alert("All blue areas are not for you. These are meteors impact. So, you should avoid those places."); 
};

//la fonction "alert" fait ouvrir un popup au clic, contenant le texte entre ""