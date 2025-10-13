// script.js - LÓGICA DE TEMAS AMPLIADA PARA CADA CELEBRACIÓN

// 🔴 ENLACE DE INVITACIÓN AL CHAT DE DISCORD
const CHAT_ANONIMO_URL = "https://discord.gg/7SVTvj8C"; 

// 🚨 VARIABLE DE CONTROL: ESTABLECE ESTO EN 'auto' PARA PRODUCCIÓN 🚨
// Opciones para forzado: 'original', 'reyes', 'candelaria', 'constitucion', 'ejercito', 
// 'sanvalentin', 'bandera', 'mujer', 'expropiacion', 'juarez', 'puebla', 'maestro', 
// 'marina', 'patrio', 'raza', 'diademuertos', 'revolucion', 'musico', 'virgen', 'navidad',
// 'carnaval', 'zapataniño', 'abuelo', 'morelos', 'armada', 'inocentes'.
const TEMA_FORZADO = 'auto'; // CAMBIAR AQUÍ PARA PROBAR UN TEMA ESPECÍFICO

// Obtener elementos principales
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
// LÓGICA DE TEMAS Y FECHAS (18 Temas únicos)
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
        'tema-armada', 'tema-inocentes', 'tema-original'
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
    const currentMonth = today.getMonth() + 1; // 1-12
    
    // Función de ayuda para chequear rangos (m1, d1, m2, d2)
    const inRange = (m1, d1, m2, d2) => {
        const start = new Date(currentYear, m1 - 1, d1);
        const end = new Date(currentYear, m2 - 1, d2);
        if (m1 > m2) { 
            const startDec = new Date(currentYear - 1, m1 - 1, d1);
            const endJan = new Date(currentYear, m2 - 1, d2);
            return (today >= startDec && currentMonth >= m1) || (today <= endJan && currentMonth <= m2);
        }
        return today >= start && today <= end;
    };
    
    // --- TEMAS POR PRIORIDAD (De Enero a Diciembre) ---

    // ENERO
    // DÍA DE REYES MAGOS (Ene 6)
    if (inRange(1, 6, 1, 8)) { body.classList.add('tema-reyes'); return; }
    // AÑO NUEVO (Ene 1) - Extensión de Navidad
    if (inRange(1, 1, 1, 1)) { body.classList.add('tema-navidad'); return; }

    // FEBRERO
    // DÍA DE SAN VALENTÍN (Feb 14)
    if (inRange(2, 13, 2, 15)) { body.classList.add('tema-sanvalentin'); return; }
    // DÍA DE LA CANDELARIA (Feb 2)
    if (inRange(2, 1, 2, 3)) { body.classList.add('tema-candelaria'); return; }
    // DÍA DE LA CONSTITUCIÓN (Feb 5)
    if (inRange(2, 4, 2, 5)) { body.classList.add('tema-constitucion'); return; }
    // DÍA DE LA FUERZA AÉREA (Feb 10)
    if (inRange(2, 9, 2, 11)) { body.classList.add('tema-ejercito'); return; }
    // DÍA DEL EJÉRCITO MEXICANO (Feb 19)
    if (inRange(2, 18, 2, 20)) { body.classList.add('tema-ejercito'); return; }
    // DÍA DE LA BANDERA (Feb 24)
    if (inRange(2, 23, 2, 25)) { body.classList.add('tema-bandera'); return; }
    // ANIVERSARIO CUAUHTÉMOC (Feb 28)
    if (inRange(2, 27, 2, 28)) { body.classList.add('tema-constitucion'); return; } // Usa tema cívico
    // CARNAVAL (FECHA VARIABLE) - Simulación
    if (inRange(2, 26, 3, 2)) { body.classList.add('tema-carnaval'); return; } 

    // MARZO
    // NATALICIO DE BENITO JUÁREZ (Mar 21)
    if (inRange(3, 20, 3, 22)) { body.classList.add('tema-juarez'); return; }
    // EXPROPIACIÓN PETROLERA (Mar 18)
    if (inRange(3, 17, 3, 18)) { body.classList.add('tema-expropiacion'); return; }
    // DÍA INTERNACIONAL DE LA MUJER (Mar 8)
    if (inRange(3, 7, 3, 8)) { body.classList.add('tema-mujer'); return; }

    // ABRIL
    // ZAPATA / TIERRA (Abr 10 / 22) - Agrupamos
    if (inRange(4, 9, 4, 22)) { body.classList.add('tema-zapataniño'); return; }
    // DÍA DEL NIÑO (Abr 30)
    if (inRange(4, 29, 4, 30)) { body.classList.add('tema-zapataniño'); return; } 
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
    if (inRange(6, 15, 6, 21)) { body.classList.add('tema-maestro'); return; }

    // JULIO
    // LA GUELAGUETZA (JULIO)
    if (inRange(7, 10, 7, 25)) { body.classList.add('tema-cultural'); return; }
    
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
    // DÍA DE LA VIRGEN (Dic 12)
    if (inRange(12, 11, 12, 13)) { body.classList.add('tema-virgen'); return; }
    // POSADAS/NAVIDAD (Dic 16 - 25)
    if (inRange(12, 16, 12, 26)) { body.classList.add('tema-navidad'); return; }
    // DÍA DE LOS SANTOS INOCENTES (Dic 28)
    if (inRange(12, 27, 12, 28)) { body.classList.add('tema-inocentes'); return; }
    // FIN DE AÑO (Dic 31)
    if (inRange(12, 30, 12, 31)) { body.classList.add('tema-navidad'); return; }

    // 3. TEMA POR DEFECTO: ORIGINAL
    body.classList.add('tema-original'); 
}

// ----------------------------------------------------
// FUNCIONES DE POSTS Y LÓGICA DEL SITIO (Se mantiene el resto del código)
// ----------------------------------------------------

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
