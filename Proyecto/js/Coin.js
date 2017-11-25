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
  this.anversoURL = obj.Anverso;
  this.reversoURL = obj.Reverso;
  this.anverso = -1;
  this.reverso = -1;
}
