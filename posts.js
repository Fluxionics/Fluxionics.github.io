// posts.js
// 🚨 ¡IMPORTANTE! La variable debe ser window.posts para que script.js pueda leerla.

window.posts = [
    // ----------------------------------------------------
    // SECCIÓN: PAREJA OFICIAL (Diseño Único)
    // ----------------------------------------------------
    {
        titulo: "¡EL SHIPPEO ES OFICIAL! Freddy y Jadhai lo confirman.",
        descripcion: "Después de meses de rumores, 'F' y 'G' confirmaron su relación. ¡Felicidades a la pareja de la secundaria! 💘",
        seccion: "Pareja Oficial",
        fecha: "17/Oct", // AÑADIDO: Campo obligatorio para el script
        autor: { nombre: "Anónimo", color: "#FF5733" }, // AÑADIDO: Campo obligatorio
        media: { // ESTRUCTURA CORREGIDA
            url: "https://imgur.com/cNzdBJJ.png",
            caption: "Freddy y Jadhai, ¡la pareja oficial!"
        }
    },
    {
        titulo: "¡EL SHIPPEO ES OFICIAL! Daila y Manuel lo confirman.",
        descripcion: "Después de meses de rumores, 'D' y 'M' confirmaron su relación. ¡Felicidades a la pareja de la secundaria! 💘",
        seccion: "Pareja Oficial",
        fecha: "18/Oct",
        autor: { nombre: "Anónimo", color: "#FF5733" },
        media: {
            url: "https://imgur.com/Wo1DT6o.png",
            caption: "Daila y Manuel."
        }
    },
    
    // ----------------------------------------------------
    // SECCIÓN: SHIPPEOS
    // ----------------------------------------------------
    {
        titulo: "¡Nuevo Shippeo a la vista en la cafetería!",
        descripcion: "Parece que 'Clarisa' y 'Francisco' estuvieron muy juntos en el recreo de hoy. ¿Confirmamos el siguiente noviazgo?",
        seccion: "Shippeos",
        fecha: "18/Oct",
        autor: { nombre: "Anonimo", color: "#33FF57" },
        media: {
            // Nota: He dejado la primera URL. JS no puede procesar múltiples urlMedia al mismo nivel.
            url: "https://i.imgur.com/8WJT8pk.jpeg",
            caption: "Clarisa y Francisco. Imágenes de prueba."
        }
    },
    {
        titulo: "El misterio de los mensajes anónimos",
        descripcion: "Por Favor Apoyanos Con una publicacion Nueva En El boton de Subir",
        seccion: "Shippeos",
        fecha: "16/Oct",
        autor: { nombre: "El Staff", color: "#33FF57" },
        media: { url: "", caption: "" } // Media vacía
    },

    // ----------------------------------------------------
    // SECCIÓN: HUMOR
    // ----------------------------------------------------
    {
        titulo: "El meme del examen sorpresa de Física",
        descripcion: "La cara que pones cuando el profesor de Física dice 'saquen una hoja'. ¡Guárdenlo para el lunes! 😂",
        seccion: "Humor",
        fecha: "15/Oct",
        autor: { nombre: "El Bromista", color: "#5733FF" },
        media: {
            url: "https://placehold.co/600x400/000000/FFFFFF/png?text=Meme+Examen+Sorpresa",
            caption: "El horror del examen."
        }
    },
    {
        titulo: "El vicioso que juega solo",
        descripcion: "Ico Daniel El vicioso ",
        seccion: "Humor",
        fecha: "14/Oct",
        autor: { nombre: "Testigo", color: "#5733FF" },
        media: {
            url: "https://i.imgur.com/doepqVr.jpeg",
            caption: "Ico Daniel en acción."
        }
    },
    {
        titulo: "Los viciosos ",
        descripcion: "Los viciosos ",
        seccion: "Humor",
        fecha: "14/Oct",
        autor: { nombre: "Anonimo", color: "#5733FF" },
        media: {
            url: "https://i.imgur.com/NncU0I9.jpeg",
            caption: "Grupo de viciosos."
        }
    },
    
    // ----------------------------------------------------
    // SECCIÓN: Rumores (Cambiado de "Chismes" a "Rumores")
    // ----------------------------------------------------
    {
        titulo: "Aqui No ay Rumores ",
        descripcion: "Por Favor Sube un chisme",
        seccion: "Rumor", // Dejé "Chismes" aquí, aunque el título dice Rumores. Usa el que tienes en el nav.
        fecha: "12/Oct",
        autor: { nombre: "Admin", color: "#33FFC7" },
        media: {
            url: "https://placehold.co/600x400/000000/FFFFFF/png?text=Chisme+No+Ay",
            caption: "Sube un chisme, ¡por favor!"
        }
    },
    {
        titulo: "Nuevo Shippeo H y S ",
        descripcion: "Hellen y Se??????? El nombre se revelara cada lestra cada dia ",
        seccion: "Rumor",
        fecha: "11/Oct",
        autor: { nombre: "El Enigmático", color: "#33FFC7" },
        media: { url: "", caption: "" }
    },
    
    // ----------------------------------------------------
    // SECCIÓN: MISTERIOS
    // ----------------------------------------------------
    {
        titulo: "No ay ningun misterio",
        descripcion: ". ¿Fue un olvido o un mensaje?",
        seccion: "Misterios",
        fecha: "10/Oct",
        autor: { nombre: "El Detective", color: "#FF33F5" },
        media: {
            url: "https://placehold.co/600x400/000000/FFFFFF/png?text=Misterio+Locker",
            caption: "El locker olvidado."
        }
    },
    
    // ----------------------------------------------------
    // SECCIÓN: CONVERSACIONES
    // ----------------------------------------------------
    {
        titulo: "Transcripción: 'Las Planillas'",
        descripcion: "Por Cual Planilla Botaran?.",
        seccion: "Conversaciones",
        fecha: "09/Oct",
        autor: { nombre: "El Político", color: "#3383FF" },
        media: { url: "", caption: "" }
    }, 
    
    // ----------------------------------------------------
    // SECCIÓN: POLÍTICA (Última publicación)
    // ----------------------------------------------------
    {
        titulo: "Aviso de Contenido y Uso de la Plataforma",
        descripcion: "Recuerda, este contenido es gestionado por alumnos. Revisa el enlace de 'Política y Reglas' para más detalles.",
        seccion: "Política",
        fecha: "01/Oct",
        autor: { nombre: "El Administrador", color: "#838383" },
        media: { url: "", caption: "" }
    }
];
