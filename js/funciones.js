
let cantidadClientesEnLocal;
let nombreCliente;
// let edadCliente;
let permisoDeIngreso
let terminaLaCompra;
let compra;
let opcionCierreVenta;
let clienteElegido;
let canceloLaCompraAntesDePagar;
let opcionFormaDePago;
let listadoDeClientes;
const topeClientesEnLocal = 10;

class cliente {
  constructor(id, nombre, edad, tiempoDeEntradaAlLocal, tiempoDeSalidaAlLocal) {
    this.id = id;
    this.nombre = nombre;
    this.edad = edad;
    this.tiempoDeEntradaAlLocal = tiempoDeEntradaAlLocal;
    this.tiempoDeSalidaAlLocal = tiempoDeSalidaAlLocal;
  }
  comprar() {
    console.log(this.nombre + " Realizo la compra");
  }
}

class producto {
  constructor(id, descripcionProducto, precioVentaUnitario, stockProducto) {
    this.id = id;
    this.descripcionProducto = descripcionProducto;
    this.stockProducto = stockProducto;
    this.precioVentaUnitario = precioVentaUnitario;
  }
  vendido() {
    console.log(this.descripcionProducto + " fue Vendido");
  }
  actualizaStockProducto() {
    console.log(this.descripcionProducto + " tiene stock de " + this.stockProducto);
  }
}

let cliente1 = new cliente(1, "jose Rodrigues", 20, 0, 0);
let cliente2 = new cliente(2, "juan Ortiz", 40, 0, 0);
let cliente3 = new cliente(3, "jose Carmona", 30, 0, 0);
let cliente4 = new cliente(4, "carlos Montero", 50, 0, 0);

let producto1 = new producto(1, "producto1", 1000, 3, 0);
let producto2 = new producto(2, "producto2", 1200, 150, 0);
let producto3 = new producto(3, "producto3", 3100, 150, 0);
let producto4 = new producto(4, "producto4", 2100, 300, 0);
let producto5 = new producto(5, "producto5", 3100, 190, 0);
let producto6 = new producto(6, "producto6", 2100, 180, 0);
let producto7 = new producto(7, "producto7", 800, 170, 0);
let producto8 = new producto(8, "producto8", 800, 165, 0);
let producto9 = new producto(9, "producto9", 1100, 180, 0);
let producto10 = new producto(10, "producto10", 1400, 100, 0);
let productos = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10];
let clientes = [cliente1, cliente2, cliente3, cliente4];
let carrito = [];
let clientesListado = [];

const mostrarProductos = () => {
  let mensaje = "Elige un producto";
  productos.forEach(produ => {
    mensaje += `
          opcion ${produ.id} : ${produ.descripcionProducto} - stock ${produ.stockProducto} $${produ.precioVentaUnitario}
        `
  }
  )
  mensaje += ` 
          opcion 0: terminar la compra
      `
  let opcion = Number(prompt(mensaje));
  return opcion;
}

const mostrarTotalCarrito = () => {
  let mensajeEnCarrito = "";
  if (carrito.length > 0) {
    carrito.forEach(produ => {
      mensajeEnCarrito += `
            nombre: ${produ.descripcionProducto} cantidad: ${produ.cantidad} total: $${produ.cantidad * produ.precioVentaUnitario}
          `
    }
    )
    mensajeEnCarrito += `Total Carrito ${carrito.reduce((total, produ) => total + (produ.precioVentaUnitario * produ.cantidad), 0)}`
    alert(mensajeEnCarrito);
  } else {
    mensajeEnCarrito += "No hay productos en carrito";
    alert(mensajeEnCarrito);
  }

}

const mostrarTotalClientes = () => {
  let mensajeEnClientes = "";
  if (clientesListado.length > 0) {
    clientesListado.forEach(cli => {
     mensajeEnClientes += `
            nombre: ${cli.nombre} edad: ${cli.edad} tiempo: ${milisegundosAMinutosYSegundos(cli.tiempoDeSalidaAlLocal-cli.tiempoDeEntradaAlLocal)}
          `
    }
    )
    mensajeEnClientes += `\n Promedio en Clientes-------- \n edad: ${(clientesListado.reduce((total,cli) => total +cli.edad,0))/clientesListado.length}
     \n tiempo: ${milisegundosAMinutosYSegundos((clientesListado.reduce((total, cli) => (total + cli.tiempoDeSalidaAlLocal-cli.tiempoDeEntradaAlLocal),0))/clientesListado.length)} ` 
    alert(mensajeEnClientes);
  } else {
    mensajeEnClientes += "No hay clientes";
    alert(mensajeEnClientes);
  }

}

//asigno valores
cantidadClientesEnLocal = 0;
permisoDeIngreso = false;
terminaLaCompra = false;
listadoDeClientes = "";
// carritoDeCompra = "";
// const suma=function(a,b){return a+b};
// const suma=(a,b)=>{return a+b};

const agregarCeroSiEsNecesario = valor => {
  if (valor < 10) {
    return "0" + valor;
  } else {
    return "" + valor;
  }
}


const milisegundosAMinutosYSegundos = (milisegundos) => {
  const minutos = parseInt(milisegundos / 1000 / 60);
  milisegundos -= minutos * 60 * 1000;
  const segundos = (milisegundos / 1000);
  return "(ms:ss) (" + agregarCeroSiEsNecesario(minutos) + ":" + agregarCeroSiEsNecesario(segundos
    .toFixed(1)) + ")";
}


function sistemaVentasDelLocal() {
  //  sistema de ventas del Local
  do {
    let tiempoDeEntradaAlLocal = Date.now();
    let tiempoDeSalidaAlLocal = Date.now();
    nombreCliente = prompt("Ingrese su Nombre ", "Juan Perez");
    if (nombreCliente != "ESC" && nombreCliente != "" && nombreCliente != null) {
      // edadCliente = parseInt(prompt("Ingrese su edad ", 18));
      ingresoAlLocal();
      if (permisoDeIngreso) {
          carrito = [];
          compraEnLocal();
          if (opcionCierreVenta = 3 && !canceloLaCompraAntesDePagar && carrito.length > 0) {
            pagoEnLocal();
          }
          tiempoDeSalidaAlLocal = Date.now();
          salidaDelLocal();
      } 
    } else {
      if (nombreCliente == "") {
        alert(nombreCliente + "Debe ingresar su nombre");
      }
    }
  }
  while (nombreCliente != "ESC" && nombreCliente != null)
  alert("Sale de la pagina");
}

function ingresoAlLocal()
// Controla el ingreso de clientes al salon 
{
  permisoDeIngreso = false;
  if (nombreCliente == "") {
    alert(nombreCliente + "Debe ingresar su nombre");
  } else {
       clienteElegido = clientes.find(cli => cli.nombre.toUpperCase() === nombreCliente.toUpperCase())
      if (clienteElegido) {
        
        // if (edadCliente > 17){
        //    clienteElegido.edad=edadCliente;
          if (cantidadClientesEnLocal < topeClientesEnLocal) {
             alert(nombreCliente + " puede Ingresar al Local");   
             cantidadClientesEnLocal = cantidadClientesEnLocal + 1;
             clienteElegido.tiempoDeEntradaAlLocal=Date.now(); 
             if (clientesListado.length === 0) {
               clientesListado.push(clienteElegido);
             } else {
                let clienteEnListado = clientesListado.find(cli => cli.id === clienteElegido.id);
                if (clienteEnListado) {
                   clienteEnListado.tiempoDeSalidaAlLocal=Date.now();
                } else {
                   clientesListado.push(clienteElegido);
                }
             }
             permisoDeIngreso = true;
             alert(" Hay en total " + cantidadClientesEnLocal + " clientes dentro del local");
          } else {
              alert(nombreCliente + " Tiene que esperar a que se salga alguna persona del Local, hay " + cantidadClientesEnLocal +
            " clientes que es el tope maximo");
          } 
        // } else {
        //   alert("Debe ser mayor a 17");
        // }
      } else {
          alert("Debe registrarse para ingresar");
      }
  }
}

function salidaDelLocal()
// Controla la salida de clientes del Local 
{
  if (canceloLaCompraAntesDePagar || !terminaLaCompra) {
    if (carrito.length > 0) {
      for (const indice in carrito) {
        let productoElegido = productos.find(produ => produ.id === carrito[indice].id);
        if (productoElegido) {
          productoElegido.stockProducto = productoElegido.stockProducto + carrito[indice].cantidad;
        }
      }
      if (canceloLaCompraAntesDePagar) {
        alert("Se cancelo la Compra, no lleva nada, no pasa por la Caja");
      } else {
        alert("Se cancelo la Compra en la Caja");
      }

    } 
  } else {
    alert("Compra Exitosa");
  }
  cantidadClientesEnLocal = cantidadClientesEnLocal - 1;
  let clienteEnListado = clientesListado.find(cli => cli.id === clienteElegido.id);
  if (clienteEnListado) {
      clienteEnListado.tiempoDeSalidaAlLocal=Date.now();
  }    
  mostrarTotalClientes();
  alert("Salio del Local");

} 



function compraEnLocal()
// Realiza la Compra en el Local 
{
  canceloLaCompraAntesDePagar = false;
  terminaLaCompra = false;
  do {
    let compra = mostrarProductos();
    // compra = parseInt(prompt("Elija el numero de producto que compra " + listadoDeProductos));
    if (compra === 0) {
      terminaLaCompra = true;
    } else {
      terminaLaCompra = false;
      if (parseInt(compra)) {
        let productoElegido = productos.find(produ => produ.id === compra)
        alert("Compro el producto " + compra);
        if (carrito.length === 0) {
          productoElegido.stockProducto--;
          productoElegido.cantidad = 1;
          carrito.push(productoElegido);
        } else {
          let productoEnCarrito = carrito.find(produ => produ.id === compra);
          if (productoEnCarrito) {
            productoEnCarrito.cantidad++;
            productoEnCarrito.stockProducto--;
            if (productoEnCarrito.stockProducto === 0) {
              productos = productos.filter(produ => produ.id != compra);
            }
          } else {
            productoElegido.cantidad = 1;
            productoElegido.stockProducto--;
            carrito.push(productoElegido);
          }
        }
        mostrarTotalCarrito();
      }
    }

    if (terminaLaCompra) {
      opcionCierreVenta = parseInt(prompt("\n\n1.-Sigue comprando " + "\n2.-Termina la compra" + "\n3.-Cancela la compra"));
      switch (opcionCierreVenta) {
        case 1:
          terminaLaCompra = false;
          break;
        case 2:
          alert("Compro tiene que ir a la caja");
          break;
        case 3:
          canceloLaCompraAntesDePagar = true;
          alert("Cancelo la compra");
          break;
        default:
          alert("Cancelo la compra");
          canceloLaCompraAntesDePagar = true;
          break;
      }
    } else {
      terminaLaCompra = false;

    }

    // alert("Total en carrito " + mostrarTotalCarrito());
  } while (!terminaLaCompra)


}

function pagoEnLocal() {
  opcionFormaDePago = parseInt(prompt(mostrarTotalCarrito() + "\n\n1.-Tarjeta " + "\n2.-Efectivo" + "\n3.-Cancela la compra"));
  switch (opcionFormaDePago) {
    case 1:
      alert("Pago con Tarjeta");
      terminaLaCompra = true;
      break;
    case 2:
      alert("Pago en Efectivo");
      terminaLaCompra = true;
      break;
    case 3:
      alert("Cancelo la compra");
      terminaLaCompra = false;
      break;
    default:
      alert("Cancelo la compra");
      terminaLaCompra = false;
      break;

  }
}

//Ejecucion de la aplicacion
sistemaVentasDelLocal();
//Final de la Aplicaicon

