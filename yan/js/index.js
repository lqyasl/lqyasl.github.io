/*
     * Stats.js 1.1
     * http://code.google.com/p/mrdoob/wiki/stats_js
     *
     */

function Stats()
{
  this.init();
}

Stats.prototype =
  {
  init: function()
  {
    this.frames = 0;
    this.framesMin = 100;
    this.framesMax = 0;

    this.time = new Date().getTime();
    this.timePrev = new Date().getTime();

    this.container = document.createElement("div");
    this.container.style.position = 'absolute';
    this.container.style.fontFamily = 'Arial';
    this.container.style.fontSize = '10px';
    this.container.style.backgroundColor = '#000020';
    this.container.style.opacity = '0.9';
    this.container.style.width = '80px';
    this.container.style.paddingTop = '2px';

//     this.framesText = document.createElement("div");
//     this.framesText.style.color = '#00ffff';
//     this.framesText.style.marginLeft = '3px';
//     this.framesText.style.marginBottom = '3px';
//     this.framesText.innerHTML = '<strong>FPS</strong>';
//     this.container.appendChild(this.framesText);

    this.canvas = document.createElement("canvas");
    this.canvas.width = 74;
    this.canvas.height = 30;
    this.canvas.style.display = 'block';
    this.canvas.style.marginLeft = '3px';
    this.canvas.style.marginBottom = '3px';
    // this.container.appendChild(this.canvas);

    this.context = this.canvas.getContext("2d");
    this.context.fillStyle = '#101030';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height );

    this.contextImageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);

    setInterval( bargs( function( _this ) { _this.update(); return false; }, this ), 1000 );
  },

  getDisplayElement: function()
  {
    return this.container;
  },

  tick: function()
  {
    this.frames++;
  },

  update: function()
  {
    this.time = new Date().getTime();

    this.fps = Math.round((this.frames * 1000 ) / (this.time - this.timePrev)); //.toPrecision(2);

    this.framesMin = Math.min(this.framesMin, this.fps);
    this.framesMax = Math.max(this.framesMax, this.fps);

    this.framesText.innerHTML = '<strong>' + this.fps + ' FPS</strong> (' + this.framesMin + '-' + this.framesMax + ')';

    this.contextImageData = this.context.getImageData(1, 0, this.canvas.width - 1, 30);
    this.context.putImageData(this.contextImageData, 0, 0);

    this.context.fillStyle = '#101030';
    this.context.fillRect(this.canvas.width - 1, 0, 1, 30);

    this.index = ( Math.floor(30 - Math.min(30, (this.fps / 60) * 30)) );

    this.context.fillStyle = '#80ffff';
    this.context.fillRect(this.canvas.width - 1, this.index, 1, 1);

    this.context.fillStyle = '#00ffff';
    this.context.fillRect(this.canvas.width - 1, this.index + 1, 1, 30 - this.index);

    this.timePrev = this.time;
    this.frames = 0;
  }
}

// Hack by Spite

function bargs( _fn )
{
  var args = [];
  for( var n = 1; n < arguments.length; n++ )
    args.push( arguments[ n ] );
  return function () { return _fn.apply( this, args ); };
}


(function (window){

  var Sakri = window.Sakri || {};
  window.Sakri = window.Sakri || Sakri;

  Sakri.MathUtil = {};

  //return number between 1 and 0
  Sakri.MathUtil.normalize = function(value, minimum, maximum){
    return (value - minimum) / (maximum - minimum);
  };

  //map normalized number to values
  Sakri.MathUtil.interpolate = function(normValue, minimum, maximum){
    return minimum + (maximum - minimum) * normValue;
  };

  //map a value from one set to another
  Sakri.MathUtil.map = function(value, min1, max1, min2, max2){
    return Sakri.MathUtil.interpolate( Sakri.MathUtil.normalize(value, min1, max1), min2, max2);
  };


  Sakri.MathUtil.hexToRgb = function(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  Sakri.MathUtil.getRandomNumberInRange = function(min, max){
    return min + Math.random() * (max - min);
  };

  Sakri.MathUtil.getRandomIntegerInRange = function(min, max){
    return Math.round(Sakri.MathUtil.getRandomNumberInRange(min, max));
  };


}(window));


//has a dependency on Sakri.MathUtil

(function (window){

  var Sakri = window.Sakri || {};
  window.Sakri = window.Sakri || Sakri;

  Sakri.Geom = {};

  //==================================================
  //=====================::POINT::====================
  //==================================================

  Sakri.Geom.Point = function (x,y){
    this.x = isNaN(x) ? 0 : x;
    this.y = isNaN(y) ? 0 : y;
  };

  Sakri.Geom.Point.prototype.clone = function(){
    return new Sakri.Geom.Point(this.x,this.y);
  };

  Sakri.Geom.Point.prototype.update = function(x, y){
    this.x = isNaN(x) ? this.x : x;
    this.y = isNaN(y) ? this.y : y;
  };


  //==================================================
  //===================::RECTANGLE::==================
  //==================================================

  Sakri.Geom.Rectangle = function (x, y, width, height){
    this.update(x, y, width, height);
  };

  Sakri.Geom.Rectangle.prototype.update = function(x, y, width, height){
    this.x = isNaN(x) ? 0 : x;
    this.y = isNaN(y) ? 0 : y;
    this.width = isNaN(width) ? 0 : width;
    this.height = isNaN(height) ? 0 : height;
  };

  Sakri.Geom.Rectangle.prototype.getRight = function(){
    return this.x + this.width;
  };

  Sakri.Geom.Rectangle.prototype.getBottom = function(){
    return this.y + this.height;
  };

  Sakri.Geom.Rectangle.prototype.getCenter = function(){
    return new Sakri.Geom.Point(this.getCenterX(), this.getCenterY());
  };

  Sakri.Geom.Rectangle.prototype.getCenterX = function(){
    return this.x + this.width/2;
  };

  Sakri.Geom.Rectangle.prototype.getCenterY=function(){
    return this.y + this.height/2;
  };

  Sakri.Geom.Rectangle.prototype.containsPoint = function(x, y){
    return x >= this.x && y >= this.y && x <= 1 this.getright() && y <="this.getBottom();" }; sakri.geom.rectangle.prototype.clone="function(){" return new sakri.geom.rectangle(this.x, this.y, this.width, this.height); sakri.geom.rectangle.prototype.tostring="function(){" "rectangle{x:"+this.x+" , y:"+this.y+" width:"+this.width+" height:"+this.height+"}"; }(window)); ** * created by sakri on 27-1-14. has a dependecy sakri.geom sakri.bitmaputil (function (window){ var || {}; window.sakri="window.Sakri" sakri; sakri.canvastextutil="{};" returns the biggest font size that best fits into given width sakri.canvastextutil.getfontsizeforwidth="function(string," fontprops, width, canvas, fillstyle, maxfontsize){ if(!canvas){ canvas="document.createElement(" canvas");" } if(!fillstyle){ fillstyle="#000000" ; if(isnan(maxfontsize)){ maxfontsize="500;" context="canvas.getContext('2d');" context.font="fontProps.getFontString();" context.textbaseline="top" copy="fontProps.clone();" console.log("getfontsizeforwidth() : ", copy.fontsize); textwidth="context.measureText(string).width;" some disagreement whether this shoould be with or if(textwidth width){ while(context.measuretext(string).width copy.fontsize++; if(copy.fontsize> maxFontSize){
          console.log("getFontSizeForWidth() max fontsize reached");
          return null;
        }
      }
    }else if(textWidth > width){
      while(context.measureText(string).width > width){
        copy.fontSize--;
        context.font = copy.getFontString();
        if(copy.fontSize < 0){
          console.log("getFontSizeForWidth() min fontsize reached");
          return null;
        }
      }
    }
    //console.log("getFontSizeForWidth() 2  : ", copy.fontSize);
    return copy.fontSize;
  };


  //=========================================================================================
  //==============::CANVAS TEXT PROPERTIES::====================================
  //========================================================

  Sakri.CanvasTextProperties = function(fontWeight, fontStyle, fontSize, fontFace){
    this.setFontWeight(fontWeight);
    this.setFontStyle(fontStyle);
    this.setFontSize(fontSize);
    this.fontFace = fontFace ? fontFace : "sans-serif";
  };

  Sakri.CanvasTextProperties.NORMAL = "normal";
  Sakri.CanvasTextProperties.BOLD = "bold";
  Sakri.CanvasTextProperties.BOLDER = "bolder";
  Sakri.CanvasTextProperties.LIGHTER = "lighter";

  Sakri.CanvasTextProperties.ITALIC = "italic";
  Sakri.CanvasTextProperties.OBLIQUE = "oblique";


  Sakri.CanvasTextProperties.prototype.setFontWeight = function(fontWeight){
    switch (fontWeight){
      case Sakri.CanvasTextProperties.NORMAL:
      case Sakri.CanvasTextProperties.BOLD:
      case Sakri.CanvasTextProperties.BOLDER:
      case Sakri.CanvasTextProperties.LIGHTER:
        this.fontWeight = fontWeight;
        break;
      default:
        this.fontWeight = Sakri.CanvasTextProperties.NORMAL;
    }
  };

  Sakri.CanvasTextProperties.prototype.setFontStyle = function(fontStyle){
    switch (fontStyle){
      case Sakri.CanvasTextProperties.NORMAL:
      case Sakri.CanvasTextProperties.ITALIC:
      case Sakri.CanvasTextProperties.OBLIQUE:
        this.fontStyle = fontStyle;
        break;
      default:
        this.fontStyle = Sakri.CanvasTextProperties.NORMAL;
    }
  };

  Sakri.CanvasTextProperties.prototype.setFontSize = function(fontSize){
    if(fontSize && fontSize.indexOf && fontSize.indexOf("px")>-1){
      var size = fontSize.split("px")[0];
      fontProperites.fontSize = isNaN(size) ? 24 : size;//24 is just an arbitrary number
      return;
    }
    this.fontSize = isNaN(fontSize) ? 24 : fontSize;//24 is just an arbitrary number
  };

  Sakri.CanvasTextProperties.prototype.clone = function(){
    return new Sakri.CanvasTextProperties(this.fontWeight, this.fontStyle, this.fontSize, this.fontFace);
  };

  Sakri.CanvasTextProperties.prototype.getFontString = function(){
    return this.fontWeight + " " + this.fontStyle + " " + this.fontSize + "px " + this.fontFace;
  };

}(window));


window.requestAnimationFrame =
        window.__requestAnimationFrame ||
                window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                (function () {
                    return function (callback, element) {
                        var lastTime = element.__lastTime;
                        if (lastTime === undefined) {
                            lastTime = 0;
                        }
                        var currTime = Date.now();
                        var timeToCall = Math.max(1, 33 - (currTime - lastTime));
                        window.setTimeout(callback, timeToCall);
                        element.__lastTime = currTime + timeToCall;
                    };
                })();

var readyStateCheckInterval = setInterval( function() {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);
        init();
    }
}, 10);

//========================
//general properties for demo set up
//========================

var canvas;
var context;
var canvasContainer;
var htmlBounds;
var bounds;
var minimumStageWidth = 250;
var minimumStageHeight = 250;
var maxStageWidth = 1000;
var maxStageHeight = 600;
var resizeTimeoutId = -1;
var stats;

function init(){
    canvasContainer = document.getElementById("canvasContainer");
    window.onresize = resizeHandler;
    stats = new Stats();
    canvasContainer.appendChild( stats.getDisplayElement() );
    commitResize();
}

function getWidth( element ){return Math.max(element.scrollWidth,element.offsetWidth,element.clientWidth );}
function getHeight( element ){return Math.max(element.scrollHeight,element.offsetHeight,element.clientHeight );}

//avoid running resize scripts repeatedly if a browser window is being resized by dragging
function resizeHandler(){
    context.clearRect(0,0,canvas.width, canvas.height);
    clearTimeout(resizeTimeoutId);
    clearTimeoutsAndIntervals();
    resizeTimeoutId = setTimeout(commitResize, 300 );
}

function commitResize(){
    if(canvas){
        canvasContainer.removeChild(canvas);
    }
    canvas = document.createElement('canvas');
    canvas.style.position = "absolute";
    context = canvas.getContext("2d");
    canvasContainer.appendChild(canvas);

    htmlBounds = new Sakri.Geom.Rectangle(0,0, getWidth(canvasContainer) , getHeight(canvasContainer));
    if(htmlBounds.width >= maxStageWidth){
        canvas.width = maxStageWidth;
        canvas.style.left = htmlBounds.getCenterX() - (maxStageWidth/2)+"px";
    }else{
        canvas.width = htmlBounds.width;
        canvas.style.left ="0px";
    }
    if(htmlBounds.height > maxStageHeight){
        canvas.height = maxStageHeight;
        canvas.style.top = htmlBounds.getCenterY() - (maxStageHeight/2)+"px";
    }else{
        canvas.height = htmlBounds.height;
        canvas.style.top ="0px";
    }
    bounds = new Sakri.Geom.Rectangle(0,0, canvas.width, canvas.height);
    context.clearRect(0,0,canvas.width, canvas.height);

    if(bounds.width<minimumstagewidth 20 20000 150000 || bounds.height<minimumstageheight){ stagetoosmallhandler(); return; } var textinputspan="document.getElementById(" textinputspan");" textinputspan.style.top="htmlBounds.getCenterY()" + (bounds.height 2) +"px"; textinputspan.style.left="(htmlBounds.getCenterX()" - getwidth(textinputspan) 2)+"px"; startdemo(); function stagetoosmallhandler(){ warning="Sorry, bigger screen required :(" ; context.font="bold normal 24px sans-serif" context.filltext(warning, bounds.getcenterx() context.measuretext(warning).width 2, bounds.getcentery()-12);="="======================"" demo specific properties animating="false;" particles="[];" numparticles="4000;" currenttext="SAKRI" fontrect; fontproperties="new" sakri.canvastextproperties(sakri.canvastextproperties.bold, null, 100); animator; particlesource="new" sakri.geom.point();; particlesourcestart="new" sakri.geom.point(); particlesourcetarget="new" redparticles="[" #fe7a51"" , "#fdd039" "#fd3141"]; greenparticles="[" #dbffa6"" "#fcf8fd" "#99de5e"]; pinkparticles="[" #fef4f7"" "#f2a0c0" "#fb3c78"]; yellowparticles="[" #fdfbd5"" "#fff124" "#f4990e"]; blueparticles="[" #9ca2df"" "#222a6d" "#333b8d"]; particlecolorsets="[redParticles," greenparticles, pinkparticles, yellowparticles, blueparticles]; particlecolorindex="0;" renderparticlefunction; renderbounds; particlecountoptions="[2000," 4000, 6000, 8000, 10000, 15000, ]; pixelparticlecountoptions="[10000," 40000, 60000, 80000, 100000, cleartimeoutsandintervals(){ startdemo(){ fontrect="new" sakri.geom.rectangle(math.floor(bounds.x bounds.width*.2), 0, math.floor(bounds.width bounds.width*.4), bounds.height); fontproperties.fontsize="100;" fontproperties, fontrect.width, canvas); fontrect.y="Math.floor(bounds.getCenterY()" 2); fontrect.height="fontProperties.fontSize;" renderbounds="fontRect.clone();" renderbounds.x *.1); renderbounds.width *.2); renderbounds.y *.5); renderbounds.height *.6); createparticles(); context.globalalpha="globalAlpha;" loop(); loop(){ if(!animating){ stats.tick(); renderparticles(); window.requestanimationframe(loop, createparticles(){ context.clearrect(0,0,canvas.width, canvas.height); context.filltext(currenttext, fontrect.x, fontrect.y); imagedata="context.getImageData(fontRect.x," fontrect.y, fontrect.height); data="imageData.data;" length="data.length;" rowwidth="fontRect.width*4;" i, y, x; for(i="0;" i<length; i+="4){" if(data[i+3]>0){
            y = Math.floor(i / rowWidth);
            x = fontRect.x + (i - y * rowWidth) / 4;
            particles.push(x);//x
            particles.push(fontRect.y + y);//y
            particles.push(x);//xOrigin
            particles.push(fontRect.y + y);//yOrigin
        }
    }

    //console.log(particles.length);
    context.clearRect(0,0,canvas.width, canvas.height);

    //pre calculate random numbers used for particle movement
    xDirections = [];
    yDirections = [];
    for(i=0; i<directioncount; 4 i++){ xdirections[i]="-7" + math.random() * 14; ydirections[i]="Math.random()*" - 5; } var xdirections, ydirections; fidget with these to manipulate effect globalalpha=".11;" amount of trails or tracers xwind="0;" all particles x is effected by this threshold="60;" if a pixels red component less than this, return particle it's original position amountred="25;" added pixel occupied amountgreen="12;" green amountblue="1;" blue directioncount="100;" number random pre-calculated and y directions function renderparticles(){ fill renderbounds area transparent black, render nearly black text context.fillstyle="#000000" ; #a61b29 #000000 context.fillrect(renderbounds.x, renderbounds.y, renderbounds.width, renderbounds.height); 010000 context.filltext(currenttext, fontrect.x, fontrect.y); randomred="amountRed" -5 math.random()*10; randomgreen="amountGreen" -2 math.random()*4; imagedata="context.getImageData(renderBounds.x," data="imageData.data;" rowwidth="imageData.width" 4; index, i, length="particles.length;" d="Math.floor(Math.random()*30);" math.random()); move randomly left right 1.5); clamp maximum wind -1.5); minimum for(i="0;" i<length; i+="4," d++ ){ particles[i] % directioncount] xwind); particles[i+1] directioncount]; index="Math.round(particles[i]" renderbounds.x) math.round(particles[i+1] renderbounds.y) rowwidth; data[index] data[index 1] 2] below set threshold, orgin if( < threshold){ context.putimagedata(imagedata, renderbounds.x, renderbounds.y); maxcharacters="10;" changetext(){ textinput="document.getElementById(" textinput");" if(textinput.value && textinput.text! if(textinput.value.length> maxCharacters){
            alert("Sorry, there is only room for "+maxCharacters+" characters. Try a shorter name.");
            return;
        }
        if(textInput.value.indexOf(" ")>-1){
            alert("Sorry, no support for spaces right now :(");
            return;
        }
        currentText = textInput.value;
        clearTimeoutsAndIntervals();
        animating = false;
        setTimeout(commitResize, 100);
    }
}

function changeSettings(){
    clearTimeoutsAndIntervals();
    animating = false;
    setTimeout(commitResize, 100);
}

function setParticleNumberOptions(values){
    var selector = document.getElementById("particlesSelect");
    if(selector.options.length>0 && parseInt(selector.options[0].value) == values[0] ){
        return;
    }
    while(selector.options.length){
        selector.remove(selector.options.length-1);
    }
    for(var i=0;i </directioncount;></minimumstagewidth></=>