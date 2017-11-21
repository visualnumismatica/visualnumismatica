function Coin (obj){
  this.nombre = obj.Nombre;
  this.axis = +obj.Axis;
  this.diametro = +obj.Diametro;
  date = obj.Fecha.split('-');
  if (isNaN(date[0])) {
    newDate = -1* +date[1]
  } else{
    newDate = +date[0]
  }
  this.fechaMostrar = obj.Fecha;
  this.fecha = newDate;
  this.peso = +obj.Peso;
  this.anverso = obj.Anverso;
  this.reverso = obj.Reverso;
  this.hover = -1;
}

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
  var minYear = Number.MAX_VALUE;
  var maxYear = Number.MIN_VALUE;
  var minDiam = Number.MAX_VALUE;
  var maxDiam = Number.MIN_VALUE;
  var minWeig = Number.MAX_VALUE;
  var maxWeig = Number.MIN_VALUE;
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
  var img;
  var hoverCoin = -1;
  // var rangeT = document.getElementById('testR');
  var radios = document.getElementsByName('yAxis');
  var axisStringMeasure;
  var xScale = 0.1;
  var xOff = 0;
  var yOff = 0;
  var coins = [];
  var selectedCoin = -1;
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
    var c;
    for (var i = 0; i < lines.getRowCount(); i++) {
      c = new Coin(lines.rows[i].obj);
      if (c.fecha === c.fecha) {
        minYear = p.min(minYear,c.fecha);
        maxYear = p.max(maxYear,c.fecha);
        minDiam = p.min(minDiam,c.diametro);
        maxDiam = p.max(maxDiam,c.diametro);
        minWeig = p.min(minWeig,c.peso);
        maxWeig = p.max(maxWeig,c.peso);
        coins.push(c);
      }
    }
    minDiameter = minDiam;
    maxDiameter = maxDiam;
    minWeight = minWeig;
    maxWeight = maxWeig;
    minDate = minYear;
    maxDate = maxYear;
    console.log(coins[73]);
    console.log(minYear,maxYear,minDiam,maxDiam,minWeig,maxWeig);
  };

  p.draw = function() {
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
    document.getElementById('xZoom').max = 30;
    document.getElementById('xZoom').min = 0.12;
    xScale = document.getElementById('xZoom').value;
    document.getElementById('yZoom').max = 30;
    document.getElementById('yZoom').min = 1;
    yScale = document.getElementById('yZoom').value;
    document.getElementById('dateRange').max = maxDate/10*xScale;
    document.getElementById('dateRange').min = minDate/10*xScale;
    xOff = document.getElementById('dateRange').value;
    // document.getElementById('spanDateRange').innerHTML = xOff;

    // console.log(diameterMin.value, diameterMax.value, weightMin.value, weightMax.value);
    for (var i = 0, length = radios.length; i < length; i++){
      if (radios[i].checked){
        // do whatever you want with the checked radio
        axisValue = radios[i].value;
        // only one radio can be logically checked, don't check the rest
        break;
      }
    }
    p.background(255);
    p.translate(p.width/2.0,p.height);
    p.text("Año",10,-7);
    if (axisValue == 1) {
      document.getElementById('spanIndicator').innerHTML = "Diametro";
      document.getElementById('yRange').max = maxDiameter/10*yScale;
      document.getElementById('yRange').min = minDiameter/10*yScale;
      p.text("Diametro",-p.width/2.0,-300);
      axisStringMeasure = "mm";
    } else {
      document.getElementById('spanIndicator').innerHTML = "Peso";
      document.getElementById('yRange').max = maxWeight/10*yScale;
      document.getElementById('yRange').min = minWeight/10*yScale;
      p.text("Peso",-p.width/2.0,-300);
      axisStringMeasure = "gr";
    }
    yOff = document.getElementById('yRange').value;

    p.translate(-xOff*10.0,yOff*10.0);
    p.translate(0,-30);

    p.line(0,30,0,-p.height);
    p.line(minDate*xScale,0*yScale,maxDate*xScale,0*yScale);
    p.push();
    p.stroke(0,30);
    var xStep = 50;
    for (var i = Math.floor(minDate/xStep)*xStep; i < (Math.ceil(maxDate/xStep)*xStep)+1; i+=(Math.trunc(xStep/xScale) > 0 ? Math.trunc(xStep/xScale) : 1)) { // Lineas verticales
      if (i != 0) {
        p.line(i*xScale,30*yScale,i*xScale,-p.height*yScale);
        p.fill(0,50)
        p.text(i.toString(),i*xScale,13);
      }
    }
    p.text("0",1,13);
    p.fill(0);
    var yStep = 20;
    for (var i = 0; i < (Math.ceil(maxDiameter/yStep)*yStep)+1; i+=(Math.trunc(yStep/yScale) > 0 ? Math.trunc(yStep/yScale) : 1)) { // Lineas horizontales
      if (i != 0) {
        p.line(minDate*xScale,-i*yScale,maxDate*xScale,-i*yScale);
        p.fill(0,50)
        p.text(i.toString()+axisStringMeasure,1,-i*yScale);
      }
    }
    p.pop()
    p.push()
    p.noFill();
    p.strokeWeight(1);
    console.log();
    for (var i = 0; i < coins.length; i++) {
      var centerX = coins[i].fecha*xScale;
      var centerY;
      var diameter = coins[i].diametro;
      if (axisValue == 1) {
        centerY = -diameter*yScale;
        p.push();
        if (selectedCoin == i) {
          p.strokeWeight(3);
        }
        if ((p.pow((p.mouseX-(p.width/2.0)+xOff*10.0 - centerX),2)+p.pow((p.mouseY-p.height+30-yOff*10.0 - centerY),2)) <= p.pow(diameter/2.0,2)) {
          p.stroke(p.random(255),p.random(255),p.random(255));
          if (p.mouseIsPressed && selectedCoin != i) {
            selectedCoin = i;
          } else if (p.mouseIsPressed && selectedCoin == i) {
            selectedCoin = -1;
          }
          // Carga la imagen una vez mientras el mouse este sobre el circulo y la guarda en .hover
          // si ya esta la imagen, solo cambia el valor de hoverCoin al indice del circulo
          if (coins[i].hover == -1 && hoverCoin == -1) {
            img = p.loadImage(coins[i].anverso);
            coins[i].hover = img;
            hoverCoin = i;
          } else if (hoverCoin == -1) {
            hoverCoin = i;
          }
          // Si el mouse esta sobre la moneda que corresponde, dibuja el anverso sobre el circulo
          if (hoverCoin == i) {
            p.image(coins[i].hover,centerX-50,centerY-diameter/2.0-100,100,100);
          }
        } else {
          // Si el mouse no esta sobre el circulo reasigna el mouse
          if (hoverCoin == i) {
            hoverCoin = -1;
          }
        }
        p.ellipse(centerX,centerY,diameter,diameter);
        p.pop();
      }else {
        centerY = -coins[i].peso*yScale;
        p.push();
        if (selectedCoin == i) {
          p.strokeWeight(3);
        }
        if ((p.pow((p.mouseX-(p.width/2.0)+xOff*10.0 - centerX),2)+p.pow((p.mouseY-p.height+30-yOff*10.0 - centerY),2)) <= p.pow(diameter/2.0,2)) {
          p.stroke(p.random(255),p.random(255),p.random(255));
          if (p.mouseIsPressed && selectedCoin != i) {
            selectedCoin = i;
          } else if (p.mouseIsPressed && selectedCoin == i) {
            selectedCoin = -1;
          }
          // Carga la imagen una vez mientras el mouse este sobre el circulo y la guarda en .hover
          // si ya esta la imagen, solo cambia el valor de hoverCoin al indice del circulo
          if (coins[i].hover == -1 && hoverCoin == -1) {
            img = p.loadImage(coins[i].anverso);
            coins[i].hover = img;
            hoverCoin = i;
          } else if (hoverCoin == -1) {
            hoverCoin = i;
          }
          // Si el mouse esta sobre la moneda que corresponde, dibuja el anverso sobre el circulo
          if (hoverCoin == i) {
            p.image(coins[i].hover,centerX-50,centerY-diameter/2.0-100,100,100);
          }
        } else {
          // Si el mouse no esta sobre el circulo reasigna el mouse
          if (hoverCoin == i) {
            hoverCoin = -1;
          }
        }
        p.ellipse(centerX,centerY,diameter,diameter);
        p.pop();
      }
      // if (i == 862) { // Moneda grande
      // }
    }

    p.pop()

    p.translate(-60,30);
    // p.translate(xOff*10.0,0);
    p.translate(-p.width/2.0,-p.height);
  };
  var divInfo = document.createElement('div');
  var imgHTMLAnverso = document.createElement('img');
  imgHTMLAnverso.style.width = "200px";
  var imgHTMLReverso = document.createElement('img');
  imgHTMLReverso.style.width = "200px";
  p.mouseClicked = function(){
    if (selectedCoin != -1) {
      // img = p.loadImage(coins[selectedCoin].anverso);
      imgHTMLAnverso.src = coins[selectedCoin].anverso;
      imgHTMLReverso.src = coins[selectedCoin].reverso;
      divInfo.innerText = 'Nombre: ' + coins[selectedCoin].nombre + '\n'
        + 'Fecha: ' + coins[selectedCoin].fechaMostrar + '\n'
        + 'Peso: ' + coins[selectedCoin].peso + 'gr\n'
        + 'Diametro: ' + coins[selectedCoin].diametro + 'mm';
      document.getElementById('nemusProyect').appendChild(divInfo);
      document.getElementById('nemusProyect').appendChild(imgHTMLAnverso);
      document.getElementById('nemusProyect').appendChild(imgHTMLReverso);

      console.log(selectedCoin);
    }
  };
  p.mousePressed = function(){
    // console.log(p.mouseX-(p.width/2.0)-xOff*10.0,p.mouseY-p.height,xOff,xOff*10.0);
  };

  // p.windowResized = function(){
  //   p.resizeCanvas(p.windowWidth-550, 400);
  // }
};

var varProyect = new p5(nemusProyect, 'nemusProyect');
