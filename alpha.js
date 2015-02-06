var c=document.getElementById("alpha");
c.style.background="#000";
var ctx=c.getContext("2d");
ctx.canvas.width=600;
ctx.canvas.height=600;
ctx.fillStyle="white"
ctx.strokeStyle="white"
ctx.font="20px sans-serif bold";

function drawsphere(x,y,rad){
  /*
  Draws a sphere
  (x,y): coordinates, rad: radius
  
  Note: Drawing a sphere requires loadsa resources.
  This code is pretty slow
  */

  ctx.beginPath();
  ctx.arc(x,y,rad,0,2*Math.PI,false);
  draw();
}

function drawcube(x,y,side,rot){
  /* 
  Draws a cube
  (x,y): coordinates of the "upper left" corner
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
// Use the same technique as in the starfield or snow
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

// TO-DO (Copypaste tunnel code with squares. Or maybe add parameter)
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

  // Draw alpha 0 line (For tests)
  ctx.strokeStyle="rgba(00,00,256,1)";
  drawline (0,y1-25,600,y1-25);

  // Draw leading segment
  ctx.beginPath();
  ctx.strokeStyle="black";
  drawline(
    x1+(step*((x2-x1)/speed)),
    y1+(step*((y2-y1)/speed)),
    x1+((step+1)*(x2-x1)/speed),
    y1+((step+1)*(y2-y1)/speed)
  );

  // Draw trace
  if (trace==1){
    ctx.beginPath();
    if (step>speed*2) {transp=0} else {transp=1}
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

function markcoords(x,y){
  /*
  Draws some fancy graphics indicating coordenates
  x,y: Position
  */

  drawsphere(x,y,15);
  drawline(x-15,y,x-20,y);
  drawline(x+20,y,x+15,y);
  drawline(x,y-15,x,y-20);
  drawline(x,y+20,x,y+15);
  drawline(x-10,y-10,x-20,y-20);
  drawline(x-20,y-20,x-70,y-20);
  ctx.font="8px sans-serif";
  ctx.fillText("X"+x,x-70,y-22);
  ctx.fillText("Y"+y,x-70,y-12);
  ctx.font="20px sans-serif bold";
}

function breaktitles(x,y,text,step){
  /*
  Generates a title screen that breaks over time
  x,y: Text position
  text: String to be shown
  step: clock signal
  */

  //if (step>70 && step<130) {step=97+(step/50)}
  for (i=0; i<text.length; i++){
    ctx.fillText(
      text[i],
      x-(2*Math.random()-1)*Math.abs(100-step)+(15*i),
      y-(2*Math.random()-1)*Math.abs(100-step)
    );
  }
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
  // Gradients are temporary tests
  // They are pretty slow. bugzilla <number>
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
  // Sun ray test (Keep disabled for now)
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
      raytrace(300,400,300+30*i,600,20,0,"AA","AA","AA",raycycle+(5*j));
    }
  }
}

function starfield(stars,speed,sstep){
  /*
  Draws a classy starfield. 
  stars: Number of stars
  speed: Clock multiplier
  step: Clock signal
  */

  step=sstep*speed

  //Create function for individual star
  function movestar(starobj){
    /*
    Moves a single star in a field. Similar to raytrace
    Assumes starting position is 300,300 (Center of screen)
    Increments the starobj internal step in 1
    starobj: object of the star being moved
    */

    // calculate X and Y coordinates
    starxsign=1
    starysign=1
    if (Math.cos(starobj.dir)<0){starxsign=-1}
    if (Math.sin(starobj.dir)<0){starysign=-1}
    
    starymax=300
    starxmax=300
    if (3*Math.PI/4<starobj.dir<5*Math.PI/4 || 7*Math.PI/4<starobj.dir<9*Math.PI/4) {starymax=Math.abs(400*Math.sin(starobj.dir))}
    if (1*Math.PI/4<starobj.dir<3*Math.PI/4 || 5*Math.PI/4<starobj.dir<7*Math.PI/4) {starxmax=Math.abs(400*Math.cos(starobj.dir))}

    starxpos=300+starxsign*starxmax*starobj.step/starobj.speed
    starypos=300+starysign*starymax*starobj.step/starobj.speed

    // Draw the star
    ctx.beginPath();
    ctx.fillRect(starxpos,starypos,1,1); 
    ctx.fill();

    // Incerment star step, reset position and randomize direction if out of field
    if (starobj.step<starobj.speed) {starobj.step=starobj.step+starobj.step/starobj.speed*2;}
    else {
      starobj.speed=50+20*Math.random();
      starobj.step=Math.random()*starobj.speed;
      starobj.dir=2*Math.random()*Math.PI
    }
  }

  // Create a pool of N stars in random positions
  // Stars are object with speed, step and direction (rad)
  if (sstep==1){
    starsobj={size:0}
    for (i=0; i<stars; i++){
      starsobj[i]={"speed":(50+20*Math.random()),"dir":2*Math.random()*Math.PI}
      // Make the star start at a random point
      starsobj[i].step=Math.random()*starsobj[i].speed
      starsobj.size++
    }
  };

  // Advance all the stars
  for (i=0; i<starsobj.size; i++){
    movestar(starsobj[i]);
  }

}

// TO-DO
function octopus(step){
  /*
  Draws a plasma octopus thing
  step: clock signal
  */

  drawsphere(300,300,40);
  //for (i=0; i<8){
    // calculate initial and final coordinates
    // draw sine waves
    //drawline(xspos,yspos,xfpos,yfpos)
  //}
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
function torsion(step){
  /*
  Draws some twisting bars
  step: Clock signal
  */

  // Calculate side face separation
  // Draw straight lines
  // Draw bezier curves joining lines
  // ??? 
}

function snow(step){
  /*
  Draws some falling snow
  step: Clock signal
  Coded during FOSDEM. Better souvenir than an actual snowball
  */

  snowdropn=700
  
  // Move each drop individually
  function movedrop(snowdrop){
    ctx.fillRect(
      snowdrop.x-snowdrop.plane*1*snowdrop.snowstep+25*Math.sin(snowdrop.snowstep*Math.PI/32),
      snowdrop.snowstep*snowdrop.plane,
      2,2 // Snow drop size
    )
    if (snowlist[i].snowstep*snowlist[i].plane>600){snowlist[i].snowstep=0}
    else {snowlist[i].snowstep++}
  }
  
  // Create pool of snow drops
  if (step==1){
    snowlist={"size":0}
    for (i=0; i<snowdropn; i++){
      snowlist[i]={"x":Math.random()*1200,"plane":1+Math.floor(Math.random()*7)};
      snowlist[i].snowstep=Math.random()*600/snowlist[i].plane      
      snowlist.size++
    }
  //console.log("snow initialized. Drop count "+snowlist.size)
  }
  // Draw drops based on position(x), step and plane
  for (i=0; i<snowdropn; i++){movedrop(snowlist[i]);}
}

// TO-DO
function seascape(step){
  /*
  Draws a seascape
  step: clock signal
  */

  // Move waves
  // Paint highlights
  // Paint sun/reflections
}

function draw(){

  ctx.stroke()
}

// Sync stuff

bpm=150;
beat=0;
beatpool=0;

function updatebeat(){
  /*
  Updates the beat counter from the current and previous unix time
  Beatpool is a pool of milliseconds. When it gets to a level, 
  beat increases.
  */

  currentdate=new Date();
  utime=currentdate.getTime();
  beatpool=beatpool+(utime-lastdate);
  lastdate=utime;
  if (beatpool>(1000*5/fps*6)-118){
    beatpool=0;
    beat=beat+1;
  }
  ctx.fillText(beat+"/"+cycle+"/"+subcycle,20,20);
}

// Iterator specs

fps=60;
subcycle=1
scrh=500;
cycle=1;
count="u";

// Sync vars
eventinit=0;
pauseinit=0;
eff1init=0;

function main(){
  /*
  Main function
  */

  // Clear screen
  ctx.clearRect(0,0,600,600);
  ctx.fillStyle="white"
  ctx.strokeStyle="white"

  // Effect testing

  // [OK] CUBE! (top view)
  // posx=300+(Math.sin(Math.PI*cycle/2.3*2/45+(Math.PI/4))*425)/2;
  // posy=300+(Math.cos(Math.PI*cycle/1.3*2/45+(Math.PI/4))*425)/2;
  // drawcube(posx,posy,100,Math.PI*(cycle)*2/45);

  // [Kräp] Tunnel
  // tunnel(300,300,10,cycle);

  // [WIP, gradient lag] Drive scene
  // sunsetdrive(cycle);

  // [Tranparency weirdness] Traceray test
  // subcycles.c=cycle%100;
  // raytrace(0,300,600,300,10,1,0,128,255,subcycles.c);

  // [Meh] Starfield
  // subcycles.d=cycle;
  // starfield(300,1,subcycles.d);

  // [OK] Snow scene
  // snow(cycle);
  
  // [WIP] Octopus
  //octopus(cycle);

  // Text display tests
  // [Nope] Bezier scroll
  // bezier(250,"bezier text",40,10,cycle%100);

  // [Close enough] Double breaktitles
  // subcycles.e=cycle%300;
  // if (subcycles.e<=150){
  //   breaktitles(240,375,"SAMPLE",subcycles.e);
  // }
  // else if (subcycles.e>150){
  //   breaktitles(240,375,"TEXT",subcycles.e%150);
  // }

  // [Looks weird] Scroller
  // if (subcycles.a>400){subcycles.a=0;scrh=50+Math.random()*500};
  // sinescroll(500,"Greetings to test subjects 023 to 091",subcycles.a,4,5,20);

  // Update cycle data
  // draw();

  // Actual demo 

  // Intro
  if (beat<32){
    starfield(300,1,subcycle);
  }

  // Event reference
  else if (beat>=32 && beat<65){
    if (beat==32 && eventinit==0){subcycle=1;eventinit=1};
    snow(subcycle);
  }

  // Pause
  else if (beat>=65 && beat<81){
    if (beat==65 && pauseinit==0){subcycle=1;pauseinit=1};
    ctx.fillText("THIS IS A PAUSE",250,300);
  }

  // Effect1
  else if (beat>=81 && beat<98){
    if (beat==85 && eff1init==0){subcycle=1;eff1init=1};
    posx=300+(Math.sin(Math.PI*cycle/2.3*2/45+(Math.PI/4))*425)/2;
    posy=300+(Math.cos(Math.PI*cycle/1.3*2/45+(Math.PI/4))*425)/2;
    drawcube(posx,posy,100,Math.PI*(cycle)*2/45);
  }



  updatebeat();
  cycle++;
  subcycle++
}

// Other functions for menus and shit

function demo(ev){
  last_click={"x":ev.clientX-c.offsetLeft+window.scrollX,"y":ev.clientY+window.scrollY-c.offsetTop};
  if (last_click.y>250 && last_click.y<350){
    c.removeEventListener("mousedown",demo);
    console.log("starting demo");
    clearInterval();
    tempdate=new Date();
    lastdate=tempdate.getTime();
    track.play();
    setInterval(main,1000/fps);
  }
}

function menu(){
  menuc=0;
  done=0;
  ctx.fillStyle="white"
  ctx.fillText("LOADERING",250,310);
  track=new Audio("achifaifa.wav");
  track.src="./achifaifa.wav";
  track.load();
  ctx.clearRect(0,0,600,600);
  drawline(0,250,600,250);
  drawline(0,350,600,350);
  ctx.fillText("PLAY",225,310);
  done=1;

  c.addEventListener("mousedown",demo,false)
}


// Main function call
menu()


