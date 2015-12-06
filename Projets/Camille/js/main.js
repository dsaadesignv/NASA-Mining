$(window).on('beforeunload', function(){
 	$(window).scrollTop(0);
});

//déclaration des différentes variables 
var meteors = [];
var minLat = 9999, maxLat =-9999, minLong = 9999, maxLong =-9999;
var sounds  = [];
var img;
var meteora, meteorb;


//tri des touches clavier
function sortArrayByKey(arr, key){
	return arr.map(function(e, i) {
		return { index: i, value: e[key] };
	})
	.sort(function(a, b) {
		return +(a.value > b.value) || +(a.value === b.value) - 1;
	})
	.map(function(e){
		return arr[e.index];
  });
}

// scroll on click function
$('#map img, #instructions').hide();

$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 850);

        $('#map img, #instructions').show(850);
        return false;
      }
    }
  });
});

//load json
$(document).ready(function(){
	  $.getJSON("JSON/Meteorite_Landings.json")
        .done(function(data){
        	//find min max lat/long
            data.forEach(function(meteor){
            	var lat = parseFloat(meteor.reclat),
            		lng = parseFloat(meteor.reclong);

            	meteor.lat = lat;
            	meteor.lng = lng;

            	if( lat > maxLat ) maxLat = lat;
            	if( lat < minLat ) minLat = lat;
            	if( lng > maxLong ) maxLong = lng;
            	if( lng < minLong ) minLong = lng;
            });

            // console.log( minLat, maxLat, minLong, maxLong);

            //create Meteor objects
            data.forEach( function(meteor){
            	meteors.push( new Meteor(meteor) );
            });
            meteors = sortArrayByKey( meteors, 'data.mass', 'data.name' );
            // console.log(meteors);
    	});
});

var Meteor = function( data ){
	this.data = data;
	this.x = map( this.data.lng, minLong, maxLong, 157, 1613);
	this.y = map( this.data.lat, maxLat, minLat, 152, 852);
  this.display = false;
};


//forme et import image pour meteors
Meteor.prototype.start = function(){
  console.log("start");
  this.display = true;
  this.rad = constrain( map( this.data.mass, 500, 10000, 50, 500), 10,200 );
  img = loadImage("images/meteora2.png"); 
  img2 = loadImage("images/meteorb2.png");
  meteora = loadAnimation("images/meteora1.png", "images/meteora2.png");
  meteorb = loadAnimation("images/meteorb1.png", "images/meteorb2.png"); 
};


//taille et position de la meteor. en fonction de la géoloc et de la mass
Meteor.prototype.draw = function(){
  if( this.display ){ 
    image( img, this.x, this.y, this.rad, this.rad );
    //animation( meteora, this.x, this.y, this.rad, this.rad );
   
    this.rad --;
    if( this.rad <= 0) this.display = false;
  }
};


function preload(){
  for (var i = 1; i < 48; i++) {
    sounds.push( loadSound( 'sounds/'+i+'.mp3' ) );
  };
}

function setup(){
	var cnvs = createCanvas(1280, 720);
	cnvs.parent('canvasParent');

}

function draw(){
	clear();

  for (var i = 0; i < meteors.length; i++) {
    meteors[i].draw();

  };
}

//définition des touches clavier pressées
function keyPressed() {
  console.log( keyCode );
  var touch = keyCode - 65;

  if(touch >= 0 && touch < sounds.length){
    sounds[ touch ].play();
    var index = floor( random( map(touch, 0, sounds.length, 0, meteors.length), map(touch + 1, 0, sounds.length, 0, meteors.length)  ) );
    meteors[ index ].start();
  }
}

function mousePressed(){
	console.log( mouseX, mouseY );
}
