// script.js - CÓDIGO COMPLETO CON LÓGICA DE TEMAS Y CORRECCIONES

// 🔴 ENLACE DE INVITACIÓN AL CHAT DE DISCORD
const CHAT_ANONIMO_URL = "https://discord.gg/7SVTvj8C"; 

// 🚨 VARIABLE DE CONTROL: ESTABLECE ESTO EN 'auto' PARA PRODUCCIÓN 🚨
const TEMA_FORZADO = 'auto'; // CAMBIA A UN TEMA ESPECÍFICO PARA PROBAR (ej: 'navidad')

// Obtener elementos principales (Asegúrate de que estos IDs existan en index.html)
const contenedor = document.getElementById('contenedor-publicaciones');
const enlacesNav = document.querySelectorAll('.nav-link');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const linkSubir = document.getElementById('link-subir');
const modalSubir = document.getElementById('modal-subir');
const closeModal = document.querySelector('.close-modal');
const linkChatAnonimo = document.getElementById('link-chat'); // <-- CORRECCIÓN DE DEFINICIÓN
const mediaModal = document.getElementById('media-modal');
const closeMediaModal = document.querySelector('.close-media-modal');
const mediaContentViewer = document.getElementById('media-content-viewer');
const mediaCaption = document.getElementById('media-caption');


// ----------------------------------------------------
// LÓGICA DE TEMAS Y FECHAS (18 Temas únicos para 30+ celebraciones)
// ----------------------------------------------------

function aplicarTemaPorFecha() {
    const body = document.body;
    // Lista de todas las clases temáticas posibles
    const temas = [
        'tema-reyes', 'tema-candelaria', 'tema-constitucion', 'tema-ejercito', 
        'tema-sanvalentin', 'tema-bandera', 'tema-mujer', 'tema-expropiacion', 
        'tema-juarez', 'tema-puebla', 'tema-maestro', 'tema-marina', 'tema-patrio', 
        'tema-raza', 'tema-diademuertos', 'tema-revolucion', 'tema-musico', 'tema-virgen', 
        'tema-navidad', 'tema-carnaval', 'tema-zapataniño', 'tema-abuelo', 'tema-morelos', 
        'tema-armada', 'tema-inocentes', 'tema-original', 'tema-cultural'
    ];
                   
    body.classList.remove(...temas.filter(t => t !== 'tema-original')); 

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
    const currentYear = today.getFullYear();
    // Normalizar la fecha a medianoche para que los rangos sean inclusivos
    const todayNormalized = new Date(currentYear, today.getMonth(), today.getDate()); 

    // Función de ayuda para chequear rangos (m1, d1, m2, d2)
    const inRange = (m1, d1, m2, d2) => {
        // Los meses en JS son 0-11, pero los argumentos m1, m2 son 1-12. Ajuste: m-1
        let start = new Date(currentYear, m1 - 1, d1);
        let end = new Date(currentYear, m2 - 1, d2);
        
        // Manejo de cruce de año (ej: Diciembre a Enero)
        if (m1 > m2) { 
            start = new Date(currentYear - 1, m1 - 1, d1);
        }
        
        // El rango final debe ser inclusivo hasta el final del día d2, por eso sumamos 1 día al final si no cruza de año.
        if (m1 <= m2) {
             end.setHours(23, 59, 59, 999);
        } else {
             // Si cruza de año (Dic->Ene), el 'start' ya está en el año anterior, 
             // el 'end' está en el año actual, y la comparación funciona.
        }

        return todayNormalized >= start && todayNormalized <= end;
    };
    
    // --- TEMAS POR PRIORIDAD (De Enero a Diciembre) ---

    // DICIEMBRE/ENERO (NAVIDAD y AÑO NUEVO)
    // Fin de Año (Dic 31) y Año Nuevo (Ene 1) están cubiertos por Navidad
    if (inRange(12, 16, 1, 5)) { body.classList.add('tema-navidad'); return; }

    // ENERO
    // DÍA DE REYES MAGOS (Ene 6)
    if (inRange(1, 6, 1, 8)) { body.classList.add('tema-reyes'); return; }

    // FEBRERO
    // DÍA DE SAN VALENTÍN (Feb 14)
    if (inRange(2, 13, 2, 15)) { body.classList.add('tema-sanvalentin'); return; }
    // DÍA DE LA CANDELARIA (Feb 2)
    if (inRange(2, 1, 2, 3)) { body.classList.add('tema-candelaria'); return; }
    // DÍA DE LA CONSTITUCIÓN (Feb 5)
    if (inRange(2, 4, 2, 5)) { body.classList.add('tema-constitucion'); return; }
    // FUERZA AÉREA (Feb 10) y EJÉRCITO (Feb 19) - Agrupados
    if (inRange(2, 9, 2, 20)) { body.classList.add('tema-ejercito'); return; }
    // DÍA DE LA BANDERA (Feb 24)
    if (inRange(2, 23, 2, 25)) { body.classList.add('tema-bandera'); return; }
    // CARNAVAL (FECHA VARIABLE) - Simulación
    if (inRange(2, 26, 3, 2)) { body.classList.add('tema-carnaval'); return; } 
    // ANIVERSARIO CUAUHTÉMOC (Feb 28)
    if (inRange(2, 27, 2, 28)) { body.classList.add('tema-constitucion'); return; } 

    // MARZO
    // NATALICIO DE BENITO JUÁREZ (Mar 21)
    if (inRange(3, 20, 3, 22)) { body.classList.add('tema-juarez'); return; }
    // EXPROPIACIÓN PETROLERA (Mar 18)
    if (inRange(3, 17, 3, 18)) { body.classList.add('tema-expropiacion'); return; }
    // DÍA INTERNACIONAL DE LA MUJER (Mar 8)
    if (inRange(3, 7, 3, 8)) { body.classList.add('tema-mujer'); return; }

    // ABRIL
    // DÍA DEL NIÑO (Abr 30) - Prioridad alta por festividad
    if (inRange(4, 29, 4, 30)) { body.classList.add('tema-zapataniño'); return; } 
    // ZAPATA (Abr 10) y TIERRA (Abr 22) - Agrupados
    if (inRange(4, 9, 4, 28)) { body.classList.add('tema-zapataniño'); return; }
    // SEMANA SANTA (FECHA VARIABLE) - Simulación
    if (inRange(4, 1, 4, 8)) { body.classList.add('tema-virgen'); return; } // Usa tema religioso

    // MAYO
    // DÍA DEL MAESTRO (May 15)
    if (inRange(5, 14, 5, 16)) { body.classList.add('tema-maestro'); return; }
    // DÍA DE LAS MADRES (May 10)
    if (inRange(5, 9, 5, 11)) { body.classList.add('tema-maestro'); return; }
    // BATALLA DE PUEBLA (May 5)
    if (inRange(5, 4, 5, 6)) { body.classList.add('tema-puebla'); return; } 
    // DÍA DEL TRABAJO (May 1)
    if (inRange(4, 30, 5, 1)) { body.classList.add('tema-puebla'); return; }

    // JUNIO
    // DÍA DE LA MARINA NACIONAL (Jun 1)
    if (inRange(5, 30, 6, 2)) { body.classList.add('tema-marina'); return; }
    // DÍA DEL PADRE (TERCER DOMINGO) - Simulación
    if (inRange(6, 15, 6, 21)) { body.classList.add('tema-maestro'); return; } // Usa tema de reconocimiento

    // JULIO
    // LA GUELAGUETZA (JULIO)
    if (inRange(7, 10, 7, 25)) { body.classList.add('tema-cultural'); return; }
    // Aniversario Luctuoso de Benito Juárez (Jul 18) - Usa tema de Juárez
    if (inRange(7, 17, 7, 19)) { body.classList.add('tema-juarez'); return; }
    
    // AGOSTO
    // DÍA DEL ABUELO (Ago 28)
    if (inRange(8, 27, 8, 29)) { body.classList.add('tema-abuelo'); return; }
    
    // SEPTIEMBRE
    // GRITO DE INDEPENDENCIA (Sep 15 - 16)
    if (inRange(9, 14, 9, 17)) { body.classList.add('tema-patrio'); return; }
    // NIÑOS HÉROES (Sep 13)
    if (inRange(9, 12, 9, 13)) { body.classList.add('tema-patrio'); return; }
    // MORELOS (Sep 30)
    if (inRange(9, 29, 9, 30)) { body.classList.add('tema-morelos'); return; }
    // CONSUMACIÓN (Sep 27)
    if (inRange(9, 26, 9, 27)) { body.classList.add('tema-morelos'); return; }
    
    // OCTUBRE
    // DÍA DE LA RAZA (Oct 12)
    if (inRange(10, 11, 10, 13)) { body.classList.add('tema-raza'); return; } 
    
    // NOVIEMBRE
    // DÍA DE MUERTOS (Oct 28 - Nov 3)
    if (inRange(10, 28, 11, 3)) { body.classList.add('tema-diademuertos'); return; }
    // DÍA DE LA REVOLUCIÓN MEXICANA (Nov 20)
    if (inRange(11, 19, 11, 21)) { body.classList.add('tema-revolucion'); return; }
    // DÍA DEL MÚSICO (Nov 22)
    if (inRange(11, 21, 11, 23)) { body.classList.add('tema-musico'); return; }
    // DÍA DE LA ARMADA DE MÉXICO (Nov 23)
    if (inRange(11, 22, 11, 24)) { body.classList.add('tema-armada'); return; }

    // DICIEMBRE
    // DÍA DE LOS SANTOS INOCENTES (Dic 28)
    if (inRange(12, 27, 12, 28)) { body.classList.add('tema-inocentes'); return; }
    // DÍA DE LA VIRGEN (Dic 12)
    if (inRange(12, 11, 12, 13)) { body.classList.add('tema-virgen'); return; }
    // POSADAS/NAVIDAD (Dic 16 - 26) y FIN DE AÑO
    if (inRange(12, 16, 12, 31)) { body.classList.add('tema-navidad'); return; }

    // 3. TEMA POR DEFECTO: ORIGINAL
    body.classList.add('tema-original'); 
}

// ====================================================================
// script.js - Lógica principal del sitio (Filtrado, Búsqueda, Modales, Horario)
// ====================================================================

// --- 1. DECLARACIÓN DE VARIABLES Y ELEMENTOS ---

const contenedorPublicaciones = document.getElementById('contenedor-publicaciones');
const enlacesNav = document.querySelectorAll('.nav-link');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// Modales y Enlaces de Acción
const linkSubir = document.getElementById('link-subir');
const linkChatAnonimo = document.getElementById('link-chat'); 
const modalSubir = document.getElementById('modal-subir');
const closeModalSubir = document.querySelector('.close-modal-subir'); 

// Modal de Media
const mediaModal = document.getElementById('media-modal');
const closeMediaModal = document.querySelector('.close-media-modal');
const mediaContentViewer = document.getElementById('media-content-viewer');
const mediaCaption = document.getElementById('media-caption');

let postsData = window.posts || []; // Asume que posts.js carga los datos


// --- 2. FUNCIONES PRINCIPALES Y LÓGICA DE HORARIO ---

/**
 * Renderiza los posts filtrados en el contenedor.
 */
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

/**
 * Comprueba si la hora actual está dentro del rango permitido (11:30 AM a 1:00 PM).
 */
function isUploadTimeAllowed() {
    const now = new Date();
    const currentHour = now.getHours(); 
    const currentMinute = now.getMinutes(); 

    // 11:30 AM = 690 minutos
    const startTimeInMinutes = 690;
    // 1:00 PM (13:00) = 780 minutos
    const endTimeInMinutes = 780;

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

        // Ignora enlaces con URL real (como politica.html) y enlaces de acción.
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

// 4.4. Modal Chat Anónimo (Redirección a TikTok)
if (linkChatAnonimo) {
    linkChatAnonimo.addEventListener('click', (e) => {
        e.preventDefault();
        window.open('https://www.tiktok.com/@jlcojvjcl', '_blank'); 
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
    filtrarPostsPorSeccion('Todo'); 
    
    const todoLink = document.querySelector('[data-seccion="Todo"]');
    if (todoLink) {
        todoLink.classList.add('active');
    }
};
