class cliente{
    constructor(nombre,usuario,clave,edad,sexo,domicilio,pais,tiempoIngreso,tiempoSalida)
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
    }    

}

// tomar datos de una base de datos
function traerClientesDeLaBase(){
  let clientes=[];
  clientes.push(new cliente("juan","juan","1234",20,"masculino","maipu 63 bernal","Argentina",0,0));
  clientes.push(new cliente("pedro","pedro","1111",30,"masculino","san martin 348 quilmes","Argentina",0,0));
  clientes.push(new cliente("jose","jose","6666",25,"femenino","cuchacucha 263 quito","Peru",0,0));
  clientes.push(new cliente("carlos","carlos","9999",50,"masculino","junin 323","Argentina",0,0));
  return clientes;
} 

function verificarCliente(){
    let claveUsuarioIngresado=document.getElementById("claveUsuario").value;
    let clienteIngresado=document.getElementById("usuario").value;
    let listadoDeClientes=traerClientesDeLaBase();
    let unCliente=listadoDeClientes.find(cli => cli.usuario===clienteIngresado);
    let mensaje;
    if (unCliente) {
        if (unCliente.clave==claveUsuarioIngresado){
            mensaje="Bienvenido";
        }else{
            mensaje="Clave erronea";
        }
    }else{
        mensaje="El usuario no existe"    
    }
    let arrayParrafoNombre=document.getElementsByClassName(`mensajeIngreso`);
    for(elementoParrafo of arrayParrafoNombre){
        elementoParrafo.innerText=mensaje;
    }
}
