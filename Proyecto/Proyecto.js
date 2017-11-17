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
  var xScale = 10.0;
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
    p.createCanvas(p.windowWidth-550, 400);
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
    for (var i = 0, length = radios.length; i < length; i++){
      if (radios[i].checked){
        // do whatever you want with the checked radio
        axisValue = radios[i].value;
        // only one radio can be logically checked, don't check the rest
        break;
      }
    }
    p.background(200);
    p.translate(p.width/2.0,p.height);
    p.translate(-yearOff*10.0,0);
    p.line(0,0,0,-p.height);
    // p.translate(weightMin.value,-diameterMin.value);
    p.text("Año",10,0);
    if (axisValue == 1) {
      p.text("Diametro",-p.width/2.0,-200);
      axisStringMeasure = "mm";
    } else {
      p.text("Peso",-p.width/2.0,-200);
      axisStringMeasure = "gr";
    }
    p.text("0",1,1);
    p.line(300*xScale,0,300*xScale,-p.height);
    p.text("300",300*xScale,1);
    p.line(-300*xScale,0,-300*xScale,-p.height);
    p.text("-300",-300*xScale,1);
    p.text("20"+axisStringMeasure,1,-20);
    p.line(-500,-20,500,-20);
    p.text("40"+axisStringMeasure,1,-40);
    p.line(-500,-40,500,-40);
    p.text("60"+axisStringMeasure,1,-60);
    p.line(-500,-60,500,-60);
    p.text("80"+axisStringMeasure,1,-80);
    p.line(-500,-80,500,-80);
    p.text("200"+axisStringMeasure,1,-200);
    p.line(-500,-200,500,-200);
    // p.translate(-10,-diameter.value)
    p.translate(60,-30);
    p.push();
    p.strokeWeight(3);
    for (var i = 0; i < lines.getRowCount(); i++) {
      data = lines.rows[i].obj.Fecha;
      date = data.split('-');
      if (isNaN(date[0])) {
        newDate = +date[1]
      } else{
        newDate = -1* +date[0]
      }
      p.noFill();
      p.strokeWeight(1);
      var centerX = newDate*xScale;
      var centerY;
      var diameter = lines.rows[i].obj.Diametro/1.0;
      if (axisValue == 1) {
        centerY = -lines.rows[i].obj.Diametro;
        //p.point(newDate,-lines.rows[i].obj.Diametro);
        p.ellipse(centerX,centerY,diameter,diameter);
      }else {
        //p.point(newDate,-lines.rows[i].obj.Peso);
        centerY = -lines.rows[i].obj.Peso;
        p.ellipse(centerY,centerY,diameter,diameter);
      }
      if (i == 73) {
        console.log(centerX);
        p.point(centerX,centerY)
        p.point(centerX+10,centerY)
        p.point(centerX+10,centerY+10)
      }
      p.push();
      p.translate(-p.width/2.0,-p.height);
      var truePosMouseX = centerX- p.width/2.0;
      var truePosMouseY = centerY - p.height/2.0;
      if (p.sqrt(p.sq(centerX-p.mouseX)+p.sq(-centerY-p.mouseY)) < diameter/2.0) {
        p.ellipse(truePosMouseX,truePosMouseY,20,20)
        console.log(centerX,p.mouseX,centerY,p.mouseY);
        console.log(i);
      }
      p.pop();
    }
    p.pop();
  };

  p.mousePressed = function(){
    console.log((p.mouseX-p.width/2.0)+yearOff*10.0,-(p.mouseY-p.height),yearOff,yearOff*10.0);
  };

  p.windowResized = function(){
    p.resizeCanvas(p.windowWidth-550, 400);
  }
};

var varProyect = new p5(nemusProyect, 'nemusProyect');
