import { defineConfig } from 'vite'

// Configuración mínima para GitHub Pages sin conocer el nombre del repositorio.
// Usamos base './' para que los assets se resuelvan de forma relativa y funcionen bajo cualquier subruta.
export default defineConfig({
  base: './',
})