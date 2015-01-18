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

// TO-DO: WTF is this
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

// TO-DO: Fix continuity
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

// TO-DO
function sqtunnel(x,y,xsize,ysize,step){
  /*
  Draws a rectangular tunnel
  x,y: Position
  xsize, ysize: Horizontal and vertical size of the tunnel
  step: clock signal
  */
}

// TO-DO: Fix partial transparency
function raytrace(x1,y1,x2,y2,speed,trace,R,G,B,step){
  /*
  Draws a fast-moving particle that leaves a trail
  x1,y1: Initial position
  x2,y2: Final position
  speed: Steps to completion
  R,G,B: Colour of the trace
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
    if (step>speed*1.5) {transp=-0.1+(1/((step-speed)/8))+''} else {transp="1"}
    ctx.strokeStyle="rgba("+R+","+G+","+B+","+transp+")";
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

// TO-DO
function markcoords(x,y){
  /*
  Draws some fancy graphics indicating coordenates
  x,y: Position
  */
}

// TO-DO
function breaktitles(x,y,text,step){
  /*
  Generates a title screen that breaks over time
  x,y: Text position
  text: String to be shown
  step: clock signal
  */
}

// TO-DO: fix 'gradients', improve continuity
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
    // grad=ctx.createRadialGradient(300,550,1,300,550,250);
    // grad.addColorStop(0,"white");
    // grad.addColorStop(1,"black");
    // ctx.fillStyle=grad
    ctx.fillStyle="#000022"
  }       
  else if (sunypos>300){    // Sunset (Calculate sky colour, modify transparency)
    // grad=ctx.createRadialGradient(300,900,10,300,900,900);
    // grad.addColorStop(1, "blue");   
    // grad.addColorStop(0, "red");
    // ctx.fillStyle=grad
    ctx.fillStyle="red"
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

// TO-DO: star function, starfield generation, movement
function starfield(stars,speed,step){
  /*
  Draws a classy starfield. 
  stars: Number of stars
  speed: Number of steps from center to edge. Lower is faster
  step: Clock signal
  */

  //Create function for individual star
  function movestar(starobj,step){
    /*
    Moves a single star in a field. Similar to raytrace
    Assumes starting position is 300,300 (Center of screen)
    starobj: object of the star being moved
    step: clock signal
    */


    xd=Math.sin(ang)*len;
    yd=Math.cos(ang)*len;
    drawline(x,y,x+xd,y+yd);

    ctx.beginPath();
    ctx.strokeStyle="black";
    drawline(
      (step)*((x2-x1)/starobj.speed),
      (step)*((y2-y1)/starobj.speed),
      (step+1)*((x2-x1)/starobj.speed),
      (step+1)*((y2-y1)/starobj.speed)
    );
  }

  // Create a pool of N stars in random positions
  // Stars are object with speed, current position and direction (rad)
  if (step==1){
    starsobj={}
    for (i=0; i<stars; i++){
      starsobj[i]={"speed":(30+20*Math.random()),"dir":(360*Math.random()*Math.PI/180)}
      starsobj[i].step=Math.random()*starsobj[i].speed
      //console.log(starsobj[i].speed,starsobj[i].dir,starsobj[i].step)
    }
  }

  // Advance all the stars
  for (i=0; i<starsobj.size; i++){movestar(starsobj[i],step)}

  // Check stars. Redraw if out of screen
}

// TO-DO
function octopus(step){
  /*
  Draws a plasma octopus thing
  step: clock signal
  */
}

// TO-DO
function plasma(step){
  /*
  Plasma effect
  step: clock signal
  */
}

// TO-DO
function meatballs(number, step){
  /*
  meatball effect
  number: Number of balls
  step: clock signal
  */
}

// TO-DO
function seascape(step){
  /*
  Draws a seascape
  step: clock signal
  */
}

function draw(){

  ctx.stroke()
}

// Iterator specs
cycle=1;
subcycles={"a":1,"b":1,"c":1}
scrh=500;
count="u";

function main(){
  // Main function

  // Clear screen
  ctx.clearRect(0,0,600,600);

  // CUBE! (top view)
  // posx=300+(Math.sin(Math.PI*cycle/2.4*2/45+(Math.PI/4))*450)/2;
  // posy=300+(Math.cos(Math.PI*cycle/1.1*2/45+(Math.PI/4))*450)/2;
  // drawcube(posx,posy,100,Math.PI*(cycle)*2/45);

  // Tunnel
  //tunnel(300,300,10,cycle);

  // Drive scene
  // sunsetdrive(cycle);

  // Traceray test
  // subcycles.c=cycle%100;
  // raytrace(0,300,600,300,10,1,"0","128","255",subcycles.c);

  // Scroller
  // if (subcycles.a>400){subcycles.a=0;scrh=50+Math.random()*500};
  // sinescroll(500,"sunset drive",subcycles.a,4,5,20);

  // Starfield
  subcycles.d=cycle%200
  starfield(10,50,subcycles.d);

  // Update cycle data
  cycle++;
  for (key in subcycles){subcycles[key]++;}
}

// Main function call
fps=60
setInterval(main,1000/fps)