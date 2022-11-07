var fgImage = null;
var bgImage = null;

function loadfgimages() {
  var imgFile = document.getElementById("fgfile");
  fgImage = new SimpleImage(imgFile);
   var canvas = document.getElementById("fgcan");
  fgImage.drawTo(canvas);  
}

function loadbgimages() {
  var imgFile = document.getElementById("bgfile");
  bgImage = new SimpleImage(imgFile);
  var canvas = document.getElementById("bgcan");
  bgImage.drawTo(canvas);  
}

function greenscreen() {
  if (fgImage == null || ! fgImage.complete()) {
    alert("foreground not loaded");
    return;
  }
  if (bgImage == null || ! bgImage.complete()) {
     alert("background not loaded");
  }
  
  var blueThreshold = 145;
   var output = new SimpleImage(fgImage.getWidth(), fgImage.getHeight());
  var canvas = document.getElementById("fgcan");
for (var pixel of fgImage.values()) {
  var x = pixel.getX();
  var y = pixel.getY();
  if (pixel.getBlue() > blueThreshold) {
    var bgPixel = bgImage.getPixel(x, y);
     output.setPixel(x, y, bgPixel);
  }
  else {
    output.setPixel(x, y, pixel);
  }
}
 clearCanvas();
  output.drawTo(canvas);
}

function doClear(canvas) {
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function clearCanvas() {
  var fgcanvas = document.getElementById("fgcan");
  var bgcanvas = document.getElementById("bgcan");

  doClear(fgcanvas);
  doClear(bgcanvas);
}

function allClear() {
  clearCanvas();
}