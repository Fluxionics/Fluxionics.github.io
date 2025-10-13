// script.js

// 🔴 ENLACE DE INVITACIÓN AL CHAT DE DISCORD
const CHAT_ANONIMO_URL = "https://discord.gg/7SVTvj8C"; 

// 🚨 VARIABLE DE CONTROL: ESTABLECE ESTO EN 'auto' PARA PRODUCCIÓN 🚨
// Opciones: 'original', 'diademuertos', 'navidad', 'reyes', 'sanvalentin', 'primavera', 'patrio', o 'auto'
const TEMA_FORZADO = 'auto'; // CAMBIAR AQUÍ PARA PROBAR UN TEMA ESPECÍFICO

// Obtener elementos principales
const contenedor = document.getElementById('contenedor-publicaciones');
const enlacesNav = document.querySelectorAll('.nav-link');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// Obtener elementos de modales
const linkSubir = document.getElementById('link-subir');
const modalSubir = document.getElementById('modal-subir');
const closeModal = document.querySelector('.close-modal');
const linkChatAnonimo = document.getElementById('link-chat'); 
const mediaModal = document.getElementById('media-modal');
const closeMediaModal = document.querySelector('.close-media-modal');
const mediaContentViewer = document.getElementById('media-content-viewer');
const mediaCaption = document.getElementById('media-caption');


// ----------------------------------------------------
// LÓGICA DE TEMAS Y FECHAS
// ----------------------------------------------------

function aplicarTemaPorFecha() {
    const body = document.body;
    // Eliminamos todas las clases temáticas antes de aplicar la correcta
    body.classList.remove('tema-diademuertos', 'tema-navidad', 'tema-reyes', 'tema-sanvalentin', 'tema-primavera', 'tema-patrio', 'tema-original'); 

    // 1. APLICAR TEMA FORZADO SI ESTÁ DEFINIDO
    if (TEMA_FORZADO !== 'auto' && TEMA_FORZADO !== 'original') {
        body.classList.add(`tema-${TEMA_FORZADO}`);
        return;
    }
    if (TEMA_FORZADO === 'original') {
        body.classList.add('tema-original');
        return;
    }

    // 2. LÓGICA AUTOMÁTICA
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // 1-12
    const currentDay = today.getDate();
    
    // Función de ayuda para chequear rangos
    const inRange = (m1, d1, m2, d2) => {
        const start = new Date(today.getFullYear(), m1 - 1, d1);
        const end = new Date(today.getFullYear(), m2 - 1, d2);
        return today >= start && today <= end;
    };

    // a. REYES MAGOS (Enero 6 al 8) - TEMA CORTO Y ESPECÍFICO
    if (inRange(1, 6, 1, 8)) {
        body.classList.add('tema-reyes');
        return;
    }

    // b. SAN VALENTÍN (Febrero 12 al 15)
    if (inRange(2, 12, 2, 15)) {
        body.classList.add('tema-sanvalentin');
        return;
    }
    
    // c. PRIMAVERA / VACACIONES (Marzo 20 al Abril 3)
    if (inRange(3, 20, 4, 3)) {
        body.classList.add('tema-primavera');
        return;
    }

    // d. FIESTAS PATRIAS (Septiembre 14 al 16)
    if (inRange(9, 14, 9, 16)) {
        body.classList.add('tema-patrio');
        return;
    }

    // e. DÍA DE MUERTOS (Octubre 28 al Noviembre 3)
    if (inRange(10, 28, 11, 3)) {
        body.classList.add('tema-diademuertos');
        return;
    }
    
    // f. NAVIDAD (Diciembre 15 al Enero 5) - Rango que cambia de año
    if ((currentMonth === 12 && currentDay >= 15) || (currentMonth === 1 && currentDay <= 5)) {
        body.classList.add('tema-navidad');
        return;
    }
    
    // 3. TEMA POR DEFECTO: ORIGINAL
    body.classList.add('tema-original'); 
}


// ----------------------------------------------------
// FUNCIONES DE POSTS Y LÓGICA DEL SITIO (SIN CAMBIOS)
// ----------------------------------------------------

function crearPostHTML(post) {
    const articulo = document.createElement('article');
    articulo.classList.add('post', post.seccion.toLowerCase().replace(/ /g, '-')); 
    // ... (El resto de la función crearPostHTML sin cambios) ...
    let contenidoMedia = '';
    
    if (post.urlMedia) {
        const isVideo = post.urlMedia.toLowerCase().includes('.mp4');
        const mediaTag = isVideo 
            ? `<video src="${post.urlMedia}" controls></video>`
            : `<img src="${post.urlMedia}" alt="${post.titulo}">`;
            
        contenidoMedia = `
            <div class="post-media" data-src="${post.urlMedia}" data-title="${post.titulo}">
                ${mediaTag}
            </div>
        `;
    }
    
    articulo.innerHTML = `
        <h2 class="post-titulo">${post.titulo}</h2>
        <p class="post-seccion">Sección: <span>${post.seccion}</span></p>
        ${contenidoMedia}
        <p class="post-descripcion">${post.descripcion}</p>
    `;
    return articulo;
}

function mostrarPublicaciones(filtroSeccion, searchTerm = '') {
    contenedor.innerHTML = ''; 
    
    const postsFiltrados = publicaciones.filter(post => {
        if (post.seccion === "Política" && filtroSeccion !== "Todo" && filtroSeccion !== "Política") {
            return false;
        }
        
        const matchSeccion = filtroSeccion === "Todo" || post.seccion === filtroSeccion;
        
        const matchSearch = searchTerm === '' || 
                          post.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchSeccion && matchSearch;
    });

    if (postsFiltrados.length === 0) {
        contenedor.innerHTML = `<p class="mensaje-vacio">No se encontraron publicaciones...</p>`;
        return;
    }
    
    postsFiltrados.forEach(post => {
        contenedor.appendChild(crearPostHTML(post));
    });
}

// ... (Lógica de Modales, Lightbox, Búsqueda y Navegación, sin cambios) ...

if(linkChatAnonimo) {
    linkChatAnonimo.addEventListener('click', (e) => {
        e.preventDefault();
        if(modalSubir) modalSubir.style.display = 'none'; 
        document.body.style.overflow = 'auto'; 
        const tiktokUser = prompt("Para entrar al chat, ingresa tu nombre de usuario de TikTok (ej: @jlcojvjcl).");
        if (tiktokUser && tiktokUser.trim() !== "") {
            alert(`¡Perfecto! Te redirigiremos a Discord. Tu nombre de TikTok: ${tiktokUser}`);
            window.open(CHAT_ANONIMO_URL, '_blank'); 
        } else {
            alert("Necesitas ingresar un nombre de usuario para acceder al chat.");
        }
    });
}
if(linkSubir && modalSubir) {
    modalSubir.style.display = 'none'; 
    linkSubir.addEventListener('click', (e) => {
        e.preventDefault();
        modalSubir.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
}
if(closeModal && modalSubir) {
    closeModal.addEventListener('click', (e) => {
        e.preventDefault();
        modalSubir.style.display = 'none';
        document.body.style.overflow = 'auto'; 
    });
}
if(modalSubir) {
    modalSubir.addEventListener('click', (e) => {
        if (e.target === modalSubir) {
            modalSubir.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}
function openMediaModal(src, title) {
    mediaContentViewer.innerHTML = '';
    mediaCaption.textContent = title;
    if (src.toLowerCase().includes('.mp4')) {
        mediaContentViewer.innerHTML = `<video src="${src}" controls autoplay></video>`;
    } else {
        mediaContentViewer.innerHTML = `<img src="${src}" alt="${title}">`;
    }
    mediaModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}
if (closeMediaModal && mediaModal) {
    closeMediaModal.addEventListener('click', () => {
        mediaModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        mediaContentViewer.innerHTML = ''; 
    });
    mediaModal.addEventListener('click', (e) => {
        if (e.target === mediaModal) {
            mediaModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            mediaContentViewer.innerHTML = '';
        }
    });
}
contenedor.addEventListener('click', (e) => {
    let target = e.target;
    let postMediaElement = null;
    while (target && target !== contenedor) {
        if (target.classList && target.classList.contains('post-media')) {
            postMediaElement = target;
            break;
        }
        target = target.parentElement;
    }
    if (postMediaElement && postMediaElement.dataset.src) {
        e.preventDefault(); 
        openMediaModal(postMediaElement.dataset.src, postMediaElement.dataset.title);
    }
});
if (searchButton && searchInput) {
    const performSearch = () => {
        const activeLink = document.querySelector('.nav-link.active[data-seccion]');
        const currentSection = activeLink ? activeLink.getAttribute('data-seccion') : 'Todo';
        mostrarPublicaciones(currentSection, searchInput.value);
    };
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}
enlacesNav.forEach(enlace => {
    enlace.addEventListener('click', (e) => {
        const seccion = e.target.getAttribute('data-seccion');
        if (seccion) {
            e.preventDefault();
            enlacesNav.forEach(link => link.classList.remove('active'));
            e.target.classList.add('active');
            if(searchInput) searchInput.value = '';
            mostrarPublicaciones(seccion);
            if(modalSubir) modalSubir.style.display = 'none'; 
            document.body.style.overflow = 'auto'; 
        }
    });
});

// Cargar la sección "Todo" por defecto al cargar la página
window.onload = function() {
    aplicarTemaPorFecha(); 

    if (typeof publicaciones !== 'undefined' && publicaciones.length > 0) {
        mostrarPublicaciones("Todo");
        const todoLink = document.querySelector('.nav-link[data-seccion="Todo"]');
        if (todoLink) todoLink.classList.add('active');
    } else {
         contenedor.innerHTML = `<p class="mensaje-vacio">⚠️ **Error Crítico:** No se encontraron publicaciones. Revisa el archivo <strong>posts.js</strong> y el orden de los scripts.</p>`;
    }
};
