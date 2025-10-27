# Akame Reboot — Dashboard (static)

## Stack
- React + Vite
- TailwindCSS v3
- Framer Motion, lucide-react, Recharts, date-fns, zod

## Run locally
1. `npm install`
2. `npm run dev` — abre http://localhost:5173 (si el puerto 5173 está ocupado, Vite usará el siguiente disponible)

## Build
`npm run build` — genera `dist/` listo para GitHub Pages

### Nota de rutas y router
- Se usa `HashRouter` para evitar configuración de 404 en GitHub Pages.
- `vite.config.js` define `base: './'` para servir assets de forma relativa en cualquier subruta.

## Deploy a GitHub Pages (manual)
1. `npm run build`
2. Crear rama `gh-pages` y subir contenido de `dist/` a esa rama
3. En GitHub -> Settings -> Pages -> seleccionar rama `gh-pages` y root
4. Acceder mediante `https://<usuario>.github.io/<repositorio>/` (las rutas internas usan `#` por HashRouter)

## Deploy vía GitHub Actions
Incluye workflows para desplegar automáticamente:

- `akame-reboot/.github/workflows/gh-pages.yml`: pensado para repos con raíz `akame-reboot`.
- `/.github/workflows/gh-pages.yml`: pensado para repos con raíz en el directorio padre, construye desde `akame-reboot/` y publica `akame-reboot/dist`.

Usa Node 18, ejecuta `npm ci` y `npm run build`, y publica en la rama `gh-pages`.

## Tests & Lint
- `npm run test` (Vitest)
- `npm run lint` (ESLint flat config)

## Funcionalidad clave
- Persistencia en localStorage bajo la key `akame_reboot_v1`
- Exportar/Importar JSON; Exportar CSV (30 días)
- UI responsive (bottom nav en móvil), accesible (ARIA básica), animaciones suaves.

## Atajos de teclado
- `N` = Nuevo día y apertura del modal
- `E` = Ir al Dashboard (export rápido desde Header)
- `D` = Ir al Dashboard