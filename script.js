// script.js

// Obtener el contenedor principal y los enlaces de navegación
const contenedor = document.getElementById('contenedor-publicaciones');
const enlacesNav = document.querySelectorAll('.nav-link');

// 🔴 CRÍTICO: ENLACE DE INVITACIÓN AL CHAT DE DISCORD
const CHAT_ANONIMO_URL = "https://discord.gg/7SVTvj8C"; 


// ----------------------------------------------------
// 1. FUNCIONES PARA CREAR Y MOSTRAR EL CONTENIDO
// ----------------------------------------------------

function crearPostHTML(post) {
    const articulo = document.createElement('article');
    articulo.classList.add('post', post.seccion.toLowerCase().replace(' ', '-')); 

    let contenidoMedia = '';
    
    if (post.urlMedia) {
        const mediaTag = post.urlMedia.toLowerCase().includes('.mp4') 
            ? `<video src="${post.urlMedia}" controls></video>`
            : `<img src="${post.urlMedia}" alt="${post.titulo}">`;
            
        contenidoMedia = `<div class="post-media">${mediaTag}</div>`;
    }
    
    articulo.innerHTML = `
        <h2 class="post-titulo">${post.titulo}</h2>
        <p class="post-seccion">Sección: <span>${post.seccion}</span></p>
        ${contenidoMedia}
        ${post.seccion !== 'Pareja Oficial' ? `<p class="post-descripcion">${post.descripcion}</p>` : ''} 
    `;
    return articulo;
}

function mostrarPublicaciones(filtroSeccion) {
    contenedor.innerHTML = ''; 

    const postsFiltrados = publicaciones.filter(post => {
        if (post.seccion === "Política") {
            return false;
        }
        return filtroSeccion === "Todo" || post.seccion === filtroSeccion;
    });

    if (postsFiltrados.length === 0) {
        contenedor.innerHTML = `<p class="mensaje-vacio">Aún no hay publicaciones en la sección de <strong>${filtroSeccion}</strong>. ¡Sé el primero en mandar tu contenido!</p>`;
        return;
    }
    
    postsFiltrados.forEach(post => {
        contenedor.appendChild(crearPostHTML(post));
    });
}

// ----------------------------------------------------
// 2. LÓGICA DEL CHAT ANÓNIMO (NUEVA SECCIÓN)
// ----------------------------------------------------

const linkChatAnonimo = document.getElementById('link-chat');

if(linkChatAnonimo) {
    linkChatAnonimo.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Cierra el modal de "Enviar Chisme" si está abierto
        if(modalSubir) modalSubir.style.display = 'none'; 
        document.body.style.overflow = 'auto'; 
        
        // Pide el nombre de usuario de TikTok
        const tiktokUser = prompt("Para entrar al chat, ingresa tu nombre de usuario de TikTok (ej: @jlcojvjcl).");

        if (tiktokUser && tiktokUser.trim() !== "") {
            // Abre el enlace de Discord en una nueva pestaña
            alert(`¡Perfecto! Te redirigiremos a Discord. Tu nombre de TikTok: ${tiktokUser}`);
            window.open(CHAT_ANONIMO_URL, '_blank'); 
        } else {
            alert("Necesitas ingresar un nombre de usuario para acceder al chat.");
        }
    });
}


// ----------------------------------------------------
// 3. LÓGICA DEL MODAL "ENVIAR CHISME"
// ----------------------------------------------------

const linkSubir = document.getElementById('link-subir');
const modalSubir = document.getElementById('modal-subir');
const closeModal = document.querySelector('.close-modal');

// Abrir modal al hacer clic en "Enviar Chisme"
if(linkSubir && modalSubir) {
    linkSubir.addEventListener('click', (e) => {
        e.preventDefault();
        modalSubir.style.display = 'flex';
        document.body.style.overflow = 'hidden';
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
// 4. EVENTOS Y CARGA INICIAL
// ----------------------------------------------------

// Añade el evento de click a los enlaces de navegación para filtrar
enlacesNav.forEach(enlace => {
    enlace.addEventListener('click', (e) => {
        const seccion = e.target.getAttribute('data-seccion');

        if (seccion) {
            e.preventDefault();
            mostrarPublicaciones(seccion);
            if(modalSubir) modalSubir.style.display = 'none'; 
            document.body.style.overflow = 'auto'; 
        }
    });
});

// Cargar la sección "Todo" por defecto al cargar la página
window.onload = function() {
    if (typeof publicaciones !== 'undefined' && publicaciones.length > 0) {
        mostrarPublicaciones("Todo");
    } else {
         contenedor.innerHTML = `<p class="mensaje-vacio">⚠️ **Error Crítico:** No se encontraron publicaciones. Revisa el archivo <strong>posts.js</strong> y el orden de los scripts.</p>`;
    }
};
