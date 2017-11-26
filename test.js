var nemusProyect = function( p ) {
  var Color;
  var year = document.getElementById('yearIn');
  var diameterMin = document.getElementById('diameterMinIn');
  var diameterMax = document.getElementById('diameterMaxIn');
  var weightMin = document.getElementById('weightMinIn');
  var weightMax = document.getElementById('weightMaxIn');
  var searchBox = document.getElementById('searchIn');
  // var minYear = 1800;
  // var maxYear = 1900;
  var minDiameter = 10;
  var maxDiameter = 500;
  var minWeight = 10;
  var maxWeight = 300;
  var minDate = -500;
  var maxDate = 500;
  var lines;
  var data;
  var date;
  var newDate;
  var axisValue;
  // var rangeT = document.getElementById('testR');
  var radios = document.getElementsByName('yAxis');
  var axisStringMeasure;
  var xScale = 1.0;
  var yearOff = 0;
  document.getElementById('buttonSearch').onclick = function() {searchBox = document.getElementById('searhIn').value; alert(searchBox);};
  window.onload = function(){
  }
  // document.getElementById('yearIn').max = maxYear;
  // document.getElementById('yearIn').min = minYear;

  p.preload = function(){
    lines = p.loadTable("/data/nomisma1.csv",'csv','header'); //////////////////////////////
  }

  p.setup = function() {
    p.createCanvas(700, 400);
    console.log(lines.rows[73].obj);
    data = lines.rows[73].obj.Fecha;
    date = data.split('-');
    if (isNaN(date[0])) {
      newDate = +date[1]
    } else{
      newDate = -1* +date[0]
    }
    console.log(newDate);


    // for (var i = 0; i < lines.getRowCount(); i++) {
    //   console.log(lines.getRow(i));
    // }
  };

  p.draw = function() {
    // year = yearIn.value;
    document.getElementById('diameterMinIn').min = minDiameter;
    document.getElementById('diameterMinIn').max = document.getElementById('diameterMaxIn').value;
    document.getElementById('diameterMaxIn').min = document.getElementById('diameterMinIn').value;
    document.getElementById('diameterMaxIn').max = maxDiameter;
    document.getElementById('spanDiamMin').innerHTML = document.getElementById('diameterMinIn').value;
    document.getElementById('spanDiamMax').innerHTML = document.getElementById('diameterMaxIn').value;
    document.getElementById('weightMinIn').min = minWeight;
    document.getElementById('weightMinIn').max = document.getElementById('weightMaxIn').value;
    document.getElementById('weightMaxIn').min = document.getElementById('weightMinIn').value;
    document.getElementById('weightMaxIn').max = maxWeight;
    document.getElementById('spanWeightMin').innerHTML = document.getElementById('weightMinIn').value;
    document.getElementById('spanWeightMax').innerHTML = document.getElementById('weightMaxIn').value;
    document.getElementById('dateMinIn').min = minDate;
    document.getElementById('dateMinIn').max = document.getElementById('dateMaxIn').value;
    document.getElementById('dateMaxIn').min = document.getElementById('dateMinIn').value;
    document.getElementById('dateMaxIn').max = maxDate;
    document.getElementById('spanDateMin').innerHTML = document.getElementById('dateMinIn').value;
    document.getElementById('spanDateMax').innerHTML = document.getElementById('dateMaxIn').value;
    document.getElementById('dateRange').max = maxDate;
    document.getElementById('dateRange').min = minDate;
    yearOff = document.getElementById('dateRange').value;
    // document.getElementById('spanDateRange').innerHTML = yearOff;

    // console.log(diameterMin.value, diameterMax.value, weightMin.value, weightMax.value);
    var d = 100;
    var cX = 0;
    var cY = 0;
    var xScale = 3.0;
    p.background(255);
    p.translate(p.width/2.0,p.height);
    p.translate(yearOff*10.0,0);
    p.push();
    if ((p.pow((p.mouseX-(p.width/2.0)-yearOff*10.0 - cX),2)+p.pow((p.mouseY-p.height - cY),2)) <= p.pow(d/2.0,2)) {
      p.stroke(p.random(255),p.random(255),p.random(255));
    }
    p.ellipse(cX*xScale,cY,d,d);
    p.pop();
    p.push();
    if ((p.pow((p.mouseX-(p.width/2.0)-yearOff*10.0 - 100*xScale),2)+p.pow((p.mouseY-p.height + 100),2)) <= p.pow(d/2.0,2)) {
      p.stroke(p.random(255),p.random(255),p.random(255));
    }
    p.ellipse(100*xScale,-100,d,d);
    p.pop();
    p.translate(-yearOff*10.0,0);
    p.translate(-p.width/2.0,-p.height);
    p.point(p.mouseX,p.mouseY);
    // console.log(p.mouseX-(p.width/2.0)-yearOff*10.0,p.mouseY-p.height);
  };

  p.mousePressed = function(){
    console.log(p.mouseX-(p.width/2.0)-yearOff*10.0,p.mouseY-p.height,yearOff,yearOff*10.0);
  };

  // p.windowResized = function(){
  //   p.resizeCanvas(p.windowWidth-550, 400);
  // }
};

var varProyect = new p5(nemusProyect, 'testProyect');
