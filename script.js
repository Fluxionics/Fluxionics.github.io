// script.js

// Obtener elementos principales
const contenedor = document.getElementById('contenedor-publicaciones');
const enlacesNav = document.querySelectorAll('.nav-link');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

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
        // La URL de Imgur debe ser directa (ej: .png, .jpg)
        const isVideo = post.urlMedia.toLowerCase().includes('.mp4');
        const mediaTag = isVideo 
            ? `<video src="${post.urlMedia}" controls></video>`
            : `<img src="${post.urlMedia}" alt="${post.titulo}">`;
            
        // El contenedor del medio ahora tiene los atributos de data para abrir el Lightbox
        contenidoMedia = `<div class="post-media" data-src="${post.urlMedia}" data-title="${post.titulo}">${mediaTag}</div>`;
    }
    
    // Mostramos la descripción en todas las secciones
    articulo.innerHTML = `
        <h2 class="post-titulo">${post.titulo}</h2>
        <p class="post-seccion">Sección: <span>${post.seccion}</span></p>
        ${contenidoMedia}
        <p class="post-descripcion">${post.descripcion}</p>
    `;
    return articulo;
}

// Función principal para mostrar y filtrar posts y manejar el buscador
function mostrarPublicaciones(filtroSeccion, searchTerm = '') {
    contenedor.innerHTML = ''; 

    const postsFiltrados = publicaciones.filter(post => {
        if (post.seccion === "Política") {
            return false;
        }
        
        // 1. Filtrar por sección
        const matchSeccion = filtroSeccion === "Todo" || post.seccion === filtroSeccion;

        // 2. Filtrar por término de búsqueda (título o descripción)
        const matchSearch = searchTerm === '' || 
                          post.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchSeccion && matchSearch;
    });

    if (postsFiltrados.length === 0) {
        contenedor.innerHTML = `<p class="mensaje-vacio">No se encontraron publicaciones en la sección de <strong>${filtroSeccion}</strong> ${searchTerm ? `con el término "${searchTerm}"` : ''}. ¡Sé el primero en mandar tu contenido!</p>`;
        return;
    }
    
    postsFiltrados.forEach(post => {
        contenedor.appendChild(crearPostHTML(post));
    });
}

// ----------------------------------------------------
// 2. LÓGICA DE BOTONES Y MODALES
// ----------------------------------------------------

// LÓGICA DEL CHAT ANÓNIMO
const linkChatAnonimo = document.getElementById('link-chat');
const modalSubir = document.getElementById('modal-subir');

if(linkChatAnonimo) {
    linkChatAnonimo.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Cierra el modal de "Enviar Chisme" si está abierto
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

// LÓGICA DEL MODAL "ENVIAR CHISME"
const linkSubir = document.getElementById('link-subir');
const closeModal = document.querySelector('.close-modal');

if(linkSubir && modalSubir) {
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


// LÓGICA DEL VISOR DE MEDIOS (LIGHTBOX)
const mediaModal = document.getElementById('media-modal');
const closeMediaModal = document.querySelector('.close-media-modal');
const mediaContentViewer = document.getElementById('media-content-viewer');
const mediaCaption = document.getElementById('media-caption');

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

// Delegación de eventos para abrir el Lightbox al hacer clic en las imágenes/videos de los posts
contenedor.addEventListener('click', (e) => {
    let target = e.target;
    // Buscar el elemento padre con la clase post-media y los atributos data-src
    while (target && !target.dataset.src && target !== contenedor) {
        target = target.parentElement;
    }

    if (target && target.dataset.src) {
        e.preventDefault(); 
        openMediaModal(target.dataset.src, target.dataset.title);
    }
});


// ----------------------------------------------------
// 4. EVENTOS Y CARGA INICIAL
// ----------------------------------------------------

// Lógica del buscador
if (searchButton && searchInput) {
    const performSearch = () => {
        const currentActiveNav = document.querySelector('.nav-link.active');
        const currentSection = currentActiveNav ? currentActiveNav.getAttribute('data-seccion') : 'Todo';
        mostrarPublicaciones(currentSection, searchInput.value);
    };

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// Lógica de navegación
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
    if (typeof publicaciones !== 'undefined' && publicaciones.length > 0) {
        mostrarPublicaciones("Todo");
        const todoLink = document.querySelector('.nav-link[data-seccion="Todo"]');
        if (todoLink) todoLink.classList.add('active');
    } else {
         contenedor.innerHTML = `<p class="mensaje-vacio">⚠️ **Error Crítico:** No se encontraron publicaciones. Revisa el archivo <strong>posts.js</strong> y el orden de los scripts.</p>`;
    }
};// script.js

// Obtener elementos principales
const contenedor = document.getElementById('contenedor-publicaciones');
const enlacesNav = document.querySelectorAll('.nav-link');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

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
        // La URL de Imgur debe ser directa (ej: .png, .jpg)
        const isVideo = post.urlMedia.toLowerCase().includes('.mp4');
        const mediaTag = isVideo 
            ? `<video src="${post.urlMedia}" controls></video>`
            : `<img src="${post.urlMedia}" alt="${post.titulo}">`;
            
        // El contenedor del medio ahora tiene los atributos de data para abrir el Lightbox
        contenidoMedia = `<div class="post-media" data-src="${post.urlMedia}" data-title="${post.titulo}">${mediaTag}</div>`;
    }
    
    // Mostramos la descripción en todas las secciones
    articulo.innerHTML = `
        <h2 class="post-titulo">${post.titulo}</h2>
        <p class="post-seccion">Sección: <span>${post.seccion}</span></p>
        ${contenidoMedia}
        <p class="post-descripcion">${post.descripcion}</p>
    `;
    return articulo;
}

// Función principal para mostrar y filtrar posts y manejar el buscador
function mostrarPublicaciones(filtroSeccion, searchTerm = '') {
    contenedor.innerHTML = ''; 

    const postsFiltrados = publicaciones.filter(post => {
        if (post.seccion === "Política") {
            return false;
        }
        
        // 1. Filtrar por sección
        const matchSeccion = filtroSeccion === "Todo" || post.seccion === filtroSeccion;

        // 2. Filtrar por término de búsqueda (título o descripción)
        const matchSearch = searchTerm === '' || 
                          post.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchSeccion && matchSearch;
    });

    if (postsFiltrados.length === 0) {
        contenedor.innerHTML = `<p class="mensaje-vacio">No se encontraron publicaciones en la sección de <strong>${filtroSeccion}</strong> ${searchTerm ? `con el término "${searchTerm}"` : ''}. ¡Sé el primero en mandar tu contenido!</p>`;
        return;
    }
    
    postsFiltrados.forEach(post => {
        contenedor.appendChild(crearPostHTML(post));
    });
}

// ----------------------------------------------------
// 2. LÓGICA DE BOTONES Y MODALES
// ----------------------------------------------------

// LÓGICA DEL CHAT ANÓNIMO
const linkChatAnonimo = document.getElementById('link-chat');
const modalSubir = document.getElementById('modal-subir');

if(linkChatAnonimo) {
    linkChatAnonimo.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Cierra el modal de "Enviar Chisme" si está abierto
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

// LÓGICA DEL MODAL "ENVIAR CHISME"
const linkSubir = document.getElementById('link-subir');
const closeModal = document.querySelector('.close-modal');

if(linkSubir && modalSubir) {
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


// LÓGICA DEL VISOR DE MEDIOS (LIGHTBOX)
const mediaModal = document.getElementById('media-modal');
const closeMediaModal = document.querySelector('.close-media-modal');
const mediaContentViewer = document.getElementById('media-content-viewer');
const mediaCaption = document.getElementById('media-caption');

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

// Delegación de eventos para abrir el Lightbox al hacer clic en las imágenes/videos de los posts
contenedor.addEventListener('click', (e) => {
    let target = e.target;
    // Buscar el elemento padre con la clase post-media y los atributos data-src
    while (target && !target.dataset.src && target !== contenedor) {
        target = target.parentElement;
    }

    if (target && target.dataset.src) {
        e.preventDefault(); 
        openMediaModal(target.dataset.src, target.dataset.title);
    }
});


// ----------------------------------------------------
// 4. EVENTOS Y CARGA INICIAL
// ----------------------------------------------------

// Lógica del buscador
if (searchButton && searchInput) {
    const performSearch = () => {
        const currentActiveNav = document.querySelector('.nav-link.active');
        const currentSection = currentActiveNav ? currentActiveNav.getAttribute('data-seccion') : 'Todo';
        mostrarPublicaciones(currentSection, searchInput.value);
    };

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// Lógica de navegación
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
    if (typeof publicaciones !== 'undefined' && publicaciones.length > 0) {
        mostrarPublicaciones("Todo");
        const todoLink = document.querySelector('.nav-link[data-seccion="Todo"]');
        if (todoLink) todoLink.classList.add('active');
    } else {
         contenedor.innerHTML = `<p class="mensaje-vacio">⚠️ **Error Crítico:** No se encontraron publicaciones. Revisa el archivo <strong>posts.js</strong> y el orden de los scripts.</p>`;
    }
};
