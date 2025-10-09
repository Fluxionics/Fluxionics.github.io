// Asegúrate de que el array 'publicaciones' del archivo posts.js ya está cargado.

const contenedor = document.getElementById('contenedor-publicaciones');
const enlacesNav = document.querySelectorAll('.nav-link');

// ----------------------------------------------------
// 1. FUNCIONES PARA CREAR Y MOSTRAR EL CONTENIDO
// ----------------------------------------------------

// Función para crear el HTML de una publicación (Post)
function crearPostHTML(post) {
    const articulo = document.createElement('article');
    articulo.classList.add('post', post.seccion.toLowerCase());

    let contenidoMedia = '';
    // Verifica si hay una URL de imagen o video válida
    if (post.urlMedia) {
        if (post.urlMedia.toLowerCase().includes('.mp4') || post.urlMedia.toLowerCase().includes('youtube.com') || post.urlMedia.toLowerCase().includes('youtu.be')) {
            // Asume que es un video. Para YouTube necesitarías un iframe.
            contenidoMedia = `<div class="post-media"><video src="${post.urlMedia}" controls poster="https://via.placeholder.com/300x200?text=Video+de+la+Secundaria"></video></div>`;
        } else {
            // Asume que es una imagen
            contenidoMedia = `<div class="post-media"><img src="${post.urlMedia}" alt="${post.titulo}"></div>`;
        }
    }
    
    // Inyecta el contenido
    articulo.innerHTML = `
        <h2 class="post-titulo">${post.titulo}</h2>
        <p class="post-seccion">Sección: <span>${post.seccion}</span></p>
        ${contenidoMedia}
        <p class="post-descripcion">${post.descripcion}</p>
    `;
    return articulo;
}

// Función principal para mostrar y filtrar posts
function mostrarPublicaciones(filtroSeccion) {
    // ⚠️ CRÍTICO: Limpia solo el contenedor de publicaciones.
    // La sección "Subir" debe estar fuera de este contenedor en index.html.
    contenedor.innerHTML = ''; 

    // Determina qué publicaciones mostrar
    const postsFiltrados = publicaciones.filter(post => {
        // Excluye "Política" de la vista "Todo", ya que tiene su propio enlace
        if (post.seccion === "Política") {
            return false;
        }
        
        // Aplica el filtro de sección si no es "Todo"
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
// 2. EVENTOS Y CARGA INICIAL
// ----------------------------------------------------

// Añade el evento de click a los enlaces de navegación para filtrar
enlacesNav.forEach(enlace => {
    enlace.addEventListener('click', (e) => {
        const seccion = e.target.getAttribute('data-seccion');

        // Solo filtra si tiene el atributo data-seccion (excluyendo Política y Subir)
        if (seccion) {
            e.preventDefault();
            mostrarPublicaciones(seccion);
            
            // Opcional: Desplazarse al inicio de las publicaciones
            contenedor.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Cargar la sección "Todo" por defecto al cargar la página
// Usamos window.onload para asegurarnos de que todo el HTML se haya cargado.
window.onload = function() {
    // Pequeña validación para asegurar que 'publicaciones' existe.
    if (typeof publicaciones !== 'undefined' && publicaciones.length > 0) {
        mostrarPublicaciones("Todo");
    } else {
         contenedor.innerHTML = `<p class="mensaje-vacio">⚠️ **Error:** No se encontraron publicaciones. Asegúrate que el archivo <strong>posts.js</strong> está enlazado correctamente y no está vacío.</p>`;
    }
};
