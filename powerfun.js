var c=document.getElementById("powerfun");
c.style.background="#000";
var ctx=c.getContext("2d");
ctx.canvas.width=600;
ctx.canvas.height=600;
ctx.fillStyle="white";
ctx.strokeStyle="white";
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
  dy=Math.sin(rot*side)/2
  dx=Math.cos(rot*side)/2
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

  // Position and size
  rotcubex=300
  rotcubey=300
  rotcubes=100
  // Draw moving points
  cubepoint1=[rotcubex+Math.cos(step*0.035)*100,       rotcubey-rotcubes*0.6+Math.sin(step*0.035)*30];
  cubepoint2=[rotcubex+Math.cos((step+45)*0.035)*100,  rotcubey-rotcubes*0.6+Math.sin((step+45)*0.035)*30];
  cubepoint3=[rotcubex+Math.cos((step+90)*0.035)*100,  rotcubey-rotcubes*0.6+Math.sin((step+90)*0.035)*30];
  cubepoint4=[rotcubex+Math.cos((step+135)*0.035)*100, rotcubey-rotcubes*0.6+Math.sin((step+135)*0.035)*30];
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

function octopus(x,y,step){
  /*
  Draws a tunnel-like effect

  x,y: position
  step: clock signal

  The type of the tunnel defines the shape of new sections being generated, 
  not the shape of the entire tunnel
  */

  tunnang=0.078*step

  prevtxpos=0;
  prevtypos=0;
  prevsectsize=0;

  for (i=1; i<15; i++){
    sectionsize=400-i*25;
    tunnxpos=x+100*(Math.sin(Math.cos(tunnang/400)*(tunnang+i/6)+Math.sin(tunnang+i/2)));
    tunnypos=y+100*(Math.cos(Math.sin(tunnang/400)*(tunnang+i/5)+Math.cos(tunnang+i/3)));
    if (prevtxpos!=0){
      drawline(prevtxpos,prevtypos-prevsectsize,tunnxpos,tunnypos-sectionsize);
      drawline(prevtxpos,prevtypos+prevsectsize,tunnxpos,tunnypos+sectionsize);
      drawline(prevtxpos-prevsectsize,prevtypos,tunnxpos-sectionsize,tunnypos);
      drawline(prevtxpos+prevsectsize,prevtypos,tunnxpos+sectionsize,tunnypos);
      drawline(prevtxpos-(2*prevsectsize/3),prevtypos-(2*prevsectsize/3),tunnxpos-(2*sectionsize/3),tunnypos-(2*sectionsize/3));
      drawline(prevtxpos+(2*prevsectsize/3),prevtypos+(2*prevsectsize/3),tunnxpos+(2*sectionsize/3),tunnypos+(2*sectionsize/3));
      drawline(prevtxpos-(2*prevsectsize/3),prevtypos+(2*prevsectsize/3),tunnxpos-(2*sectionsize/3),tunnypos+(2*sectionsize/3));
      drawline(prevtxpos+(2*prevsectsize/3),prevtypos-(2*prevsectsize/3),tunnxpos+(2*sectionsize/3),tunnypos-(2*sectionsize/3));
    }
    prevtxpos=tunnxpos;
    prevtypos=tunnypos;
    prevsectsize=sectionsize;
    // Draw the amoeba body
    // if (i==0){drawsphere(tunnxpos,tunnypos,20);}
  }
}

// Works like shit, except worse
function magglasstext(x,y,text,step){
  /*
  Allows you to travel back in time. You 
  are not even reading this, are you?

  y: date of travel
  x: type of vehicle
  text: text left behind in flaming letters
  step: speed of time travel
  */

  for (i=0; i<text.length; i++){
    xpos=600-10*step+i*20;
    fontsize=15+70*Math.sqrt(1/Math.abs(x-xpos));
    //fontsize=15;
    eval("ctx.font='"+fontsize+"px sans-serf bold'");
    ctx.fillText(text[i],xpos,y);
  }
  ctx.font="25px sans-serif bold";
}

function zoomscroll(y,text,step){
  /*
  Scrolls a text zooming in and out

  y: vertical position
  text: orfspgbafspdhao
  step:airsarsetnfefeir
  */

  for (i=0; i<text.length; i++){

    xpos=600-10*step+i*20;
    fontsize=15+Math.abs(20*Math.sin(0.01*xpos));
    eval("ctx.font='"+fontsize+"px sans-serf bold'");
    ctx.fillText(text[i],xpos,y);
  }
  ctx.font="25px sans-serif bold";
}

function normscroll(y,text,step){
  /*
  Scrolls a text normally

  Better for longer texts

  y: WHY
  text: yes
  step: forward
  */

  for (i=0; i<text.length; i++){
    xpos=600-5*step+i*20;
    ctx.fillText(text[i],xpos,y)
  }
}

function raytrace(x1,y1,x2,y2,trace,R,G,B,step){
  /*
  Draws a fast-moving particle that leaves a trail
  x1,y1: Initial position
  x2,y2: Final position
  trace: draw trace (0/1)
  R,G,B: Colour of the trace
  step: Clock signal
  */

  // Draw leading segment
  if (step<20){
    ctx.beginPath();
    drawline(
      x1+(step*((x2-x1)/20)),
      y1+(step*((y2-y1)/20)),
      x1+((step+1)*(x2-x1)/20),
      y1+((step+1)*(y2-y1)/20)
    );
  }

  // Draw trace
  if (trace==1){
    ctx.beginPath();

    // Define trace transparency
    if (step>20) {
      transp=-0.1+(5/(step-20));
    } 
    else {
      transp=1;
    }

    // Define strokeStyle, draw trace
    ctx.strokeStyle="rgba("+R+","+G+","+B+","+transp+")";
    tracexoffs=(step)*((x2-x1)/20);
    if (step>=20){tracexoffs=x2-x1}
    traceyoffs=(step)*((y2-y1)/20);
    if (step>=20){traceyoffs=y2-y1}
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
  sunxpos=100+300*Math.sin(suncycle*3.14/170);
  sunypos=425-300*Math.sin(suncycle*3.14/80);

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
  //   drawang(sunxpos,sunypos,800,((3.14*i)+suncycle)/10);
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

function starfield(stars,step,die){
  /*
  Draws a classy starfield. 
  stars: Number of stars
  step: Clock signal
  */

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
    if (2.355<starobj.dir<3.925 || 5.495<starobj.dir<7.075) {starymax=Math.abs(400*Math.sin(starobj.dir))}
    if (0.785<starobj.dir<2.355 || 3.925<starobj.dir<5.495) {starxmax=Math.abs(400*Math.cos(starobj.dir))}

    starxpos=300+starxsign*starxmax*starobj.step/starobj.speed
    starypos=300+starysign*starymax*starobj.step/starobj.speed

    // Draw the star
    starsize=1+(4*starobj.step/starobj.speed)
    ctx.beginPath();
    ctx.fillRect(starxpos,starypos,starsize,starsize); 
    ctx.fill();

    // Incerment star step, reset position and randomize direction if out of field
    if (starobj.step<starobj.speed) {starobj.step=starobj.step+starobj.step/starobj.speed*2;}
    else if (die==0){
      starobj.speed=50+20*Math.random();
      starobj.step=Math.random()*starobj.speed;
      starobj.dir=Math.random()*6.28
    }
  }

  // Create a pool of N stars in random positions
  // Stars are object with speed, step and direction (rad)
  if (step==1){
    starsobj={size:0}
    for (i=0; i<stars; i++){
      starsobj[i]={"speed":(50+20*Math.random()),"dir":2*Math.random()*3.14}
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

laz0rcolours=["RED","GREEN","BLUE","YELLOW","MAGENTA","CYAN","#FABADA"]
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
    drawang(x,y,700,(1.27*step)+(i*0.157))
  }
  ctx.strokeStyle="white";
}

// TO-DO
function plasma(step){
  /*
  Plasma effect

  step: clock signal
  */

  // I have no idea
}

meatt=1.4;
meatgoo=0.95
function meatballs(step){
  /*
  meatball effect

  step: clock signal
  */

  meatang=3.14*step/150;
  meatballA=[300+Math.cos(meatang*2.5)*150,300+Math.sin(meatang*2)*150];
  meatballB=[300+Math.sin(meatang*1.8)*150,300+Math.cos(meatang*2.0)*150];
  meatballC=[300+Math.sin(meatang+100)*150,300+Math.cos(meatang+50)*150];

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

function frenchname(step){
  /*
  Draws lissajous curves

  step: A small one for man...
  */

  step=step
  traildeg=step/10
  for (i=0; i<5; i++){
    frenchx=300+150*(Math.sin((step-i)/13)+Math.cos((step-i)/37));
    frenchy=300+150*(Math.cos((step-i)/10)+Math.sin((step-i)/10));
    eval("ctx.fillStyle='rgba("+Math.floor(128+128*Math.sin(traildeg+i))+","+Math.floor(128+128*Math.cos(traildeg+i/2))+","+Math.floor(128+128*Math.cos(traildeg+i/4))+",1)'")
    ctx.fillRect(frenchx,frenchy,5,5);
  }
  for (i=0; i<5; i++){
    frenchxi=300+150*(Math.sin((step-i)/10)+Math.cos((step-i)/23));
    frenchyi=300+150*(Math.cos((step-i)/4)+Math.sin((step-i)/15));
    eval("ctx.fillStyle='rgba("+Math.floor(128+128*Math.sin(traildeg+i))+","+Math.floor(128+128*Math.cos(traildeg+i/2))+","+Math.floor(128+128*Math.cos(traildeg+i/4))+",1)'")
    ctx.fillRect(frenchxi,frenchyi,5,5);
  }
  for (i=0; i<5; i++){
    frenchxi=300+150*(Math.sin((step-i)/20)+Math.cos((step-i)/10));
    frenchyi=300+150*(Math.cos((step-i)/25)+Math.sin((step-i)/4));
    eval("ctx.fillStyle='rgba("+Math.floor(128+128*Math.sin(traildeg+i))+","+Math.floor(128+128*Math.cos(traildeg+i/2))+","+Math.floor(128+128*Math.cos(traildeg+i/4))+",1)'")
    ctx.fillRect(frenchxi,frenchyi,5,5);
  }
  noclear=0
}

function firework(x1,y1,x2,y2,RR,GG,BB,pooln,step){
  /*
  Draws a firework

  x1, y1: Launch point
  x2, y2: Explosion point
  R,G,B: Colour of trace and explosion particles
  step: guess what this does

  To repeat it with different explosion patterns, use cycle%100
  */

  raytrace(x1,y1,x2,y2,1,RR,GG,BB,step);
  if (step==20){eval("partcycle"+pooln+"=0")}
  if (step>=20){
    particlexplosion(x2,y2,RR,GG,BB,pooln,eval("partcycle"+pooln));
    eval("partcycle"+pooln+"++");
  }
  if (step==99){eval("explpool"+pooln+"=[]")}
}

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

function torsion(step){
  /*
  Draws some twisting bars
  step: Clock signal
  */

  tpost1=[250+Math.cos((step+(15*Math.sin(0.1046*cycle)))*0.0348)*100,     190+Math.sin(step*0.0348)*30];
  tpost2=[250+Math.cos((step+45+(15*Math.sin(0.1046*cycle)))*0.0348)*100,  190+Math.sin((step+45)*0.0348)*30];
  tpost3=[250+Math.cos((step+90+(15*Math.sin(0.1046*cycle)))*0.0348)*100,  190+Math.sin((step+90)*0.0348)*30];
  tpost4=[250+Math.cos((step+135+(15*Math.sin(0.1046*cycle)))*0.0348)*100, 190+Math.sin((step+135)*0.0348)*30];
  tposb1=[250+Math.cos((step+22+(20*Math.cos(0.0628*cycle)))*0.0348)*100,  290+Math.sin((step+22)*0.0348)*30];
  tposb2=[250+Math.cos((step+67+(20*Math.cos(0.0628*cycle)))*0.0348)*100,  290+Math.sin((step+67)*0.0348)*30];
  tposb3=[250+Math.cos((step+112+(20*Math.cos(0.0628*cycle)))*0.0348)*100, 290+Math.sin((step+112)*0.0348)*30];
  tposb4=[250+Math.cos((step+157+(20*Math.cos(0.0628*cycle)))*0.0348)*100, 290+Math.sin((step+157)*0.0348)*30];

  //cross lines
  ctx.beginPath();
  ctx.moveTo(tpost1[0],tpost1[1]);
  ctx.lineTo(tpost2[0],tpost2[1]);
  ctx.lineTo(tpost3[0],tpost3[1]);
  ctx.lineTo(tpost4[0],tpost4[1]);
  ctx.lineTo(tpost1[0],tpost1[1]);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(tposb1[0],tposb1[1]);
  ctx.lineTo(tposb2[0],tposb2[1]);
  ctx.lineTo(tposb3[0],tposb3[1]);
  ctx.lineTo(tposb4[0],tposb4[1]);
  ctx.lineTo(tposb1[0],tposb1[1]);
  ctx.stroke();

  for (i=1; i<=4; i++){
    // Top segments
    eval("drawline(tpost"+i+"[0], 0,   tpost"+i+"[0], tpost"+i+"[1])");
    eval("drawline(tposb"+i+"[0], 600, tposb"+i+"[0], tposb"+i+"[1])");
    eval("ctx.moveTo(tpost"+i+"[0],tpost"+i+"[1])");
    eval("ctx.bezierCurveTo(tpost"+i+"[0],tpost"+i+"[1]+50,tposb"+i+"[0],tposb"+i+"[1]-50,tposb"+i+"[0],tposb"+i+"[1])")
    draw();
  }
}

function snow(step,stop){
  /*
  Draws some falling snow
  step: Clock signal
  Coded during FOSDEM. Better souvenir than an actual snowball
  */

  snowdropn=500
  
  // Move each drop individually
  function movedrop(snowdrop){
    ctx.fillRect(
      snowdrop.x-snowdrop.plane*snowdrop.snowstep+25*Math.sin(snowdrop.snowstep*3.14/32),
      snowdrop.snowstep*snowdrop.plane,
      1+(snowdrop.plane/2),1+(snowdrop.plane/2) // Snow drop size
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

function trail(step){
  /*
  draws trailing bars

  step: It's pets backwards
  */

  traildeg=3.14*step/40
  for (i=20; i>0; i--){
    //trailxpos=300+200*(Math.sin(traildeg+5*i/10));
    trailxpos=300+125*Math.sin(traildeg+i/5)+75*Math.cos(traildeg+i/10)
    eval("ctx.fillStyle='rgba("+Math.floor(128+128*Math.sin(traildeg+i))+","+Math.floor(128+128*Math.cos(traildeg+i/2))+","+Math.floor(128+128*Math.cos(traildeg+i/4))+",1)'")
    ctx.fillRect(trailxpos,600-25*i,30,25*i);
  }
  ctx.fillStyle="white";
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
  // Remove for release pl0x
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
moretextinit=0;

// Testing
test=0;

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

  // Drive scene
  // sunsetdrive(cycle);

  // [WIP] Octopus
  // octopus(300,300,cycle);
  // zoomscroll(400,"TESTTESTEIORSNTREISNO",cycle)

  //torsion(cycle);

  // trail(cycle);

  //frenchname(cycle);

  // octopus(300,300,cycle);
  // normscroll(500,"Hope you enjoyed this silly demo. Now go make your own! :D",cycle);

  // magglasstext(300,300,"MAGNIFYING TEST",cycle)

  // starfield(200,cycle,0);

  // [WIP] Tunnel
  //tunnel(300,300,cycle);

  // Text display tests
  // bezierscroll(250,"BEZIER TEST !!1!eleven!",(cycle%300),1);
  // bouncescroll(550, "BOUNCE TEST",cycle,15);

  // Actual demo 
  if (test==0){

  // Intro
  if (beat<32){
    if (introinit==0){subcycle=1;introinit=1};
    if (beat<25) {
      starfield(300,subcycle,0);
    }
    else if (beat>=25) {
      starfield(200,subcycle,1)
    }
    if (beat<8){
      breaktitles(150,200,"Stage7",subcycle);
    }
    else if (beat<14){
      breaktitles(150,200,"Achifaifa",subcycle-100);
    }
    else if (beat<23){
      breaktitles(150,275,"Present",subcycle-250);
    }
    else if (beat>=23){
      breaktitles(200,300,"POWERFUN",subcycle-400)
    }
  }

  // Event reference
  else if (beat<81){
    if (eventinit==0){subcycle=1;eventinit=1};
    if (subcycle<250){sinescroll(250,"HTML5!",(subcycle*2),2,8,20);}
    if (subcycle<200){sinescroll(150,"Tracker magic",(subcycle*3)-100,2,10,20);}
    if (subcycle<250){sinescroll(200,"JS!",(subcycle*2)-200,3,8,20); }
    if (subcycle<320){sinescroll(250,"Canvas powered!",(subcycle*2)-150,2,5,20); }
    if (subcycle<280){sinescroll(300,"Demoscene in your browser!",(subcycle*3)-225,2,7,20);}
    if (subcycle>200){
      sinescroll(200,"Made with      for",(subcycle*1.2)-270,2,5,20);
      ctx.fillStyle="red";
      sinescroll(200,"          love",(subcycle*1.2)-270,2,5,20);
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
    posx=300+(Math.sin(3.14*cycle/2.3*2/45+(3.14/4))*350)/2;
    posy=300+(Math.cos(3.14*cycle/1.3*2/45+(3.14/4))*350)/2;
    drawcube(posx,posy,100,3.14*(cycle)*2/45);
    sinescroll(500,"Rotating cubes!                                 (Top view)",subcycle,4,5,20);
    if (beat>=96){
      posxx=300+(Math.sin(3.14*(cycle+100)/2.3*2/45+(3.14/4))*350)/2;
      posyy=300+(Math.cos(3.14*(cycle+100)/3.4*2/45+(3.14/4))*350)/2;
      drawcube(posxx,posyy,100,3.14*(cycle+100)*2/45);
      if (beat>=105 && beat<113){
        threedcube(0,cycle);
      }
      else if (beat>=113 && beat<130){
        if (prevbeat!=beat){
          cubefill=laz0rcolours[Math.floor(Math.random()*laz0rcolours.length)];
          cubeside=Math.floor(1+Math.random()*6);
        }
        ctx.fillStyle=cubefill;
        threedcube(cubeside,cycle);
        prevbeat=beat;
        ctx.fillStyle="white";
      }
      else if (beat>=130){
        if (prevbeat!=beat){
          cubefill=laz0rcolours[Math.floor(Math.random()*laz0rcolours.length)];
          cubeside=Math.floor(1+Math.random()*6);
        }
        ctx.fillStyle=cubefill;
        ctx.strokeStyle="rgba(0,0,0,1)";
        threedcube(cubeside,cycle);
        prevbeat=beat;
        ctx.strokeStyle="white";
        noclear=1;
      }
    }
  }

  // Explosions and torsion bar
  else if (beat<179){
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
    torsion(subcycle);
    if (beat>=153){
      if (torsioninit==0){subsubcycle=1;torsioninit=1};
      bouncescroll(500,"Ghetto torsion bar (3D is hard)",subsubcycle*2,10);
      if (beat>=177){
        ctx.fillText("<- Not actually a bar",335,250);
      }
      subsubcycle++;
    }
  }

  // Meatballs
  else if (beat<214){
    meatballs(cycle);
    if (beat>196){
      if (meattext==0){subcycle=1;meattext=1};
      bouncescroll(550,"Code + music (.nsf) < 64 kB !!!               ;P",subcycle*2.5,15)
    }
  }

  // Waiting 1 step because reasons
  else if (beat<215){}

  // Slow part (List of awesome people)
  else if (beat<245){
    if (greettext==0){subcycle=1;greettext=1};
    bezierscroll(400,"Greetings to:",subcycle);
    bezierscroll(500,"PKT Team",subcycle-100);
    bezierscroll(200,"Klon & Brussels people",subcycle-150);
    bezierscroll(300,"tx|vo",subcycle-200);
    bezierscroll(400,"MeTrO",subcycle-250);
    bezierscroll(550,"SOGA",subcycle-300);
    bezierscroll(300,"Marcan",subcycle-350);
    bezierscroll(200,"NecroStudios",subcycle-400);
    bezierscroll(500,"Bixo",subcycle-450);
    bezierscroll(300,"EKparty scene crew",subcycle-500);
  }

  // Buildup
  else if (beat<253){
    raytrace(0,300,600,300,1,256,000,000,(subcycle)%70);
    raytrace(0,310,600,310,1,000,256,000,(subcycle-10)%70);
    raytrace(0,320,600,320,1,000,000,256,(subcycle-50)%70);
    raytrace(0,330,600,330,1,256,256,000,(subcycle-25)%70);
    raytrace(0,340,600,340,1,000,256,256,(subcycle-60)%70);
    raytrace(0,350,600,350,1,256,000,256,(subcycle-13)%70);
    raytrace(0,360,600,360,1,256,256,256,(subcycle-27)%70);
    raytrace(0,370,600,370,1,256,128,000,(subcycle-55)%70);
    raytrace(0,380,600,380,1,000,256,128,(subcycle-33)%70);
    raytrace(0,390,600,390,1,128,256,000,(subcycle-8)%70);
    raytrace(0,400,600,400,1,000,128,256,(subcycle-45)%70);
  }

  // Lasers and shit
  else if (beat<269){
    if (beat%2==0){ctx.fillText("_(^o^\\)",265,250);}
    else if (beat%2==1){ctx.fillText("\\(^o^_)",265,250);}
    ctx.fillText("_________",250,260);
    ctx.fillText("|              |",247,282)
    jumpheight=15*Math.abs(Math.sin(3.14*cycle/10));
    ctx.font="20px sans-serif bold";
    for (i=0; i<15; i++){
        ctx.fillText("\\O/",50+34*i,330-15*Math.abs(Math.sin(3.14*(cycle-i)/10)));
    }
    ctx.font="22px sans-serif bold";
    for (i=0; i<14; i++){
        ctx.fillText("\\O/",50+37*i,365-15*Math.abs(Math.sin(3.14*(cycle-i)/10)));
    }
    ctx.font="25px sans-serif bold";
    for (i=0; i<13; i++){
        ctx.fillText("\\O/",50+40*i,400-15*Math.abs(Math.sin(3.14*(cycle-i)/10)));
    }
    laz0r2(500,100,"green",cycle);
    laz0r2(-20,-20,"green",cycle);
    ctx.clearRect(0,400,600,200);
    laz0r(Math.floor(cycle/5));
    ctx.font="100px sans-serif bold";
    if (beat%3==0){ctx.fillText("ENJOY",125,500); }
    if (beat%3==1){ctx.fillText("THE",  170,500); }
    if (beat%3==2){ctx.fillText("PARTY",130,500); }
    ctx.font="25px sans-serif bold";

    if (beat>260){
      
    }
  }

  // octoamoeba
  else if (beat<286){
    trail(cycle);
    if (beat>276){
      frenchname(cycle);
    }
  }
  else if (beat<318){
    if (moretextinit==0){subcycle=1;moretextinit=1};
    octopus(300,300,cycle);
    normscroll(400,"Hope you enjoyed this silly demo.                       Now go make your own! :D",subcycle);
  }

  // Fireworks and logo
  else {
    if (firewinit==0){subcycle=1;firewinit=1};
    firework(000,600,100,100,256,000,000,1,cycle%130);
    firework(600,600,550,125,256,128,000,2,cycle%145);
    firework(250,600,225,200,000,000,256,3,cycle%135);
    firework(375,600,355,120,256,000,256,4,cycle%140);
    firework(325,600,340,225,000,256,000,5,cycle%125);
    gelogo();
    if (beat>=342){
      ctx.fillText("Yes, it's over",100,500);
      if (beat>=367){
        ctx.fillText("Really!",350,500);
        if (beat>=387){
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
  track=new Audio("ps-audio.wav");
  track.src="./ps-audio.wav";
  
  track.addEventListener("canplaythrough",function(){
    ctx.clearRect(0,0,600,600);
    drawline(0,250,600,250);
    drawline(0,350,600,350);
    ctx.fillText("PLAY",225,310);
    done=1;
    c.addEventListener("mousedown",demo,false)
    },false
  );
  track.load();
}

// Main function call
menu()
