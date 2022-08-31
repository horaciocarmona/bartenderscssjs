// Declaracion de variables
let carritoDeCompra = [];
let productosParaCarrito = [] ;
let listadoCarritosIngresados = [];
let fechaIngreso;

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

// fecha y hora actual
// const fechaActualDeCompra=DateTime.now();
// Syntax ternario para si existe cliente logeado
clienteLogeado ? puedeComprar = true : puedeComprar = false;
// Syntax uso del operador ?
if (puedeComprar) {

  p.innerHTML = `
   Nombre del cliente: ${clienteLogeado?.nombre || "La propiedad no existe"} 
  `
  contenedorTituloDeCarrito.appendChild(p);
  fechaIngreso=clienteLogeado.fechaIngreso;
  //establecemos 2hs 15 minutos para comprar
  const dur = Duration.fromObject({ hours: 2, minutes: 15 });
  const dt=DateTime.fromISO(fechaIngreso);

  const tiempoParaComprar=dt.plus(dur);
  Toastify({
    text: `Bienvenido  ${clienteLogeado?.nombre || "La propiedad no existe"}`,
    duration: 2500,
    className:"info",
    newWindow: true,
    close: true,
    offset: {
      x: 250, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
      y: 210 // vertical axis - can be a number or a string indicating unity. eg: '2em'
    },
    avatar:"../img/cliente.png",
    // gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
  }).showToast();
}

// fin de control cliente

// evento para mostrar el carrito
btnAgregarProducto.addEventListener(`click`, () =>{ puedeComprar && actualizarCarrito();
  $('#ventanaCarrito').modal('show')});

// ********** carga en la pagina los productos y botones para comprar
mostrarProducto();
if (puedeComprar){
  verificarCarritoAnterior();
  verificarCarritoActual();
}

// ********** termina la ejecucion

function mostrarProducto() {
  if (productosParaCarrito.length == 0){
      productosParaCarrito = traerProductosDeLaBase();
  }
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
    if ( stock > 0) {
        btnAgregarProducto.addEventListener(`click`, () => agregarProductoAlCarrito(id))
    }
 
  });
}


