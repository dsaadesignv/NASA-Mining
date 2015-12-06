var nb = 1;
var date;
 //la précédente image est caché, même si c'est la première requête

$("#soustitres").hide();
$("#soustitres").fadeIn(2000);
$(".flecheD").hide();
$(".flecheG").hide();
$(".flecheD").removeClass("invisible");
$(".flecheG").removeClass("invisible");
$("#retour").hide();


//CHARGE LA PHOTO EN FONCTION DE LA DATE REMPLIE DANS LE FORMULAIRE

$('#validate').on("click",function(){ //on crée le petit formulaire qui répond au nom de validate
	$("#photo").fadeOut(); //on fait disparaître la précédente image de curiosity

	date = document.getElementById("date").value;  //il prend en compte la valeur date, et on en prend la valeur (vu qu'on demande un chiffre)
	getImage(date,nb); //on fait la fonction avec la valeur date
});

function getImage(date,nb){ //la fonction getImage invoque l'API selon la variable DATE, et intègre à l'intérieur la fonction(data)
	$.getJSON("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol="+date+"&api_key=N98tqh7UvnKUFb1HGo2qrT5oFK1LaO5yXf7zEage")
		.done(function(data){
			console.log(data.photos[nb].img_src); //la console affiche l'url de l'image de la key 1 dans photo dans toute la base de données
			
			$("#ladate").html("jour martien n°" + date + " ~ photo n°" + nb); // affiche la date 
			$("#photo")
				.attr("src", data.photos[nb].img_src) //ce qu'est src devient la source de l'image de la photo n°nb dans le jeu de donnée data
				.fadeIn(1000);
			$(".flecheG").fadeIn(1000);
			$(".flecheD").fadeIn(1000);
			$("#spray").removeClass("invisible").addClass("visible");

			console.log(date+"/"+nb);
});
		};

//AFFICHE L'EXPLICATION DE L'APPLICATION SI DISPLAY CACHE // ELSE MET LE DISPLAY EN MODE OUI
$('#titre').on("click",function(){
	if($("#filet1-expli").css("display") =="none"){
		$("#filet1-expli").fadeIn(1000);
	}
	else{
		$("#filet1-expli").fadeOut(20);
	}
});


//FONCTION CHANGEMENT DE PHOTO DE l'API EN FONCTION DU NB ET DES DEUX FLECHES//

$('.flecheD').on("click",function(){ //on crée le petit formulaire qui répond au nom de validate
	nb = nb + 1 ;
 	$("#photo").fadeOut();
	getImage(date,nb); //réappeler la fonction à réafficher l'image en écrasant l'ancienne ?
 //rajouter le fadeout
});

$('.flecheG').on("click",function(){ //on crée le petit formulaire qui répond au nom de validate
	nb = nb - 1 ;
 	$("#photo").fadeOut();
	getImage(date,nb); //réappeler la fonction à réafficher l'image en écrasant l'ancienne ?
});


// QUAND CLICK SUR LE SPRAY, AFFICHE EN GRAND ET PERMET LA PERSONNALISATION

	$("#spray").on("click",function(){
	 	$("#photo").removeClass("curiosity1").addClass("curiosity2");
	 	$("#retour").fadeIn();
	 	$("#retour").fadeIn();
 		$("#retour").removeClass("invisible").addClass("visible");
 	
//cache les deux fleches,le titre, le sous titre,les filets, le spray, le formulaire
	 	$(".flecheD").hide();
		$(".flecheG").hide();
	 	$("#titre").fadeOut();
	 	$("#soustitres").fadeOut();
	 	$(".filet").fadeOut();
	 	$("#spray").fadeOut(); 
	 	$("#date").fadeOut();
	 	$("#validate").fadeOut();
	 	$("#ladate").fadeOut();

//affiche les trois ronds de réglages sprai
	 	$("#rond1").removeClass("invisible");
	 	$("#rond2").removeClass("invisible");
	 	$("#rond3").removeClass("invisible"); 
	 	$("#rond1").fadeIn();
	 	$("#rond2").fadeIn();
	 	$("#rond3").fadeIn(); 
	 });

// QUAND CLICK SUR FLECHE RETOUR DE LAPI, REVIENT AU CHOIX DE LA PHOTO
	
	$("#retourpng").on("click",function(){
	 	$("#photo").removeClass("curiosity2").addClass("curiosity1");
	 	$("#retour").hide();

	 	//Fait réapparaître items  (fleches de navigation, titre, sous titre, formulaire)
		$(".flecheD").fadeIn();
	 	$(".flecheG").fadeIn();
	 	$("#titre").fadeIn();
	 	$("#soustitres").fadeIn();
	 	$(".filet").fadeIn();
	 	$("#spray").fadeIn();
	 	$("#ladate").fadeIn(); 
	 	$("#date").fadeIn();

	 	$("#validate").removeClass("invisible");
	 	$("#validate").fadeIn();

//fait disparaitre les trois ronds de réglages spray
	 	$("#rond1").fadeOut();
	 	$("#rond2").fadeOut();
	 	$("#rond3").fadeOut(); 

//fait disparaitre le rond enclanché (disque1) et le canvas 1
	 	$("#disque1").fadeOut();
	 	$("#outil1").fadeOut();
	 });


// LORSQU'ON APPUIE SUR LE ROND À GAUCHE // PREMIER OUTIL CODE PROCESSING //
//FAIT APPARAITRE LE PREMIER CANVAS

$('#rond1').on("click",function(){
	 	$("#rond1").fadeOut();
	 	$("#disque1").removeClass("invisible");
	 	$("#disque1").fadeIn();
	 	$("#outil1").removeClass("invisible");
	 	$("#outil1").fadeIn();
});

$('#disque1').on("click",function(){
	 	$("#disque1").fadeOut();
	 	$("#rond1").removeClass("invisible");
	 	$("#rond1").fadeIn();
	 	$("#outil1").fadeOut();
});


//PREMIER
//OUTIL
//PERSONNALISATION
//PHOTO

		var canvas;
		var diametre = 30;
		var dd = 1;
		var maxIterations = 30;// that's how fast spraying happens

		function setup() {
		  // On crée le canvas seulement dans le JS, avec les dimensions indiqués
		  canvas = createCanvas(1100, 530);
		  canvas.position(138, 42);
		  canvas.id("outil1").class("invisible"); //On indique que le canvas repond à l'id outil1 et est concerné par la classe invisi
		}

		function draw() {
				  if (mouseIsPressed) {
				    brush () ;
				  }
				
			}

		// function clean () { //ne fonctionne pas du tout, censé nettoyer le canvas en réapposant un background
		// background(255,0,0);
		// }
		  

		//   if (keyIsPressed) {
		//     if (key == ' ') {
		//         clean();
		//       }
		//   }


		function brush () {
		  var width1 = diametre; // that be the width of your brush
		  //
		  var radx;   // Radius
		  var rady;
		  var angle1; // angle
		  var x;      // result
		  var y;
		  //
		  for (var i=0; i < maxIterations; i++) {
		    radx=random(width1);
		    rady=random(width1);
		    angle1= random(359);
		    //
		    x=(radx*cos(radians(angle1)))+mouseX;
		    y=(radx*sin(radians(angle1)))+mouseY;
		    //
		    stroke(random(180,255), random(0,100), 0);
		    strokeWeight(3);
		    line(x, y, x+4, y+4);
		  }


		  if (keyIsPressed) {
		    if (key == '+') {
		        diametre = diametre + 1;
		      }
		  }

		  if (keyIsPressed) {
		    if (key == '-') {
		      if (diametre >= 0) {
		        diametre = diametre - 1;
		      }
		    }
		  }   
		 
		  }

// LORSQU'ON APPUIE SUR LE ROND À GAUCHE AU MILIEU // SECOND OUTIL CODE PROCESSING //
//FAIT APPARAITRE LE SECOND CANVAS // NE MARCHE PAS DU COUP ROND1 MUTÉE DANS L'HTML
// $('#rond2').on("click",function(){
// 	 	$("#rond2").fadeOut();
// 	 	$("#disque2").removeClass("invisible");
// 	 	$("#disque2").fadeIn();
// 	 	$("#outil2").removeClass("invisible");
// 	 	$("#outil2").fadeIn();
// });

// $('#disque2').on("click",function(){
// 	 	$("#disque2").fadeOut();
// 	 	$("#rond2").removeClass("invisible");
// 	 	$("#rond2").fadeIn();
// 	 	$("#outil2").fadeOut();
// });



// SECOND
// OUTIL
// PERSONNALISATION
// PHOTO

// 		var canvas2;
// 		var diametre2 = 30;
// 		var dd2 = 1;
// 		var maxIterations2 = 30;// that's how fast spraying happens

// function setup() {
//   // On crée le canvas seulement dans le JS, avec les dimensions indiqués
//   canvas2 = createCanvas(1100, 530);
//   canvas2.position(138, 42);
//   canvas2.id("outil2").class("invisible"); //On indique que le canvas repond à l'id outil1 et est concerné par la classe invisi
// }

// function draw() {
// 		  if (mouseIsPressed) {
// 		    brush () ;
// 		  }
		
// 	}

// 		function brush () {
// 		  var width2 = diametre2; // that be the width of your brush
// 		  //
// 		  var radx2;   // Radius
// 		  var rady2;
// 		  var angle2; // angle
// 		  var x2;      // result
// 		  var y2;
// 		  //
// 		  for (var j=0; j < maxIterations; j++) {
// 		    radx2=random(width2);
// 		    rady2=random(width2);
// 		    angle2= random(359);
// 		    //
// 		    x=(radx2*cos(radians(angle2)))+mouseX;
// 		    y=(radx2*sin(radians(angle2)))+mouseY;
// 		    //
// 		    stroke(random(180,255), random(0,100), 0);
// 		    strokeWeight(3);
// 		    line(x2, y2, x2+4, y2+4);
// 		  }


// 		  if (keyIsPressed) {
// 		    if (key == '+') {
// 		        diametre2 = diametre2 + 5;
// 		      }
// 		  }

// 		  if (keyIsPressed) {
// 		    if (key == '-') {
// 		      if (diametre2 >= 0) {
// 		        diametre2 = diametre2 - 5;
// 		      }
// 		    }
// 		  }   
		 
// 		  }





//CELUI CI FONCTIONNE // BONNE TAILLE FENETRE (PAS RESPONSIVE..)
// var canvas;

// function setup() {
//   // On crée le canvas seulement dans le JS, avec les dimensions indiqués
//   canvas = createCanvas(1100, 530);
//   canvas.position(138, 42);
//   canvas.id("outil1").class("invisible"); //On indique que le canvas repond à l'id outil1 et est concerné par la classe invisi
// }

// function draw() {
//   // ellipse(width/2, height/2, 100, 100);
//   // ellipse(width/4, height/2, 50, 50);
  
// }


		//PREMIER OUTIL QUI FONCTIONNE LORSQUE NON MIS DANS UNE CONDITION DE CLIQUE OU QUOIQUE CE SOIT
		// var
		//  diametre = 30;
		// var dd = 1;
		// var maxIterations = 30;// that's how fast spraying happens


		// function setup() {
		//   createCanvas (1000,700);
		//   stroke(255, 2, 2);
		//   background(0,0);
		  
		// }

		// function draw() {
		//   if (mouseIsPressed) {
		//     brush () ;
		//   }
		// } 

		// function brush () {
		//   var width1 = diametre; // that be the width of your brush
		//   //
		//   var radx;   // Radius
		//   var rady;
		//   var angle1; // angle
		//   var x;      // result
		//   var y;
		//   //
		//   for (var i=0; i < maxIterations; i++) {
		//     radx=random(width1);
		//     rady=random(width1);
		//     angle1= random(359);
		//     //
		//     x=(radx*cos(radians(angle1)))+mouseX;
		//     y=(radx*sin(radians(angle1)))+mouseY;
		//     //
		//     stroke(random(180,255), random(0,100), 0);
		//     strokeWeight(3);
		//     line(x, y, x+4, y+4);
		//   }


		//   if (keyIsPressed) {
		//     if (key == '+') {
		//         diametre = diametre + 5;
		//       }
		//   }

		//   if (keyIsPressed) {
		//     if (key == '-') {
		//       if (diametre >= 0) {
		//         diametre = diametre - 5;
		//       }
		//     }
		//   }   
		 
		//   }


			// 	FONCTION ROND ROUGE
			// var x,y; 

			// function setup(){
			// 	createCanvas(windowWidth, windowHeight);
			// 	background(255,0);
			// }

			// function draw(){
			// 	stroke(255,0,0);

			// 	fill(255,0,0);
			// 	ellipse(300,300,50,50);
			// }

			// function windowResized(){
			// 	resizeCanvas(windowWidth, windowHeight);
			// }





					//FONCTION POINT AUTONOME
					// var x,y; 

					// function setup(){
					// 	createCanvas(windowWidth, windowHeight); // on demande au canvas de prendre les dimensions de la fenêtre tout simplement
					// 	background(255,0);

					// 	// x = width/2;
					// 	// y = height/2;
					// }

					// function draw(){
					// 	stroke(255,0,0);
					// 	// point(x,y);
					// 	// x = round( x + random( -1, 1 ) );
					// 	// y = round( y + random( -1, 1 ) );
					// 	fill(255,0,0);
					// 	ellipse(300,300,50,50);
					// }

					// function windowResized(){
					// 	resizeCanvas(windowWidth, windowHeight);
					// }





				// FONCTION POINT SUIVANT SOURIS
				//var x,y; 

				// function setup(){
				// 	createCanvas(windowWidth, windowHeight); 
				// 	background(0,0);

				// 	x = width/2;
				// 	y = height/2;
				// }

				// function draw(){
				// 		if (keyPressed) {
				//    			if (key == ' ') {
				// 				stroke(255,0,0);
				// 				point(mouseX,mouseY);
				// 		}
				// }
				// }

				// function windowResized(){
				// 	resizeCanvas(windowWidth, windowHeight);
				// }



// });




