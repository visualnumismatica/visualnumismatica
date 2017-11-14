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

  p.preload = function(){
    lines = p.loadTable("/data/nomisma1.csv",'csv','header'); //////////////////////////////
  }

  p.setup = function() {
    p.createCanvas(1000, 500);
    console.log(lines.rows[0].obj);
    let d = lines.rows[0].obj.Fecha;
    let a = d.split('-');
    let f;
    if (isNaN(a[0])) {
      f = +a[1]
    } else{
      f = +a[0]
    }
    console.log(f);

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
    // console.log(diameterMin.value, diameterMax.value, weightMin.value, weightMax.value);
    p.background(200);
    p.translate(p.width/2.0,p.height);
    p.line(0,0,0,-p.height);
    // p.translate(weightMin.value,-diameterMin.value);
    p.text("Año",10,0);
    p.text("Diametro",-p.width/2.0,-200);
    p.text("0",1,1);
    p.line(300,0,300,-p.height);
    p.text("300",300,1);
    p.line(-300,0,-300,-p.height);
    p.text("-300",-300,1);
    p.text("20mm",1,-20);
    p.line(-500,-20,500,-20);
    p.text("40mm",1,-40);
    p.line(-500,-40,500,-40);
    p.text("60mm",1,-60);
    p.line(-500,-60,500,-60);
    p.text("80mm",1,-80);
    p.line(-500,-80,500,-80);
    // p.translate(-10,-diameter.value)
    p.translate(60,-30);
    p.push();
    p.strokeWeight(3);
    for (var i = 0; i < lines.getRowCount(); i++) {
      let d = lines.rows[i].obj.Fecha;
      let a = d.split('-');
      let f;
      if (isNaN(a[0])) {
        f = +a[1]
      } else{
        f = -1*(+a[0])
      }
      p.point(f,-lines.rows[i].obj.Diametro);
    }
    p.pop();
  };
};

var varProyect = new p5(nemusProyect, 'nemusProyect');
