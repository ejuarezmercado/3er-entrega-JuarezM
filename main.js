// Función constructora
const Alumno = function(nombre, apellido, cantclases, valor) {
    this.nombre = nombre
    this.apellido = apellido
    this.cantclases = cantclases
    this.valor = valor
}

//LocalStorange 
let lista = JSON.parse (localStorage.getItem('alumnos')) || []

const renderAlumnos = (alumnos, containerId) => {
    const container = document.getElementById (containerId)
    container.innerHTML = "" //limpiar resultados

    alumnos.forEach (alumno => {
        const alumnoDiv = document.createElement ("div")
        alumnoDiv.textContent = `${alumno.nombre} ${alumno.apellido} - Clases: ${alumno.cantclases}, Valor: ${alumno.valor}`
        container.appendChild (alumnoDiv)
    })
}

// Filtrar alumnos
function filtrarAlumnos() {
    const palabraClave = document.getElementById("filtro-nombre").value.toUpperCase().trim()
    const resultadosDiv = document.getElementById("filtrados")

    resultadosDiv.innerHTML = "" //limpiar contenido
    if (palabraClave === "") {
        const msg = document.createElement("p")
        msg.textContent = "Debe ingresar un nombre y apellido válido"
        resultadosDiv.appendChild(msg)
        return
        
    }
    const resultado = lista.filter((x) => `${x.nombre.toUpperCase()} ${x.apellido.toUpperCase()}`.includes(palabraClave))
    if (resultado.length > 0) {
        renderAlumnos(resultado, 'filtrados')
    } else {
        const msg = document.createElement("p")
        msg.textContent = "No hay alumno"
        resultadosDiv.appendChild(msg)
    }
}
// Agregar alumno
function agregarAlumno(event) {
    event.preventDefault ()
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const cantclases = parseInt(document.getElementById("cantclases").value.trim());
    const valor = parseFloat(document.getElementById("valor").value.trim());
    const resultadosDiv = document.getElementById ("resultados")
    
    resultadosDiv.innerHTML = ""

    if (isNaN(valor) || isNaN(cantclases) || nombre === "" || apellido === "") {
        const msg = document.createElement ("p")
        msg.textContent = "ingrese datos correctos"
        resultadosDiv.appendChild(msg)
        return
    }
    const alumno = new Alumno(nombre, apellido, cantclases, valor)
    lista.push(alumno)
    localStorage.setItem ('alumnos', JSON.stringify(lista))
    console.log("Alumno agregado correctamente")
    console.table(lista)

    renderAlumnos(lista, 'resultados')
    document.getElementById("agregar-alumno-form").reset()
}

// Calcular promedio de cuotas
function calcularPromedioCuotas() {

    const promedioDiv = document.getElementById("promedio")
    promedioDiv.innerHTML = "" //limpiar resultados

    if (lista.length === 0) {
        const msg = document.createElement ("p")
        msg.textContent = "no hay alumnos en la lista"
        promedioDiv.appendChild (msg)
    return
    }
    const totalCuotas = lista.reduce((total,alumno) => total + alumno.valor, 0)
    const promedio= totalCuotas / lista.length

    const promedioP = document.createElement("p");
    promedioP.textContent = `El promedio de las cuotas es: ${promedio.toFixed(2)}`;
    promedioDiv.appendChild(promedioP)
}

// Mostrar alumnos
function mostrarAlumnos() {
    renderAlumnos (lista, 'resultados')
}
document.getElementById('agregar-alumno-form').addEventListener('submit', agregarAlumno);

document.getElementById('filtrar-alumno').addEventListener('click', filtrarAlumnos);

document.getElementById('calcular-cuotas').addEventListener('click', calcularPromedioCuotas);

document.getElementById('mostrar-alumnos').addEventListener('click', mostrarAlumnos);

