let carritoDeCompra=[];
let productosParaCarrito=[];
const contenerdorDeProductos=document.getElementById('contenedorProductos');
const contenedorDeCarrito=document.getElementById('contenedorCarrito');
let contadorCarrito=document.getElementById('contadorCarrito');
let importeTotalCarrito=document.getElementById('importeTotalEnCarrito');
let btnAgregarProducto=document.getElementById(`buttonCarrito`);
btnAgregarProducto.addEventListener(`click`,()=> $('#ventanaCarrito').modal('show') );

$(".cerrarModal").click(function(){
  $("#ventanaCarrito").modal('hide')
});

mostrarProducto();

//  $('#ventanaCarrito').modal({
//      show:true
//  });

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
               <p id="stock${ele.id}" class="text-center"> Stock: ${ele.stockProducto}</p>
               <a href="#" class="btn btn-primary btn-block" data-toggle="modal" data-target="#exampleModal" id="botonAgregar${ele.id}">Comprar</a>
           </div>   
       `      ;
        contenerdorDeProductos.appendChild(div);
        let btnAgregarProducto=document.getElementById(`botonAgregar${ele.id}`);
        if (ele.stockProducto > 0) {
          btnAgregarProducto.addEventListener(`click`,()=> agregarProductoAlCarrito(ele.id))
        }
    });
}

function mostrarCarrito(productoAgregar){
     let div=document.createElement(`div`);
     div.setAttribute(`class`,"modal-body");
     div.innerHTML=`
     <h5 class="text-center">${productoAgregar.descripcionProducto}</h5>
     <p id="cant${productoAgregar.id}" class="text-center">unidades: ${productoAgregar.cantidad} precio: ${productoAgregar.precioVentaUnitario}</p>
     <a href="#" class="btn btn-primary btn-block botonEliminar" id="botonEliminar${productoAgregar.id}">Eliminar</a>

     `
     contenedorDeCarrito.appendChild(div);
     existeProducto=carritoDeCompra.find(item=>item.id === productoAgregar.id);
     if (existeProducto) {
        existeProducto.StockProducto=existeProducto.StockProducto+carritoDeCompra.stockProducto+1;
     } 
     let boton=document.getElementById(`botonEliminar${productoAgregar.id}`);
     boton.addEventListener(`click`,()=>{  
    existeProducto=carritoDeCompra.find(item=>item.id === productoAgregar.id);
    if (existeProducto) {
       existeProducto.stockProducto=existeProducto.stockProducto+productoAgregar.cantidad;
    } 
      boton.parentElement.remove();
      carritoDeCompra=carritoDeCompra.filter((item=>item.id !== productoAgregar.id))
      document.getElementById(`stock${existeProducto.id}`).innerHTML=`<p id="stock${existeProducto.id}" class="text-center"> Stock: ${existeProducto.stockProducto}</p>`;
      actualizarCarrito(); 

    })
     $('#ventanaCarrito').modal('show'); 
    // $('#ventanaCarrito').modal({
    //      show:true
    // });

}

function agregarProductoAlCarrito(id){

  let productoElegido= productosParaCarrito.find(producto=>producto.id===id);
  if (productoElegido.stockProducto > 0){
  if (carritoDeCompra.length === 0) {
    productoElegido.stockProducto--;
    productoElegido.cantidad = 1;
    carritoDeCompra.push(productoElegido);
    mostrarCarrito(productoElegido);
    actualizarCarrito();
  
  } else {
    let productoEnCarrito = carritoDeCompra.find(produ => produ.id === id);
    if (productoEnCarrito) {
      productoEnCarrito.cantidad++;
      productoEnCarrito.stockProducto--;
      document.getElementById(`cant${productoEnCarrito.id}`).innerHTML=`<p id="cant${productoEnCarrito.id}" class="text-center">unidades: ${productoEnCarrito.cantidad} precio: ${productoEnCarrito.precioVentaUnitario}</p>`;
      $('#ventanaCarrito').modal('show'); 
      actualizarCarrito();
    //   if (productoEnCarrito.stockProducto === 0) {
    //     // productos = productosParaCarrito.filter(produ => produ.id !== id);
    //   }
    } else {  
          productoElegido.cantidad = 1;
          productoElegido.stockProducto--;
          carritoDeCompra.push(productoElegido);
          mostrarCarrito(productoElegido);
          actualizarCarrito();
        
    }
  }
  }
  document.getElementById(`stock${productoElegido.id}`).innerHTML=`<p id="stock${productoElegido.id}" class="text-center"> Stock: ${productoElegido.stockProducto}</p>`;
    
}

function actualizarCarrito(){
  contadorCarrito.innerText="Unidades: "+carritoDeCompra.reduce((unid,item)=>unid+item.cantidad,0);    
  importeTotalCarrito.innerText="Importe Total: "+carritoDeCompra.reduce((total,item)=>total+(item.precioVentaUnitario*item.cantidad),0);
}

