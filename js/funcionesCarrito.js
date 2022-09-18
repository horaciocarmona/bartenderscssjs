// boton de compra del carrito
const DateTime=luxon.DateTime;
const Duration=luxon.Duration;
const dur = Duration.fromObject({ hours: 2, minutes: 15 });
const Interval=luxon.Interval;
$(".comprarModal").click(function () {
    $("#ventanaCarrito").modal('hide');
    fechaIngreso=DateTime.local()    
    if (carritoDeCompra.length > 0) {
      contenedorDeCarrito.innerHTML = "";
      localStorage.setItem("listadoCarritosIngresados", JSON.stringify(carritoDeCompra));
      verificarCarritoAnterior();
      carritoDeCompra = [];
      guardarCarritoEnLocalStorage();
    }
  });
  // boton de cancelar carrito
  $(".cancelarModal").click(function () {
    $("#ventanaCarrito").modal('hide');
    if(carritoDeCompra.length>0){
      const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
        title: 'Esta seguro de borrar todos los productos del carrito?',
        text: "Puede borrarlo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, lo borra!',
        cancelButtonText: 'No, no lo borra!',
        reverseButtons: true
      }).then((result) => {
            if (result.isConfirmed) {
              subirStock();
              contenedorDeCarrito.innerHTML = ""; 
              carritoDeCompra = [];
              guardarCarritoEnLocalStorage();
              swalWithBootstrapButtons.fire(
             'Elimino los productos del carrito!',
             'Este carrito queda vacio.',
             'success'
              )
            } else if (
        /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
               'Cancelo la eliminacion de los productos del carrito',
               'Puede seguir comprando con el mismo carrito :)',
               'error'
                )
              }
        })
    }
  })
  
// cierra ventana del carrito
  $(".cerrarModal").click(function () {
    $("#ventanaCarrito").modal('hide')
  });
// cierra ventana del Pais
   $(".cerrarModal").click(function () {
    $("#ventanaPais").modal('hide')
  });
  
  $(".cerrarModal").click(function () {
    $("#ventanaPais").modal('hide')
  
  });
  
  function mostrarCarrito(productoAgregar) {
    const {id,cantidad,descripcionProducto:descripcion,precioVentaUnitario:precio,stockProducto:stock}=productoAgregar;
    contenedorDeCarrito.appendChild(productoAgregar.mostrarEnCarrito());
    // contenedorDeCarrito.appendChild(div);
    let boton = document.getElementById(`botonEliminar${id}`);
    boton.addEventListener(`click`, () => {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
        title: 'Esta seguro de eliminarlo del carrito?',
        text: "Puede eliminarlo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, lo elimina!',
        cancelButtonText: 'No, cancela!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          existeProducto = carritoDeCompra.find(item => item.id === id);
          //Sugar Syntax
          // Syntax &&
          existeProducto && (existeProducto.stockProducto += cantidad);
          boton.parentElement.remove();
          carritoDeCompra = carritoDeCompra.filter((item => item.id !== id))
          document.getElementById(`stock${existeProducto.id}`).innerHTML = `<p id="stock${existeProducto.id}" class="text-center"> Stock: ${existeProducto.stockProducto}</p>`;
          guardarCarritoEnLocalStorage();
          swalWithBootstrapButtons.fire(
            'Lo Elimino!',
            'Este producto fue eliminado del carrito.',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelo la emliminacion',
            'Puede volver a eliminarlo :)',
            'error'
          )
        }
      })
    })
  //   $('#ventanaCarrito').modal('show');
  }
  
  function mostrarCarritoAnterior(producto) {
     contenedorDeCarrito.appendChild(producto.mostrarEnCarrito());
  }
  
  function agregarProductoAlCarrito(id) {
    if (!puedeComprar){
      Toastify({
        text: `Debe registrarse por Contacto`,
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
          x: "5em", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
          y: "15em" // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        // avatar:"../img/cliente.png",
        // gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
      }).showToast();
    } else {   
        productoElegido = productosParaCarrito.find(producto => producto.id === id);
        if (productoElegido.stockProducto > 0) {
           if (carritoDeCompra.length === 0) {
              //Sugar Syntax
               productoElegido.stockProducto--;
               productoElegido.cantidad = 1;
              //  nuevoProducto = new producto(productoElegido.id, productoElegido.descripcionProducto, productoElegido.precioVentaUnitario, productoElegido.stockProducto, productoElegido.img, productoElegido.cantidad);
               nuevoProducto = new producto({id:productoElegido.id, descripcionProducto:productoElegido.descripcionProducto, precioVentaUnitario:productoElegido.precioVentaUnitario, stockProducto:productoElegido.stockProducto, img:productoElegido.img, cantidad:productoElegido.cantidad});
               carritoDeCompra.push(nuevoProducto);
               mostrarCarrito(nuevoProducto);
              } else {
                let productoEnCarrito = carritoDeCompra.find(produ => produ.id === id);
                if (productoEnCarrito) {
                    //Sugar Syntax
                    productoEnCarrito.cantidad++;
                    productoEnCarrito.stockProducto--;
                    productoElegido.stockProducto--;
                    document.getElementById(`cant${productoEnCarrito.id}`).innerHTML = `<p id="cant${productoEnCarrito.id}" class="text-center">unidades: ${productoEnCarrito.cantidad} precio: ${productoEnCarrito.precioVentaUnitario}</p>`;
                } else {
                      productoElegido.cantidad = 1;
                      productoElegido.stockProducto--;
                      nuevoProducto = new producto({id:productoElegido.id, descripcionProducto:productoElegido.descripcionProducto, precioVentaUnitario:productoElegido.precioVentaUnitario, stockProducto:productoElegido.stockProducto, img:productoElegido.img, cantidad:productoElegido.cantidad});
                      carritoDeCompra.push(nuevoProducto);
                      mostrarCarrito(nuevoProducto);
                }
            }
            $('#ventanaCarrito').modal('show'); 
            guardarCarritoEnLocalStorage();

        }  
        document.getElementById(`stock${productoElegido.id}`).innerHTML = `<p id="stock${productoElegido.id}" class="text-center"> Stock: ${productoElegido.stockProducto}</p>`;

    }
  }
  
  function actualizarCarrito() {
    contadorCarrito.innerText = "Unidades: " + carritoDeCompra.reduce((unid, item) => unid + item.cantidad, 0);
    importeTotalCarrito.innerText = "Importe Total: " + carritoDeCompra.reduce((total, item) => total + (item.precioVentaUnitario * item.cantidad), 0);
    const dttiempoIngreso= DateTime.fromISO(fechaIngreso);
    const tiempofinalDeLaCompra=dttiempoIngreso.plus(dur);
    const now = DateTime.now();
    const i = Interval.fromDateTimes(now, tiempofinalDeLaCompra)
    const tiempoRestanteEnLaCompra=i.length(`hours`);
    Toastify({
      text: `Tiempo restante Para comprar ${parseInt(tiempoRestanteEnLaCompra)}:${parseInt(((i.length(`hours`))-parseInt(tiempoRestanteEnLaCompra))*60)} hs `,
      duration: 2500,
      className:"info",
      newWindow: true,
      close: true,
      style: {
        width: "14vw" ,
        height: "37vh",
        backgroundImage: `url("../img/relojarena5.png")`,
        backgroundColor: "transparent"},    

      offset: {
        x: "3em", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
        y: "3em" // vertical axis - can be a number or a string indicating unity. eg: '2em'
      },
      // gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
    }).showToast();

  }
  
  function guardarCarritoEnLocalStorage() {
    localStorage.setItem("listadoCarritoActual", JSON.stringify(carritoDeCompra));
    actualizarCarrito();
  }
  
  function verificarCarritoAnterior() {
    // Syntax OR
    let listadoDeCarritoAuxiliar = JSON.parse(localStorage.getItem("listadoCarritosIngresados")) || [];
    listadoCarritosIngresados = [];
    if (listadoDeCarritoAuxiliar.length > 0) {
      for (elemento of listadoDeCarritoAuxiliar) {
        nuevoProducto = new producto({id:elemento.id, descripcionProducto:elemento.descripcionProducto, precioVentaUnitario:elemento.precioVentaUnitario, stockProducto:elemento.stockProducto, img:elemento.img, cantidad:elemento.cantidad});
        listadoCarritosIngresados.push(nuevoProducto);
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
  
    
  function verificarCarritoActual() {
    // Syntax OR
    let listadoDeCarritoActual = JSON.parse(localStorage.getItem("listadoCarritoActual")) || [];
    carritoDeCompra=[];
    if (listadoDeCarritoActual.length > 0) {
      for (elemento of listadoDeCarritoActual) {
        nuevoProducto = new producto({id:elemento.id, descripcionProducto:elemento.descripcionProducto, precioVentaUnitario:elemento.precioVentaUnitario, stockProducto:elemento.stockProducto, img:elemento.img,cantidad:elemento.cantidad});
        carritoDeCompra.push(nuevoProducto);
      }
      if (carritoDeCompra.length > 0) {
        for (element of carritoDeCompra) {
          existeProducto = productosParaCarrito.find(item => item.id === element.id);
          // Syntax &&
          // producto  del carrito agrega boton eliminar
          existeProducto && (existeProducto.stockProducto = existeProducto.stockProducto - carritoDeCompra.cantidad);
          mostrarCarrito(element);
        }
        $('#ventanaCarrito').modal('show'); 
        actualizarCarrito();
      }
  
    }
  }

  const subirStock=()=>{
    carritoDeCompra.forEach(elemento=> {
      // productoElegido = productosParaCarrito.find(producto => producto.id === elemento.id);
      productoElegido = productosParaCarrito.find(producto => producto.id === elemento.id);
      if (productoElegido){
          productoElegido.subeStock(elemento.cantidad);
        // productoElegido.stockProducto+=elemento.cantidad;
          document.getElementById(`stock${productoElegido.id}`).innerHTML = `<p id="stock${productoElegido.id}" class="text-center"> Stock: ${productoElegido.stockProducto}</p>`;
      }
    })
  }