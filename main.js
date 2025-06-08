//////////////////////// VARIABLES ////////////////////////

let tareas = []

let input = document.getElementById("input")
let botonAgregar = document.getElementById("botonAgregar")
let contenedorTareas = document.querySelector(".contenedor-tareas")
let botonModo = document.getElementById("botonEstilo")
const body = document.body;

/////////////////// AGREGAR //////////////////

botonAgregar.addEventListener("click", function(){
    let tarea = input.value;
    if (tarea != "") {
        tareas.push({
            texto: tarea,
            tachado: false
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
    let variable = ""
    
    tareas.forEach((tarea, indice) => {
        variable += `
        <li class="lista-tareas">
        <input type= "checkbox" class = "check-tarea" ${tarea.tachado ? 'checked' : '' }> <span class = ${tarea.tachado ? 'tachado' : '' }>${tarea.texto}</span>
        <button onclick = "eliminarTarea(${indice})">
        <i class="fa-solid fa-trash" style= "font-size: 20px;"></i>
        </button>
        </li>
        `   
    });
    
    
    contenedorTareas.innerHTML = variable;
    
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
    
})



////////////////// FUNCION INIT /////////////////////

function init() {
    mostrarTareas(tareas)

    const tareaGuardada = JSON.parse(localStorage.getItem("tareas")) 
    if (tareaGuardada) { 

        tareas = tareaGuardada 

        mostrarTareas(tareas)   
    }
}

init();