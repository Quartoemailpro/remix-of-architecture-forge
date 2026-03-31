import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: ['src/index.ts', 'src/**/*.d.ts'],
    },
  },
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@infra': path.resolve(__dirname, 'src/infra'),
      '@modules': path.resolve(__dirname, 'src/modules'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@app': path.resolve(__dirname, 'src/app'),
    },
  },
});
