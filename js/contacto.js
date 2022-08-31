document.querySelector(`#idOcultaDivAltaSuscribe`).style.display="none";
document.querySelector(`#idOcultaLabelSexo`).style.display="none";
document.querySelector(`#idOcultaDivSexoHombre`).style.display="none";
document.querySelector(`#idOcultaDivSexoMujer`).style.display="none";
document.querySelector(`#idOcultaDivSexoNoSabe`).style.display="none";
document.querySelector(`#idOcultaSelectPais`).style.display="none";
document.querySelector(`#idBorrarDatosIngresados`).style.display="none";
document.querySelector(`#idDivNombreCliente`).style.display="none";
document.querySelector(`#idDivEmailCliente`).style.display="none";
document.querySelector(`#idDivTextoCliente`).style.display="none";
let listadoClientesIngresados=[];
let mensaje;
const DateTime=luxon.DateTime;
const fechaIngreso=DateTime.local();
class cliente{
    constructor(obj)
    {
        this.nombre=obj.nombre;
        this.usuario=obj.usuario;
        this.clave=obj.clave;
        // this.edad=edad;
        // this.sexo=sexo;
        // this.domicilio=domicilio;
        // this.pais=pais;
        // this.tiempoIngreso=tiempoIngreso;
        // this.tiempoSalida=tiempoSalida;
        this.email=obj.email;
        this.fechaIngreso=obj.fechaIngreso;

    }    
    retornarNodoLi(){
        let nodo=document.createElement("li");
        nodo.innerText=` cliente: ${this.nombre} ultima fecha Ingreso: ${this.fechaIngreso.toLocaleString(DateTime.DATETIME_SHORT)}`;
        return nodo;
    }
}

function ingresaOtroCliente(){
    document.querySelector(`#idDivNombreCliente`).style.display="none";
    document.querySelector(`#idDivEmailCliente`).style.display="none";
    document.querySelector(`#idDivTextoCliente`).style.display="none";
    document.querySelector(`#idDivLogin`).style.display="block";
    document.querySelector(`#idButtonCompra`).style.display="none";
    document.getElementById(`idUsuario`).value="";
    document.getElementById(`idClaveUsuario`).value="";

    document.getElementById(`idNombreCliente`).value="";
    document.getElementById(`idEmailCliente`).value="";
    document.getElementById(`idTextoCliente`).value="";
}

// tomar datos de una base de datos
function traerClientesDeLaBase(){
  let clientes=[];
//   clientes.push(new cliente("juan","juan","1234",20,"masculino","maipu 63 bernal","Argentina",0,0,"juan@hotmail.com"));
//   clientes.push(new cliente("pedro","pedro","1111",30,"masculino","san martin 348 quilmes","Argentina",0,0,"pedro@hotmail.com"));
//   clientes.push(new cliente("jose","jose","6666",25,"femenino","cuchacucha 263 quito","Peru",0,0,"jose@hotmail.com"));
//   clientes.push(new cliente("carlos","carlos","9999",50,"masculino","junin 323","Argentina",0,0,"carlos@hotmail.com"));

  clientes.push(new cliente({nombre:"juan",usuario:"juan",clave:"1234",email:"juan@hotmail.com"}));
  clientes.push(new cliente({nombre:"pedro",usuario:"pedro",clave:"1111",email:"pedro@hotmail.com"}));
  clientes.push(new cliente({nombre:"jose",usuario:"jose",clave:"6666",email:"jose@hotmail.com"}));
  clientes.push(new cliente({nombre:"carlos",usuario:"carlos",clave:"9999",email:"carlos@hotmail.com"}));

  return clientes;
} 

function verificarCliente(){
    let claveUsuarioIngresado=document.getElementById("idClaveUsuario").value;
    let clienteIngresado=document.getElementById("idUsuario").value;
    let listadoDeClientes=traerClientesDeLaBase();
    let unCliente=listadoDeClientes.find(cli => cli.usuario===clienteIngresado);
    mensaje="";
    if (unCliente) {
        if (unCliente.clave==claveUsuarioIngresado){
            mensaje="Bienvenido";
            unCliente.fechaIngreso=fechaIngreso;
            verificarIngresosAnteriores();
            let objetoGenericoCliente={nombre:unCliente.nombre,usuario:unCliente.usuario,clave:unCliente.clave,email:unCliente.email,fechaIngreso:unCliente.fechaIngreso}
            listadoClientesIngresados.push(new cliente(objetoGenericoCliente));
            guardarClientesEnStorage(new cliente(objetoGenericoCliente));
            document.querySelector(`#idDivNombreCliente`).style.display="block";
            document.querySelector(`#idDivEmailCliente`).style.display="block";
            document.querySelector(`#idDivTextoCliente`).style.display="block";
            
            document.querySelector(`#idDivLogin`).style.display="none";
            document.getElementById(`idNombreCliente`).value=unCliente.nombre;
            document.getElementById(`idEmailCliente`).value=unCliente.email;
            document.getElementById(`idTextoCliente`).value=mensaje+", puede Comprar ";
        //     if (!document.body.contains(document.getElementById(`idButtonCompra`))){
        //         let padre=document.getElementById(`idCliente`);
        //         let buttonCompra=document.createElement("div");
        //         buttonCompra.className="mb-1 mt-1";
        //         buttonCompra.innerHTML=`<button type="button" id="idButtonCompra" class="btn btn-dark w-100 fs-4 mb-4 mt-3 botonEnvio" onclick="ingresaOtroCliente()">Comprar</button>`;
        //         padre.appendChild(buttonCompra);
    
        //     }
        //    document.querySelector(`#idButtonCompra`).style.display="block";
           
           mostrarListado();
            // // // // container.innerHTML=`<button type="button" class="btn btn-dark w-100 fs-4 mb-4 mt-3 botonEnvio">Comprar</button>`;
        }else{
            mensaje="Clave erronea";
        }
    }else{
        mensaje="El usuario no existe"    
    }

    let arrayParrafoNombre=document.getElementsByClassName(`mensajeIngreso`);
    for(elementoParrafo of arrayParrafoNombre){
        elementoParrafo.innerText=`mensaje: ${mensaje}`;
    }
}

function mostrarListado(){
    let listadoLi=document.getElementById("listadoUL");
    listadoLi.innerHTML="";
    for (clientes of listadoClientesIngresados){
        listadoLi.appendChild(clientes.retornarNodoLi());
    }
}

function guardarClientesEnStorage(unCliente){
    localStorage.setItem("listadoClientesIngresados",JSON.stringify(listadoClientesIngresados));   
    sessionStorage.setItem("clienteLogeado",JSON.stringify(unCliente))
}

function verificarIngresosAnteriores(){
    let listadoDeClientesAuxiliar=JSON.parse(localStorage.getItem("listadoClientesIngresados"));
    listadoClientesIngresados=[];
    if (listadoDeClientesAuxiliar){
        for(elemento of listadoDeClientesAuxiliar){
            listadoClientesIngresados.push(new cliente(elemento));
        }
    } else {
        mensaje="Bienvenido no tuvo ingresos anteriores"
    }
}