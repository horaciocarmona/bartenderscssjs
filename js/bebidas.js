// Declaracion de variables
let carritoDeCompra = [];
let productosParaCarrito = [];
let listadoCarritosIngresados = [];
const contenerdorDeProductos = document.getElementById('contenedorProductos');
const contenedorDeCarrito = document.getElementById('contenedorCarrito');
const contenedorTituloDeCarrito = document.getElementById('tituloCarrito');
let contadorCarrito = document.getElementById('contadorCarrito');
let importeTotalCarrito = document.getElementById('importeTotalEnCarrito');
let btnAgregarProducto = document.getElementById(`buttonCarrito`);
let listadoDeClientesAuxiliar = JSON.parse(localStorage.getItem("listadoClientesIngresados"));

// controla ingreso del cliente y habilita compra y carga de carrito anterior
let clienteLogeado = JSON.parse(sessionStorage.getItem("clienteLogeado"));
let p = document.createElement(`p`);
if (clienteLogeado) {
  p.innerHTML = `
   Nombre del cliente: ${clienteLogeado.nombre} 
  `
  contenedorTituloDeCarrito.appendChild(p);
}
let puedeComprar = false;
if (clienteLogeado) {
  puedeComprar = true;
  verificarCarritoAnterior();
}
// fin de control cliente

// evento para mostrar el carrito
btnAgregarProducto.addEventListener(`click`, () => $('#ventanaCarrito').modal('show'));

// cierra pantalla del carrito
$(".cerrarModal").click(function () {
  $("#ventanaCarrito").modal('hide')

});

// boton de compra del carrito
$(".comprarModal").click(function () {
  $("#ventanaCarrito").modal('hide');
  guardarCarritoEnLocalStorage();
  contenedorDeCarrito.innerHTML="";
  verificarCarritoAnterior();
  carritoDeCompra = [];
  actualizarCarrito();
});

// ********** carga en la pagina los productos y botones para comprar
mostrarProducto();
// ********** termina la ejecucion

function mostrarProducto() {
  productosParaCarrito = traerProductosDeLaBase();
  productosParaCarrito.forEach(ele => {
    let div = document.createElement("div");
    div.className = "col-12 col-md-3 col-sm-6 col-xl-3 producto";
    div.innerHTML = ` 
           <img src=${ele.img} class="rounded mx-auto d-block imagenhover" alt="Campari">
           <div class="card-body">
               <h5 class="text-center">${ele.descripcionProducto}</h5>
               <p class="text-center"> Precio: ${ele.precioVentaUnitario}$</p>
               <p id="stock${ele.id}" class="text-center"> Stock: ${ele.stockProducto}</p>
               <a href="#" class="btn btn-primary btn-block mb-3" data-toggle="modal" data-target="#exampleModal" id="botonAgregar${ele.id}">Comprar</a>
           </div>   
       `;
    contenerdorDeProductos.appendChild(div);
    let btnAgregarProducto = document.getElementById(`botonAgregar${ele.id}`);
    if (ele.stockProducto > 0 && puedeComprar) {
      btnAgregarProducto.addEventListener(`click`, () => agregarProductoAlCarrito(ele.id))
    }
  });
}

function mostrarCarrito(productoAgregar) {
  let div = document.createElement(`div`);
  div.setAttribute(`class`, "modal-body");
  div.innerHTML = `
     <h5 class="text-center">${productoAgregar.descripcionProducto}</h5>
     <p id="cant${productoAgregar.id}" class="text-center">unidades: ${productoAgregar.cantidad} precio: ${productoAgregar.precioVentaUnitario}</p>
     <a href="#" class="btn btn-primary btn-block botonEliminar" id="botonEliminar${productoAgregar.id}">Eliminar</a>

     `
  contenedorDeCarrito.appendChild(div);
  existeProducto = carritoDeCompra.find(item => item.id === productoAgregar.id);
  if (existeProducto) {
    existeProducto.StockProducto = existeProducto.StockProducto + carritoDeCompra.stockProducto + 1;
  }
  let boton = document.getElementById(`botonEliminar${productoAgregar.id}`);
  boton.addEventListener(`click`, () => {
    existeProducto = carritoDeCompra.find(item => item.id === productoAgregar.id);
    if (existeProducto) {
      existeProducto.stockProducto = existeProducto.stockProducto + productoAgregar.cantidad;
    }
    boton.parentElement.remove();
    carritoDeCompra = carritoDeCompra.filter((item => item.id !== productoAgregar.id))
    document.getElementById(`stock${existeProducto.id}`).innerHTML = `<p id="stock${existeProducto.id}" class="text-center"> Stock: ${existeProducto.stockProducto}</p>`;
    actualizarCarrito();

  })
  $('#ventanaCarrito').modal('show');

}

function mostrarCarritoAnterior(producto) {
  let div = document.createElement(`div`);
  div.setAttribute(`class`, "modal-body carritoAnterior");
  div.innerHTML = `
  <h5 class="text-center">${producto.descripcionProducto}</h5>
  <p class="text-center">unidades: ${producto.cantidad} precio: ${producto.precioVentaUnitario}</p>

  `
  contenedorDeCarrito.appendChild(div);
}

function agregarProductoAlCarrito(id) {

  let productoElegido = productosParaCarrito.find(producto => producto.id === id);
  if (productoElegido.stockProducto > 0) {
    if (carritoDeCompra.length === 0) {
      productoElegido.stockProducto--;
      productoElegido.cantidad = 1;
      productoElegido.cliente = clienteLogeado;
      carritoDeCompra.push(productoElegido);
      mostrarCarrito(productoElegido);
      actualizarCarrito();

    } else {
      let productoEnCarrito = carritoDeCompra.find(produ => produ.id === id);
      if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
        productoEnCarrito.stockProducto--;
        document.getElementById(`cant${productoEnCarrito.id}`).innerHTML = `<p id="cant${productoEnCarrito.id}" class="text-center">unidades: ${productoEnCarrito.cantidad} precio: ${productoEnCarrito.precioVentaUnitario}</p>`;
        $('#ventanaCarrito').modal('show');
        actualizarCarrito();
        //   if (productoEnCarrito.stockProducto === 0) {
        //     // productos = productosParaCarrito.filter(produ => produ.id !== id);
        //   }
      } else {
        productoElegido.cantidad = 1;
        productoElegido.stockProducto--;
        productoElegido.cliente = clienteLogeado;
        carritoDeCompra.push(productoElegido);
        mostrarCarrito(productoElegido);
        actualizarCarrito();

      }
    }
  }
  document.getElementById(`stock${productoElegido.id}`).innerHTML = `<p id="stock${productoElegido.id}" class="text-center"> Stock: ${productoElegido.stockProducto}</p>`;

}

function actualizarCarrito() {
  contadorCarrito.innerText = "Unidades: " + carritoDeCompra.reduce((unid, item) => unid + item.cantidad, 0);
  importeTotalCarrito.innerText = "Importe Total: " + carritoDeCompra.reduce((total, item) => total + (item.precioVentaUnitario * item.cantidad), 0);
}

function guardarCarritoEnLocalStorage() {
  localStorage.setItem("listadoCarritosIngresados", JSON.stringify(carritoDeCompra));
}

function verificarCarritoAnterior() {
  let listadoDeCarritoAuxiliar = JSON.parse(localStorage.getItem("listadoCarritosIngresados"));
  listadoCarritosIngresados = [];
  if (listadoDeCarritoAuxiliar) {
    for (elemento of listadoDeCarritoAuxiliar) {
      if (elemento.cliente.nombre == clienteLogeado.nombre) {
        listadoCarritosIngresados.push(new producto(elemento.id, elemento.descripcionProducto, elemento.precioVentaUnitario,elemento.stockProducto,elemento.img ,elemento.cantidad));
      }
    }
  }
  if (listadoCarritosIngresados.length > 0) {
    let div = document.createElement(`div`);
    div.innerHTML = `
    <h5 class="text-center tituloCarritoH5">Ultimo carrito de compra</h5>
  
    `
    contenedorDeCarrito.appendChild(div);

    for (element of listadoCarritosIngresados) {
      mostrarCarritoAnterior(element);
    }
    div = document.createElement(`div`);
    div.innerHTML = `
    <h5 class="text-center tituloCarritoH5">Carrito de compra actual</h5>
  
    `
    contenedorDeCarrito.appendChild(div);

  }

}