# GymLog

Registro de entrenos tipo Hevy, como PWA para el iPhone. Sin backend: todo se guarda en el dispositivo (localStorage).

## Qué hace
- Entreno en vivo: series con kg/reps, columna "Anterior" con lo que hiciste la última vez, check de serie y temporizador de descanso.
- Rutinas reutilizables (o guardar cualquier entreno del historial como rutina).
- +800 ejercicios con imágenes animadas, músculos e instrucciones ([free-exercise-db](https://github.com/yuhonas/free-exercise-db), dominio público).
- Progresión por ejercicio: gráfica de 1RM estimado (Epley), peso máximo, volumen y reps; récords personales al terminar.
- Historial por meses, entrenos por semana, exportar/importar copia en JSON.
- Funciona offline después de la primera carga (service worker).

## Publicar en GitHub Pages
1. Crea el repo `gymlog` en GitHub y sube estos archivos tal cual (todo en la raíz, iconos incluidos).
2. Settings → Pages → Deploy from a branch → `main` / `(root)`.
3. Abre `https://diaz2806.github.io/gymlog/` en Safari → Compartir → **Añadir a pantalla de inicio**.

## Notas
- Los nombres de ejercicios vienen en inglés (la búsqueda acepta también músculos y equipo en español).
- Los datos viven solo en el iPhone: usa Perfil → Exportar de vez en cuando.
- Si cambias `index.html`, sube también la versión de caché en `sw.js` (`gymlog-shell-v2`…) para forzar la actualización.
