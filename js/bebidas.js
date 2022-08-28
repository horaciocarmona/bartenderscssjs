// Declaracion de variables
let carritoDeCompra = [];
let productosParaCarrito = [];
let listadoCarritosIngresados = [];
const contenerdorDeProductos = document.getElementById('contenedorProductos');
const contenedorDeCarrito = document.getElementById('contenedorCarrito');
const contenedorTituloDeCarrito = document.getElementById('tituloCarrito');
const contadorCarrito = document.getElementById('contadorCarrito');
const importeTotalCarrito = document.getElementById('importeTotalEnCarrito');
const btnAgregarProducto = document.getElementById(`buttonCarrito`);
const listadoDeClientesAuxiliar = JSON.parse(localStorage.getItem("listadoClientesIngresados"));

// controla ingreso del cliente y habilita compra y carga de carrito anterior
const clienteLogeado = JSON.parse(sessionStorage.getItem("clienteLogeado"));
const p = document.createElement(`p`);
let puedeComprar;

// Syntax ternario para si existe cliente logeado
clienteLogeado ? puedeComprar = true : puedeComprar = false;

// Syntax uso del operador ?
if (puedeComprar) {
  p.innerHTML = `
   Nombre del cliente: ${clienteLogeado?.nombre || "La propiedad no existe"} 
  `
  contenedorTituloDeCarrito.appendChild(p);
  verificarCarritoAnterior();
}

// fin de control cliente

// evento para mostrar el carrito
btnAgregarProducto.addEventListener(`click`, () => $('#ventanaCarrito').modal('show'));

// ********** carga en la pagina los productos y botones para comprar
mostrarProducto();
// ********** termina la ejecucion

function mostrarProducto() {
  productosParaCarrito = traerProductosDeLaBase();
  productosParaCarrito.forEach(ele => {
    // Syntax Desestructuracion con alias
    const {id,img,descripcionProducto:descripcion,precioVentaUnitario:precio,stockProducto:stock}=ele;
    let div = document.createElement("div");
    div.className = "col-12 col-md-3 col-sm-6 col-xl-3 producto";
    div.innerHTML = ` 
           <img src=${img} class="rounded mx-auto d-block imagenhover" alt="Campari">
           <div class="card-body">
               <h5 class="text-center">${descripcion}</h5>
               <p class="text-center"> Precio: ${precio}$</p>
               <p id="stock${id}" class="text-center"> Stock: ${stock}</p>
               <a href="#" class="btn btn-primary btn-block mb-3" data-toggle="modal" data-target="#exampleModal" id="botonAgregar${ele.id}">Comprar</a>
           </div>   
       `;
    contenerdorDeProductos.appendChild(div);
    let btnAgregarProducto = document.getElementById(`botonAgregar${id}`);
    if (stock > 0 && puedeComprar) {
      btnAgregarProducto.addEventListener(`click`, () => agregarProductoAlCarrito(id))
    }
  });
}


