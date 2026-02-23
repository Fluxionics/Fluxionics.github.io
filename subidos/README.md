# 📁 /subidos — Archivos de Proyectos

Esta carpeta contiene recursos, screenshots, releases y assets de cada proyecto de Fluxionics.

## Estructura

```
subidos/
├── README.md                  ← Este archivo
│
├── fluxivault/
│   ├── screenshots/
│   │   ├── main.png           ← Screenshot principal
│   │   └── demo.gif           ← GIF de demostración
│   └── releases/
│       └── FluxiVault-v1.0.zip
│
├── asistente-virtual/
│   ├── screenshots/
│   │   ├── chat.png
│   │   └── mobile.png
│   └── changelog.md
│
├── fluxi-station/
│   ├── screenshots/
│   │   └── player.png
│   └── changelog.md
│
└── paloma-migajera/
    ├── screenshots/
    │   ├── gameplay.png
    │   └── menu.png
    └── assets/
        └── banner.png
```

## Cómo agregar un proyecto nuevo

1. Crea una carpeta con el nombre del proyecto en minúsculas y sin espacios (usa `-` en lugar de espacios).
2. Dentro crea al mínimo una carpeta `screenshots/`.
3. Agrega un `changelog.md` si el proyecto tiene versiones.
4. Referencia las imágenes desde tu HTML así:

```html
<img src="subidos/mi-proyecto/screenshots/main.png" alt="Screenshot de Mi Proyecto">
```

O si estás en otra página:
```html
<img src="../subidos/mi-proyecto/screenshots/main.png" alt="...">
```

## Nomenclatura de archivos

- `main.png` — Screenshot principal del proyecto
- `demo.gif` — Demostración animada
- `mobile.png` — Vista móvil
- `banner.png` — Banner para redes sociales (1200×630px)
- `favicon.ico` — Ícono del proyecto

## Notas

- Mantén las imágenes optimizadas (máximo 500KB por imagen, usa WebP si es posible).
- Los GIFs pueden ser más pesados pero no deben exceder 5MB.
- Para releases/descargas, sube el archivo comprimido en ZIP.
