var c=document.getElementById("alpha");
c.style.background="#FFFFFF";
var ctx=c.getContext("2d");
ctx.canvas.width=600;
ctx.canvas.height=600;

ctx.fillStyle="black"
ctx.font="20px sans-serif bold";

function drawsphere(x,y,rad){
  /*
  Draws a sphere
  (x,y): coordinates, rad: radius
  */

  ctx.beginPath();
  ctx.arc(x,y,rad,0,2*Math.PI,false);
  draw();
}

function drawcube(x,y,side,rot){
  /* 
  Draws a cube
  (x,y): coordinates of the upper left corner
  side: lenght of side
  rot: rotation of the cube in rad
  */

  // calculate vertice separation given rotation and size
  vs=Math.sin(rot)*side;
  hs=Math.cos(rot)*side;
  // calculate displacement
  dy=(Math.sin(rot+(Math.PI/4))*side)/2
  dx=(Math.cos(rot+(Math.PI/4))*side)/2
  x=x-dx; y=y-dy;

  // Draw lines between vertices
  ctx.beginPath();
  ctx.moveTo(x,y);
  ctx.lineTo(x+hs,y+vs);
  ctx.lineTo(x+hs-vs,y+hs+vs);
  ctx.lineTo(x-vs,y+hs);
  ctx.lineTo(x,y);
  draw();
}

function drawline(x1,y1,x2,y2){
  /*
  Draws a line between two points
  */

  ctx.beginPath();
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
  draw();
}

function drawang(x,y,len,ang){
  /*
  Draws a line from a point in an angle
  x,y: Starting point
  len: Lenght of the line
  ang: Angle of the line (rads)
  */

  // Calculate displacement from angle and len
  xd=Math.sin(ang)*len;
  yd=Math.cos(ang)*len;
  drawline(x,y,x+xd,y+yd);

}

function bezier(y,text,step,speed){
  /*
  Scrolls a text using a bezier curve
  y: height
  text: sting to display
  step: clock signal
  speed: how fast the thing goess
  */

  ctx.beginPath();
  // Show curve path
  ctx.moveTo(600, y);
  ctx.bezierCurveTo(0, y-50, 600, y-50, 0, y);
  draw();
}

function sinescroll(y,text,step,speed,oscil,space){
  /*
  Scrolls a text using sins and damnation
  y: heigth
  text: string to scroll
  step: clock signal
  speed: integer. Higher is faster. Recommended 2
  oscil: vertical oscilation. Recommended font height
  space: separation between letters. Recommended font size
  */

  for (i=0; i<text.length; i++){
    ctx.fillText(text[i],700+(space*i)-step*speed,y+(oscil*Math.sin((610+i)-step/4)));}
  draw();  
}

function tunnel(x,y,rad,step){
  /*
  Draws a tunnel-like effect
  x,y: position
  rad: Tunnel radius
  step: clock signal
  */

  ctx.beginPath();
  stepper=(step/7)%5;
  step=step/4;
  for (i=1;i<30;i++){
    drawsphere(
      x+60*Math.sin(cycle/3)+i/60*Math.sin(Math.PI/5)*600*Math.sin(step+(i*Math.PI/524)/(Math.PI/40)),
      y+60*Math.cos(cycle/4)+i/60*Math.sin(Math.PI/5)*600*Math.cos(step+(i*Math.PI/524)/(Math.PI/40)),
      rad*stepper*(1+(i/3)));
  }
  draw();
}

function raytrace(x1,y1,x2,y2,speed,trace,tracecol,step){
  /*
  Draws a fast-moving particle that leaves a trail
  x1,y1: Initial position
  x2,y2: Final position
  speed: Steps to completion
  tracecol: Colour of the trace
  step: Clock signal
  */

  // Draw leading segment
  ctx.beginPath();
  ctx.strokeStyle="black";
  drawline(
    x1+(step)*((x2-x1)/speed),
    y1+(step)*((y2-y1)/speed),
    x1+(step+1)*((x2-x1)/speed),
    y1+(step+1)*((y2-y1)/speed)
  );

  // Draw trace
  // TO-DO transparency depending on cycles
  // if step>speed: transp=5*(step-spd) #Per cent
  if (trace==1){
    ctx.beginPath();
    ctx.strokeStyle=tracecol;
    drawline(
      x1,
      y1,
      x1+(step)*((x2-x1)/speed),
      y1+(step)*((y2-y1)/speed)
    );
    draw();
    ctx.strokeStyle="black";
  }
  draw();
}

function sunsetdrive(step){
/* 
Draws a sunset drive scene (credits?)
step: clock signal

Warning: Clears everything below the horizon
*/

  raycycle=cycle%10;
  suncycle=cycle%150;
  sunxpos=100+300*Math.sin(suncycle*Math.PI/170);
  sunypos=425-300*Math.sin(suncycle*Math.PI/80);

  // Draw background sky, guessing colour from sun position
  ctx.beginPath();
  if (sunypos>450){         // Night (Set sky colour and city lights)
    grad=ctx.createRadialGradient(300,550,1,300,550,250);
    grad.addColorStop(0,"white");
    grad.addColorStop(1,"black");
    ctx.fillStyle=grad
  }       
  else if (sunypos>300){    // Sunset (Calculate sky colour, modify transparency)
    grad=ctx.createRadialGradient(300,900,10,300,900,900);
    grad.addColorStop(1, "blue");   
    grad.addColorStop(0, "red");
    ctx.fillStyle=grad
  }    
  else if (sunypos<300){    // Day (Do nothing because day is boring as fuck)
    ctx.fillStyle="blue";
  } 

  ctx.fillRect(0,0,600,400);
  // If night, add stars
  if (sunypos>450){}
  draw();



  // Draw mountains
  // TO-DO

  // Draw sun
  // Starts at -30,10 and moves down to 550,450
  // Sun ray test
  // for (i=1;i<=20;i++){
  //   drawang(sunxpos,sunypos,800,((Math.PI*i)+suncycle)/10);
  // }
  drawsphere(sunxpos,sunypos,30);
  ctx.fillStyle="yellow";
  ctx.fill();

  // Draw city
  ctx.beginPath();
  ctx.strokeStyle="gray";
  ctx.rect(255,370,15,30);
  ctx.rect(250,375,10,25);
  ctx.rect(265,373,13,27);
  ctx.rect(273,365,15,35);
  ctx.rect(268,380,30,20);
  ctx.rect(295,360,20,40);
  ctx.rect(325,365,15,35);
  ctx.rect(310,375,25,25);
  ctx.fillStyle="gray";
  ctx.fill();
  draw();

  // Cover sun if below the horizon
  ctx.beginPath();
  ctx.strokeStyle="black";
  ctx.clearRect(0,400,600,200)

  // Draw grass and road
  ctx.beginPath();
  ctx.fillStyle="green";
  ctx.moveTo(300,400);
  ctx.lineTo(600,600);
  ctx.lineTo(600,400);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(300,400);  
  ctx.lineTo(0,400);
  ctx.lineTo(0,600);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle="#555";
  ctx.beginPath();
  ctx.moveTo(300,400);
  ctx.lineTo(600,600);
  ctx.lineTo(0,600);
  ctx.closePath();
  ctx.fill();

  // Draw perspective lines
  drawline(0,400,600,400);
  drawline(300,400,0,600);
  drawline(300,400,600,600);

  // Draw road rays
  for (j=0;j<=4;j++){
    for (i=-10;i<=10;i++){
      raytrace(300,400,300+30*i,600,20,0,"green",raycycle+(5*j));
    }
  }
}

function draw(){

  ctx.stroke()
}

// TO-DO functions
//
// Stars
// Octopus thing (2D)
// Plasma
// Meatballs
// Tunnel (square)
// Seascape
//

// Iterator specs
cycle=1;
subcycles={"a":1,"b":1,"c":1}
scrh=500;
count="u";

// Main function
function main(){

  // Clear screen
  ctx.clearRect(0,0,600,600);

  // CUBE! (top view)
  // posx=300+(Math.sin(Math.PI*cycle/2.4*2/45+(Math.PI/4))*450)/2;
  // posy=300+(Math.cos(Math.PI*cycle/1.1*2/45+(Math.PI/4))*450)/2;
  // drawcube(posx,posy,100,Math.PI*(cycle)*2/45);

  // Tunnel
  //tunnel(300,300,10,cycle);

  // Drive scene
  sunsetdrive(cycle);

  // Traceray test
  // subcycles.c=cycle%50;
  // raytrace(0,300,600,300,10,1,"yellow",subcycles.c);

  // Scroller
  // if (subcycles.a>400){subcycles.a=0;scrh=50+Math.random()*500};
  // sinescroll(500,"sunset drive",subcycles.a,4,5,20);

  // Update cycle data
  cycle++;
  for (key in subcycles){subcycles[key]++;}

}

// Main function call
fps=60
setInterval(main,1000/fps)