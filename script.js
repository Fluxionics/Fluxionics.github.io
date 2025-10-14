// script.js - LÓGICA DE TEMAS AMPLIADA PARA TODAS LAS CELEBRACIONES

// 🔴 ENLACE DE INVITACIÓN AL CHAT DE DISCORD
const CHAT_ANONIMO_URL = "https://discord.gg/7SVTvj8C"; 

// 🚨 VARIABLE DE CONTROL: ESTABLECE ESTO EN 'auto' PARA PRODUCCIÓN 🚨
// Opciones para forzado: 'original', 'reyes', 'candelaria', 'constitucion', 'ejercito', 
// 'sanvalentin', 'bandera', 'mujer', 'expropiacion', 'juarez', 'puebla', 'maestro', 
// 'marina', 'patrio', 'raza', 'diademuertos', 'revolucion', 'musico', 'virgen', 'navidad'.
const TEMA_FORZADO = 'auto'; // CAMBIAR AQUÍ PARA PROBAR UN TEMA ESPECÍFICO

// Obtener elementos principales (sin cambios)
const contenedor = document.getElementById('contenedor-publicaciones');
const enlacesNav = document.querySelectorAll('.nav-link');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const linkSubir = document.getElementById('link-subir');
const modalSubir = document.getElementById('modal-subir');
const closeModal = document.querySelector('.close-modal');
const linkChatAnonimo = document.getElementById('link-chat'); 
const mediaModal = document.getElementById('media-modal');
const closeMediaModal = document.querySelector('.close-media-modal');
const mediaContentViewer = document.getElementById('media-content-viewer');
const mediaCaption = document.getElementById('media-caption');


// ----------------------------------------------------
// LÓGICA DE TEMAS Y FECHAS (Basada en tu lista exhaustiva)
// ----------------------------------------------------

function aplicarTemaPorFecha() {
    const body = document.body;
    // Lista de todas las clases temáticas posibles
    const temas = [
        'tema-reyes', 'tema-candelaria', 'tema-constitucion', 'tema-ejercito', 
        'tema-sanvalentin', 'tema-bandera', 'tema-mujer', 'tema-expropiacion', 
        'tema-juarez', 'tema-puebla', 'tema-maestro', 'tema-marina', 'tema-patrio', 
        'tema-raza', 'tema-diademuertos', 'tema-revolucion', 'tema-musico', 'tema-virgen', 
        'tema-navidad', 'tema-original'
    ];
                   
    // Eliminamos todas las clases temáticas antes de aplicar la correcta
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
    const currentMonth = today.getMonth() + 1; // 1-12
    const currentDay = today.getDate();
    
    // Función de ayuda para chequear rangos (m1, d1, m2, d2)
    const inRange = (m1, d1, m2, d2) => {
        const start = new Date(currentYear, m1 - 1, d1);
        const end = new Date(currentYear, m2 - 1, d2);
        // Ajuste para el Fin de Año/Año Nuevo (Dic/Ene)
        if (m1 > m2) { 
            const startDec = new Date(currentYear - 1, m1 - 1, d1);
            const endJan = new Date(currentYear, m2 - 1, d2);
            return (today >= startDec && currentMonth >= m1) || (today <= endJan && currentMonth <= m2);
        }
        return today >= start && today <= end;
    };
    
    // --- TEMAS POR PRIORIDAD (De Enero a Diciembre) ---

    // DICIEMBRE A ENERO
    // NAVIDAD/POSADAS (Dic 16 - Ene 5)
    if (inRange(12, 16, 1, 5)) {
        body.classList.add('tema-navidad');
        
        // **PRIORIDAD:** REYES MAGOS (Ene 6 al 8)
        if (inRange(1, 6, 1, 8)) { body.classList.remove('tema-navidad'); body.classList.add('tema-reyes'); return; }
        
        return;
    }
    
    // FEBRERO
    // Candelaria (Feb 2)
    if (inRange(2, 1, 2, 3)) { body.classList.add('tema-candelaria'); return; }
    // Constitución (Feb 4 - 5)
    if (inRange(2, 4, 2, 5)) { body.classList.add('tema-constitucion'); return; }
    // Fuerza Aérea/Ejército (Feb 10 - 19)
    if (inRange(2, 10, 2, 19)) { body.classList.add('tema-ejercito'); return; }
    // SAN VALENTÍN (Feb 13 al 15)
    if (inRange(2, 13, 2, 15)) { body.classList.add('tema-sanvalentin'); return; }
    // Bandera (Feb 24)
    if (inRange(2, 23, 2, 25)) { body.classList.add('tema-bandera'); return; }
    
    // MARZO
    // Día de la Mujer (Mar 7 - 8)
    if (inRange(3, 7, 3, 8)) { body.classList.add('tema-mujer'); return; }
    // Expropiación (Mar 17 - 18)
    if (inRange(3, 17, 3, 18)) { body.classList.add('tema-expropiacion'); return; }
    // Benito Juárez / Primavera (Mar 20 - 22)
    if (inRange(3, 20, 3, 22)) { body.classList.add('tema-juarez'); return; }
    
    // ABRIL
    // Día del Niño / Zapata (Abril 9 - 30)
    if (inRange(4, 9, 4, 30)) { body.classList.add('tema-puebla'); return; } // Usamos 'puebla' para el tema de niños/héroes
    
    // MAYO
    // Batalla de Puebla / Trabajo (May 1 - 5)
    if (inRange(5, 1, 5, 5)) { body.classList.add('tema-puebla'); return; } 
    // Día de las Madres/Maestro (May 9 - 15)
    if (inRange(5, 9, 5, 15)) { body.classList.add('tema-maestro'); return; } 

    // JUNIO
    // Marina Nacional (Jun 1)
    if (inRange(5, 30, 6, 2)) { body.classList.add('tema-marina'); return; }

    // JULIO (Guelaguetza, usaremos Cultural)
    if (inRange(7, 10, 7, 25)) { body.classList.add('tema-cultural'); return; }
    
    // AGOSTO (Abuelo, usaremos Maestro como tema de Reconocimiento)
    if (inRange(8, 27, 8, 29)) { body.classList.add('tema-maestro'); return; }
    
    // SEPTIEMBRE
    // Niños Héroes / PATRIO (Sep 13 - 16)
    if (inRange(9, 13, 9, 16)) { body.classList.add('tema-patrio'); return; }
    // Morelos (Sep 30)
    if (inRange(9, 29, 9, 30)) { body.classList.add('tema-patrio'); return; }
    
    // OCTUBRE
    // Día de la Raza (Oct 11 - 13)
    if (inRange(10, 11, 10, 13)) { body.classList.add('tema-raza'); return; } 
    
    // NOVIEMBRE
    // DÍA DE MUERTOS (Oct 28 - Nov 3)
    if (inRange(10, 28, 11, 3)) { body.classList.add('tema-diademuertos'); return; }
    // REVOLUCIÓN (Nov 19 - 21)
    if (inRange(11, 19, 11, 21)) { body.classList.add('tema-revolucion'); return; }
    // Músico (Nov 21 - 23)
    if (inRange(11, 21, 11, 23)) { body.classList.add('tema-musico'); return; }
    
    // DICIEMBRE
    // Día de la Virgen (Dic 11 - 13)
    if (inRange(12, 11, 12, 13)) { body.classList.add('tema-virgen'); return; }

    // 3. TEMA POR DEFECTO: ORIGINAL
    body.classList.add('tema-original'); 
}


// ----------------------------------------------------
// FUNCIONES DE POSTS Y LÓGICA DEL SITIO (SIN CAMBIOS)
// ----------------------------------------------------
// ... (El resto del código JavaScript para crearPostHTML, mostrarPublicaciones, 
//      Modales, Lightbox, Búsqueda y Navegación se mantiene sin cambios) ...

function crearPostHTML(post) {
    const articulo = document.createElement('article');
    articulo.classList.add('post', post.seccion.toLowerCase().replace(/ /g, '-')); 
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
