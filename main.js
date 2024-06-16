// Función constructora
const Alumno = function(nombre, apellido, cantclases, valor) {
    this.nombre = nombre
    this.apellido = apellido
    this.cantclases = cantclases
    this.valor = valor
    this.clasesPresente = 0
    this.clasesAusente = 0
}
const alumno1 = new Alumno("Nicolas", "Orsi", 4, 20000)
const alumno2 = new Alumno("Noelia", "Adamo", 8, 30000)
const alumno3 = new Alumno("Isabel", "Mercado", 4, 20000)
const alumno4 = new Alumno("Jorge", "Juarez", 12, 44000)

//ARRAY DE ALUMNOS}
let lista = [alumno1,alumno2,alumno3,alumno4]
const preciosClases = {
    4: 20000,
    8: 30000,
    12: 44000
}

document.getElementById ('agregar-alumno-form').addEventListener('submit', function(event) {
    event.preventDefault()
    agregarAlumno()
})
document.getElementById('filtrar-alumno').addEventListener('click', filtrarAlumnos)
document.getElementById('calcular-cuotas').addEventListener('click', calcularPromedioCuotas)
document.getElementById('mostrar-alumnos').addEventListener('click', mostrarAlumnos)
document.getElementById('cargar-datos-api').addEventListener('click', cargarDatosDesdeAPI)
document.getElementById('registrar-clase').addEventListener('click', registrarClase)

//Agregar Alumno
function agregarAlumno(){
    const nombre= document.getElementById("nombre").value.trim();
    const apellido= document.getElementById("apellido").value.trim();
    const cantclases = parseInt(document.getElementById("cantclases").value.trim())
    const valor = preciosClases[cantclases]
    if (nombre=== "" || apellido === ""){
        Swal.fire("Error","Ingrese datos correctos", "error")
        return
    }
    const alumno = new Alumno (nombre, apellido, cantclases, valor)
    lista.push(alumno)
    Swal.fire ("Exito","Alumno agregado correctamente", "success")
    document.getElementById("agregar-alumno-form").reset()
}
// Filtrar alumnos
function filtrarAlumnos() {
    const palabraClave = document.getElementById("filtro-nombre").value.toUpperCase().trim()
    if(palabraClave === ""){
        Swal.fire ("Error", "Debe ingresar un nombre y apellido valido", "error")
    return
    }
    const resultado = lista.filter((x) =>`${x.nombre.toUpperCase()} ${x.apellido.toUpperCase()}`.includes(palabraClave) )
    if (resultado.length > 0){
        mostrarEnTabla(resultado,'filtrados')
    } else { 
        Swal.fire("Error","No hay alumno","error")
    }
}

// Calcular promedio de cuotas
function calcularPromedioCuotas() {
    if (lista.length === 0) {
        Swal.fire("Error", "No hay alumnos en la lista", "error")
        return
    }
    const totalCuotas = lista.reduce((total, alumno) => total + alumno.valor, 0)
    const promedio = totalCuotas / lista.length
    document.getElementById('promedio').innerHTML = `El promedio de las cuotas es: ${promedio.toFixed(2)}`
}


// Mostrar alumnos
function mostrarAlumnos() {
    mostrarEnTabla (lista, 'resultados')
}

//Mostrar datos en tabla

function mostrarEnTabla(data, elementId){
    const container = document.getElementById(elementId)
    container.innerHTML = ""
    if (data.length === 0 ){
        container.innerHTML = "<p>No hay alumnos para mostrar</p>"
    return
    }
    const table = document.createElement('table')
    table.className = "table table-striped"
    const thead = document.createElement('thead')
    thead.innerHTML = `
        <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Cant. Clases</th>
            <th>Valor</th>
            <th>Clases Presente</th>
            <th>Clases Ausente</th>
        </tr>
    `
    table.appendChild(thead)
    const tbody = document.createElement ('tbody')

    data.forEach (alumno => {
        const tr = document.createElement('tr')
        tr.innerHTML =`
            <td>${alumno.nombre}</td>
            <td>${alumno.apellido}</td>
            <td>${alumno.cantclases}</td>
            <td>${alumno.valor}</td>
            <td>${alumno.clasesPresente}</td>
            <td>${alumno.clasesAusente}</td>
        `
        tbody.appendChild(tr)
    })
    table.appendChild(tbody)
    container.appendChild(table)
    }

//Registrar clases

function registrarClase () {
    const nombreClase = document.getElementById('nombre-clase').value.toUpperCase().trim()
    const estadoClase = document.getElementById('estado-clase').value.trim()

    const alumno = lista.find(a => `${a.nombre.toUpperCase()} ${a.apellido.toUpperCase()}` === nombreClase);
    if (!alumno) {
        Swal.fire("Error", "Alumno no encontrado", "error");
        return;
    }

    if (estadoClase === 'presente') {
        alumno.clasesPresente++;
    } else if (estadoClase === 'ausente') {
        alumno.clasesAusente++;
    }

    Swal.fire("Éxito", "Clase registrada correctamente", "success");
    mostrarEnTabla(lista, 'resultados')
}

// Carga de datos desde API
async function cargarDatosDesdeAPI() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users'); // Ejemplo de API
        const data = await response.json();

        data.forEach(user => {
            const nombre = user.name.split(' ')[0]
            const apellido = user.name.split(' ').slice(1).join(' ')
            const cantclases = Math.floor(Math.random() * 3) * 4 + 4 // 4, 8, o 12 clases
            const valor = preciosClases[cantclases]

            const alumno = new Alumno(nombre, apellido, cantclases, valor)
            lista.push(alumno)
        })

        Swal.fire("Éxito", "Datos cargados desde API", "success")
        mostrarEnTabla(lista, 'resultados')
    } catch (error) {
        Swal.fire("Error", "No se pudieron cargar los datos desde la API", "error")
    }
}