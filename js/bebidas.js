let carritoDeCompra=[];
let productosParaCarrito=[];
const contenerdorDeProductos=document.getElementById('contenedorProductos');
const contenedorDeCarrito=document.getElementById('contenedorCarrito');
let contadorCarrito=document.getElementById('contadorCarrito');
let importeTotalCarrito=document.getElementById('importeTotalCarrito');

mostrarProducto();

// $('#ventanaCarrito').modal({
//     show:true
// });

// $('#ventanaCarrito').modal('hide')

function mostrarProducto(){
    productosParaCarrito=traerProductosDeLaBase();
    productosParaCarrito.forEach(ele => {
       let div=document.createElement("div"); 
       div.className="col-12 col-md-3 col-sm-6 col-xl-3 producto";
       div.innerHTML=` 
           <img src=${ele.img} class="rounded mx-auto d-block imagenhover" alt="Campari">
           <div class="card-body">
               <h5 class="text-center">${ele.descripcionProducto}</h5>
               <p class="text-center"> Precio: ${ele.precioVentaUnitario}$</p>
               <a href="#" class="btn btn-primary btn-block" id="botonAgregar${ele.id}">Comprar</a>
           </div>   
       `      ;
        contenerdorDeProductos.appendChild(div);
        let btnAgregarProducto=document.getElementById(`botonAgregar${ele.id}`);
        btnAgregarProducto.addEventListener(`click`,()=> agregarProductoAlCarrito(ele.id))
    });
}

function mostrarCarrito(productoAgregar){
    let div=document.createElement(`div`);
    div.setAttribute(`class`,`modal-body`);
    div.innerHTML=`
    <h5 class="text-center">${productoAgregar.descripcionProducto}</h5>
    <p class="text-center">precio: ${productoAgregar.precioVentaUnitario}</p>
    <a href="#" class="btn btn-primary btn-block botonEliminar">Eliminar</a>

    `
    contenerdorDeCarrito.appendChild(div);
     $('#ventanaCarrito').modal({
         show:true
    });

}

function agregarProductoAlCarrito(id){
   let productoElegido= productosParaCarrito.find(producto=>producto.id=id);
   if (carritoDeCompra.length === 0) {
    productoElegido.stockProducto--;
    productoElegido.cantidad = 1;
    carritoDeCompra.push(productoElegido);
  } else {
    let productoEnCarrito = carritoDeCompra.find(produ => produ.id === id);
    if (productoEnCarrito) {
      productoEnCarrito.cantidad++;
      productoEnCarrito.stockProducto--;
      if (productoEnCarrito.stockProducto === 0) {
        productos = productosParaCarrito.filter(produ => produ.id != id);
      }
    } else {
      productoElegido.cantidad = 1;
      productoElegido.stockProducto--;
      carritoDeCompra.push(productoElegido);
    }
    mostrarCarrito(productoElegido);
}


}

function actualizarCarrito(){
    
}

