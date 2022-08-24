let productos=[]
class producto {
    constructor(id, descripcionProducto, precioVentaUnitario, stockProducto,img,cantidad) {
      this.id = id;
      this.descripcionProducto = descripcionProducto;
      this.stockProducto = stockProducto;
      this.precioVentaUnitario = precioVentaUnitario;
      this.img=img; 
      this.cantidad=cantidad;
    }
    vendido() {
      console.log(this.descripcionProducto + " fue Vendido");
    }
    actualizaStockProducto() {
      console.log(this.descripcionProducto + " tiene stock de " + this.stockProducto);
    }
  }

  function traerProductosDeLaBase(){
    productos=[];
    let producto1 = new producto(1,"Campari 750ml", 1800, 3,"../img/campari.png");
    let producto2 = new producto(2, "Puerto de inidias clasico 700ml", 1800, 150,"../img/puertodeindiasclasic.png");
    let producto3 = new producto(3, "Gin Bombay Bramble 700", 3800, 150,"../img/bombaybramle.png");
    let producto4 = new producto(4, "Capel reservado clasico 700ml",4200, 300,"../img/capelreservadotransparente.png");
    let producto5 = new producto(5, "Negroni 750ml", 5000, 190,"../img/negroni.png");
    let producto6 = new producto(6, "Heraclito clasico 700ml", 4500, 180,"../img/heraclitolondondry.png" );
    let producto7 = new producto(7, "Whisky Jack Daniels 750ml", 12000, 170, "../img/whiskyjackdaniels.png");
    let producto8 = new producto(8, "Ron Avana Club clasico 700ml", 6300, 165, "../img/ronavanaclub.png");
    productos = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8];
    return productos;
  } 
    
