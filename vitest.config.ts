import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    setupFiles: ['src/test/setup.ts'],
    environment: 'jsdom',
    globals: true,
  },
  server: {
    host: '0.0.0.0',
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
});
