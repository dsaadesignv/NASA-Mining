int diametre = 30;
float dd = 1;
final int maxIterations = 30;  // that's how fast spraying happens


void setup() {
  size (700, 700);
  stroke(255, 2, 2);
  background(0,0);
}


void draw () {
  if (mousePressed) {
    brush () ;
  }
} // func
// -------------------------------------------------------
void brush () {
  int width1 = diametre; // that be the width of your brush
  //
  float radx;   // Radius
  float rady;
  float angle1; // angle
  float x;      // result
  float y;
  //
  for (int i=0; i < maxIterations; i++) {
    radx=random(width1);
    rady=random(width1);
    angle1= random(359);
    //
    x=(radx*cos(radians(angle1)))+mouseX;
    y=(radx*sin(radians(angle1)))+mouseY;
    //
    stroke(random(180,255),0, random(0,100));
    strokeWeight(3);
    line(x, y, x+4, y+4);
  }


  if (keyPressed) {
    if (key == '+') {
        diametre = diametre + 5;
      }
  }

  if (keyPressed) {
    if (key == '-') {
      if (diametre >= 0) {
        diametre = diametre - 5;
      }
    }
  }   
 
  } // func

