console.log('WOFortune');



  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  var x         = canvas.width / 2;
  var y         = canvas.height / 2;


$(document).ready(function(){

  //background color
  // ctx.fillStyle = "rgb(0,0,0)";
  // ctx.fillRect(0, 0, canvas.width,canvas.height);

  var oneSector = 360/10;
  var deg       = 0;
  var ctx       = canvas.getContext('2d');
  var width     = canvas.width;
  var height    = canvas.height;
  var center    = width/2;      // center

  var radius    = 290;
  var randArr   = [];

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
    ctx.beginPath();
    ctx.moveTo(center-25, 0);
    ctx.lineTo(center, 25);
    ctx.lineTo(center+25, 0);
    ctx.fillStyle = 'red';
    ctx.fill();

  }



////////// Main Execution //////////
  //Call outside loop
  shuffArr = genShuffledArray();

  for(var i=0; i<10; i++){
    drawSector(deg, ( (i%2 == 0)? 'yellow': 'green') );
    //Generate an array of numbers -> then pick random value each
    writeText(shuffArr[i], deg);
    deg += oneSector;
    // console.log(deg);
  }

  drawPointer();



}); //document.ready
