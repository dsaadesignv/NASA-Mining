var delais, DATA = [], osc,pickles = [];
var doReverb = false;
var modifyingPot=false;
var fft, filter;
var formType = "cercle";
var angle=0,
  selectedData = 0;


$(document).ready(function(){ //quand le document est prêt
  $.getJSON("https://data.nasa.gov/resource/jdkf-j3pt.json")
    .done(function( data ){
      DATA = data.filter(function(d){
        return d.fermi_gbm_average_pulsed_flux_kev_cm_2_s_1 ? true : false;
      });
      // console.log( DATA );
    });



      

    //on regarde si l'état d'un input change
    delais = $("#delais").val();
    $("#delais").on("change", function(){
      delais = $(this).val();
    });


    $("#volume").on("change", function(){
      setVolume( $(this).val() );
    });

    $("#sin").on("change", function(){
      setSin( $(this).val() );
    });

    $("#sqr").on("change", function(){
      setSqr( $(this).val() );
    });

    $("#tri").on("change", function(){
      setTri( $(this).val() );
    });

    $("#saw").on("change", function(){
      setSaw( $(this).val() );
    });

     $("#saw").on("change", function(){
      setSaw( $(this).val() );
    });

});

function setup() {
  createCanvas(windowWidth, windowHeight);


  //nouvel oscillateur
  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.freq(1);
  osc.amp(1);
  osc.start();

  //nouveau delay
  delay = new p5.Delay();
  delay.setType('pingPong');

}



function draw() {
  background(0,0,0,90);

  if( pickles.length < 1000 ) pickles.push( new Particle() );
  
  //créer les particules
  for (var i = 0; i < pickles.length; i++) {
    pickles[i].update();
  }

  //créer les particules
  if(frameCount % delais == 0 &&  DATA.length > 0 ){
    selectedData = floor( random( DATA.length ) );
    osc.freq( DATA[ selectedData ].fermi_gbm_average_pulsed_flux_kev_cm_2_s_1 * width);
    // console.log(osc.amp);
  }
  

  switch(formType){
    case "cercle":
      fill(255,255,255,90);
      strokeWeight(30);
      stroke(255,255,255,50);
      ellipse(width/2,height/2,(random(100,110)*delais)/20,(random(100,110)*delais)/20);
      fill(0,0,0);
      strokeWeight(20);
      stroke(255,255,255,30);
      ellipse(width/2,height/2,angle*200,angle*200);
      break;

    case "triangle":
        push();
          translate(width/2,height/2);
          fill(255,255,255,90);
          strokeWeight(30);
          stroke(255,255,255,50);
          rotate(rotationX/50,rotationY/50,0);
          triangle(random(-30*(delais/5),-27*(delais/5)), random(30*(delais/5),27*(delais/5)), random(0*(delais/5),3*(delais/5)),random (-30*(delais/5),-27*(delais/5)),random(30*(delais/5),27*(delais/5)), random(30*(delais/5),27*(delais/5)));
          fill(0,0,0);
          strokeWeight(20);
          stroke(255,255,255,30);
          triangle(random(-30*(angle*10),-27*(angle*10)), random(30*(angle*10),27*(angle*10)), random(0*(angle*10),3*(angle*10)),random (-30*(angle*10),-27*(angle*10)),random(30*(angle*10),27*(angle*10)), random(30*(angle*10),27*(angle*10)));
          scale(angle*200);
       pop();
      break;
    case "square":
        push();
        translate(width/2,height/2)
        rectMode(CENTER);
        fill(255,255,255,90);
        strokeWeight(30);
        stroke(255,255,255,50);
        rotate(rotationX/50,rotationY/50,0);
        rect(0,0,(random(100,110)*delais)/20,(random(100,110)*delais)/20);
        fill(0,0,0);
        strokeWeight(20);
        stroke(255,255,255,30);
        rect(0,0,angle*200,angle*200);
        pop();
      break;

       case "sawtooth":
        push();
        translate(width/2,height/2)
        rectMode(CENTER);
        fill(255,255,255,90);
        strokeWeight(30);
        stroke(255,255,255,50);
        rotate(rotationX/50,rotationY/50,0);
        quad(random(-50*(delais/25),-45*(delais/25)),random(-100*(delais/25),-95*(delais/25)),random(45*(delais/25),50*(delais/25)),random(-100*(delais/25),-95*(delais/25)),random(100*(delais/25),105*(delais/25)),random(100*(delais/25),105*(delais/25)),random(-100*(delais/25),-95*(delais/25)), random(100*(delais/25),105*(delais/25) ));
        fill(0,0,0);
        strokeWeight(20);
        stroke(255,255,255,30);
        quad(random(-50*(angle*2),-45*(angle*2)),random(-100*(angle*2),-95*(angle*2)),random(45*(angle*2),50*(angle*2)),random(-100*(angle*2),-95*(angle*2)),random(100*(angle*2),105*(angle*2)),random(100*(angle*2),105*(angle*2)),random(-100*(angle*2),-95*(angle*2)), random(100*(angle*2),105*(angle*2) ));
        pop();
      break;
   

   }

  //écrire le nom de la data
  if(DATA.length > 0){
    noStroke();
    fill(255);
    textAlign(CENTER);
    textSize(25);
    text( DATA[selectedData].name, width/2, height/4 );
  }

  //dessiner le bouton de la reverb
 
  push();
    translate(width/4.5,height/2);
    rotate(map(angle,0,1, 0, PI)-PI);
    rectMode(CENTER);
    fill(0);
    stroke(255);
    strokeWeight(5);
    ellipse(0,0,75,75);
    line(15, -1, 30, -2);
    constrain(angle,-20,20);
  pop();
  

 
}

//générer les particules
var Particle = function() {
    //x and y position to be in middle of screen
    this.x = random((width / 2) + 20, (width / 2) - 20);
    this.y = random((height / 2) + 20, (height / 2) - 20);

    //var m = 51 - delais;
    this.velX = random(-delais, delais);
    this.velY = random(-delais, delais);
}

Particle.prototype.update = function() {
	this.x += this.velX;
	this.y += this.velY;

	if( (this.x < 0 || this.x>width) && (this.y<0 || this.y>height) ){
	    this.x = random((width / 2) + 20, (width / 2) - 20);
	    this.y = random((height / 2) + 20, (height / 2) - 20);

	    //var m = 51 - delais;
	    this.velX = random(-delais, delais);
	    this.velY = random(-delais, delais);
	}

	fill(255);
	rect(this.x, this.y, 5, 5);
	noStroke();
}

//fonctions appelées quand les boutons radio changent d'état.
function setVolume( vol ){
  osc.amp(vol * 1);
}

function setSqr( square ){
  osc.setType('square');
  formType = "square";

}
function setTri( triangle ){
  osc.setType('triangle');
  formType = "triangle";
}
function setSaw( sawtooth ){
  osc.setType('sawtooth');
  formType = "sawtooth";
}
function setSin( sine ){
  osc.setType('sine');
 formType = "cercle";
}


//si a souris est cliquée sur le potar, alor modifyingPot = 1
function mousePressed(){
  if(dist(mouseX,mouseY,width/4.5,height/2)<37)
  {
    modifyingPot=true;
  }
}

function mouseDragged(){
  if(modifyingPot==true){
    var revBtn = document.getElementById("reverb");
    revBtn.checked = true;

    if( mouseX > pmouseX ||mouseY > pmouseY){
      angle+=0.10;
      delay.process(osc, angle, 0.7, 2300);
    }
    else if(mouseX < pmouseX ||mouseY < pmouseY){
      angle-=0.10;
      delay.process(osc, angle, 0.7, 2300);
    }

    angle = constrain(angle,0,1);
  }    
}

function deviceMoved() {
  osc.freq( (DATA[ selectedData ].fermi_gbm_average_pulsed_flux_kev_cm_2_s_1 * width)+rotationX);
}

  
function mouseReleased(){
  modifyingPot=false;
}


function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}