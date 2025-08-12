Security Policy
Acerca de FLUXIONICS
FLUXIONICS es un simulador de circuitos electrónicos web gratuito hospedado en GitHub Pages. Permite diseñar, simular y analizar circuitos electrónicos directamente en el navegador con una amplia variedad de componentes.
URL de producción: https://fluxionics.github.io/
Supported Versions
Este simulador de circuitos electrónicos está en desarrollo activo. Actualmente mantenemos las siguientes versiones:
VersionSupportedmain:white_check_mark:dev:white_check_mark:
Reporting a Vulnerability
Si encuentras una vulnerabilidad de seguridad en este simulador de circuitos, por favor repórtala de forma responsable:
Proceso de Reporte

NO crear un issue público para vulnerabilidades de seguridad
Envía un reporte privado a través de:

GitHub Security Advisories (recomendado)
Email directo al mantenedor del proyecto



Información a Incluir
Cuando reportes una vulnerabilidad, incluye:

Descripción detallada del problema
Pasos para reproducir la vulnerabilidad
Impacto potencial
Versión afectada
Capturas de pantalla (si aplica)

Scope de Seguridad
Dentro del Scope

Vulnerabilidades en el código JavaScript del simulador FLUXIONICS
Problemas de XSS (Cross-Site Scripting)
Inyección de código malicioso en el área de diseño
Manipulación no autorizada de componentes (resistores, capacitores, transistores, etc.)
Exposición de datos de circuitos del usuario
Problemas de CORS con recursos externos
Vulnerabilidades en la simulación de voltaje/corriente/potencia
Problemas de seguridad con la carga de componentes desde base de datos
Manipulación de propiedades de componentes

Fuera del Scope

Ataques de fuerza bruta genéricos
Vulnerabilidades en GitHub Pages (plataforma)
Problemas de performance que no afecten la seguridad
Browsers no soportados oficialmente por FLUXIONICS
Limitaciones físicas de simulación (no es un simulador SPICE completo)

Medidas de Seguridad Implementadas
Seguridad del Frontend

✅ Validación de entrada de datos del usuario en propiedades de componentes
✅ Sanitización de URLs de componentes desde base de datos
✅ Manejo seguro de datos de circuitos
✅ Prevención de inyección de scripts en el diseñador
✅ Validación de valores de simulación (voltaje, corriente, potencia)
✅ Protección contra modificación no autorizada del DOM del simulador

Seguridad de Datos

✅ No almacenamiento de datos sensibles en localStorage
✅ Uso de HTTPS para FLUXIONICS (GitHub Pages)
✅ Validación de componentes cargados desde base de datos
✅ Manejo seguro de errores de simulación
✅ Protección de esquemas de circuitos del usuario
✅ Sanitización de propiedades de componentes

Buenas Prácticas para Usuarios
Para Desarrolladores que Contribuyen

Siempre validar inputs del usuario
No hardcodear credenciales o tokens
Usar HTTPS para todas las requests externas
Sanitizar datos antes de mostrarlos en el DOM

Para Usuarios Finales

Usa siempre https://fluxionics.github.io/ (versión HTTPS oficial)
No subas circuitos con información personal sensible
Reporta comportamientos extraños en la simulación inmediatamente
Verifica que los valores de simulación sean realistas
No confíes en FLUXIONICS para diseños de producción críticos sin verificación adicional

Actualizaciones de Seguridad
Las actualizaciones de seguridad se publican a través de:

GitHub Releases con etiqueta security
Commits con prefijo [SECURITY]
Actualizaciones automáticas en GitHub Pages

Contacto
Para reportes de seguridad:

GitHub Security Advisories: Crear advisory
Issues de seguridad: Usa el template de seguridad

Reconocimientos
Agradecemos a todos los investigadores de seguridad que reportan vulnerabilidades de forma responsable. Los contribuyentes serán reconocidos en:

Lista de agradecimientos en README.md
Sección de créditos en la aplicación
GitHub Security Advisories


Última actualización: Agosto 2025
Versión de la política: 1.0
