var c=document.getElementById("alpha");
c.style.background="#000";
var ctx=c.getContext("2d");
ctx.canvas.width=600;
ctx.canvas.height=600;
ctx.fillStyle="white"
ctx.strokeStyle="white"
ctx.font="25px sans-serif bold";

function drawsphere(x,y,rad){
  /*
  Draws a sphere
  (x,y): coordinates, rad: radius
  
  Note: Drawing a sphere requires loadsa resources.
  This code is pretty slow
  */

  ctx.beginPath();
  ctx.arc(x,y,rad,0,6.29,false);
  draw();
}

// used
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

// used
function threedcube(colour,step){
  /*
  Draws an actual rotating 3D cube

  step: clock signal
  colours: colours a side of the cube (0: off, 1-6: sides)

  Position fixed to 300,300 and size fixed to 100
   Define a cube with an array of points
      
       1------2
       |\     |\
       | 4----|-3
       | |    | |
       5-|----6 |
        \|     \|
         8------7
  */

  rotcubex=300
  rotcubey=300
  rotcubes=100
  // Draw moving points
  cubepoint1=[rotcubex+Math.cos(step*Math.PI/90)*100,       rotcubey-rotcubes*3/5+Math.sin(step*Math.PI/90)*30];
  cubepoint2=[rotcubex+Math.cos((step+45)*Math.PI/90)*100,  rotcubey-rotcubes*3/5+Math.sin((step+45)*Math.PI/90)*30];
  cubepoint3=[rotcubex+Math.cos((step+90)*Math.PI/90)*100,  rotcubey-rotcubes*3/5+Math.sin((step+90)*Math.PI/90)*30];
  cubepoint4=[rotcubex+Math.cos((step+135)*Math.PI/90)*100, rotcubey-rotcubes*3/5+Math.sin((step+135)*Math.PI/90)*30];
  cubepoint5=[cubepoint1[0],cubepoint1[1]+125];
  cubepoint6=[cubepoint2[0],cubepoint2[1]+125];
  cubepoint7=[cubepoint3[0],cubepoint3[1]+125];
  cubepoint8=[cubepoint4[0],cubepoint4[1]+125];
  drawline(cubepoint1[0],cubepoint1[1],cubepoint2[0],cubepoint2[1]);
  drawline(cubepoint2[0],cubepoint2[1],cubepoint3[0],cubepoint3[1]);
  drawline(cubepoint3[0],cubepoint3[1],cubepoint4[0],cubepoint4[1]);
  drawline(cubepoint4[0],cubepoint4[1],cubepoint1[0],cubepoint1[1]);
  drawline(cubepoint5[0],cubepoint5[1],cubepoint6[0],cubepoint6[1]);
  drawline(cubepoint6[0],cubepoint6[1],cubepoint7[0],cubepoint7[1]);
  drawline(cubepoint7[0],cubepoint7[1],cubepoint8[0],cubepoint8[1]);
  drawline(cubepoint8[0],cubepoint8[1],cubepoint5[0],cubepoint5[1]);
  drawline(cubepoint1[0],cubepoint1[1],cubepoint5[0],cubepoint5[1]);
  drawline(cubepoint2[0],cubepoint2[1],cubepoint6[0],cubepoint6[1]);
  drawline(cubepoint3[0],cubepoint3[1],cubepoint7[0],cubepoint7[1]);
  drawline(cubepoint4[0],cubepoint4[1],cubepoint8[0],cubepoint8[1]);

  if (colour==1){
    ctx.beginPath();
    ctx.moveTo(cubepoint1[0],cubepoint1[1]);
    ctx.lineTo(cubepoint2[0],cubepoint2[1]);
    ctx.lineTo(cubepoint3[0],cubepoint3[1]);
    ctx.lineTo(cubepoint4[0],cubepoint4[1]);
    ctx.lineTo(cubepoint1[0],cubepoint1[1]);
    ctx.fill();
  }
  if (colour==2){
    ctx.beginPath();
    ctx.moveTo(cubepoint5[0],cubepoint5[1]);
    ctx.lineTo(cubepoint6[0],cubepoint6[1]);
    ctx.lineTo(cubepoint7[0],cubepoint7[1]);
    ctx.lineTo(cubepoint8[0],cubepoint8[1]);
    ctx.lineTo(cubepoint5[0],cubepoint5[1]);
    ctx.fill();
  }
  if (colour==3){
    ctx.beginPath();
    ctx.moveTo(cubepoint2[0],cubepoint2[1]);
    ctx.lineTo(cubepoint3[0],cubepoint3[1]);
    ctx.lineTo(cubepoint7[0],cubepoint7[1]);
    ctx.lineTo(cubepoint6[0],cubepoint6[1]);
    ctx.lineTo(cubepoint2[0],cubepoint2[1]);
    ctx.fill();
  }
  if (colour==4){
    ctx.beginPath();
    ctx.moveTo(cubepoint1[0],cubepoint1[1]);
    ctx.lineTo(cubepoint4[0],cubepoint4[1]);
    ctx.lineTo(cubepoint8[0],cubepoint8[1]);
    ctx.lineTo(cubepoint5[0],cubepoint5[1]);
    ctx.lineTo(cubepoint1[0],cubepoint1[1]);
    ctx.fill();
  }
  if (colour==5){
    ctx.beginPath();
    ctx.moveTo(cubepoint1[0],cubepoint1[1]);
    ctx.lineTo(cubepoint2[0],cubepoint2[1]);
    ctx.lineTo(cubepoint6[0],cubepoint6[1]);
    ctx.lineTo(cubepoint5[0],cubepoint5[1]);
    ctx.lineTo(cubepoint1[0],cubepoint1[1]);
    ctx.fill();
  }
  if (colour==6){
    ctx.beginPath();
    ctx.moveTo(cubepoint2[0],cubepoint2[1]);
    ctx.lineTo(cubepoint3[0],cubepoint3[1]);
    ctx.lineTo(cubepoint7[0],cubepoint7[1]);
    ctx.lineTo(cubepoint6[0],cubepoint6[1]);
    ctx.lineTo(cubepoint2[0],cubepoint2[1]);
    ctx.fill();
  }
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

// used
function bezierscroll(y,text,step){
  /*
  Scrolls a text using a bezier curve

  y: height
  text: sting to display
  step: clock signal
  */

  function updatebezpos(y,step){
    /*
    Gets bezier coordinates from y position and step
    */
    beziert=step*0.01
    bezierxpos=600*(1-beziert)*(Math.pow(1-beziert,2)+3*Math.pow(beziert,2))
    bezierypos=y*(Math.pow(1-beziert,3)+Math.pow(beziert,3))+(y-100)*3*(beziert-Math.pow(beziert,2))
  }

  // Just in case
  ctx.beginPath();
  // Get positions and draw stuff in them
  for (i=0; i<text.length; i++){
    updatebezpos(y,step-(i*5))
    ctx.fillText(text[i],bezierxpos,bezierypos);
  }
}

// used
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

// used
function bouncescroll(y,text,step,oscil){
  /*
  Same as sinescroll, but bouncing

  y: heigth
  text: string to scroll
  step: clock signal
  oscil: vertical oscilation. Recommended font height
  */

  for (i=0; i<text.length; i++){
    ctx.fillText(text[i],620-(step-(i*10))*2,y-Math.abs(oscil*Math.sin((step-(i*10))/12)));
  }
}

// TO-DO: Fix continuity
tunnelpool=[]
function tunnel(x,y,type,step){
  /*
  Draws a tunnel-like effect

  x,y: position
  type: geometry of the sections
    1.- round
    4.- square
  step: clock signal

  The type of the tunnel defines the shape of new sections being generated, 
  not the shape of the entire tunnel
  */

  step=step%10

  // If there are less than 20 sections, add a new one
  if (tunnelpool.length<=21){
    tunnelpool.push({"shapev":type, "secstep":1})
  }

  for (i=0; i<tunnelpool.length; i++){
    sectionsize=Math.pow(tunnelpool[i].secstep,2);
    if (tunnelpool[i].shapev==1){
      drawsphere(x,y,sectionsize) 
    }
    if (tunnelpool[i].shapev==4){
      drawcube(x-sectionsize/8,y-sectionsize/8,sectionsize,0)
    }
    tunnelpool[i].secstep++
    if (sectionsize>500){
      tunnelpool.splice(i,i)
    }
  }
}

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
  if (step<speed){
    ctx.beginPath();
    drawline(
      x1+(step*((x2-x1)/speed)),
      y1+(step*((y2-y1)/speed)),
      x1+((step+1)*(x2-x1)/speed),
      y1+((step+1)*(y2-y1)/speed)
    );
  }

  // Draw trace
  if (trace==1){
    ctx.beginPath();

    // Define trace transparency
    if (step>speed) {
      transp=-0.1+(5/(step-speed));
    } 
    else {
      transp=1;
    }

    // Define strokeStyle, draw trace
    ctx.strokeStyle="rgba("+R+","+G+","+B+","+transp+")";
    tracexoffs=(step)*((x2-x1)/speed);
    if (step>=speed){tracexoffs=x2-x1}
    traceyoffs=(step)*((y2-y1)/speed);
    if (step>=speed){traceyoffs=y2-y1}
    drawline(
      x1,
      y1,
      x1+tracexoffs,
      y1+traceyoffs
    );
    draw();
  }
  draw();
}

function markcoords(x,y){
  /*
  Draws some fancy graphics indicating coordenates
  x,y: Position
  */

  //sphere
  drawsphere(x,y,15);
  //crosshairs
  drawline(x-15,y,x-20,y);
  drawline(x+20,y,x+15,y);
  drawline(x,y-15,x,y-20);
  drawline(x,y+20,x,y+15);
  //indicators
  drawline(x-10,y-10,x-20,y-20);
  drawline(x-20,y-20,x-115,y-20);
  //coord text
  ctx.font="8px sans-serif";
  ctx.fillText("X"+x,x-115,y-22);
  ctx.fillText("Y"+y,x-115,y-12);
  ctx.font="20px sans-serif bold";
}

// used
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
      x-(2*Math.random()-1)*Math.abs(100-step)+(20*i),
      y-(2*Math.random()-1)*Math.abs(100-step)
    );
  }
}

// TO-DO: fix 'gradients', improve continuity, make it not suck
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
  ctx.fillStyle="black"
  for (j=0;j<=4;j++){
    for (i=-10;i<=10;i++){
      raytrace(300,400,300+30*i,600,20,0,"AA","AA","AA",raycycle+(5*j));
    }
  }
}

// used
function starfield(stars,speed,sstep,die){
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
    ctx.fillRect(starxpos,starypos,2,2); 
    ctx.fill();

    // Incerment star step, reset position and randomize direction if out of field
    if (starobj.step<starobj.speed) {starobj.step=starobj.step+starobj.step/starobj.speed*2;}
    else if (die==0){
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

laz0rcolours=["RED","GREEN","BLUE","YELLOW","PINK","#FABADA"]
laz0rstep="WTF";
function laz0r(step){
  /*
  Draws a random laser beam in the screen
  */

  // Pick start and end points
  if (laz0rstep!=step){
    laz0rx1=Math.random()*600
    laz0ry1=Math.random()*600
    laz0rx2=Math.random()*600
    laz0ry2=Math.random()*600
    laz0rstep=step
  }
  // Goto start point and draw a line
  ctx.beginPath();
  ctx.strokeStyle=laz0rcolours[Math.floor(Math.random()*4.4)];
  ctx.moveTo(laz0rx1,laz0ry1);
  ctx.lineTo(laz0rx2,laz0ry2);
  ctx.stroke();
  ctx.strokeStyle="white";
}

function laz0r2(x,y,colour,step){
  /*
  Draws whirling lasers

  step: clock signal
  */

  ctx.strokeStyle=colour;
  ctx.fill();
  for (i=0; i<40; i++){
    drawang(x,y,700,(4*step/Math.PI)+(i*Math.PI/20))
  }
  ctx.strokeStyle="white";
}

// TO-DO
function octopus(step){
  /*
  Draws a plasma octopus thing
  step: clock signal
  */

  rotation=0.02*step;
   
  for (i=0; i<8; i++){
    // Temporary straight lines
    //drawang(300,300,200,(i*Math.PI/4)+rotation);
    ctx.moveTo(0,600);
    ctx.bezierCurveTo(100*i,100,600,100*i,600,100*i);
    draw();

    // NOTE: Bezier curves are too slow
    // calculate initial and final coordinates
    // draw sine waves
  }
  // TO-DO: find a way of defining a direction (f(x)=ax+b)  
  // drawsphere(300,300,40);
  // ctx.fill();
}

// TO-DO
function plasma(step){
  /*
  Plasma effect

  step: clock signal
  */

  // I have no idea
}

// used
meatt=1.4;
meatgoo=0.95
function meatballs(step){
  /*
  meatball effect

  step: clock signal
  */

  ctx.fillStyle="whte"
  meatang=Math.PI*step/150;
  meatballA=[300+Math.cos(meatang*2.5)*150,300+Math.sin(meatang*2)*150];
  meatballB=[300+Math.sin(meatang*1.8)*150,300+Math.cos(meatang*2.0)*150];
  meatballC=[300+Math.sin(meatang+50*2)*150,300+Math.cos(meatang+50*1)*150];

  for (i=0; i<60; i++){
    for (j=0; j<60; j++){
      if ((50/Math.pow(Math.sqrt(Math.pow(meatballA[0]-j*10,2)+Math.pow(meatballA[1]-i*10,2)),meatgoo))+
          (40/Math.pow(Math.sqrt(Math.pow(meatballB[0]-j*10,2)+Math.pow(meatballB[1]-i*10,2)),meatgoo))+
          (40/Math.pow(Math.sqrt(Math.pow(meatballC[0]-j*10,2)+Math.pow(meatballC[1]-i*10,2)),meatgoo))>meatt){
        ctx.fillRect(j*10,i*10,10,10);
      }
    }
  }
}

// used
function firework(x1,y1,x2,y2,RR,GG,BB,pooln,step){
  /*
  Draws a firework

  x1, y1: Launch point
  x2, y2: Explosion point
  R,G,B: Colour of trace and explosion particles
  step: guess what this does

  To repeat it with different explosion patterns, use cycle%100
  */

  raytrace(x1,y1,x2,y2,15,1,RR,GG,BB,step);
  if (step==20){eval("partcycle"+pooln+"=0")}
  if (step>=20){
    particlexplosion(x2,y2,RR,GG,BB,pooln,eval("partcycle"+pooln));
    eval("partcycle"+pooln+"++");
  }
  if (step==99){eval("explpool"+pooln+"=[]")}
}

// used
function particlexplosion(x,y,R,G,B,pooln,step){
  /* 
  Draws an exploding thingy. 
  Combine with traceray for firework FX

  x,y: Position in canvas
  R, G, B: Colour
  step: clock signal
  */

  // If the pool is empty, fill it with particle objects
  // Each particle object has initial x and y speeds and 
  // a random start delay (from 0 to 10 cycles)
  if (eval("explpool"+pooln+".length==0")){
    for (i=0; i<100; i++){
      eval("explpool"+pooln+".push({ \
        'vs':(((-0.5+Math.random())/3)+((-0.5+Math.random())/3)+((-0.5+Math.random())/3))*6, \
        'hs':(((-0.5+Math.random())/3)+((-0.5+Math.random())/3)+((-0.5+Math.random())/3))*6, \
        'die':20+Math.random()*50})");
    }
  }

  // Draw particle function
  function drawexpart(object, step){
    if (object.die>step){
      expartxpos=x+object.hs*step;
      expartypos=y+object.vs*step;
      ctx.fillRect(expartxpos,expartypos,2,2)
    }
  }

  // For each particle, check if it's their time 
  // If it is (Or the delay is set to 999 to show they are
  // already moving), draw them
  ctx.fillStyle="rgba("+R+","+G+","+B+",1)";
  for (i=0; eval("i<explpool"+pooln+".length"); i++){
    eval("drawexpart(explpool"+pooln+"[i],step)");
  }
  ctx.fillStyle="white"
}

// used
function torsion(step){
  /*
  Draws some twisting bars
  step: Clock signal
  */

  tpost1=[250+Math.cos((step+(20*Math.sin(Math.PI*cycle/30)))*Math.PI/90)*100,       250-100*3/5+Math.sin(step*Math.PI/90)*30];
  tpost2=[250+Math.cos((step+45+(20*Math.sin(Math.PI*cycle/30)))*Math.PI/90)*100,  250-100*3/5+Math.sin((step+45)*Math.PI/90)*30];
  tpost3=[250+Math.cos((step+90+(20*Math.sin(Math.PI*cycle/30)))*Math.PI/90)*100,  250-100*3/5+Math.sin((step+90)*Math.PI/90)*30];
  tpost4=[250+Math.cos((step+135+(20*Math.sin(Math.PI*cycle/30)))*Math.PI/90)*100, 250-100*3/5+Math.sin((step+135)*Math.PI/90)*30];
  tposb1=[250+Math.cos((step+22+(20*Math.cos(Math.PI*cycle/50)))*Math.PI/90)*100,  350-100*3/5+Math.sin((step+22)*Math.PI/90)*30];
  tposb2=[250+Math.cos((step+67+(20*Math.cos(Math.PI*cycle/50)))*Math.PI/90)*100,  350-100*3/5+Math.sin((step+67)*Math.PI/90)*30];
  tposb3=[250+Math.cos((step+112+(20*Math.cos(Math.PI*cycle/50)))*Math.PI/90)*100, 350-100*3/5+Math.sin((step+112)*Math.PI/90)*30];
  tposb4=[250+Math.cos((step+157+(20*Math.cos(Math.PI*cycle/50)))*Math.PI/90)*100, 350-100*3/5+Math.sin((step+157)*Math.PI/90)*30];

  for (i=1; i<=4; i++){
    // Top segments
    eval("drawline(tpost"+i+"[0], 0,   tpost"+i+"[0], tpost"+i+"[1])");
    eval("drawline(tposb"+i+"[0], 600, tposb"+i+"[0], tposb"+i+"[1])");
    eval("ctx.moveTo(tpost"+i+"[0],tpost"+i+"[1])");
    eval("ctx.bezierCurveTo(tpost"+i+"[0],tpost"+i+"[1]+50,tposb"+i+"[0],tposb"+i+"[1]-50,tposb"+i+"[0],tposb"+i+"[1])")
    draw();
  }

  // Joint

  // ctx.moveTo(xtpos,ytpos);
  // ctx.bezierCurveTo(xtpos,ytpos+50,xbpos+25,ybpos-25,xbpos+25,ybpos);
  // draw();
  // ctx.moveTo(xtpos+50,ytpos)
  // ctx.bezierCurveTo(xtpos+50,ytpos+50,xbpos+75,ybpos-25,xbpos+75,ybpos);
  // draw();
  // // Botton segment
  // drawline(xbpos+25,ybpos,xbpos+25,ybpos+600);
  // drawline(xbpos+75,ybpos,xbpos+75,ybpos+600);
}

// used
function snow(step,stop){
  /*
  Draws some falling snow
  step: Clock signal
  Coded during FOSDEM. Better souvenir than an actual snowball
  */

  snowdropn=666
  
  // Move each drop individually
  function movedrop(snowdrop){
    ctx.fillRect(
      snowdrop.x-snowdrop.plane*1*snowdrop.snowstep+25*Math.sin(snowdrop.snowstep*Math.PI/32),
      snowdrop.snowstep*snowdrop.plane,
      2,2 // Snow drop size
    )
    if (snowlist[i].snowstep*snowlist[i].plane>600 && stop==0){snowlist[i].snowstep=0}
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

// used
function gelogo(){
  /*
  Draws the GE logo with the \o/ dudes
  */

  ctx.font="50px sans-serif bold";
  ctx.fillStyle="blue";
  ctx.fillText("\\O/",286,250);
  ctx.font="40px sans-serif bold";
  ctx.fillStyle="green";
  ctx.fillText("\\O/",260,290);
  ctx.fillStyle="red";
  ctx.fillText("\\O/",330,290);
  ctx.font="20px sans-serif bold";
  ctx.fillStyle="blue";
  ctx.fillText("\\O/",250,315);
  ctx.fillStyle="orange";
  ctx.fillText("\\O/",290,315);
  ctx.fillStyle="purple";
  ctx.fillText("\\O/",330,315);
  ctx.fillStyle="green";
  ctx.fillText("\\O/",370,315);
  ctx.font="25px sans-serif";
  ctx.fillStyle="white";
  ctx.fillText("GIPUZKOA",247,345);
  ctx.font="25px sans-serif bold";
  ctx.fillText("encounter",247,362);
  ctx.font="45px sans-serif";
  ctx.fillText("9",375,362)
  ctx.font="25px sans-serif bold";
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
  // Beat printing for syncing and debugging
  ctx.fillText(beat+"/"+cycle+"/"+subcycle,20,20);
}

// Iterator specs
fps=60;
cycle=1;
subcycle=1;
backwards=0;
scrh=500;
noclear=0;
count="u";
prevbeat=1;

// Sync vars
introinit=0;
eventinit=0;
cubeinit=0;
tunninit=0;
tunn2init=0;
meattext=0;
greettext=0;
explinit=0;
firewinit=0;
torsioninit=0;

// Testing
test=1;

// Effect vars
for (i=0; i<26; i++){
  eval("explpool"+(i+1)+"=[]");
  eval("partcycle"+(i+1)+"=0");
}
for (i=0; i<4; i++){
  eval("randexcoords"+(i+1)+"=[100+Math.random()*400,100+Math.random()*400]")
  eval("partlastbeat"+(i+1)+"=prevbeat")
}


function main(){
  /*
  Main function
  */

  // Clear screen
  if(noclear==0){ctx.clearRect(0,0,600,600);}
  ctx.fillStyle="white"
  ctx.strokeStyle="white"

  // Effect testing

  // Meatballs
  // meatballs(cycle);

  // Drive scene
  // sunsetdrive(cycle);

  // [WIP] Octopus
  // octopus(cycle);

  // [WIP] Torsion
  torsion(cycle);

  // [WIP] Tunnel
  // if (beat%4<=1){tunnel(300,300,1,cycle);}
  // if (beat%4>1){tunnel(300,300,4,cycle);}

  // Text display tests
  // [YEAH] Bezier scroll
  //bezierscroll(250,"BEZIER TEST !!1!eleven!",(cycle%300),1);
  // bouncescroll(550, "BOUNCE TEST",cycle,15);

  // Actual demo 
  if (test==0){
  
  // Intro
  if (beat<32){
    if (introinit==0){subcycle=1;introinit=1};
    if (beat<25) {
      starfield(300,1,subcycle,0);
    }
    else if (beat>=25) {
      starfield(300,1,subcycle,1)
    }
    if (beat<12){
      breaktitles(150,200,"Stage7",subcycle);
    }
    else if (beat<21){
      breaktitles(150,200,"Achifaifa",subcycle-200);
    }
    else if (beat>=21){
      breaktitles(150,275,"Present",subcycle-350);
    }
  }

  // Event reference
  else if (beat<81){
    if (eventinit==0){subcycle=1;eventinit=1};
    if (subcycle<200){sinescroll(100,"HTML5!",(subcycle*2),2,8,20);}
    if (subcycle<200){sinescroll(150,"Tracker magic",(subcycle*3)-100,2,10,20);}
    if (subcycle<250){sinescroll(200,"JS!",(subcycle*2)-200,3,8,20); }
    if (subcycle<320){sinescroll(250,"Canvas powered!",(subcycle*2)-150,2,5,20); }
    if (subcycle<280){sinescroll(300,"Demoscene in your browser!",(subcycle*3)-225,2,7,20);}
    if (subcycle>200){
      sinescroll(200,"Made with      for",(subcycle*1.3)-270,2,5,20);
      ctx.fillStyle="red";
      sinescroll(200,"          love",(subcycle*1.3)-270,2,5,20);
      ctx.fillStyle="white";
    }
    if (beat>=79){
      if (cycle%2==0){
        ctx.fillStyle="black";
        c.style.background="#FFF";
      }
      else if (cycle%2!=0){
        ctx.fillStyle="white";
        c.style.background="#000";
      }
      ctx.font="50px bold"
      ctx.fillText("BRING",100,400);
      ctx.fillText("DEMOS",250,450);
      ctx.fillText("BACK",325,500);
      ctx.font="20px sans-serif bold";
      ctx.fillStyle="white";
      c.style.background="#000";
    }
    if (beat<60) {snow(subcycle,0);}
    else {
      snow(subcycle,1);
      if (beat>63){
        gelogo();
      }
    }
  }

  // Cube sequence
  else if (beat<146){
    if (cubeinit==0){subcycle=1;cubeinit=1};
    posx=300+(Math.sin(Math.PI*cycle/2.3*2/45+(Math.PI/4))*425)/2;
    posy=300+(Math.cos(Math.PI*cycle/1.3*2/45+(Math.PI/4))*425)/2;
    drawcube(posx,posy,100,Math.PI*(cycle)*2/45);
    sinescroll(500,"Rotating cubes!                                 (Top view)",subcycle,4,5,20);
    if (beat>=96){
      posxx=300+(Math.sin(Math.PI*(cycle+100)/2.3*2/45+(Math.PI/4))*425)/2;
      posyy=300+(Math.cos(Math.PI*(cycle+100)/3.4*2/45+(Math.PI/4))*425)/2;
      drawcube(posxx,posyy,100,Math.PI*(cycle+100)*2/45);
      if (beat>=105 && beat<113){
        threedcube(0,cycle);
      }
      else if (beat>=113 && beat<130){
        if (prevbeat!=beat){
          cubefill=laz0rcolours[Math.floor(Math.random()*laz0rcolours.length)];
          cubeside=Math.floor(1+Math.random()*6.9);
        }
        ctx.fillStyle=cubefill;
        threedcube(cubeside,cycle);
        prevbeat=beat;
        ctx.fillStyle="white";
      }
      else if (beat>=130){
        threedcube(0,cycle);
        noclear=1;
      }
    }
  }

  // Explosions
  else if (beat<=178){
    if (explinit==0){
      subcycle=1;
      explinit=1;
      noclear=0;
    }
    
    if (beat%4==3 && partlastbeat1!=beat){
      randexcoords1=[100+Math.random()*400,100+Math.random()*400];
      partlastbeat1=beat;
    }
    else if (beat%4==0 && partlastbeat2!=beat){
      randexcoords2=[100+Math.random()*400,100+Math.random()*400];
      partlastbeat2=beat;
    }
    else if (beat%4==1 && partlastbeat3!=beat){
      randexcoords3=[100+Math.random()*400,100+Math.random()*400];
      partlastbeat3=beat;
    }
    else if (beat%4==2 && partlastbeat4!=beat){
      randexcoords4=[100+Math.random()*400,100+Math.random()*400];
      partlastbeat4=beat;
    }
    particlexplosion(randexcoords1[0],randexcoords1[1],256,000,000,1,cycle%96);
    particlexplosion(randexcoords2[0],randexcoords2[1],256,256,000,2,(cycle-24)%96);
    particlexplosion(randexcoords3[0],randexcoords3[1],000,256,256,2,(cycle-48)%96);
    particlexplosion(randexcoords4[0],randexcoords4[1],256,000,256,2,(cycle-72)%96);
    if (beat>162){
      if (torsioninit==0){subcycle=1;torsioninit=1};
      torsion(subcycle);
      bouncescroll(500,"Ghetto torsion bar",subcycle*2,15)
    }
  }

  // Meatballs
  else if (beat<214){
    meatballs(cycle);
    if (beat>196){
      if (meattext==0){subcycle=1;meattext=1};
      bouncescroll(550,"Code + music(.nsf) < 64kB !!!               ;P",subcycle*2,20)
    }
  }

  else if (beat<215){}

  // Slow part (credits/greetings)
  else if (beat<245){
    if (greettext==0){subcycle=1;greettext=1};
    bezierscroll(400,"Greetings to:",subcycle);
    bezierscroll(500,"PKT Team",subcycle-100);
    bezierscroll(200,"???????",subcycle-150);
    bezierscroll(300,"ASD",subcycle-200);
    bezierscroll(400,"Fairlight",subcycle-250);
    bezierscroll(550,"???????",subcycle-300);
    bezierscroll(300,"Farbrausch",subcycle-350);
    bezierscroll(200,"???????",subcycle-400);
    bezierscroll(500,"???????",subcycle-450);
    bezierscroll(300,"EKparty scene crew",subcycle-500);

  }

  // Buildup
  else if (beat<253){
    ctx.fillText("buildup",10,50);
  }

  // Lasers
  else if (beat<270){
    laz0r(Math.floor(cycle/5));
    laz0r2(500,100,"green",cycle);
    laz0r2(-10,400,"green",cycle);
    threedcube(cycle);
    if (beat%2==0){ctx.fillText("_(^o^\\)",265,300);}
    else if (beat%2==1){ctx.fillText("\\(^o^_)",265,300);}
  }

  
  else if (beat<285){
    laz0r(Math.floor(cycle/5));
    laz0r2(500,100,"green",cycle);
    laz0r2(-10,400,"green",cycle);
    meatballs(cycle);
  }

  // Fireworks
  else {
    if (firewinit==0){subcycle=1;firewinit=1};
    firework(000,600,100,100,256,000,000,1,cycle%150);
    firework(600,600,550,125,256,128,000,2,(cycle-40)%200);
    firework(250,600,225,200,000,000,256,3,(cycle-100)%175);
    firework(375,600,355,120,256,000,256,4,(cycle-75)%175);
    gelogo();
    if (beat>310){
      ctx.fillText("Yes, it's over",100,500);
      if (beat>330){
        ctx.fillText("Really!",275,500);
        if (beat>350){
          ctx.fillText("Go home already",200,550);
        }
      }
    }
  }

  }
  updatebeat();
  cycle++;
  subcycle++;
}

// Other functions for menus and shit

function demo(ev){
  last_click={"x":ev.clientX-c.offsetLeft+window.scrollX,"y":ev.clientY+window.scrollY-c.offsetTop};
  if (last_click.y>250 && last_click.y<350){
    c.removeEventListener("mousedown",demo);
    clearInterval();
    tempdate=new Date();
    lastdate=tempdate.getTime();
    if (test==0){track.play();}
    setInterval(main,1000/fps);
  }
}

function menu(){
  menuc=0;
  done=0;
  ctx.fillStyle="white"
  ctx.fillText("LOADERING",250,310);
  track=new Audio("alphasound.wav");
  track.src="./alphasound.wav";
  // TO-DO add callback to loader
  track.load();
  // ALT: wait 5-10 seconds 
  ctx.clearRect(0,0,600,600);
  drawline(0,250,600,250);
  drawline(0,350,600,350);
  ctx.fillText("PLAY",225,310);
  done=1;
  c.addEventListener("mousedown",demo,false)
}

// Main function call
menu()
