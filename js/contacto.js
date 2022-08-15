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

class cliente{
    constructor(nombre,usuario,clave,edad,sexo,domicilio,pais,tiempoIngreso,tiempoSalida,email)
    {
        this.nombre=nombre;
        this.usuario=usuario;
        this.clave=clave;
        this.edad=edad;
        this.sexo=sexo;
        this.domicilio=domicilio;
        this.pais=pais;
        this.tiempoIngreso=tiempoIngreso;
        this.tiempoSalida=tiempoSalida;
        this.email=email;
    }    
    retornarNodoLi(){
        let nodo=document.createElement("li");
        nodo.innerText=` cliente: ${this.nombre}`;
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
  clientes.push(new cliente("juan","juan","1234",20,"masculino","maipu 63 bernal","Argentina",0,0,"juan@hotmail.com"));
  clientes.push(new cliente("pedro","pedro","1111",30,"masculino","san martin 348 quilmes","Argentina",0,0,"pedro@hotmail.com"));
  clientes.push(new cliente("jose","jose","6666",25,"femenino","cuchacucha 263 quito","Peru",0,0,"jose@hotmail.com"));
  clientes.push(new cliente("carlos","carlos","9999",50,"masculino","junin 323","Argentina",0,0,"carlos@hotmail.com"));
  return clientes;
} 

function verificarCliente(){
    let claveUsuarioIngresado=document.getElementById("idClaveUsuario").value;
    let clienteIngresado=document.getElementById("idUsuario").value;
    let listadoDeClientes=traerClientesDeLaBase();
    let unCliente=listadoDeClientes.find(cli => cli.usuario===clienteIngresado);
    let mensaje;
    if (unCliente) {
        if (unCliente.clave==claveUsuarioIngresado){
            mensaje="Bienvenido";
            listadoClientesIngresados.push(unCliente);
            document.querySelector(`#idDivNombreCliente`).style.display="block";
            document.querySelector(`#idDivEmailCliente`).style.display="block";
            document.querySelector(`#idDivTextoCliente`).style.display="block";
            
            document.querySelector(`#idDivLogin`).style.display="none";
            document.getElementById(`idNombreCliente`).value=unCliente.nombre;
            document.getElementById(`idEmailCliente`).value=unCliente.email;
            document.getElementById(`idTextoCliente`).value="Bienvenido, puede Comprar";
            if (!document.body.contains(document.getElementById(`idButtonCompra`))){
                let padre=document.getElementById(`idCliente`);
                let buttonCompra=document.createElement("div");
                buttonCompra.className="mb-1 mt-1";
                buttonCompra.innerHTML=`<button type="button" id="idButtonCompra" class="btn btn-dark w-100 fs-4 mb-4 mt-3 botonEnvio" onclick="ingresaOtroCliente()">Comprar</button>`;
                padre.appendChild(buttonCompra);
    
            }
           document.querySelector(`#idButtonCompra`).style.display="block";
           
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

