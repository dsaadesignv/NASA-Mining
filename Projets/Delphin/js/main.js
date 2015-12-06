var population;
var ef;
var planets;
var ecologicalFootprint;
var decalagePI;
var capacity;
var earthPopulation;
var k186fPopulation = 0; // Pour illustrer tant que je n'ai pas réussi
var k62fPopulation = 849182356; // Pour illustrer tant que je n'ai pas réussi
var k442bPopulation = 2067839115; // Pour illustrer tant que je n'ai pas réussi

var countryPop;

var key = 'pop2015';

var input = document.getElementById("yearRange");
// var h2 = document.getElementById("year");


input.addEventListener("change", function(e){
	// h2.innerHTML = e.target.value+ " ";
	// h2.innerHTML += population[0]['pop'+e.target.value];
	key = 'pop'+e.target.value;
	console.log(key);
	addTable();
});

// Remplissage du tableau à partir des données JSON
function addTable(){
	var div = document.getElementById("countriespop");
	div.innerHTML = "<tr>" +
						"<td></td>" +
						"<td>Country</td>" +
						"<td>population</td>" +
						"<td>Send to</td>";
	for (var countryPop = 0; countryPop < 10 ; countryPop++) {
		div.innerHTML += 
					"<td>"+ countryPop +".</td>"+
					"<td>" + population[countryPop]['Name'] + "</td>"+
					"<td>" + population[countryPop][key] + " inhabitants</td>"+
					'<td><input class="button k186f" type="button" value="Kepler-186f" id="k186f'+ countryPop + '"></td>'+
					'<td><input class="button k62f" type="button" value="Kepler-62f" id="k62f'+ countryPop + '"></td>'+
					'<td><input class="button k442b" type="button" value="Kepler-442b" id="k442b'+ countryPop + '"></td>'+
				"</tr>";
	}

// Censé envoyer les populations, par pays, sur Kepler-186f
	var toK186f0 = document.getElementById("k186f0");
	toK186f0.onclick = function() {
		console.log(population[0]['Name']);
		var k186fPopulation = population.splice(0,1);
		console.log(k186fPopulation[0][key]);
	}
	var toK186f1 = document.getElementById("k186f1");
	toK186f1.onclick = function() {
		console.log(population[1]['Name']);
		var k186fPopulation = population.splice(1,1);
		console.log(k186fPopulation[1][key]);
	}
	var toK186f2 = document.getElementById("k186f2");
	toK186f2.onclick = function() {
		console.log(population[2]['Name']);
		var k186fPopulation = population.splice(2,1);
		console.log(k186fPopulation[2][key]);
	}
	var toK186f3 = document.getElementById("k186f3");
	toK186f3.onclick = function() {
		console.log(population[3]['Name']);
		var k186fPopulation = population.splice(3,1);
		console.log(k186fPopulation[3][key]);
	}
	var toK186f4 = document.getElementById("k186f4");
	toK186f4.onclick = function() {
		console.log(population[4]['Name']);
		var k186fPopulation = population.splice(4,1);
		console.log(k186fPopulation[4][key]);
	}
	var toK186f5 = document.getElementById("k186f5");
	toK186f5.onclick = function() {
		console.log(population[5]['Name']);
		var k186fPopulation = population.splice(5,1);
		console.log(k186fPopulation[5][key]);
	}
	var toK186f6 = document.getElementById("k186f6");
	toK186f6.onclick = function() {
		console.log(population[6]['Name']);
		var k186fPopulation = population.splice(6,1);
		console.log(k186fPopulation[6][key]);
	}
	var toK186f7 = document.getElementById("k186f7");
	toK186f7.onclick = function() {
		console.log(population[7]['Name']);
		var k186fPopulation = population.splice(7,1);
		console.log(k186fPopulation[7][key]);
	}
	var toK186f8 = document.getElementById("k186f8");
	toK186f8.onclick = function() {
		console.log(population[8]['Name']);
		var k186fPopulation = population.splice(8,1);
		console.log(k186fPopulation[8][key]);
	}
	var toK186f9 = document.getElementById("k186f9");
	toK186f9.onclick = function() {
		console.log(population[9]['Name']);
		var k186fPopulation = population.splice(9,1);
		console.log(k186fPopulation[9][key]);
	}

// Censé envoyer les populations, par pays, sur Kepler-62f
	var toK62f0 = document.getElementById("k62f0");
	toK62f0.onclick = function() {
		console.log(population[0]['Name']);
		var k62fPopulation = population.splice(0,1);
		console.log(k62fPopulation[0][key]);
	}
	var toK62f1 = document.getElementById("k62f1");
	toK62f1.onclick = function() {
		console.log(population[1]['Name']);
		var k62fPopulation = population.splice(1,1);
		console.log(k62fPopulation[1][key]);
	}
	var toK62f2 = document.getElementById("k62f2");
	toK62f2.onclick = function() {
		console.log(population[2]['Name']);
		var k62fPopulation = population.splice(2,1);
		console.log(k62fPopulation[2][key]);
	}
	var toK62f3 = document.getElementById("k62f3");
	toK62f3.onclick = function() {
		console.log(population[3]['Name']);
		var k62fPopulation = population.splice(3,1);
		console.log(k62fPopulation[3][key]);
	}
	var toK62f4 = document.getElementById("k62f4");
	toK62f4.onclick = function() {
		console.log(population[4]['Name']);
		var k62fPopulation = population.splice(4,1);
		console.log(k62fPopulation[4][key]);
	}
	var toK62f5 = document.getElementById("k62f5");
	toK62f5.onclick = function() {
		console.log(population[5]['Name']);
		var k62fPopulation = population.splice(5,1);
		console.log(k62fPopulation[5][key]);
	}
	var to626f6 = document.getElementById("k62f6");
	toK62f6.onclick = function() {
		console.log(population[6]['Name']);
		var k62fPopulation = population.splice(6,1);
		console.log(k62fPopulation[6][key]);
	}
	var toK62f7 = document.getElementById("k62f7");
	toK186f7.onclick = function() {
		console.log(population[7]['Name']);
		var k62fPopulation = population.splice(7,1);
		console.log(k62fPopulation[7][key]);
	}
	var toK62f8 = document.getElementById("k62f8");
	toK62f8.onclick = function() {
		console.log(population[8]['Name']);
		var k62fPopulation = population.splice(8,1);
		console.log(k62fPopulation[8][key]);
	}
	var toK62f9 = document.getElementById("k62f9");
	toK62f9.onclick = function() {
		console.log(population[9]['Name']);
		var k62fPopulation = population.splice(9,1);
		console.log(k62fPopulation[9][key]);
	}

// Censé envoyer les populations, par pays, sur Kepler-442b
	var toK442b0 = document.getElementById("k442b0");
	toK442b0.onclick = function() {
		console.log(population[0]['Name']);
		var k442bPopulation = population.splice(0,1);
		console.log(k442bPopulation[0][key]);
	}
	var toK442b1 = document.getElementById("k442b1");
	toK442b1.onclick = function() {
		console.log(population[1]['Name']);
		var k442bPopulation = population.splice(1,1);
		console.log(k442bPopulation[1][key]);
	}
	var toK442b2 = document.getElementById("k442b2");
	toK442b2.onclick = function() {
		console.log(population[2]['Name']);
		var k442bPopulation = population.splice(2,1);
		console.log(k442bPopulation[2][key]);
	}
	var toK442b3 = document.getElementById("k442b3");
	toK442b3.onclick = function() {
		console.log(population[3]['Name']);
		var k442bPopulation = population.splice(3,1);
		console.log(k442bPopulation[3][key]);
	}
	var toK442b4 = document.getElementById("k442b4");
	toK442b4.onclick = function() {
		console.log(population[4]['Name']);
		var k442bPopulation = population.splice(4,1);
		console.log(k442bPopulation[4][key]);
	}
	var toK442b5 = document.getElementById("k442b5");
	toK442b5.onclick = function() {
		console.log(population[5]['Name']);
		var k442bPopulation = population.splice(5,1);
		console.log(k442bPopulation[5][key]);
	}
	var toK442b6 = document.getElementById("k442b6");
	toK442b6.onclick = function() {
		console.log(population[6]['Name']);
		var k442bPopulation = population.splice(6,1);
		console.log(k442bPopulation[6][key]);
	}
	var toK442b7 = document.getElementById("k442b7");
	toK442b7.onclick = function() {
		console.log(population[7]['Name']);
		var k442bPopulation = population.splice(7,1);
		console.log(k442bPopulation[7][key]);
	}
	var toK442b8 = document.getElementById("k442b8");
	toK442b8.onclick = function() {
		console.log(population[8]['Name']);
		var k442bPopulation = population.splice(8,1);
		console.log(k442bPopulation[8][key]);
	}
	var toK442b9 = document.getElementById("k442b9");
	toK442b9.onclick = function() {
		console.log(population[9]['Name']);
		var k442bPopulation = population.splice(9,1);
		console.log(k442bPopulation[9][key]);
	}

}

// Fonction pour afficher les données dans le tableau
function sortArrayByKey(arr, key){
  return arr.map(function(e, i) {
    return { index: i, value: e[key] };
  })
  .sort(function(a, b) {
    return +(a.value < b.value) || +(a.value === b.value) - 1;
  })
  .map(function(e){
    return arr[e.index];
  });
}

function preload() {
	console.log("preload");
	ef = loadJSON("data/ecologicalfootprint.json");
	population = loadJSON("data/population.json");
	justearthpopulation = loadJSON("data/justearthpopulation.json")
	planets = loadJSON("data/planets.json");
	textFont("Teko");
	fontRegular = loadFont("data/Teko-Medium.ttf");

	earthImg = loadImage("data/earth.png");
	k186fImg = loadImage("data/k186f.png");
	k62fImg = loadImage("data/k62f.png");
	k442bImg = loadImage("data/k442b.png");
	bg = loadImage("data/bg.png");
}

function setup() {
	createCanvas(windowWidth - 40,windowHeight - 40);
	key = 'pop2015';
}

function draw() {
	background(20);
	image(bg,0,0);
	smooth();
	

	// Création de variables utilisant les données JSON 
	earthPopulation = justearthpopulation[0][key]; // Projection de population voulue
	var earthPop2015 = justearthpopulation[0].pop2015; // Population en 2015
	var ef2015 = ef[0].EcologicalFootprint; // Empreinte écologique en 2015
	
	// Calculs mathématiques 
	var earthCap = earthPop2015 / ef2015; // Capacité d'accueil en 2015


	var ecologicalFootprint = earthPopulation / earthCap; // Empreinte écologique voulue

	// Capacité et empreinte écologique pour Kepler-186f
	var k186fCap = earthCap * planets[0]['Relative radius'];
	var efK186f = k186fPopulation / k186fCap;

	// Capacité et empreinte écologique pour Kepler-62f
	var k62fCap = earthCap * planets[1]['Relative radius'];
	var efK62f = k62fPopulation / k62fCap;

	// Capacité et empreinte écologique pour Kepler-442b
	var k442bCap = earthCap * planets[2]['Relative radius'];
	var efK442b = k442bPopulation / k442bCap;

	var decalagePI = -PI / 2; // Permet de commencer les diagrammes en haut du camembert

	// LA TERRE
	// -----------------------------------------------------------------------

	// Sa population
	// -------------
	if (Math.floor(ecologicalFootprint) == 0) {
		noStroke();
		fill(0,153,0);
		arc(
			windowWidth/4,windowHeight*2/5,
			180,
			180,
			decalagePI,
			decalagePI + (ecologicalFootprint - Math.floor(ecologicalFootprint)) * TWO_PI
		);
	} else {
		noStroke();
		fill( 180,80-20*(Math.floor(ecologicalFootprint)+1), 80-20*(Math.floor(ecologicalFootprint)+1) );
		arc(
			windowWidth/4,2*windowHeight/5, 
			180 + (Math.floor(ecologicalFootprint) * 30),
			180 + (Math.floor(ecologicalFootprint) * 30),
			decalagePI,
			decalagePI + (ecologicalFootprint - Math.floor(ecologicalFootprint)) * TWO_PI
			);
		noStroke();
		for (var i = Math.floor(ecologicalFootprint); i >= 0; i--) {
			fill(180,80-20*i,80-20*i);
			ellipse(windowWidth/4,windowHeight*2/5, 150 + 30 * i, 150 + 30 * i);
		}
	};

	// La planète
	// -----------
	fill(20,20,80);
	noStroke();
	ellipse(windowWidth/4,windowHeight*2/5,150,150);
	image(earthImg, windowWidth/4 - 75,windowHeight*2/5 - 75);

	// Le texte
	// -----------
	fill(243,235,220);
	textAlign(CENTER);
	textFont(fontRegular);
	textSize(24);
	text("Earth\n" + earthPopulation + "\ninhabitants",
		windowWidth/4,
		windowHeight*2/5 - 24
	);


	// Kepler-186f
	// -----------------------------------------------------------------------

	// Sa population
	// -----------
	fill(243,235,220);
	arc(
		windowWidth/4,
		windowHeight*4/5,
		120,
		120,
		decalagePI,
		decalagePI + (efK186f - Math.floor(efK186f)) * TWO_PI
	);

	// La planète
	// -----------
	fill(188,104,168);
	noStroke();
	ellipse(windowWidth/4, windowHeight*4/5, 100,100);
	image(k186fImg, windowWidth/4 - 50,windowHeight*4/5 - 50);

	// Le texte
	// -----------
	fill(243,235,220);
	textAlign(CENTER);
	textFont(fontRegular);
	textSize(14);
	text("Kepler-186f\n" + k186fPopulation + "\ninhabitants",
		windowWidth/4,
		windowHeight*4/5 - 14
	);

	// Kepler-62f
	// -----------------------------------------------------------------------
	
	// Sa population
	// -----------
	fill(243,235,220);
	arc(
		windowWidth/2,
		windowHeight*4/5,
		120,
		120,
		decalagePI,
		decalagePI + (efK62f - Math.floor(efK62f)) * TWO_PI
	);

	// La planète
	// -----------
	fill(64,164,151);
	noStroke();
	ellipse(windowWidth/2, windowHeight*4/5, 100,100);
	image(k62fImg, windowWidth/2 - 50,windowHeight*4/5 - 50);

	// Le texte
	// -----------
	fill(243,235,220);
	textAlign(CENTER);
	textFont(fontRegular);
	textSize(14);
	text("Kepler-62f\n" + k62fPopulation + "\ninhabitants",
		windowWidth/2,
		windowHeight*4/5 - 14
	);

	// Kepler-442b
	// -----------------------------------------------------------------------
	
	// Sa population
	// -----------
	fill(243,235,220);
	arc(
		windowWidth*3/4,
		windowHeight*4/5,
		120,
		120,
		decalagePI,
		decalagePI + (efK442b - Math.floor(efK442b)) * TWO_PI
	);

	// La planète
	// -----------
	fill(212,147,17);
	noStroke();
	ellipse(windowWidth*3/4, windowHeight*4/5, 100,100);
	image(k442bImg, windowWidth*3/4 - 50,windowHeight*4/5 - 50);

	// Le texte
	// -----------
	fill(243,235,220);
	textAlign(CENTER);
	textFont(fontRegular);
	textSize(14);
	text("Kepler-442b\n" + k442bPopulation + "\ninhabitants",
		windowWidth*3/4,
		windowHeight*4/5 - 14
	);

	// Permet de trier les pays par ordre décroissant de population
	population = sortArrayByKey(population, key);
} 

function reload(){
	location.reload();
}

function windowResized(){
	// cette fonction permet de recadrer le canvas automatiquement si la fenêtre change de taille
	resizeCanvas(windowWidth - 40,windowHeight - 40);
}