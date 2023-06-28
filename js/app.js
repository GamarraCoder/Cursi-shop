
//Carrito de compras
//12-04-23, Carlos Gamarra

//Variables
const carrito = document.querySelector('#carrito');
const ContenedorCarrito = document.querySelector('#lista-carrito tbody');
const ListaCursos = document.querySelector('#lista-cursos');
const VaciarCarritoBtn = document.querySelector('#vaciar-carrito')
let articulosCarrito = [];


//Funciones
CargarListado();
function CargarListado() {

     //Cuando Agregar un curso donde dice agregar
     ListaCursos.addEventListener('click', agregarCurso);

     //Elimina cursos del carrito
     carrito.addEventListener('click', eliminarCurso)

     //Vaciar Carrito
     VaciarCarritoBtn.addEventListener('click', () => {
          articulosCarrito = []
          limpiarCarrito()
     } );
   
 }

function agregarCurso(e) {

 e.preventDefault()


     if( e.target.classList.contains('agregar-carrito') ) {

          const cursoSeleccionado = e.target.parentElement.parentElement
           

           LeerDatosCurso(cursoSeleccionado)
      }


 }

 //Elimina un curso del carrito
 function eliminarCurso(e) {
     console.log(e.target.classList);
     if (e.target.classList.contains('borrar-curso')) {
       const cursoId= e.target.getAttribute('data-id')

       articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId )

       carritoHtml()
          
     }
 }

 //Lee el HTML del que le demos click y extrae la informacion del curso 

 function LeerDatosCurso(curso) {
 
     //  console.log(curso);


//crear objeto con el contenido del curso actual

const infocurso = {

     imagen: curso.querySelector('img').src,
titulo: curso.querySelector('h4').textContent,
precio: curso.querySelector('.precio span').textContent,
    id : curso.querySelector('A').getAttribute('data-id'),
    cantidad : 1
}

// console.log(infocurso);

//Revisa si un elemento ya existe en el carrito
const existe = articulosCarrito.some( curso => curso.id === infocurso.id )
if (existe) {

     //Actualizamos la cantidada
const curso = articulosCarrito.map( curso => {

     if (curso.id === infocurso.id) {
          curso.cantidad++
          return curso
     }
     else{
          return curso
     }

     articulosCarrito = [...curso]
})

}

else {
     //agregamos curso al carrito
     articulosCarrito = [...articulosCarrito, infocurso]
     
}





// console.log(articulosCarrito);

carritoHtml()

 }

 //Muestra el carrito de compras en el HTML
 function carritoHtml() {

     //Limpiar HTML
limpiarCarrito()



     //Recorre el carrito y genera el HTML
     articulosCarrito.forEach( curso=> {

          const { imagen, titulo, precio, cantidad, id } = curso 
          console.log(curso);
          const row = document.createElement('tr')

          row.innerHTML =  
          ` 
          <td>
           <img src = "${imagen}" width = 100>
          </td>

     
          <td>
          ${titulo}
     </td>
          
     <td>
     ${precio}
</td>


<td>
${cantidad}
</td>

<td>
<a href="#" class= "borrar-curso" data-id= "${id}"> X </a>
</td>
          `

//Agrega el HTML del carrito en el Tbody
ContenedorCarrito.appendChild(row)



     } )
 }


//Elimina los cursos del Tbody 

function limpiarCarrito() {
     //  ContenedorCarrito.innerHTML = ''; 

     //forma rapida de limpiar el html 

      while (ContenedorCarrito.firstChild) {
          ContenedorCarrito.removeChild(ContenedorCarrito.firstChild)
      }
}