// script.js

// Obtener el contenedor principal y los enlaces de navegación
const contenedor = document.getElementById('contenedor-publicaciones');
const enlacesNav = document.querySelectorAll('.nav-link');

// ----------------------------------------------------
// 1. FUNCIONES PARA CREAR Y MOSTRAR EL CONTENIDO
// ----------------------------------------------------

// Función para crear el HTML de una publicación
function crearPostHTML(post) {
    const articulo = document.createElement('article');
    // Genera una clase para el diseño dinámico (e.g., 'shippeos', 'pareja-oficial')
    articulo.classList.add('post', post.seccion.toLowerCase().replace(' ', '-')); 

    let contenidoMedia = '';
    
    // Verifica si hay una URL de imagen o video válida
    if (post.urlMedia) {
        const mediaTag = post.urlMedia.toLowerCase().includes('.mp4') 
            ? `<video src="${post.urlMedia}" controls></video>`
            : `<img src="${post.urlMedia}" alt="${post.titulo}">`;
            
        contenidoMedia = `<div class="post-media">${mediaTag}</div>`;
    }
    
    // Inyecta el contenido
    articulo.innerHTML = `
        <h2 class="post-titulo">${post.titulo}</h2>
        <p class="post-seccion">Sección: <span>${post.seccion}</span></p>
        ${contenidoMedia}
        ${post.seccion !== 'Pareja Oficial' ? `<p class="post-descripcion">${post.descripcion}</p>` : ''} 
        `;
    return articulo;
}

// Función principal para mostrar y filtrar posts
function mostrarPublicaciones(filtroSeccion) {
    contenedor.innerHTML = ''; 

    // Determina qué publicaciones mostrar
    const postsFiltrados = publicaciones.filter(post => {
        // Excluye "Política" de la vista "Todo"
        if (post.seccion === "Política") {
            return false;
        }
        
        // Filtra por la sección seleccionada o muestra todos si es "Todo"
        return filtroSeccion === "Todo" || post.seccion === filtroSeccion;
    });

    // Muestra un mensaje si no hay posts para el filtro
    if (postsFiltrados.length === 0) {
        contenedor.innerHTML = `<p class="mensaje-vacio">Aún no hay publicaciones en la sección de <strong>${filtroSeccion}</strong>. ¡Sé el primero en mandar tu contenido!</p>`;
        return;
    }
    
    // Agrega las publicaciones filtradas al contenedor
    postsFiltrados.forEach(post => {
        contenedor.appendChild(crearPostHTML(post));
    });
}

// ----------------------------------------------------
// 2. LÓGICA DEL MODAL "SUBIR"
// ----------------------------------------------------

const linkSubir = document.getElementById('link-subir');
const modalSubir = document.getElementById('modal-subir');
const closeModal = document.querySelector('.close-modal');

// Abrir modal al hacer clic en "Subir"
if(linkSubir && modalSubir) {
    linkSubir.addEventListener('click', (e) => {
        e.preventDefault();
        modalSubir.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Evita el scroll
    });
}

// Cerrar modal al hacer clic en la 'X'
if(closeModal && modalSubir) {
    closeModal.addEventListener('click', (e) => {
        e.preventDefault();
        modalSubir.style.display = 'none';
        document.body.style.overflow = 'auto'; 
    });
}

// Cerrar modal si se hace clic fuera del contenido
if(modalSubir) {
    modalSubir.addEventListener('click', (e) => {
        if (e.target === modalSubir) {
            modalSubir.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}


// ----------------------------------------------------
// 3. EVENTOS Y CARGA INICIAL
// ----------------------------------------------------

// Añade el evento de click a los enlaces de navegación para filtrar
enlacesNav.forEach(enlace => {
    enlace.addEventListener('click', (e) => {
        const seccion = e.target.getAttribute('data-seccion');

        // Solo filtra si tiene el atributo data-seccion
        if (seccion) {
            e.preventDefault();
            mostrarPublicaciones(seccion);
            // Opcional: Cerrar el modal por si acaso
            if(modalSubir) modalSubir.style.display = 'none'; 
            document.body.style.overflow = 'auto'; 
        }
    });
});

// Cargar la sección "Todo" por defecto al cargar la página
window.onload = function() {
    // Validamos que el array exista y tenga contenido
    if (typeof publicaciones !== 'undefined' && publicaciones.length > 0) {
        mostrarPublicaciones("Todo");
    } else {
         contenedor.innerHTML = `<p class="mensaje-vacio">⚠️ **Error Crítico:** No se encontraron publicaciones. Revisa el archivo <strong>posts.js</strong> y el orden de los scripts.</p>`;
    }
};
