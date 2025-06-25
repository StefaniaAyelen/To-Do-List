//////////////////////// VARIABLES ////////////////////////

let tareas = []

let input = document.getElementById("input")
let botonAgregar = document.getElementById("botonAgregar")
let contenedorTareas = document.querySelector(".contenedor-tareas")
let botonModo = document.getElementById("botonEstilo")
const body = document.body;
let fecha = document.getElementById("fechaLimite")

/////////////////// AGREGAR //////////////////

botonAgregar.addEventListener("click", function(){
    let tarea = input.value;
    if (tarea != "") {
        tareas.push({
            texto: tarea,
            tachado: false,
            fechaLimite: fecha.value,
        })
        mostrarTareas(tareas)
        console.log(tareas)
        input.value = "";
        
    }else{
        alert("INGRESE UN TEXTO")
    }
    localStorage.setItem("tareas", JSON.stringify(tareas))
})


//////////////// MOSTRAR TAREAS ////////////////

function mostrarTareas(tareas) {
    let htmlTareas = ""
    if (tareas.length === 0) {
        contenedorTareas.innerHTML = '<p class="sinTareas">No hay tareas</p>';
        return
    }

    tareas.forEach((tarea, indice) => {
        const vencida = fechaVencida(tarea.fechaLimite); //Llamamos a la funcion

        let clases = []; // Creo un array vacion donde se van a guardar los nombres de las clases
        if (tarea.tachado) clases.push("tachado");// Pusheo las clases si da true
        if (vencida) clases.push("vencida");

        const clasesSpan = clases.join(" ");//Convertimos el array en una cadena de texto y separamos cada clase con un espacio


        htmlTareas += `
        <li class="lista-tareas">
            <input type= "checkbox" class = "check-tarea" ${tarea.tachado ? 'checked' : '' }> 
            <span class ="${clasesSpan}">${tarea.texto}</span>
            ${mostrarFecha(tarea.fechaLimite)}
            <button onclick = "eliminarTarea(${indice})">
            <i class="fa-solid fa-trash" style= "font-size: 20px;"></i>
            </button>
        </li>
        `   
    });
        
    contenedorTareas.innerHTML = htmlTareas;
    checkTarea()


}


//////////////// TACHAR TAREAS ////////////////
function checkTarea(){
    
    let checkBox = document.querySelectorAll(".check-tarea") // se convierte en una lista al seleccionar todos los checkbox

    checkBox.forEach((check, indice) => { // recorro la lista de checkbox y les agrego el evento

        check.addEventListener("change", function() { // se usa change cuando se cambie el estado
            let span = check.nextElementSibling; // Selecciona el hermano del checkbox en este caso el <span>
        
            if (check.checked) { //Si el checkbox esta modo check entonces
                span.classList.add("tachado") //agrego la clase a span
                tareas[indice].tachado = true; //accede al objeto de la tarea actual y cambia el estado de tachado
            }else{
                span.classList.remove("tachado")
                tareas[indice].tachado = false;
            }

        localStorage.setItem("tareas", JSON.stringify(tareas));
    })
    })
}

/////////////// ELIMINAR TAREA /////////////////

function eliminarTarea(indice) {
    tareas.splice(indice, 1);
    console.log(tareas)
    mostrarTareas(tareas);
    localStorage.setItem("tareas", JSON.stringify(tareas))
}


///////////// CAMBIAR MODO ESTILADO ///////////////////

botonModo.addEventListener("click", function () {
    body.classList.toggle("modo-dia") // Agrega si la clase no esta y la saca si ya esta

    // Guardar el modo en localStorage
    if (body.classList.contains("modo-dia")) {
        localStorage.setItem("modo", "dia");
    } else {
        localStorage.setItem("modo", "noche");
    }
})



///////////// MOSTRAR FECHA LIMITE ///////////////////

function mostrarFecha(fechaLimite) {
    let fechaHtml;

    if (fechaLimite != "") {
        fechaHtml = `<p class="fecha-limite">Fecha límite: ${fechaLimite}</p>`
    }else{
        fechaHtml = ""
    }
    
    return fechaHtml
}

function fechaVencida(fechaLimite){
    let fechaDate = new Date(fechaLimite)
    const fechaActual = new Date()
    let bandera = false;

    if (fechaDate < fechaActual) {
        bandera = true
    }

    return bandera
}

///////////// BLOQUEAR FECHAS PASADAS ///////////////////

function bloquearFechasPasadas() {
    const fechaActual = new Date()

    const año = fechaActual.getFullYear();
    let mes = fechaActual.getMonth() + 1;   // devuelve el mes, 0 = enero, por eso sumamos 1
    let dia = fechaActual.getDate();

    if (mes < 10) {
    mes = "0" + mes;
    } else {
        mes = mes.toString();
    }

    if (dia < 10) {
        dia = "0" + dia;
    } else {
        dia = dia.toString();
    }

const fechaFormateada = `${año}-${mes}-${dia}`;
fecha.min = fechaFormateada
}


////////////////// FUNCION INIT /////////////////////

function init() {
    mostrarTareas(tareas);

    const tareaGuardada = JSON.parse(localStorage.getItem("tareas")) 
    if (tareaGuardada) { 
        tareas = tareaGuardada;
        mostrarTareas(tareas);
    }

     // Recuperar modo guardado
    const modoGuardado = localStorage.getItem("modo");
    if (modoGuardado === "dia") {
        body.classList.add("modo-dia");
    }

    bloquearFechasPasadas()
}

init();