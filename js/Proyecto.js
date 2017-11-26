var selectedCoin = -1;
var coins = [];
var linkSelectedCoin = -1;
var nemusProyect = function( p ) {
  var Color;
  var year = document.getElementById('yearIn');
  var diameterMin = document.getElementById('diameterMinIn');
  var diameterMax = document.getElementById('diameterMaxIn');
  var weightMin = document.getElementById('weightMinIn');
  var weightMax = document.getElementById('weightMaxIn');
  var dateMin = document.getElementById('dateMinIn');
  var dateMax = document.getElementById('dateMaxIn');
  var searchBox = "";
  // var minYear = 1800;
  // var maxYear = 1900;
  var minYear = Number.MAX_VALUE;
  var maxYear = Number.MIN_VALUE;
  var minDiam = Number.MAX_VALUE;
  var maxDiam = Number.MIN_VALUE;
  var minWeig = Number.MAX_VALUE;
  var maxWeig = Number.MIN_VALUE;
  var minDiameter;
  var maxDiameter;
  var minWeight;
  var maxWeight;
  var minDate;
  var maxDate;
  var diameterMax
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
  // var selectedCoin = -1;
  if ( typeof(document.getElementById('buttonSearch')) != 'undefined' && document.getElementById('buttonSearch') != null) {
    document.getElementById('buttonSearch').onclick = function() {
      searchBox = document.getElementById('searhIn').value;
    };
  }
  document.getElementById('buttonSearchReset').onclick = function() {
    document.getElementById('searhIn').value = "";
    searchBox = "";
  };
  window.onload = function(){
  }
  // document.getElementById('yearIn').max = maxYear;
  // document.getElementById('yearIn').min = minYear;

  p.preload = function(){
    lines = p.loadTable("/visualnumismatica/data/nomisma1.csv",'csv','header'); //////////////////////////////
    // Local
    // lines = p.loadTable("data/nomisma1.csv",'csv','header'); //////////////////////////////
  }
  var c2;
  p.setup = function() {
    // c2 = p.createCanvas(200,700);
    // c2.parent('coinZoom')
    p.createCanvas(document.getElementById('nemusProyect').offsetWidth, 400);
    // p.frameRate(0.1);
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
    diameterMin.value = minDiam;
    maxDiameter = maxDiam;
    diameterMax.value = maxDiam;
    minWeight = minWeig;
    weightMin.value = minWeig;
    maxWeight = maxWeig;
    weightMax.value = maxWeig;
    minDate = minYear;
    dateMin.value = minYear;
    maxDate = maxYear;
    dateMax.value = maxYear;
    console.log(coins[73]);
    console.log(minYear,maxYear,minDiam,maxDiam,minWeig,maxWeig);
    document.getElementById('xZoom').value = 2;
  };

  p.draw = function() {
    diameterMin.min = minDiameter-1.5;
    diameterMin.max = diameterMax.value;
    diameterMax.min = diameterMin.value;
    diameterMax.max = maxDiameter+1;
    document.getElementById('spanDiamMin').innerHTML = diameterMin.value;
    document.getElementById('spanDiamMax').innerHTML = diameterMax.value;
    weightMin.min = minWeight-1.5;
    weightMin.max = weightMax.value;
    weightMax.min = weightMin.value;
    weightMax.max = maxWeight+1;
    document.getElementById('spanWeightMin').innerHTML = weightMin.value;
    document.getElementById('spanWeightMax').innerHTML = weightMax.value;
    dateMin.min = minDate;
    dateMin.max = dateMax.value;
    dateMax.min = dateMin.value;
    dateMax.max = maxDate;
    document.getElementById('spanDateMin').innerHTML = dateMin.value;
    document.getElementById('spanDateMax').innerHTML = dateMax.value;
    document.getElementById('xZoom').max = 30;
    document.getElementById('xZoom').min = 0.12;
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
      document.getElementById('filter-diameter').style.display = 'inline-block';
      document.getElementById('filter-weight').style.display = 'none';
      p.text("Diametro",-p.width/2.0,-300);
      axisStringMeasure = "mm";
    } else {
      document.getElementById('spanIndicator').innerHTML = "Peso";
      document.getElementById('yRange').max = maxWeight/10*yScale;
      document.getElementById('yRange').min = minWeight/10*yScale;
      document.getElementById('filter-diameter').style.display = 'none';
      document.getElementById('filter-weight').style.display = 'inline-block';
      p.text("Peso",-p.width/2.0,-300);
      axisStringMeasure = "gr";
    }
    yOff = document.getElementById('yRange').value;
    if (document.getElementById('searhIn').value != "") {
      document.getElementById('buttonSearchReset').style.display = '';
    } else {
      document.getElementById('buttonSearchReset').style.display = 'none';
    }

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
    for (var i = 0; i < coins.length; i++) {
      if ((typeof(searchBox) != 'undefined' && searchBox != null) && searchBox != "") {
        if (!coins[i].nombre.toLowerCase().includes(searchBox.toLowerCase())) {
          continue;
        }
      }
      if (coins[i].fecha >= dateMin.value && coins[i].fecha <= dateMax.value) {
        var centerX = coins[i].fecha*xScale;
        var centerY;
        var diameter = coins[i].diametro;
        if (axisValue == 1) {
          if (diameter >= diameterMin.value && diameter <= diameterMax.value ) {
            centerY = -diameter*yScale;
            p.push();
            if (selectedCoin == i) {
              p.strokeWeight(3);
            }
            if (mouseIsInSketch(p) && (p.pow((p.mouseX-(p.width/2.0)+xOff*10.0 - centerX),2)+p.pow((p.mouseY-p.height+30-yOff*10.0 - centerY),2)) <= p.pow(diameter/2.0,2)) {
              p.stroke(p.random(255),p.random(255),p.random(255));
              if (p.mouseIsPressed && selectedCoin != i) {
                selectedCoin = i;
              } else if (p.mouseIsPressed && selectedCoin == i) {
                selectedCoin = -1;
              }
              // Carga la imagen una vez mientras el mouse este sobre el circulo y la guarda en .hover
              // si ya esta la imagen, solo cambia el valor de hoverCoin al indice del circulo
              if (coins[i].anverso == -1 && hoverCoin == -1) {
                img = p.loadImage(coins[i].anversoURL);
                coins[i].anverso = img;
                img = p.loadImage(coins[i].reversoURL);
                coins[i].reverso = img;
                hoverCoin = i;
              } else if (hoverCoin == -1) {
                hoverCoin = i;
              }
              // Si el mouse esta sobre la moneda que corresponde, dibuja el anverso sobre el circulo
              if (hoverCoin == i) {
                p.image(coins[i].anverso,centerX-50,centerY-diameter/2.0-100,100,100);
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
        }else {
          if (coins[i].peso >= weightMin.value && coins[i].peso <= weightMax.value ) {
            centerY = -coins[i].peso*yScale;
            p.push();
            if (selectedCoin == i) {
              p.strokeWeight(3);
            }
            if (mouseIsInSketch(p) && (p.pow((p.mouseX-(p.width/2.0)+xOff*10.0 - centerX),2)+p.pow((p.mouseY-p.height+30-yOff*10.0 - centerY),2)) <= p.pow(diameter/2.0,2)) {
              p.stroke(p.random(255),p.random(255),p.random(255));
              if (p.mouseIsPressed && selectedCoin != i) {
                selectedCoin = i;
              } else if (p.mouseIsPressed && selectedCoin == i) {
                selectedCoin = -1;
              }
              // Carga la imagen una vez mientras el mouse este sobre el circulo y la guarda en .hover
              // si ya esta la imagen, solo cambia el valor de hoverCoin al indice del circulo
              if (coins[i].anverso == -1 && hoverCoin == -1) {
                img = p.loadImage(coins[i].anversoURL);
                coins[i].anverso = img;
                img = p.loadImage(coins[i].reversoURL);
                coins[i].reverso = img;
                hoverCoin = i;
              } else if (hoverCoin == -1) {
                hoverCoin = i;
              }
              // Si el mouse esta sobre la moneda que corresponde, dibuja el anverso sobre el circulo
              if (hoverCoin == i) {
                p.image(coins[i].anverso,centerX-50,centerY-diameter/2.0-100,100,100);
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
        }
        // if (i == 862) { // Moneda grande
        // }
      }
    }

    p.pop()

    p.translate(-60,30);
    // p.translate(xOff*10.0,0);
    p.translate(-p.width/2.0,-p.height);
  };
  var divInfo = document.createElement('div');
  var divTest = document.createElement('div');
  var buttonReset = document.createElement('button');
  buttonReset.id = 'buttonReset';
  buttonReset.innerHTML = 'Restaurar';
  buttonReset.className = 'btn btn-secondary'
  // divTest.id = 'zoomCoin';
  // var imgHTMLAnverso = document.createElement('img');
  // imgHTMLAnverso.style.width = "300px";
  // var imgHTMLReverso = document.createElement('img');
  // imgHTMLReverso.style.width = "300px";
  p.mouseClicked = function(){
    if (selectedCoin != -1) {
      if (coins[selectedCoin].anverso == -1) {
        img = p.loadImage(coins[selectedCoin].anversoURL);
        coins[selectedCoin].anverso = img;
      }
      if (coins[selectedCoin].reverso == -1) {
        img = p.loadImage(coins[selectedCoin].reversoURL);
        coins[selectedCoin].reverso = img;
      }
      // img = p.loadImage(coins[selectedCoin].anversoURL);
      document.getElementById('nemusProyect').appendChild(divTest);
      // imgHTMLAnverso.src = coins[selectedCoin].anverso;
      // imgHTMLReverso.src = coins[selectedCoin].reverso;
      divInfo.innerText = 'Nombre: ' + coins[selectedCoin].nombre + '\n'
        + 'Fecha: ' + coins[selectedCoin].fechaMostrar + '\n'
        + 'Peso: ' + coins[selectedCoin].peso + 'gr\n'
        + 'Diametro: ' + coins[selectedCoin].diametro + 'mm';
      document.getElementById('nemusProyect').appendChild(divInfo);
      document.getElementById('nemusProyect').appendChild(buttonReset);
      linkSelectedCoin = selectedCoin
      // document.getElementById('nemusProyect').appendChild(imgHTMLAnverso);
      // document.getElementById('nemusProyect').appendChild(imgHTMLReverso);

      // console.log(selectedCoin);
    }
  };
  p.mousePressed = function(){
    // console.log(p.mouseX-(p.width/2.0)-xOff*10.0,p.mouseY-p.height,xOff,xOff*10.0);
  };

  // p.windowResized = function(){
  //   p.resizeCanvas(p.windowWidth-550, 400);
  // }
  p.windowResized = function(){
    p.resizeCanvas(document.getElementById('nemusProyect').offsetWidth,400);
  }
};

var varProyect = new p5(nemusProyect, 'nemusProyect');

function mouseIsInSketch(p){
  if (p.mouseX > -1 && p.mouseX < p.width && p.mouseY > -1 && p.mouseY < p.height) {
    return true;
  }
  return false;
}

var zoomSketch = function(p){
  var scale = 1.0;
  var tx = 0;
  var ty = 0;
  var sx = 0;
  var sy = 0;
  var oneTimePos = -1;
  var currentPosX;
  var currentPosY;
  p.setup = function(){
    p.createCanvas(document.getElementById('zoomSketch').offsetWidth,300);
  }
  var checkExist;

  p.draw = function(){
    checkExist = document.getElementById('buttonReset');
    if (typeof(checkExist) != 'undefined' && checkExist != null) {
      if (scale != 1.0 || sx != 0 || sy != 0) {
        document.getElementById('buttonReset').onclick = function() {
          scale = 1.0;
          sx = 0;
          sy = 0;
        };
        checkExist.disabled = false;
      } else {
        checkExist.disabled = true;
      }
    }
    if (linkSelectedCoin == selectedCoin && selectedCoin != -1 && coins[selectedCoin].anverso != 1 && coins[selectedCoin].reverso != -1) {
      p.push();
      if (mouseIsInSketch(p)) {
        if (p.mouseIsPressed) {
          // debugger;
          if (oneTimePos == -1) {
            currentPosX = p.mouseX;
            currentPosY = p.mouseY;
            oneTimePos +=1;
          }
          sx += (p.mouseX-currentPosX)/10.0;
          sy += (p.mouseY-currentPosY)/10.0;
        } else {
          // currentPosX = sx;
          // currentPosY = sy;
          // p.translate(currentPosX,currentPosY);
          oneTimePos = -1;
        }

      }
      p.translate(sx,sy);
      p.scale(scale);
      p.background(255);
      p.image(coins[selectedCoin].anverso,55,0,300,300);
      p.image(coins[selectedCoin].reverso,355,0,300,300);
      p.pop();
    }
  }

  p.mouseWheel = function(e){
    console.log();
    if (selectedCoin != -1 && mouseIsInSketch(p)) {
      // tx = tx-e.getAmount*(p.mouseX)/100;
      // ty = ty-e.getAmount*(p.mouseY)/100;
      if (e.delta < 0) {
        scale += 0.05
      } else {
        if (scale > 1.0) {
          scale -= 0.05
        }
      }
      return false;
    }
  }

  p.windowResized = function(){
    p.resizeCanvas(document.getElementById('nemusProyect').offsetWidth,300);
  }
};

var tSketch = new p5(zoomSketch, 'zoomSketch');
