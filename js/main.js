window.onload = mostrarContactos();

document.getElementById("contactos").addEventListener("click",mostrarContactos);

document.getElementById("agregar").addEventListener("click",agregar);
function agregar(){
    let name = prompt("ingrese su Nombre");
    let lastName = prompt("ingrese su Apellido");
    let phone = parseInt(prompt("Ingrese su numero de Telefono")); 
    const contacto = {name,lastName,phone};
    if(localStorage.getItem("contactos")==null){
        let contactos = [];
        contactos.unshift(contacto);
        localStorage.setItem("contactos",JSON.stringify(contactos));
    }else{
        let contactos = JSON.parse(localStorage.getItem("contactos"));
        contactos.unshift(contacto);
        localStorage.setItem("contactos",JSON.stringify(contactos));
    }
    mostrarContactos();
    console.log("Agendado");
}

function mostrarContactos(){
    let contactos = JSON.parse(localStorage.getItem("contactos"));
    let contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = "";
    if(contactos<=0){
        contenedor.innerHTML = `<div class="mensaje">No hay nadie agendado</div>`;
    }else{
        for(let i of contactos){
            let name = i.name;
            let lastName = i.lastName;
            let phone = i.phone;
            contenedor.innerHTML += `<div class="contacto">
            <div><h3 class="fullName">${name} ${lastName}</h3></div>
            <div><p class="phone">N° de Telefono: <span>${phone}</span></p></div>
            <div>
                <button class="edit btnContact" onclick="editar('${name}','${lastName}','${phone}');">Editar</button>
            </div>
            <div>
                <button class="delete btnContact" onclick="eliminar('${name}','${lastName}','${phone}');">Eliminar</button>
            </div>
            <div>
                <button class="contact btnContact" onclick="contactar('${name}','${lastName}','${phone}');">Contactar</button>
            </div>
            </div>`;
        }
    }
}


function eliminar(name,lastName,phone){
    let contactos = JSON.parse(localStorage.getItem("contactos"));
    for(let i in contactos){
        if(contactos[i].name==name && contactos[i].lastName==lastName && contactos[i].phone==phone){
            contactos.splice(i,1);
            console.log("eliminado");
        }
    }
    localStorage.setItem("contactos",JSON.stringify(contactos));
    mostrarContactos();
}

function editar(name,lastName,phone){
    let contactos = JSON.parse(localStorage.getItem("contactos"));
    for(let i in contactos){
        if(contactos[i].name==name && contactos[i].lastName==lastName && contactos[i].phone==phone){
            let cambiar = prompt("¿Qué desea cambiar? \nNombre - Apellido - Telefono");
            if( cambiar=="nombre" || cambiar=="NOMBRE" || cambiar=="Nombre"){
                let nameNew = prompt("Ingrese el nuevo nombre");
                contactos[i].name = nameNew;
                console.log("Se ha realizado un cambio");
            }else if(cambiar=="apellido" || cambiar=="APELLIDO" || cambiar=="Apellido"){
                let lastNameNew = prompt("Ingrese el nuevo apellido");
                contactos[i].lastName = lastNameNew;
                console.log("Se ha realizado un cambio");
            }else if(cambiar=="telefono" || cambiar=="TELEFONO" || cambiar=="Telefono"){
                let phoneNew = parseInt(prompt("Ingrese el nuevo numero de telefono"));
                contactos[i].phone = phoneNew;
                console.log("Se ha realizado un cambio");
            }else{
                alert("No se han producido cambios");
            }
        }
    }
    localStorage.setItem("contactos",JSON.stringify(contactos));
    mostrarContactos();
}

function contactar(name,lastName,phone){
    alert(`Llamando a ${name} ${lastName}`);
    let time = obtenerFecha();
    alert("Llamada terminada");
    const llamada = {time,name,lastName,phone};
    if(localStorage.getItem("llamadas")==null){
        let llamadas = [];
        llamadas.unshift(llamada);
        localStorage.setItem("llamadas",JSON.stringify(llamadas));
    }else{
        let llamadas = JSON.parse(localStorage.getItem("llamadas"));
        llamadas.unshift(llamada);
        localStorage.setItem("llamadas",JSON.stringify(llamadas));
    }
    console.log("Se realizo una llamada");
}


document.getElementById("buscar").addEventListener("click",buscarContacto);
function buscarContacto(){
    let input = document.getElementById("buscador").value;
    let contenedor = document.getElementById("contenedor");
    let cantidadResultados = 0;
    contenedor.innerHTML = "";
    console.log(input);
    let contactos = JSON.parse(localStorage.getItem("contactos"));
    if(input=="" || input==null){
        alert("Tienes que escribir el nombre o el nombre completo de la persona para buscar");
        mostrarContactos();
    }else{
        for(let i in contactos){
            let fullName = `${contactos[i].name} ${contactos[i].lastName}`;
            if(input==contactos[i].name || input == fullName){
                cantidadResultados++;
                let name = contactos[i].name;
                let lastName = contactos[i].lastName;
                let phone = contactos[i].phone;
                contenedor.innerHTML += `<div class="contacto">
                <h3 class="fullName">${name} ${lastName}</h3>
                <p class="phone">Tel: ${phone}</p>
                <button class="edit btnContact" onclick="editar('${name}','${lastName}','${phone}');">Editar</button>
                <button class="delete btnContact" onclick="eliminar('${name}','${lastName}','${phone}');">Eliminar</button>
                <button class="contact btnContact" onclick="contactar('${name}','${lastName}');">Contactar</button>
                </div>`;
            }
        }
        if(cantidadResultados==0){
            contenedor.innerHTML = `<div class='mensaje color2'>No se ha encontrado ningun contacto llamado ${input}</div>`;
        }else{
            contenedor.innerHTML =  `<div class="tituloBusqueda"><h2>Resultados de ${input}</h2></div>` + contenedor.innerHTML;
        }
    }
}


document.getElementById("llamadas").addEventListener("click",mostrarLlamadas);
function mostrarLlamadas(){
    let llamadas = JSON.parse(localStorage.getItem("llamadas"));
    let llamadasTotales = 0;
    let contenedor = document.getElementById("contenedor");
    contenedor.innerHTML="";
    for(let i of llamadas){
        llamadasTotales++;
        let time = i.time;
        let name = i.name;
        let lastName = i.lastName;
        let phone = i.phone;
        contenedor.innerHTML += `<div class="contacto llamada">
            <div><p class="time">${time}</p></div>
            <div><h3 class="fullName">${name} ${lastName}</h3></div>
            <div><p class="phone">N° de Telefono: <span>${phone}</span></p></div>
            <button class="eliminar-llamada" onclick="eliminarLlamada('${time}','${name}','${lastName}','${phone}');">Eliminar</button>
        </div>`;
    }
    if(llamadasTotales<=0){
        contenedor.innerHTML = `<div class="mensaje">No hay llamadas anteriores</div>`;
    }else{
        contenedor.innerHTML = `<div class="hisotial"><p onclick="limpiarHistorial();">Limpiar Historial</p></div>` + contenedor.innerHTML;
    }
}

function eliminarLlamada(time,name,lastName,phone){
    let llamadas = JSON.parse(localStorage.getItem("llamadas"));
    for(let i in llamadas){
        if(llamadas[i].time==time && llamadas[i].name==name && llamadas[i].lastName==lastName && llamadas[i].phone==phone){
            llamadas.splice(i,1);
            console.log("Llamada eliminada");
        }
    }
    localStorage.setItem("llamadas",JSON.stringify(llamadas));
    mostrarLlamadas();
}

function limpiarHistorial(){
    let llamadas = JSON.parse(localStorage.getItem("llamadas"));
    llamadas = [];
    localStorage.setItem("llamadas",JSON.stringify(llamadas));
    console.log("historial limpiado");
    mostrarLlamadas();
}

function obtenerFecha(){
    const hoy = new Date();
    let i = hoy.toString();
    let array = i.split(" ");
    array.splice(5,9);
    let j = array.join(" ");
    // console.log(j);
    return j;
}

