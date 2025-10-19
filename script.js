// ====================================================================
// script.js - VERSIÓN FINAL CON REDIRECCIÓN A TIKTOK Y ALERTAS
// ====================================================================

// --- 0. VARIABLES GLOBALES Y CONFIGURACIÓN ---

// URL de tu perfil de TikTok
const TIKTOK_URL = 'https://www.tiktok.com/@jlcojvjcl'; 

// Control de temas (debe ser 'auto' en producción)
const TEMA_FORZADO = 'diademuertos'; 

// Obtener elementos principales
const contenedorPublicaciones = document.getElementById('contenedor-publicaciones');
const enlacesNav = document.querySelectorAll('.nav-link'); 
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// Modales y Enlaces de Acción
const linkSubir = document.getElementById('link-subir');
const linkChatAnonimo = document.getElementById('link-chat'); 

// Modal de Media
const mediaModal = document.getElementById('media-modal');
const closeMediaModal = document.querySelector('.close-media-modal');
const mediaContentViewer = document.getElementById('media-content-viewer');
const mediaCaption = document.getElementById('media-caption');

// Asume que postsData se carga desde posts.js
let postsData = window.posts || []; 


// ----------------------------------------------------
// 1. LÓGICA DE TEMAS Y FECHAS
// ----------------------------------------------------

function aplicarTemaPorFecha() {
    const body = document.body;
    const temas = [
        'tema-reyes', 'tema-candelaria', 'tema-constitucion', 'tema-ejercito', 
        'tema-sanvalentin', 'tema-bandera', 'tema-mujer', 'tema-expropiacion', 
        'tema-juarez', 'tema-puebla', 'tema-maestro', 'tema-marina', 'tema-patrio', 
        'tema-raza', 'tema-diademuertos', 'tema-revolucion', 'tema-musico', 'tema-virgen', 
        'tema-navidad', 'tema-carnaval', 'tema-zapataniño', 'tema-abuelo', 'tema-morelos', 
        'tema-armada', 'tema-inocentes', 'tema-original', 'tema-cultural'
    ];
                   
    body.classList.remove(...temas.filter(t => t !== 'tema-original')); 

    if (TEMA_FORZADO !== 'auto' && TEMA_FORZADO !== 'original') {
        body.classList.add(`tema-${TEMA_FORZADO}`);
        return;
    }
    if (TEMA_FORZADO === 'original') {
        body.classList.add('tema-original');
        return;
    }

    const today = new Date();
    const currentYear = today.getFullYear();
    const todayNormalized = new Date(currentYear, today.getMonth(), today.getDate()); 

    const inRange = (m1, d1, m2, d2) => {
        let start = new Date(currentYear, m1 - 1, d1);
        let end = new Date(currentYear, m2 - 1, d2);
        
        if (m1 > m2) { start = new Date(currentYear - 1, m1 - 1, d1); }
        if (m1 <= m2) { end.setHours(23, 59, 59, 999); } 
        
        return todayNormalized >= start && todayNormalized <= end;
    };
    
    // --- Lógica de temas (Mantengo la tuya) ---
    if (inRange(12, 16, 1, 5)) { body.classList.add('tema-navidad'); return; }
    if (inRange(1, 6, 1, 8)) { body.classList.add('tema-reyes'); return; }
    if (inRange(2, 13, 2, 15)) { body.classList.add('tema-sanvalentin'); return; }
    if (inRange(2, 1, 2, 3)) { body.classList.add('tema-candelaria'); return; }
    if (inRange(2, 4, 2, 5)) { body.classList.add('tema-constitucion'); return; }
    if (inRange(2, 9, 2, 20)) { body.classList.add('tema-ejercito'); return; }
    if (inRange(2, 23, 2, 25)) { body.classList.add('tema-bandera'); return; }
    if (inRange(2, 26, 3, 2)) { body.classList.add('tema-carnaval'); return; } 
    if (inRange(2, 27, 2, 28)) { body.classList.add('tema-constitucion'); return; } 
    if (inRange(3, 20, 3, 22)) { body.classList.add('tema-juarez'); return; }
    if (inRange(3, 17, 3, 18)) { body.classList.add('tema-expropiacion'); return; }
    if (inRange(3, 7, 3, 8)) { body.classList.add('tema-mujer'); return; }
    if (inRange(4, 29, 4, 30)) { body.classList.add('tema-zapataniño'); return; } 
    if (inRange(4, 9, 4, 28)) { body.classList.add('tema-zapataniño'); return; }
    if (inRange(4, 1, 4, 8)) { body.classList.add('tema-virgen'); return; } 
    if (inRange(5, 14, 5, 16)) { body.classList.add('tema-maestro'); return; }
    if (inRange(5, 9, 5, 11)) { body.classList.add('tema-maestro'); return; }
    if (inRange(5, 4, 5, 6)) { body.classList.add('tema-puebla'); return; } 
    if (inRange(4, 30, 5, 1)) { body.classList.add('tema-puebla'); return; }
    if (inRange(5, 30, 6, 2)) { body.classList.add('tema-marina'); return; }
    if (inRange(6, 15, 6, 21)) { body.classList.add('tema-maestro'); return; } 
    if (inRange(7, 10, 7, 25)) { body.classList.add('tema-cultural'); return; }
    if (inRange(7, 17, 7, 19)) { body.classList.add('tema-juarez'); return; }
    if (inRange(8, 27, 8, 29)) { body.classList.add('tema-abuelo'); return; }
    if (inRange(9, 14, 9, 17)) { body.classList.add('tema-patrio'); return; }
    if (inRange(9, 12, 9, 13)) { body.classList.add('tema-patrio'); return; }
    if (inRange(9, 29, 9, 30)) { body.classList.add('tema-morelos'); return; }
    if (inRange(9, 26, 9, 27)) { body.classList.add('tema-morelos'); return; }
    if (inRange(10, 11, 10, 13)) { body.classList.add('tema-raza'); return; } 
    if (inRange(10, 28, 11, 3)) { body.classList.add('tema-diademuertos'); return; }
    if (inRange(11, 19, 11, 21)) { body.classList.add('tema-revolucion'); return; }
    if (inRange(11, 21, 11, 23)) { body.classList.add('tema-musico'); return; }
    if (inRange(11, 22, 11, 24)) { body.classList.add('tema-armada'); return; }
    if (inRange(12, 27, 12, 28)) { body.classList.add('tema-inocentes'); return; }
    if (inRange(12, 11, 12, 13)) { body.classList.add('tema-virgen'); return; }
    if (inRange(12, 16, 12, 31)) { body.classList.add('tema-navidad'); return; }

    body.classList.add('tema-original'); 
}


// --- 2. FUNCIONES PRINCIPALES (RENDERIZADO Y BÚSQUEDA) ---

function renderPosts(postsToDisplay) {
    contenedorPublicaciones.innerHTML = '';
    
    if (postsToDisplay.length === 0) {
        contenedorPublicaciones.innerHTML = '<p class="no-results">😔 No se encontraron publicaciones con esos criterios.</p>';
        return;
    }

    postsToDisplay.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post-card';
        postElement.setAttribute('data-seccion', post.seccion);
        
        let mediaHTML = '';
        if (post.media && post.media.url) { // Verifica si hay una URL de media
            const url = post.media.url;
            const mediaType = url.match(/\.(mp4|webm|ogg)$/i) ? 'video' : 'image';
            const thumbnailURL = post.media.thumbnail || url; 
            
            mediaHTML = `
                <div class="post-media" data-url="${url}" data-type="${mediaType}" data-caption="${post.media.caption || ''}">
                    <img src="${thumbnailURL}" alt="${post.titulo}" class="media-thumbnail">
                    <span class="view-icon">🔍</span>
                </div>
            `;
        }

        postElement.innerHTML = `
            ${mediaHTML}
            <div class="post-content">
                <h3 class="post-title">${post.titulo}</h3>
                <p class="post-seccion">Sección: ${post.seccion}</p>
                <p class="post-descripcion">${post.descripcion}</p>
                <p class="post-fecha">${post.fecha || 'Fecha Desconocida'}</p>
                <div class="post-autor" style="border-left-color: ${post.autor.color || '#ccc'}">
                    <p>${post.autor.nombre || 'Anónimo'}</p>
                </div>
            </div>
        `;
        contenedorPublicaciones.appendChild(postElement);
    });
    
    document.querySelectorAll('.post-media').forEach(mediaDiv => {
        mediaDiv.addEventListener('click', openMediaModal);
    });
}

function filtrarPostsPorSeccion(seccion) {
    let postsFiltrados = postsData;
    if (seccion && seccion !== 'Todo') {
        postsFiltrados = postsData.filter(post => post.seccion === seccion);
    }
    renderPosts(postsFiltrados);
}

function buscarPosts(query) {
    const termino = query.toLowerCase().trim();
    if (!termino) {
        filtrarPostsPorSeccion('Todo'); 
        return;
    }
    
    const postsEncontrados = postsData.filter(post => {
        const titulo = post.titulo.toLowerCase();
        const descripcion = post.descripcion.toLowerCase();
        const seccion = post.seccion.toLowerCase();
        
        return titulo.includes(termino) || 
               descripcion.includes(termino) ||
               seccion.includes(termino);
    });
    
    renderPosts(postsEncontrados);
}

// --- 3. MANEJO DE MODAL MEDIA VIEWER ---

function openMediaModal(e) {
    const mediaDiv = e.currentTarget; 
    const url = mediaDiv.getAttribute('data-url');
    const type = mediaDiv.getAttribute('data-type');
    const caption = mediaDiv.getAttribute('data-caption');
    
    mediaContentViewer.innerHTML = '';
    
    if (type === 'video') {
        mediaContentViewer.innerHTML = `<video src="${url}" controls autoplay loop></video>`;
    } else { // image
        mediaContentViewer.innerHTML = `<img src="${url}" alt="Contenido Expandido">`;
    }
    
    mediaCaption.textContent = caption;
    mediaModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeMediaViewer() {
    if (mediaModal) {
        mediaModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        mediaContentViewer.innerHTML = ''; 
    }
}


// --- 4. EVENT LISTENERS (Redirecciones con Alerta) ---

enlacesNav.forEach(enlace => {
    enlace.addEventListener('click', (e) => {
        const seccion = enlace.getAttribute('data-seccion'); 
        const href = enlace.getAttribute('href');

        if (href && href !== '#' && href !== 'javascript:void(0)') {
            return; 
        }

        e.preventDefault(); 
        
        if (seccion) {
            enlacesNav.forEach(nav => nav.classList.remove('active'));
            enlace.classList.add('active');
            filtrarPostsPorSeccion(seccion);
        }
    });
});

searchButton.addEventListener('click', () => {
    buscarPosts(searchInput.value);
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        buscarPosts(searchInput.value);
    }
});


// 🚨 MEJORA: Botón SUBIR con alerta de redirección 🚨
if (linkSubir) {
    linkSubir.addEventListener('click', (e) => {
        e.preventDefault();
        
        const confirmacion = confirm("⚠️ Vas a ser redirigido a nuestro TikTok. Ahí podrás enviar tus publicaciones por mensaje directo de forma anónima.");
        
        if (confirmacion) {
            window.open(TIKTOK_URL, '_blank'); 
        }
    });
}

// 🚨 MEJORA: Botón CHAT ANÓNIMO con alerta de redirección 🚨
if (linkChatAnonimo) {
    linkChatAnonimo.addEventListener('click', (e) => {
        e.preventDefault();
        
        const confirmacion = confirm("💬 Vas a ser redirigido a nuestro TikTok. Por favor, inicia un chat para enviar tus mensajes.");
        
        if (confirmacion) {
            window.open(TIKTOK_URL, '_blank'); 
        }
    });
}


if (closeMediaModal) {
    closeMediaModal.addEventListener('click', closeMediaViewer);
}
if (mediaModal) {
    mediaModal.addEventListener('click', (e) => {
        if (e.target === mediaModal) {
            closeMediaViewer();
        }
    });
}

// --- 5. INICIALIZACIÓN ---

window.onload = () => {
    aplicarTemaPorFecha();
    filtrarPostsPorSeccion('Todo'); 
    
    const todoLink = document.querySelector('[data-seccion="Todo"]');
    if (todoLink) {
        todoLink.classList.add('active');
    }
};
