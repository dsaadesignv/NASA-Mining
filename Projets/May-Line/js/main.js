function map(n, start1, stop1, start2, stop2) {
 	return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
};

function constrain(n, low, high) {
 	return Math.max(Math.min(n, high), low);
};

function ClicBouton(){ 
      prompt("C'est bien vous avez cliqué"); 
  }



//var lat = data[0].reclat


// INSTALLATION DE LA MAP

var carte = L.map('map').setView([51.505, -0.09], 2);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(carte);




// MISE EN PLACE DE LA 1ERE METEORITE

var imgs = [
	'data/pyramide.png',
	'data/cube.png',
	'data/hexa.png',
	'data/penta.png'
];

$(document).ready(function(){
	$.getJSON('data/meteors.json')
		.done(function(result){
			console.log(result);
			
			for( var i=0; i<150; i=i+1){
				var index = Math.floor( Math.random()*result.length );
				var rad = map( constrain(result[index].mass, 500, 60000), 500, 60000, 20, 100);
				var meteoriteIcon = L.icon({
					iconUrl: imgs[ Math.floor(Math.random()*imgs.length) ],
					iconSize: [rad, rad], // size of the icon
					iconAnchor: [rad/2, rad/2], // point of the icon which will correspond to marker's location > le point de l'image qui pointe
					popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
				});

				L.marker( [result[index].reclat, result[index].reclong], {icon: meteoriteIcon}).addTo(carte).bindPopup(result[index].name+", <br>"+ result[index].mass +"g, <br>"+result[index].year);
			}

		})
		.error(function(error){
			console.log("fail");
		});
});

/*
var meteorite1 = L.icon({	
	
	iconUrl: 'data/pyramide.png',
	iconSize:	 [50, 65], // size of the icon
	iconAnchor:   [25, 32], // point of the icon which will correspond to marker's location > le point de l'image qui pointe
	popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor

});

L.marker([51.505, -0.09], {icon: meteorite1}).addTo(map).bindPopup("Los Sauces, <br>997.000 g, <br>1937");




// VARIABLE AUTRES METEORITES




var meteorite = L.Icon.extend({
	options: {
		iconSize:	 [50, 65],
		iconAnchor:   [25, 32],
		popupAnchor:  [0, 0]
	}
});

var meteorite2 = new meteorite({iconUrl: 'data/cube.png'});
	meteorite3 = new meteorite({iconUrl: 'data/hexa.png'});
	meteorite4 = new meteorite({iconUrl: 'data/penta.png'});

L.icon = function (options) {
	return new L.Icon(options);
};

L.marker([30, -20], {icon: meteorite2}).addTo(map).bindPopup("Pampa (b), <br>10kg, <br>1986");
L.marker([0, -10], {icon: meteorite3}).addTo(map).bindPopup("Hoba, <br>60T, <br>1920");
L.marker([0, -50], {icon: meteorite4}).addTo(map).bindPopup("Hoba, <br>60T, <br>1920");
*/





/* DISTINCTION TONNE ET KILO 

var kilo = L.Icon.extend({
	options: {
		iconSize: [20, 20],
		iconAnchor: [10,10],
		popupAnchor: [0,0],
	}
});

var kilo1 = new kilo({iconUrl: 'data/kilo.png'});
var kilo2 = new kilo({iconUrl: 'data/kilo.png'});

L.Icon = function (options) {
	return new L.Icon(options);
}

L.marker([20, 10], {icon:kilo1}).addTo(map).bindPopup("test kilo1");
L.marker([-30, 20], {icon:kilo2}).addTo(map).bindPopup("test kilo2");



var tonne = L.Icon.extend({
	options: {
		iconSize: [88, 110],
		iconAnchor: [44,55],
		popupAnchor: [0,0],
	}	
});

var tonne1 = new tonne({iconUrl: 'data/tonne.png'});
var tonne2 = new tonne({iconUrl: 'data/tonne.png'});

L.Icon = function (options) {
	return new L.Icon(options);
}

L.marker([20, 30], {icon:tonne1}).addTo(map).bindPopup("test tonne1");
L.marker([-30, 10], {icon:tonne2}).addTo(map).bindPopup("test tonne2");

*/








/*
function setup(){
	createCanvas(windowWidth, windowHeight);
}

function draw(){
	//console.log(L.getBounds());
}



var myImg = new Image();

function preload(){
 	data = loadJSON("/data/meteors.json");
 }


myImg.src = '/data/element.png';
myImg.addEventListener('load', function(){
}; false);
*/
