var myCanvas2;

/*$(function (){

	$(window).mousemove(function(event) {

		$('#mouse-pointer').css({
			'top' : event.pageY + 'px',
			'left' : event.pageX + 'px'
		});
	});

});*/

function setup(){
	var canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent("canvasDiv2");
	frameRate( 10 );


}

function draw(){

	fill ('#a997db');
	for (var i=0; i<1; i = i+1) {
		var x = random(mouseX - 150, mouseX + 150); 
		var y = random(mouseY - 150, mouseY + 150); 

		fill ('#a997db');
		noStroke();
		ellipse (x, y, 3, 3);

	}

}	

function mousePressed(){
	background ('#021735');
}

