// FICHIER JS GLOBE

$(document).ready(function() {

    var crateres = [];
    $.getJSON('data/crateres-ok.json') // on charge le fichier json
        .done( function( data ){ // data = résultat du chargement de données > tableau
            crateres = data;
            console.log( crateres.length);
        })
        .error(function(){
            console.log("error");
        });


    var globe = planetaryjs.planet(); // on définit une variable pour le globe

    globe.loadPlugin(planetaryjs.plugins.earth({
        topojson: { file:   'data/world-110m-withlakes.json' },
        oceans:   { fill:   '#FF9136' },
        land:     { fill:   '#FF9136' },
        borders:  { stroke: '#FF9136' }
    }));

    globe.loadPlugin( planetaryjs.plugins.crateres() );

    // la fonction définit comment le globe sera utilisé au moment du clic long
    globe.loadPlugin(planetaryjs.plugins.drag({
        onDragStart: function() {
            this.plugins.autorotate.pause();
        },
        onDragEnd: function() {
            this.plugins.autorotate.resume();
        }
    }));

    globe.projection.scale(120).translate([175, 175]).rotate([0, -10, 0]);


    // on définit la couleur utilisée pour visualiser les cratères
    var colors = ['white'];
    setInterval( function() {
    if( crateres.length > 0 ){
          var i = Math.floor(Math.random()*crateres.length);
            var cratere = crateres[ i ];
            var lat = parseFloat( cratere.Lat );
            var lng = parseFloat( cratere.Lon );
            var color = colors[ Math.floor( Math.random() * colors.length ) ]; 
            globe.plugins.crateres.add( lng, lat, { color: cratere.Morpho, angle: Math.random() * 10 }); 
    }
    }, 50 );

    // on définit la taille du canvas
    var canvas = document.getElementById('rotatingGlobe'); 
    canvas.width = 700;
    canvas.height = 700;
    context = canvas.getContext('2d');
    context.scale(2, 2);
    globe.draw( canvas );
   
});
            
 /*$("#rotatingGlobe").on("click",function(){
      $(".explication").hide();

 });*/



// FICHIER JS CLASSEMENT CRATERES 

// on définit plusieurs variables
var data;
var nbLetters;
var morph ;

function preload(){
  data = loadJSON('data/crateres-ok.json'); // on charge le fichier json
}

function setup() {
  createCanvas (windowWidth,windowHeight*16.7); // on définit la taille de la fenêtre
  background(0);

  var dataIndex = 0; // on cherche l'objet au rang dataIndex


  var ny = 55, nx = 6; // on définit le nombre de lignes et de colonnes 
  var total = ny*nx;

  for( var y = 0; y<ny; y++){
    for( var x = 0; x<nx; x++){
      var _x = 70 + x * 220; // on définit l'espace entre chaque visualisation de cratères
      var _y = 100 + y * 220;
      

      var nbLetters = data[dataIndex].Name.length; // on définit la variable qui utilise le nom des cratères
      var morph = data[dataIndex].Morpho; // on cherche l'objet au rang dataIndex
      
      var nom = data[dataIndex].Name; 
      //write(nom); > j'ai cherché comment afficher le nom du cratère sous la visualisation mais je n'ai pas réussi...

      console.log(nom);
      console.log(nbLetters);
      console.log(morph);
      dataIndex++; // on ajoute 1 à l'index


      switch(morph){ // pour chaque classe morphologique, un graphisme sera associé
        case 4: // remplissage avec opacité qui change
          noStroke ();
          fill(255,255,255,nbLetters*5);
          ellipse (_x, _y, 120,120);
          //print(nom);
          break;

        case 2: // épaisseur du contour du cercle
          stroke(255);
          strokeWeight(nbLetters);
          noFill();
          ellipse (_x, _y, 120,120);
          break;

        case 6: // cercles concentriques, nombre de cercles intermédiaires change
          stroke(255);
          noFill();
          concentricCircle(_x, _y, 10, 120 , nbLetters);
          break;

        case 5: // cercle en points, nombre de points change
          noStroke();
          fill(255);
          pointCircle (_x, _y, 60, nbLetters, nbLetters);
          break;

        case 0: // cercle en pointillés, nombre de pointillés change
          stroke(255);
          strokeWeight(4);
          noFill();
          dashedCircle(_x, _y, 120, nbLetters, 0.3);
          break;

        case 3: // 2 cercles concentriques avec épaisseur qui change
          stroke(255);
          strokeWeight(nbLetters)
          noFill();
          concentricCircle(_x, _y, 10, 120 , 1);
          break;
        }

    
    } // fin boucle 1
  } // fin boucle 2
} 


// on définit les fonctions qui permettent les graphismes utilisés précédemment

function pointCircle( _x,  _y, radius, nbPoints, pointRadius) {
  for (var i = 0; i < nbPoints; i = i + 1) {
    var angle =  map (i, 0, nbPoints, 0, TWO_PI);

    var x = _x + cos (angle) * radius;
    var y = _y + sin (angle) * radius;

    ellipse (x, y, pointRadius, pointRadius);
  }
}

function dashedCircle(x, y, radius, nbDashes, dashLength) {
  dashLength = constrain(dashLength, 0, 1 );
  push();
  translate(x, y);
  for( var i=0; i<nbDashes; i++){
    arc(0,0,radius,radius, i * TWO_PI/nbDashes, (i+dashLength) * TWO_PI/nbDashes);
  }
  pop();
}

function concentricCircle(x, y, innerRad, outerRad, nbCircles ) {
  push();
  translate(x,y);
  for ( var r = innerRad; r <= outerRad; r += (outerRad - innerRad)/nbCircles) {
    ellipse( 0, 0, r, r );
  }
  pop();
}