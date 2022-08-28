// boton de compra del carrito
$(".comprarModal").click(function () {
    $("#ventanaCarrito").modal('hide');
    guardarCarritoEnLocalStorage();
    contenedorDeCarrito.innerHTML = "";
    verificarCarritoAnterior();
    carritoDeCompra = [];
    actualizarCarrito();
  });
  
  // boton de cancelar carrito
  $(".cancelarModal").click(function () {
    $("#ventanaCarrito").modal('hide');
    subirStock();
    contenedorDeCarrito.innerHTML = "";
    verificarCarritoAnterior();
    carritoDeCompra = [];
    actualizarCarrito();
  });
  
 
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
      existeProducto = carritoDeCompra.find(item => item.id === id);
      //Sugar Syntax
      // Syntax &&
      existeProducto && (existeProducto.stockProducto += cantidad);
      boton.parentElement.remove();
      carritoDeCompra = carritoDeCompra.filter((item => item.id !== id))
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
        //Sugar Syntax
        productoElegido.stockProducto--;
        productoElegido.cantidad = 1;
        productoElegido.cliente = clienteLogeado;
        carritoDeCompra.push(productoElegido);
        mostrarCarrito(productoElegido);
        actualizarCarrito();
  
      } else {
        let productoEnCarrito = carritoDeCompra.find(produ => produ.id === id);
        if (productoEnCarrito) {
          //Sugar Syntax
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
    // Syntax OR
    let listadoDeCarritoAuxiliar = JSON.parse(localStorage.getItem("listadoCarritosIngresados")) || [];
    listadoCarritosIngresados = [];
    if (listadoDeCarritoAuxiliar.length > 0) {
      for (elemento of listadoDeCarritoAuxiliar) {
        if (elemento.cliente.nombre == clienteLogeado.nombre) {
          listadoCarritosIngresados.push(new producto(elemento.id, elemento.descripcionProducto, elemento.precioVentaUnitario, elemento.stockProducto, elemento.img, elemento.cantidad));
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