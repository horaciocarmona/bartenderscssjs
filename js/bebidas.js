// Declaracion de variables
let carritoDeCompra = [];
let productosParaCarrito = [] ;
let listadoCarritosIngresados = [];
let fechaIngreso;
let arrayPaises=[];
let puedeComprar;
let productoElegido;
const contenerdorDeProductos = document.getElementById('contenedorProductos');
const contenedorDeCarrito = document.getElementById('contenedorCarrito');
const contenedorDePais = document.getElementById('contenedorPais');
const contenedorTituloDeCarrito = document.getElementById('tituloCarrito');
const contadorCarrito = document.getElementById('contadorCarrito');
const importeTotalCarrito = document.getElementById('importeTotalEnCarrito');
const btnAgregarProducto = document.getElementById(`buttonCarrito`);
const listadoDeClientesAuxiliar = JSON.parse(localStorage.getItem("listadoClientesIngresados"));
// controla ingreso del cliente y habilita compra y carga de carrito anterior
const clienteLogeado = JSON.parse(sessionStorage.getItem("clienteLogeado"));
const p = document.createElement(`p`);

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
    duration: 2400,
    className:"info",
    newWindow: true,
    close: true,
    style: {
      width: "28vw" ,
      height: "30vh",
      backgroundImage: `url("../img/cliente2.jpg")`,
      backgroundColor: "transparent"},    
    offset: {
      x: "0em", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
      y: "5em" // vertical axis - can be a number or a string indicating unity. eg: '2em'
    },
    // gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
  }).showToast();
}

// fin de control cliente

// evento para mostrar el carrito
btnAgregarProducto.addEventListener(`click`, () =>{ puedeComprar && actualizarCarrito();
  $('#ventanaCarrito').modal('show')});

  
// ********** carga en la pagina los productos y botones para comprar
if (puedeComprar){
  verificarCarritoAnterior();
  verificarCarritoActual();
}


mostrarProducto();

// ********** termina la ejecucion

function mostrarProducto() {
  // Syntax &&
  // carritoDeCompra.length == 0 && (

    fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        console.info("datos",data);
        arrayPaises=data;
        cargarPais(data);
    })
    .catch(err => console.error(err))

  // Carga los productos en la pagina

  
  fetch(`../js/datamock.json`)
  .then((respuesta)=>respuesta.json())
  .then((datos)=>{
    productosParaCarrito=[];
    datos.forEach(ele => {
      nuevoProducto = new producto({id:ele.id, descripcionProducto:ele.descripcionProducto, precioVentaUnitario:ele.precioVentaUnitario, stockProducto:ele.stockProducto, img:ele.img, cantidad:ele.cantidad,pais:ele.pais});
      productosParaCarrito.push(nuevoProducto);
    })
    productosParaCarrito.forEach(ele => {
      // Syntax Desestructuracion con alias
      if (carritoDeCompra.length > 0) {
        existeProducto=carritoDeCompra.find( item => item.id===ele.id);
        (existeProducto) && (ele.stockProducto -= existeProducto.cantidad);          
      }
      const {id,img,descripcionProducto:descripcion,precioVentaUnitario:precio,stockProducto:stock}=ele;
      let div = document.createElement("div");
      div.className = "col-12 col-md-3 col-sm-6 col-xl-3 producto";
      div.innerHTML = ` 
             <img src=${img} class="rounded mx-auto d-block imagenhover" alt="Campari">
             <div class="card-body">
                 <h5 class="text-center">${descripcion}</h5>
                 <p class="text-center"> Precio: ${precio}$</p>
                 <p id="stock${id}" class="text-center"> Stock: ${stock}</p>
                 <div class="d-flex justify-content-evenly mb-4">
                    <a href="#" class="btn btn-primary " data-toggle="modal" data-target="#exampleModal" id="botonAgregar${ele.id}">Comprar</a>
                    <a href="#" class="btn btn-primary " data-toggle="modal" data-target="#exampleModal" id="botonPais${ele.id}">pais</a>
                 </div>
              </div>   
         `;
      contenerdorDeProductos.appendChild(div);
      let btnAgregarProducto = document.getElementById(`botonAgregar${id}`);
      stock > 0 && (btnAgregarProducto.addEventListener(`click`, () => agregarProductoAlCarrito(id)));
      // if ( stock > 0) {
      //     btnAgregarProducto.addEventListener(`click`, () => agregarProductoAlCarrito(id))
      // }
      let btnAgregarPais = document.getElementById(`botonPais${id}`);
      btnAgregarPais.addEventListener(`click`, () =>{
         let paisElegido = arrayPaises.find(pais => pais.cca2 === ele.pais); 
         contenedorDePais.innerText="";
         if (paisElegido){
            div = document.createElement(`div`);
            div.setAttribute(`class`, "modal-body");
            div.innerHTML = `
            <h5 class="text-center">${paisElegido.region}</h5>
            <p> Subregion:${paisElegido.subregion} </p>
            <p> Nombre:${paisElegido.name.common} </p>

          `
           btnAgregarPais.innerHTML=`<img width="20" height="20" src="${paisElegido.flags.png}">` ;
           contenedorDePais.appendChild(div);
          } 
          $('#ventanaPais').modal('show');
      })
    });

    // cargar paises  

    cargarPais=(data)=>{
      // Busco para los productos su bandera
        productosParaCarrito.forEach(ele => {
        div = document.createElement(`div`);
        paisElegido = data.find(pais => pais.cca2 === ele.pais);
        if (paisElegido){
           btnAgregarPais = document.getElementById(`botonPais${ele.id}`);
           btnAgregarPais.innerHTML=`<img width="20" height="20" src="${paisElegido.flags.png}">` ;
        }  
      })  
    }        
  
  })
}




