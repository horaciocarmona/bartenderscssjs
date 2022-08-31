// boton de compra del carrito

$(".comprarModal").click(function () {
    $("#ventanaCarrito").modal('hide');
    
    
    if (carritoDeCompra.length > 0) {
      // guardarCarritoEnLocalStorage();
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
              // verificarCarritoAnterior();
              carritoDeCompra = [];
              // actualizarCarrito();
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
  
// cierra pantalla del carrito
  $(".cerrarModal").click(function () {
    $("#ventanaCarrito").modal('hide')
  
  });
  
  function mostrarCarrito(productoAgregar) {
    // Syntax Desestructuracion con alias
    const {id,cantidad,descripcionProducto:descripcion,precioVentaUnitario:precio,stockProducto:stock}=productoAgregar;
  
    let div = document.createElement(`div`);
    div.setAttribute(`class`, "modal-body");
    div.innerHTML = `
       <h5 class="text-center">${descripcion}</h5>
       <p id="cant${id}" class="text-center">unidades: ${cantidad} precio: ${precio}</p>
       <a href="#" class="btn btn-primary btn-block botonEliminar" id="botonEliminar${id}">Eliminar</a>
  
       `
    contenedorDeCarrito.appendChild(div);
    existeProducto = carritoDeCompra.find(item => item.id === id);
    // Syntax &&
    // producto  del carrito agrega boton eliminar
    existeProducto && (existeProducto.StockProducto = existeProducto.StockProducto + carritoDeCompra.stockProducto + 1);
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
          // actualizarCarrito();
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
    if (!puedeComprar){
      Toastify({
        text: `Para poder comprar debe logearse por la pagina Contacto"}`,
        duration: 2500,
        className:"info",
        newWindow: true,
        close: true,
        offset: {
          x: 4, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
          y: 2 // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        avatar:"../img/cliente.png",
        // gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
      }).showToast();
    

    } else {   
        let productoElegido = productosParaCarrito.find(producto => producto.id === id);
        if (productoElegido.stockProducto > 0) {
           if (carritoDeCompra.length === 0) {
        //Sugar Syntax
               productoElegido.stockProducto--;
               productoElegido.cantidad = 1;
        // productoElegido.cliente = clienteLogeado;
               carritoDeCompra.push(productoElegido);
               mostrarCarrito(productoElegido);
        // actualizarCarrito();
               guardarCarritoEnLocalStorage();
    
            } else {
                let productoEnCarrito = carritoDeCompra.find(produ => produ.id === id);
                if (productoEnCarrito) {
          //Sugar Syntax
                   productoEnCarrito.cantidad++;
                    productoEnCarrito.stockProducto--;
                    document.getElementById(`cant${productoEnCarrito.id}`).innerHTML = `<p id="cant${productoEnCarrito.id}" class="text-center">unidades: ${productoEnCarrito.cantidad} precio: ${productoEnCarrito.precioVentaUnitario}</p>`;
                   $('#ventanaCarrito').modal('show'); 
                // actualizarCarrito();
                    guardarCarritoEnLocalStorage();
  
          //   if (productoEnCarrito.stockProducto === 0) {
          //     // productos = productosParaCarrito.filter(produ => produ.id !== id);
          //   }
                } else {
                     productoElegido.cantidad = 1;
                      productoElegido.stockProducto--;
          // productoElegido.cliente = clienteLogeado;
                      carritoDeCompra.push(productoElegido);
                      mostrarCarrito(productoElegido);
          // actualizarCarrito();
                      guardarCarritoEnLocalStorage();
    
                }
            }
        }  
        document.getElementById(`stock${productoElegido.id}`).innerHTML = `<p id="stock${productoElegido.id}" class="text-center"> Stock: ${productoElegido.stockProducto}</p>`;
    }
  }
  
  function actualizarCarrito() {
    contadorCarrito.innerText = "Unidades: " + carritoDeCompra.reduce((unid, item) => unid + item.cantidad, 0);
    importeTotalCarrito.innerText = "Importe Total: " + carritoDeCompra.reduce((total, item) => total + (item.precioVentaUnitario * item.cantidad), 0);
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
        // if (elemento.cliente.nombre == clienteLogeado.nombre) {
          listadoCarritosIngresados.push(new producto(elemento.id, elemento.descripcionProducto, elemento.precioVentaUnitario, elemento.stockProducto, elemento.img, elemento.cantidad));
        // }
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
        // if (elemento.cliente.nombre == clienteLogeado.nombre) {
          carritoDeCompra.push(new producto(elemento.id, elemento.descripcionProducto, elemento.precioVentaUnitario, elemento.stockProducto, elemento.img, elemento.cantidad));
        // }
      }

      if (carritoDeCompra.length > 0) {
        for (element of carritoDeCompra) {
          mostrarCarrito(element);
        }
        actualizarCarrito();
      }
  
    }
  }

  const subirStock=()=>{
    carritoDeCompra.forEach(elemento=> {
      // productoElegido = productosParaCarrito.find(producto => producto.id === elemento.id);
      productoElegido = productosParaCarrito.find(producto => producto.id === elemento.id);
      if (productoElegido){
          productoElegido.stockProducto+=elemento.cantidad;
          document.getElementById(`stock${productoElegido.id}`).innerHTML = `<p id="stock${productoElegido.id}" class="text-center"> Stock: ${productoElegido.stockProducto}</p>`;
      }
    })
  }