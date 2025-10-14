// ====================================================================
// script.js - Lógica Principal (Filtrado, Búsqueda, Modales, Horario, Temas)
// ====================================================================

// --- 0. VARIABLES GLOBALES Y CONFIGURACIÓN ---

const TEMA_FORZADO = 'auto'; 
const CHAT_ANONIMO_URL = "https://www.tiktok.com/@jlcojvjcl"; // Usamos el link de TikTok

// Obtener elementos principales
const contenedorPublicaciones = document.getElementById('contenedor-publicaciones');
const enlacesNav = document.querySelectorAll('.nav-link');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// Modales y Enlaces de Acción
const linkSubir = document.getElementById('link-subir');
const linkChatAnonimo = document.getElementById('link-chat'); 
const modalSubir = document.getElementById('modal-subir');
// El selector correcto es .close-modal-subir (asumiendo tu HTML)
const closeModalSubir = document.querySelector('.close-modal-subir'); 

// Modal de Media
const mediaModal = document.getElementById('media-modal');
const closeMediaModal = document.querySelector('.close-media-modal');
const mediaContentViewer = document.getElementById('media-content-viewer');
const mediaCaption = document.getElementById('media-caption');

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
    
    // Lógica de fechas (Asegúrate de que tus fechas sean correctas)
    if (inRange(12, 16, 1, 5)) { body.classList.add('tema-navidad'); return; }
    if (inRange(10, 28, 11, 3)) { body.classList.add('tema-diademuertos'); return; }
    // ... [Agrega el resto de tu lógica de fechas aquí]
    
    body.classList.add('tema-original'); 
}


// --- 2. FUNCIONES DE POSTS Y LÓGICA DE HORARIO ---

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
        if (post.media) {
            const mediaType = post.media.url.match(/\.(mp4|webm|ogg)$/i) ? 'video' : 'image';
            const thumbnailURL = post.media.thumbnail || post.media.url; 
            
            mediaHTML = `
                <div class="post-media" data-url="${post.media.url}" data-type="${mediaType}" data-caption="${post.media.caption || ''}">
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
                <p class="post-fecha">${post.fecha}</p>
                <div class="post-autor" style="border-left-color: ${post.autor.color}">
                    <p>${post.autor.nombre}</p>
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

function isUploadTimeAllowed() {
    const now = new Date();
    const currentHour = now.getHours(); 
    const currentMinute = now.getMinutes(); 

    const startTimeInMinutes = 690; // 11:30 AM
    const endTimeInMinutes = 780;   // 1:00 PM (13:00)

    const currentTimeInMinutes = (currentHour * 60) + currentMinute;

    return currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes <= endTimeInMinutes;
}


// --- 3. MANEJO DE MODALES Y VISTAS ---

function openSubirModal() {
    if (modalSubir) { 
        modalSubir.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeSubirModal() {
    if (modalSubir) {
        modalSubir.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

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


// --- 4. EVENT LISTENERS ---

// 4.1. Navegación y Filtrado
enlacesNav.forEach(enlace => {
    enlace.addEventListener('click', (e) => {
        const seccion = enlace.getAttribute('data-seccion'); 
        const href = enlace.getAttribute('href');

        // Permite la navegación directa a politica.html
        if (href === 'politica.html') {
            return; 
        }

        // Ignora enlaces de acción (Subir, Chat Anónimo)
        if (!seccion) {
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

// 4.2. Búsqueda
searchButton.addEventListener('click', () => {
    buscarPosts(searchInput.value);
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        buscarPosts(searchInput.value);
    }
});

// 4.3. Modal Subir (CON RESTRICCIÓN HORARIA)
if (linkSubir) {
    linkSubir.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (isUploadTimeAllowed()) {
            openSubirModal();
        } else {
            alert('❌ El envío de publicaciones está abierto solo de 11:30 AM a 1:00 PM. ¡Vuelve a esa hora!');
        }
    });
}
if (closeModalSubir) {
    closeModalSubir.addEventListener('click', (e) => {
        e.preventDefault();
        closeSubirModal();
    });
}
if (modalSubir) {
    modalSubir.addEventListener('click', (e) => {
        if (e.target === modalSubir) {
            closeSubirModal();
        }
    });
}

// 4.4. Chat Anónimo (Redirección a TikTok)
if (linkChatAnonimo) {
    linkChatAnonimo.addEventListener('click', (e) => {
        e.preventDefault();
        window.open(CHAT_ANONIMO_URL, '_blank'); 
    });
}

// 4.5. Modal de Media Viewer
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
    // 1. Aplica el tema festivo
    aplicarTemaPorFecha();
    
    // 2. Carga inicial de posts
    filtrarPostsPorSeccion('Todo'); 
    
    // 3. Marca la sección "Todo" como activa al inicio
    const todoLink = document.querySelector('[data-seccion="Todo"]');
    if (todoLink) {
        todoLink.classList.add('active');
    }
};
