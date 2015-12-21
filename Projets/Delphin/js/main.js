var earthPays;
var ef;
var planets;
var ecologicalFootprint;
var decalagePI;
var capacity;
var earthPopulation;
var k186fPays = []; // Pour illustrer tant que je n'ai pas réussi
var k186fPopulation = 0;
var k62fPays = []; // Pour illustrer tant que je n'ai pas réussi
var k62fPopulation = 0;
var k442bPays = []; // Pour illustrer tant que je n'ai pas réussi
var k442bPopulation = 0;

var countryPop;

var key = 'pop2015';

var input = document.getElementById("yearRange");
// var h2 = document.getElementById("year");


input.addEventListener("change", function(e){
	// h2.innerHTML = e.target.value+ " ";
	// h2.innerHTML += population[0]['pop'+e.target.value];
	key = 'pop'+e.target.value;
	// console.log(key);
	earthPays = sortArrayByKey( earthPays, key );

	k186fPopulation = 0;
	k186fPays.forEach(function(pays){
		k186fPopulation += pays[key];
	});


	k62fPopulation = 0;
	k62fPays.forEach(function(pays){
		k62fPopulation += pays[key];
	});


	k442bPopulation = 0;
	k442bPays.forEach(function(pays){
		k442bPopulation += pays[key];
	});

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
					"<td>" + earthPays[countryPop]['Name'] + "</td>"+
					"<td>" + earthPays[countryPop][key] + " inhabitants</td>"+
					'<td><input class="button k186f" type="button" value="Kepler-186f" id="k186f'+ countryPop + '"></td>'+
					'<td><input class="button k62f" type="button" value="Kepler-62f" id="k62f'+ countryPop + '"></td>'+
					'<td><input class="button k442b" type="button" value="Kepler-442b" id="k442b'+ countryPop + '"></td>'+
				"</tr>";
	}

	// Censé envoyer les populations, par pays, sur Kepler-186f
	function onclickFunc_k1( i ){
		// console.log( earthPays[ i ][ 'Name' ] );
		k186fPays.push( earthPays[ i ] );
		earthPays.splice( i, i + 1 );

		k186fPopulation = 0;
		k186fPays.forEach(function(pays){
			k186fPopulation += pays[key];
		});

		addTable();
	}

	function onClickCallback_k1(i){
		return function(){
			onclickFunc_k1( i );
		}
	}

	for (var i = 0; i < 10; i++) {
		var id = "k186f" + i;
		var el = document.getElementById(id);
		el.onclick = onClickCallback_k1( i );
	};

	// Censé envoyer les populations, par pays, sur Kepler-62f
	function onclickFunc_k2( i ){
		// console.log( earthPays[ i ][ 'Name' ] );
		k62fPays.push( earthPays[ i ] );
		earthPays.splice( i, i + 1 );

		k62fPopulation = 0;
		k62fPays.forEach(function(pays){
			k62fPopulation += pays[key];
		});

		addTable();
	}

	function onClickCallback_k2(i){
		return function(){
			onclickFunc_k2( i );
		}
	}

	for (var i = 0; i < 10; i++) {
		var id = "k62f" + i;
		var el = document.getElementById(id);
		el.onclick = onClickCallback_k2( i );
	};

	// Censé envoyer les populations, par pays, sur Kepler-442b
	function onclickFunc_k3( i ){
		// console.log( earthPays[ i ][ 'Name' ] );
		k442bPays.push( earthPays[ i ] );
		earthPays.splice( i, i + 1 );

		k442bPopulation = 0;
		k442bPays.forEach(function(pays){
			k442bPopulation += pays[key];
		});

		addTable();
	}

	function onClickCallback_k3(i){
		return function(){
			onclickFunc_k3( i );
		}
	}

	for (var i = 0; i < 10; i++) {
		var id = "k442b" + i;
		var el = document.getElementById(id);
		el.onclick = onClickCallback_k3( i );
	};
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
	earthPays = loadJSON("data/population.json");
	justearthpopulation = loadJSON("data/justearthpopulation.json");
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
	// Permet de trier les pays par ordre décroissant de population
	earthPays = sortArrayByKey( earthPays, key );
	addTable();
}

function draw() {
	background(20);
	image(bg,0,0);
	smooth();

	// Création de variables utilisant les données JSON 
	earthPopulation = justearthpopulation[ 0 ][key] - k186fPopulation - k62fPopulation - k442bPopulation; // Projection de population voulue
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
} 

function reload(){
	location.reload();
}

function windowResized(){
	// cette fonction permet de recadrer le canvas automatiquement si la fenêtre change de taille
	resizeCanvas(windowWidth - 40,windowHeight - 40);
}