import { defineConfig } from 'astro/config';

export default defineConfig({
  server: {
    host: '0.0.0.0', // escucha en todas las interfaces
    port: 4321,
    allowedHosts: [
      '.localhost',
      '.localdomain',
      'host.docker.internal',
      'blog.ismapolis.com',
      '127.0.0.1',
      'localhost',
    ],
  },
  vite: {
    preview: {
      allowedHosts: [
        '.localhost',
        '.localdomain',
        'host.docker.internal',
        'blog.ismapolis.com',
        '127.0.0.1',
        'localhost',
      ],
    },
  },
});
