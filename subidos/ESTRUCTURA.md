# 📦 Guía de Instalación y Estructura — Fluxionics Portfolio

## Estructura completa del repositorio

```
Fluxionics.github.io/
│
├── index.html          ← Página principal (hero, sobre mí, skills, repos, discord)
├── repos.html          ← Repositorios con destacados + todos + modal de detalles
├── proyectos.html      ← Proyectos con filtros por categoría
├── blog.html           ← Blog / artículos / notas
├── timeline.html       ← Línea de tiempo + logros/achievements
├── contacto.html       ← Contacto (email, github, discord, facebook, tiktok)
│
├── subidos/            ← Assets y archivos de proyectos
│   ├── README.md
│   ├── fluxivault/
│   │   ├── screenshots/
│   │   └── releases/
│   ├── asistente-virtual/
│   │   └── screenshots/
│   ├── fluxi-station/
│   │   └── screenshots/
│   └── paloma-migajera/
│       ├── screenshots/
│       └── assets/
│
└── ESTRUCTURA.md       ← Este archivo
```

## Cómo subir todo a GitHub

### Opción A — Desde la web de GitHub (más fácil)

1. Ve a tu repositorio: https://github.com/Fluxionics/Fluxionics.github.io
2. Haz clic en "Add file" → "Upload files"
3. Arrastra todos los archivos `.html` y la carpeta `subidos/`
4. Escribe un mensaje de commit como: `feat: nueva versión del portafolio`
5. Haz clic en "Commit changes"
6. Espera ~2 minutos y ve a: https://fluxionics.github.io

### Opción B — Desde Git (más profesional)

```bash
# 1. Clona tu repo (si aún no lo tienes local)
git clone https://github.com/Fluxionics/Fluxionics.github.io.git
cd Fluxionics.github.io

# 2. Copia los archivos nuevos a la carpeta del repo

# 3. Agrega todo
git add .

# 4. Commit con mensaje descriptivo
git commit -m "feat: portafolio v2 — repos, blog, timeline, logros"

# 5. Sube los cambios
git push origin main
```

## Personalización rápida

### Cambiar repos destacados (repos.html)
Busca esta línea en `repos.html`:
```js
const PINNED = ['Fluxionics.github.io','FluxiVault','Asistente-Virtual','Paloma-Migajera','FluxiStation'];
```
Cambia los nombres por los repos que quieras destacar (exactamente como se llaman en GitHub).

### Agregar ícono a un repo (repos.html)
```js
const ICONS = {
  'Fluxionics.github.io':'🌐',
  'FluxiVault':'🔐',
  'MiNuevoRepo':'🚀',   // ← agrega aquí
};
```

### Agregar una entrada al timeline (timeline.html)
Copia el bloque de un `tl-item` y modifica el contenido. Para que aparezca como "en curso", agrega la clase `current`:
```html
<div class="tl-item current">
```

### Agregar un post al blog (blog.html)
1. Agrega una tarjeta en el grid de posts
2. Agrega el contenido en el array `posts[]` en el script

### Agregar screenshots a un proyecto
Sube las imágenes a `subidos/nombre-proyecto/screenshots/` y referencialas en HTML:
```html
<img src="subidos/fluxivault/screenshots/main.png" alt="FluxiVault">
```

## Notas importantes

- El portafolio usa la **API pública de GitHub** para cargar repositorios automáticamente.
  La API tiene un límite de **60 peticiones por hora** por IP sin autenticación.
  Si quieres más, agrega un Personal Access Token en los headers del fetch.

- Todos los archivos son **HTML puro** — sin build, sin npm, sin dependencias locales.
  Solo súbelos y funcionan.

- Las fuentes se cargan desde Google Fonts. Si no hay internet, usa las fuentes de sistema.
