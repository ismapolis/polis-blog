import { defineConfig } from 'astro/config';

export default defineConfig({
  server: {
    host: true, // permite que escuche en cualquier IP del contenedor
    port: 4321, // puerto que usas en el Deployment
  },
  vite: {
    server: {
      allowedHosts: ['blog.ismapolis.com', 'localhost', '127.0.0.1'], // hosts permitidos
      port: 4321,
      host: true,
    },
  },
});
