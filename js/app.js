//Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    listaCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarCurso);
    vaciarCarrito.addEventListener('click', e => {
        e.preventDefault();
        articulosCarrito = [];
        limpiarHTML();
    })
}

//Funciones
function agregarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        console.log(articulosCarrito);
        carritoHTML();
    };
}

function leerDatosCurso(curso) {

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if(existe) {
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id)
            {
                curso.cantidad++;
                return curso;
            } else {
                return curso; 
            }
        })
        articulosCarrito = [...cursos];
    } else {
        //Agregamos el curso
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    //Agregar elementos al arreglo
    
    carritoHTML();

    console.log(infoCurso);
}

function carritoHTML() {

    //Limpiar HTML
    limpiarHTML();

    articulosCarrito.forEach( curso => {
        const row = document.createElement('tr');
        row.innerHTML = `<td> <img src= "${curso.imagen}" width=100> </td>
                         <td>${curso.titulo}</td>
                         <td>${curso.precio}</td>
                         <td>${curso.cantidad}</td>
                         <td>
                            <a hreg="#" class="borrar-curso" data-id="${curso.id}">X</a> 
                         </td>`
        contenedorCarrito.appendChild(row);
    })
}

function limpiarHTML() {
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}