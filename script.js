// script.js

// Obtener el contenedor principal y los enlaces de navegación
const contenedor = document.getElementById('contenedor-publicaciones');
const enlacesNav = document.querySelectorAll('.nav-link');

// Función para crear el HTML de una publicación
function crearPostHTML(post) {
    const articulo = document.createElement('article');
    articulo.classList.add('post', post.seccion.toLowerCase().replace(' ', '-')); // Clase para estilos

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
        <p class="post-descripcion">${post.descripcion}</p>
    `;
    return articulo;
}

// Función principal para mostrar y filtrar posts
function mostrarPublicaciones(filtroSeccion) {
    // 1. Limpia el contenedor de publicaciones antes de cargar nuevos posts
    contenedor.innerHTML = ''; 

    // 2. Determina qué publicaciones mostrar
    const postsFiltrados = publicaciones.filter(post => {
        // Excluye "Política" de la vista "Todo" para que no se muestre como un post normal.
        if (post.seccion === "Política") {
            return false;
        }
        
        // Muestra todas si es "Todo", o solo las que coinciden con la sección
        return filtroSeccion === "Todo" || post.seccion === filtroSeccion;
    });

    // 3. Muestra un mensaje si no hay posts para el filtro
    if (postsFiltrados.length === 0) {
        contenedor.innerHTML = `<p class="mensaje-vacio">Aún no hay publicaciones en la sección de <strong>${filtroSeccion}</strong>. ¡Sé el primero en mandar tu contenido!</p>`;
        return;
    }
    
    // 4. Agrega las publicaciones filtradas al contenedor
    postsFiltrados.forEach(post => {
        contenedor.appendChild(crearPostHTML(post));
    });
}

// ----------------------------------------------------
// EVENTOS Y CARGA INICIAL
// ----------------------------------------------------

// Añade el evento de click a los enlaces de navegación para filtrar
enlacesNav.forEach(enlace => {
    enlace.addEventListener('click', (e) => {
        const seccion = e.target.getAttribute('data-seccion');

        // Solo filtra si tiene el atributo data-seccion (excluye Política y Subir)
        if (seccion) {
            e.preventDefault();
            mostrarPublicaciones(seccion);
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
