let productos=[]
class producto {
    constructor(obj) {
      this.id = obj.id;
      this.descripcionProducto = obj.descripcionProducto;
      this.stockProducto = obj.stockProducto;
      this.precioVentaUnitario = obj.precioVentaUnitario;
      this.img=obj.img; 
      this.cantidad=obj.cantidad;
      this.pais=obj.pais;
    }
    mostrarEnCarrito() {
      let div = document.createElement(`div`);
      div.setAttribute(`class`, "modal-body");
      div.innerHTML = `
         <h5 class="text-center">${this.descripcionProducto}</h5>
         <p id="cant${this.id}" class="text-center" >unidades:
         <button class="btn btn-info btn-sm " >
               +
         </button>
        
         ${this.cantidad} 
         <button class="btn btn-danger btn-sm">
             -
         </button>
         
         precio: ${this.precioVentaUnitario}</p>

         <a href="#" class="btn btn-primary btn-block botonEliminar" id="botonEliminar${this.id}">Eliminar</a>
    
         `
         return div;
    }
  }

   
