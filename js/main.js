console.log('WOFortune');



  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var canvasptr = document.getElementById("canvaspointer");
  var ctxp = canvasptr.getContext("2d");

  var x         = canvas.width / 2;
  var y         = canvas.height / 2;


$(document).ready(function(){

  //background color
  // ctx.fillStyle = "rgb(0,0,0)";
  // ctx.fillRect(0, 0, canvas.width,canvas.height);

  var oneSector  = 360/10;
  var deg        = 0;
  var ctx        = canvas.getContext('2d');
  var width      = canvas.width;
  var height     = canvas.height;
  var center     = width/2;      // center
  var randArr    = [];
  var lastMouseX = 0;
  var lastMouseY = 0;
  var p = 0;
  var pointerValue = 0;

  var counterClockwise = false;


  function degToRadians(deg) {
    return deg * Math.PI/180;
  }

  function drawSector(deg, color){
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.arc(x, y, width/2, degToRadians(deg), degToRadians(deg+oneSector));
    ctx.fillStyle = color;
    ctx.fill();
    // console.log( deg2rad( deg+oneSector )  );
    return ( degToRadians( deg+oneSector ) );
  }

  function writeText(value,deg){
      ctx.save();
      ctx.font="20px Georgia";
      ctx.fillStyle = 'black';
      //moving x,y to from (0,0) to new positions(center, center)
      ctx.translate(center, center);
      //rotate by a certain degree
      ctx.rotate( degToRadians(deg) );
      ctx.textAlign = "center";
      if(value == 6){
        value = value + '(six)';
      }
      ctx.fillText(value, x-100, y/5);
      ctx.restore();
  }

  function genShuffledArray(){
    for( let i = 1; i <= 10; i++ ){
      randArr.push(i);
    }
    // console.log(randArr);
    return (_.shuffle(randArr));
  }

  function drawPointer(){
    ctxp.beginPath();
    ctxp.moveTo(center-25, 0);
    ctxp.lineTo(center, 25);
    ctxp.lineTo(center+25, 0);
    ctxp.fillStyle = 'red';
    ctxp.fill();

  }



////////// Main Execution //////////
  //Call outside loop
  shuffArr = genShuffledArray();

  for(var i=0; i<10; i++){
    drawSector(deg, ( (i%2 == 0)? 'yellow': 'green') );
    //Generate an array of numbers -> then pick random value each
    writeText(shuffArr[i], deg);
    deg += oneSector;
    console.log(`Number ${shuffArr[i]} at ${deg}`);
  }
  drawPointer();

  $('#canvas').on('mousemove', function(event){
      // console.log('clicked on canvas');
      mouseX = event.pageX;
      mouseY = event.pageY;

      const velocityX = Math.abs( mouseX - lastMouseX );
      const velocityY = Math.abs( mouseY - lastMouseY );
      // console.log('hhh', velocityX, velocityY);

      lastMouseX = mouseX;
      lastMouseY = mouseY;

      var rotation = (velocityX * velocityY);

      if(velocityX <100 || velocityY < 100){
        rotation = (rotation * 1 )%360; //5
      } else {
        rotation = (rotation * 1 )%360; //20
      }

      // rotation = rotation * 360;
      // console.log(b bg'rotation', rotation);

      $('#canvas').css({
        '-webkit-transform' : 'rotate('+rotation+'deg)'
      }, 1000);

  });//canvas-mousemove

  var rotation = 90;
   $('#spin-wheel').on('click', function(event){
     var rotateContext = canvas.getContext('2d');
     rotateContext.rotate(90 * Math.PI / 180);

   });


   function getRotationDegrees(obj) {
       var matrix = obj.css("-webkit-transform") ||
       obj.css("-moz-transform")    ||
       obj.css("-ms-transform")     ||
       obj.css("-o-transform")      ||
       obj.css("transform");
       if(matrix !== 'none') {
           var values = matrix.split('(')[1].split(')')[0].split(',');
           var a = values[0];
           var b = values[1];
           var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
       } else { var angle = 0; }
       return (angle < 0) ? angle + 360 : angle;
   }

   function rotateArray( array , times ){
     while( times-- ){
       var temp = array.shift();
       array.push( temp )
     }
   }
   //Rotating array because the 0 of canvas is -90 of the pointer , shifting by 7 points
   //-90degree is 3 places away from original
   rotateArray(shuffArr, 7);
   console.log('array is : ',shuffArr);

   
const wheelPattern = [];
   $('#check-wheel').on('click', function(event){
     //Assuming the pointer stops at a random number
     var stoppedAt = Math.floor (Math.random() * 10 ) + 1; //we would never want 0

      $('#print-number').text(`The wheel stopped at ${stoppedAt}`);

      angleOfRotation = getRotationDegrees($('#canvas'));
      // angle = ( angle1 > 360 )? angleOfRotation%360 : angleOfRotation ;

      console.log('angle of rotation is ', angleOfRotation);
      console.log('array is : ',shuffArr);



      //After equating the canvas and pointer ....

      if (angleOfRotation >= 0 && angleOfRotation < 36) {
        pointerValue = shuffArr[0];
      }
      else if (angleOfRotation >= 36 && angleOfRotation < 72){
          pointerValue = shuffArr[1];
      }
      else if (angleOfRotation >= 72 && angleOfRotation < 108){
          pointerValue = shuffArr[2];
      }
      else if (angleOfRotation >= 108 && angleOfRotation < 144){
        pointerValue = shuffArr[3];
      }
      else if (angleOfRotation >= 144 && angleOfRotation < 180){
        pointerValue = shuffArr[4];
      }
      else if (angleOfRotation >= 180 && angleOfRotation < 216){
          pointerValue = shuffArr[5];
      }
      else if (angleOfRotation >= 216 && angleOfRotation < 252){
          pointerValue = shuffArr[6];
      }
      else if (angleOfRotation >= 252 && angleOfRotation < 288){
        pointerValue = shuffArr[7];
      }
      else if (angleOfRotation >= 288 && angleOfRotation < 324){
        pointerValue = shuffArr[8];
      }
      else if (angleOfRotation >= 324 && angleOfRotation < 260){
        pointerValue = shuffArr[9];
      }


      console.log('Pointer value is', pointerValue);
    });







}); //document.ready
