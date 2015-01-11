var c=document.getElementById("alpha");
c.style.background="#FFFFFF";
var ctx=c.getContext("2d");
ctx.canvas.width=600;
ctx.canvas.height=600;

ctx.fillStyle="black"
ctx.font="15px sans-serif";

// Draws a sphere
// (x,y): coordinates, rad: radius
function drawsphere(x,y,rad){
  ctx.beginPath();
  ctx.arc(x,y,rad,0,2*Math.PI,false);
  draw();
}

// Draws a cube
// (x,y): coordinates of the upper left corner
// side: lenght of side
// rot: rotation of the cube in rad
function drawcube(x,y,side,rot){

  // calculate vertice separation given rotation and size
  vs=Math.sin(rot)*side;
  hs=Math.cos(rot)*side;

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

  // Draws a line between two points
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
  draw();
}

function draw(){ctx.stroke()}

