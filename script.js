// Función para mostrar y filtrar posts
function mostrarPublicaciones(filtroSeccion) {
    // 1. Limpia solo el contenedor de publicaciones
    contenedor.innerHTML = ''; 

    // 2. Filtrado de publicaciones (mantenemos la lógica de la Política)
    const postsFiltrados = (filtroSeccion === "Todo") 
        ? publicaciones.filter(post => post.seccion !== "Política") // Excluye "Política" de la vista "Todo"
        : publicaciones.filter(post => post.seccion === filtroSeccion);

    // ... (resto de la función) ...
    
    // 3. Si quieres que la sección "Subir" sea visible solo en ciertas vistas
    //    Opcional: Si quieres que el botón de subir redirija
    if (document.getElementById('subir-contenido')) {
        document.getElementById('subir-contenido').style.display = 'block'; 
        // Asegura que la sección de subir esté visible.
    }
}
