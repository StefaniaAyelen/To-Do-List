//////////////////////// VARIABLES ////////////////////////

let tareas = []

let input = document.getElementById("input")
let botonAgregar = document.getElementById("botonAgregar")
let contenedorTareas = document.querySelector(".contenedor-tareas")

/////////////////// AGREGAR //////////////////

botonAgregar.addEventListener("click", function(){
    let tarea = input.value;
    if (tarea != "") {
        tareas.push(tarea)
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
        <input type= "checkbox" class = "check-tarea"> <span>${tarea}</span>
        <button onclick = "eliminarTarea(${indice})">
        Eliminar
        </button>
        </li>
        `   
    });
    
    
    contenedorTareas.innerHTML = variable;
    
    let checkBox = document.querySelectorAll(".check-tarea")

    checkBox.forEach(check => {

        check.addEventListener("change", function() { // se usa change cuando se cambie el estado
            let span = check.nextElementSibling; // Selecciona el hermano del checkbox en este caso el <span>
        
            if (check.checked == true) {
                span.classList.add("tachado")
            }else{
                span.classList.remove("tachado")
            }
            
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


function init() {
    mostrarTareas(tareas)

    const tareaGuardada = JSON.parse(localStorage.getItem("tareas")) 
    if (tareaGuardada) { 

        tareas = tareaGuardada 

        mostrarTareas(tareas)   
    }
}

init();