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
  var maxWeight = 500;
  var lines;
  // var rangeT = document.getElementById('testR');

  document.getElementById('buttonSearch').onclick = function() {searchBox = document.getElementById('searhIn').value; alert(searchBox);};
  // document.getElementById('yearIn').max = maxYear;
  // document.getElementById('yearIn').min = minYear;

  p.setup = function() {
    p.createCanvas(500, 500);
    dataProc("/data/nomisma1.csv")
  };

  function dataProc(filename){
    lines = p.loadTable(filename,'csv','header'); //////////////////////////////
    console.log(lines.getRowCount());
    console.log(lines);
    for (var i = 0; i < lines.getRowCount(); i++) {
      console.log(lines.getString(i));
    }
  }

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
    // console.log(diameterMin.value, diameterMax.value, weightMin.value, weightMax.value);
    p.background(200);
    p.translate(0,p.height);
    p.translate(weightMin.value,-diameterMin.value);
    p.text("Hola Mundo",0,0);
    // p.translate(-10,-diameter.value)
  };
};

var varProyect = new p5(nemusProyect, 'nemusProyect');
